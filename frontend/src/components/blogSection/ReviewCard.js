import React, { useContext, useEffect, useState } from 'react';
import { Card, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { Store } from '../../Store';
import axios from 'axios';
import getError from '../../utils';
import { toast } from 'react-toastify';



const ReviewCard = ({ author, deptStream, img, title, placements, infrastructure, faculty, other, id, timestamp, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPlacements, setEditedPlacements] = useState(placements);
  const [editedInfrastructure, setEditedInfrastructure] = useState(infrastructure);
  const [editedFaculty, setEditedFaculty] = useState(faculty);
  const [editedOther, setEditedOther] = useState(other);
  const [commentHeight0, setCommentHeight0] = useState('auto');
  const [commentHeight1, setCommentHeight1] = useState('auto');
  const [commentHeight2, setCommentHeight2] = useState('auto');
  const [commentHeight3, setCommentHeight3] = useState('auto');
  const [commentHeight4, setCommentHeight4] = useState('auto');

  const { state } = useContext(Store);
  const { userInfo } = state;

  const editReview = () => {
    setShowModal(true);
  };
 

  const handleCloseModal = () => {
    setShowModal(false);
  };



  const handleChange0 = (event) => {
    setEditedTitle(event.target.value);
    setCommentHeight0(`${event.target.scrollHeight}px`);
  };

  const handleChange1 = (event) => {
    setEditedPlacements(event.target.value);
    setCommentHeight1(`${event.target.scrollHeight}px`);
  };

  const handleChange2 = (event) => {
    setEditedInfrastructure(event.target.value);
    setCommentHeight2(`${event.target.scrollHeight}px`);
  };

  const handleChange3 = (event) => {
    setEditedFaculty(event.target.value);
    setCommentHeight3(`${event.target.scrollHeight}px`);
  };

  const handleChange4 = (event) => {
    setEditedOther(event.target.value);
    setCommentHeight4(`${event.target.scrollHeight}px`);
  };

  useEffect(() => {
    const calculateInitialHeight = () => {
      const textarea0 = document.getElementById('titleTextarea');
      const textarea1 = document.getElementById('placementTextarea');
      const textarea2 = document.getElementById('infrastructureTextarea');
      const textarea3 = document.getElementById('facultyTextarea');
      const textarea4 = document.getElementById('otherTextarea');
      if (textarea0) setCommentHeight0(`${textarea1.scrollHeight}px`);
      if (textarea1) setCommentHeight1(`${textarea1.scrollHeight}px`);
      if (textarea2) setCommentHeight2(`${textarea2.scrollHeight}px`);
      if (textarea3) setCommentHeight3(`${textarea3.scrollHeight}px`);
      if (textarea4) setCommentHeight4(`${textarea4.scrollHeight}px`);
    };
    if (showModal) {
      calculateInitialHeight();
    }
  }, [showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/reviews/${id}`,
        {
          oldReview: [title, placements, infrastructure, faculty, other],
          title: editedTitle, 
          placements: editedPlacements, 
          infrastructure: editedInfrastructure, 
          faculty: editedFaculty, 
          other: editedOther,           
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        }
      );
      setShowModal(false);
      if(data){
        toast.success('Review will get updated after verification')
      }
      // onUpdate(id, editedTitle, editedPlacements, editedInfrastructure, editedFaculty, editedOther); // Notify parent component of the update
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <Card className="comment-card">
        <Row>
          <Col xs={3} md={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <img src={img} alt="Profile Picture" className="profile-pic-comment" />
          </Col>
          <Col>
            <Row className="comment-author">
              <Row>
              <Col>{author}</Col>
              {author === userInfo.name && (
                <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={editReview} variant='light'>
                    <i style={{ color: 'blue' }} className="fas fa-edit"></i>
                  </Button>
                  <Button onClick={() => onDelete(id)} variant='light'>
                    <i style={{ color: 'red' }} className="fas fa-trash"></i>
                  </Button>
                </Col>
              )}

            </Row>
            

            <Row>
              <p style={{fontSize: '0.9rem', fontStyle: 'none'}}>
                <i>
              {deptStream}</i>
              </p>
            </Row>


            </Row>
            <br />
            <hr />
            <Row className="comment-author">{title}</Row>
            <hr />
            <Row className="comment-author">Placements</Row>
            <Row className="comment-text" style={{ marginLeft: '0.1rem', paddingRight: '1rem' }}>
              {placements}
            </Row>
            <hr />
            <Row className="comment-author">Infrastructure</Row>
            <Row className="comment-text" style={{ marginLeft: '0.1rem', paddingRight: '1rem' }}>
              {infrastructure}
            </Row>
            <hr />
            <Row className="comment-author">Faculty</Row>
            <Row className="comment-text" style={{ marginLeft: '0.1rem', paddingRight: '1rem' }}>
              {faculty}
            </Row>
            <hr />
            <Row className="comment-author">Other</Row>
            <Row className="comment-text" style={{ marginLeft: '0.1rem', paddingRight: '1rem' }}>
              {other}
            </Row>
            <hr />
            <Row className="comment-text">
              <Card.Text className="text-muted" style={{ marginTop: '1rem' }}>{timestamp}</Card.Text>
            </Row>
          </Col>
        </Row>
      </Card>

      <Modal aria-labelledby="contained-modal-title-vcenter" centered show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={img}
                alt="Profile Picture"
                style={{
                  width: '100%',
                  maxWidth: '70px',
                  height: 'auto',
                  borderRadius: '50%',
                }}
              />
              {author}
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <Form.Group controlId="titleText">
              <Form.Label>Title</Form.Label>
              <Form.Control
                id="titleTextarea"
                value={editedTitle}
                as="textarea"
                placeholder="Add title..."
                required
                onChange={handleChange0}
                style={{ resize: 'none', overflowY: 'hidden', height: commentHeight0 }}
                autoFocus
              />
            </Form.Group>
        

            <Form.Group controlId="placementText">
              <Form.Label>Placements</Form.Label>
              <Form.Control
                id="placementTextarea"
                value={editedPlacements}
                as="textarea"
                placeholder="Add placement details..."
                required
                onChange={handleChange1}
                style={{ resize: 'none', overflowY: 'hidden', height: commentHeight1 }}
                autoFocus
              />
            </Form.Group>

            <Form.Group controlId="infrastructureText">
              <Form.Label>Infrastructure</Form.Label>
              <Form.Control
                id="infrastructureTextarea"
                value={editedInfrastructure}
                as="textarea"
                placeholder="Add infrastructure details..."
                required
                onChange={handleChange2}
                style={{ resize: 'none', overflowY: 'hidden', height: commentHeight2 }}
                autoFocus
              />
            </Form.Group>

            <Form.Group controlId="facultyText">
              <Form.Label>Faculty</Form.Label>
              <Form.Control
                id="facultyTextarea"
                value={editedFaculty}
                as="textarea"
                placeholder="Add faculty details..."
                required
                onChange={handleChange3}
                style={{ resize: 'none', overflowY: 'hidden', height: commentHeight3 }}
                autoFocus
              />
            </Form.Group>

            <Form.Group controlId="otherText">
              <Form.Label>Other</Form.Label>
              <Form.Control
                id="otherTextarea"
                value={editedOther}
                as="textarea"
                placeholder="Add other details..."
                required
                onChange={handleChange4}
                style={{ resize: 'none', overflowY: 'hidden', height: commentHeight4 }}
                autoFocus
              />
            </Form.Group>

            <Button style={{ marginTop: '0.5rem', marginBottom: '1rem' }} variant="primary" type="submit">
              Save
            </Button>

          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReviewCard;
