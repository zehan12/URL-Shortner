import { Fragment } from "react"
import { Container, Navbar, Nav } from 'react-bootstrap';
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { NavDropdown } from "react-bootstrap";


const Header = ({ handlePage, handleMode, page, mode }) => {
    console.log(mode)
    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                <Navbar.Brand className="rainbow-text icon" href="#home">Url Shortner</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link
                                onClick={(e) => handlePage(e.target.innerText)}
                                className={`${page === "HOME" ? "active" : ""}`} >HOME</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link
                                onClick={(e) => handlePage(e.target.innerText)}
                                className={`${page === "LIST" ? "active" : ""}`} >LIST</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <div class="custom-control custom-switch">
                            <input onChange={() => handleMode()} type="checkbox" class="custom-control-input" id="darkSwitch" />
                            <label class="custom-control-label" for="darkSwitch">Dark Mode</label>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default Header;