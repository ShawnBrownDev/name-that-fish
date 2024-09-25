import { Component } from "react";

type FunctionalScoreBoardProps = {
  incorrectCount: number;
  correctCount: number;
  answersLeft: string[];
  score: number; 
};

export class FunctionalScoreBoard extends Component<FunctionalScoreBoardProps> {
  render() {
    const { incorrectCount, correctCount, answersLeft } = this.props;

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
  }
}