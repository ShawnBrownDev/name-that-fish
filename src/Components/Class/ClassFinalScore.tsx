import "./styles/final-score.css";

type ClassFinalScoreProps = {
  correctCount: number;
  totalCount: number;
};

export const ClassFinalScore = ({ correctCount, totalCount }: ClassFinalScoreProps) => (
  <div id="final-score">
    <h1>Your Final Score Was</h1>
    <div id="score">
      <p>{correctCount}</p>
      <hr />
      <p>{totalCount}</p>
    </div>
  </div>
);
