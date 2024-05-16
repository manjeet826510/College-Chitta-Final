import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AuthorsSection from '../components/AuthorsSection';
import { Helmet } from 'react-helmet-async';

const ServicesPage = () => {
  

  return (
    <div style={{marginTop: '3rem', marginBottom: '3rem'}}>
      <Helmet>
        <title>About</title>
      </Helmet>
      {/* College Chitta Overview */}
      <section id="college-chitta">
        <Container>
          <Row>
            <Col>
              <h2 className='text-center mb-4'>College Chitta Overview</h2>
              {/* Add content about College Chitta */}
              College Chitta is a comprehensive platform aimed at simplifying the process of college and course selection for students. Launched in 2024.

With a repository of reliable information on over 60,000 institutions and 3,75,000 courses, College Chitta serves as a one-stop solution for students seeking undergraduate (UG) and postgraduate (PG) courses both in India and abroad. Whether it's guidance on management, science, engineering, banking, finance, or other educational streams, College Chitta offers personalized assistance based on each student's educational background and career interests.

Education seekers benefit from detailed insights into career choices, courses, exams, colleges, admission criteria, eligibility, fees, placement statistics, rankings, scholarships, and latest updates. They can engage with other users, experts, current students, and alumni groups to make informed decisions about their academic journey.
            </Col>
          </Row>
        </Container>
      </section>

      {/* Founders */}
      

      <section id="founders">
        <Container>
          <Row>
            <Col>
              {/* Add content about founders */}
             <AuthorsSection/>
            </Col>
          </Row>
        </Container>
      </section>

      {/* College Reviews */}
      <section id="college-reviews">
        <Container>
          <Row>
            <Col>
              <h2 className='text-center mb-4'>College Reviews</h2>
              {/* Add content about college reviews */}
              College reviews are a critical part of College Chitta. Students share their college experiences on this platform, enabling education seekers to make an informed choice about their academic journey. Shiksha has become a trustworthy platform with over 4 lakh+ verified student reviews posted by students across India for colleges and courses. Students can access college placement statistics, academic and infrastructure standards through these reviews. There have been 5M+ reads of reviews by users in last one year.
            </Col>
          </Row>
        </Container>
      </section>

      {/* Videos and Social Media */}
      <section id="videos-social-media">
        <Container>
          <Row>
            <Col>
              <h2 className='text-center mb-4 mt-4'>Videos and Social Media</h2>
              {/* Add content about videos and social media */}
              As the market leaders in college and course selection, College Chitta also produces in-house video content that summarizes the unique insights of College Chitta platform. Over 2000 videos across a host of topics on college and course selection and exam preparation and experiences are available on College Chitta YouTube channel. These videos are embedded on the most relevant and contextual pages across the site. College Chitta also aggregates videos from other channels, primarily from students who have captured their own experiences to then showcase these on the most relevant pages. 
              <br/>

              College Chitta Youtube channel (<a href='https://www.youtube.com/@MentorRaju' target='_blank'>https://www.youtube.com/@MentorRaju</a>)
            </Col>
          </Row>
        </Container>
      </section>

      {/* Add more sections as needed */}

      
    </div>
  );
};

export default ServicesPage;
