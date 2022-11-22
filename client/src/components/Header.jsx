import { Fragment } from "react"
import { Container, Navbar, Nav } from 'react-bootstrap';
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { NavDropdown } from "react-bootstrap";

import "../App.css"


const Header = ({ handlePage, handleMode, page, mode }) => {
    console.log(mode)
    return (
        <Fragment>
            <Navbar collapseOnSelect classname="container-fluid container-sm" style={{ padding: "1em 5em" }} expand="lg" bg={mode ? "dark" : "light"} variant={mode ? "dark" : "light"}>
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
                    <label class="switch" style={{margin:"10px"}}>
                        <input type="checkbox" value={mode} onChange={() => handleMode()} />
                        <span class="slider round"></span>
                    </label>

                    <label class="custom-control-label" for="darkSwitch">{ mode ? "Dark Mode" : "Light Mode" }</label>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    )
}

export default Header;