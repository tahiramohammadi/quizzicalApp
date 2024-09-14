
import React, { useState, useEffect } from 'react';

function QuestionList({ questions, selectedAnswers, isQuizSubmitted, onAnswerSelect }) {
  return (
    <div className="flex">
      <div className="flex flex-col space-y-6">
        {questions.map((q, questionIndex) => (
          <QuestionItem
            key={questionIndex}
            question={q}
            questionIndex={questionIndex}
            selectedAnswer={selectedAnswers[questionIndex]}
            isQuizSubmitted={isQuizSubmitted}
            onAnswerSelect={onAnswerSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionList;

