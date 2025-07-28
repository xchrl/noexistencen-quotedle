"use client";

import quotes from "@/data/quotes.json";
import { useState, useEffect } from "react";
import type QuoteQuestion from "@/types/QuoteQuestion";

import QuoteCardEndless from "@/components/endless/QuoteCardEndless";
import InfoCardEndless from "@/components/endless/InfoCardEndless";
import FinishedCardEndless from "@/components/endless/FinishedCardEndless";
import PageSkeleton from "@/components/PageSkeleton";

function loadEndlessProgress() {
  const saved = localStorage.getItem("endless");

  if (!saved || saved == "null")
    return {
      correctQuotes: 0,
      usedQuotes: [],
      finished: false,
    };

  const { correct_guesses, used_quotes, finished } = JSON.parse(saved);

  return {
    correctQuotes: parseInt(correct_guesses),
    usedQuotes: used_quotes,
    finished: finished,
  };
}

export default function Endless() {
  const [progress, setProgress] = useState<number>(0);
  const [shownNumber, setShownNumber] = useState<number>(0);
  const [usedQuotes, setUsedQuotes] = useState<number[] | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [currentQuote, setCurrentQuote] = useState<QuoteQuestion | null>(null);

  const fetchQuote = (usedQuotes: number[]): number => {
    const savedQuote = localStorage.getItem("endless_current_quote");
    if (savedQuote) {
      // A quote had already been selected, set the current quote to that
      // and return the ID of the selected quote
      setCurrentQuote(quotes[JSON.parse(savedQuote)]);
      return JSON.parse(savedQuote);
    }

    // From all the quotes, filter those that had already been used
    let availableQuotes: QuoteQuestion[] = quotes.filter(
      ({ id }) => !usedQuotes.includes(id)
    );

    // If no quotes are available, that means that every quote had already been used
    // Reset the used quotes, and make every quote available
    if (availableQuotes.length == 0) {
      availableQuotes = [...quotes];
      setUsedQuotes([]);
      const endlessStorage = localStorage.getItem("endless");
      if (endlessStorage) {
        const parsed = JSON.parse(endlessStorage);
        parsed.used_quotes = [];
        localStorage.setItem("endless", JSON.stringify(parsed));
      }
    }

    // Select a random quote from the available quotes, then save it to localStorage
    const quote: QuoteQuestion =
      availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    setCurrentQuote(quote);
    localStorage.setItem("endless_current_quote", JSON.stringify(quote.id));

    // Return the id of the selected quote
    return quote.id;
  };

  useEffect(() => {
    const { usedQuotes, correctQuotes, finished } = loadEndlessProgress();
    setUsedQuotes(usedQuotes);
    setProgress(correctQuotes);
    setIsFinished(finished);

    if (!finished) {
      setShownNumber(correctQuotes > 0 ? correctQuotes + 1 : 1);
    }
  }, []);

  useEffect(() => {
    // Is the user not done, a quote hadn't been selected and the used quotes array exists?
    if (!isFinished && !currentQuote && usedQuotes) {
      const usedId = fetchQuote(usedQuotes);
      setUsedQuotes((prev) => [...prev!, usedId]);
    }
  }, [currentQuote, isFinished, usedQuotes]);

  const loadNextQuote = (correct: boolean) => {
    // If the user selected incorrectly, finish the game
    if (!correct) {
      setIsFinished(true);
      return;
    }

    // Continue the game by selecting another quote
    localStorage.setItem("endless_current_quote", "");
    const usedId = fetchQuote(usedQuotes || []);
    setUsedQuotes((prev) => [...prev!, usedId]);
    setShownNumber(progress + 1);
  };

  // Reset the progress in case the user was wrong
  const resetProgress = () => {
    setProgress(0);
    setShownNumber(1);
    setUsedQuotes([]);
    setIsFinished(false);
    setCurrentQuote(null);
    localStorage.setItem("endless_current_quote", "");

    const endlessDefaultObject = {
      correct_guesses: 0,
      quote_data: [],
      used_quotes: [],
      finished: false,
    };

    localStorage.setItem("endless", JSON.stringify(endlessDefaultObject));
  };

  const handleAnswer = () => {
    setProgress((prev) => prev + 1);
    localStorage.setItem("endless_current_quote", "");
  };

  if (!currentQuote && !isFinished) return <PageSkeleton />;

  return (
    <>
      <div className="md:w-1/2">
        <InfoCardEndless />
      </div>
      <div className="md:w-1/2">
        {!isFinished && currentQuote ? (
          <QuoteCardEndless
            quote={currentQuote}
            onNext={() => loadNextQuote(true)}
            onAnswer={handleAnswer}
            number={shownNumber}
            onIncorrect={() => loadNextQuote(false)}
          />
        ) : (
          <FinishedCardEndless onTryAgain={resetProgress} />
        )}
      </div>
    </>
  );
}
