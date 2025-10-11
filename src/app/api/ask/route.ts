// API: retrieve + prompt + model + stream
// /app/api/ask/route.ts
import { NextRequest } from "next/server";
import OpenAI from "openai";
import { loadEmbeddingIndex } from "@/lib/embeddings";
import { topK } from "@/lib/retrieve";
import { systemPrompt, userPrompt } from "@/lib/prompt";

export const runtime = "nodejs"; // or "edge" if you prefer

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== "string") {
      return new Response("Invalid question", { status: 400 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const embedModel = process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small";
    const chatModel = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";

    // 1) embed query
    const qEmbed = await openai.embeddings.create({ model: embedModel, input: question });
    const qVec = qEmbed.data[0].embedding;

    // 2) retrieve
    const index = loadEmbeddingIndex();
    const hits = topK(qVec, index, 5);

    // 3) prompt
    const sys = systemPrompt();
    const usr = userPrompt(question, hits.map(h => ({ source: h.source, text: h.text })));

    // 4) stream
    const stream = await openai.chat.completions.create({
      model: chatModel,
      messages: [
        { role: "system", content: sys },
        { role: "user", content: usr }
      ],
      temperature: 0.2,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let first = true;
        for await (const chunk of stream) {
          const delta = chunk.choices?.[0]?.delta?.content ?? "";
          if (delta) controller.enqueue(encoder.encode(delta));
          // First token: prepend a small header so the client knows sources
          if (first) first = false;
        }
        // Append \n\nSources:
        const sources = hits.map(h => `[${h.source}]`).join(" ");
        controller.enqueue(encoder.encode(`\n\nSources: ${sources}`));
        controller.close();
      }
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache"
      }
    });
  } catch (e:any) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
