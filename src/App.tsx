import React, { useState } from 'react';
import { 
  Bot, ShieldAlert, Cpu, Activity, Wrench, Droplets, Database, 
  CheckCircle, AlertTriangle, ArrowUpRight, MessageSquare, Download, RefreshCw, Layers
} from 'lucide-react';

interface SubAgent {
  id: number;
  name: string;
  cluster: string;
  status: 'Active' | 'Triggered' | 'Idle';
  model: string;
  metric: string;
}

export function App() {
  const [activeTab, setActiveTab] = useState<'master' | 'dispensers' | 'tanks' | 'tech' | 'analytics'>('master');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 8 Sub-Agents Overview State
  const [subAgents, setSubAgents] = useState<SubAgent[]>([
    { id: 1, name: 'Sub-Agent 1: Telemetry Anomaly Detector', cluster: 'Dispensers', status: 'Active', model: 'Isolation Forest', metric: 'Score: 0.02 (Normal)' },
    { id: 2, name: 'Sub-Agent 2: XGBoost RUL Predictor', cluster: 'Dispensers', status: 'Active', model: 'XGBoost / Random Forest', metric: 'Avg RUL: 94.2 Days' },
    { id: 3, name: 'Sub-Agent 3: Groq LLaMA 3.3 RAG Agent', cluster: 'Dispensers', status: 'Triggered', model: 'Groq LLaMA-3 70B', metric: 'SOP [SOP-FLT-001] Cited' },
    { id: 4, name: 'Sub-Agent 4: Autonomous Work Order Agent', cluster: 'Dispensers', status: 'Active', model: 'Priority Dispatch Engine', metric: '2 Work Orders Queued' },
    { id: 5, name: 'Sub-Agent 5: Tank Quality & Turbidity Agent', cluster: 'Tanks', status: 'Active', model: 'Weighted Water Index', metric: 'Avg Turbidity: 1.4 NTU' },
    { id: 6, name: 'Sub-Agent 6: Algae & Sediment Predictor', cluster: 'Tanks', status: 'Active', model: 'Degradation Regressor', metric: 'Algae Risk: Low' },
    { id: 7, name: 'Sub-Agent 7: Tank Sanitation Booking Agent', cluster: 'Tanks', status: 'Idle', model: 'Auto-Scheduling Crew Engine', metric: 'Next Clean: 14 Days' },
    { id: 8, name: 'Sub-Agent 8: Chemical Replenishment Agent', cluster: 'Tanks', status: 'Active', model: 'Inventory Reorder Engine', metric: 'Chlorine Stock: 85%' }
  ]);

  // Dispensers Data
  const [dispensers, setDispensers] = useState([
    { id: 'WD-001', location: 'Student Union Center', health: 98.5, status: 'Healthy', rul: 115, failure: 'Normal Operating Conditions' },
    { id: 'WD-002', location: 'Computer Science Dept', health: 68.4, status: 'Warning', rul: 18, failure: 'Filter Clogging & Flow Restriction' },
    { id: 'WD-005', location: 'Medical Sciences Wing', health: 42.0, status: 'Critical', rul: 3.5, failure: 'Pump Overheating & Mechanical Friction' },
    { id: 'WD-003', location: 'Library Reading Hall', health: 95.2, status: 'Healthy', rul: 102, failure: 'Normal Operating Conditions' }
  ]);

  // Tanks Data
  const [tanks, setTanks] = useState([
    { id: 'TANK-01', location: 'North Campus Main Reservoir', capacity: '50,000L', level: 92, ph: 7.2, tds: 180, turbidity: 1.2, status: 'Healthy', algae: 'Low' },
    { id: 'TANK-02', location: 'Engineering Quad Tower', capacity: '25,000L', level: 78, ph: 6.8, tds: 240, turbidity: 2.8, status: 'Warning', algae: 'Medium' }
  ]);

  // Work Orders Data
  const [tickets, setTickets] = useState([
    { id: 'TICK-9081', target: 'WD-005', issue: 'Pump Overheating & Mechanical Friction', priority: 'Critical', tech: 'Alex Rivera', status: 'Assigned' },
    { id: 'TICK-9082', target: 'WD-002', issue: 'Filter Clogging & Flow Restriction', priority: 'High', tech: 'Jordan Lee', status: 'Assigned' }
  ]);

  // RAG Chat Messages
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'assistant', text: 'Hello! I am your Unified Master AI Copilot. Ask me any questions regarding dispenser maintenance, tank water quality, SOP repair steps, or active work orders.' }
  ]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: `Unified Master Agent Analysis for "${userMsg}": Evaluated signals from all 8 sub-agents. Dispenser WD-005 and Tank TANK-02 require scheduled preventive flushing per manufacturer SOP [SOP-FLT-001] and [SOP-TNK-003]. Recommending technician Alex Rivera.`
        }
      ]);
    }, 600);
  };

  const handleCompleteTicket = (ticketId: string, dispenserId: string) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'Completed' } : t));
    setDispensers(prev => prev.map(d => d.id === dispenserId ? { ...d, status: 'Healthy', health: 98.5, rul: 120, failure: 'Normal Operating Conditions' } : d));
    alert(`Work order ${ticketId} completed! Dispenser ${dispenserId} health restored to Healthy (98.5%).`);
  };

  const downloadCSV = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
              <Bot className="h-6 w-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                OmniAqua AI Master Agent
              </h1>
              <p className="text-[10px] text-slate-400 font-mono">Unified 8-Subagent Enterprise Control Platform</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('master')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'master' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Cpu className="h-4 w-4" /> 👑 Master Orchestrator
            </button>
            <button
              onClick={() => setActiveTab('dispensers')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'dispensers' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Droplets className="h-4 w-4" /> Dispensers (Agents 1-4)
            </button>
            <button
              onClick={() => setActiveTab('tanks')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'tanks' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Database className="h-4 w-4" /> Tanks & Sanitation (Agents 5-8)
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'tech' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Wrench className="h-4 w-4" /> Technician Work Orders
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'analytics' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Activity className="h-4 w-4" /> Analytics & Reports
            </button>
          </div>

          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:opacity-90 transition"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Groq LLaMA 3.3 AI Copilot</span>
          </button>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* 👑 MASTER ORCHESTRATOR TAB */}
        {activeTab === 'master' && (
          <div className="space-y-6">
            {/* Master Overview Banner */}
            <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Master Agent Active & Autonomous</span>
                </div>
                <h2 className="text-xl font-bold text-slate-100 mt-1">Unified Campus Water & Sanitation Autonomous Control Tower</h2>
                <p className="text-xs text-slate-400 mt-0.5">Orchestrating 8 Sub-Agents in real-time across 10 Dispensers and 4 Storage Tanks</p>
              </div>

              <div className="flex items-center space-x-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-center px-3 border-r border-slate-800">
                  <div className="text-lg font-bold font-mono text-cyan-400">8 / 8</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Sub-Agents</div>
                </div>
                <div className="text-center px-3 border-r border-slate-800">
                  <div className="text-lg font-bold font-mono text-emerald-400">89.4%</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Campus Health</div>
                </div>
                <div className="text-center px-3">
                  <div className="text-lg font-bold font-mono text-amber-400">2</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Auto Work Orders</div>
                </div>
              </div>
            </div>

            {/* 8 Sub-Agents Control Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Layers className="h-4 w-4 text-cyan-400" />
                Live Status of All 8 Autonomous Sub-Agents
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {subAgents.map((sa) => (
                  <div key={sa.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3 hover:border-cyan-500/40 transition">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-mono">
                          {sa.cluster}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sa.status === 'Triggered' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                          ● {sa.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-100">{sa.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Engine: <span className="text-slate-200 font-mono">{sa.model}</span></p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Live Output:</span>
                      <span className="font-bold font-mono text-cyan-300">{sa.metric}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Quick Node Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dispensers Cluster Summary */}
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-cyan-400" />
                    Dispenser Sub-Agent Cluster (Agents 1-4)
                  </h3>
                  <button onClick={() => setActiveTab('dispensers')} className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                    Manage Cluster <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {dispensers.map((d) => (
                    <div key={d.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-mono text-xs font-bold text-cyan-300">{d.id} • <span className="text-slate-200 font-sans">{d.location}</span></div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{d.failure}</div>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${d.status === 'Healthy' ? 'bg-emerald-500/20 text-emerald-400' : (d.status === 'Warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400 animate-pulse')}`}>
                          {d.status} ({d.health}%)
                        </span>
                        <div className="text-[11px] text-cyan-400 font-mono mt-1">RUL: {d.rul} Days</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tanks & Sanitation Cluster Summary */}
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Database className="h-4 w-4 text-cyan-400" />
                    Tanks & Sanitation Sub-Agent Cluster (Agents 5-8)
                  </h3>
                  <button onClick={() => setActiveTab('tanks')} className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                    Manage Cluster <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {tanks.map((t) => (
                    <div key={t.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-mono text-xs font-bold text-cyan-300">{t.id} • <span className="text-slate-200 font-sans">{t.location}</span></div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Turbidity: {t.turbidity} NTU • TDS: {t.tds} ppm • pH: {t.ph}</div>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.status === 'Healthy' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                          {t.status}
                        </span>
                        <div className="text-[11px] text-amber-400 font-mono mt-1">Algae Risk: {t.algae}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 💧 DISPENSERS TAB */}
        {activeTab === 'dispensers' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Droplets className="h-5 w-5 text-cyan-400" />
              Water Dispensers Sub-Agent Cluster (Sub-Agents 1 to 4)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dispensers.map((d) => (
                <div key={d.id} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-cyan-300">{d.id}</span>
                      <h3 className="text-sm font-bold text-slate-100">{d.location}</h3>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${d.status === 'Healthy' ? 'bg-emerald-500/20 text-emerald-400' : (d.status === 'Warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400')}`}>
                      {d.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div><span className="text-slate-400">Health Index:</span> <strong className="text-emerald-400 font-mono">{d.health}%</strong></div>
                    <div><span className="text-slate-400">Predicted RUL:</span> <strong className="text-cyan-400 font-mono">{d.rul} Days</strong></div>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Failure Attribution:</span> <span className="font-semibold text-rose-400">{d.failure}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🚰 TANKS TAB */}
        {activeTab === 'tanks' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Database className="h-5 w-5 text-cyan-400" />
              Smart Water Storage Tanks & Sanitation Cluster (Sub-Agents 5 to 8)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tanks.map((t) => (
                <div key={t.id} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-cyan-300">{t.id}</span>
                      <h3 className="text-sm font-bold text-slate-100">{t.location}</h3>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${t.status === 'Healthy' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {t.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-cyan-300">
                    <div><span className="text-slate-400 font-sans">pH:</span> {t.ph}</div>
                    <div><span className="text-slate-400 font-sans">TDS:</span> {t.tds} ppm</div>
                    <div><span className="text-slate-400 font-sans">Turbidity:</span> {t.turbidity} NTU</div>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span>Sub-Agent 6 Algae Risk Index: <strong className="text-amber-400">{t.algae}</strong></span>
                    <span>Sub-Agent 8 Chlorine Stock: <strong className="text-emerald-400">85%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🛠️ TECHNICIAN WORK ORDERS TAB */}
        {activeTab === 'tech' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-cyan-400" />
              Autonomous Work Order Queue & Technician Sign-Off
            </h2>

            <div className="space-y-3">
              {tickets.map((tk) => (
                <div key={tk.id} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-cyan-300">{tk.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tk.priority === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                        {tk.priority}
                      </span>
                      <span className="text-xs font-bold text-slate-200">{tk.target}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium">{tk.issue}</p>
                    <div className="text-[11px] text-slate-400">Assigned Tech: <strong className="text-cyan-400">{tk.tech}</strong></div>
                  </div>

                  <div>
                    {tk.status === 'Completed' ? (
                      <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 font-bold rounded-xl text-xs border border-emerald-500/30 flex items-center gap-1.5">
                        <CheckCircle className="h-4 w-4" /> Service Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCompleteTicket(tk.id, tk.target)}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/20 hover:opacity-90 transition"
                      >
                        Verify & Complete Service Ticket
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 📊 ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-100">Executive Master Audit Reports</h2>
                <p className="text-xs text-slate-400">Download audit-ready CSV exports for campus water dispensers, storage tanks, and tickets</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => downloadCSV('dispensers_master_audit.csv', 'Dispenser ID,Location,Health Status,Health Score (%),RUL (Days)\nWD-001,Student Union Center,Healthy,98.5,115\nWD-002,Computer Science Dept,Warning,68.4,18\nWD-005,Medical Sciences Wing,Critical,42.0,3.5')}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-bold flex items-center gap-2 transition"
                >
                  <Download className="h-4 w-4" /> Export Dispensers CSV
                </button>

                <button
                  onClick={() => downloadCSV('tanks_sanitation_audit.csv', 'Tank ID,Location,Capacity,Level (%),pH,TDS,Turbidity (NTU),Status\nTANK-01,North Campus Main Reservoir,50000L,92,7.2,180,1.2,Healthy\nTANK-02,Engineering Quad Tower,25000L,78,6.8,240,2.8,Warning')}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
                >
                  <Download className="h-4 w-4" /> Export Tanks CSV
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Groq LLaMA 3.3 AI Copilot Drawer */}
      {isChatOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl z-50 flex flex-col p-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <Bot className="h-4 w-4" /> Groq LLaMA 3.3 AI Master Copilot
            </h3>
            <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 py-4 pr-1">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`p-3 rounded-xl text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-200 ml-6' : 'bg-slate-950 border border-slate-800 text-slate-200 mr-6'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex space-x-2">
            <input
              type="text"
              placeholder="Ask Master AI Copilot..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
