"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

type QuoteQuestion = {
  id: number;
  quote: string;
  answers: string[];
  correctAnswer: number;
};

type QuoteCardProps = {
  quote: QuoteQuestion;
  onNext: () => void;
  number: number;
};

export default function QuoteCard({ quote, onNext, number }: QuoteCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = async (index: number) => {
    setSelectedAnswer(index);
    await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quoteId: quote.id,
        selectedAnswer: index,
      }),
    })
      .then((res) => res.json())
      .then(({ correct }) => {
        setIsCorrect(correct);
        try {
          const totalGuesses = localStorage.getItem("total_guesses");
          if (totalGuesses == "null" || totalGuesses == null) {
            localStorage.setItem("total_guesses", "0");
          } else
            localStorage.setItem(
              "total_guesses",
              (parseInt(totalGuesses) + 1).toString()
            );

          const correctGueses = localStorage.getItem("correct_guesses");
          if (correctGueses == "null" || correctGueses == null) {
            localStorage.setItem("correct_guesses", "0");
          } else {
            console.log("reached", isCorrect);
            correct
              ? localStorage.setItem(
                  "correct_guesses",
                  (parseInt(correctGueses) + 1).toString()
                )
              : "";
          }

          let correctStreak = localStorage.getItem("streak");
          if (correctStreak == "null" || correctStreak == null) {
            localStorage.setItem("streak", "0");
          } else {
            correct
              ? localStorage.setItem(
                  "streak",
                  (parseInt(correctStreak) + 1).toString()
                )
              : localStorage.setItem("streak", "0");
          }

          const personalBest = localStorage.getItem("personal_best");
          if (personalBest == "null" || personalBest == null) {
            localStorage.setItem("personal_best", "0");
          } else {
            if (correctStreak == "null" || correctStreak == null)
              correctStreak = "0";
            const pbNumber = parseInt(personalBest);
            const streakNumber = parseInt(correctStreak);
            console.log(streakNumber, pbNumber, streakNumber > pbNumber);
            correct
              ? streakNumber >= pbNumber
                ? localStorage.setItem(
                    "personal_best",
                    (streakNumber + 1).toString()
                  )
                : ""
              : "";
          }
        } catch (err) {
          console.error(
            "An error occured while writing your data to localStorage: ",
            err
          );
        } finally {
          window.dispatchEvent(new Event("localStorageUpdated"));
        }
      });
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    onNext();
  };

  return (
    <div className="bg-background/80 border border-red-400 rounded-xl shadow-lg p-8 w-full flex flex-col gap-6">
      {/* Heading */}
      <h2 className="text-xl font-bold text-center">Quote {number} / 5</h2>
      {/* Quote area */}
      <div className="bg-secondary/90 rounded-lg p-6 text-xl text-center font-medium border border-neutral-700 mb-2">
        {quote.quote}
      </div>
      {/* Options grid */}
      <div className="grid grid-cols-1 gap-4">
        {quote.answers.map((answer, index) => (
          <button
            className={`transition duration-150 rounded-lg py-3 px-4 font-semibold ${
              // Is the selected answer equal to this button?
              selectedAnswer === index
                ? // Is this button the correct answer?
                  isCorrect
                  ? "bg-green-600 hover:scale-110 hover:cursor-pointer"
                  : "bg-red-400 hover:scale-110 hover:cursor-pointer"
                : "bg-secondary"
            } ${
              // Has an answer been selectedd?
              selectedAnswer === null
                ? "hover:scale-110 hover:cursor-pointer hover:bg-red-400"
                : // Is the selected answer not equal to this button?
                selectedAnswer !== index
                ? "text-muted-foreground"
                : ""
            }`}
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
          >
            {answer}
          </button>
        ))}
      </div>
      <button
        className={`bg-secondary p-4 rounded-lg flex justify-center gap-4 transition duration-150 hover:scale-110 hover:cursor-pointer ${
          selectedAnswer === null ? "hidden" : ""
        } ${isCorrect ? "hover:bg-green-600" : "hover:bg-red-400"}`}
        onClick={handleNext}
      >
        Next <ArrowRight />
      </button>
    </div>
  );
}
