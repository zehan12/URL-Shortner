import { Fragment, useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "../utils/axios";
import QRCode from "qrcode.react";
import { useQuery, useMutation } from 'react-query';
import GlitchLoading from "../components/GlitchLoading";

import { FaRegCopy } from "react-icons/fa";




import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { BASE_URL } from "../utils/constant";
import Modal from "../components/Modal/index";

const List = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [link, setLink] = useState("");


    const mutation = useMutation({
        mutationFn: (code) => {
            return axios.delete(BASE_URL + `api/url/short/${code}`)
        }
    })

    const { isLoading, error, data } = useQuery('urlData', () => axios.get("api/url/show/"));


    if (isLoading) {
        return <GlitchLoading />
    }

    // const handleDelete = async ( code ) => {
    //     try {
    //         console.log(code)
    //     const res = await axios.delete( BASE_URL+`api/url/short/${code}`);

    //     } catch (err) {
    //         console.log(err)
    //     }
    // };



    return (
        <Fragment>
            {modalOpen && <Modal setOpenModal={setModalOpen} url={link} />}

            <Container style={{ padding: "30px" }}>
                <h1 className="gradient-text">List of Created Short URL</h1>


                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>original url</th>
                            <th>shorten url</th>
                            <th>clicks</th>
                            <th>code</th>
                            <th>copy</th>
                            <th>Delete</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (mutation.isSuccess || data) &&
                            data.data.map((ele, i) =>
                                <tr key={ele.urlCode}>
                                    <td>{i + 1}</td>
                                    <td style={{ align: "left" }}>  <img style={{ height: "16px", width: "16px" }} src={`https://www.google.com/s2/favicons?domain=${ele.originalUrl}`} /> {ele.originalUrl}</td>
                                    <td><a href={ele.shortUrl} target="_blank" rel="noreferrer">{ele.shortUrl}</a></td>
                                    <td>{ele.click}</td>
                                    <td>{ele.urlCode}</td>
                                    <td style={{ cursor: "pointer" }} onClick={() => navigator.clipboard.writeText(ele.shortUrl)}><FaRegCopy /></td>
                                    <td
                                        onClick={() => {
                                            mutation.mutate(ele.urlCode)
                                        }}
                                    // onClick={()=>handleDelete(ele.urlCode)}
                                    >delete</td>
                                    <td
                                        onClick={() => {
                                            setLink(ele)
                                            setModalOpen(true)
                                        }}
                                    >
                                        View</td>

                                </tr>


                            )
                        }
                    </tbody>
                </Table>
            </Container>
            <Container style={{ display: "flex" }}>
                {
                    data && data.data.map((url) => <div>
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
