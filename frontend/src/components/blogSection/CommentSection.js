import React, { useContext, useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import CommentCard from './CommentCard';
import { Store } from '../../Store';
import getError from '../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';



const CommentSection = ({ articleName }) => {
    const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [commenttoggle, setCommenttoggle] = useState(true);
  
  const { state } = useContext(Store);
  const { userInfo } = state;

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
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`/api/comments/${articleName}`);
        console.log(data);
        setComments(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };

    fetchComments();
    // window.scrollTo(0, 0);
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
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            author={comment.author}
            img={comment.img}
            text={comment.text}
            timestamp={formatTimestamp(comment.createdAt)}
          />
        ))}
      {/* </div> */}
      
      
    </div>
  );
};

export default CommentSection;
