import React, { useState, useEffect } from 'react';

interface SensorData {
  flow_rate: number;
  pressure: number;
  temperature: number;
  current: number;
  vibration: number;
  anomaly_score: number;
  is_anomaly: boolean;
  status: string;
}

export function App() {
  const [sensors, setSensors] = useState<SensorData>({
    flow_rate: 3.6,
    pressure: 2.2,
    temperature: 11.4,
    current: 1.7,
    vibration: 0.04,
    anomaly_score: 0.02,
    is_anomaly: false,
    status: 'Healthy'
  });

  const [injectMode, setInjectMode] = useState<string>('Normal');

  const simulateTick = (mode: string) => {
    let flow = 3.5 + Math.random() * 0.4;
    let press = 2.1 + Math.random() * 0.3;
    let curr = 1.6 + Math.random() * 0.2;
    let vib = 0.03 + Math.random() * 0.02;
    let score = 0.02;
    let status = 'Healthy';
    let anomaly = false;

    if (mode === 'Clog') {
      flow = 0.6 + Math.random() * 0.3;
      press = 0.8 + Math.random() * 0.2;
      score = 0.88;
      status = 'Critical';
      anomaly = true;
    } else if (mode === 'Overheat') {
      curr = 3.2 + Math.random() * 0.4;
      vib = 0.42 + Math.random() * 0.1;
      score = 0.94;
      status = 'Critical';
      anomaly = true;
    }

    setSensors({
      flow_rate: Number(flow.toFixed(2)),
      pressure: Number(press.toFixed(2)),
      temperature: Number((11.0 + Math.random() * 2.0).toFixed(1)),
      current: Number(curr.toFixed(2)),
      vibration: Number(vib.toFixed(3)),
      anomaly_score: Number(score.toFixed(2)),
      is_anomaly: anomaly,
      status: status
    });
  };

  useEffect(() => {
    const timer = setInterval(() => simulateTick(injectMode), 2000);
    return () => clearInterval(timer);
  }, [injectMode]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-cyan-400">📡 Agent 1: IoT Telemetry & Anomaly Detector</h1>
          <p className="text-xs text-slate-400">Multivariate Isolation Forest Real-Time Anomaly Scoring Agent</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${sensors.is_anomaly ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'}`}>
          {sensors.status} (Score: {sensors.anomaly_score})
        </span>
      </header>

      {/* Control Panel */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-300">Simulate Sensor Injection Mode:</span>
        <div className="space-x-2">
          {['Normal', 'Clog', 'Overheat'].map((m) => (
            <button
              key={m}
              onClick={() => { setInjectMode(m); simulateTick(m); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${injectMode === m ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              Inject {m}
            </button>
          ))}
        </div>
      </div>

      {/* Sensor Stream Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">Flow Rate</span>
          <div className="text-xl font-bold font-mono text-cyan-300">{sensors.flow_rate} L/min</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">Pressure</span>
          <div className="text-xl font-bold font-mono text-cyan-300">{sensors.pressure} bar</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">Current</span>
          <div className="text-xl font-bold font-mono text-cyan-300">{sensors.current} A</div>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">Vibration</span>
          <div className="text-xl font-bold font-mono text-cyan-300">{sensors.vibration} g</div>
        </div>
      </div>

      <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
        <h3 className="text-xs font-bold text-slate-300 uppercase">Agent Reasoning Log</h3>
        <pre className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-cyan-400 overflow-x-auto">
{`[AGENT-1 EXECUTION LOOP]
Telemetry Packet: { flow: ${sensors.flow_rate}, press: ${sensors.pressure}, curr: ${sensors.current}, vib: ${sensors.vibration} }
Isolation Forest Decision: Anomaly Score = ${sensors.anomaly_score} -> Status: ${sensors.status}`}
        </pre>
      </div>
    </div>
  );
}

export default App;
