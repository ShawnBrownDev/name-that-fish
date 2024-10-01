import React from "react";

type FunctionalScoreBoardProps = {
  incorrectCount: number;
  correctCount: number;
  answersLeft: string[];
  score: number;
};

const FunctionalScoreBoard: React.FC<FunctionalScoreBoardProps> = ({ incorrectCount, correctCount, answersLeft }) => {
  return (
    <div id="score-board">
      <div>Incorrect 🔻: {incorrectCount}</div>
      <div id="choices-left">
        {answersLeft.map((answer) => (
          <div key={answer} className="choice">
            {answer}
          </div>
        ))}
      </div>
      <div>Correct ✅: {correctCount}</div>
    </div>
  );
};

export default FunctionalScoreBoard; 
