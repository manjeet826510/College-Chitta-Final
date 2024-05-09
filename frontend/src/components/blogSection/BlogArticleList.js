import React, { useEffect, useState } from "react";
import Articles from "./Articles";
import { Card, Spinner } from "react-bootstrap";
import axios from "axios";
import MessageBox from "../MessageBox";

// Components

const ArticlesList = () => {
    const [articles, setArticles] = useState([]);
    const [error, seterror] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
          try {
            const response = await axios.get('/api/blogs');
            setArticles(response.data);
          } catch (error) {
            console.error('Error fetching articles:', error.message);
            seterror(error.message)
          }
        };
    
        fetchArticles();
      }, []);
    

  return (

    

    <div  style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem'}}>
        <Card style={{ width: '90%', padding: '1rem' }}>
      <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>
        Articles
      </h1>

      {error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    articles.length === 0 ? (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    ) :

      (<div className='container py-4 mx-auto'>
        <div className='flex flex-wrap -m-4'>
          <Articles articles={articles} />
        </div>
      </div>)
  )
}


      </Card>
    </div>
  );
};

export default ArticlesList;