import React from "react";

const Result = ({ score, total }) => {
  return (
    <div className="result-container">
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} / {total}</p>
      <button
        onClick={() => window.location.reload()}
        className="restart-button"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Result;