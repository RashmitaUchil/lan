import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './LanguagesPage.css';
import { useUser } from './context/userContext';
import { useNavigate } from 'react-router-dom';
import { useLanguageId } from './context/languageIdContext';
import styled from 'styled-components';
import avatar from './img/avatar.png'

function LanguageList() {
  const { userId,setUserId } = useUser();


  const { languageId, setLanguageId } = useLanguageId();
  

  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

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
  },[languageId])

 useEffect(()=>
    {
      language()
      console.log(navigate)
    },[])

  const language = async() =>
    {
      const response = await fetch('http://localhost:8081/language/get_languages');

      setLanguages(await response.json())
      console.log(response);
    }

    const handleClick = async (l_id) => {
      try {
        console.log(userId)
          const response = await axios.post('http://localhost:8081/language/select_language', { 
            user_id : userId,
            l_id : l_id
          });
          setLanguageId(l_id);
          console.log('loffff')
      } catch (error) {
          console.error('There was an error sending the ID:', error.message);
      }
  };
  return (
 
    <div>
      <Box>
      <Image src={avatar} alt="User Avatar" />
      <UserName>Mike</UserName>
      <SignOutButton onClick={
        console.log('sss')
      }>Sign Out</SignOutButton>
    </Box>
    <div><center><h1>Select The Language</h1></center>
    <div className="language-cards-container">
      <ul className="language-cards-list">
        {languages.map((language) => (
          <li className="language-card-item" key={language.l_id} onClick={() => handleClick(language.l_id)}>
            <div className="language-card">
              <div className="language-card-content">
                <h3><i>{language.lang_name}</i></h3>
                <div className="language-card-flag">
                  <img src={language.flag_url} alt={`${language.lang_name} Flag`} width="100" height="70" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>
  );
}


const Box = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
`;

const UserName = styled.h2`
  margin: 0;
  color: #343a40;
`;

const SignOutButton = styled.button`
  margin-top: auto;
  padding: 10px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;




export default LanguageList;