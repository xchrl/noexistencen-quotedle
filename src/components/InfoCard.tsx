"use client";

import loadLocalStorage from "@/lib/loadLocalStorage";
import { useEffect, useState } from "react";

export default function InfoCard() {
  const [correctStreak, setCorrectStreak] = useState<number>(0);
  const [personalBest, setPersonalBest] = useState<number>(0);
  const [correctGuesses, setCorrectGuesses] = useState<number>(0);
  const [totalGuesses, setTotalGuesses] = useState<number>(0);

  useEffect(() => {
    const handleCustomChange = async () => {
      const { dailyModeStats } = loadLocalStorage();
      if (dailyModeStats) {
        setTotalGuesses(JSON.parse(dailyModeStats).total_guesses);
        setCorrectGuesses(JSON.parse(dailyModeStats).correct_guesses);
        setCorrectStreak(JSON.parse(dailyModeStats).streak);
        setPersonalBest(JSON.parse(dailyModeStats).personal_best);
      }
    };

    handleCustomChange();

    window.addEventListener("localStorageUpdated", handleCustomChange);

    return () => {
      window.removeEventListener("localStorageUpdated", handleCustomChange);
    };
  }, []);

  return (
    <div className="bg-background/80 border border-red-400 rounded-xl shadow-lg p-4 md:p-6 flex flex-col gap-2 md:gap-6">
      <h2 className="text-xl font-bold text-center">Your statistics</h2>
      <div className="grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-4 text-lg text-center">
        <div className="flex flex-col md:flex-row items-center justify-between">
          Correct streak
          <span className="px-2 py-1 rounded-sm bg-secondary border shadow-sm">
            {correctStreak}
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          Personal best
          <span className="px-2 py-1 rounded-sm bg-secondary border shadow-sm">
            {personalBest}
          </span>
        </div>
        <div className="flex flex-col col-span-2 md:flex-row items-center justify-between">
          Correct guesses
          <span className="px-2 py-1 rounded-sm bg-secondary border shadow-sm">
            {correctGuesses} / {totalGuesses}
          </span>
        </div>
      </div>
    </div>
  );
}
