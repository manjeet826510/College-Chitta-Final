import React, { useContext, useState, useEffect, useReducer } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import CommentCard from './CommentCard';
import { Store } from '../../Store';
import getError from '../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loadingFetch: true };
    case "FETCH_SUCCESS":
      return { ...state, loadingFetch: false };
    case "FETCH_FAIL":
      return { ...state, loadingFetch: false, error: action.payload };
    default:
      return state;
  }
};

const CommentSection = ({ articleId, articleName }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [commentHeight, setCommentHeight] = useState('auto');

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loadingFetch, error }, dispatch] = useReducer(reducer, {
    loadingFetch: false,
    error: "",
  });

  const [isVisible, setIsVisible] = useState(!document.hidden);

  const handleVisibilityChange = () => {
    setIsVisible(!document.hidden);
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const formatTimestamp = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const saveCommentToDB = async () => {
    try {
      const { data } = await axios.post(
        '/api/comments',
        {
          author: userInfo.name,
          img: userInfo.image,
          text: comment,
          articleId: articleId,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        }
      );
      toast.success('Comment added successfully');
      setComment('');
      setCommentHeight('auto');
      setComments([data, ...comments]);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate(`/signin?redirect=/article/${articleName}`);
      return;
    }
    try {
      await saveCommentToDB();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Comment already exists.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchComments = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/comments/${articleId}`);
        if (isMounted) {
          setComments(data);
          dispatch({ type: "FETCH_SUCCESS" });
        }
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };

    fetchComments();

    return () => {
      isMounted = false;
      setComments([]);
    };
  }, [isVisible, articleName, articleId, userInfo, commentHeight]);

  const handleChange = (event) => {
    setComment(event.target.value);
    autoResizeTextarea(event.target);
  };

  const autoResizeTextarea = (element) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
    setCommentHeight(`${element.scrollHeight}px`);
  };

  const handleUpdateComment = (id, newText) => {
    setComments((prevComments) => {
      const updatedComments = prevComments.map((comment) =>
        comment._id === id ? { ...comment, text: newText, updatedAt: new Date().toISOString() } : comment
      );
      toast.success('Comment updated successfully');
      return updatedComments.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Do you really want to delete this comment?')) 
      return;
    try {
      await axios.delete(`/api/comments/${id}`, {
        headers: {
          authorization: `Bearer ${userInfo.jwtToken}`,
        },
      });
      toast.success('Comment deleted successfully');
      setComments(comments.filter(comment => comment._id !== id));
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <h4>Comments</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="commentText">
          <Form.Control
            value={comment}
            as="textarea"
            placeholder="Add a comment..."
            required
            onChange={handleChange}
            style={{ resize: 'none', overflowY: 'hidden', height: commentHeight }}
            autoFocus
          />
        </Form.Group>
        <Button style={{ marginTop: '0.5rem', marginBottom: '1rem' }} variant="primary" type="submit">
          Comment
        </Button>
      </Form>

      {loadingFetch ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : comments.length === 0 ? (
        <div>No comments found</div>
      ) : (
        comments
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map((comment) => (
            <CommentCard
              key={comment._id}
              author={comment.author ? comment.author.name : 'Anonymous'}
              img={comment.img}
              text={comment.text}
              timestamp={formatTimestamp(comment.updatedAt)}
              articleName={articleName}
              id={comment._id}
              onUpdate={handleUpdateComment}
              onDelete={onDelete}
            />
          ))
      )}
    </div>
  );
};

export default CommentSection;
