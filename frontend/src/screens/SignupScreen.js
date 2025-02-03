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
  const [pdf, setPdf] = useState(null);
  const [location, setLocation] = useState("");
  const [pdflocation, setPdfLocation] = useState("");
  const [selectedValue, setSelectedValue] = useState('1');
  const [bio, setBio] = useState('');
  const [charge, setCharge] = useState(0);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const imageUpload = async (image) => {
    // console.log(image);
    try {
      if (image) {
        const formDataImage = new FormData();
        formDataImage.append("image", image);
  
        const { data: { Url } } = await axios.post("/api/upload", formDataImage);
        // console.log(`imageUrl: ${Url}`);
        setLocation(Url);
        return Url;
      }
    } catch (error) {
      console.error("Error occurred during image upload:", error);
      throw error; // Rethrow the error to be caught in the outer try-catch block
    }
  };

  const pdfUpload = async (pdfN) => {
    // console.log(pdfN);
    try {
      if (pdfN) {
        const formDataPdf = new FormData();
        formDataPdf.append('pdf', pdfN);
  
        // Log the FormData content
        // for (let [key, value] of formDataPdf.entries()) {
        //   console.log(`${key}:`, value.name); // For debugging purposes
        // }
  
        // Send the FormData object to the server
        const { data: { Url } } = await axios.post("/api/upload/pdf", formDataPdf, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(`pdfUrl: ${Url}`);
        // console.log(`pdfUrl: ${Url}`);
        setPdfLocation(Url);
        return Url;
      }
    } catch (error) {
      console.error("Error occurred during pdf upload:", error);
      throw error; // Rethrow the error to be caught in the outer try-catch block
    }
  };
  
  
  const saveUserToCounsellorDB = async (id) => {
    console.log(id);
    try {
      const { data } = await axios.post("/api/counsellors/signup", {
        user: id,
        bio: bio,
        charge: charge,
        
      });
      
    } catch (error) {
      console.error("Error occurred while saving counsellor data to the database:", error);
      throw error; // Rethrow the error to be caught in the outer try-catch block
    }
  };

  const saveUserToDB = async (imageUrlFromUpload, pdfUrlFromUpload) => {
    try {
      const { data } = await axios.post("/api/users/signup", {
        name: name,
        email: email,
        password: password,
        image: imageUrlFromUpload,
        pdf: pdfUrlFromUpload,
        appliedRole: selectedValue==='1' ? 'student': selectedValue==='2' ?'counsellor' : 'admin'
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
      return data;
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
      const  imageUrlFromUpload  = await imageUpload(image);
      // console.log(`image url after await is ${imageUrlFromUpload}`);
      // console.log(pdf);
      const  pdfUrlFromUpload  = await pdfUpload(pdf);
      // console.log(`image url after await is ${imageUrlFromUpload}`);
  
      // Once the image is uploaded, save user data to the database
      const res = await saveUserToDB(imageUrlFromUpload, pdfUrlFromUpload);

      await saveUserToCounsellorDB(res._id);
  
      // Navigate to the desired location after successful signup
      navigate(redirect || "/");
      toast.success('sign up successfull')
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
          <Form.Label>Name<span className="required-asterisk">*</span></Form.Label>
          <Form.Control required onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email<span className="required-asterisk">*</span></Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password<span className="required-asterisk">*</span></Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password<span className="required-asterisk">*</span></Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="imageUpload">
          <Form.Label>Upload Profile Photo (.jpg, .jpeg only)<span className="required-asterisk">*</span></Form.Label>
          <Form.Control
            type="file"
            capture="user"
            accept=".jpg, .jpeg"
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pdfUploadL">
          <Form.Label>Register as a<span className="required-asterisk">*</span></Form.Label>
          {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="student"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
            value="1"
            checked={selectedValue === '1'}
            onChange={handleChange}
            required
          />
          <Form.Check
            inline
            label="counsellor"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
            value="2"
            checked={selectedValue === '2'}
            onChange={handleChange}
            required
          />
          <Form.Check
            inline
            label="admin"
            name="group1"
            type={type}
            id={`inline-${type}-3`}
            value="3"
            checked={selectedValue === '3'}
            onChange={handleChange}
            required
          />
          
        </div>
      ))}
        </Form.Group>

        {selectedValue==='1' ?
        <Form.Group className="mb-3" controlId="pdfUpload">
          <Form.Label>Upload College Any Semester Marksheet (pdf only)<span className="required-asterisk">*</span></Form.Label>
          <Form.Control
            type="file"
            accept="application/pdf"
            required
            onChange={(e) => setPdf(e.target.files[0])}
          />
        </Form.Group> :
        selectedValue==='3' ?

        <Form.Group className="mb-3" controlId="pdfUpload">
          <Form.Label>Upload Adhaar/Pan (pdf only)<span className="required-asterisk">*</span></Form.Label>
          <Form.Control
            type="file"
            accept="application/pdf"
            required
            onChange={(e) => setPdf(e.target.files[0])}
          />
        </Form.Group>:
        
       ( <>

        <Form.Group className="mb-3" controlId="pdfUpload">
        <Form.Label>Upload Adhaar/Pan (pdf only)<span className="required-asterisk">*</span></Form.Label>
        <Form.Control
          type="file"
          accept="application/pdf"
          required
          onChange={(e) => setPdf(e.target.files[0])}
        />
        
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
        <Form.Label>Bio<span className="required-asterisk">*</span></Form.Label>
        <Form.Control type="text" required onChange={(e) => setBio(e.target.value)} />
      

        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
        <Form.Label>Charge per session (in Rs)<span className="required-asterisk">*</span></Form.Label>
        <Form.Control type="number" required onChange={(e) => setCharge(e.target.value)} />
      </Form.Group>


      </>)

        }


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
