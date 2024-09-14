function QuizControls({ isQuizSubmitted, score, onSubmit, onPlayAgain }) {
    return (
      <div className="flex items-center mt-8 space-x-4">
        {isQuizSubmitted ? (
          <>
            <div className="text-2xl font-bold">
              You scored {score} out of {questions.length}
            </div>
            <button
              onClick={onPlayAgain}
              className="px-6 py-2 bg-indigo-900 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
            >
              Play Again
            </button>
          </>
        ) : (
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-indigo-900 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
          >
            Check Answers
          </button>
        )}
      </div>
    );
  }
  
  export default QuizControls;