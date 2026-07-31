import React, { useState } from 'react';

interface Ticket {
  ticket_id: string;
  dispenser_id: string;
  title: string;
  priority: string;
  technician: string;
  status: string;
}

export function App() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      ticket_id: 'TICK-9081',
      dispenser_id: 'WD-005',
      title: 'Autonomous Alert: Pump Overheating & Friction on WD-005',
      priority: 'Critical',
      technician: 'Alex Rivera',
      status: 'Assigned'
    },
    {
      ticket_id: 'TICK-9082',
      dispenser_id: 'WD-002',
      title: 'Autonomous Alert: Filter Clogging & Flow Restriction on WD-002',
      priority: 'High',
      technician: 'Jordan Lee',
      status: 'Assigned'
    }
  ]);

  const dispatchNew = () => {
    const num = Math.floor(1000 + Math.random() * 9000);
    const dId = `WD-00${Math.floor(1 + Math.random() * 9)}`;
    const newT: Ticket = {
      ticket_id: `TICK-${num}`,
      dispenser_id: dId,
      title: `Autonomous Dispatch: Anomaly Detected on ${dId}`,
      priority: 'High',
      technician: 'Alex Rivera',
      status: 'Assigned'
    };
    setTickets([newT, ...tickets]);
  };

  const markComplete = (id: string) => {
    setTickets(tickets.map(t => t.ticket_id === id ? { ...t, status: 'Completed' } : t));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-cyan-400">📅 Agent 4: Autonomous Work Order & Dispatch Agent</h1>
          <p className="text-xs text-slate-400">Priority Job Queue, Tech Scheduling, Inventory Reservation & Audit Engine</p>
        </div>
        <button
          onClick={dispatchNew}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold rounded-lg text-xs shadow-lg hover:opacity-90 transition"
        >
          + Trigger Autonomous Dispatch
        </button>
      </header>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase">Active Campus Work Order Dispatch Queue</h3>
        {tickets.map((t) => (
          <div key={t.ticket_id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-cyan-300">{t.ticket_id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.priority === 'Critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                  {t.priority}
                </span>
                <span className="text-xs font-semibold text-slate-200">{t.dispenser_id}</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{t.title}</p>
              <div className="text-[11px] text-slate-400 flex gap-3 pt-1">
                <span>Assigned Tech: <strong className="text-cyan-400">{t.technician}</strong></span>
                <span>Inventory reserved: <strong className="text-emerald-400">1x RO Cartridge</strong></span>
              </div>
            </div>

            <div>
              {t.status === 'Completed' ? (
                <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 font-bold rounded-lg text-xs border border-emerald-500/30">
                  ✓ Service Completed
                </span>
              ) : (
                <button
                  onClick={() => markComplete(t.ticket_id)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-bold transition"
                >
                  Verify & Sign Off
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
