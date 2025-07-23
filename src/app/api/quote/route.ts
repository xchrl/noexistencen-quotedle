import quotes from "@/data/quotes.json";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  usedIds: number[];
};

export async function POST(req: NextRequest) {
  const { usedIds }: RequestBody = await req.json();

  const availableQuotes = quotes.filter((q) => !usedIds.includes(q.id));

  if (availableQuotes.length === 0) {
    return NextResponse.json(
      { error: "No more quotes available" },
      { status: 404 }
    );
  }

  const randomIndex = Math.floor(Math.random() * availableQuotes.length);
  const selectedQuote = availableQuotes[randomIndex];

  return NextResponse.json(selectedQuote);
}
