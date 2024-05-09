import React, { useEffect } from 'react';
import '../ComingSoon.css'
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const ComingSoon = () => {
    const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the route changes
  }, [location]); // Trigger effect when location changes
  return (
    <div className="coming-soon-container">
      <div className="text-container">
        <h1>Coming Soon ...</h1>
      </div>
      <div className="construction-cone"></div>
      <div style={{marginTop: "2rem"}}>
      <Button variant='dark' href='/'>Go to Home Page</Button>
      </div>
    </div>
  );
};

export default ComingSoon;
