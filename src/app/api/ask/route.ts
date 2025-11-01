// API: retrieve + prompt + model + stream
// /app/api/ask/route.ts
import { NextRequest } from "next/server";
import OpenAI from "openai";
import { loadEmbeddingIndex } from "../../../../lib/embeddings";
import { topK } from "../../../../lib/retrieve";
import { systemPrompt, userPrompt } from "../../../../lib/prompt";

export const runtime = "nodejs"; // or "edge" if you prefer

// Ensure environment variables are loaded
if (typeof window === "undefined") {
  const path = require("path");
  require("dotenv").config({ path: path.join(process.cwd(), ".env.local") });
}

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== "string") {
      return new Response("Invalid question", { status: 400 });
    }

    // Get API key from environment
    const apiKey =
      process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!apiKey) {
      console.error("OPENAI_API_KEY not found in process.env");
      console.error(
        "Available env vars:",
        Object.keys(process.env).filter((k) => k.includes("OPENAI"))
      );
      return new Response(
        `Error: OPENAI_API_KEY environment variable is not set. Please check your .env.local file. Available keys: ${
          Object.keys(process.env)
            .filter((k) => k.includes("OPENAI"))
            .join(", ") || "none"
        }`,
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });
    const embedModel =
      process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small";
    const chatModel = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";

    // 1) Try to load embeddings, handle case when none available
    let hits: Array<{
      id: string;
      source: string;
      text: string;
      score: number;
    }> = [];
    let hasEmbeddings = true;

    try {
      const index = loadEmbeddingIndex();

      // 2) embed query if we have embeddings
      const qEmbed = await openai.embeddings.create({
        model: embedModel,
        input: question,
      });
      const qVec = qEmbed.data[0].embedding;

      // 3) retrieve relevant chunks
      hits = topK(qVec, index, 5);
    } catch {
      // No embeddings available, we'll answer without context
      hasEmbeddings = false;
      hits = [];
    }

    // 4) prompt
    const sys = systemPrompt();
    const context = hasEmbeddings
      ? hits.map((h) => `[${h.source}] ${h.text}`).join("\n\n")
      : undefined;
    const usr = hasEmbeddings
      ? userPrompt(question, context)
      : userPrompt(question);

    // 5) stream
    const stream = await openai.chat.completions.create({
      model: chatModel,
      messages: [
        { role: "system", content: sys },
        { role: "user", content: usr },
      ],
      temperature: 0.2,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const delta = chunk.choices?.[0]?.delta?.content ?? "";
          if (delta) {
            controller.enqueue(encoder.encode(delta));
          }
        }
        // Append sources at the end in a special format
        const sources = hasEmbeddings
          ? hits.map((h) => h.source)
          : ["General AI Knowledge"];
        controller.enqueue(
          encoder.encode(`SOURCES:${JSON.stringify(sources)}`)
        );
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (e: unknown) {
    const errorMessage =
      e instanceof Error ? e.message : "Unknown error occurred";
    return new Response(`Error: ${errorMessage}`, { status: 500 });
  }
}
