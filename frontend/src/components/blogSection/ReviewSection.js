import React, { useContext, useState, useEffect, useReducer } from 'react';
import { Card, Form, Button, Spinner, Container } from 'react-bootstrap';
import CommentCard from './CommentCard';
import { Store } from '../../Store';
import getError from '../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../MessageBox';
import ReviewtCard from './ReviewCard';

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



const ReviewSection = ({ college }) => {
    const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState('');
  // const [commenttoggle, setCommenttoggle] = useState(true);
  
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loadingFetch, error }, dispatch] = useReducer(reducer, {
    loadingFetch: false,
    error: "",
  });

  const formatTimestamp = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };
  



  

 



  useEffect(() => {
  let isMounted = true; // Add a flag to track whether the component is mounted
  const fetchReviews = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(`/api/reviews/${college.slug}`);
      if (isMounted) { // Check if the component is still mounted before updating state
        setReviews(data);
        dispatch({ type: "FETCH_SUCCESS" });
      }
    } catch (error) {
      dispatch({ type: "FETCH_FAIL" });
    }
  };

  fetchReviews();
  console.log(reviews);

  // Clean-up function to set comments to an empty array when the component unmounts or when articleName changes
  return () => {
    isMounted = false; // Set the flag to false when the component unmounts
    setReviews([]);
  };
}, [college.slug, userInfo]);




  const handleChange = (event) => {
    if(!userInfo){
        navigate(`/signin?redirect=/article/${college.slug}`);
    }
    setReview(event.target.value);
  };

  const handleBtnClick = ()=>{
    navigate('write-review');
  }

  return (
    <Container>
      <h4 className='mb-4 mt-4'>Reviews</h4>
      <Button className='mb-4 ' onClick={handleBtnClick}>Add Review</Button>
      
      
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

          reviews.length === 0 ? (
            <div>No Reviews found</div>
          )

           :

           (
            reviews
              .filter((review) => review.verified) // Filter the reviews array
              .map((review) => (
                <ReviewtCard
                  key={review.id}
                  author={review.name}
                  img={review.image}
                  title={review.title}
                  placements={review.placements}
                  infrastructure={review.infrastructure}
                  faculty={review.faculty}
                  other={review.other}
                  timestamp={formatTimestamp(review.createdAt)}
                />
              ))
          )
          
}

      
        
      {/* </div> */}
      
      
    </Container>
  );
};

export default ReviewSection;
