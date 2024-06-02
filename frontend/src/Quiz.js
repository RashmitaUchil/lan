// src/components/QuizPage.js
import React,{useRef,useState,useEffect} from 'react'
import './Quiz.css'
import axios from 'axios'

function QuizPage() {
    
  let[index, setIndex]=useState(0);
  let[question,setQuestions]=useState();
  let[lock,setLock]=useState(false);
  let[score,setScore]=useState(0);
  let[result,setResult]=useState(false);

  let Option1=useRef(null);
  let Option2=useRef(null);
  let Option3=useRef(null);
  let Option4=useRef(null);

  let option_array=[Option1,Option2,Option3,Option4];

  const checkAns =(e,answer)=>
    {
      if(lock===false)
        {
          if(question.answer===answer)
            {
              e.target.classList.add("correct");
              setLock(true);
              setScore(prev=>prev+1);
            }
            else
            {
              e.target.classList.add("wrong");
              setLock(true);
              option_array[question.answer-1].current.classList.add("correct");
            }
        }
      
    }

    const next=()=>
      {
        if(lock===true){
          if(index===data.length-1)
            {
              setResult(true);
              return 0;
            }
          setIndex(++index);
          setQuestions(data[index]);
          setLock(false);
          option_array.map(option)=>{
            option.current.classList.remove("wrong");
            option.current.classList.remove("correct");
            return null;
          }
      }
    }

      const reset=()=>{
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);

      }
   
      useEffect(() => {
    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:8081/questions/get_questions');
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
    return (
        <div className='question-list-container'>
          <h1>QUIZ</h1>
          <hr/>
          {result?<></>:<>
          <h2>{index+1}. {question.question} </h2>
          <ul>
                            {question.options.map((option, idx) => (
                                <li ref={option[idx]} onClick={(e)=>{checkAns(e,idx)}} key={idx} className="option-item">
                                    {option}
                                </li>
                            ))}
                        </ul>
          <button onClick={next}>Next</button>
          <div className='index'>{index+1} of {data.length}questions</div></>}
          {result?<>
            <h2>Score:{score} out of {data.length}</h2>
            <button onClick={reset}>Reset</button></>:<></>}
          
        </div>
    );
}

export default QuizPage;
