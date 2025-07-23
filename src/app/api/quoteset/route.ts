// app/api/answer/route.ts
import quotes from "@/data/quotes.json";
import { NextResponse } from "next/server";
import seedrandom from "seedrandom";

export async function GET() {
  const today = "2024-07-24";
  const rng = seedrandom(today);

  const clone = [...quotes];

  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }

  let ids = [];
  for (let i = 0; i < clone.length; i++) {
    ids.push(clone[i].id);
  }

  return NextResponse.json(ids.slice(0, 5));
}
