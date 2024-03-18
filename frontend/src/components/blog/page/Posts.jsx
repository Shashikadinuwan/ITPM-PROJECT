import React, { useState } from 'react';
import Thumbnaill from '../images/blog1.jpg';
import Thumbnail2 from '../images/blog2.jpg';
import Thumbnail3 from '../images/blog3.jpg';
import Thumbnail4 from '../images/blog4.jpg';
import PostItem from './PostItem';

const DUMMY_POSTS = [
  {
    id: '1',
    thumbnail: Thumbnaill,
    category: 'education',
    title: 'This is the title of the very first post on this blog.',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat do',
    authorID: 3
  },
  {
    id: '2',
    thumbnail: Thumbnail2,
    category: 'science',
    title: 'This is the title of the very first post on this blog.',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat do',
    authorID: 1
  },
  {
    id: '3', // Corrected id to be unique
    thumbnail: Thumbnail3,
    category: 'weather',
    title: 'This is the title of the very first post on this blog.',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat do',
    authorID: 13
  },
  {
    id: '4', // Corrected id to be unique
    thumbnail: Thumbnail4,
    category: 'farming',
    title: 'This is the title of the very first post on this blog.',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat do',
    authorID: 11
  },
];

function Posts () {
  const [posts, setPosts] = useState(DUMMY_POSTS)
return (
  <section className="posts">
     <div className="container posts__container">
     {
          posts.map(({id, thumbnail,category,title,desc,authorID}) => <PostItem key={id} postID={id} thumbnail ={thumbnail} category={category}title={title}
          description={desc} authorID={authorID}/>)
      }
     </div>
  </section>
)
}

export default Posts;
