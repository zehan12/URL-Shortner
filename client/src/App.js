import { useEffect, useState } from 'react';
import './App.css';
import { Button, InputGroup, Form, Container, Spinner, Alert } from 'react-bootstrap';
import Header from './components/Header';
import { BASE_URL } from "./utils/constant";
import List from './components/List';

import QRCode from "qrcode.react";


import { motion, dropin } from "framer-motion"
import { AnimatePresence } from "framer-motion"


function App() {

  const [url, setUrl] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [urlData, setUrlData] = useState(null);

  const [selectedId, setSelectedId] = useState(null)

  console.log(selectedId, "id")


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(url, typeof url, url.length);
    setIsLoading(true)
    const res = await fetch(BASE_URL + "api/url/short", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ originalUrl: url })
    });

    const data = await res.json();
    if (!res.ok && data.msg) setError(data.msg)

    setIsLoading(false)
    if (data.originalUrl) setData(data)
    setUrl("")
    setTimeout(() => setError(""), 8000)
  }

  const fetchUrlData = async () => {
    const res = await fetch("http://localhost:5000/api/url/show");
    const data = await res.json();
    return setUrlData(data);
  }

  useEffect(() => {
    fetchUrlData();
  }, [])

  const handleClick = (id) => {
    console.log(id)
    return setSelectedId(id)
  }
  return (
    <div className="App">
      <Header />
      <h1>Home Page</h1>
      <h2>Url Shortner</h2>
      <Container>
        <Form.Label
          htmlFor="basic-url">Enter Your Any Long URL </Form.Label>
        {
          error &&
          <Alert key={'danger'} variant={'danger'}>
            {error}
          </Alert>
        }
        <InputGroup className={`mb-3`}>
          <InputGroup.Text id="basic-addon3">
            https://example.com/
          </InputGroup.Text>
          <Form.Control id="basic-url" aria-describedby="basic-addon3" type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder=" Enter Your Url Here!!" />
        </InputGroup>
        {
          isloading ? <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button> :
            <Button variant="primary" type='submit' onClick={(e) => handleSubmit(e)}>Submit </Button>
        }
      </Container>
      <Container>
        {
          data &&
          <>
            <h3>Orginal url : {data.originalUrl}</h3>
            <h4> Original Url length : {data.originalUrl.length} character </h4>
            <h3>Shorten Url : {data.shortUrl} </h3>
            <h4> Shorten Url length : {data.shortUrl.length} character </h4>
          </>
        }
      </Container>

      <Container style={{display:"flex"}}>
        {
          urlData && urlData.map((url) => <div>
            <div>
              <QRCode
                value={url.shortUrl} style={{ marginRight: 0 }} />
              <p>{url.shortUrl} </p>
            </div>
          </div>)
        }
      </Container>
      {
        urlData
        &&
        urlData.map(url => (
          <div>
            <h1>url.originalUrl</h1>
            <motion.button onClick={() => handleClick(url.urlCode)}></motion.button>
          </div>
        ))
      }

      <AnimatePresence
      // initial={false}
      >
        {selectedId && (
          <Model text={selectedId} handleClick={handleClick} />
        )}
      </AnimatePresence>




      {
        urlData &&
        <List urlData={urlData} />
      }
    </div >

  );
}

export default App;

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500
    }
  },
  exist: {
    y: "100vh",
    opacity: 0
  }

}

const Backdrop = ({ childern, onClick }) => {
  return (<motion.div
    className='backdrop'
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {childern}
  </motion.div>)
}

const Model = ({ handleClick, text }) => {
  return (
    <Backdrop onClick={() => handleClick(null)} >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal organe-gradient"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exist"
      >
        <h2>{text}</h2>
      </motion.div>
    </Backdrop>
  )
}