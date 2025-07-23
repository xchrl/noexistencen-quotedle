import quotes from "@/data/quotes.json";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  id: number;
};

export async function POST(req: NextRequest) {
  const { id: quoteId }: RequestBody = await req.json();

  const quote = quotes.find(({ id }) => id == quoteId);

  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  const { correctAnswer, ...publicQuote } = quote;

  return NextResponse.json(publicQuote);
}
