import { useState } from "react";
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

export function ClassApp() {
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  
  const score = correctCount * pointsPerCorrectAnswer;
  
  const totalAnswered = correctCount + incorrectCount;
  const isGameOver = totalAnswered >= initialFishes.length;

  const answersLeft = initialFishes.slice(totalAnswered).map((fish: Fish) => fish.name);
  const currentFish = initialFishes[totalAnswered];


  const updateScore = (_points: number, isCorrect: boolean, fishName: string) => {
    console.log(`Guess made for: ${fishName}, Correct: ${isCorrect}`);

  if (isCorrect){
    setCorrectCount((prev: number) => prev + 1);
  } else {
    setIncorrectCount((prev: number) => prev + 1);
  }
};

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
             updateScore={updateScore}
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
   