import { useState } from "react";
import { Activity, AlertTriangle, Building2, CheckCircle2, Zap } from "lucide-react";

const API = "http://localhost:8000/api/v1";

export default function App() {
  const [apiStatus, setApiStatus] = useState("Not tested");
  const [busy, setBusy] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  async function testMeta() {
    setBusy(true);
    setApiMessage("");
    try {
      const response = await fetch(`${API}/ai/test`, { method: "POST" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.detail ?? "Meta API request failed");
      setApiStatus("Connected");
      setApiMessage(body.response ?? "Connection successful");
    } catch (error) {
      setApiStatus("Needs attention");
      setApiMessage(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><Zap size={20} /></span><span>EcoOps <b>AI</b></span></div>
        <p className="nav-label">WORKSPACE</p>
        <div className="nav-item active"><Activity size={17}/> Command center</div>
        <div className="nav-item"><AlertTriangle size={17}/> Incidents</div>
        <div className="nav-item"><Building2 size={17}/> Buildings</div>
        <div className="sidebar-foot">Prototype · Development</div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div><span className="eyebrow">ENERGY OPERATIONS / OVERVIEW</span><h1>Command center</h1></div>
          <span className="status-pill"><span className="dot"/> System prototype</span>
        </header>

        <section className="intro">
          <div>
            <p className="eyebrow green">AUTONOMOUS ENERGY INTELLIGENCE</p>
            <h2>See waste. Understand it.<br/><em>Resolve it with evidence.</em></h2>
            <p className="intro-copy">A multimodal operations layer for investigating energy incidents and verifying corrective action.</p>
          </div>
          <div className="intro-icon"><Zap size={42}/></div>
        </section>

        <div className="metrics">
          <Metric label="Active incidents" value="—" note="Connect incident ingestion next" icon={<AlertTriangle/>}/>
          <Metric label="Energy monitored" value="—" note="Meter integration pending" icon={<Activity/>}/>
          <Metric label="Verified savings" value="—" note="No savings claimed yet" icon={<CheckCircle2/>}/>
        </div>

        <section className="panel">
          <div className="panel-head"><div><p className="eyebrow">INTEGRATION CHECK</p><h3>Meta Model API</h3></div><span className={`connection ${apiStatus === "Connected" ? "good" : ""}`}>{apiStatus}</span></div>
          <p className="panel-copy">Test the server-side Muse Spark connection. Your API key stays in the backend environment and is never sent to the browser.</p>
          <button onClick={testMeta} disabled={busy}>{busy ? "Testing…" : "Test Meta connection"}</button>
          {apiMessage && <pre className="result">{apiMessage}</pre>}
        </section>

        <p className="disclaimer">Development scaffold · No physical devices are connected · No real energy savings are claimed.</p>
      </section>
    </main>
  );
}

function Metric({ label, value, note, icon }: { label: string; value: string; note: string; icon: React.ReactNode }) {
  return <article className="metric"><div className="metric-top"><span>{label}</span><span className="metric-icon">{icon}</span></div><strong>{value}</strong><small>{note}</small></article>;
}
