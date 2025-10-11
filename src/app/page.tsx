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
    <main className="mx-auto max-w-4xl p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">AI Résumé Chatbot</h1>
        <p className="text-gray-600">
          Upload your résumé and project files, then ask questions about the candidate's experience.
        </p>
      </div>

      {/* File Upload Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DocumentPlusIcon className="w-5 h-5" />
          Upload Files
        </h2>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".md,.txt"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors"
          >
            <DocumentPlusIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">
              Click to upload résumé and project files (.md, .txt)
            </p>
          </button>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
            {uploadedFiles.length === 0 ? (
              <p className="text-sm text-gray-500">No files uploaded yet</p>
            ) : (
              <div className="space-y-1">
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      file.type === 'resume' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {file.type}
                    </span>
                    <span className="text-gray-600">{file.name}</span>
                  </div>
                ))}
              </div>
            )}
            {embeddingsReady && (
              <div className="text-xs text-green-600 font-medium">✓ Embeddings ready</div>
            )}
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="border rounded-xl overflow-hidden">
        <div ref={areaRef} className="h-[50vh] overflow-auto p-4 space-y-4 bg-white">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p>Upload some files and ask questions about the candidate's experience!</p>
              <p className="text-sm mt-2">Try: "What programming languages does this person know?" or "Tell me about their recent projects"</p>
            </div>
          )}
          
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                m.role === "user" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 text-gray-800"
              }`}>
                <div>{m.text}</div>
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-300 text-xs">
                    <strong>Sources:</strong> {m.sources.join(", ")}
                    {m.role === "assistant" && (
                      <button
                        onClick={() => speakAnswer(m.text)}
                        className="ml-2 p-1 rounded hover:bg-gray-200"
                        disabled={isSpeaking}
                      >
                        <SpeakerWaveIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full"></div>
                  Thinking...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="border-t bg-gray-50 p-4">
          <form onSubmit={ask} className="flex gap-2">
            <button
              type="button"
              onClick={startListening}
              disabled={isListening || loading}
              className={`p-2 rounded-lg border ${
                isListening ? 'bg-red-100 border-red-300' : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              <MicrophoneIcon className={`w-5 h-5 ${isListening ? 'text-red-500' : 'text-gray-600'}`} />
            </button>
            
            <input
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ask about experience, skills, projects..."
              value={q}
              onChange={e => setQ(e.target.value)}
              disabled={loading}
            />
            
            <button 
              type="submit"
              disabled={loading || !q.trim() || (uploadedFiles.length > 0 && !embeddingsReady)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Ask
            </button>
          </form>
          
          <p className="text-xs text-gray-500 mt-2">
            💡 This bot answers questions using only the uploaded résumé and project files. 
            {uploadedFiles.length === 0 && " Upload files to get started!"}
          </p>
        </div>
      </div>
    </main>
  );
}