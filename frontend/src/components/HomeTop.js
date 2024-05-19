import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SearchBoxMobile from './SearchBoxMobile';

const HomeTop = () => {
  
  return (
    <div className="background firstSection">
      <Container fluid>
        <Row className='main-box'>
          {/* For desktop view: Logo and Text side by side */}
          <Row className='main-box-r1'>
          <Col md={12} lg={6}>
            <div className="firstHalf">
              <p className="text-big">The Future of Education is here</p>
              <p className="text-small">This is a career consultant organization. Here we provide Career guidance, counseling for Engineering and Medical. We provide the best college according to their rank and cutoff. The Future of Education is here</p>
              <div className="buttons">
            <Button variant="outline-dark" size='lg' className="custom-btn" href='https://www.youtube.com/@MentorRaju' target='__blank'>Watch Video</Button>
              </div>
            </div>
            <Row className='searchbox-row'>
            <SearchBoxMobile/>
          </Row>
          </Col>
          <Col md={12} lg={6}>
           
            <div className="secondHalf">
              {/* <img src="img.jpg" alt="Laptop Image" className="hometop-logo" /> */}
              {/* <video className="hometop-logo" autoPlay loop controls={true} muted src="https://videos.pexels.com/video-files/19990812/19990812-uhd_2560_1440_30fps.mp4"></video> */}
              <iframe width="560" height="315" src="https://www.youtube.com/embed/MbX63of83B0?si=_77gqgNNGlEPXUbE?rel=0" title="YouTube video player" frameborder="0" allow="" referrerpolicy="" allowfullscreen></iframe>
            </div>
          </Col>
          </Row>
          
        </Row>
        {/* For desktop view: Search at the bottom */}
       
      </Container>
    </div>
  );
};

export default HomeTop;
