import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  const formData = await req.formData();
  const uuid = formData.get("uuid")?.toString();
  const data = formData.get("data") as Blob;

  if (!uuid) {
    return NextResponse.json({ error: "Missing UUID" }, { status: 400 });
  }

  const file = new Blob([data], { type: "application/json" });

  const uploaded = await put(`user-data/${uuid}.json`, file, {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json",
  });

  return NextResponse.json({ url: uploaded.url });
}
