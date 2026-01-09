// app/api/search/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  // Optional: Use your own Google Programmable Search Engine
  // const key = process.env.GOOGLE_SEARCH_API_KEY;
  // const cx = process.env.GOOGLE_CX_ID;
  // if (!key || !cx) { ... fallback ... }

  // For now, return mock results (remove when you add real API keys)
  return NextResponse.json({
    results: [
      {
        title: `Search results for "${q}"`,
        link: `https://www.google.com/search?q=${encodeURIComponent(q)}`,
        snippet: "Real search disabled. Add GOOGLE_SEARCH_API_KEY and GOOGLE_CX_ID to .env.local for live results.",
      },
    ],
  });
}
