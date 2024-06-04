import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Store } from "../Store";
import axios from "axios";
import { toast } from "react-toastify";
import getError from "../utils";
import { useNavigate, useParams } from "react-router-dom";

const ReviewUpload = () => {
    const { state } = useContext(Store);
  const { userInfo } = state;

  const [college, setCollege] = useState('')

  const {slug} = useParams();
  // console.log(slug);

  const fetchCollegeBySlug = async () => {
    try {
      const {data} = await axios.get(`api/colleges/${slug}`);
      console.log(data);
      setCollege(data);
    } catch (error) {
      console.error('Error fetching college:', error.message);
      // seterror(error.message)
    }
  };

  // useEffect(() => {
  //   const fetchCollegeBySlug = async () => {
  //     try {
  //       const {data} = await axios.get(`api/colleges/${slug}`);
  //       console.log(data);
  //       setCollege(data);
  //     } catch (error) {
  //       console.error('Error fetching college:', error.message);
  //       // seterror(error.message)
  //     }
  //   };

  //   fetchCollegeBySlug();
  // }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchCollegeBySlug();
    }
  }, [slug]);
  

  const navigate = useNavigate()


  const [formData, setFormData] = useState({

    // Other fields...
    deptStream: "", 
    title: "", 
    placements: "", 
    infrastructure: "",
    faculty: "",
    other: "",
    

  });


  

  const saveReviewToDB = async () => {
    // console.log(formData);
    try {
      
      const { data } = await axios.post(
        "/api/reviews",
        {
            deptStream: formData.deptStream,
            title: formData.title, 
            placements: formData.placements, 
            infrastructure: formData.infrastructure, 
            faculty: formData.faculty, 
            other: formData.other, 
            college: college._id,
            verified: false,
            
 
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        }
      );
      navigate('/');
      toast.success("Your Review will be uploaded after verification");
      console.log(data);
      // navigate(`/admin/product/${data.product._id}`)
      // console.log("product created");
    } catch (err) {
      toast.error(getError(err));
    }
    // Handle form submission and data saving here
    // ...
    // Reset form data and close the popup
    setFormData({
      deptStream: "",
      title: "", 
      placements: "", 
      infrastructure: "", 
      faculty: "", 
      other: "", 
    });
  };



  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload the image and wait for the response
      // const  imageUrlFromUpload  = await imageUpload();
      // console.log(`image url after await is ${imageUrlFromUpload}`);
  
      // Once the image is uploaded, save user data to the database
      await saveReviewToDB();
  
      // Navigate to the desired location after successful signup
      // navigate(redirect || "/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Review already exists.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  


  return (
  
    <Container >
      {/* <Helmet>
        <title>Sign In</title>
      </Helmet> */}
      <br/>
      <h1 className="my-3">{`Fill Review Details`}</h1>
      <Form onSubmit={handleSubmit}>

       

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your Department with Stream</Form.Label>
          <Form.Control
            required
            type="text"
            name="deptStream"
            // value={formData.title}
            onChange={handleInputChange}
            placeholder="B.Tech in Computer Science and Engineering"
            style={{marginBottom: '1rem'}}
            
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            name="title"
            // value={formData.title}
            onChange={handleInputChange}
            placeholder="suitable title for your review"
            style={{marginBottom: '1rem'}}
            
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Placements</Form.Label>
          <Form.Control
            required
            type="text"
            name="placements"
            // value={formData.placements}
            onChange={handleInputChange}
            placeholder="write something about your college placements"
            style={{marginBottom: '1rem'}}
            as="textarea"
            rows = {6}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Infrastructure</Form.Label>
          <Form.Control
            required
            type="text"
            name="infrastructure"
            // value={formData.infrastructure}
            onChange={handleInputChange}
            placeholder="write something about your college infrastructure"
            style={{marginBottom: '1rem'}}
            as="textarea"
            rows = {6}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Faculty</Form.Label>
          <Form.Control
            required
            type="text"
            name="faculty"
            // value={formData.faculty}
            onChange={handleInputChange}
            placeholder="write something about your college faculty"
            style={{marginBottom: '1rem'}}
            as="textarea"
            rows = {6}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Other</Form.Label>
          <Form.Control
            // required
            type="text"
            name="other"
            // value={formData.other}
            onChange={handleInputChange}
            placeholder="any other details you want to add"
            style={{marginBottom: '1rem'}}
            as="textarea"
            rows = {6}
          />
        </Form.Group>

       

    

    

        

        

    
  

  


 
<br/>
<br/>
<br/>

        
       
        <div className="mb-3">
          <Button variant="dark" type="submit">Upload Review</Button>
        </div>
        
      </Form>
      <br/>
    </Container>
    
 
  );
};

export default ReviewUpload;
