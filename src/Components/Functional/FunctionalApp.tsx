import { useReducer, useEffect } from "react";
import { FunctionalGameBoard } from "./FunctionalGameBoard";
import { FunctionalScoreBoard } from "./FunctionalScoreBoard";
import { FunctionalFinalScore } from "./FunctionalFinalScore";
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

interface GameState {
  score: number;
  isGameOver: boolean;
  incorrectCount: number;
  correctCount: number;
  currentFishIndex: number;
  answersLeft: string[];
}

type Action =
  | { type: "CORRECT_ANSWER"; points: number; fishName: string }
  | { type: "INCORRECT_ANSWER"; fishName: string }
  | { type: "END_GAME" };

const initialState: GameState = {
  score: 0,
  isGameOver: false,
  incorrectCount: 0,
  correctCount: 0,
  currentFishIndex: 0,
  answersLeft: initialFishes.map((fish) => fish.name),
};

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "CORRECT_ANSWER":
      return {
        ...state,
        score: state.score + action.points,
        correctCount: state.correctCount + 1,
        answersLeft: state.answersLeft.filter(
          (answer) => answer !== action.fishName
        ),
        currentFishIndex: state.currentFishIndex + 1,
        isGameOver: state.currentFishIndex + 1 >= initialFishes.length,
      };
    case "INCORRECT_ANSWER":
      return {
        ...state,
        incorrectCount: state.incorrectCount + 1,
        answersLeft: state.answersLeft.filter(
          (answer) => answer !== action.fishName
        ),
        currentFishIndex: state.currentFishIndex + 1,
        isGameOver: state.currentFishIndex + 1 >= initialFishes.length,
      };
    case "END_GAME":
      return {
        ...state,
        isGameOver: true,
      };
    default:
      return state;
  }
}

export function FunctionalApp() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const currentFish = initialFishes[state.currentFishIndex];

  const updateScore = (
    points: number,
    isCorrect: boolean,
    currentFishName: string
  ) => {
    if (isCorrect) {
      dispatch({
        type: "CORRECT_ANSWER",
        points,
        fishName: currentFishName,
      });
    } else {
      dispatch({
        type: "INCORRECT_ANSWER",
        fishName: currentFishName,
      });
    }

    if (state.currentFishIndex + 1 >= initialFishes.length) {
      dispatch({ type: "END_GAME" });
    }
  };

  useEffect(() => {
    if (state.isGameOver) {
      setTimeout(() => {
        const finalScoreContainer = document.getElementById("final-score");
        if (finalScoreContainer) {
          const scoreParagraph = finalScoreContainer.querySelector("#score p:first-child");
          const totalParagraph = finalScoreContainer.querySelector("#score p:last-child");
          if (scoreParagraph && totalParagraph) {
            scoreParagraph.textContent = `${state.correctCount}`;
            totalParagraph.textContent = `${state.score}`;
          }
        }
      }, 0);
    }
  }, [state.isGameOver, state.correctCount, state.score]);

  return (
    <>
      <FunctionalScoreBoard
        incorrectCount={state.incorrectCount}
        correctCount={state.correctCount}
        answersLeft={state.answersLeft}
      />
      {!state.isGameOver && currentFish && (
        <FunctionalGameBoard
          updateScore={updateScore}
          currentFish={currentFish}
        />
      )}
      {state.isGameOver && <FunctionalFinalScore />}
    </>
  );
}
