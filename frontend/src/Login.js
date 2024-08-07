import axios from 'axios'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS file for login page styling
import { useUser } from './context/userContext';    
import toast from 'react-hot-toast';



const Login = () => {
  const { userId, setUserId } = useUser()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  axios.defaults.withCredentials=true;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post('http://localhost:8081/user/login',formData)
    .then(res=>{
      if(res.data.token!=null)
        {
          toast.success("Logged in")
          navigate('/languagePage');
        }
        else{
          toast.error("Invalid credentials")
        }
        console.log(res);
    })
    .catch(err=>toast.error("email or password is incorrect") );
    // Redirect to dashboard or desired page after login
    
  };

 
  return (
    <div className="background">
  <div className="login-container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn-login">Login</button>
    </form>
  </div>
</div>
      
    
    
  );
};

export default Login;