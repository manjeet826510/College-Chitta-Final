import React, { useContext, useEffect, useReducer, useState } from "react";
import MessageBox from "../components/MessageBox";
import axios from "axios";
import getError from "../utils";
import Button from "react-bootstrap/Button";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container, Form, Spinner, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        appointments: action.payload.bookings, // Assuming your API returns bookings
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const AppointmentsListScreenCounsellor = () => {
  const [{ loading, error, appointments }, dispatch] = useReducer(reducer, {
    loading: false,
    appointments: [],
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const getCounsellorId = async (id) => {
        try {
          const { data } = await axios.get(`/api/counsellors/${id}`, {
            headers: {
              authorization: `Bearer ${userInfo.jwtToken}`,
            },
          });
          return data._id;
        } catch (err) {
          toast.error(getError(err));
          return null;
        }
      };

      const fetchAppointments = async (id) => {
        dispatch({ type: "FETCH_REQUEST" });
        try {
          const { data } = await axios.get(`/api/bookings/counsellor/list-bookings/${id}`, {
            headers: {
              authorization: `Bearer ${userInfo.jwtToken}`,
            },
          });
          // console.log(data);
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        }
      };

      const counsellorId = await getCounsellorId(userInfo._id);
      if (counsellorId) {
        fetchAppointments(counsellorId);
      }
    };

    fetchData();
  }, [userInfo]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (appointments) {
      // console.log(appointments);
      setFilteredAppointments(
        appointments.filter((appointment) =>
          appointment._id && appointment._id.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      // console.log(filteredAppointments);
    }
  }, [appointments, searchQuery]);

  return (
    <Container>
      <Helmet>
        <title>Appointments List</title>
      </Helmet>

      <Row>
        <Col>
          <h1>Appointments List</h1>
          <Form.Control
            type="text"
            placeholder="Search by appointment/booking id"
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
              {filteredAppointments.map((appointment) => (
                <tr key={appointment?._id}>
                  <td>{appointment?._id}</td>
                  <td>
                    {appointment?.createdAt?.substring(0, 10)}
                  </td>
                  <td>{appointment?.charge}</td>
                  <td>
                    {appointment?.isPaid ? appointment?.paidAt?.substring(0, 10) : "No"}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        navigate(`/bookings/${appointment?._id}`);
                      }}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default AppointmentsListScreenCounsellor;
