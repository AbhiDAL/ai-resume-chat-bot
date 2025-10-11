// make & store vectors
// /lib/embeddings.ts
import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";
import type { Chunk, UploadedFile } from "./types";

const CHUNK_SIZE = 700;

export async function buildEmbeddingIndex(): Promise<Chunk[]> {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".md"));

  const docs = files.map(f => ({
    source: f.replace(".md",""),
    doc: fs.readFileSync(path.join(dataDir, f), "utf8")
  }));

  // naive sentence-ish split, then group to ~CHUNK_SIZE
  const chunks: Omit<Chunk, "embedding">[] = [];
  for (const d of docs) {
    const parts = d.doc.split(/(?<=[\.\!\?])\s+/);
    let buf = "";
    for (const p of parts) {
      if ((buf + " " + p).length > CHUNK_SIZE) {
        if (buf.trim()) chunks.push({ id: cryptoRandomId(), doc: d.doc, source: d.source, text: buf.trim() });
        buf = p;
      } else buf += (buf ? " " : "") + p;
    }
    if (buf.trim()) chunks.push({ id: cryptoRandomId(), doc: d.doc, source: d.source, text: buf.trim() });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small";

  // batch to avoid rate limits
  const allTexts = chunks.map(c => c.text);
  const res = await openai.embeddings.create({ model, input: allTexts });
  const vectors = res.data.map(d => d.embedding);

  const indexed: Chunk[] = chunks.map((c, i) => ({ ...c, embedding: vectors[i] }));
  fs.writeFileSync(path.join(process.cwd(), "embeddings.json"), JSON.stringify(indexed, null, 2));
  return indexed;
}

// Build embeddings from uploaded files (in-memory)
export async function buildEmbeddingIndexFromFiles(files: UploadedFile[]): Promise<Chunk[]> {
  const docs = files.map(f => ({
    source: f.name.replace(/\.(md|txt)$/, ""),
    doc: f.content
  }));

  // naive sentence-ish split, then group to ~CHUNK_SIZE
  const chunks: Omit<Chunk, "embedding">[] = [];
  for (const d of docs) {
    const parts = d.doc.split(/(?<=[\.\!\?])\s+/);
    let buf = "";
    for (const p of parts) {
      if ((buf + " " + p).length > CHUNK_SIZE) {
        if (buf.trim()) chunks.push({ id: cryptoRandomId(), doc: d.doc, source: d.source, text: buf.trim() });
        buf = p;
      } else buf += (buf ? " " : "") + p;
    }
    if (buf.trim()) chunks.push({ id: cryptoRandomId(), doc: d.doc, source: d.source, text: buf.trim() });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small";

  // batch to avoid rate limits
  const allTexts = chunks.map(c => c.text);
  const res = await openai.embeddings.create({ model, input: allTexts });
  const vectors = res.data.map(d => d.embedding);

  const indexed: Chunk[] = chunks.map((c, i) => ({ ...c, embedding: vectors[i] }));
  
  // Store in memory for this session (you could also save to a file)
  (global as unknown as { embeddingIndex?: Chunk[] }).embeddingIndex = indexed;
  
  return indexed;
}

export function loadEmbeddingIndex(): Chunk[] {
  // First try to load from global memory (for uploaded files)
  const globalStore = global as unknown as { embeddingIndex?: Chunk[] };
  if (globalStore.embeddingIndex) {
    return globalStore.embeddingIndex;
  }
  
  // Fallback to file-based embeddings
  const p = path.join(process.cwd(), "embeddings.json");
  if (!fs.existsSync(p)) throw new Error("No embeddings available. Upload files or run buildEmbeddingIndex() first.");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function cryptoRandomId() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}
