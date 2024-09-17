import { Component } from "react";
import { ClassGameBoard } from "./ClassGameBoard";
import { ClassScoreBoard } from "./ClassScoreBoard";
import { ClassFinalScore } from "./ClassFinalScore";

interface ClassAppState {
  score: number;
  isGameOver: boolean;
  incorrectCount: number;
  correctCount: number;
  answersLeft: string[];
}

export class ClassApp extends Component<Record<string, never>, ClassAppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      score: 0,
      isGameOver: false,
      incorrectCount: 0,
      correctCount: 0,
      answersLeft: ["trout", "salmon", "tuna", "shark"],
    };
  }

  updateScore = (points: number, isCorrect: boolean, currentFish: string) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        score: prevState.score + points,
        incorrectCount: isCorrect ? prevState.incorrectCount : prevState.incorrectCount + 1,
        correctCount: isCorrect ? prevState.correctCount + 1 : prevState.correctCount,
        answersLeft: isCorrect
          ? prevState.answersLeft.filter((answer) => answer !== currentFish)
          : prevState.answersLeft,
      };
    });
  };

  handleGameOver = () => {
    this.setState({ isGameOver: true });
  };

  render() {
    const { score, isGameOver, incorrectCount, correctCount, answersLeft } = this.state;

    return (
      <>
        <ClassScoreBoard
          incorrectCount={incorrectCount}
          correctCount={correctCount}
          answersLeft={answersLeft}
        />
        {!isGameOver && (
          <ClassGameBoard
            updateScore={this.updateScore}
            handleGameOver={this.handleGameOver}
          />
        )}
        {isGameOver && <ClassFinalScore score={score} />}
      </>
    );
  }
}
