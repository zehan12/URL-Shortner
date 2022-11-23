import { Fragment, useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "../utils/axios";
import QRCode from "qrcode.react";
import { useQuery } from 'react-query';
import GlitchLoading from "../components/GlitchLoading";
import { FaRegCopy, FaTrash, FaEye } from "react-icons/fa";
import Modal from "../components/Modal/index";
import { useMutation } from "react-query";

const List = ({ mode }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [link, setLink] = useState("");

    const { isLoading, error, data, refetch } = useQuery('urlData', () => axios.get("api/url/show/"));
    
    const handleDelete = async (code) => {
        const res = await axios.delete(`api/url/short/${code}`);
        return res.data;
    };
    
    const { mutate } = useMutation(handleDelete, {
        onSuccess: data => {
            refetch()
        },
        onError: (error) => {
            console.log(error)
        }
    })


   


    if (isLoading) {
        return <GlitchLoading />
    }


    return (
        <Fragment>
            {modalOpen && <Modal setOpenModal={setModalOpen} url={link} />}

            <Container className="container-sm" style={{ padding: "2em", marginTop: "3em 1em" }}>
                <h1 className="gradient-text responsive-font-example">List of Created Short URL</h1>


            {
                data.data.length !== 0 ?

                <Table striped bordered hover className={`table-responsive ${mode ? "table-dark" : ""}`}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>original url</th>
                            <th>shorten url</th>
                            <th>clicks</th>
                            <th>Actions</th>
                           
                        </tr>
                    </thead>
                    <tbody >
                        {
                            data &&
                            data.data.map((ele, i) =>
                                <tr key={ele.urlCode}>
                                    <td>{i + 1}</td>
                                    <td className="text-start">  <img style={{ height: "16px", width: "16px", borderRadius: "50%" }} src={`https://www.google.com/s2/favicons?domain=${ele.originalUrl}`} /> {ele.originalUrl}</td>
                                    <td><a href={ele.shortUrl} target="_blank" rel="noreferrer">{ele.shortUrl}</a></td>
                                    <td>{ele.click}</td>
                                    <td style={{ cursor: "pointer" }} onClick={() => navigator.clipboard.writeText(ele.shortUrl)}><FaRegCopy /></td>
                                    <td
                                        onClick={() => mutate(ele.urlCode)}
                                    >
                                        <FaTrash color="#8b0000" />
                                    </td>
                                    <td
                                        onClick={() => {
                                            setLink(ele)
                                            setModalOpen(true)
                                        }}
                                    >
                                        <FaEye /></td>

                                </tr>


                            )
                        }
                    </tbody>
                </Table>
                :"no data"

               }
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

