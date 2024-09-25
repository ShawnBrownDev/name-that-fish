import "./styles/final-score.css";

type FunctionalFinalScoreProps = {
  correctCount: number;
  totalCount: number;
};

export const FunctionalFinalScore = ({ correctCount, totalCount }: FunctionalFinalScoreProps) => (
  <div id="final-score">
    <h1>Your Final Score Was</h1>
    <div id="score">
      <p>{correctCount}</p>
      <hr />
      <p>{totalCount}</p>
    </div>
  </div>
);
