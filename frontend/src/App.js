import axios from 'axios'
import './App.css';
import { useNavigate } from 'react-router-dom';
import SignUp from './Signup.js';
import LanguagesPage from './LanguagesPage.js' 
import Quiz from './Quiz.js' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Imported BrowserRouter as Router and corrected Routes import
import Login from './Login';
import { useEffect,useState } from 'react';
import { useUser } from './context/userContext.js';


function App() {
  const { userId, setUserId } = useUser();
  const navigate=useNavigate()
  useEffect(()=>{

    axios.get('http://localhost:8081')
    .then(res=>{
      if(res.data.valid)
        {
          console.log('ssss')
          setUserId(res.data.user_id);
          navigate("/languagePage")
        }
        else
        {
          console.log('dddd')
          
        }
    })
    .catch(err=>console.log(err))
  })
  return (
  
      
      <Routes>
        <Route path="/" element={<Quiz/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/languagePage" element={<LanguagesPage/>} />
        <Route path="/quiz" element={<Quiz/>} />

      </Routes>
     
   
  );
}

export default App;

