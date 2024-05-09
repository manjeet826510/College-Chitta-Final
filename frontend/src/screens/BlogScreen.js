import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import CollegeHeader from "../components/CollegeHeader";
import { useParams } from "react-router-dom";
import CollegeNotFound from "./CollegeNotFound";
import Spinner from 'react-bootstrap/Spinner';
import MessageBox from "../components/MessageBox";
import Blog from "../components/blogSection/Blog";


const BlogScreen = () => {

  const blogImg = 'https://cdn.pixabay.com/photo/2018/05/13/20/21/lake-3397784_640.jpg';



  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts

    
  }, []);

  

 
  

 

  return (
    <>
      <div className="position-relative">
        <Container fluid className="college-img-header" style={{backgroundImage: `url(${blogImg})`}}>
          {/* Background image */}
        </Container>
        <Container fluid className="college-details position-absolute top-0 start-0">
          {/* Contents of the college-details container */}
          <Row className="college-top align-items-center">
            
            <Col >
              <Row className="align-items-center" style={{backgroundColor: '', justifyContent: 'center', alignItems: 'center'}}>
               
                  <div className="college-name-header" style={{backgroundColor: '', display: "flex", justifyContent: 'center', alignItems: 'center'}}>Welcome to Blog Section</div>
                
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <Blog/>
      <br/>
      <br/>
    </>
  );
};

export default BlogScreen;
