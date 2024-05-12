import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const CommentCard = ({author, img, text, timestamp}) => {
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
            <Row className="comment-text" style={{marginLeft: '0.1rem', paddingRight: '1rem'}}>
             {text}
            </Row>
            <Row className="comment-text">
            <Card.Text className="text-muted" style={{marginTop: '1rem'}}>{timestamp}</Card.Text>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CommentCard;
