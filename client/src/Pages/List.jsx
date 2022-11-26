import { Fragment, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "../utils/axios";
import { useQuery } from 'react-query';
import GlitchLoading from "../components/GlitchLoading";
import { FaRegCopy, FaTrash, FaEye } from "react-icons/fa";
import Modal from "../components/Modal/index";
import { useMutation } from "react-query";
import SvgComponent from "../components/SvgComponent"

const List = ({ mode }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [link, setLink] = useState("");

    const { isLoading, data, refetch } = useQuery('urlData', () => axios.get("api/url/show/"));

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
            <div className="container-sm" style={{ height: "75vh", padding: "0em", marginTop: "0em 1em" }}>
                <h1 className="gradient-text">List of Created Short URL</h1>

                <Container>
                    {

                        data.data.length !== 0 ?
                            <table className="list-table">
                                <thead>
                                    <th>#</th>
                                    <th>original url</th>
                                    <th>shorten url</th>
                                    <th>clicks</th>
                                    <th width={"110"}>Actions</th>
                                </thead>
                                <tbody>
                                    {
                                        data &&
                                        data.data.map((ele, i) =>
                                            <tr key={ele.urlCode}>
                                                <td>{i + 1}</td>
                                                <td className="text-start">  <img alt="img" style={{ height: "16px", width: "16px", borderRadius: "50%" }} src={`https://www.google.com/s2/favicons?domain=${ele.originalUrl}`} /> {ele.originalUrl}</td>
                                                <td><a href={ele.shortUrl} target="_blank" rel="noreferrer">{ele.shortUrl}</a></td>
                                                <td>{ele.click}</td>
                                                <td className="td-flex">
                                                    <div style={{ cursor: "pointer" }} onClick={() => navigator.clipboard.writeText(ele.shortUrl)} > <FaRegCopy /> </div>
                                                    <div onClick={() => mutate(ele.urlCode)} > <FaTrash color="#8b0000" /> </div>
                                                    <div onClick={() => { setLink(ele); setModalOpen(true) }}> <FaEye />  </div>
                                                </td>

                                            </tr>

                                        )

                                    }

                                </tbody>
                            </table>

                            : <div style={{ margin: "40px 0", height: "30%" }}>
                                <h4>No Result To Show</h4>
                                <SvgComponent className="svg" />
                                <h4>No Result Found</h4>
                            </div>}
                </Container>
            </div>
        </Fragment>
    )
};

export default List;

