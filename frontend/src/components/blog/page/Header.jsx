import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Logo from './images/blog20.jpg';
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from './userContext';

const Header = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className='nav__logo'>
          <img src={Logo} alt="Navbar Logo" />
        </Link>
        {currentUser?.id && (
          <ul className="nav__menu">
            <li><Link to="/profile/sdfsdf">{currentUser?.name}</Link></li>
            <li><Link to="/create">Create Post</Link></li>
            <li><Link to="/authors">Authors</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        )}
        {!currentUser?.id && (
          <ul className="nav__menu">
            <li><Link to="/authors">Authors</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        )}
        <button className="nav__toggle-btn">
          <AiOutlineClose />
        </button>
      </div>
    </nav>
  );
};

export default Header;
