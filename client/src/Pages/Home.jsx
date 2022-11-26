import { Fragment, useState } from "react";
import { Container, Spinner, Alert } from 'react-bootstrap';
import axios from "../utils/axios";
import { useMutation } from "react-query";
import { BsLink45Deg } from "react-icons/bs"
import { ImMagicWand } from "react-icons/im"
import UrlCard from "../components/UrlCard";

const Home = ({ mode }) => {

    const [url, setUrl] = useState("");
    const [data, setData] = useState("");
    const [error, setError] = useState("");


    const createShortUrl = async (url) => {
        const res = await axios.post('/api/url/short', { originalUrl: url })
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
            <Container className="contain" style={{height:"100vh"}}>
                <h1 className='rainbow-text h1'>Url Shortner</h1>
                <p className="para">Url Shortner is a modern URL shortener with support for custom domains. Shorten URLs, manage your links </p>
                {
                    error &&
                    <Alert key={'danger'} variant={'danger'}>
                        {error}
                    </Alert>
                }

                <div style={{ width: "70%", margin: "0 auto" }} >
                    <div className="bar">
                        <BsLink45Deg size={30} color="gray" />
                        <input className="searchbar" value={url} onChange={(e) => setUrl(e.target.value)} type="text" title="Search" placeholder="https://example.com/" />
                    </div>
                </div>
                {
                    isLoading ? <div className="buttons" >
                        <button className="button" onClick={(e) => handleSubmit(e)} type="submit">
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                style={{ marginRight: "10px" }}
                            />
                            Loading...
                        </button>
                    </div> :
                        <div className="buttons" >
                            <button style={mode ? { color: "black" } : {}} className="button" onClick={(e) => handleSubmit(e)} type="submit"> <ImMagicWand /> Generate Link</button>
                        </div>
                }

                {
                    data && <UrlCard originalUrl={data.originalUrl} shortUrl={data.shortUrl} />

                }
            </Container>
        </Fragment>
    )
}

export default Home;