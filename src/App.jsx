import React, { useState, useEffect } from 'react';
import './App.css'
import QuestionList from './components/QuestionList';
import QuizControls from './components/QuizControls';
import axios from 'axios';

const fetchQuestions = async () => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple');
    return response.data.results.map((question) => ({
      question: question.question,
      correct_answer: question.correct_answer,
      all_answers: shuffleAnswers([question.correct_answer, ...question.incorrect_answers]),
    }));
  } catch (error) {
    throw new Error('Failed to fetch questions');
  }
};

const shuffleAnswers = (answers) => {
  return answers.sort(() => Math.random() - 0.5);
};

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-indigo-700 border-solid rounded-full border-t-transparent animate-spin"></div>
  </div>
);

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartQuiz = async () => {
    setLoading(true);
    try {
      const questions = await fetchQuestions();
      setQuestions(questions);
      setQuizStarted(true);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const handlePlayAgain = () => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
    setScore(0);
    setQuizStarted(false);
  };
  if (loading) {
    return (
      <Loader />
    );
  }

  if (!quizStarted) {
    return (
      <div className="relative">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40 rounded-bl-full bg-lightyellow absolute top-0 right-0"></div>
      <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-indigo-900 font-bold text-2xl p-3">Quizzical</h1>
      <p  className="text-indigo-900 text-xl pb-3 ">Test your knowledges here</p>
        <button
          onClick={handleStartQuiz}
          className="px-12 py-3 bg-indigo-700 text-white rounded-xl hover:bg-indigo-900 transition-colors duration-200"
        >
          Start Quiz
        </button>
      </div>
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40 rounded-tr-full bg-lightblue absolute bottom-0 left-0"></div>
    </div>
    );
  }



 
  return (
    <div className="relative">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40 rounded-bl-full bg-lightyellow absolute top-0 right-0"></div>
      <div className="flex flex-col justify-center pt-8 items-center text-black text-xl">
        <div className="flex">
          <div className="flex flex-col space-y-6">
            {Array.isArray(questions) && questions.length > 0 ? (
              <>
                {questions.map((q, questionIndex) => (
                  <div key={questionIndex} className="flex flex-col items-start border-b pb-6 mb-6">
                    <h2 className="mb-4" dangerouslySetInnerHTML={{ __html: q.question }} />
                    <div className="flex flex-wrap gap-4">
                      {q.all_answers.map((answer, answerIndex) => {
                        const isCorrect = isQuizSubmitted && answer === q.correct_answer;
                        const isIncorrect =
                          isQuizSubmitted && selectedAnswers[questionIndex] === answer && answer !== q.correct_answer;

                        return (
                          <label
                            key={answerIndex}
                            htmlFor={`answer-${questionIndex}-${answerIndex}`}
                            className={`flex items-center justify-center cursor-pointer w-auto px-6 py-2 rounded-full border border-indigo-900 text-lg
                              ${isCorrect
                                ? 'bg-green-500 text-white'
                                : isIncorrect
                                ? 'bg-red-500 text-white'
                                : selectedAnswers[questionIndex] === answer
                                ? 'bg-bgAnswer text-indigo-900 border-transparent'
                                : 'bg-white text-black'} transition-colors duration-200`}
                          >
                            <input
                              type="radio"
                              name={questionIndex}
                              value={answer}
                              id={`answer-${questionIndex}-${answerIndex}`}
                              onChange={(e) => setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: e.target.value }))}
                              checked={selectedAnswers[questionIndex] === answer}
                              className="opacity-0 absolute"
                            />
                            {answer}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div className="flex justify-center mt-8">

                {isQuizSubmitted && (
                  <div className="text-xl mt-6 font-bold px-6 py-2">
                   You scored {score}/5 correct answers
                  </div>
                )}
                {!isQuizSubmitted ? (
    <button
      onClick={handleSubmitQuiz}
      className="mt-6 px-6 py-2 bg-indigo-900 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
    >
      Check Answers
    </button>
  ) : (
    <button
      onClick={handlePlayAgain}
      className="mt-8 px-6 py-2 bg-indigo-900 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
    >
      Play Again
    </button>
  )}
                </div>
              </>
            ) : (
              <p>No questions available.</p>
            )}
          </div>
        </div>
      </div>
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-40 md:h-40 rounded-tr-full bg-lightblue absolute bottom-0 left-0"></div>
    </div>
  );
}

export default App;

