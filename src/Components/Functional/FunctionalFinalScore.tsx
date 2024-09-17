type FunctionalFinalScoreProps = {
  score: number;
};

export function FunctionalFinalScore({ score }: FunctionalFinalScoreProps) {
  return (
    <div id="final-score">
      <h2>Final Score: {score}</h2>
      <p>Thank you for playing!</p>
    </div>
  );
}
