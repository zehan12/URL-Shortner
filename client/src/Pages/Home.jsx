import { Fragment, useState } from "react";
import { Button, InputGroup, Form, Container, Spinner, Alert } from 'react-bootstrap';
import axios from "../utils/axios";
import { useMutation } from "react-query";
import { BsLink45Deg } from "react-icons/bs"
import { ImMagicWand } from "react-icons/im"

const Home = ({ mode }) => {

    const [url, setUrl] = useState("");
    const [data, setData] = useState("");
    const [error, setError] = useState("");


    const createShortUrl = async (url) => {
        const res = await axios.post('/api/url/short', { originalUrl: url })
        console.log(res)
        return res.data;
    }

    const { mutate, isLoading } = useMutation(createShortUrl, {
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
            <Container className="contain">
                <h1 className='rainbow-text h1'>Url Shortner</h1>
                <p className="para">Url Shortner is a modern URL shortener with support for custom domains. Shorten URLs, manage your links </p>
                {
                    error &&
                    <Alert key={'danger'} variant={'danger'}>
                        {error}
                    </Alert>
                }
                {/* <InputGroup className={`mb-3`}>
                    <InputGroup.Text id="basic-addon3">
                        https://example.com/
                    </InputGroup.Text>
                    <Form.Control id="basic-url" aria-describedby="basic-addon3" type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder=" Enter Your Url Here!!" />
                </InputGroup> */}

                <div class="bar">
                    <BsLink45Deg size={30} color="gray" />
                    <input class="searchbar" value={url} onChange={(e) => setUrl(e.target.value)} type="text" title="Search" placeholder="https://example.com/" />
                </div>

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
                        <div className="buttons" >
                            <button style={ mode ? { color: "black"} : {} } class="button" onClick={(e) => handleSubmit(e)} type="submit"> <ImMagicWand /> Generate Link</button>
                        </div>
                    // <Button variant="primary" type='submit' onClick={(e) => handleSubmit(e)}>Submit </Button>
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