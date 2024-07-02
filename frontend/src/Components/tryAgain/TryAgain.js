import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './TryAgain.css';
import { useLanguageId } from '../../context/languageIdContext';

const TryAgainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, total } = location.state || { answers: 0, total: 0 };
  const { category } = useParams();
  const { languageId, setLanguageId } = useLanguageId();

  const scorePercentage = (answers / total) * 100;

  const handleTryAgain = () => {
    setLanguageId(languageId);
    navigate(`/quiz/${category}`);
  };

  const handleChooseDifferentLanguage = () => {
    navigate('/languagePage');
  };

  const getMessage = () => {
    if (scorePercentage >= 80) return "You're so close! Just a bit more practice and you'll nail it!";
    if (scorePercentage >= 60) return "Good effort! Keep pushing, you're making progress!";
    return "Don't give up! Every attempt brings you closer to mastery!";
  };

  return (
    <div className="try-again-page">
      <div className="content">
        <h1 className="try-again-message">Almost There!</h1>
        <h2>You answered {answers} out of {total}</h2>
        <div className="progress-bar">
          <div className="progress" style={{width: `${scorePercentage}%`}}></div>
        </div>
        <p className="motivational-message">{getMessage()}</p>
        <div className="buttons-container">
          <button className="blue-button" onClick={handleTryAgain}>Try Again</button>
          <button className="blue-button" onClick={handleChooseDifferentLanguage}>Choose Different Language</button>
        </div>
      </div>
    </div>
  );
};

export default TryAgainPage;