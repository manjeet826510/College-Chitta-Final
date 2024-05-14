import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";
// import getError from "../utils";

const SignupScreen = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  // console.log(search);
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  // console.log(redirectInUrl);
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const imageUpload = async () => {
    try {
      if (image) {
        const formDataImage = new FormData();
        formDataImage.append("image", image);
  
        const { data: { imageUrl } } = await axios.post("/api/upload", formDataImage);
        console.log(`imageUrl: ${imageUrl}`);
        setLocation(imageUrl);
        return imageUrl;
      }
    } catch (error) {
      console.error("Error occurred during image upload:", error);
      throw error; // Rethrow the error to be caught in the outer try-catch block
    }
  };
  
  const saveUserToDB = async (imageUrlFromUpload) => {
    try {
      const { data } = await axios.post("/api/users/signup", {
        name: name,
        email: email,
        password: password,
        image: imageUrlFromUpload,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (error) {
      console.error("Error occurred while saving user data to the database:", error);
      throw error; // Rethrow the error to be caught in the outer try-catch block
    }
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
      // Upload the image and wait for the response
      const  imageUrlFromUpload  = await imageUpload();
      console.log(`image url after await is ${imageUrlFromUpload}`);
  
      // Once the image is uploaded, save user data to the database
      await saveUserToDB(imageUrlFromUpload);
  
      // Navigate to the desired location after successful signup
      navigate(redirect || "/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("User already exists.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  
  

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <br/>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control required onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="imageUpload">
          <Form.Label>Upload Profile Photo</Form.Label>
          <Form.Control
            type="file"
            // required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div>
          Already have an account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
        </div>
        {/* <div style={{color: 'red'}}>
          ⚠️Do not use fake or temp email otherwise you will not be able to reset your password later.
        </div> */}
      </Form>

      
      <br/><br/>
    </Container>
    
  );
};

export default SignupScreen;
