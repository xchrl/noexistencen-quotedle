"use client";

import loadLocalStorage from "@/lib/loadLocalStorage";
import { useEffect, useState } from "react";
import { CarouselItem } from "@/components/ui/carousel";
import Countdown from "./Countdown";
import quotes from "@/data/quotes.json";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ArrowDownIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import FinishedCard from "../ui/FinishedCard";
import globals from "@/lib/globals";

type QuoteData = {
  id: number;
  answer: number;
  correct: boolean;
};

type TodayStatsType = {
  guesses: number;
  correct_guesses: number;
  quoteData: QuoteData[];
  date: string;
};

export default function FinishedCardDaily() {
  const [todayStats, setTodayStats] = useState<TodayStatsType>();
  const [quoteFromRevealed, setQuoteFromRevealed] = useState<boolean[]>(
    Array(globals.DAILY_QUOTES).fill(false)
  );

  const handleToggle = (index: number) => {
    const updatedStates = [...quoteFromRevealed];
    updatedStates[index] = !updatedStates[index];
    setQuoteFromRevealed(updatedStates);
  };

  useEffect(() => {
    const { today } = loadLocalStorage();
    if (today) {
      setTodayStats(today);
    }
  }, []);
  return (
    <FinishedCard>
      <FinishedCard.Heading />
      {todayStats && (
        <>
          <header className="text-center md:text-left">
            <p>
              You guessed{" "}
              <span className="text-green-400">
                {todayStats.correct_guesses}
              </span>{" "}
              quote endings correctly.
            </p>
            <p>
              Next game in:{" "}
              <span className="text-accent">
                <Countdown />
              </span>
            </p>
            <p>Let&apos;s see your performance:</p>
          </header>
          <FinishedCard.Carousel>
            {todayStats.quoteData.map(({ id, answer, correct }, index) => {
              const quote = quotes[id];
              const quoteText = quote.quote;
              return (
                <CarouselItem key={id} className="basis-1">
                  <Card className="text-center md:text-start">
                    <CardHeader>
                      <h2 className="text-lg font-bold">
                        Quote {index + 1} / {globals.DAILY_QUOTES}
                      </h2>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                      <p>{quoteText}</p>
                      <div className="font-bold">
                        <p>
                          Your answer:{" "}
                          <span
                            className={`${
                              correct ? "text-green-400" : "text-red-400"
                            } font-normal`}
                          >
                            {quote.answers[answer]}
                          </span>
                        </p>
                        <p>
                          Correct answer:{" "}
                          <span className="text-green-400 font-normal">
                            {quote.answers[quote.correctAnswer]}
                          </span>
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <button
                        className="bg-accent/30 border border-accent/60 p-3 rounded-lg hover:bg-accent/50 hover:border-accent/80 duration-150 hover:cursor-pointer w-full text-start"
                        onClick={() => handleToggle(index)}
                      >
                        <p className="flex justify-between gap-4">
                          Where is this quote from?{" "}
                          <ArrowDownIcon
                            className={`transform transition-transform duration-300 ${
                              quoteFromRevealed[index] ? "rotate-180" : ""
                            }`}
                          />
                        </p>

                        <AnimatePresence>
                          {quoteFromRevealed[index] && (
                            <motion.div
                              layout
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.4 }}
                              className="overflow-hidden"
                            >
                              <p className="mt-4">{quote.from}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              );
            })}
          </FinishedCard.Carousel>
        </>
      )}
    </FinishedCard>
  );
}
