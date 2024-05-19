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

  const [{ loadingFetch, error }, dispatch] = useReducer(reducer, {
    loadingFetch: false,
    error: "",
  });

  const formatTimestamp = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });


  };

  const handleUpdateReview = (id, newTitle, newPlacements, newInfrastructure, newFaculty, newOther) => {
    setReviews((prevReviews) => {
      const updatedReviews = prevReviews.map((review) =>
        review._id === id ? { ...review, title: newTitle, placements: newPlacements, infrastructure: newInfrastructure, faculty: newFaculty, other: newOther, updatedAt: new Date().toISOString() } : review
      );
      toast.success('Review will get updated after verification')
      return updatedReviews.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    });
  };
  
  const onDelete = async (id) => {
    if(!window.confirm('Do you really want to delete this review')) 
      return;
    try {
      
      await axios.delete(`/api/reviews/${id}`, {
        headers: {
          authorization: `Bearer ${userInfo.jwtToken}`,
        },
      });
      toast.success('Review deleted successfully');
      setReviews(reviews.filter(review => review._id !== id));
    } catch (err) {
      toast.error(getError(err));
    }
  };
  


  useEffect(() => {
  let isMounted = true; // Add a flag to track whether the component is mounted

  const fetchReviews = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(`/api/reviews/${college._id}`);
      // console.log(data);
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
}, [college.slug, userInfo, isVisible, dispatch]);




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

          reviews.length === 0  ? (
            <div>No Reviews found</div>
          ) :

          reviews.filter(review => review.verified).length === 0 ?
          <div>No Reviews found</div>

           :

           (
            reviews
              .sort((a, b) => {
                if (a.verified && b.verified) {
                  return new Date(b.verifiedAt) - new Date(a.verifiedAt);
                } else if (a.verified) {
                  return -1;
                } else if (b.verified) {
                  return 1;
                } else {
                  return new Date(b.createdAt) - new Date(a.createdAt);
                }
              })
              .map((review) => (
               ( review.oldReview.length != 0 || review.verified) &&
                <ReviewtCard
                  key={review._id}
                  author={review.user.name}
                  deptStream={review.deptStream}
                  img={review.user.image}
                  title={review.verified ? review.title : review.oldReview[0]}
                  placements={review.verified ? review.placements : review.oldReview[1]}
                  infrastructure={review.verified ? review.infrastructure : review.oldReview[2]}
                  faculty={review.verified ? review.faculty : review.oldReview[3]}
                  other={review.verified ? review.other : review.oldReview[4]}
                  id={review._id}
                  timestamp={review.verified ? formatTimestamp(review.updatedAt) : formatTimestamp(review.createdAt)}
                  onDelete={onDelete}
                />
              ))
          )
          
          
}

      
        
      {/* </div> */}
      
      
    </Container>
  );
};

export default ReviewSection;
