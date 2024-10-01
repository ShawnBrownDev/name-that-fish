import { Component } from "react";
import { ClassGameBoard } from "./ClassGameBoard";
import { ClassScoreBoard } from "./ClassScoreBoard";
import { ClassFinalScore } from "./ClassFinalScore";
import { Images } from "../../assets/Images";

interface Fish {
  name: string;
  url: string;
}

const initialFishes: Fish[] = [
  { name: "trout", url: Images.trout },
  { name: "salmon", url: Images.salmon },
  { name: "tuna", url: Images.tuna },
  { name: "shark", url: Images.shark },
];

const pointsPerCorrectAnswer = 1;

interface ClassAppState {
  incorrectCount: number;
  correctCount: number;
}

export class ClassApp extends Component<Record<string, never>, ClassAppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      incorrectCount: 0,
      correctCount: 0,
    };
  }

  getScore = () => {
    return this.state.correctCount * pointsPerCorrectAnswer;
  };

  getTotalAnswered = () => {
    return this.state.correctCount + this.state.incorrectCount;
  };

  getAnswersLeft = () => {
    return initialFishes.slice(this.getTotalAnswered()).map((fish: Fish) => fish.name);
  };

  updateScore = (_points: number, isCorrect: boolean, fishName: string) => {
    console.log(`Guess made for: ${fishName}, Correct: ${isCorrect}`);
    
    if (isCorrect) {
      this.setState((prevState) => ({
        correctCount: prevState.correctCount + 1,
      }));
    } else {
      this.setState((prevState) => ({
        incorrectCount: prevState.incorrectCount + 1,
      }));
    }
  };

  render() {
    const { incorrectCount, correctCount } = this.state;
    const totalAnswered = this.getTotalAnswered();
    const isGameOver = totalAnswered >= initialFishes.length;
    const answersLeft = this.getAnswersLeft();
    const currentFish = initialFishes[totalAnswered];
    const score = this.getScore();

    return (
      <>
        <ClassScoreBoard
          incorrectCount={incorrectCount}
          correctCount={correctCount}
          answersLeft={answersLeft}
          score={score}
        />
        {!isGameOver && currentFish && (
          <ClassGameBoard
            updateScore={this.updateScore}
            currentFish={currentFish}
          />
        )}
        {isGameOver && (
          <ClassFinalScore
            correctCount={correctCount}
            totalCount={correctCount + incorrectCount}
          />
        )}
      </>
    );
  }
}

