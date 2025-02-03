import React, { useContext, useEffect, useReducer, useState } from "react";
import MessageBox from "../components/MessageBox";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import { Store } from "../Store";
import getError from "../utils";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import SalesScreenAdmin from "./SalesScreenAdmin";
import SalesScreenCounsellor from "./SalesScreenCounsellor";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, bookings: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const DashboardScreen = () => {
  const [{ loading, error, bookings }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    bookings: [],
  });

  const [counsellorId, setCounsellorId] = useState('');
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [users, setUsers] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [reviews, setReviews] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/bookings/details", {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        
        const counsellorId = await getCounsellorId(userInfo._id);
        setCounsellorId(counsellorId);
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };

    fetchData();
  }, [userInfo]);

  const getCounsellorId = async (id) => {
    try {
      const { data } = await axios.get(`/api/counsellors/${id}`, {
        headers: {
          authorization: `Bearer ${userInfo.jwtToken}`,
        },
      });
      return data._id;
    } catch (err) {
      console.log(getError(err));
      return null;
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <MessageBox variant="danger">{error}</MessageBox>;
  }

  const paidBookings = bookings.filter((booking) => booking.isPaid);
  const totalRevenue = paidBookings.reduce((sum, booking) => sum + booking.charge, 0);

  const counsellorBookings = bookings.filter((booking) => booking.counsellor === counsellorId);
  const totalAppointments = counsellorBookings.length;
  const totalRevenueCounsellor = counsellorBookings.reduce((sum, booking) => sum + booking.charge, 0);

  return (
    <div style={{padding: '5rem'}}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1>Dashboard</h1>
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

          {
            userInfo.isAdmin ? 
            <Row>
        <Col md={6}>
          <Card style={{padding: '2rem'}}>
            <Card.Title>
              {bookings.length}
            </Card.Title>
            <Card.Text>Total Bookings</Card.Text>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{padding: '2rem'}}>
            <Card.Title>
              Rs {totalRevenue}
            </Card.Title>
            <Card.Text>Total Revenue</Card.Text>
          </Card>
        </Col>
      </Row>
      :
      userInfo.isCounsellor ?
      <Row>
      <Col md={6}>
        <Card style={{padding: '2rem'}}>
          <Card.Title>
            {totalAppointments}
          </Card.Title>
          <Card.Text>Your Appointments</Card.Text>
        </Card>
      </Col>
      <Col md={6}>
        <Card style={{padding: '2rem'}}>
          <Card.Title>
            Rs {totalRevenueCounsellor}
          </Card.Title>
          <Card.Text>Your Revenue</Card.Text>
        </Card>
      </Col>
    </Row>
    :
    null
          }
      
     
      {
        userInfo.isAdmin ?
        <SalesScreenAdmin/> : userInfo.isCounsellor ?
        <SalesScreenCounsellor/> : null
      }
    </div>
  );
};

export default DashboardScreen;
