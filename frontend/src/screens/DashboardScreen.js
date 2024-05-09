import React, { useContext, useEffect, useReducer } from "react";
import MessageBox from "../components/MessageBox";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import { Chart } from "react-google-charts";
import { Store } from "../Store";
import getError from "../utils";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


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

  const navigate = useNavigate();

 
  const { state } = useContext(Store);
  const { userInfo } = state;

  

  const handleUploadCollege = () => {
    navigate('/admin/dashboard/college-upload');
  };
  const handleUploadBlog = () => {
    navigate('/admin/dashboard/blog-upload');
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
                  {100}
                </Card.Title>
                <Card.Text>Total Users</Card.Text>
              </Card>
            </Col>
            <Col md={6}>
              <Card style={{padding: '2rem'}}>
                <Card.Title>
                  {400}
                </Card.Title>
                <Card.Text>Total Colleges</Card.Text>
              </Card>
            </Col>
            
          </Row>
          
        </>
      )}
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5rem'}}>
        <Button style={{margin: '1rem'}} variant="primary" onClick={handleUploadCollege}>Upload College</Button>
        <Button style={{margin: '1rem'}} variant="primary" onClick={handleUploadBlog}>Upload Blog</Button>
      </div>
    </div>
  );
};

export default DashboardScreen;
