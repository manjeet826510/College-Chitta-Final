import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const CounsellingTest = () => {
  const [formData, setFormData] = useState({
    email: "",
    contactNo: "",
    name: "",
    gender: "",
    wbjeeRank: "",
    jeeMainRank: "",
    academicPerformance: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Container>
      <h2>Counseling Form</h2>
      <p>
        This is the form of counseling. If you want any help from our side
        personally than reach out to us through this google form. Fill your all
        the details and submit it. We will reach out to you within 24 hours.
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formContactNo">
          <Form.Label>Contact No *</Form.Label>
          <Form.Control
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formName">
          <Form.Label>Name *</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formGender">
          <Form.Label>Gender *</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formWbjeeRank">
          <Form.Label>WBJEE Rank (GMR and Category) *</Form.Label>
          <Form.Control
            type="text"
            name="wbjeeRank"
            value={formData.wbjeeRank}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formJeeMainRank">
          <Form.Label>JEE Main Rank (General and Category) *</Form.Label>
          <Form.Control
            type="text"
            name="jeeMainRank"
            value={formData.jeeMainRank}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAcademicPerformance">
          <Form.Label>
            Your last academic performance in percentage *
          </Form.Label>
          <Form.Control
            type="text"
            name="academicPerformance"
            value={formData.academicPerformance}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label>If you want to say something to us</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CounsellingTest;
