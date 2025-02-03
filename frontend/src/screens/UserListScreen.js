import React, { useContext, useEffect, useReducer, useState } from "react";
import MessageBox from "../components/MessageBox";
import axios from "axios";
import getError from "../utils";
import Button from "react-bootstrap/esm/Button";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { ButtonGroup, Container, Dropdown, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

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
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", error: getError(err) });
      }
    };

    fetchUsers();
  }, [userInfo]);

  useEffect(() => {
    if (users.length > 0) {
      setFilteredUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [users, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteUser = (uid) => {
    const res = window.confirm("Do you really want to delete this user?");
    if (res) {
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
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(
        `/api/users/admin/role/${userId}`,
        { role: newRole },
        {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        }
      );
      toast.success("Role updated successfully");
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      toast.error(getError(error));
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
                  <th>Applied Role</th>
                  <th>Current Role</th>
                  <th>Document</th>
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
                    <td>{user.email}</td>
                    <td>{user.appliedRole}</td>
                    <td>
                      <Dropdown
                        as={ButtonGroup}
                        onSelect={(eventKey) => handleRoleChange(user._id, eventKey)}
                      >
                        <span variant="">{user.role}</span>
                        {
                          userInfo.email!==user.email && <Dropdown.Toggle split variant="" id="dropdown-split-basic" />
                        }
                        
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="student">Student</Dropdown.Item>
                          <Dropdown.Item eventKey="counsellor">Counsellor</Dropdown.Item>
                          <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td>
                      <a href={user.pdf} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </td>
                    <td>
                      <Button
                        disabled={userInfo.email === user.email}
                        variant="danger"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <i className="fas fa-trash"></i>
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
