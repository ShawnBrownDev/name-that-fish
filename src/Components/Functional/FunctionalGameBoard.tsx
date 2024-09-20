import React, { useState } from "react";
import "./styles/game-board.css";

interface Fish {
  name: string;
  url: string;
}

type FunctionalGameBoardProps = {
  updateScore: (points: number, isCorrect: boolean, currentFish: string) => void;
  currentFish: Fish;
};

export function FunctionalGameBoard({
  updateScore,
  currentFish,
}: FunctionalGameBoardProps) {
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState<null | string>(null);
  const [hasGuessed, setHasGuessed] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (hasGuessed) {
      return;
    }

    const isCorrect =
      guess.trim().toLowerCase() === currentFish.name.toLowerCase();

    if (isCorrect) {
      setFeedback("✅ Correct!");
      updateScore(1, true, currentFish.name);
    } else {
      setFeedback("🔻 Incorrect!");
      updateScore(0, false, currentFish.name);
    }

    setHasGuessed(true);
    setGuess("");

    setTimeout(() => {
      setFeedback(null);
      setHasGuessed(false); 
    }, 2000);
  };

  return (
    <div id="game-board">
      <div id="fish-container">
        <img src={currentFish.url} alt={currentFish.name} />
      </div>
      <form id="fish-guess-form" onSubmit={handleSubmit}>
        <label htmlFor="fish-guess">What kind of fish is this?</label>
        <input
          type="text"
          id="fish-guess"
          name="fish-guess"
          value={guess}
          onChange={handleInputChange}
          required

        />
        <input
          type="submit"
          value="Submit"
        />
      </form>
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
}
