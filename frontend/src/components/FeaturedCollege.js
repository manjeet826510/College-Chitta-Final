import React from 'react';
import College from './College';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';
import MessageBox from './MessageBox';


const FeaturedCollege = ({ colleges, error }) => {
  return (
    <div className='featured-colleges'>
  <h1>Featured Colleges</h1>
  {error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    colleges.length === 0 ? (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    ) : (
      <div className="colleges">
        <Row className="justify-content-center"> {/* Align items in center */}
          {colleges.map((college) => (
            <Col xs={12} lg={3} md={6} className="mb-3" key={college.slug}>
              <College college={college} />
            </Col>
          ))}
        </Row>
      </div>
    )
  )}
</div>

  );
};

export default FeaturedCollege;
