import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import Loader from './Loader';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
        setPosts(response?.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching posts.');
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h2 className='center'>{error}</h2>;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(({ _id: id, thumbnail, category, title, description, creator }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              description={description}
              authorID={creator}
            />
          ))}
        </div>
      ) : (
        <h2 className='center'>No posts found</h2>
      )}
    </section>
  );
};

export default Posts;
