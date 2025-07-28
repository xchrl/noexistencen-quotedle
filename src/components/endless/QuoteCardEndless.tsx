"use client";

import loadLocalStorage from "@/lib/loadLocalStorage";
import { ArrowDownIcon, ArrowRight } from "lucide-react";
import { useState } from "react";
import quotes from "@/data/quotes.json";
import type QuoteQuestion from "@/types/QuoteQuestion";
import { AnimatePresence, motion } from "framer-motion";
import uploadLocalStorage from "@/lib/uploadLocalStorage";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

import { QuoteCard } from "@/components/ui/QuoteCard";

type QuoteCardProps = {
  quote: QuoteQuestion;
  onNext: () => void;
  onAnswer: () => void;
  onIncorrect: () => void;
  number: number;
};

export default function QuoteCardEndless({
  quote,
  onNext,
  onAnswer,
  onIncorrect,
  number,
}: QuoteCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quoteFromRevealed, setQuoteFromRevealed] = useState<boolean>(false);

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
      const { endlessModeStats, endless } = loadLocalStorage();
      if (endlessModeStats) {
        const endlessModeData = JSON.parse(endlessModeStats);
        const streak = endlessModeData.streak;
        const personalBest = endlessModeData.personal_best;

        localStorage.setItem(
          "endless_mode_stats",
          JSON.stringify({
            total_guesses: parseInt(endlessModeData.total_guesses + 1),
            correct_guesses: correct
              ? endlessModeData.correct_guesses + 1
              : endlessModeData.correct_guesses,
            streak: correct ? endlessModeData.streak + 1 : 0,
            personal_best: correct
              ? streak >= personalBest
                ? endlessModeData.personal_best + 1
                : endlessModeData.personal_best
              : endlessModeData.personal_best,
          })
        );
      }

      if (endless) {
        const { correct_guesses, used_quotes: previousUsedQuotes } = endless;
        const previousQuoteData = endless.quote_data;

        localStorage.setItem(
          "endless",
          JSON.stringify({
            correct_guesses: (correct
              ? (parseInt(correct_guesses) + 1).toString()
              : parseInt(correct_guesses)
            ).toString(),
            quote_data: [
              ...previousQuoteData,
              {
                id: quote.id,
                answer: index,
                correct: correct,
              },
            ],
            used_quotes: [...previousUsedQuotes, quote.id],
            finished: !correct,
          })
        );
      }

      uploadLocalStorage();
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
    setQuoteFromRevealed(false);
    if (!isCorrect) {
      onIncorrect();
      return;
    }
    onNext();
  };

  return (
    <QuoteCard>
      <QuoteCard.Heading>Quote {number}</QuoteCard.Heading>
      <QuoteCard.QuoteArea>{quote.quote}</QuoteCard.QuoteArea>
      <Separator orientation="horizontal" />
      <QuoteCard.Answers>
        {quote.answers.map((answer, buttonIndex) => (
          <button
            className={`transition duration-150 rounded-lg py-3 px-4 font-semibold flex justify-center gap-2 relative border shadow-sm ${
              // Is the selected answer equal to this button?
              selectedAnswer === buttonIndex
                ? // Is this button the correct answer?
                  isCorrect
                  ? "bg-green-600 hover:scale-110 hover:cursor-pointer"
                  : "bg-red-400 hover:scale-110 hover:cursor-pointer"
                : // If the selected answer isn't equal to this button AND an answer has been selected,
                // is this button the correct answer?
                selectedAnswer != null && buttonIndex == quote.correctAnswer
                ? "bg-green-600"
                : "bg-secondary"
            } ${
              // Has an answer been selectedd?
              selectedAnswer === null
                ? "hover:scale-110 hover:cursor-pointer"
                : // Is the selected answer not equal to this button and it isn't the correct answer?
                selectedAnswer !== buttonIndex &&
                  buttonIndex !== quote.correctAnswer
                ? "text-muted-foreground"
                : ""
            }`}
            key={buttonIndex}
            onClick={() => {
              onAnswer();
              handleAnswer(buttonIndex);
            }}
            disabled={selectedAnswer !== null}
          >
            {answer}{" "}
            {selectedAnswer === buttonIndex ? (
              isCorrect ? (
                <Badge variant="correct">Correct</Badge>
              ) : (
                <Badge variant="incorrect">Incorrect</Badge>
              )
            ) : selectedAnswer != null && buttonIndex == quote.correctAnswer ? (
              <Badge variant="correct">Correct</Badge>
            ) : (
              ""
            )}
          </button>
        ))}
      </QuoteCard.Answers>
      <button
        className={`bg-secondary p-4 rounded-lg flex justify-center gap-4 transition duration-150 hover:scale-110 hover:cursor-pointer ${
          selectedAnswer === null ? "hidden" : ""
        } ${isCorrect ? "hover:bg-green-600" : "hover:bg-red-400"}`}
        onClick={handleNext}
      >
        Next <ArrowRight />
      </button>
      <button
        className={`${
          selectedAnswer === null ? "hidden" : ""
        } bg-accent/30 border border-accent/60 p-3 rounded-lg hover:bg-accent/50 hover:border-accent/80 duration-150 hover:cursor-pointer`}
        onClick={() => setQuoteFromRevealed(!quoteFromRevealed)}
      >
        <p className="flex justify-between gap-4">
          Where is this quote from?{" "}
          <ArrowDownIcon
            className={`transform transition-transform duration-300 ${
              quoteFromRevealed ? "rotate-180" : ""
            }`}
          />
        </p>

        <AnimatePresence>
          {quoteFromRevealed && (
            <motion.div
              layout
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-left">{quote.from}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </QuoteCard>
  );
}
