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
import { useLanguageId } from './context/languageIdContext.js'
import Navigation from './Navigation/navigation.js';


function App() {
  const { userId, setUserId } = useUser();
  const { languageId } = useLanguageId();
  const navigate=useNavigate()
  useEffect(()=>{

    axios.get('http://localhost:8081')
    .then(res=>{
      if(res.data.valid) {
          setUserId(res.data.user_id);
          if(languageId != null && languageId > 0){
            console.log('ddd')
            navigate("/quiz")
          }else{
          navigate("/languagePage")
          }
        }
        else
        {
          
        }
    })
    .catch(err=>console.log(err))
  },[])
  return (
  
      
      <Routes>
        
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/languagePage" element={<LanguagesPage/>} />
        <Route path="/quiz" element={<Quiz/>} />

     </Routes>
  
     
   
  );
}

export default App;

