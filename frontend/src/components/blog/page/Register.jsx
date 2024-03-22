import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Perform client-side form validation
      if (userData.password !== userData.password2) {
        setError("Passwords do not match");
        return;
      }
      // Perform other validation checks here (e.g., email format)
  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      if (response.status === 200 || response.status === 201) {
        // Provide feedback for successful registration
        alert("Registration successful! Please log in.");
        navigate('/login');
        return; // Exit function early after successful registration
      }
      // If the response status is not 200 or 201, it means registration failed
      setError("Couldn't register user");
    } catch (err) {
      // Provide more specific error messages or log the error details
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while registering.');
      }
    }
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form" onSubmit={registerUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInputHandler} />
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler} />
          <input type="password" placeholder='Confirm Password' name='password2' value={userData.password2} onChange={changeInputHandler} />
          <button type="submit" className='btn primary'>Register</button>
        </form>
        <small>Already have an account? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  );
};

export default Register;
