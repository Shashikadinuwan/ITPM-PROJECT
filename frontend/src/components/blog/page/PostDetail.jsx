import React from 'react';
import PostAuthor from './PostAuthor';
import { Link } from 'react-router-dom';
import Thumbnail from './images/blog22.jpg'; // Direct import without curly braces

const PostDetail = () => {
  return (
    <section className='post-detail'>
      <div className="container post-detail__container">
        <div className='post-detail__header'>
          <PostAuthor/>
          <div className="post-detial__buttons">
            <Link to='/posts/werwer/edit' className='btn sm primary'>Edit</Link>
            <Link to='/posts/werwer/delete' className='btn sm danger'>Delete</Link>
          </div>
        </div>

        <h1>this is post title</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} alt="Thumbnail"/>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi inventore et amet 
          itaque molestiae rem nemo veniam modi molestias consectetur obcaecati a quae assumenda, unde cumque 
          illo corporis tenetur? Laboriosam quisquam recusandae distinctio in dolorum atque cumque, assumenda cum illo.

        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, dicta? Voluptate unde at corporis distinctio veniam quibusdam inventore, consectetur voluptates? Corporis nulla ut labore commodi veniam sed alias architecto enim saepe unde, provident nam veritatis accusamus, ab quas, velit mollitia quia cupiditate nemo iure blanditiis impedit voluptatibus? Inventore rerum ratione consequatur, tenetur veniam maiores itaque?

        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam reprehenderit inventore autem laudantium ipsum minima sed ab animi neque enim doloribus praesentium voluptatum, ullam architecto voluptates quos rem nisi veritatis deserunt aut repudiandae quam amet. Rem assumenda ullam accusamus rerum ex ipsum cupiditate? Perferendis harum dignissimos aut minima asperiores animi maiores modi! Nihil, sapiente magnam doloremque in ducimus ipsum ullam quaerat consequuntur veniam! Est ut pariatur quisquam veniam veritatis dicta dolore enim omnis, quaerat voluptatem tenetur quam beatae perferendis fugit debitis possimus? Corrupti assumenda quisquam quae aspernatur modi itaque facilis saepe quibusdam sequi obcaecati, iusto ipsum repellendus accusantium unde ipsa delectus id qui at excepturi quia? Dolorum maiores nostrum repudiandae dolor corrupti!

        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus, rerum voluptatum.
        </p>

      </div>
    </section>
  );
}

export default PostDetail;
