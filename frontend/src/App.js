import axios from 'axios'
import './App.css';
import { useNavigate } from 'react-router-dom';
import SignUp from './Signup.js';
import LanguagesPage from './LanguagesPage.js' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Imported BrowserRouter as Router and corrected Routes import
import Login from './Login';
import { useEffect,useState } from 'react';

function App() {
  const [id, setId]= useState('')
  const navigate=useNavigate()
  useEffect(()=>{
    axios.get('http://localhost:8081')
    .then(res=>{
      if(res.data.valid)
        {
          setId(res.data.user_id);
        }
        else
        {
          navigate("/languagePage")
        }
    })
    .catch(err=>console.log(err))
  })
  return (
    
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/languagePage" element={<LanguagesPage/>} />

      </Routes>
   
  );
}

export default App;

