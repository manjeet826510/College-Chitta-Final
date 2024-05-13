import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';



const ReviewtCard = ({author, img,title, placements, infrastructure, faculty, other, timestamp}) => {
  console.log(placements);
  return (
    <div>
      <Card className="comment-card">
        <Row>
          <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}} xs={3} md={1}>
            <img
              src={img}
              alt="Profile Picture"
              className="profile-pic-comment"
            />
          </Col>
          <Col>
            
            <Row className="comment-author">{author}</Row>
            <br/>
            <hr/>
            <Row className="comment-author">{title}</Row>
            <hr/>
            <Row className="comment-author">Placements</Row>
            <Row className="comment-text" style={{marginLeft: '0.1rem', paddingRight: '1rem'}}>
             {placements}
            </Row>
            <hr/>
            <Row className="comment-author">Infrastructure</Row>
            <Row className="comment-text" style={{marginLeft: '0.1rem', paddingRight: '1rem'}}>
             {infrastructure}
            </Row>
            <hr/>
            <Row className="comment-author">Faculty</Row>
            <Row className="comment-text" style={{marginLeft: '0.1rem', paddingRight: '1rem'}}>
             {faculty}
            </Row>
            <hr/>
            <Row className="comment-author">Other</Row>
            <Row className="comment-text" style={{marginLeft: '0.1rem', paddingRight: '1rem'}}>
             {other}
            </Row>
            <hr/>
            <Row className="comment-text">
            <Card.Text className="text-muted" style={{marginTop: '1rem'}}>{timestamp}</Card.Text>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ReviewtCard;
