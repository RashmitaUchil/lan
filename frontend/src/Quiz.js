import React, { useRef, useState, useEffect } from 'react';
import './Quiz.css';
import axios from 'axios';
import { useLanguageId } from './context/languageIdContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from './context/userContext';
//import { useCategory } from './context/categoryContext';

function QuizPage() {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const { languageId }= useLanguageId();
  const { userId } = useUser();
  const { category } = useParams();
  
  const navigate = useNavigate();
  const optionRefs = useRef([]);

  const checkAns = (e, selectedIdx) => {
    if (lock === false) {
      const correctOptionIndex = questions[index].options.indexOf(questions[index].answer);
      
      if (selectedIdx === correctOptionIndex) {
        e.target.classList.add('correct');
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('wrong');
        if (optionRefs.current[correctOptionIndex]) {
          optionRefs.current[correctOptionIndex].classList.add('correct');
        }
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === questions.length - 1)
         
        {
          if (score === questions.length) 
            {
        
              updateUserProgress(true);
              
            } 
          else 
          {
            updateUserProgress(false);
            setResult(true);
          }
          reset();
          navigate('/congrats', 
            {
              state: { answers: score, total: questions.length },
            });
        return;
        
      }
      
      setIndex((prevIndex) => prevIndex + 1);
      setLock(false);
      optionRefs.current.forEach((option) => {
        if (option) {
          option.classList.remove('wrong');
          option.classList.remove('correct');
        }
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  const updateUserProgress = async (isCompleted) => {
    try {
      const response = await axios.post('http://localhost:8081/activity/user_activity', {
        user_id:userId,
        l_id: languageId,
        category:category,
        isCompleted:isCompleted,
      });
      console.log('User progress updated:', response.data);
    } catch (error) {
      console.error('Error updating user progress:', error);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        console.log(languageId)
        const response = await axios.get('http://localhost:8081/questions/get_questions',{
        params : {
          l_id: languageId,
          category: category
        }  }   );
        console.log('Received questions:', response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setQuestions(response.data);
        } else {
          console.error('Invalid data format:', response.data);
          setQuestions([]);
        }
       
      } catch (error) {
        console.error('Error fetching questions:', error);
        setQuestions([]);
      }
      finally {
        setLoading(false);
      }
    };

    if (languageId && category) {
      fetchQuestions();
  } else {
      console.error(`Missing languageId or category. LanguageId: ${languageId}, Category: ${category}`);
  }
  }, [languageId, category]);

  if (loading) {
    return <div>Loading questions for {category}...</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available for the category: {category}</div>; // Add a loading state
  }

  const currentQuestion = questions[index];

  return (
    <div className='question-list-container'>
      <h1>{category}</h1>
      
      {!result ? (
        <>
          <h2>{index + 1}. {currentQuestion.question}</h2>
          <ul >
            {currentQuestion.options.map((option, idx) => (
              <li 
                ref={(el) => optionRefs.current[idx] = el}
                onClick={(e) => { checkAns(e, idx); }}
                key={idx}
                className="option-item"
              >
                {option}
              </li>
            ))}
          </ul>
          <button onClick={next}>Next</button>
          <div className='index'>{index + 1} of {questions.length} questions</div>
        </>
      ) : (
        <>
          <h2>Score: {score} out of {questions.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
}

export default QuizPage;
