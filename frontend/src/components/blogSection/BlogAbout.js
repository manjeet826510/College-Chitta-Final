import React from "react";
import { Card } from "react-bootstrap";

const About = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem'}}>
        <Card style={{ width: '90%', padding: '1rem' }}>
      <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>
        About Me
      </h1>
      <p className='mx-auto leading-relaxed text-base mb-4'>
      As a career counselor, my aim is to empower individuals in
       navigating their professional paths and achieving fulfillment
        in their careers. With a deep understanding of various industries,
         job markets, and career development strategies,
          I provide personalized guidance tailored to each individual's
           unique goals, interests, and strengths.
      </p>
      <p className='mx-auto leading-relaxed text-base mb-4'>
      In my approach, I prioritize holistic career development,
       considering not only immediate job prospects but also
        long-term career satisfaction and growth. Through one-on-one
         consultations, career assessments, and skill-building exercises, 
         I assist clients in identifying their passions, honing their skills,
       and making informed career decisions.
      </p>
      <p className='mx-auto leading-relaxed text-base mb-4'>
      My ultimate goal is to support individuals in realizing their 
      full potential and creating fulfilling careers that align with 
      their values and aspirations. Whether it's exploring new career paths,
       advancing in their current field, or overcoming career challenges,
        I am dedicated to providing guidance, encouragement, and practical
         strategies to help individuals thrive in their professional journeys.
        ea.
      </p>
      </Card>
    </div>
  );
};

export default About;