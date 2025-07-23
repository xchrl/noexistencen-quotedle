"use client";

import InfoCard from "@/components/InfoCard";
import QuoteCard from "../components/QuoteCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [shownCount, setShownCount] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [usedIds, setUsedIds] = useState<number[]>([]);

  const fetchQuote = async () => {
    const response = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usedIds }),
    });

    if (!response.ok) {
      console.log("No more quotes available");
      return;
    }

    const quote = await response.json();
    setCurrentQuote(quote);
    setUsedIds((prev) => [...prev, quote.id]);
  };

  useEffect(() => {
    fetchQuote();
    // TODO: clean this mess up
    try {
      const totalGuesses = localStorage.getItem("total_guesses");
      if (totalGuesses == "null" || totalGuesses == null)
        localStorage.setItem("total_guesses", "0");
      const correctGueses = localStorage.getItem("correct_guesses");
      if (correctGueses == "null" || correctGueses == null) {
        localStorage.setItem("correct_guesses", "0");
      }
      let correctStreak = localStorage.getItem("streak");
      if (correctStreak == "null" || correctStreak == null) {
        localStorage.setItem("streak", "0");
      }
      const personalBest = localStorage.getItem("personal_best");
      if (personalBest == "null" || personalBest == null) {
        localStorage.setItem("personal_best", "0");
      }
    } catch (err) {}
  }, []);

  const loadNextQuote = async () => {
    setShownCount(shownCount + 1);
    if (shownCount > 4) return;
    await fetchQuote();
  };

  if (!currentQuote) return <div>Loading...</div>;
  return (
    <>
      <div className="w-1/2 mr-4">
        <InfoCard />
      </div>
      <div className="w-1/2 ml-4">
        {shownCount <= 4 ? (
          <QuoteCard
            quote={currentQuote}
            onNext={loadNextQuote}
            number={shownCount + 1}
          />
        ) : (
          <>End</>
        )}
      </div>
    </>
  );
}
