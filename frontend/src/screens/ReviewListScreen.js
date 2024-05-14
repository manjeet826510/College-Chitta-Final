import React, { useContext, useEffect, useReducer, useState } from "react";
import MessageBox from "../components/MessageBox";
import axios from "axios";
import getError from "../utils";
import Button from "react-bootstrap/esm/Button";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Container, Form, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaEye, FaQuestion } from "react-icons/fa"; // Importing icons from Font Awesome


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        reviews: action.payload.reviews,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ReviewListScreen = () => {
  const [{ loading, error, reviews }, dispatch] = useReducer(reducer, {
    loading: false,
    reviews: [],
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  

  useEffect(() => {
    const fetchReviews = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get("/api/reviews/admin", {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,

          },
        });
        // console.log(data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        // console.log(reviews);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", error: getError(err) });
      }
    };

    fetchReviews();
  }, [userInfo]);

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter colleges based on search query
  useEffect(() => {
    setFilteredReviews(
      reviews.filter((review) =>
        review.slug.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [reviews, searchQuery, ]);

//   console.log();

 

  const handleVerifyReview = async (reviewId) => {
    try {

        const {data} = await axios.put(`/api/reviews/admin/verify/${reviewId}`, null, {
            headers: {
              authorization: `Bearer ${userInfo.jwtToken}`
            }
          }
        //   setVerifiedReview(true);
        
        );
        
        
        toast.success("Review verified successfully");
        setTimeout(() => {
            window.location.reload();
          }, 1000);
      // Update state or reload reviews
    } catch (err) {
      toast.error(getError(err));
    }
  };


  const handleRejectReviewConfirm = (rid) => {
    const res = window.confirm("Do you really want to delete this review ?");
    if(res){
      handleRejectReview(rid);
    }
  };
  const handleRejectReview = async (reviewId) => {
    try {
      await axios.delete(`/api/reviews/admin/verify/${reviewId}`, {
        headers: {
          authorization: `Bearer ${userInfo.jwtToken}`,
        },
      });
      toast.success("Review rejected and deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // Update state or reload reviews
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleViewReview = (reviewId) => {
    const review = reviews.find((review) => review._id === reviewId);
    setSelectedReview(review);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReview(null);
  };



  return (
    <Container>
      <Helmet>
        <title>Review Verification</title>
      </Helmet>

      <Row>
        <Col>
          <h1>Review Verification</h1>
          <Form.Control
            type="text"
            placeholder="Search by college..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>

    


      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  
                  <th>User</th>
                  <th>College</th>
                  <th>View/Verify/Reject</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review) => (
                  <tr key={review._id}>
                   
                    <td>
                    <img
                    src={review.image}
                    alt="Profile Picture"
                    className="profile-pic-comment"
                    />
                    {" "}
                        {review.name}</td>
                    <td><a href={`/college/${review.slug}`}>{review.slug}</a></td>
                    <td>
                    <Button onClick={() => handleViewReview(review._id)} variant="info">
                    <FaEye />
                    </Button>
                    {" "}
                    {review.verified ? (
                    
                        <Button disabled title="verified"  variant="success">
                        <FaCheck />
                        </Button>
                        
                    
                    ) : (
                    <Button onClick={() => handleVerifyReview(review._id)} variant="secondary" title="click to verify review">
                        <FaQuestion /> {/* Using a question mark icon for unverified reviews */}
                    </Button>
                    )}
                    {" "}
                        <Button onClick={() => handleRejectReviewConfirm(review._id)} variant="danger">
                        <FaTimes />
                        </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

       {/* Modal for displaying review details */}
       <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Review Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReview && (
            <div>
              <h5>Title: {selectedReview.title}</h5>
              <p><b>Placements:</b> {selectedReview.placements}</p>
              <p><b>Infrastructure:</b> {selectedReview.infrastructure}</p>
              <p><b>Faculty:</b> {selectedReview.faculty}</p>
              <p><b>Other:</b> {selectedReview.other}</p>
              {/* Add more fields as needed */}
            </div>
          )}
        </Modal.Body>
       
      </Modal>
    </Container>
  );
};

export default ReviewListScreen;
