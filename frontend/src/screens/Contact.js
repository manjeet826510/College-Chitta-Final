import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import getError from '../utils';
import { toast } from 'react-toastify';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        msg: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          
          const { data } = await axios.post(
            "https://manjeet-kumar.cyclic.app/",
            {
                name: formData.name, 
                email: formData.email, 
                msg: formData.msg, 
                
    
             
            },
            
          );
          toast.success("Message sent successfully");
        //   console.log(data);
          // navigate(`/admin/product/${data.product._id}`)
          // console.log("product created");
        } catch (err) {
          toast.error(getError(err));
        }
        // Handle form submission and data saving here
        // ...
        // Reset form data and close the popup
        setFormData({
            name: "", 
            email: "", 
            msg: "", 
           
        });
      };

    return (
        <section id="contactsid">
            <Container>
                <h2 className="text-center">CONTACT US</h2>
                <Row className="justify-content-center">
                    <Col md={6} className="contact-card">
                        <h2>CONTACT</h2>
                        <p>For quick response, feel free to reach out through these platforms:</p>
                        <div className="social-icons">
                            <a href="https://www.instagram.com/hustlewithmaharufh/" target="_blank"><i className="fab fa-instagram fa-2x"></i></a>
                            <a href="https://www.facebook.com/maharufh.alimir" target="_blank"><i className="fab fa-facebook fa-2x"></i></a>
                            <a href="https://www.twitter.com/home" target="_blank"><i className="fab fa-twitter fa-2x"></i></a>
                            <a href="https://t.me/MentorRaju" target="_blank"><i className="fab fa-telegram fa-2x"></i></a>
                        </div>
                    </Col>
                    <Col md={6} className="contact-card">
                        <h2>Send a Message</h2>
                        <Form id="contactForm" onSubmit={handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="message">
                                <Form.Label>Message:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Enter your message"
                                    name="msg"
                                    value={formData.msg}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">Send Message</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Contact;
