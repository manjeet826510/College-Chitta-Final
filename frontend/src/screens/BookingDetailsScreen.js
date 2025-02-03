import React, { useContext, useEffect, useReducer, useState } from "react";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import getError from "../utils";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/esm/Button";
import { toast } from "react-toastify";
import { Container, Spinner } from "react-bootstrap";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, booking: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };
    case "BOOKING_REQUEST":
      return { ...state, loadingBooking: true };
    case "BOOKING_SUCCESS":
      return { ...state, loadingBooking: false, successBooking: true };
    case "BOOKING_FAIL":
      return { ...state, loadingBooking: false };
    case "BOOKING_RESET":
      return { ...state, loadingBooking: false, successBooking: false };
    default:
      return state;
  }
};

const BookingDetailsScreen = () => {
    const params = useParams();
    const { id: bookingId } = params;
    // console.log(bookingId);

  const [razorPayKey, setRazorPayKey] = useState("");
  const { state } = useContext(Store);
  const { userInfo } = state;


  const navigate = useNavigate();

  const [{ loading, error, booking, successPay, loadingPay }, dispatch] = useReducer(reducer, {
    loading: true,
    booking: {},
    error: "",
    successPay: false,
    loadingPay: false,
  });

  const loadScript = (src) => {
    try {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    } catch (error) {
      toast.error("Razorpay SDK failed to load. Are you online?");
    }
  };

  const paymentPopUp = async (options) => {
    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      dispatch({ type: "PAY_FAIL", payload: getError(error) });
    }
  };

  const createOrder = async () => {
    // creating a new order
    // console.log(booking);
    const dataResult = await axios.post("/api/create", {
        booking_id: bookingId,
        charge: booking.charge,
        currency: "INR",
        payment_capture: "1",
    });
    return dataResult;
  };

  const onError = (err) => {
    toast.error(getError(err));
  };

  

  const displayRazorpay = async () => {
    // console.log('razor pay btn is clicked');
    try {
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      const result = await createOrder();
      console.log(result.data.data);
      const options = {
        key: razorPayKey,
        currency: result.data.data.currency,
        amount: result.data.data.amount ,
        booking_id: result.data.data.id,
        name: "College Chitta",
        description: "Test transaction",
        // image:"../../public/favicon.ico",
        handler: async function (response) {
          await axios.put(
            `/api/bookings/${booking._id}/pay`,
            {
              name: "Admin",
            },
            {
              headers: {
                authorization: userInfo
                  ? `Bearer ${userInfo.jwtToken}`
                  : "razorpay",
              },
            }
          );
          dispatch({ type: "PAY_SUCCESS" });
        //   setPaySuccess(true);
          // console.log('paySuccess it is');
          toast.success("Order is paid");
        },
        prefill: {
          name: booking.user.name,
          email: booking.user.email,
        //   contact: "7992346031",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      await paymentPopUp(options);
    } catch (error) {
      onError(error);
    }
  };

  useEffect(() => {
    const fetchRazorpayKey = async () => {
      try {
        const response = await axios.get("/api/rzp/razorpay-key");
        const { razorpayKey } = response.data;
        setRazorPayKey(razorpayKey);
      } catch (error) {
        console.error("Error fetching Razorpay key:", error);
      }
    };

    const fetchBooking = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/bookings/${bookingId}`, {
          headers: {
            authorization: userInfo ? `Bearer ${userInfo.jwtToken}` : "razorpay",
          },
        });

        // console.log(data.user._id);
        // console.log(userInfo);

        if ((!userInfo?.isAdmin && data.user._id !== userInfo._id) && (!userInfo?.isCounsellor && data.user._id !== userInfo._id))  {
            // console.log(userInfo)
          toast.error("Booking not found.");
          navigate("/");
          return;
        }
       

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (!booking._id || successPay || (booking._id && booking._id !== bookingId)) {
      fetchBooking();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      fetchRazorpayKey();
    }
  }, [navigate, userInfo, bookingId, booking, successPay]);

  return loading ? (
    <div className="d-flex justify-content-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Booking {bookingId}</title>
      </Helmet>
      <Container>
        <h1 className="my-3">Appointment {bookingId}</h1>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Counsellor Details</Card.Title>
            {booking.counsellor && booking.counsellor.user ? (
              <>
                <Col xs={3} md={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginLeft: '2rem' }}>
                  <img src={booking.counsellor.user.image} alt="Profile Picture" className="profile-pic-comment" />
                </Col>
                <Card.Text>
                  <strong>Name:</strong> {booking.counsellor.user.name}
                  <br />
                  <strong>Email:</strong> {booking.counsellor.user.email}
                </Card.Text>
              </>
            ) : (
              <MessageBox variant="danger">Counsellor details not available</MessageBox>
            )}
            {booking?.isBooked ? (
              <MessageBox variant="success">Booked at {booking.createdAt}</MessageBox>
            ) : (
              <MessageBox variant="danger">Not Booked</MessageBox>
            )}
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Student Details</Card.Title>
            {booking.user && booking.user.name ? (
              <>
                <Col xs={3} md={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginLeft: '2rem' }}>
                  <img src={booking.user.image} alt="Profile Picture" className="profile-pic-comment" />
                </Col>
                <Card.Text>
                  <strong>Name:</strong> {booking.user.name}
                  <br />
                  <strong>Email:</strong> {booking.user.email}
                </Card.Text>
              </>
            ) : (
              <MessageBox variant="danger">Student details not available</MessageBox>
            )}
           
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>Payment</Card.Title>
            <Card.Text>
              <strong>Method:</strong> RazorPay
            </Card.Text>
            {booking.isPaid ? (
              <MessageBox variant="success">Paid at {booking.paidAt}</MessageBox>
            ) : (
                <>
                <MessageBox variant="danger">Not Paid</MessageBox> 
                
                 {
                    (!userInfo.isAdmin && !userInfo.isCounsellor) ?
                      <Button variant="outline-success" className="d-grid w-100" onClick={displayRazorpay}>Pay</Button> : null
                }
              
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default BookingDetailsScreen;
