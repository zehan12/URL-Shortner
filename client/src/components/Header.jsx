import { Fragment } from "react"
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = ( { handlePage, page } ) => {


    return (
        <Fragment>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">URL Shortner</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link
                         onClick={(e)=>handlePage(e.target.innerText)}
                         className={`${ page === "HOME" ? "active" : "" }`} >HOME</Nav.Link>
                        <Nav.Link
                          onClick={(e)=>handlePage(e.target.innerText)}
                         className={`${ page === "LIST" ? "active" : "" }`} >LIST</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default Header;