import axios from 'axios'
import './App.css';
import { useNavigate } from 'react-router-dom';
import SignUp from './Signup.jsx';
import LanguagesPage from './LanguagesPage.js' 
import Quiz from './Quiz.js' 
import Category from './Category.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Imported BrowserRouter as Router and corrected Routes import
import Login from './Login.js';
import { useEffect } from 'react';
import { useUser } from './context/userContext.js';
import { useLanguageId } from './context/languageIdContext.js'
import Navigation from './Navigation/navigation.js';
import CongratulationPage from './Components/congratulation/Congratulations.js';
import toast, { Toaster } from 'react-hot-toast';
import { LanguageIdProvider } from './context/languageIdContext';


function App() {
  const { userId, setUserId } = useUser();
  const { userName, setUserName } = useUser();
  const { languageId } = useLanguageId();
  const navigate=useNavigate()
  useEffect(()=>{

    axios.get('http://localhost:8081')
    .then(res=>{
      if(res.data.valid) {
          setUserId(res.data.user_id);
          setUserName(res.data.userName);

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
  
    <LanguageIdProvider>
      <>
         
         <Routes>
           
           <Route path="/" element={<SignUp/>} />
           <Route path="/login" element={<Login />} />
           <Route path="/languagePage" element={<LanguagesPage/>} />
           <Route path="/quiz/:category" element={<Quiz/>} />
           <Route path= "/congrats" element={<CongratulationPage/>} />
           <Route path="/categories" element={<Category/>} />
     
   
        </Routes>
        <Toaster />
   
        </>
    </LanguageIdProvider>
      
  
     
   
  );
}

export default App;

