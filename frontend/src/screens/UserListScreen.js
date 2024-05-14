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
import { toast } from "react-toastify";
import { FaCheck, FaEye, FaQuestion } from "react-icons/fa"; // Importing icons from Font Awesome

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Import the AdminToggle component
const AdminToggle = ({ isAdmin, userId, userInfo, user }) => {
  const [isAdminUser, setIsAdminUser] = useState(isAdmin);

  const handleToggleChange = async () => {
    try {
      // Toggle the isAdminUser state
      setIsAdminUser(!isAdminUser);

      // Update user's admin status in the database
      await axios.put(`/api/users/admin/${userId}`, { isAdmin: !isAdminUser }, {
        headers: {
          authorization: `Bearer ${userInfo.jwtToken}`,
        },
      });

      toast.success(`${user.name} is now ${isAdminUser ? 'normal' : 'admin'} user`);
    } catch (error) {
      toast.error(getError(error));
      // Reset the toggle state if the request fails
      setIsAdminUser(isAdmin);
    }
  };

  return (
    <Form.Check
      type="switch"
      id={`admin-toggle-${userId}`}
      label={isAdminUser ? 'Admin' : 'Normal'}
      checked={isAdminUser}
      onChange={handleToggleChange}
    />
  );
};



const UserListScreen = () => {
  const [{ loading, error, users }, dispatch] = useReducer(reducer, {
    loading: false,
    users: [],
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get("/api/users/admin", {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,

          },
        });
        console.log(data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        console.log(users);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", error: getError(err) });
      }
    };

    fetchUsers();
  }, [userInfo]);

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter colleges based on search query
  // Filter users based on search query
useEffect(() => {
  if (users.length > 0) {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }
}, [users, searchQuery]);

const handleDeleteUser = (uid) => {
  const res = window.confirm("Do you really want to delete this user ?");
  if(res){
      handleDeleteSubmit(uid);
  }
};

const handleDeleteSubmit = async (userId) => {

  try {
    await axios.delete(`/api/users/admin/verify/${userId}`, {
      headers: {
        authorization: `Bearer ${userInfo.jwtToken}`,
      },
    });
    toast.success("User deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    // Update state or reload reviews
  } catch (err) {
    toast.error(getError(err));
  }
};

 

  return (
    <Container>
      <Helmet>
        <title>Users</title>
      </Helmet>

      <Row>
        <Col>
          <h1>Users</h1>
          <Form.Control
            type="text"
            placeholder="Search by email..."
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
                  <th>User</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Delete User</th>
                </tr>
              </thead>
              <tbody>
              {filteredUsers.map((user) => (
  <tr key={user._id}>
    <td>
      <img
        src={user.image}
        alt="Profile Picture"
        className="profile-pic-comment"
      />
      {" "}
      {user.name}
    </td>
    <td>
      {user.email}
    </td>
    <td>
      {/* Render the AdminToggle component */}
      <AdminToggle isAdmin={user.isAdmin} userId={user._id} userInfo={userInfo} user = {user} />
    </td>
    <td>
      <Button variant="danger" onClick={()=> handleDeleteUser(user._id)}>
      <i class="fas fa-trash"></i>
      </Button>
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

export default UserListScreen;
