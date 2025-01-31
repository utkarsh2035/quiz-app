import React from "react";

const shuffleOptions = (correct, incorrect) => {
  const options = [...incorrect, correct];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
};

const Question = ({ question, handleAnswer, index, total }) => {
  const options = shuffleOptions(question.correct_answer, question.incorrect_answers);

  return (
    <div className="question-container">
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
      <div className="options">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option === question.correct_answer)}
            className="option-button"
            dangerouslySetInnerHTML={{ __html: option }}
          />
        ))}
      </div>
      <p>Question {index + 1} of {total}</p>
    </div>
  );
};

export default Question;