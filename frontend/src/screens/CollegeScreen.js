import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import CollegeHeader from "../components/CollegeHeader";
import { useParams } from "react-router-dom";
import CollegeNotFound from "./CollegeNotFound";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import MessageBox from "../components/MessageBox";


const CollegeScreen = () => {
  const { slug } = useParams();
  const [college, setCollege] = useState({});
  const [error, seterror] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when component mounts

    const getCollegeData = async () => {
      try {
        const { data } = await axios.get('/api/colleges');
        setCollege(data.find(college => college.slug === slug));
      } catch (error) {
        console.error('Error fetching college data:', error);
        seterror(error.message)

      } finally {
        setLoading(false);
      }
    };

    getCollegeData();
  }, [slug]);

  if(error){
    return <MessageBox variant="danger">{error}</MessageBox>
  }

  if (loading) {
    return <div className="d-flex justify-content-center mt-5">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>;
  }

  if (!college || !college.name) {
    return <CollegeNotFound />;
  }

  return (
    <>
      <div className="position-relative">
        <Container fluid className="college-img-header" style={{backgroundImage: `url(${college.image})`}}>
          {/* Background image */}
        </Container>
        <Container fluid className="college-details position-absolute top-0 start-0">
          {/* Contents of the college-details container */}
          <Row className="college-top align-items-center">
            <Col lg={2} md={2} xs={4}>
              <Image src={college.logo} className="college-logo" />
            </Col>
            <Col lg={10} md={10} xs={8}>
              <Row className="align-items-center">
                <Col>
                  <h1 className="college-name-header">{college.name}</h1>
                  <p className="college-location">{college.location}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <CollegeHeader college={college} />
      <br/>
      <br/>
    </>
  );
};

export default CollegeScreen;
