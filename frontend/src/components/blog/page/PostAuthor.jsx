import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import Avatar from './images/avatar1.jpg';
import axios from 'axios';


const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`);
        setAuthor(response?.data);
      } catch (error) {
        setError(error.message || 'An error occurred while fetching author details.');
      }
    };

    getAuthor();
  }, [authorID]);

  return (
    <Link to={`/posts/users/${authorID}`} className='post__author'>
      <div className="post__author-avatar">
        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`} alt="" />
      </div>
      <div className="post_author-details">
        <h5>By: {author?.name}</h5>
        <small>{createdAt}</small>
      </div>
    </Link>
  );
};

export default PostAuthor;
