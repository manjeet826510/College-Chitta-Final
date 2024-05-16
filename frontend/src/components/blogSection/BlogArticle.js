import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Pages
import NotFound from "./NotFound";
import CommentsList from "./CommentsList";
import AddCommentForm from "./AddCommentForm";
import Articles from "./Articles";
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";
import CommentSection from "./CommentSection";
import CommentCard from "./CommentCard";
import { toast } from "react-toastify";
import getError from "../../utils";
import { Helmet } from "react-helmet-async";

// Components


const Article = () => {
  const { name } = useParams();
  const [articleInfo, setArticleInfo] = useState("")
  const [article, setArticle] = useState("")
  const [articleContent, setArticleContent] = useState([])
  const [blogNotFound, setBlogNotFound] = useState(false);
//   console.log();
//   const article = articleContent.find((article) => article.name === name);
//   const [articleInfo, setArticleInfo] = useState({ comments: [] });

useEffect(() => {
    
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${name}`);
        setArticle(res.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setBlogNotFound(true);
        } else {
          toast.error(getError(error));
        }
      }
    };

    const fetchAllBlog = async () => {
        try {
          const res = await axios.get(`/api/blogs`);
          setArticleContent(res.data);
        } catch (error) {
          
            toast.error(getError(error));
          
        }
      };

    fetchBlog();
    fetchAllBlog();
    window.scrollTo(0,0);
  }, [name]);
  

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await fetch(`/api/articles/${name}`);
//       const body = await result.json();
//       console.log(body);
//       setArticleInfo(body);
//     };
//     fetchData();
//   }, [name]);

if (blogNotFound) {
    return <div style={{height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><h1>Blog not found</h1></div>;
  }

  if (!article) {
    return <div className="d-flex justify-content-center mt-5">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>;
  }


  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );
  return (
    <>
    <Container style={{marginTop: '1rem', marginBottom: '1rem'}}>
    <Helmet>
        <title>{article.title}</title>
      </Helmet>
      <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>
        {article.title}
      </h1>
      {article.content.map((paragraph, index) => (
        <p className='mx-auto leading-relaxed text-base mb-4' key={index}>
          {paragraph}
        </p>
      ))}
      {/* <CommentsList comments={articleInfo.comments} /> */}
      <CommentSection articleName= {name}/>
      {/* <CommentCard/> */}
      {/* <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} /> */}
      <h1 className='sm:text-2xl text-xl font-bold my-4 text-gray-900'>
        Other Articles
      </h1>
      <div className='flex flex-wrap -m-4'>
        <Articles articles={otherArticles} />
      </div>
      </Container>
    </>
  );
};

export default Article;