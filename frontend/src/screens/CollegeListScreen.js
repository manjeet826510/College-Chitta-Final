import React, { useContext, useEffect, useReducer, useState } from "react";
import MessageBox from "../components/MessageBox";
import axios from "axios";
import getError from "../utils";
import Button from "react-bootstrap/esm/Button";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Container, Form, Spinner } from "react-bootstrap";
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
        colleges: action.payload.colleges,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



const CollegeListScreen = () => {
  const [{ loading, error, colleges }, dispatch] = useReducer(reducer, {
    loading: false,
    colleges: [],
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();

  // State variables for search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);

  useEffect(() => {
    const fetchColleges = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/colleges/admin`, {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", error: getError(err) });
      }
    };

    fetchColleges();
  }, [userInfo]);

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter colleges based on search query
  useEffect(() => {
    setFilteredColleges(
      colleges.filter((college) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [colleges, searchQuery]);

  const handleEditCollege = (cid) => {
    navigate(`/admin/college-edit/${cid}`);
  };

  const handleDeleteCollege = (cid) => {
    const res = window.confirm("Do you really want to delete this college ?");
    if(res){
        handleDeleteSubmit(cid);
    }
  };

  const handleDeleteSubmit = async(cid) => {

    try {
        const {data} = await axios.delete(
            `/api/colleges/${cid}`,
            {
                headers: {
                    authorization: `Bearer ${userInfo.jwtToken}`
                }
            }
        )
        window.location.reload(); // Refresh the page
        toast.success("College deleted successfully");
        // console.log(data);
        // console.log("product created");
    } catch (err) {
        toast.error(getError(err));
    }
    // Handle form submission and data saving here
    // ...
   

  };

  const handleUploadCollege = ()=>[
    navigate('/admin/college-upload')
  ]

  return (
    <Container>
      <Helmet>
        <title>College List</title>
      </Helmet>

      <Row>
        <Col>
          <h1>Colleges</h1>
          {/* Search bar */}
          <Button onClick={handleUploadCollege} className="mt-1 mb-3">Upload College</Button>
          <Form.Control
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
                {filteredColleges.map((college) => (
                  <tr key={college._id}>
                    <td>{college._id}</td>
                    <td><a href={`/college/${college.slug}`}>{college.name}</a></td>
                    <td>
                      <Button onClick={() => handleEditCollege(college._id)} variant="success"><i class="fas fa-edit" ></i></Button>
                      {"    "}
                      <Button onClick={() => handleDeleteCollege(college._id)} variant="danger"><i class="fas fa-trash" ></i></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Container>
  );
};

export default CollegeListScreen;
