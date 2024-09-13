import React, { useState, useEffect } from 'react';
import './App.css'
import Quiz from './components/Quiz'
import { debounce } from 'lodash';
import Question from './components/Question'

function App() {

  const [isStart, setIsStart] = useState(true);
  const handleClick=()=>{
    console.log("you clicked")
    setIsStart(!isStart);
  }

  return (
    <>
   {isStart ? (
            <Quiz handleClick={handleClick}/> ) 
        : 
        ( 
          <Question />
        )}

     
   
    </>
  )
}

export default App
