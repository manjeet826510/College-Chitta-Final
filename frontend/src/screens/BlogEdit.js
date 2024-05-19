import React, { useContext, useEffect, useReducer, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { Store } from "../Store";
import axios from "axios";
import { toast } from "react-toastify";
import getError from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import MessageBox from "../components/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false, error: action.payload };
    default:
      return state;
  }
};

const BlogEdit = () => {
    const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loadingCreate, error }, dispatch] = useReducer(reducer, {
    loadingCreate: false,
    error: "",
  });
  const { slug } = useParams();

  const navigate = useNavigate();

  // console.log(slug);

  // console.log('edit page');

  

  const [formData, setFormData] = useState({
    // Other fields...
    slug: "", 
    title: "", 
    image: null,
    newImage: null,
    content: [""],

    

  });

  

  useEffect(() => {
    window.scroll(0, 0)
    const fetchBlog = async () => {
      try {
        console.log(`slug = ${slug}`);
        const { data } = await axios.get(`/api/blogs/${slug}`);
        console.log(data);
        setFormData({
          ...formData,
          slug: data.slug, 
          title: data.title, 
          image: data.thumbnail,
          newImage: null,
          content: data.content,

  
        });
        console.log(formData);
      } catch (error) {
        // Handle error
        toast.error('blog not found')
        navigate('/admin/articlelist');
        // console.error('Error fetching college data:', error);
      }
    };
  
    fetchBlog();
  }, [slug]); // Add formData as a dependency if it's needed for further processing


  const handleImageUpload = (e) => {
    setFormData({ ...formData, newImage: e.target.files[0] });
  };

  const deleteWarning = ()=>{
    const confirmed = window.confirm('Do you really want to remove?');
    return confirmed;
  }
  

 



  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: "CREATE_REQUEST" });

      if (formData.newImage) {
        const formDataImage = new FormData();
        formDataImage.append("image", formData.newImage);

        const {
          data: { imageUrl },
        } = await axios.post("/api/upload", formDataImage);
        console.log(`imageUrl: ${imageUrl}`);
        formData.Location = imageUrl;
      }

      const { data } = await axios.put(
        `/api/blogs/${slug}`,
        {
            slug: formData.slug, 
            title: formData.title, 
            image: formData.newImage ? formData.Location : formData.image ,
            content: formData.content, 
           

         
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        }
      );
      dispatch({ type: "CREATE_SUCCESS" });
      navigate('/admin/articlelist');
      toast.success("Blog updated successfully");
      // console.log(data);
      // navigate(`/admin/product/${data.product._id}`)
      // console.log("product created");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "CREATE_FAIL" });
    }
    // Handle form submission and data saving here
    // ...
    // Reset form data and close the popup
    setFormData({
      slug: "", 
        title: "", 
        image: null,
        content: [""],
       
    });
  };

 



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
  <>
  {
    loadingCreate ? (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) :
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
          <Form.Label>Title</Form.Label>
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
            
            onChange={handleImageUpload}
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
        <Button size="sm" variant="danger" onClick={() =>{ if(deleteWarning()) removeContentField(index)}}>x</Button>
      )}
    </div>
  ))}
</div>

 
<br/>
<br/>
<br/>

        
       
        <div className="mb-3">
          <Button variant="dark" type="submit">Update Blog</Button>
        </div>
        
      </Form>
      <br/>
    </Container>
  }
  </>
  
    
    
 
  );
};

export default BlogEdit;
