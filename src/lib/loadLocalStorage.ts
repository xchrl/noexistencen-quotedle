export default function loadLocalStorage() {
  let totalGuesses, correctGueses, correctStreak, personalBest;
  totalGuesses = localStorage.getItem("total_guesses");
  if (totalGuesses == "null" || totalGuesses == null) totalGuesses = 0;
  else totalGuesses = parseInt(totalGuesses);

  correctGueses = localStorage.getItem("correct_guesses");
  if (correctGueses == "null" || correctGueses == null) {
    correctGueses = 0;
  } else correctGueses = parseInt(correctGueses);

  correctStreak = localStorage.getItem("streak");
  if (correctStreak == "null" || correctStreak == null) {
    correctStreak = 0;
  } else correctStreak = parseInt(correctStreak);

  personalBest = localStorage.getItem("personal_best");
  if (personalBest == "null" || personalBest == null) {
    personalBest = 0;
  } else personalBest = parseInt(personalBest);

  return {
    totalGuesses: totalGuesses,
    correctGueses: correctGueses,
    streak: correctStreak,
    personalBest: personalBest,
  };
}
