import { Fragment, useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap"
import QRCode from "qrcode.react";
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"


const List = () => {

    const [urlData, setUrlData] = useState([]);

    const fetchUrlData = async () => {
        const res = await fetch("http://localhost:5000/api/url/show");
        const data = await res.json();
        return setUrlData(data);
    }

    useEffect(() => {
        fetchUrlData();
    }, [])


    return (
        <Fragment>
            <Container className="mt-5">
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
                            urlData.map((ele, i) =>
                                <tr>
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