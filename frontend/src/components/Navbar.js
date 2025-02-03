import React, { useContext } from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import NavDropdown from "react-bootstrap/NavDropdown";
import { Store } from '../Store';



const NavbarComp = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {  userInfo } = state;
  

 

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    // console.log(state);
    localStorage.removeItem("userInfo");
    // navigate('/signin');
    window.location.href = "/signin";
  };

  return (
    <Navbar className='' sticky="top"   bg="dark" variant="dark" expand="lg">

            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                        <img
                        src="https://mymernbucket-amazona.s3.ap-south-1.amazonaws.com/img.jpg"
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
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                  <Link to="/contact" className="nav-link">
                    Contact
                  </Link>
                  <Link to="/services" className="nav-link">
                    Services
                  </Link>
                  
                  
                </Nav>

                </Navbar.Collapse>

                <SearchBox/>

                <Navbar.Collapse>
                <Nav className="me-auto w-100 justify-content-end right-nav">

                  <Link to="/admission" className="nav-link">
                    Admission
                  </Link>
                  
                  <NavDropdown  title='Counselling'  id="basic-nav-dropdown">
                      <LinkContainer to="/counselling/free">
                        <NavDropdown.Item>Free</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/counselling/paid">
                        <NavDropdown.Item>Paid</NavDropdown.Item>
                      </LinkContainer>
  
                    
                    </NavDropdown>
                  

                  
                  {userInfo ? (
                    <NavDropdown  title={<img src={userInfo.image } className='profile-pic'alt="Profile" />}  id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/appointments">
                        <NavDropdown.Item>Bookings</NavDropdown.Item>
                      </LinkContainer>
  
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) 
                  : 
                  (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}


                  

                  {/*admin starts here */}

                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/appointmentslist">
                        <NavDropdown.Item>Appointments</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/collegelist">
                        <NavDropdown.Item>Colleges</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/reviewlist">
                        <NavDropdown.Item>Reviews</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/articlelist">
                        <NavDropdown.Item>Articles</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}

                  {/* admin ends here*/}


                  {/*counsellor starts here */}

                  {userInfo && userInfo.isCounsellor && (
                    <NavDropdown title="Counsellor" id="counsellor-nav-dropdown">
                      <LinkContainer to="/counsellor/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/counsellor/appointmentslist">
                        <NavDropdown.Item>Appointments</NavDropdown.Item>
                      </LinkContainer>
                      
                      <LinkContainer to="/counsellor/collegelist">
                        <NavDropdown.Item>Colleges</NavDropdown.Item>
                      </LinkContainer>
                      
                    </NavDropdown>
                  )}

                  {/* counsellor ends here*/}

                
                 
                  
                  
                </Nav>

              </Navbar.Collapse>
            </Container>
          </Navbar>
  )
}

export default NavbarComp
