import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";






const CollegeScreenSearch = ({collg}) => {
    console.log(collg);
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts

  

// console.log(filteredCollege);

  }, []);

  



  

  
  return  (
    <>
    <div className="position-relative">
  <Container fluid className="college-img-header" style={{backgroundImage: `url(${collg.image})`}}>
    {/* Background image */}
  </Container>
  <Container fluid className="college-details position-absolute top-0 start-0 ">
    {/* Contents of the college-details container */}
    <Row className="college-top">
      <Col lg={1}>
        <Image src={collg.logo} />
      </Col>
      <Col lg={11}>
        <Row>
          <Row className="college-name-header">{collg.name}</Row>
          <Row>{collg.location}</Row>
        </Row>
      </Col>
    </Row>
  </Container>
</div>



        <br/>
        <br/>
    </>
  );
};

export default CollegeScreenSearch;
