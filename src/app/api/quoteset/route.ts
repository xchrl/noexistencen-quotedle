import quotes from "@/data/quotes.json";
import { NextResponse } from "next/server";
import seedrandom from "seedrandom";

export function GET() {
  const today = new Date().toISOString().split("T")[0];
  const rng = seedrandom(today);

  const clone = [...quotes];

  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }

  const ids = [];
  for (let i = 0; i < clone.length; i++) {
    ids.push(clone[i].id);
  }

  return NextResponse.json(ids.slice(0, 5));
}
