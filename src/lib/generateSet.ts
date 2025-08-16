import quotes from "@/data/quotes.json";
import seedrandom from "seedrandom";
import globals from "./globals";

function generateForDate(date: string): number[] {
  const rng = seedrandom(date);
  const clone = [...quotes];

  // Shuffle deterministically
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }

  return clone.slice(0, globals.DAILY_QUOTES).map((q) => q.id);
}

export function generateSet(): number[] {
  const today = new Date();
  const recentIds = new Set<number>();

  // Get IDs from up to 7 days before today
  for (let offset = 1; offset <= 7; offset++) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - offset);
    const dateStr = pastDate.toISOString().split("T")[0];
    generateForDate(dateStr).forEach((id) => recentIds.add(id));
  }

  // Generate today’s pool and exclude recent IDs
  const todayStr = today.toISOString().split("T")[0];
  const rng = seedrandom(todayStr);
  const available = quotes.filter((q) => !recentIds.has(q.id));

  // Shuffle available quotes
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }

  return available.slice(0, globals.DAILY_QUOTES).map((q) => q.id);
}
