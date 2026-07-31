import React, { useState } from 'react';
import { 
  Bot, ShieldAlert, Cpu, Activity, Wrench, Droplets, Database, 
  CheckCircle, AlertTriangle, ArrowUpRight, MessageSquare, Download, RefreshCw, Layers,
  UserCheck, MapPin, Users, CheckSquare, Camera, Sparkles, FileText, Send
} from 'lucide-react';
import { AuthProvider, useAuth, UserRole } from './context/AuthContext';

interface SubAgent {
  id: number;
  name: string;
  cluster: string;
  status: 'Active' | 'Triggered' | 'Idle';
  model: string;
  metric: string;
}

function MainDashboard() {
  const { role, setRole, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'master' | 'admin' | 'tech' | 'user' | 'dispensers' | 'tanks' | 'analytics'>('master');
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

  // Work Orders Data (with repair checklist)
  const [tickets, setTickets] = useState([
    { 
      id: 'TICK-9081', 
      target: 'WD-005', 
      issue: 'Pump Overheating & Mechanical Friction', 
      priority: 'Critical', 
      tech: 'Alex Rivera', 
      status: 'Assigned',
      checklist: [
        { id: 1, text: 'Isolate water intake supply valve', done: true },
        { id: 2, text: 'Inspect centrifugal pump motor winding', done: true },
        { id: 3, text: 'Clear physical debris from impeller housing', done: false },
        { id: 4, text: 'Verify post-repair flow rate & pressure', done: false }
      ]
    },
    { 
      id: 'TICK-9082', 
      target: 'WD-002', 
      issue: 'Filter Clogging & Flow Restriction', 
      priority: 'High', 
      tech: 'Jordan Lee', 
      status: 'Assigned',
      checklist: [
        { id: 1, text: 'Shut off intake supply line', done: true },
        { id: 2, text: 'Replace 20-micron sediment filter cartridge', done: false },
        { id: 3, text: 'Perform 5-minute backwash flush cycle', done: false }
      ]
    }
  ]);

  // User Resident Inspection Booking Form
  const [userBuilding, setUserBuilding] = useState('Student Union');
  const [userIssueType, setUserIssueType] = useState('Low Water Pressure');
  const [userNotes, setUserNotes] = useState('');
  const [userBookingSuccess, setUserBookingSuccess] = useState(false);

  // RAG Chat Messages
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'assistant', text: 'Hello! I am your Groq LLaMA 3.3 70B AI Master Copilot. Ask me any questions regarding dispenser maintenance, tank water quality, SOP repair steps, or active work orders.' }
  ]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let reply = `Groq LLaMA 3.3 Analysis for "${userMsg}": Evaluated signals from all 8 sub-agents. Dispenser WD-005 and Tank TANK-02 require scheduled preventive flushing per manufacturer SOP [SOP-FLT-001] and [SOP-TNK-003]. Assigned technician Alex Rivera.`;
      if (userMsg.toLowerCase().includes('tank')) {
        reply = `Groq LLaMA 3.3 Tank Analysis: Tank TANK-02 has turbidity 2.8 NTU. Sub-Agent 5 recommends executing sanitation flush cycle per SOP [SOP-TNK-003].`;
      } else if (userMsg.toLowerCase().includes('filter') || userMsg.toLowerCase().includes('rul')) {
        reply = `Groq LLaMA 3.3 Predictive RUL: Sub-Agent 2 forecasts Dispenser WD-005 filter RUL at 3.5 days. Auto work order TICK-9081 generated per SOP [SOP-FLT-001].`;
      }

      setChatMessages(prev => [
        ...prev,
        { sender: 'assistant', text: reply }
      ]);
    }, 600);
  };

  const handleToggleChecklist = (ticketId: string, itemIdx: number) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const newChecklist = [...t.checklist];
        newChecklist[itemIdx].done = !newChecklist[itemIdx].done;
        return { ...t, checklist: newChecklist };
      }
      return t;
    }));
  };

  const handleCompleteTicket = (ticketId: string, dispenserId: string) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'Completed' } : t));
    setDispensers(prev => prev.map(d => d.id === dispenserId ? { ...d, status: 'Healthy', health: 98.5, rul: 120, failure: 'Normal Operating Conditions' } : d));
  };

  const handleUserSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `TICK-${Math.floor(1000 + Math.random() * 9000)}`;
    setTickets(prev => [
      ...prev,
      {
        id: newId,
        target: userBuilding,
        issue: userIssueType + (userNotes ? `: ${userNotes}` : ''),
        priority: 'Medium',
        tech: 'Jordan Lee',
        status: 'Assigned',
        checklist: [
          { id: 1, text: 'Inspect building water line connection', done: false },
          { id: 2, text: 'Verify outflow sensor pressure', done: false }
        ]
      }
    ]);
    setUserBookingSuccess(true);
    setUserNotes('');
    setTimeout(() => setUserBookingSuccess(false), 4000);
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
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
              <Bot className="h-6 w-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                AquaSense-AI Platform v2.0
              </h1>
              <p className="text-[10px] text-slate-400 font-mono">Unified 8-Subagent Enterprise Control & Multi-Role Infrastructure</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('master')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'master' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Cpu className="h-4 w-4" /> 👑 Master
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'admin' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Users className="h-4 w-4" /> 🛡️ Admin Portal
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'tech' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Wrench className="h-4 w-4" /> 🛠️ Technician Dispatch
            </button>
            <button
              onClick={() => setActiveTab('user')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'user' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <UserCheck className="h-4 w-4" /> 👤 Resident View
            </button>
            <button
              onClick={() => setActiveTab('dispensers')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'dispensers' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Droplets className="h-4 w-4" /> Dispensers (1-4)
            </button>
            <button
              onClick={() => setActiveTab('tanks')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'tanks' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Database className="h-4 w-4" /> Tanks (5-8)
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'analytics' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Activity className="h-4 w-4" /> Audit Export
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Role Switcher Pill */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center text-[10px] font-bold">
              <button
                onClick={() => setRole('admin')}
                className={`px-2 py-1 rounded-lg ${role === 'admin' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Admin
              </button>
              <button
                onClick={() => setRole('technician')}
                className={`px-2 py-1 rounded-lg ${role === 'technician' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                Tech
              </button>
              <button
                onClick={() => setRole('user')}
                className={`px-2 py-1 rounded-lg ${role === 'user' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                User
              </button>
            </div>

            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:opacity-90 transition"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Groq LLaMA 3.3 AI Copilot</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* 👑 MASTER ORCHESTRATOR TAB */}
        {activeTab === 'master' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">AquaSense Master Control Active</span>
                </div>
                <h2 className="text-xl font-bold text-slate-100 mt-1">Unified Campus Water Infrastructure Autonomous Control Tower</h2>
                <p className="text-xs text-slate-400 mt-0.5">Orchestrating 8 Sub-Agents in real-time across Dispensers, Tanks, and Field Work Orders</p>
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
                  <div className="text-lg font-bold font-mono text-amber-400">{tickets.length}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Work Orders</div>
                </div>
              </div>
            </div>

            {/* 8 Sub-Agents Grid */}
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
          </div>
        )}

        {/* 🛡️ ADMIN PORTAL TAB */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-400" />
                  Executive Admin Control Portal
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage campus reservoirs, field engineers, system parameters, and RBAC permissions</p>
              </div>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 text-xs rounded-xl">
                Active User: {user?.full_name} ({user?.role.toUpperCase()})
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase text-slate-400">Campus Infrastructure Stats</h3>
                <div className="text-3xl font-extrabold text-cyan-400">14 Nodes</div>
                <p className="text-xs text-slate-300">10 Dispensers • 4 Main Water Storage Reservoirs</p>
              </div>
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase text-slate-400">Field Technicians Online</h3>
                <div className="text-3xl font-extrabold text-emerald-400">2 Technicians</div>
                <p className="text-xs text-slate-300">Alex Rivera (Rating: 4.9) • Jordan Lee (Rating: 4.8)</p>
              </div>
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase text-slate-400">AI Model Accuracy</h3>
                <div className="text-3xl font-extrabold text-amber-400">98.5%</div>
                <p className="text-xs text-slate-300">Groq LLaMA 3.3 RAG & XGBoost Predictor</p>
              </div>
            </div>
          </div>
        )}

        {/* 🛠️ SERVICE TECHNICIAN DISPATCH TAB */}
        {activeTab === 'tech' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-cyan-400" />
              Service Technician Field Dispatch & Work Order Queue
            </h2>

            <div className="space-y-4">
              {tickets.map((tk) => (
                <div key={tk.id} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-cyan-300">{tk.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tk.priority === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                          {tk.priority}
                        </span>
                        <span className="text-xs font-bold text-slate-200">{tk.target}</span>
                      </div>
                      <p className="text-xs text-slate-300 font-semibold mt-1">{tk.issue}</p>
                    </div>

                    <div>
                      {tk.status === 'Completed' ? (
                        <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 font-bold rounded-xl text-xs border border-emerald-500/30 flex items-center gap-1.5">
                          <CheckCircle className="h-4 w-4" /> Service Verified & Complete
                        </span>
                      ) : (
                        <button
                          onClick={() => handleCompleteTicket(tk.id, tk.target)}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/20 hover:opacity-90 transition"
                        >
                          Sign-Off & Complete Ticket
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Interactive Repair Checklist */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                      <CheckSquare className="h-4 w-4" /> Interactive AI Repair Checklist (Groq SOP Guided):
                    </h4>
                    <div className="space-y-1.5">
                      {tk.checklist.map((item, idx) => (
                        <label key={item.id} className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => handleToggleChecklist(tk.id, idx)}
                            className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-900"
                          />
                          <span className={item.done ? 'line-through text-slate-500' : ''}>{item.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 👤 RESIDENT USER VIEW TAB */}
        {activeTab === 'user' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-indigo-400" />
                Campus Resident Water Quality & Inspection Request
              </h2>
              <p className="text-xs text-slate-400">Residents can check live building water parameters and submit maintenance requests directly to Sub-Agent 4.</p>

              {userBookingSuccess && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Request submitted! Sub-Agent 4 auto-queued your inspection ticket.
                </div>
              )}

              <form onSubmit={handleUserSubmitBooking} className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Campus Building Location</label>
                    <select 
                      value={userBuilding} 
                      onChange={(e) => setUserBuilding(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-cyan-500"
                    >
                      <option value="Student Union">Student Union Center</option>
                      <option value="Computer Science Dept">Computer Science Dept</option>
                      <option value="Medical Sciences Wing">Medical Sciences Wing</option>
                      <option value="Library Reading Hall">Library Reading Hall</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Observed Issue Category</label>
                    <select 
                      value={userIssueType} 
                      onChange={(e) => setUserIssueType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-cyan-500"
                    >
                      <option value="Low Water Pressure">Low Water Pressure</option>
                      <option value="Filter Taste Anomaly">Filter Taste Anomaly</option>
                      <option value="Dispenser Nozzle Leakage">Dispenser Nozzle Leakage</option>
                      <option value="Water Temperature Variance">Water Temperature Variance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 text-xs font-semibold">Additional Observations / Notes</label>
                  <textarea
                    rows={3}
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="Describe issue details..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 hover:opacity-90 transition"
                >
                  <Send className="h-4 w-4" /> Submit Maintenance Request
                </button>
              </form>
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

        {/* 📊 ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-100">Executive Master Audit Reports</h2>
                <p className="text-xs text-slate-400">Download audit-ready CSV exports for campus water dispensers, storage tanks, and tickets</p>
              </div>

              <div className="flex flex-wrap gap-3">
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
              placeholder="Ask Groq LLaMA Copilot..."
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

export function App() {
  return (
    <AuthProvider>
      <MainDashboard />
    </AuthProvider>
  );
}

export default App;
