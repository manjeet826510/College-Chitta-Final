import React, { useContext, useState, useEffect } from 'react';
import { Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Store } from '../../Store';
import axios from 'axios';
import { toast } from 'react-toastify';
import getError from '../../utils';

const CommentCard = ({ author, img, text, timestamp, articleName, id, onUpdate, onDelete }) => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [showModal, setShowModal] = useState(false);
  const [commentHeight, setCommentHeight] = useState('auto');
  const [editedComment, setEditedComment] = useState(text);

  const editComment = () => {
    setShowModal(true);
  };

  const handleChange = (event) => {
    const newHeight = `${event.target.scrollHeight}px`;
    setCommentHeight(newHeight);
    setEditedComment(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/comments/${id}`,
        {
          author: author,
          img: img,
          text: editedComment,
          articleName: articleName,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        }
      );
      setShowModal(false);
      onUpdate(id, editedComment); // Notify parent component of the update
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const calculateInitialHeight = () => {
      const textarea = document.getElementById('commentTextarea');
      if (textarea) {
        const newHeight = `${textarea.scrollHeight}px`;
        setCommentHeight(newHeight);
      }
    };
    if (showModal) {
      calculateInitialHeight();
    }
  }, [showModal, handleChange]);

  return (
    <div>
      <Card className="comment-card">
        <Row>
          <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }} xs={3} md={1}>
            <img
              src={img}
              alt="Profile Picture"
              className="profile-pic-comment"
            />
          </Col>
          <Col>
            <Row className="comment-author">
              <Col>{author}</Col>
              {author === userInfo.name && (
                <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={editComment} variant='light'>
                    <i style={{ color: 'blue' }} className="fas fa-edit"></i>
                  </Button>
                  <Button onClick={() => onDelete(id)} variant='light'>
                    <i style={{ color: 'red' }} className="fas fa-trash"></i>
                  </Button>
                </Col>
              )}
            </Row>
            <Row className="comment-text" style={{ marginLeft: '0.1rem', paddingRight: '1rem', whiteSpace: 'pre-wrap' }}>
              {text}
            </Row>
            <Row className="comment-text">
              <Card.Text className="text-muted" style={{ marginTop: '1rem' }}>{timestamp}</Card.Text>
            </Row>
          </Col>
        </Row>
      </Card>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal} onHide={handleCloseModal}>
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
            <Form.Group controlId="commentText">
              <Form.Control
                id="commentTextarea"
                value={editedComment}
                as="textarea"
                placeholder="Add a comment..."
                required
                onChange={handleChange}
                style={{ resize: 'none', overflowY: 'hidden', height: commentHeight }}
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

export default CommentCard;
