import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from './Loader';
import DeletePost from './DeletePost';
import { UserContext } from './userContext';
import axios from 'axios';
import PostAuthor from './PostAuthor';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initial loading state set to true
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError(error.message); // Set error message instead of error object
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };
    getPost();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor authorID={post.creator} createdAt={post.createdAt}/>
          {currentUser?.id === post?.creator && (
            <div className="post-detail__buttons">
              <Link to={`/posts/${id}/edit`} className="btn sm primary"> {/* Use `id` instead of `postId` */}
                Edit
              </Link>
              <DeletePost postId={id} />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <div className="post-detail__thumbnail">
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
        </div>
        <p dangerouslySetInnerHTML={{__html: post.description}}></p>
      </div>
    </section>
  );
};

export default PostDetail;
