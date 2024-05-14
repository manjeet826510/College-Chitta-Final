import React, { useContext, useEffect, useReducer, useState } from "react";
import MessageBox from "../components/MessageBox";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import { Chart } from "react-google-charts";
import { Store } from "../Store";
import getError from "../utils";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, summary: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const DashboardScreen = () => {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
  });

  const [users, setUsers] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

 
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching Users:', error.message);
        dispatch({ type: "FETCH_FAIL", error: getError(error) });
      }
    };

    const fetchColleges = async () => {
      try {
        const response = await axios.get('api/colleges');
        setColleges(response.data);
      } catch (error) {
        console.error('Error fetching colleges:', error.message);
        dispatch({ type: "FETCH_FAIL", error: getError(error) });
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await axios.get('api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching colleges:', error.message);
        dispatch({ type: "FETCH_FAIL", error: getError(error) });
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get('api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching colleges:', error.message);
        dispatch({ type: "FETCH_FAIL", error: getError(error) });
      }
    };

    fetchUsers();
    fetchColleges();
    fetchBlogs();
    fetchReviews();
  }, []);

  
 
  

  

  const handleUploadCollege = () => {
    navigate('/admin/dashboard/college-upload');
  };
  const handleUploadBlog = () => {
    navigate('/admin/dashboard/blog-upload');
  };
  const handleUpdateCollege = () => {
    navigate('/admin/dashboard/college-update');
  };
  const handleUpdateBlog = () => {
    navigate('/admin/dashboard/blog-update');
  };
  return (
    <div style={{padding: '5rem'}}>
      <h1>Dashboard</h1>
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
          <Row>
            <Col md={6}>
              <Card style={{padding: '2rem'}}>
                <Card.Title>
                  {users.length}
                </Card.Title>
                <Card.Text>Total Users</Card.Text>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={{padding: '2rem'}}>
                <Card.Title>
                  {colleges.length}
                </Card.Title>
                <Card.Text>Total Colleges</Card.Text>
              </Card>
            </Col>
            
          </Row>
          <Row>
            <Col md={6}>
              <Card style={{padding: '2rem'}}>
                <Card.Title>
                  {blogs.length}
                </Card.Title>
                <Card.Text>Total Blogs</Card.Text>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={{padding: '2rem'}}>
                <Card.Title>
                  {reviews.length}
                </Card.Title>
                <Card.Text>Total Reviews</Card.Text>
              </Card>
            </Col>
            
          </Row>
          
        </>
      )}
      
    </div>
  );
};

export default DashboardScreen;
