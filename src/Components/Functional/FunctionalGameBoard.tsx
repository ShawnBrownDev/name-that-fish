import React, { useState } from "react";
import "./styles/game-board.css";
import { Images } from "../../assets/Images";

const initialFishes = [
  { name: "trout", url: Images.trout },
  { name: "salmon", url: Images.salmon },
  { name: "tuna", url: Images.tuna },
  { name: "shark", url: Images.shark },
];

type FunctionalGameBoardProps = {
  updateScore: (points: number, isCorrect: boolean, currentFish: string) => void;
  handleGameOver: () => void;
};

export function FunctionalGameBoard({ updateScore, handleGameOver }: FunctionalGameBoardProps) {
  const [guess, setGuess] = useState("");
  const [currentFishIndex, setCurrentFishIndex] = useState(0);
  const nextFishToName = initialFishes[currentFishIndex];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (guess.toLowerCase() === nextFishToName.name.toLowerCase()) {
      alert("Correct!");
      updateScore(1, true, nextFishToName.name);
      if (currentFishIndex + 1 < initialFishes.length) {
        setCurrentFishIndex((prevIndex) => prevIndex + 1);
      } else {
        handleGameOver();
      }
    } else {
      alert("Try again!");
      updateScore(0, false, nextFishToName.name);
    }
    setGuess("");
  };

  return (
    <div id="game-board">
      <div id="fish-container">
        <img src={nextFishToName.url} alt={nextFishToName.name} />
      </div>
      <form id="fish-guess-form" onSubmit={handleSubmit}>
        <label htmlFor="fish-guess">What kind of fish is this?</label>
        <input
          type="text"
          name="fish-guess"
          value={guess}
          onChange={handleInputChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
