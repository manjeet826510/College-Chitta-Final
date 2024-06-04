import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';

const Footer = () => {

  


  return (
    <>
    <div className='footer' style={{marginTop: '3rem'}}>
      <hr/>
      <br/>
      <br/>
      <br/>
      <Row className='footer-row'>
        <Col className='footer-col' md={3} xs={12}>
          <div>
          <h1>Exams</h1>
          <ul>
            <li><Link to='https://jeemain.nta.ac.in/' target='_blank'>Jee Mains</Link></li>
            <li><Link to='https://jeeadv.ac.in/' target='_blank'>Jee Advanced</Link></li>
            <li><Link to='https://wbjeeb.nic.in/' target='_blank'>Wbjee Jee</Link></li>
            <li><Link to='https://www.comedk.org/' target='_blank'>Comedk</Link></li>
          </ul>
          </div>
        </Col>
        <Col className='footer-col' md={3} xs={12}>
          <div>
          <h1>College Chitta</h1>
          <ul>
            <li><Link to='/services'>Services</Link></li>
            <li><Link to='/blog'>Blogs</Link></li>
            <li><Link to='/admission'>Admission</Link></li>
            <li><Link to='/counselling'>Counselling</Link></li>
          </ul>
          </div>
        </Col>
        <Col className='footer-col' md={3} xs={12}>
          <div>
          <h1>Contact Us</h1>
          <ul>
            <li><Link to='https://www.instagram.com/hustlewithmaharufh/' target='_blank'>Instagram</Link></li>
            <li><Link to='https://www.facebook.com/maharufh.alimir' target='_blank'>Facebook</Link></li>
            <li><Link to='https://twitter.com/MaharufhM?s=08' target='_blank'>Twitter</Link></li>
            <li><Link to='https://t.me/MentorRaju' target='_blank'>Telegram</Link></li>
          </ul>
          </div>
        </Col>
        <Col className='footer-col' md={3} xs={12}>
          <div>
          <h1>About Us</h1>
          <ul>
            <li><a href='/about/#college-chitta' >college-chitta.com</a></li>
            <li><a href='/about/#founders' >Founder</a></li>
            <li><a href='/about/#college-reviews' >College Reviews</a></li>
            <li><a href='/about/#videos-social-media' >Videos</a></li>
            
          </ul>
          </div>
        </Col>
      </Row>
    </div>
    <div className="text-center" style={{backgroundColor: '#000', opacity: '0.9', paddingBottom: '1rem', color: '#a0a3a2'}}>© 2024 College Chitta. All rights reserved.
</div>
    </>
  )
}

export default Footer;
