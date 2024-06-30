import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TryAgain.css';
import { useCategory } from '../../context/categoryContext';
import { useLanguageId } from '../../context/languageIdContext';


const TryAgainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, total } = location.state || { answers: 0, total: 0};
  const { category, setCategory } = useCategory();
  const { languageId, setLanguageId } = useLanguageId();

  const handleTryAgain = () => {
    // Navigate back to the quiz page for the current category
    setLanguageId(languageId);
    setCategory(category);
    console.log(languageId, category);
    navigate(`/quiz/${category}`);
  };

  const handleChooseDifferentLanguage = () => {
    // Navigate to the categories page
    navigate('/languagePage');
  };

  return (
    <div className="try-again-page">
      <div className="content">
        <h1 className="try-again-message">Try Again!</h1>
        <h2>You answered {answers} out of {total}</h2>
        <div className="buttons-container">
          <button className="blue-button" onClick={handleTryAgain}>Try Again</button>
          <button className="blue-button" onClick={handleChooseDifferentLanguage}>Choose Different Language</button>
        </div>
      </div>
    </div>
  );
};

export default TryAgainPage;
