import React, { useRef, useState, useEffect } from 'react';
import './Quiz.css';
import axios from 'axios';
import { useLanguageId } from './context/languageIdContext';
import { useNavigate } from 'react-router-dom';

function QuizPage() {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const { languageId }= useLanguageId();
  
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
      if (index === questions.length - 1) {
      //  if(score >= questions.length / 2){
          
          navigate('/congrats',{ state : { 
               answers : score,
               total  : questions.length 
          }});
          reset();
     //   }
      
       // setResult(true);
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

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log(languageId)
        const response = await axios.get('http://localhost:8081/questions/get_questions',{
        params : {
          l_id: languageId
        }  }   );
        if (Array.isArray(response.data)) {
          setQuestions(response.data);
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  if (questions.length === 0) {
    return <div>Loading...</div>; // Add a loading state
  }

  const currentQuestion = questions[index];

  return (
    <div className='question-list-container'>
      <h1>QUIZ</h1>
      <hr />
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
