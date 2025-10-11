"use client";
// UI: input, chat, streaming, file upload
import { useRef, useState } from "react";
import { DocumentPlusIcon, MicrophoneIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import type { Message, UploadedFile } from "../../lib/types";

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [embeddingsReady, setEmbeddingsReady] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload handler
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    for (const file of files) {
      if (file.name.endsWith('.md') || file.name.endsWith('.txt')) {
        const content = await file.text();
        const type = file.name.toLowerCase().includes('resume') ? 'resume' : 'project';
        newFiles.push({ name: file.name, content, type });
      }
    }
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Build embeddings for uploaded files
    if (newFiles.length > 0) {
      setLoading(true);
      try {
        await fetch("/api/build-embeddings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ files: [...uploadedFiles, ...newFiles] }),
        });
        setEmbeddingsReady(true);
      } catch (error) {
        console.error("Failed to build embeddings:", error);
      }
      setLoading(false);
    }
  }

  // Voice input handler
  function startListening() {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported');
      return;
    }
    
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    setIsListening(true);
    recognition.onresult = (event: any) => {
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
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    if (!embeddingsReady && uploadedFiles.length > 0) {
      alert("Please wait for embeddings to be built first.");
      return;
    }

    const userMsg: Message = { role: "user", text: q.trim() };
    setMessages(m => [...m, userMsg, { role: "assistant", text: "", sources: [] }]);
    setQ("");
    setLoading(true);

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ question: userMsg.text }),
    });

    if (!res.body) { setLoading(false); return; }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let acc = "";
    let sources: string[] = [];
    
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      
      // Check if this chunk contains source information
      if (chunk.includes('SOURCES:')) {
        const [text, sourcesStr] = chunk.split('SOURCES:');
        acc += text;
        if (sourcesStr) {
          sources = JSON.parse(sourcesStr);
        }
      } else {
        acc += chunk;
      }
      
      setMessages(m => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", text: acc, sources };
        return copy;
      });
      areaRef.current?.scrollTo({ top: areaRef.current.scrollHeight, behavior: "smooth" });
    }
    
    // Auto-speak the answer
    if (acc && !isSpeaking) {
      speakAnswer(acc);
    }
    
    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">AI Résumé Chatbot</h1>
      <p className="text-sm text-gray-500">
        About this bot: answers come only from my résumé and project notes. If the info isn’t present, it will say it doesn’t know.
      </p>
      <div ref={areaRef} className="border rounded-xl p-4 h-[50vh] overflow-auto space-y-3">
        {messages.map((m,i)=>(
          <div key={i} className={m.role==="user" ? "text-right" : "text-left"}>
            <div className={`inline-block px-3 py-2 rounded-xl ${m.role==="user" ? "bg-gray-200" : "bg-gray-100"}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-sm text-gray-400">Thinking…</div>}
      </div>
      <form onSubmit={ask} className="flex gap-2">
        <input
          className="flex-1 border rounded-xl px-3 py-2"
          placeholder="Ask about my experience, tech stack, outcomes…"
          value={q}
          onChange={e=>setQ(e.target.value)}
        />
        <button className="px-4 py-2 rounded-xl bg-black text-white">Ask</button>
      </form>
    </main>
  );
}
