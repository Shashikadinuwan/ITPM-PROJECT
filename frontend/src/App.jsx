import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/blog/page/Layout';
import ErrorPage from './components/blog/page/ErrorPage';
import PostDetail from './components/blog/page/PostDetail';
import Home from './components/blog/page/home';
import CreatePost from './components/blog/page/CreatePost';
import Register from './components/blog/page/Register';
import Logout from './components/blog/page/Logout';
import EditPost from './components/blog/page/EditPost';
import Login from './components/blog/page/Login';
import Dashboard from './components/blog/page/Dashboard';
import AuthorPosts from './components/blog/page/AuthorPosts';
import CategoryPosts from './components/blog/page/CategoryPosts';
import Authors from './components/blog/page/Authors';
import UserProfile from './components/blog/page/UserProfile';
import DeletePost from './components/blog/page/DeletePost'
import UserProvider from './components/blog/page/userContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<UserProvider><Layout /></UserProvider>}
          errorElement={<ErrorPage />}
        >
          <Route index element={<Home />} />
          <Route path="posts/:id" element={<PostDetail />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="authors" element={<Authors />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="posts/categories/:category" element={<CategoryPosts />} />
          <Route path="posts/users/:id" element={<AuthorPosts />} />
          <Route path="myposts/:id" element={<Dashboard />} />
          <Route path="posts/:id/edit" element={<EditPost />} />
          <Route path="posts/:id/delete" element={<DeletePost />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;