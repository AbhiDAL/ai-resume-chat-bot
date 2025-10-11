// system + user prompt builders
// /lib/prompt.ts
export function systemPrompt() {
  return `You are a helpful assistant that answers questions using the candidate’s résumé and projects.
- Be concise and specific.
- Cite the snippets you used as [source:file-or-section].
- If the answer is not in the provided text, say you do not know.`;
}

export function userPrompt(q: string, snippets: {source:string; text:string}[]) {
  const ctx = snippets.map(s => `[${s.source}] ${s.text}`).join("\n\n");
  return `Question: ${q}

Use this information:
${ctx}

Give a short, direct answer and mention which parts you used.`;
}
