"use client";

import InfoCard from "@/components/InfoCard";
import QuoteCard from "../components/QuoteCard";
import { useEffect, useState } from "react";
import loadLocalStorage from "@/lib/loadLocalStorage";
import quotes from "@/data/quotes.json";
import type QuoteQuestion from "@/types/QuoteQuestion";
import PageSkeleton from "@/components/PageSkeleton";

type TodayStatsType = {
  guesses: number;
  correct_guesses: number;
  date: string;
};

function loadDailyProgress() {
  const today = "2025-07-26";
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
  const [todayStats, setTodayStats] = useState<TodayStatsType>();

  const fetchQuote = (id: number) => {
    const quote = quotes[id];
    setCurrentQuote(quote);
  };

  // TODO: kinda messy with how i apply shownNumber, clean up

  // Update upon page load

  useEffect(() => {
    const savedAnswered = loadDailyProgress();
    setAnswered(savedAnswered);

    async function getSet() {
      const res = await fetch("/api/quoteset");
      const ids = await res.json();
      setQuoteIds(ids);
    }

    if (savedAnswered === 5) {
      setFinished(true);
    } else {
      getSet();
      setShownNumber(savedAnswered > 0 ? savedAnswered + 1 : 1);
    }
  }, []);

  useEffect(() => {
    if (quoteIds.length > 0 && !currentQuote && !finished) {
      fetchQuote(quoteIds[answered]); // answered is loaded via loadDailyProgress()
    }
  }, [quoteIds, currentQuote, finished, answered]);

  useEffect(() => {
    // If the quiz is finished for today, get today's stats
    const { today: todayStats } = loadLocalStorage();
    setTodayStats(todayStats);
  }, [finished]);

  const loadNextQuote = async () => {
    if (answered >= 5) {
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
        <InfoCard />
      </div>
      <div className="md:w-1/2">
        {!finished && currentQuote ? (
          <QuoteCard
            quote={currentQuote}
            onNext={loadNextQuote}
            onAnswer={() => setAnswered((prev) => prev + 1)}
            number={shownNumber}
          />
        ) : (
          <div className="bg-background/80 border border-red-400 rounded-xl shadow-lg p-8 w-full flex flex-col gap-6">
            <h2 className="text-xl font-bold text-center">Finished!</h2>
            <div className="bg-secondary/90 rounded-lg p-6 text-xl text-center font-medium border border-neutral-700 mb-2">
              {todayStats && (
                <>
                  <p>Your guesses: {todayStats.guesses}</p>
                  <p>Correct guesses: {todayStats.correct_guesses}</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
