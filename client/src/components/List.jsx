import { Fragment, useState } from "react";
import { Table, Container } from "react-bootstrap"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"


const List = ({ urlData }) => {
    const [selectedId, setSelectedId] = useState(null)
    return (
        <Fragment>
            <Container className="mt-5">
                <h2>List of Created Short URL</h2>


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
                                    <td>{i+1}</td>
                                    <td>{ele.originalUrl}</td>
                                    <td><a href={ele.shortUrl} target="_blank" rel="noreferrer">{ele.shortUrl}</a></td>
                                    <td>{ele.click}</td>
                                    <td>{ele.urlCode}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        </Fragment>
    )
};

export default List;