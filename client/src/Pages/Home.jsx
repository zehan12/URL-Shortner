import { Fragment, useState } from "react";
import { Button, InputGroup, Form, Container, Spinner, Alert } from 'react-bootstrap';
import axios from "../utils/axios";
import { useMutation } from "react-query";

const Home = () => {

    const [url, setUrl] = useState("");
    const [data, setData] = useState("");
    const [error, setError] = useState("");


    const createShortUrl = async ( url ) => {
          const res = await axios.post('/api/url/short',{originalUrl:url})
          console.log(res)
          return res.data;
    }

    const { mutate, isLoading } = useMutation( createShortUrl, {
        onSuccess: data => {
          setData(data);
        },
        onError: (error) => {
            setError(error.response.data.msg)
           setTimeout(() => setError(""), 6000)
          }
      });


    const handleSubmit = async (e) => {
        e.preventDefault();
        mutate(url);
        setUrl("")
    }

    return (
        <Fragment>
            <Container>
                <h1 className='rainbow-text h1'>Url Shortner</h1>
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
                    isLoading ? <Button variant="primary" disabled>
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
        </Fragment>
    )
}

export default Home;