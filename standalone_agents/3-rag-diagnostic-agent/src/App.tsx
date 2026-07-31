import React, { useState } from 'react';

export function App() {
  const [query, setQuery] = useState('How to fix Error Code E-01 low water flow rate?');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    answer: string;
    sources: string[];
    confidence: number;
    steps: string[];
  }>({
    answer: 'Dispenser WD-002 is experiencing low water flow rate due to a clogged Stage 1 RO sediment filter or closed supply valve (Error Code E-01). Recommends immediate Stage 1 cartridge replacement.',
    sources: ['SOP: High-Pressure Water Booster Pump Diagnosis & Replacement', 'Error Code Reference Manual: E-01 to E-15', 'Groq Cloud (LLaMA 3.3 70B)'],
    confidence: 0.96,
    steps: [
      'Isolate main water supply check-valve',
      'Replace 5-stage RO sediment cartridge (Part #PART-FLT-01)',
      'Flush 10L water through supply line',
      'Reset LCD filter life counter'
    ]
  });

  const handleQuery = () => {
    setLoading(true);
    setTimeout(() => {
      setResponse({
        answer: `Analysis for "${query}": Based on manufacturer manual [SOP-FLT-001] and Groq Cloud LLaMA 3.3 70B inference, inspect supply line pressure and replace sediment filter cartridge.`,
        sources: ['SOP-FLT-001: 5-Stage RO Replacement', 'ERR-CODES-001 Manual', 'Groq LLaMA-3 70B'],
        confidence: 0.94,
        steps: [
          'Measure inlet pressure with gauge',
          'Inspect check valve for scale restriction',
          'Execute digital calibration reset'
        ]
      });
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-xl font-bold text-cyan-400">💬 Agent 3: Groq LLaMA 3.3 70B RAG Diagnostic Agent</h1>
        <p className="text-xs text-slate-400">Vector Knowledge Base & LLM SOP Reasoning Engine</p>
      </header>

      <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase">Ask Technical AI Copilot</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={handleQuery}
            disabled={loading}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-lg text-xs hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Querying Groq...' : 'Ask RAG Agent'}
          </button>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-cyan-400 uppercase">Diagnostic Result</span>
          <span className="text-xs font-mono text-emerald-400">Confidence: {(response.confidence * 100).toFixed(0)}%</span>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-lg border border-slate-800 font-sans">
          {response.answer}
        </p>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase">Recommended SOP Action Steps</h4>
          <div className="space-y-1.5">
            {response.steps.map((st, i) => (
              <div key={i} className="text-xs text-slate-300 bg-slate-950 px-3 py-2 rounded-md border border-slate-800 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Cited Sources:</span>
          <div className="flex gap-2">
            {response.sources.map((src, i) => (
              <span key={i} className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-cyan-300 font-mono">
                {src}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
