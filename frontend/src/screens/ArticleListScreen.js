import React, { useContext, useEffect, useReducer, useState } from "react";
import MessageBox from "../components/MessageBox";
import axios from "axios";
import getError from "../utils";
import Button from "react-bootstrap/Button";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
        articles: action.payload.blogs,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ArticleListScreen = () => {
  const [{ loading, error, articles }, dispatch] = useReducer(reducer, {
    loading: false,
    articles: [],
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/blogs/admin/list-articles`, {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchArticles();
  }, [userInfo]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setFilteredArticles(
      articles.filter((article) =>
        (article.slug && article.slug.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (article.author && article.author.name && article.author.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  }, [articles, searchQuery]);

  const handleEditArticle = (slug) => {
    navigate(`/admin/article-edit/${slug}`);
  };

  const handleDeleteArticle = (aid) => {
    const res = window.confirm("Do you really want to delete this Article?");
    if (res) {
      handleDeleteSubmit(aid);
    }
  };

  const handleDeleteSubmit = async (aid) => {
    try {
      await axios.delete(`/api/blogs/${aid}`, {
        headers: {
          authorization: `Bearer ${userInfo.jwtToken}`,
        },
      });
      window.location.reload(); // Refresh the page
      toast.success("Article deleted successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const handleUploadArticle = () => {
    navigate('/admin/article-upload');
  };

  return (
    <Container>
      <Helmet>
        <title>Article List</title>
      </Helmet>

      <Row>
        <Col>
          <h1>Articles</h1>
          <Button onClick={handleUploadArticle} className="mt-1 mb-3">Upload Article</Button>
          <Form.Control
            type="text"
            placeholder="Search by article name or author name..."
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
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>AUTHOR</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article?._id}>
                  <td>{article?._id}</td>
                  <td>
                    <a href={`/article/${article?.slug}`}>{article?.slug}</a>
                  </td>
                  <td>{article?.author?.name}</td>
                  <td>
                    {userInfo && userInfo._id === article?.author?._id ? (
                      <>
                        <Button onClick={() => handleEditArticle(article.slug)} variant="success">
                          <i className="fas fa-edit"></i>
                        </Button>
                        {"    "}
                        <Button onClick={() => handleDeleteArticle(article._id)} variant="danger">
                          <i className="fas fa-trash"></i>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button disabled onClick={() => handleEditArticle(article.slug)} variant="success">
                          <i className="fas fa-edit"></i>
                        </Button>
                        {"    "}
                        <Button disabled onClick={() => handleDeleteArticle(article._id)} variant="danger">
                          <i className="fas fa-trash"></i>
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default ArticleListScreen;
