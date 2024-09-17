import React, { Component } from "react";
import "./styles/game-board.css";
import { Images } from "../../assets/Images";

const initialFishes = [
  { name: "trout", url: Images.trout },
  { name: "salmon", url: Images.salmon },
  { name: "tuna", url: Images.tuna },
  { name: "shark", url: Images.shark },
];

interface ClassGameBoardProps {
  updateScore: (points: number, isCorrect: boolean, currentFish: string) => void;
  handleGameOver: () => void;
}

interface ClassGameBoardState {
  guess: string;
  currentFishIndex: number;
}

export class ClassGameBoard extends Component<ClassGameBoardProps, ClassGameBoardState> {
  constructor(props: ClassGameBoardProps) {
    super(props);
    this.state = {
      guess: "",
      currentFishIndex: 0,
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ guess: event.target.value });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { guess, currentFishIndex } = this.state;
    const { updateScore, handleGameOver } = this.props;
    const nextFishToName = initialFishes[currentFishIndex];

    if (guess.toLowerCase() === nextFishToName.name.toLowerCase()) {
      alert("Correct!");
      updateScore(1, true, nextFishToName.name);
      if (currentFishIndex + 1 < initialFishes.length) {
        this.setState({ currentFishIndex: currentFishIndex + 1 });
      } else {
        handleGameOver();
      }
    } else {
      alert("Try again!");
      updateScore(0, false, nextFishToName.name);
    }

    this.setState({ guess: "" });
  };

  render() {
    const { guess, currentFishIndex } = this.state;
    const nextFishToName = initialFishes[currentFishIndex];

    return (
      <div id="game-board">
        <div id="fish-container">
          <img src={nextFishToName.url} alt={nextFishToName.name} />
        </div>
        <form id="fish-guess-form" onSubmit={this.handleSubmit}>
          <label htmlFor="fish-guess">What kind of fish is this?</label>
          <input
            type="text"
            name="fish-guess"
            value={guess}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
