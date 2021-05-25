import { useState, useEffect } from 'react'
import './App.css';
import './bootstrap.css'
import './style.css'


let reply = []
let answerGiven = []
function App() {
  let rpl;
  let answerArray = []
  let scoreCard = reply
  let givenAnswer = answerGiven
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState([])
  const [showEnd, setShowEnd] = useState(false)
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
      .then(response => response.json())
      .then(json => { setQuestion(json.results) })
  }, [])
  var sortedArray;

  function sortArray(a, b) {
    return 0.5 - Math.random();
  }
  return (
    <div className='mainDiv'>
      {question.length ?
        showEnd == false ?
          <>
            {answerArray = [
              question[index].correct_answer
            ],
              question[index].incorrect_answers.map(answers => answerArray.push(answers)),
              sortedArray = answerArray.sort(sortArray),
              console.log(sortedArray)
            }
            <h1>ANSWER THE FOLLOWING QUESTIONS</h1>
            <p className='ques'>{question[index].question}</p>
            {sortedArray.map(
              answer => <>
                <span className='input'>
                  <input
                    type='radio'
                    name='quiz'
                    value={answer}
                    key={Math.random()}
                    onChange={event => {
                      if (event.target.checked) {
                        rpl = event.target.value
                      }
                    }
                    }
                  /> {answer}
                </span>
              </>
            )}
            <br /><br />
            <button onClick={() => {
              let correct = question[index].correct_answer
              reply.push(correct)
              answerGiven.push(rpl)
              if (rpl == question[index].correct_answer) {
                setScore(score + 1)
              }
              if (index == question.length - 1) {
                setShowEnd(true)
              } else {
                setIndex(index + 1)
              }
            }
            }>NEXT</button>
          </> :
          <>
            <h1>QUIZ ENDED</h1>
            <div className='d-md-flex'>
              <ol>
                {scoreCard.map((r, index) => <li className='answer'>{`Correct answer of question ${index + 1}: ${r}`}</li>)}
              </ol>
              <ol>
                {givenAnswer.map((r, index) => <li className='answer'>{`Given answer of question ${index + 1}: ${!r ? 'You did not answer' : r}`}</li>)}
              </ol>
            </div>
            <p className='score'>Your Score: {`${score} / 10`}</p>
          </>
        :
        <>
        </>}
    </div>
  )
}

export default App;