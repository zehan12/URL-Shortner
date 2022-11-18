import { Fragment, useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "../utils/axios";
import QRCode from "qrcode.react";
import { useQuery } from 'react-query';
import GlitchLoading from "../components/GlitchLoading";

import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"


const List = () => {

    const [urlData, setUrlData] = useState([]);
    const [isError, setIsError] = useState("");

    const { isLoading, error, data } = useQuery ( 'urlData', () =>axios.get("api/url/show/") );

    if ( isLoading ) {
        return <GlitchLoading />
    }


    const fetchUrlData = async () => {
        try {          
            const res = await axios.get("api/url/show/")
            setUrlData(res.data)
        } catch (error) {
            setIsError(error.message)
        }
    }

    return (
        <Fragment>
            <Container style={{padding:"30px"}}>
                <h1 className="gradient-text">List of Created Short URL</h1>


                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>original url</th>
                            <th>shorten url</th>
                            <th>clicks</th>
                            <th>code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data &&
                            data.data.map((ele, i) =>
                                <tr key={ele.urlCode}>
                                    <td>{i + 1}</td>
                                    <td>  <img style={{ height: "16px", width: "16px" }} src={`https://www.google.com/s2/favicons?domain=${ele.originalUrl}`} /> {ele.originalUrl}</td>
                                    <td><a href={ele.shortUrl} target="_blank" rel="noreferrer">{ele.shortUrl}</a></td>
                                    <td>{ele.click}</td>
                                    <td>{ele.urlCode}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>

            <Container style={{ display: "flex" }}>
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
        </Fragment>
    )
};

export default List;