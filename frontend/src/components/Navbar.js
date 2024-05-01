import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';



const NavbarComp = () => {
  return (
    <Navbar className='nav-bar' sticky="top"  bg="dark" variant="dark" expand="lg">

            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                        <img
                        src="img.jpg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="Mentor Raju logo"
                        />
                    </Navbar.Brand>
              </LinkContainer>

                

              <Navbar.Toggle aria-controls="basic-navbar-nav" />

              <Navbar.Collapse id="basic-navbar-nav">
              <br/>

                <Nav className="me-auto w-100 justify-content-start">

                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/blog" className="nav-link">
                    Blog
                  </Link>
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                  <Link to="/contact" className="nav-link">
                    Contact
                  </Link>
                  <Link to="/service" className="nav-link">
                    Service
                  </Link>
                  
                  
                </Nav>

                </Navbar.Collapse>
                <SearchBox/>
                <Navbar.Collapse>
                <Nav className="me-auto w-100 justify-content-end right-nav">

                  <Link to="/admission" className="nav-link">
                    Admission
                  </Link>
                  <Link to="/counselling" className="nav-link">
                    Counselling
                  </Link>
                  
                  
                </Nav>

              </Navbar.Collapse>
            </Container>
          </Navbar>
  )
}

export default NavbarComp