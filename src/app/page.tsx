// UI: input, chat, streaming"use client";
import { useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function Page() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    const userMsg: Msg = { role: "user", text: q.trim() };
    setMessages(m => [...m, userMsg, { role: "assistant", text: "" }]);
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
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      acc += decoder.decode(value);
      setMessages(m => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", text: acc };
        return copy;
      });
      areaRef.current?.scrollTo({ top: areaRef.current.scrollHeight, behavior: "smooth" });
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
