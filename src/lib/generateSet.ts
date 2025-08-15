import quotes from "@/data/quotes.json";
import seedrandom from "seedrandom";
import globals from "./globals";

export function generateSet(): number[] {
  const today = new Date().toISOString().split("T")[0];
  const rng = seedrandom(today);

  // Load history of last 3 days
  const history: number[][] = JSON.parse(
    localStorage.getItem("quote_history") || "[]"
  );
  const recentIds = new Set(history.flat());

  // Filter out recent quotes
  const availableQuotes = quotes.filter((q) => !recentIds.has(q.id));

  // Shuffle available quotes
  const clone = [...availableQuotes];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }

  const ids = clone.slice(0, globals.DAILY_QUOTES).map((q) => q.id);

  // Update history with today’s set
  history.unshift(ids);
  while (history.length > 3) history.pop();
  localStorage.setItem("quote_history", JSON.stringify(history));

  return ids;
}
