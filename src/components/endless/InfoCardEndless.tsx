"use client";

import loadLocalStorage from "@/lib/loadLocalStorage";
import { useEffect, useState } from "react";
import InfoCard from "../ui/InfoCard";

export default function InfoCardEndless() {
  const [correctStreak, setCorrectStreak] = useState<number>(0);
  const [personalBest, setPersonalBest] = useState<number>(0);
  const [correctGuesses, setCorrectGuesses] = useState<number>(0);
  const [totalGuesses, setTotalGuesses] = useState<number>(0);

  useEffect(() => {
    const handleCustomChange = async () => {
      const { endlessModeStats } = loadLocalStorage();
      if (endlessModeStats) {
        setTotalGuesses(JSON.parse(endlessModeStats).total_guesses);
        setCorrectGuesses(JSON.parse(endlessModeStats).correct_guesses);
        setCorrectStreak(JSON.parse(endlessModeStats).streak);
        setPersonalBest(JSON.parse(endlessModeStats).personal_best);
      }
    };

    handleCustomChange();

    window.addEventListener("localStorageUpdated", handleCustomChange);

    return () => {
      window.removeEventListener("localStorageUpdated", handleCustomChange);
    };
  }, []);

  return (
    <InfoCard>
      <InfoCard.Heading />
      <InfoCard.Content>
        <InfoCard.ContentSection>
          Correct streak
          <span className="px-2 py-1 rounded-sm bg-secondary border shadow-sm">
            {correctStreak}
          </span>
        </InfoCard.ContentSection>
        <InfoCard.ContentSection>
          Personal best
          <span className="px-2 py-1 rounded-sm bg-secondary border shadow-sm">
            {personalBest}
          </span>
        </InfoCard.ContentSection>
        <InfoCard.ContentSection>
          Correct guesses
          <span className="px-2 py-1 rounded-sm bg-secondary border shadow-sm">
            {correctGuesses} / {totalGuesses}
          </span>
        </InfoCard.ContentSection>
      </InfoCard.Content>
    </InfoCard>
  );
}
