import React, { useState } from "react";
import useFetchQuiz from "../hooks/useFetchQuiz";
import Question from "./Question";
import Result from "./Result";

const Quiz = () => {
  const { questions, loading, error } = useFetchQuiz();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 10);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="quiz-container">
      {!completed ? (
        <Question
          question={questions[currentIndex]}
          handleAnswer={handleAnswer}
          index={currentIndex}
          total={questions.length}
        />
      ) : (
        <Result score={score} total={questions.length * 10} />
      )}
    </div>
  );
};

export default Quiz;
