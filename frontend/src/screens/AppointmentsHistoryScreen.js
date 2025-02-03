import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import getError from "../utils";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, bookings: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const AppointmentsHistoryScreen = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, bookings }, dispatch] = useReducer(reducer, {
    loading: false,
    bookings: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get("/api/bookings/mine", {
          headers: {
            authorization: userInfo
              ? `Bearer ${userInfo.jwtToken}`
              : "RazorPay",
          },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <Helmet>
        <title>Appointments History</title>
      </Helmet>
      <Container>
      <h1>Appointments History</h1>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>CHARGE</th>
                <th>PAID</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {[...bookings].reverse().map((booking) => {
                return (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.createdAt.substring(0, 10)}</td>
                    <td>{booking.charge}</td>
                    <td>
                      {booking.isPaid ? booking.paidAt.substring(0, 10) : "No"}
                    </td>
                   
                    <td>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => {
                          navigate(`/bookings/${booking._id}`);
                        }}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Container>
    </div>
  );
};

export default AppointmentsHistoryScreen;
