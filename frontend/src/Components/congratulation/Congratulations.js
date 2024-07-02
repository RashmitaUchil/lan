// src/CongratulationPage.js

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import './Congratulations.css';

import { useLanguageId } from '../../context/languageIdContext';
import { useParams } from 'react-router-dom';

const CongratulationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, total } = location.state || { answers: 0, total: 0 };
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
  const { category } = useParams();

  const { languageId, setLanguageId } = useLanguageId();
  const detectSize = () => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    }
  }, []);

  const handleChooseDifferentCategory = () => {
    navigate('/categories');
  };



  const scorePercentage = (answers / total) * 100;

  return (
    <div className="congratulation-page">
      <Confetti width={windowDimension.width} height={windowDimension.height} />
      <div className="content">
        <h1 className="congratulations-message">Congratulations!</h1>
        <h2>You answered {answers} out of {total}</h2>
        <p className="score-message">Perfect score! You're a language master!</p>
        <div className="progress-bar">
          <div className="progress" style={{width: `${scorePercentage}%`}}></div>
        </div>
        <div className="buttons-container">
          <button className="blue-button" onClick={handleChooseDifferentCategory}>Choose Another Category</button>
        </div>
      </div>
    </div>
  );
};
export default CongratulationPage;
