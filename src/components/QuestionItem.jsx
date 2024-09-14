import { useState } from 'react'
  
function QuestionItem({ question, questionIndex, selectedAnswer, isQuizSubmitted, onAnswerSelect }) {
  return (
    <div className="flex flex-col items-start border-b pb-6 mb-6">
      <h2 className="mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />
      <div className="flex flex-wrap gap-4">
        {question.all_answers.map((answer, answerIndex) => {
          const isCorrect = isQuizSubmitted && answer === question.correct_answer;
          const isIncorrect = isQuizSubmitted && selectedAnswer === answer && answer !== question.correct_answer;

          return (
            <label
              key={answerIndex}
              htmlFor={`answer-${questionIndex}-${answerIndex}`}
              className={`flex items-center justify-center cursor-pointer w-auto px-6 py-2 rounded-full border border-indigo-900 text-lg
                ${isCorrect
                  ? 'bg-green-500 text-white'
                  : isIncorrect
                  ? 'bg-red-500 text-white'
                  : selectedAnswer === answer
                  ? 'bg-bgAnswer text-indigo-900 border-transparent'
                  : 'bg-white text-black'
                }`}
            >
              <input
                type="radio"
                name={questionIndex}
                value={answer}
                id={`answer-${questionIndex}-${answerIndex}`}
                onChange={() => onAnswerSelect(questionIndex, answer)}
                checked={selectedAnswer === answer}
                className="opacity-0 absolute"
              />
              {answer}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionItem;

