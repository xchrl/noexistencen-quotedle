"use client";

import loadLocalStorage from "@/lib/loadLocalStorage";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import quotes from "@/data/quotes.json";
import type QuoteQuestion from "@/types/QuoteQuestion";

type QuoteCardProps = {
  quote: QuoteQuestion;
  onNext: () => void;
  onAnswer: () => void;
  number: number;
};

export default function QuoteCard({
  quote,
  onNext,
  onAnswer,
  number,
}: QuoteCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    const foundQuote = quotes.find((q) => q.id === quote.id);
    if (!foundQuote) {
      console.error("Didn't find quote with id ", quote.id);
      return;
    }
    const correct = foundQuote.correctAnswer == index;
    setIsCorrect(correct);

    // Upon answer, save data to localStorage
    try {
      const { dailyModeStats } = loadLocalStorage();
      if (dailyModeStats) {
        const dailyModeData = JSON.parse(dailyModeStats);
        const streak = dailyModeData.streak;
        const personalBest = dailyModeData.personal_best;

        localStorage.setItem(
          "daily_mode_stats",
          JSON.stringify({
            total_guesses: parseInt(dailyModeData.total_guesses + 1),
            correct_guesses: correct
              ? dailyModeData.correct_guesses + 1
              : dailyModeData.correct_guesses,
            streak: correct ? dailyModeData.streak + 1 : 0,
            personal_best: correct
              ? streak >= personalBest
                ? dailyModeData.personal_best + 1
                : dailyModeData.personal_best
              : dailyModeData.personal_best,
          })
        );
      }
      const today = localStorage.getItem("today");
      if (today == "null" || today == null) {
        localStorage.setItem("today", "{}");
      } else {
        const { guesses, correct_guesses, date } = JSON.parse(today);
        const todayDate = "2025-07-26";

        localStorage.setItem(
          "today",
          JSON.stringify({
            guesses: date == todayDate ? (parseInt(guesses) + 1).toString() : 0,
            correct_guesses: (date == todayDate
              ? correct
                ? (parseInt(correct_guesses) + 1).toString()
                : parseInt(correct_guesses)
              : 0
            ).toString(),
            date: date,
          })
        );
      }
    } catch (err) {
      console.error(
        "An error occured while writing your data to localStorage: ",
        err
      );
    } finally {
      window.dispatchEvent(new Event("localStorageUpdated"));
    }
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
                ? "hover:scale-110 hover:cursor-pointer"
                : // Is the selected answer not equal to this button?
                selectedAnswer !== index
                ? "text-muted-foreground"
                : ""
            }`}
            key={index}
            onClick={() => {
              onAnswer();
              handleAnswer(index);
            }}
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
