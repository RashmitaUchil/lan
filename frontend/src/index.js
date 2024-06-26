import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/userContext';
import { LanguageIdProvider } from './context/languageIdContext';
import { CategoryProvider } from './context/categoryContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 

    <UserProvider>
    <LanguageIdProvider>
    <CategoryProvider>
     <BrowserRouter>
   
  
    <App/>
  </BrowserRouter>
  </CategoryProvider>
  </LanguageIdProvider>
  </UserProvider>
  

 
  
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
