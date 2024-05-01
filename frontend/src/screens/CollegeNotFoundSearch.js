import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CollegeNotFoundSearch = () => {
  return (
    <div style={{height: '60vh', display: 'flex', justifyContent: "center", alignItems: "center"}}>
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h2>College Not Found</h2>
          <p>
            We couldn't find any colleges matching your search criteria.
            Please try again with a different search term.
          </p>
          <p>
            You can also explore our{" "}
            <Link to="/">homepage</Link> to discover featured colleges.
          </p>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default CollegeNotFoundSearch;
