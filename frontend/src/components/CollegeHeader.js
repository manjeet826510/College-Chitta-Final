import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Information from './collegeHeader/Information';
import CoursesFees from './collegeHeader/CoursesFees';
import Cutoff from './collegeHeader/Cutoff';
import ReviewUpload from '../screens/ReviewUpload';
import ReviewSection from './blogSection/ReviewSection';

function CollegeHeader({ college }) {
    const [navLink, setNavLink] = useState("info");

    if (!college) {
        // Handle case when college is not found
        return <div>College not found</div>;
    }

    // Now you can access college.cutoff and other properties safely

    return (
        <>
            <Navbar bg="light" data-bs-theme="light" style={{ border: "solid black 1px" }}>
                <Container>
                    <Nav className="me-auto justify-content-center flex-column flex-sm-row" style={{ margin: '0 auto' }}>
                        <Nav.Link onClick={() => setNavLink("info")} style={{ margin: '0 10px', color: navLink === "info" ? "red" : "inherit" }}>Information</Nav.Link>
                        <Nav.Link onClick={() => setNavLink("cf")} style={{ margin: '0 10px', color: navLink === "cf" ? "red" : "inherit" }}>Courses & Fees</Nav.Link>
                        {college.cutoff.map((nav, index) => (
                            <Nav.Link key={index} onClick={() => setNavLink(index.toString())} style={{ margin: '0 10px', color: navLink === index.toString() ? "red" : "inherit" }}>{nav.cutoffName} Cutoff</Nav.Link>
                        ))}
                        <Nav.Link onClick={() => setNavLink("reviews")} style={{ margin: '0 10px', color: navLink === "reviews" ? "red" : "inherit" }}>Reviews</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>

            {navLink === "info" ? <Information college={college} /> :
                navLink === "cf" ? <CoursesFees college={college} /> :
                navLink === "reviews" ? <ReviewSection college={college} /> :
                    <Cutoff college={college} index={parseInt(navLink)} />}
        </>
    );
}

export default CollegeHeader;
