import { Fragment } from "react"
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <Fragment>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">URL Shortner</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#pricing">List</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default Header;