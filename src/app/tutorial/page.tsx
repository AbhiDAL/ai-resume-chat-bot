"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  CogIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Brain, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export default function TutorialPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const toggleStep = (stepIndex: number) => {
    setExpandedSteps((prev) =>
      prev.includes(stepIndex)
        ? prev.filter((i) => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const sections = [
    {
      id: "overview",
      title: "Project Overview",
      icon: Brain,
      color: "from-cyan-500 to-blue-500",
    },
    {
      id: "setup",
      title: "Environment Setup",
      icon: CogIcon,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "project",
      title: "Project Structure",
      icon: DocumentTextIcon,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "code",
      title: "Code Implementation",
      icon: CodeBracketIcon,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "deploy",
      title: "Deployment",
      icon: RocketLaunchIcon,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const steps = [
    {
      section: "overview",
      title: "What We're Building",
      content: `We're creating a **smart website** that can read resume files and answer questions about them using AI. Think of it like having a super-smart assistant that can instantly tell you everything about a person's skills and experience just by reading their resume!

## 🎯 Key Features
- **Document Upload**: Support for markdown and text files
- **Intelligent Q&A**: Natural language querying with AI-powered responses
- **Source Attribution**: All responses include references to specific documents
- **Voice Interface**: Speech-to-text input and text-to-speech output
- **Real-time Responses**: Streaming AI responses for immediate feedback
- **Responsive Design**: Works on desktop and mobile devices

## 🧠 How It Works
1. **Document Processing**: Uploaded files are chunked and converted to vector embeddings
2. **Query Processing**: User questions are also converted to embeddings
3. **Similarity Search**: Relevant document chunks are identified using cosine similarity
4. **Response Generation**: Context and query are sent to the AI model for answer generation
5. **Source Attribution**: The system tracks which documents contributed to each response`,
    },
    {
      section: "setup",
      title: "Step 1: Setting Up Your Computer",
      content: `### 1.1 Install Node.js (The Engine)
**What it is:** Node.js is like the engine that makes our website work.

**How to install:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download the "LTS" version (it's the stable one)
3. Run the installer and follow the instructions
4. **Test it:** Open your computer's terminal/command prompt and type:
   \`\`\`bash
   node --version
   \`\`\`
   You should see something like \`v18.17.0\` or higher.

### 1.2 Install a Code Editor
**What it is:** This is where we'll write all our code.

**Recommended:** Visual Studio Code (VS Code)
1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Download and install it
3. **Optional:** Install these helpful extensions:
   - TypeScript and JavaScript Language Features
   - Tailwind CSS IntelliSense
   - Auto Rename Tag

### 1.3 Get OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to "API Keys" section
4. Create a new API key
5. Copy it - you'll need it later!`,
    },
    {
      section: "project",
      title: "Step 2: Creating the Project Structure",
      content: `### 2.1 Create a New Folder
1. Open your terminal/command prompt
2. Navigate to where you want your project (like Desktop):
   \`\`\`bash
   cd Desktop
   \`\`\`
3. Create a new folder:
   \`\`\`bash
   mkdir ai-resume-chatbot
   cd ai-resume-chatbot
   \`\`\`

### 2.2 Initialize the Project
\`\`\`bash
npm init -y
\`\`\`

### 2.3 Install Dependencies
\`\`\`bash
# Core framework
npm install next@latest react@latest react-dom@latest

# TypeScript
npm install -D typescript @types/react @types/node @types/react-dom

# Styling
npm install tailwindcss postcss autoprefixer
npm install -D @tailwindcss/typography

# AI and UI libraries
npm install openai framer-motion react-markdown lucide-react @heroicons/react
\`\`\`

### 2.4 Create Folder Structure
\`\`\`
ai-resume-chatbot/
├── src/
│   └── app/
│       ├── api/
│       │   ├── ask/
│       │   └── build-embeddings/
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── lib/
├── data/
├── public/
├── scripts/
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
\`\`\``,
    },
    {
      section: "code",
      title: "Step 3: Core Configuration Files",
      content: `### 3.1 Create package.json
\`\`\`json
{
  "name": "ai-resume-chatbot",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "build-embeddings": "TS_NODE_TRANSPILE_ONLY=1 ts-node --project scripts/tsconfig.json scripts/build-embeddings.ts"
  },
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "@tailwindcss/typography": "^0.5.19",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.545.0",
    "next": "15.5.4",
    "openai": "^6.3.0",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-markdown": "^10.1.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.5.4",
    "tailwindcss": "^4",
    "ts-node": "^10.9.2",
    "typescript": "^5"
  }
}
\`\`\`

### 3.2 Create tsconfig.json
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "baseUrl": ".",
    "paths": {"@/*": ["./src/*"]}
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
\`\`\`

### 3.3 Create .env.local
\`\`\`bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_CHAT_MODEL=gpt-4o-mini
OPENAI_EMBED_MODEL=text-embedding-3-small
\`\`\``,
    },
    {
      section: "code",
      title: "Step 4: Core Logic Files",
      content: `### 4.1 Create lib/types.ts
\`\`\`typescript
// Type definitions for the resume chat bot
export type Chunk = {
  id: string;
  doc: string;
  source: string;
  text: string;
  embedding: number[];
};

export type SimilarResult = {
  id: string;
  source: string;
  text: string;
  score: number;
};

export type Message = {
  role: "user" | "assistant";
  text: string;
  sources?: string[];
};

export type UploadedFile = {
  name: string;
  content: string;
  type: 'resume' | 'project';
};
\`\`\`

### 4.2 Create lib/retrieve.ts
\`\`\`typescript
// cosine similarity + top-k
// /lib/retrieve.ts
import type { SimilarResult } from "./types.ts";

export function cosineSim(a: number[], b: number[]) {
  let dot=0, na=0, nb=0;
  for (let i=0;i<a.length;i++){ dot+=a[i]*b[i]; na+=a[i]*a[i]; nb+=b[i]*b[i]; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-10);
}

export function topK(queryVec: number[], index: { id:string; source:string; text:string; embedding:number[] }[], k=5): SimilarResult[] {
  const scored = index.map(c => ({ ...c, score: cosineSim(queryVec, c.embedding) }));
  scored.sort((x,y)=> y.score - x.score);
  return scored.slice(0, k).map(({id, source, text, score}) => ({ id, source, text, score }));
}
\`\`\`

### 4.3 Create lib/prompt.ts
\`\`\`typescript
// AI prompt engineering
// /lib/prompt.ts

export function systemPrompt() {
  return \`You are an intelligent resume analysis assistant. Your job is to help recruiters and hiring managers understand candidates by analyzing their resumes and project files.

Key guidelines:
- Provide accurate, helpful insights based on the uploaded documents
- Be specific and cite relevant details from the source material
- Focus on technical skills, experience, achievements, and qualifications
- If information isn't available in the documents, clearly state this
- Always be professional and objective in your analysis
- Use clear, concise language that's easy to understand\`;
}

export function userPrompt(question: string, context?: string) {
  if (context) {
    return \`Based on the following context from the candidate's documents:

\${context}

Please answer this question: \${question}

Provide a detailed response that references specific information from the context when possible.\`;
  }
  
  return \`Please answer this question about the candidate: \${question}

Note: No specific context was provided from uploaded documents, so please provide a general response based on your knowledge.\`;
}
\`\`\`

### 4.4 Create lib/embeddings.ts
\`\`\`typescript
// make & store vectors
// /lib/embeddings.ts
import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";
import type { Chunk, UploadedFile } from "./types";

const CHUNK_SIZE = 700;

export async function buildEmbeddingIndex(): Promise<Chunk[]> {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".md"));

  const docs = files.map((f) => ({
    source: f.replace(".md", ""),
    doc: fs.readFileSync(path.join(dataDir, f), "utf8"),
  }));

  // naive sentence-ish split, then group to ~CHUNK_SIZE
  const chunks: Omit<Chunk, "embedding">[] = [];
  for (const d of docs) {
    const parts = d.doc.split(/(?<=[\.\!\?])\s+/);
    let buf = "";
    for (const p of parts) {
      if ((buf + " " + p).length > CHUNK_SIZE) {
        if (buf.trim())
          chunks.push({
            id: cryptoRandomId(),
            doc: d.doc,
            source: d.source,
            text: buf.trim(),
          });
        buf = p;
      } else buf += (buf ? " " : "") + p;
    }
    if (buf.trim())
      chunks.push({
        id: cryptoRandomId(),
        doc: d.doc,
        source: d.source,
        text: buf.trim(),
      });
  }

  const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }
  const openai = new OpenAI({ apiKey });
  const model = process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small";

  // batch to avoid rate limits
  const allTexts = chunks.map((c) => c.text);
  const res = await openai.embeddings.create({ model, input: allTexts });
  const vectors = res.data.map((d) => d.embedding);

  const indexed: Chunk[] = chunks.map((c, i) => ({
    ...c,
    embedding: vectors[i],
  }));
  fs.writeFileSync(
    path.join(process.cwd(), "embeddings.json"),
    JSON.stringify(indexed, null, 2)
  );
  return indexed;
}

// Build embeddings from uploaded files (in-memory)
export async function buildEmbeddingIndexFromFiles(
  files: UploadedFile[]
): Promise<Chunk[]> {
  const docs = files.map((f) => ({
    source: f.name.replace(/\.(md|txt)$/, ""),
    doc: f.content,
  }));

  // naive sentence-ish split, then group to ~CHUNK_SIZE
  const chunks: Omit<Chunk, "embedding">[] = [];
  for (const d of docs) {
    const parts = d.doc.split(/(?<=[\.\!\?])\s+/);
    let buf = "";
    for (const p of parts) {
      if ((buf + " " + p).length > CHUNK_SIZE) {
        if (buf.trim())
          chunks.push({
            id: cryptoRandomId(),
            doc: d.doc,
            source: d.source,
            text: buf.trim(),
          });
        buf = p;
      } else buf += (buf ? " " : "") + p;
    }
    if (buf.trim())
      chunks.push({
        id: cryptoRandomId(),
        doc: d.doc,
        source: d.source,
        text: buf.trim(),
      });
  }

  const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }
  const openai = new OpenAI({ apiKey });
  const model = process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small";

  // batch to avoid rate limits
  const allTexts = chunks.map((c) => c.text);
  const res = await openai.embeddings.create({ model, input: allTexts });
  const vectors = res.data.map((d) => d.embedding);

  const indexed: Chunk[] = chunks.map((c, i) => ({
    ...c,
    embedding: vectors[i],
  }));

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
  if (!fs.existsSync(p))
    throw new Error(
      "No embeddings available. Upload files or run buildEmbeddingIndex() first."
    );
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function cryptoRandomId() {
  return (
    Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  );
}
\`\`\``,
    },
    {
      section: "code",
      title: "Step 5: API Routes",
      content: `### 5.1 Create src/app/api/ask/route.ts
This handles chat questions and returns AI responses:

\`\`\`typescript
// API: retrieve + prompt + model + stream
// /app/api/ask/route.ts
import { NextRequest } from "next/server";
import OpenAI from "openai";
import { loadEmbeddingIndex } from "../../../../lib/embeddings";
import { topK } from "../../../../lib/retrieve";
import { systemPrompt, userPrompt } from "../../../../lib/prompt";

export const runtime = "nodejs"; // or "edge" if you prefer

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== "string") {
      return new Response("Invalid question", { status: 400 });
    }

    // Get API key from environment or fallback
    const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    
    if (!apiKey) {
      return new Response(
        "Error: OPENAI_API_KEY environment variable is not set. Please check your .env.local file.",
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });
    const embedModel =
      process.env.OPENAI_EMBED_MODEL || "text-embedding-3-small";
    const chatModel = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";

    // 1) Try to load embeddings, handle case when none available
    let hits: Array<{ id: string; source: string; text: string; score: number }> = [];
    let hasEmbeddings = true;
    
    try {
      const index = loadEmbeddingIndex();
      
      // 2) embed query if we have embeddings
      const qEmbed = await openai.embeddings.create({ model: embedModel, input: question });
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
      ? hits.map(h => \`[\${h.source}] \${h.text}\`).join('\\n\\n')
      : undefined;
    const usr = hasEmbeddings 
      ? userPrompt(question, context)
      : userPrompt(question);

    // 5) stream
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
        for await (const chunk of stream) {
          const delta = chunk.choices?.[0]?.delta?.content ?? "";
          if (delta) {
            controller.enqueue(encoder.encode(delta));
          }
        }
        // Append sources at the end in a special format
        const sources = hasEmbeddings ? hits.map(h => h.source) : ["General AI Knowledge"];
        controller.enqueue(encoder.encode(\`SOURCES:\${JSON.stringify(sources)}\`));
        controller.close();
      }
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache"
      }
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
    return new Response(\`Error: \${errorMessage}\`, { status: 500 });
  }
}
\`\`\`

### 5.2 Create src/app/api/build-embeddings/route.ts
This processes uploaded files:

\`\`\`typescript
import { NextRequest, NextResponse } from "next/server";
import { buildEmbeddingIndexFromFiles } from "../../../../lib/embeddings";
import type { UploadedFile } from "../../../../lib/types";

export async function POST(req: NextRequest) {
  try {
    const { files }: { files: UploadedFile[] } = await req.json();

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Build embeddings from uploaded files
    const chunks = await buildEmbeddingIndexFromFiles(files);

    return NextResponse.json({
      success: true,
      message: \`Built embeddings for \${chunks.length} chunks from \${files.length} files\`,
    });
  } catch (error) {
    console.error("Error building embeddings:", error);
    return NextResponse.json(
      { error: "Failed to build embeddings" },
      { status: 500 }
    );
  }
}
\`\`\``,
    },
    {
      section: "code",
      title: "Step 6: Main User Interface",
      content: `### 6.1 Create src/app/globals.css
\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Prose styling for markdown content */
.prose {
  color: inherit;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: inherit;
}

.prose p {
  margin: 0.5rem 0;
}

.prose ul, .prose ol {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.prose li {
  margin: 0.25rem 0;
}

.prose code {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.prose pre {
  background: rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.prose pre code {
  background: none;
  padding: 0;
}

.prose blockquote {
  border-left: 4px solid rgba(255, 255, 255, 0.3);
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
}

.prose a {
  color: #60a5fa;
  text-decoration: underline;
}

.prose a:hover {
  color: #93c5fd;
}
\`\`\`

### 6.2 Create src/app/layout.tsx
\`\`\`typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Resume Chat Bot",
  description: "Intelligent resume analysis powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
\`\`\`

### 6.3 Create src/app/page.tsx
This is the main interface with file upload and chat functionality:

\`\`\`typescript
"use client";
// UI: input, chat, streaming, file upload with premium design
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DocumentPlusIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import { Sparkles, Brain, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import type { Message, UploadedFile } from "../../lib/types";

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [embeddingsReady, setEmbeddingsReady] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [candidateName, setCandidateName] = useState<string>("");
  const [hasIntroduced, setHasIntroduced] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Extract candidate name from resume content
  function extractCandidateName(files: UploadedFile[]): string {
    const resumeFile = files.find((f) => f.type === "resume");
    if (!resumeFile) return "the candidate";

    // Simple name extraction - look for common patterns
    const content = resumeFile.content;
    const lines = content.split("\n").slice(0, 10); // Check first 10 lines

    for (const line of lines) {
      // Look for name patterns like "# John Doe" or "John Doe - Software Engineer"
      const nameMatch =
        line.match(/^#\s*([A-Z][a-z]+ [A-Z][a-z]+)/) ||
        line.match(/^([A-Z][a-z]+ [A-Z][a-z]+)\s*[-–—]/) ||
        line.match(/^([A-Z][a-z]+ [A-Z][a-z]+)\s*$/) ||
        line.match(/Name:\s*([A-Z][a-z]+ [A-Z][a-z]+)/);

      if (nameMatch && nameMatch[1]) {
        return nameMatch[1];
      }
    }
    return "the candidate";
  }

  // Generate introduction message
  async function generateIntroMessage(name: string) {
    if (hasIntroduced) return;

    const displayName = name === "the candidate" ? "this candidate" : name;
    const introText = \`Hi there! I've analyzed **\${displayName}'s** résumé and project files. 

Ask me anything about their background, experience, or what specific skills they bring to the table!\`;

    const introMessage: Message = {
      role: "assistant",
      text: introText,
      sources: ["AI Introduction"],
    };

    setMessages((prev) => [...prev, introMessage]);
    setHasIntroduced(true);

    // Auto-speak a shorter version of the introduction
    const spokenText = \`Hi there! I've analyzed \${displayName}'s résumé and project files. Ask me anything about their experience, skills, or what makes them unique.\`;
    setTimeout(() => speakAnswer(spokenText), 1000);
  }

  // Handle file upload
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    for (const file of files) {
      if (file.name.endsWith(".md") || file.name.endsWith(".txt")) {
        const content = await file.text();
        const type = file.name.toLowerCase().includes("resume")
          ? "resume"
          : "project";
        newFiles.push({ name: file.name, content, type });
      }
    }

    const allFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(allFiles);

    // Extract candidate name from uploaded files
    const extractedName = extractCandidateName(allFiles);
    setCandidateName(extractedName);

    // Build embeddings for uploaded files
    if (newFiles.length > 0) {
      try {
        const response = await fetch("/api/build-embeddings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ files: newFiles }),
        });

        if (response.ok) {
          setEmbeddingsReady(true);

          // Generate introduction message after embeddings are ready
          setTimeout(() => generateIntroMessage(extractedName), 1000);
        }
      } catch (error) {
        console.error("Failed to build embeddings:", error);
      }
    }
  }

  // Voice input handler
  function startListening() {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported");
      return;
    }

    const recognition = new (
      window as unknown as { webkitSpeechRecognition: new () => unknown }
    ).webkitSpeechRecognition() as {
      continuous: boolean;
      interimResults: boolean;
      onresult:
        | ((event: {
            results: {
              [key: number]: { [key: number]: { transcript: string } };
            };
          }) => void)
        | null;
      onerror: ((event: unknown) => void) | null;
      onend: (() => void) | null;
      start: () => void;
    };

    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);
    recognition.onresult = (event: {
      results: { [key: number]: { [key: number]: { transcript: string } } };
    }) => {
      const transcript = event.results[0][0].transcript;
      setQ(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  }

  // Text-to-speech handler
  function speakAnswer(text: string) {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  }

  // Ask AI function
  async function ask(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim() || loading) return;

    const userMsg: Message = { role: "user", text: q.trim() };
    setMessages((m) => [
      ...m,
      userMsg,
      { role: "assistant", text: "", sources: [] },
    ]);
    setQ("");
    setLoading(true);

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userMsg.text }),
    });

    if (!res.body) {
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let acc = "";
    let sources: string[] = [];

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);

      // Check if this chunk contains source information
      if (chunk.includes("SOURCES:")) {
        const [text, sourcesStr] = chunk.split("SOURCES:");
        acc += text;
        if (sourcesStr) {
          try {
            sources = JSON.parse(sourcesStr);
          } catch (e) {
            console.error("Failed to parse sources:", e);
          }
        }
      } else {
        acc += chunk;
      }

      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", text: acc, sources };
        return copy;
      });
      areaRef.current?.scrollTo({
        top: areaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

    // Auto-speak the answer
    if (acc && !isSpeaking) {
      speakAnswer(acc);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-black">
      <main className="mx-auto max-w-full px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              AI Resume Chat Bot
            </h1>
          </div>

          {candidateName && candidateName !== "the candidate" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 max-w-md mx-auto"
            >
              <p className="text-gray-300 text-lg">
                Currently analyzing:{" "}
                <span className="text-cyan-300 font-semibold">
                  {candidateName}
                </span>
              </p>
              <p className="text-gray-400 text-sm">
                Ask me anything about their experience and skills!
              </p>
            </motion.div>
          ) : (
            <p className="text-gray-300 text-lg">
              Upload candidate files and unlock AI-powered insights with
              intelligent questioning
            </p>
          )}

          {/* Tutorial Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-6"
          >
            <Link
              href="/tutorial"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-400 hover:to-pink-400 transition-all duration-200 font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              <Sparkles className="w-5 h-5" />
              Learn to Build It
            </Link>
          </motion.div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-[2fr_3fr] gap-4 min-h-[75vh]">
          {/* Left Column - File Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <DocumentPlusIcon className="w-6 h-6 text-cyan-400" />
              Upload Resume and Project Files
            </h2>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".md,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div className="flex flex-col space-y-6">
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full group border-2 border-dashed border-white/30 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-all duration-300 bg-white/5 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: uploadedFiles.length > 0 ? 360 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <DocumentPlusIcon className="w-10 h-10 mx-auto mb-3 text-cyan-300 group-hover:text-cyan-200 transition-colors" />
                </motion.div>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors mb-2">
                  Click to upload resume and project files
                </p>
                <p className="text-xs text-gray-400">
                  Supports .md and .txt formats
                </p>
              </motion.button>

              <div className="flex-1 space-y-4 min-h-0">
                <p className="text-base font-medium text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  Uploaded Files
                </p>
                {uploadedFiles.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-8">
                    No files uploaded yet
                  </p>
                ) : (
                  <div className="space-y-3 overflow-auto flex-1 min-h-0 custom-scrollbar">
                    <AnimatePresence>
                      {uploadedFiles.map((file, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="flex items-center gap-3 text-sm bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/10"
                        >
                          <span
                            className={\`px-3 py-2 rounded-full text-xs font-medium \${
                              file.type === "resume"
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            }\`}
                          >
                            {file.type}
                          </span>
                          <span className="text-gray-200 flex-1 font-medium">
                            {file.name}
                          </span>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
                <AnimatePresence>
                  {embeddingsReady && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 text-sm text-emerald-400 font-medium bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20"
                    >
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      {hasIntroduced
                        ? "Intelligence Ready - Ask Away!"
                        : "Preparing introduction..."}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Chat Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl h-[75vh] flex flex-col"
          >
            <div
              ref={areaRef}
              className="flex-1 overflow-auto p-6 space-y-4 bg-black custom-scrollbar"
            >
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mb-4">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-200 text-lg mb-2">
                    Ready for intelligent conversations
                  </p>
                  <p className="text-sm text-gray-400">
                    Upload files and discover insights through AI-powered
                    questioning
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {[
                      "What technologies does this person use?",
                      "Tell me about their recent achievements",
                      "What's their experience level?",
                    ].map((suggestion, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        onClick={() => setQ(suggestion)}
                        className="text-xs bg-white/10 text-gray-300 px-3 py-2 rounded-full hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/10"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <AnimatePresence>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className={\`flex gap-3 \${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }\`}
                  >
                    {/* Avatar for AI */}
                    {m.role === "assistant" && (
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                    )}

                    <div
                      className={\`max-w-[75%] \${
                        m.role === "user" ? "order-2" : ""
                      }\`}
                    >
                      <div
                        className={\`p-4 rounded-2xl shadow-lg \${
                          m.role === "user"
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white ml-auto"
                            : "bg-white/90 backdrop-blur-md text-gray-800 border border-white/20"
                        }\`}
                      >
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown>{m.text}</ReactMarkdown>
                        </div>

                        {m.sources && m.sources.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 pt-3 border-t border-gray-300/30"
                          >
                            <div className="flex flex-wrap gap-1 mb-2">
                              {m.sources.map((source, idx) => (
                                <motion.button
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="px-2 py-1 text-xs rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                                >
                                  {source}
                                </motion.button>
                              ))}
                            </div>

                            <button
                              onClick={() => speakAnswer(m.text)}
                              disabled={isSpeaking}
                              className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
                            >
                              <SpeakerWaveIcon className="w-3 h-3" />
                              {isSpeaking ? "Speaking..." : "Listen"}
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Avatar for User */}
                    {m.role === "user" && (
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-start gap-3"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 text-gray-700 border border-white/20 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7],
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">
                          AI is thinking...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Form */}
            <div className="border-t border-white/10 bg-black/20 backdrop-blur-md p-6">
              <form onSubmit={ask} className="flex gap-3">
                <motion.button
                  type="button"
                  onClick={startListening}
                  disabled={isListening || loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={\`p-3 rounded-xl transition-all duration-200 \${
                    isListening
                      ? "bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/25"
                      : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                  }\`}
                >
                  <motion.div
                    animate={isListening ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    <MicrophoneIcon
                      className={\`w-5 h-5 \${
                        isListening ? "text-white" : "text-gray-300"
                      }\`}
                    />
                  </motion.div>
                </motion.button>

                <div className="flex-1 relative">
                  <input
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200"
                    placeholder="Ask intelligent questions about experience, skills, projects..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    disabled={loading}
                  />
                  {q && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    </motion.div>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={
                    loading ||
                    !q.trim() ||
                    (uploadedFiles.length > 0 && !embeddingsReady)
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg shadow-cyan-500/25"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Ask AI
                  </span>
                </motion.button>
              </form>

              {isClient && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs text-gray-400 mt-3 flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                  Powered by AI intelligence • Answers sourced from uploaded
                  files
                  {uploadedFiles.length === 0 &&
                    " • Upload files to unlock insights"}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
\`\`\``,
    },
    {
      section: "code",
      title: "Step 7: Configuration Files",
      content: `### 7.1 Create next.config.ts
\`\`\`typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
\`\`\`

### 7.2 Create tailwind.config.ts
\`\`\`typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
\`\`\`

### 7.3 Create postcss.config.mjs
\`\`\`javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
\`\`\`

### 7.4 Create tsconfig.json
\`\`\`json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
\`\`\`

### 7.5 Create eslint.config.mjs
\`\`\`javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
\`\`\`

### 7.6 Create .gitignore
\`\`\`gitignore
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# embeddings
embeddings.json
\`\`\``,
    },
    {
      section: "deploy",
      title: "Step 7: Testing Your Application",
      content: `### 7.1 Start the Development Server
\`\`\`bash
npm run dev
\`\`\`

### 7.2 Open Your Browser
1. Go to [http://localhost:3000](http://localhost:3000)
2. You should see your beautiful AI Resume Intelligence app!

### 7.3 Test the Features
1. **Upload Files:** Click the upload area and select your sample resume files
2. **Wait for Processing:** The app will process your files (this might take a few seconds)
3. **Ask Questions:** Try asking questions like:
   - "What programming languages does this person know?"
   - "Tell me about their recent projects"
   - "What's their experience level?"

### 7.4 Test Voice Features
1. Click the microphone button to test voice input
2. Click the "Listen" button on AI responses to test text-to-speech`,
    },
    {
      section: "deploy",
      title: "Step 8: Deploying to Vercel",
      content: `### 8.1 Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Create a new repository named \`ai-resume-chatbot\`
3. Connect your local project:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit: AI Resume Chat Bot"
   git remote add origin https://github.com/YOUR_USERNAME/ai-resume-chatbot.git
   git push -u origin main
   \`\`\`

### 8.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project" and import your repository
4. Add environment variables:
   - \`OPENAI_API_KEY\`: Your actual OpenAI API key
   - \`OPENAI_CHAT_MODEL\`: \`gpt-4o-mini\`
   - \`OPENAI_EMBED_MODEL\`: \`text-embedding-3-small\`
5. Click "Deploy"

### 8.3 Your App is Live!
Your app will be available at a URL like \`https://ai-resume-chatbot-xyz.vercel.app\``,
    },
  ];

  const getStepsForSection = (sectionId: string) => {
    return steps.filter((step) => step.section === sectionId);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 text-white hover:text-cyan-300 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to App</span>
            </Link>
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-cyan-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Build Tutorial
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Sections
              </h2>
              <div className="space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(index)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                      activeSection === index
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {(() => {
                      const IconComponent = section.icon;
                      return <IconComponent className="w-5 h-5" />;
                    })()}
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Tips
              </h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Make sure Node.js is installed before starting</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Get your OpenAI API key ready</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Follow the steps in order</span>
                </div>
                <div className="flex items-start gap-2">
                  <ExclamationTriangleIcon className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Test each step before moving to the next</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Section Header */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`p-3 bg-gradient-to-r ${sections[activeSection].color} rounded-xl`}
                >
                  {(() => {
                    const IconComponent = sections[activeSection].icon;
                    return <IconComponent className="w-8 h-8 text-white" />;
                  })()}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {sections[activeSection].title}
                  </h1>
                  <p className="text-gray-300 mt-1">
                    {sections[activeSection].id === "overview" &&
                      "Understanding what we're building"}
                    {sections[activeSection].id === "setup" &&
                      "Getting your development environment ready"}
                    {sections[activeSection].id === "project" &&
                      "Creating the project structure and installing dependencies"}
                    {sections[activeSection].id === "code" &&
                      "Writing the core application code"}
                    {sections[activeSection].id === "deploy" &&
                      "Testing and deploying your application"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Steps for Current Section */}
            <div className="space-y-4">
              {getStepsForSection(sections[activeSection].id).map(
                (step, stepIndex) => (
                  <motion.div
                    key={stepIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: stepIndex * 0.1 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleStep(stepIndex)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {stepIndex + 1}
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <ChevronRightIcon
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedSteps.includes(stepIndex) ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedSteps.includes(stepIndex) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <div className="prose prose-invert max-w-none">
                              <div
                                className="text-gray-300 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html: step.content
                                    .replace(
                                      /\*\*(.*?)\*\*/g,
                                      '<strong class="text-white">$1</strong>'
                                    )
                                    .replace(
                                      /\`(.*?)\`/g,
                                      '<code class="bg-gray-800 text-cyan-300 px-2 py-1 rounded text-sm">$1</code>'
                                    )
                                    .replace(
                                      /```(\w+)?\n([\s\S]*?)```/g,
                                      '<pre class="bg-gray-900 text-gray-300 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>'
                                    )
                                    .replace(/\n/g, "<br />"),
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                disabled={activeSection === 0}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={() =>
                  setActiveSection(
                    Math.min(sections.length - 1, activeSection + 1)
                  )
                }
                disabled={activeSection === sections.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
