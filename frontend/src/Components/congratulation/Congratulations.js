// src/CongratulationPage.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Congratulations.css';

const CongratulationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, total } = location.state || { answers: 0, total: 0 };

  const handleChooseDifferentCategory = () => {
    // Add your logic here, for example, navigate to language selection page
    navigate('/categories');
  };

  // const handleRetryQuiz = () => {
  //   // Add your logic here, for example, navigate to quiz page
  //   navigate('/quiz');
  // };

  return (
    <div className="congratulation-page">
      <div className="content">
        <h1 className="congratulations-message">Congratulations!</h1>
        <h2>You answered {answers} out of {total}</h2>
        <div className="buttons-container">
          <button className="blue-button" onClick={handleChooseDifferentCategory}>Back</button>
          {/* <button className="white-button" onClick={handleRetryQuiz}>Retry</button> */}
        </div>
      </div>
    </div>
  );
};

export default CongratulationPage;
