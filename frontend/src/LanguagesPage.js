import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './LanguagesPage.css';
import { useUser } from './context/userContext';
import { useNavigate } from 'react-router-dom';
import { useLanguageId } from './context/languageIdContext';
import styled from 'styled-components';
import avatar1 from './img/avatar1.png';

function LanguageList() {
  const { userId, setUserId } = useUser();
  const { userName, setUserName } = useUser();
  const { languageId, setLanguageId } = useLanguageId();
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.valid) {
          setUserId(res.data.user_id);
          setUserName(res.data.userName);
          console.log(res.data.user_id);
        
            navigate("/languagePage");
          
        } else {
          // Handle invalid response
        }
      })
      .catch(err => console.log(err));
  }, [languageId, navigate, setUserId, setUserName]);

  useEffect(() => {
    language();
    console.log(navigate);
  }, [navigate]);

  const language = async () => {
    const response = await fetch('http://localhost:8081/language/get_languages');
    setLanguages(await response.json());
    console.log(response);
  };

  const logout = async () => {
    const response = await fetch('http://localhost:8081/language/logout');
    navigate('/')
    console.log(response);
  }

  const handleClick = async (l_id) => {
    try {
      console.log(userId);
      const response = await axios.post('http://localhost:8081/language/select_language', {
        user_id: userId,
        l_id: l_id
      });
      setLanguageId(l_id);
      navigate('/categories')
      console.log('Language selected');
    } catch (error) {
      console.error('There was an error sending the ID:', error.message);
    }
  };

  return (
    <div className="Container">
  <div className="Box">
    <img className="Image" src={avatar1} alt="User Avatar" />
    <h2 className="UserName">{userName}</h2>
    <button className="SignOutButton" onClick={logout}>Sign Out</button>
  </div>
  <div className="Content">
    <h1 className="CenterText"><i>Select The Language</i></h1>
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  min-height: 100vh;
`;

const Box = styled.div`
  width: 100px;
  height:120px;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
`;

const Image = styled.img`
  width: 70px;
  height:70px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 7px;
`;

const UserName = styled.h2`
  margin: 0;
  color: #343a40;
  margin-bottom : 5px;
  font-size:15px;
`;

const SignOutButton = styled.button`
  margin-top: auto;
  padding: 10px 20px;
  width:120px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 10px;
  transition: background-color 0.3s ease;
  

  &:hover {
    background-color: #c82333;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;  // Ensure it takes up available space to center properly
`;

const CenterText = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export default LanguageList;
