import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import getError from '../utils';

const reducer = (state, action) => {
    switch (action.type) {
      case "CREATE_REQUEST":
        return { ...state, loading: true };
      case "CREATE_SUCCESS":
        return { ...state, loading: false };
      case "CREATE_FAIL":
        return { ...state, loading: false };
      default:
        return state;
    }
  };

const CounsellorsPage = () => {
    const navigate = useNavigate();
    const [{ loading }, dispatch] = useReducer(reducer, {
        loading: false,
      });
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
  // Dummy data for counsellors
  const [counsellors, setCounsellors] = useState([]);
  const [bookingStatus, setBookingStatus] = useState({});

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const response = await axios.get('api/counsellors');
        setCounsellors(response.data);
      } catch (error) {
        console.error('Error fetching Counsellors:', error.message);
      }
    };

    fetchCounsellors();
  }, []);

 

  const handleBookAppointment = async (id, charge) => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      // console.log(`token is ` + JSON.stringify(userInfo.jwtToken));
      // console.log(`cartItems is ` + JSON.stringify(cart.cartItems));
      // console.log(`shippingAddress is ` + JSON.stringify(cart.shippingAddress));
      const { data } = await axios.post(
        "/api/bookings",
        {
            charge: charge,
            counsellor: id
        },
        {
          headers: {
            authorization: userInfo
              ? `Bearer ${userInfo.jwtToken}`
              : "razorpay",
          },
        }
      );
      console.log(data);
      dispatch({ type: "CREATE_SUCCESS" });
      navigate(`/bookings/${data.booking._id}`);
      toast.success('Appointment booked! You will get a call from our team shortly');
    setBookingStatus((prevStatus) => ({
      ...prevStatus,
      [id]: true
    }));
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  

  return (
    <Container>
      <h1 className="mt-5 mb-3">Meet Our Counsellors</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {counsellors.map((counsellor) => (
          <Col key={counsellor._id}>
            <Card className="h-100">
              <Card.Img
                src={counsellor.user.image}
                alt={counsellor.user.name}
                style={{ height: '60%', width: '60%', margin: '1rem auto' }}
              />
              <Card.Body>
                <Card.Title className="text-start">{counsellor.user.name}</Card.Title>
                <Card.Text className="text-start">{counsellor.bio}</Card.Text>
                <div className="d-flex align-items-center mb-3">
                  <Badge bg="success" className="me-2">
                    <FaStar /> {counsellor.rating}
                  </Badge>
                  <span>({counsellor.rating})</span>
                </div>
                <h5 className="mb-3 text-start">Rs {counsellor.charge} per session</h5>
                {
                  !bookingStatus[counsellor._id] ?
                    (<>
                    <Button variant="primary" className="w-100" onClick={() => handleBookAppointment(counsellor._id, counsellor.charge)}>Book Appointment</Button>
                    {/* <Button variant="outline-success" className="w-100 mt-2" disabled>Pay</Button> */}
                    </>) :
                    <>
                    <Button variant="" disabled className="w-100">Appointment Booked</Button>
                    {/* <Button variant="outline-success" className="w-100 mt-2" onClick={() => handleBookAppointment(counsellor._id, counsellor.charge)}>Pay</Button> */}
                    </>
                }
                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CounsellorsPage;
