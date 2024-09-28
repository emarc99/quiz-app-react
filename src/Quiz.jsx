import { useState } from "react"
import { questions } from "./assets/qbank"

export default function Quiz () {

    const [index, setIndex] = useState(0)
    const [question, setQuestion ] = useState(questions[index])
    const [lock, setLock] = useState(false)
    const [score, setScore] = useState(0)
    const [result, setResult] = useState(false)

    const [feedback, setFeedback] = useState("")

    const checkAnswer = (correct) => {
        if (lock === false) {
            if (correct) {
                setFeedback("Correct!")
                // e.target.classList.add('correct')
                setScore(prev => prev + 1)
              } 
            else {
                setFeedback("Wrong answer, try again!")
                // e.target.classList.add('incorrect')
              }
        setLock(true)
        }
      }

    const next = () => {
        if (lock) {
            if (index === questions.length - 1) {
                setResult(true)
                return 0
            }
            setIndex(prevIndex => prevIndex + 1)
            setQuestion(questions[index])
            setLock(false)
        }
    }

    return (
      <div className="app">
        <h1>FUN POP QUIZ</h1>
        <hr />
        {result ? <></>:
        <>       
            <h2>{index+1}. {question.question}</h2>
            <ul>{question.answers.map((answer, idx) => (
                    <li key={idx}>
                        <button onClick={() => checkAnswer(answer.correct)}>
                            {answer.text}
                        </button>
                    </li>
                ))}
            </ul>
            {feedback && <p>{feedback}</p>}
            <hr />
            <button onClick={next}>Next</button>
        </>}
        {result?<>
            <h2>You scored {score} over {questions.length}!</h2>
            <button>Play Again!</button>
        </>:<></>}
        

      </div>
    )
  }