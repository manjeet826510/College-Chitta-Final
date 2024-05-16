import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUniversity, FaGraduationCap, FaComments, FaBook } from 'react-icons/fa';
import '../index.css'
import { Helmet } from 'react-helmet-async';

const ServiceScreen = () => {
  return (
    <Container className="mt-5">
      <Helmet>
        <title>Services</title>
      </Helmet>
      <h1 className="text-center mb-5">Our Services</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        <ServiceCard
          icon={<FaUniversity />}
          title="College Reviews"
          description="Get detailed reviews and ratings of colleges from our experts."
        />
        <ServiceCard
          icon={<FaGraduationCap />}
          title="Admission Guidance"
          description="Receive personalized guidance for college admissions."
        />
        <ServiceCard
          icon={<FaComments />}
          title="Counselling"
          description="Expert counselling sessions to help you choose the right path."
        />
        <ServiceCard
          icon={<FaBook />}
          title="Best College Selection"
          description="Discover the best colleges based on your marks and preferences."
        />
        {/* Add more ServiceCard components for additional services */}
      </Row>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </Container>
  );
};

const ServiceCard = ({ icon, title, description }) => {
  return (
    <Col>
      <Card className="h-100" style={{ paddingTop: '4rem', paddingBottom: '4rem'}}>
        <Card.Body>
          <div className="text-center">{icon}</div>
          <Card.Title className="text-center mt-3">{title}</Card.Title>
          <Card.Text className="text-center">{description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ServiceScreen;
