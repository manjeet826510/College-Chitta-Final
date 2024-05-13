import React, { useContext, useEffect, useReducer, useState } from "react";
import MessageBox from "../components/MessageBox";
import axios from "axios";
import getError from "../utils";
import Button from "react-bootstrap/esm/Button";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Spinner } from "react-bootstrap";
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
        blogs: action.payload.blogs,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



const BlogListScreen = () => {
  const [{ loading, error, blogs }, dispatch] = useReducer(reducer, {
    loading: false,
    blogs: [],
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();

  // State variables for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/blogs/admin`, {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", error: getError(err) });
      }
    };

    fetchBlogs();
  }, [userInfo]);

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter colleges based on search query
  useEffect(() => {
    setFilteredBlogs(
      blogs.filter((blog) =>
        blog.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [blogs, searchQuery]);

  const handleEditBlog = (name) => {
    navigate(`/admin/dashboard/blog-edit/${name}`);
  };

  const handleDeleteBlog = (name) => {
    const res = window.confirm("Do you really want to delete this blog/article ?");
    if(res){
        handleDeleteSubmit(name);
    }
  };

  const handleDeleteSubmit = async(name) => {

    try {
        const {data} = await axios.delete(
            `/api/blogs/${name}`,
            {
                headers: {
                    authorization: `Bearer ${userInfo.jwtToken}`
                }
            }
        )
        window.location.reload(); // Refresh the page
        toast.success("Blog deleted successfully");
        // console.log(data);
        // console.log("product created");
    } catch (err) {
        toast.error(getError(err));
    }
    // Handle form submission and data saving here
    // ...
   

  };

  return (
    <div>
      <Helmet>
        <title>Blog List</title>
      </Helmet>

      <Row>
        <Col>
          <h1>Blogs</h1>
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search by name..."
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
        <>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                </tr>
              </thead>
              <tbody>
                {/* Use filteredColleges instead of colleges */}
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>{blog._id}</td>
                    <td><a href={`/article/${blog.name}`}>{blog.name}</a></td>
                    <td>
                      <Button onClick={() => handleEditBlog(blog.name)} variant="success"><i class="fas fa-edit" ></i></Button>
                      {"    "}
                      <Button onClick={() => handleDeleteBlog(blog.name)} variant="danger"><i class="fas fa-trash" ></i></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogListScreen;
