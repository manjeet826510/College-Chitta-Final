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



const CommentSection = ({ articleName }) => {
    const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [commenttoggle, setCommenttoggle] = useState(true);
  
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loadingFetch, error }, dispatch] = useReducer(reducer, {
    loadingFetch: false,
    error: "",
  });

  const formatTimestamp = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };
  



  

  const saveCommentToDB = async () => {
    try {
        console.log(userInfo.name);
        console.log(userInfo.image);
        console.log(comment);
        console.log(articleName);
      const { data } = await axios.post(
        '/api/comments',
        {
          author: userInfo.name,
          img: userInfo.image,
          text: comment,
          articleName: articleName,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        }
      );
      toast.success('Comment added successfully');
      commenttoggle ? setCommenttoggle(false): setCommenttoggle(true);
    //   setComments([...comments, data]); // Add the new comment to the comments array
      setComment('');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  let isMounted = true; // Add a flag to track whether the component is mounted
  const fetchComments = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(`/api/comments/${articleName}`);
      if (isMounted) { // Check if the component is still mounted before updating state
        setComments(data);
        dispatch({ type: "FETCH_SUCCESS" });
      }
    } catch (error) {
      dispatch({ type: "FETCH_FAIL" });
    }
  };

  fetchComments();

  // Clean-up function to set comments to an empty array when the component unmounts or when articleName changes
  return () => {
    isMounted = false; // Set the flag to false when the component unmounts
    setComments([]);
  };
}, [articleName, userInfo, commenttoggle]);




  const handleChange = (event) => {
    if(!userInfo){
        navigate(`/signin?redirect=/article/${articleName}`);
    }
    setComment(event.target.value);
  };

  return (
    <div>
      <h4>Comments</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="commentText">
          <Form.Control
            value={comment}
            as="textarea"
            rows={3}
            placeholder="Add a comment..."
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Button style={{ marginTop: '0.5rem', marginBottom: '1rem' }} variant="primary" type="submit">
          Comment
        </Button>
      </Form>
      
      {/* <div style={{ maxHeight: '300px', overflowY: 'auto' }}> */}
      {
        loadingFetch ? (
            <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            </div>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) :

          comments.length === 0 ? (
            <div>No comments found</div>
          )

           :

   (
    comments.map((comment) => (
      <CommentCard
        key={comment.id}
        author={comment.author}
        img={comment.img}
        text={comment.text}
        timestamp={formatTimestamp(comment.createdAt)}
      />
    ))
  )
}

      
        
      {/* </div> */}
      
      
    </div>
  );
};

export default CommentSection;
