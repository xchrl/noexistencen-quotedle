// app/api/answer/route.ts
import quotes from "@/data/quotes.json";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  quoteId: number;
  selectedAnswer: number;
};

export async function POST(req: NextRequest) {
  const { quoteId, selectedAnswer }: RequestBody = await req.json();

  const quote = quotes.find((q) => q.id === quoteId);
  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  const isCorrect = quote.correctAnswer === selectedAnswer;

  return NextResponse.json({ correct: isCorrect });
}
