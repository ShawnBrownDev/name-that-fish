import { Component } from "react";
import "./styles/game-board.css";

interface Fish {
  name: string;
  url: string;
}

type ClassGameBoardProps = {
  updateScore: (points: number, isCorrect: boolean, currentFish: string) => void;
  currentFish: Fish;
};

type ClassGameBoardState = {
  guess: string;
  feedback: null | string;
  hasGuessed: boolean;
};

export class ClassGameBoard extends Component<ClassGameBoardProps, ClassGameBoardState> {
  constructor(props: ClassGameBoardProps) {
    super(props);
    this.state = {
      guess: "",
      feedback: null,
      hasGuessed: false,
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ guess: event.target.value });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.state.hasGuessed) {
      return;
    }

    const isCorrect =
      this.state.guess.trim().toLowerCase() === this.props.currentFish.name.toLowerCase();

    if (isCorrect) {
      this.setState({ feedback: "✅ Correct!" });
      this.props.updateScore(1, true, this.props.currentFish.name);
    } else {
      this.setState({ feedback: "🔻 Incorrect!" });
      this.props.updateScore(0, false, this.props.currentFish.name);
    }

    this.setState({ hasGuessed: true, guess: "" });

    setTimeout(() => {
      this.setState({ feedback: null, hasGuessed: false });
    }, 2000);
  };

  render() {
    const { currentFish } = this.props;
    const { guess, feedback } = this.state;

    return (
      <div id="game-board">
        <div id="fish-container">
          <img src={currentFish.url} alt={currentFish.name} />
        </div>
        <form id="fish-guess-form" onSubmit={this.handleSubmit}>
          <label htmlFor="fish-guess">What kind of fish is this?</label>
          <input
            type="text"
            id="fish-guess"
            name="fish-guess"
            value={guess}
            onChange={this.handleInputChange}
            required
          />
          <input type="submit" value="Submit" />
        </form>
        {feedback && <div className="feedback">{feedback}</div>}
      </div>
    );
  }
}
