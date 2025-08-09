"use client";

import InfoCardDaily from "@/components/daily/InfoCardDaily";
import QuoteCardDaily from "../components/daily/QuoteCardDaily";
import { useEffect, useState } from "react";
import quotes from "@/data/quotes.json";
import type QuoteQuestion from "@/types/QuoteQuestion";
import PageSkeleton from "@/components/PageSkeleton";
import FinishedCardDaily from "@/components/daily/FinishedCardDaily";
import { generateSet } from "@/lib/generateSet";
import globals from "@/lib/globals";

function loadDailyProgress() {
  const today = new Date().toISOString().split("T")[0];
  const saved = localStorage.getItem("today");

  if (!saved || saved == "null") return 0;

  const { date, guesses } = JSON.parse(saved);

  if (date === today) {
    return parseInt(guesses);
  }

  return 0;
}

export default function Home() {
  const [answered, setAnswered] = useState(0);
  const [shownNumber, setShownNumber] = useState(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [currentQuote, setCurrentQuote] = useState<QuoteQuestion | null>(null);
  const [quoteIds, setQuoteIds] = useState<number[]>([]);

  const fetchQuote = (id: number) => {
    const quote = quotes[id];
    setCurrentQuote(quote);
  };

  // Update upon page load
  useEffect(() => {
    const savedAnswered = loadDailyProgress();
    setAnswered(savedAnswered);

    function getSet() {
      const ids = generateSet();
      setQuoteIds(ids);
    }

    getSet();

    if (savedAnswered >= globals.DAILY_QUOTES) {
      setFinished(true);
    } else {
      setShownNumber(savedAnswered > 0 ? savedAnswered + 1 : 1);
    }
  }, []);

  useEffect(() => {
    if (quoteIds.length > 0 && !currentQuote && !finished) {
      fetchQuote(quoteIds[answered]);
    }
  }, [quoteIds, currentQuote, finished, answered]);

  const loadNextQuote = () => {
    if (answered >= globals.DAILY_QUOTES) {
      setFinished(true);
      return;
    }

    fetchQuote(quoteIds[answered]);
    setShownNumber(answered + 1);
  };

  if (!currentQuote && !finished) return <PageSkeleton />;

  return (
    <>
      <div className="md:w-1/2">
        <InfoCardDaily />
      </div>
      <div className="md:w-1/2">
        {!finished && currentQuote ? (
          <QuoteCardDaily
            quote={currentQuote}
            onNext={loadNextQuote}
            onAnswer={() => setAnswered((prev) => prev + 1)}
            number={shownNumber}
          />
        ) : (
          <FinishedCardDaily />
        )}
      </div>
    </>
  );
}
