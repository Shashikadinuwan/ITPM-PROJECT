import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading to true

  useEffect(() => {
    const getAuthors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
        setAuthors(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set isLoading to false after fetching data (including error cases)
      }
    };

    getAuthors();
  }, []);

  return (
    <section className="authors">
      {isLoading ? ( // Render loader if isLoading is true
        <div className="loader">Loading...</div>
      ) : authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map(({ _id:id, avatar, name, posts }) => (
            <Link key={id} to={`/posts/users/${id}`} className="author">
              <div className="author__avatar">
              <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}  />
              </div>
              <div className="author__info">
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="center">No users found.</h2>
      )}
    </section>
  );
};

export default Authors;
