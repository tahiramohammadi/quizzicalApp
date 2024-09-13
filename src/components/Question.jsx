
import React, { useState, useEffect } from 'react';
import {debounce} from 'lodash'
function Question() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading]= useState(true)
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch 5 multiple choice questions from Open Trivia DB
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple');
        if (response.status === 429) {
          console.log('Too many requests. Please wait.');
          // Retry after a delay of 5 seconds
          setTimeout(fetchQuestions, 5000);  // Wait for 5 seconds before retrying
        } else if (response.ok) {
          const data = await response.json();
          const formattedQuestions = data.results.map((question) => ({
            question: question.question,
            correct_answer: question.correct_answer,
            all_answers: shuffleAnswers([question.correct_answer, ...question.incorrect_answers]),
          }));
          setQuestions(formattedQuestions);
        } else {
          console.error('Failed to fetch questions');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchQuestions();
  }, []);
  // Shuffle the answers so they appear in random order
  const shuffleAnswers = (answers) => {
    return answers.sort(() => Math.random() - 0.5);
  };

  // Handle selecting an answer
  const handleAnswerSelect = (e) => {
    const { name, value } = event.target;
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [name]: value,
    }));
  };

 

  // Handle submitting the quiz
  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        correctAnswers += 1;
      }
    });
    setScore(correctAnswers);
    setIsQuizSubmitted(true);
  };

  // If no questions loaded, show loading
  if (loading) {
    return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-indigo-700 border-solid rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
  }

  if (isQuizSubmitted) {
    return (
      <div className="quiz-results p-5">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <h3 dangerouslySetInnerHTML={{ __html: question.question }} />
            <p className={`font-bold ${selectedAnswers[index] === question.correct_answer ? 'text-green-500' : 'text-red-500'}`}>
              Your Answer: {selectedAnswers[index]}
            </p>
            <p className="font-bold text-green-500">
              Correct Answer: {question.correct_answer}
            </p>
          </div>
        ))}
        <h3 className="text-xl font-bold mt-6">
          You scored {score} out of {questions.length}
        </h3>
      </div>
    );
  }

 
  return (
    <div className="relative h-screen">
    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40 rounded-bl-full bg-lightyellow absolute top-0 right-0">
    </div>
    <div className="flex flex-col justify-center pt-8  items-center text-black  text-xl">
    <div className="flex  ">
        <div className="flex flex-col space-y-6 ">
      {questions.length > 0 ? (
        <>
          {questions.map((q, questionIndex) => (
            <div key={questionIndex} className="flex flex-col items-start ">
              <h2 className="mb-4" dangerouslySetInnerHTML={{ __html: q.question }} />
              <div className="flex flex-wrap gap-4">
                {q.all_answers.map((answer, answerIndex) => (
                  <label
                    key={answerIndex}
                    htmlFor={`answer-${questionIndex}-${answerIndex}`}
                    className={`flex items-center justify-center cursor-pointer w-auto px-6 py-2 rounded-full border border-indigo-900 text-lg ${
                      selectedAnswers[questionIndex] === answer
                        ? 'bg-bgAnswer text-indigo-900 border-transparent'
                        : 'bg-white text-black'
                    } transition-colors duration-200`}
                  >
                    <input
                      type="radio"
                      name={questionIndex}
                      value={answer}
                      id={`answer-${questionIndex}-${answerIndex}`}
                      onChange={handleAnswerSelect}
                      checked={selectedAnswers[questionIndex] === answer}
                      className="opacity-0 absolute"
                    />
                    {answer}
                  </label>
                ))}
              </div>
            </div>
          ))}
             <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmitQuiz}
            className="mt-8 px-6 py-2  bg-indigo-900 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
          >
            Check Answers
          </button>
          </div>
        </>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
    </div>
    </div>
    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40 rounded-tr-full  bg-lightblue absolute bottom-0 left-0">
          </div>
         </div>
  );
};

export default Question;

