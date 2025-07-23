"use client";

import InfoCard from "@/components/InfoCard";
import QuoteCard from "../components/QuoteCard";
import { useEffect, useState } from "react";
import loadLocalStorage from "@/lib/loadLocalStorage";

function loadDailyProgress() {
  const today = "2025-07-26";
  const saved = localStorage.getItem("today");

  console.log(saved);

  if (!saved || saved == "null") return 0;

  const { date, guesses } = JSON.parse(saved);

  if (date === today) {
    return parseInt(guesses);
  }

  return 0;
}

type TodayStatsType = {
  guesses: number;
  correct_guesses: number;
  date: string;
};

export default function Home() {
  const [answered, setAnswered] = useState(0);
  const [shownNumber, setShownNumber] = useState(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [quoteIds, setQuoteIds] = useState<number[]>([]);
  const [todayStats, setTodayStats] = useState<TodayStatsType>();

  // TODO: kinda messy with how i apply shownNumber, clean up

  const fetchQuote = async (id: number) => {
    const response = await fetch("/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      console.log("No more quotes available");
      return;
    }

    const quote = await response.json();
    setCurrentQuote(quote);
  };

  // Update upon page load
  useEffect(() => {
    const answered = loadDailyProgress();
    setAnswered(answered);
    if (answered == 0) setShownNumber(1);
    else if (answered == 5) setFinished(true);
    else setShownNumber(answered + 1);

    if (!finished) {
      async function getSet() {
        await fetch("/api/quoteset")
          .then((res) => res.json())
          .then((json) => setQuoteIds(json));
      }
      getSet();
    }
  }, []);

  // If quiteIds set is fetched, get a new quote
  useEffect(() => {
    if (answered <= 4 && currentQuote === null && quoteIds.length !== 0) {
      fetchQuote(quoteIds[answered]);
    } else if (answered == 5) {
      fetchQuote(quoteIds[answered - 1]);
    }
  }, [quoteIds]);

  // If the quiz is finished for today, get today's stats
  useEffect(() => {
    const { today: todayStats } = loadLocalStorage();
    setTodayStats(todayStats);
  }, [finished]);

  const loadNextQuote = async () => {
    if (answered >= 5) {
      setFinished(true);
      return;
    }
    await fetchQuote(quoteIds[answered]).then(() =>
      setShownNumber(answered + 1)
    );
  };

  if (!currentQuote) return <div>Loading...</div>;

  return (
    <>
      <div className="lg:w-1/2">
        <InfoCard />
      </div>
      <div className="lg:w-1/2">
        {!finished ? (
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
