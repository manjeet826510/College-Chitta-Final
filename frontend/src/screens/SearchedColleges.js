import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import College from '../components/College';

const SearchedColleges = ({colleges}) => {
    // const colleges = data.colleges;
  return (
    <div className='featured-colleges'>
        <h1>Searched Colleges</h1>
        <div className="colleges">
            <Row className="justify-content-center">
                {colleges.map((college) => (
                <Col xs={6} lg={3} md={6} className="mb-3" key={college.slug}>
                    <College college={college} />
                </Col>
                ))}
            </Row>
        </div>
    </div>
  )
}

export default SearchedColleges;