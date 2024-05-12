// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ArticleComments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const articleId = 'article123'; // Replace with the actual article ID

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(`/api/articles/${articleId}/comments`);
      setComments(response.data);
    };
    fetchComments();
  }, [articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/articles/${articleId}/comments`, {
        author: 'User', // Replace with actual user info
        text: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  return (
    <div className="App">
      <h1>Article Comments</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <strong>{comment.author}</strong>: {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleComments;
