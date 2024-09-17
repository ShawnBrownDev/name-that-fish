import { useState } from "react";
import { FunctionalGameBoard } from "./FunctionalGameBoard";
import { FunctionalScoreBoard } from "./FunctionalScoreBoard";
import { FunctionalFinalScore } from "./FunctionalFinalScore";

export function FunctionalApp() {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answersLeft, setAnswersLeft] = useState(["trout", "salmon", "tuna", "shark"]);

  const updateScore = (points: number, isCorrect: boolean, currentFish: string) => {
    setScore((prevScore) => prevScore + points);

    if (isCorrect) {
      setCorrectCount((prevCount) => prevCount + 1);
      setAnswersLeft((prevAnswers) => prevAnswers.filter((answer) => answer !== currentFish));
    } else {
      setIncorrectCount((prevCount) => prevCount + 1);
    }
  };

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  return (
    <>
      <FunctionalScoreBoard
        incorrectCount={incorrectCount}
        correctCount={correctCount}
        answersLeft={answersLeft}
      />
      {!isGameOver && (
        <FunctionalGameBoard
          updateScore={updateScore}
          handleGameOver={handleGameOver}
        />
      )}
      {isGameOver && <FunctionalFinalScore score={score} />}
    </>
  );
}
