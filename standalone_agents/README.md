# 🤖 AquaSense AI — Standalone Micro-Agent Platform

This directory contains **standalone, individually deployable AI Agent applications**. Each agent functions as an independent micro-application with its own user interface, logic, and Vercel configuration (`vercel.json`).

---

## 📂 Standalone Micro-Agent Applications

| Directory | Agent Name | Vercel Deployment Target |
| :--- | :--- | :--- |
| [`1-telemetry-anomaly-agent/`](./1-telemetry-anomaly-agent/) | **IoT Telemetry & Anomaly Detection Agent** | Select `standalone_agents/1-telemetry-anomaly-agent` in Vercel |
| [`2-rul-predictor-agent/`](./2-rul-predictor-agent/) | **Predictive Maintenance & RUL Forecasting Agent** | Select `standalone_agents/2-rul-predictor-agent` in Vercel |
| [`3-rag-diagnostic-agent/`](./3-rag-diagnostic-agent/) | **Groq LLaMA 3.3 70B RAG Diagnostic Agent** | Select `standalone_agents/3-rag-diagnostic-agent` in Vercel |
| [`4-autonomous-dispatch-agent/`](./4-autonomous-dispatch-agent/) | **Autonomous Work Order & Dispatch Agent** | Select `standalone_agents/4-autonomous-dispatch-agent` in Vercel |

---

## 🚀 How to Deploy Each Agent Individually on Vercel

1. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** ➔ **Project**.
3. Select your repository `thippusulthanA/AquaSense-AI`.
4. In the **Root Directory** field, click **Edit** and select the subfolder:
   - Example for Agent 1: `standalone_agents/1-telemetry-anomaly-agent`
   - Example for Agent 2: `standalone_agents/2-rul-predictor-agent`
   - Example for Agent 3: `standalone_agents/3-rag-diagnostic-agent`
   - Example for Agent 4: `standalone_agents/4-autonomous-dispatch-agent`
5. Click **Deploy**!
