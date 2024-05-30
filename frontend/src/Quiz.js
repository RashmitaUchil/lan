import React, { useState, useEffect } from 'react';
import './Quiz.css';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8081/questions/get_questions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setQuestions(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleChange = (e, question) => {
    setAnswers({
      ...answers,
      [question]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newScore = 0;

    questions.forEach(question => {
      if (answers[question.option] === question.answer) {
        newScore += 1;
      }
    });

    setScore(newScore);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="quiz-container score-container">
        <h2>Your Score: {score} / {questions.length}</h2>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Quiz</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question.question} className="question">
            <p>{index + 1}. {question.question}</p>
            <div className="options">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="option">
                  <label>
                    <input
                      type="radio"
                      name={question._id}
                      value={option}
                      onChange={(e) => handleChange(e, question._id)}
                      required
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Quiz;
