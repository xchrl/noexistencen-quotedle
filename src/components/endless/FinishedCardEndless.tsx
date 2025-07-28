"use client";

import loadLocalStorage from "@/lib/loadLocalStorage";
import { useEffect, useState } from "react";
import { CarouselItem } from "@/components/ui/carousel";
import quotes from "@/data/quotes.json";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ArrowDownIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import FinishedCard from "../ui/FinishedCard";

type QuoteData = {
  id: number;
  answer: number;
  correct: boolean;
};

type EndlessStats = {
  correct_guesses: number;
  quote_data: QuoteData[];
  used_quotes: number[];
  finished: boolean;
};

export default function FinishedCardEndless({
  onTryAgain,
}: {
  onTryAgain: () => void;
}) {
  const [endlessStats, setEndlessStats] = useState<EndlessStats>();
  const [quoteFromRevealed, setQuoteFromRevealed] = useState<boolean[]>([]);

  const handleToggle = (index: number) => {
    const updatedStates = [...quoteFromRevealed];
    updatedStates[index] = !updatedStates[index];
    setQuoteFromRevealed(updatedStates);
  };

  useEffect(() => {
    const { endless } = loadLocalStorage();
    if (endless) {
      setEndlessStats(endless);
      setQuoteFromRevealed(Array(endless.used_quotes.length).fill(false));
    }
  }, []);

  return (
    <FinishedCard>
      <FinishedCard.Heading />
      {endlessStats && (
        <>
          <header className="text-center md:text-left">
            <p>
              You guessed{" "}
              <span className="text-green-400">
                {endlessStats.correct_guesses}
              </span>{" "}
              quote endings correctly.
            </p>
            <p>Let&apos;s see your performance:</p>
          </header>
          <FinishedCard.Carousel>
            {endlessStats.quote_data.map(({ id, answer, correct }, index) => {
              const quote = quotes[id];
              const quoteText = quote.quote;
              const key = `quote_data-${index}`;
              return (
                <CarouselItem key={key} className="basis-1">
                  <Card className="text-center md:text-start">
                    <CardHeader>
                      <h2 className="text-lg font-bold">Quote {index + 1}</h2>
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
          <Button variant="default" onClick={onTryAgain}>
            Try again
          </Button>
        </>
      )}
    </FinishedCard>
  );
}
