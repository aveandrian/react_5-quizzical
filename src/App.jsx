import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid';
import axios from 'axios';
import Question from './components/Question';
import {decode} from 'html-entities';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  const [quizzQuestions, setQuizzQuestions] = useState([]);
  const [isFinished, setIsFinished] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  
  const notify = () => toast("not so fast cowboy. answer ALL the questions", {
    position: 'bottom-left',
    autoClose: 1000
  });

  async function startGame(){
    const { data } = await axios.get('https://opentdb.com/api.php?amount=5')
    setQuizzQuestions(data.results.map(question => {
      question.correct_answer = {questionTitle: decode(question.correct_answer), isHeld: false, id: nanoid(), isCorrect: true }
      question.incorrect_answers= question.incorrect_answers.map(
        answer => ({
          questionTitle: decode(answer),
          isHeld: false,
          id: nanoid(),
          isCorrect: false
        })
      )
      return {
            ...question,
            question: decode(question.question),
            answers: shuffleAnswers([question.correct_answer, ...question.incorrect_answers]),
            id: nanoid()
          }
        }
        ))
    setIsStarted(true)
  }

  function shuffleAnswers(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
  }

  function toggleAnswer(questId, answerId){ 
    if(!isFinished){
      setQuizzQuestions(prevQuizzQuestions => prevQuizzQuestions.map(question => {
        return question.id === questId ? 
        {
          ...question, 
          answers: question.answers.map(answer => answer.id === answerId ? {...answer, isHeld: !answer.isHeld} : {...answer, isHeld: false} )
        } : 
        question
      }))
    }
  } 

  function checkAnswers(){
    if(quizzQuestions.every(question => question.answers.some(answer => answer.isHeld))){
      let correctAnswersCount = 0
      quizzQuestions.forEach(quesiton => quesiton.answers.forEach(answer =>{ if(answer.isCorrect && answer.isHeld) correctAnswersCount++}))
      setCorrectAnswers(correctAnswersCount)
      setIsFinished(true)
    } else notify()
  }

  function startAgain(){
    setIsFinished(false)
    startGame()
  }

  return isStarted ? (
    <main>
    { 
      quizzQuestions.map(question => <Question 
          key={question.id} 
          id={question.id} 
          title={question.question} 
          answers={question.answers}
          onAnswerClick={toggleAnswer}
          isFinished={isFinished}
          />)
    }
    <div className='footer'>
      {isFinished && <p className='finalscore'>You scored {correctAnswers}/{quizzQuestions.length} correct answers</p>}
      <button onClick={isFinished? startAgain : checkAnswers}>{isFinished? "Play again" : "Check answers"}</button>
    </div>
    <ToastContainer />
    </main>
  ) : (
      <main className='welcome-screen'>
        <h1 className='game-title'>Quizzical</h1>
         <p className='game-description'>Conquer your cluelessness with the ingeneous quiz that helps you learn about the things.</p>
         <button onClick={startGame} >Play</button>
      </main>
  )
  
}

export default App
