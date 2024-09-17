import { Component } from "react";

interface ClassFinalScoreProps {
  score: number;
}

export class ClassFinalScore extends Component<ClassFinalScoreProps> {
  render() {
    const { score } = this.props;

    return (
      <div id="final-score">
        <h2>Final Score: {score}</h2>
        <p>Thank you for playing!</p>
      </div>
    );
  }
}
