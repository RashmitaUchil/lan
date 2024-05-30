import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './SignUp.css';


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/user/signup',formData)
    .then(res=>{
          navigate('/login');
        
    })
    .catch(err=>console.log(err));
    console.log(formData);
  };


  return (
    <div className="parent-container">
      <div className="background">
        <div className="card">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          {/* <div>
            Link to the login page
            <p>
              Already have an account?{' '}
              <a href="/login" onClick={
                navigate('/login')
              }>
                Login
              </a>
              .
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
