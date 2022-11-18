import { Fragment, useState } from "react";
import { Button, InputGroup, Form, Container, Spinner, Alert } from 'react-bootstrap';
import { BASE_URL } from "../utils/constant";
import axios from "../utils/axios";

const Home = () => {

    const [url, setUrl] = useState("");
    const [data, setData] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const res = await axios.post('/api/url/short',{
            originalUrl:url
        })

        // const data = await res.json();
        // if (!res.ok && data.msg) setError(data.msg)

        setIsLoading(false)
        if (res.data.originalUrl) setData(res.data)
        setUrl("")
        setTimeout(() => setError(""), 8000)
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
        </Fragment>
    )
}

export default Home;