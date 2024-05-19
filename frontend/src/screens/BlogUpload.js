import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Store } from "../Store";
import axios from "axios";
import { toast } from "react-toastify";
import getError from "../utils";
import { useNavigate } from "react-router-dom";

const BlogUpload = () => {
    const { state } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate()

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({

    // Other fields...
    slug: "", 
    title: "", 
    content: [""],
    

  });


  const imageUpload = async () => {
    try {
      if (image) {
        const formDataImage = new FormData();
        formDataImage.append("image", image);
  
        const { data: { imageUrl } } = await axios.post("/api/upload", formDataImage);
        // console.log(`imageUrl: ${imageUrl}`);
        // setLocation(imageUrl);
        return imageUrl;
      }
    } catch (error) {
      console.error("Error occurred during image upload:", error);
      throw error; // Rethrow the error to be caught in the outer try-catch block
    }
  };

  const saveArticleToDB = async (imageUrlFromUpload) => {
    try {
      
      const { data } = await axios.post(
        "/api/blogs",
        {
            slug: formData.slug, 
            title: formData.title, 
            thumbnail: imageUrlFromUpload, 
            content: formData.content,
            author: userInfo._id,
 
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        }
      );
      navigate('/admin/articlelist');
      toast.success("Blog uploaded successfully");
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
        slug: "", 
        title: "", 
        thumbnail: "", 
        content: [""],
    });
  };



  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload the image and wait for the response
      const  imageUrlFromUpload  = await imageUpload();
      // console.log(`image url after await is ${imageUrlFromUpload}`);
  
      // Once the image is uploaded, save user data to the database
      await saveArticleToDB(imageUrlFromUpload);
  
      // Navigate to the desired location after successful signup
      // navigate(redirect || "/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Article already exists.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };



  const handleInputChange = (e) => {
    const { slug, value } = e.target;
    setFormData({
      ...formData,
      [slug]: value,
    });
  };
  


//   Info array starts here
const handleContentChange = (index, value) => {
    const newContent = [...formData.content];
    newContent[index] = value; // Update the entire value, not just a single character
    setFormData({
      ...formData,
      content: newContent,
    });
  };
  
  



const addContentField = () => {
    setFormData({
        ...formData,
        content: [...formData.content, ""],
      });

  
};

const removeContentField = (index) => {
  const newContent = [...formData.content];
 

  newContent.splice(index, 1);
    setFormData({
      ...formData,
      content: newContent,
    });
}; 



  

  

  return (
  
    <Container >
      {/* <Helmet>
        <title>Sign In</title>
      </Helmet> */}
      <br/>
      <h1 className="my-3">Fill Blog/Article Details</h1>
      <Form onSubmit={handleSubmit}>

       

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>slug</Form.Label>
          <Form.Control
            required
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            placeholder=""
            style={{marginBottom: '1rem'}}
          />
        </Form.Group>

       

        <Form.Group>
          <Form.Label>Article Title</Form.Label>
          <Form.Control
            required
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder=""
            style={{marginBottom: '1rem'}}
          />
        </Form.Group>

    

    

        <Form.Group>
          <Form.Label>Upload Thumbnail Image</Form.Label>
          <Form.Control
            type="file"
            required
            onChange={(e) => setImage(e.target.files[0])}
            style={{marginBottom: '1rem'}}
          />
        </Form.Group>

        

    
  

  

    <div>
  <Form.Label>Content {<Button size="sm" onClick={addContentField}>+</Button>}</Form.Label>
  {formData.content.map((contentfield, index) => (
    <div key={index} style={{ display: 'flex', marginBottom: '1rem' }}>
      <Form.Control
        required
        type="text"
        value={contentfield}
        onChange={(e) => handleContentChange(index, e.target.value)}
        placeholder={`content paragraph ${index + 1}`} // Add a placeholder for clarity
      />
      {formData.content.length > 1 && (
        <Button size="sm" variant="danger" onClick={() => removeContentField(index)}>x</Button>
      )}
    </div>
  ))}
</div>

 
<br/>
<br/>
<br/>

        
       
        <div className="mb-3">
          <Button variant="dark" type="submit">Upload Blog</Button>
        </div>
        
      </Form>
      <br/>
    </Container>
    
 
  );
};

export default BlogUpload;
