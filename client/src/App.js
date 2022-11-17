import { useState } from 'react';
import './App.css';
import { Button, InputGroup, Form, Container, Spinner, Alert } from 'react-bootstrap';
import Header from './components/Header';
import { BASE_URL } from "./utils/constant";


function App() {

  const [url, setUrl] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
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

    console.log(res, "responseeeeeeeeeeeee")
    // const res = await fetch("http://localhost:5000/api/url/show");
    const data = await res.json();
    if (!res.ok && data.msg) setError(data.msg)

    setIsLoading(false)
    console.log(data);
    setData(data)
    setUrl("")
    setTimeout(() => setError(""), 8000)
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
            <h3>Shorten Url : { data.shortUrl } </h3>
            <h4> Shorten Url length : {data.shortUrl.length} character </h4>
          </>
        }
      </Container>
    </div>

  );
}

export default App;
