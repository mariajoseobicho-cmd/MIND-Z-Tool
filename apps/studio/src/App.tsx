import { useMemo, useRef, useState } from "react";
import {
  Activity,
  Check,
  ChevronRight,
  CircleDashed,
  Clock3,
  Cpu,
  Film,
  Gauge,
  Layers3,
  LockKeyhole,
  Play,
  PlugZap,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Square,
  WandSparkles,
  X,
} from "lucide-react";
import { WorkflowEngine, type WorkflowRun, type WorkflowStepRun } from "@creator-nexus/core";
import { defaultWorkflow } from "./defaultWorkflow";
import { demoExecutors } from "./demoExecutors";

const providers = [
  { name: "OmniRoute", role: "routing / fallback / OpenAI-compatible", state: "ready" },
  { name: "TypeSafe AI", role: "typed decisions + confidence", state: "optional" },
  { name: "HyperFrames", role: "motion / composition / render", state: "optional" },
  { name: "OpenShorts", role: "shorts / clipping / social", state: "optional" },
  { name: "AutoClip", role: "local-first clipping", state: "optional" },
  { name: "Custom webhook", role: "publishing / automation bridge", state: "ready" },
];

const statusLabels: Record<WorkflowStepRun["status"], string> = {
  pending: "Pendente",
  running: "A executar",
  awaiting_approval: "Aprovação necessária",
  approved: "Aprovado",
  rejected: "Rejeitado",
  completed: "Concluído",
  failed: "Falhou",
};

function statusIcon(status: WorkflowStepRun["status"]) {
  if (status === "completed" || status === "approved") return <Check size={15} />;
  if (status === "running") return <RefreshCcw size={15} className="spin" />;
  if (status === "awaiting_approval") return <LockKeyhole size={15} />;
  if (status === "rejected" || status === "failed") return <X size={15} />;
  return <CircleDashed size={15} />;
}

export default function App() {
  const engineRef = useRef<WorkflowEngine | null>(null);
  const [run, setRun] = useState<WorkflowRun | null>(null);
  const [autoRunning, setAutoRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"workflow" | "providers" | "assets">("workflow");

  if (!engineRef.current) {
    engineRef.current = new WorkflowEngine(
      { definition: defaultWorkflow, executors: demoExecutors, onChange: setRun },
      "demo-project",
      "Campanha — vídeo vertical inteligente",
    );
  }

  const currentRun = run ?? engineRef.current.snapshot();
  const completed = currentRun.steps.filter((step) => step.status === "completed" || step.status === "approved").length;
  const approvals = currentRun.steps.filter((step) => step.status === "awaiting_approval").length;
  const progress = Math.round((completed / currentRun.steps.length) * 100);

  const currentStep = useMemo(
    () => currentRun.steps.find((step) => ["running", "awaiting_approval"].includes(step.status))
      ?? currentRun.steps.find((step) => step.status === "pending")
      ?? currentRun.steps.at(-1),
    [currentRun],
  );

  async function runNext() {
    await engineRef.current?.runNext();
  }

  async function runUntilGate() {
    if (!engineRef.current) return;
    setAutoRunning(true);
    for (let i = 0; i < currentRun.steps.length; i += 1) {
      const snapshot = engineRef.current.snapshot();
      if (snapshot.steps.some((step) => step.status === "awaiting_approval")) break;
      if (!snapshot.steps.some((step) => step.status === "pending")) break;
      await engineRef.current.runNext();
    }
    setAutoRunning(false);
  }

  function reset() {
    engineRef.current = new WorkflowEngine(
      { definition: defaultWorkflow, executors: demoExecutors, onChange: setRun },
      "demo-project",
      "Campanha — vídeo vertical inteligente",
    );
    setRun(engineRef.current.snapshot());
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Sparkles size={19} /></div>
          <div><strong>Creator Nexus</strong><span>AI production OS</span></div>
        </div>

        <nav>
          <button className={activeTab === "workflow" ? "active" : ""} onClick={() => setActiveTab("workflow")}>
            <Layers3 size={18} /> Workflow
          </button>
          <button className={activeTab === "providers" ? "active" : ""} onClick={() => setActiveTab("providers")}>
            <PlugZap size={18} /> Providers
          </button>
          <button className={activeTab === "assets" ? "active" : ""} onClick={() => setActiveTab("assets")}>
            <Film size={18} /> Assets
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="local-card">
            <ShieldCheck size={18} />
            <div><strong>Local-first</strong><span>Secrets fora do código</span></div>
          </div>
          <div className="version">v0.1.0 · prototype foundation</div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">PROJECT / CAMPAIGN 001</p>
            <h1>Campanha — vídeo vertical inteligente</h1>
          </div>
          <div className="top-actions">
            <button className="ghost" onClick={reset}><RefreshCcw size={16} /> Reiniciar</button>
            <button className="primary" onClick={runUntilGate} disabled={autoRunning || approvals > 0}>
              {autoRunning ? <Square size={15} /> : <Play size={15} />}
              {autoRunning ? "A executar" : "Executar até aprovação"}
            </button>
          </div>
        </header>

        {activeTab === "workflow" && (
          <>
            <section className="hero-grid">
              <div className="hero-card">
                <div>
                  <span className="pill purple"><WandSparkles size={14} /> Human-in-the-loop</span>
                  <h2>Automatiza quase tudo.<br /><em>Decide apenas o que importa.</em></h2>
                  <p>O motor executa etapas de baixo risco automaticamente e trava em decisões editoriais, claims, render final e publicação.</p>
                </div>
                <div className="progress-ring" style={{ "--progress": `${progress * 3.6}deg` } as React.CSSProperties}>
                  <div><strong>{progress}%</strong><span>workflow</span></div>
                </div>
              </div>

              <div className="metric-card"><Activity size={18} /><span>Etapas concluídas</span><strong>{completed}/{currentRun.steps.length}</strong></div>
              <div className="metric-card"><LockKeyhole size={18} /><span>Aprovações pendentes</span><strong>{approvals}</strong></div>
              <div className="metric-card"><Gauge size={18} /><span>Confidence policy</span><strong>≥ 0.78</strong></div>
            </section>

            <section className="workspace-grid">
              <div className="panel workflow-panel">
                <div className="panel-head">
                  <div><p className="eyebrow">ORCHESTRATION</p><h3>Pipeline de produção</h3></div>
                  <button className="compact" onClick={runNext} disabled={approvals > 0 || autoRunning}><Play size={14} /> Próxima etapa</button>
                </div>

                <div className="steps">
                  {currentRun.steps.map((step, index) => (
                    <div className={`step ${step.status}`} key={step.id}>
                      <div className="step-line">
                        <div className="step-index">{index + 1}</div>
                        {index < currentRun.steps.length - 1 && <div className="connector" />}
                      </div>
                      <div className="step-content">
                        <div className="step-title-row">
                          <div><strong>{step.title}</strong><span>{step.agent} · {step.capability}</span></div>
                          <span className={`status-badge ${step.status}`}>{statusIcon(step.status)} {statusLabels[step.status]}</span>
                        </div>
                        <p>{step.description}</p>
                        {step.output && (
                          <div className="output-card">
                            <div className="output-top"><span>Resultado</span>{typeof step.output.confidence === "number" && <b>{Math.round(step.output.confidence * 100)}% confiança</b>}</div>
                            <p>{step.output.summary}</p>
                            {!!step.output.artifacts?.length && <div className="chips">{step.output.artifacts.map((artifact) => <span key={artifact}>{artifact}</span>)}</div>}
                          </div>
                        )}
                        {step.error && <div className="error-box">{step.error}</div>}
                        {step.status === "awaiting_approval" && (
                          <div className="approval-bar">
                            <div><LockKeyhole size={16} /><span><strong>Checkpoint humano</strong> Revise o resultado antes de continuar.</span></div>
                            <div className="approval-actions">
                              <button className="reject" onClick={() => setRun(engineRef.current!.reject(step.id))}><X size={14} /> Rejeitar</button>
                              <button className="approve" onClick={() => setRun(engineRef.current!.approve(step.id))}><Check size={14} /> Aprovar</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="right-rail">
                <div className="panel focus-card">
                  <p className="eyebrow">CURRENT FOCUS</p>
                  <div className="focus-icon"><Cpu size={20} /></div>
                  <h3>{currentStep?.title}</h3>
                  <p>{currentStep?.description}</p>
                  <div className="mini-spec"><span>Agente</span><strong>{currentStep?.agent}</strong></div>
                  <div className="mini-spec"><span>Risco</span><strong>{currentStep?.risk}</strong></div>
                  <div className="mini-spec"><span>Human gate</span><strong>{currentStep?.requiresApproval ? "Sim" : "Condicional"}</strong></div>
                </div>

                <div className="panel provider-mini">
                  <div className="panel-head"><div><p className="eyebrow">ROUTING</p><h3>Provider mesh</h3></div></div>
                  {providers.slice(0, 4).map((provider) => (
                    <div className="provider-row" key={provider.name}>
                      <div><strong>{provider.name}</strong><span>{provider.role}</span></div>
                      <i className={provider.state}>{provider.state}</i>
                    </div>
                  ))}
                </div>
              </aside>
            </section>
          </>
        )}

        {activeTab === "providers" && (
          <section className="panel standalone">
            <div className="panel-head"><div><p className="eyebrow">PROVIDER MESH</p><h3>Conectores desacoplados</h3></div></div>
            <p className="section-intro">Cada fornecedor entra por contrato próprio. Trocar um modelo, editor ou publicador não exige reescrever o workflow.</p>
            <div className="provider-grid">
              {providers.map((provider) => (
                <div className="provider-card" key={provider.name}>
                  <div className="provider-logo"><PlugZap size={20} /></div>
                  <strong>{provider.name}</strong>
                  <span>{provider.role}</span>
                  <div className="provider-state"><i className={provider.state} /> {provider.state}</div>
                  <button>Configurar <ChevronRight size={14} /></button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "assets" && (
          <section className="panel standalone">
            <div className="panel-head"><div><p className="eyebrow">ASSET LIBRARY</p><h3>Conteúdo gerado e versões</h3></div></div>
            <div className="empty-state">
              <div><Film size={28} /></div>
              <h3>A biblioteca nasce do workflow</h3>
              <p>Renders, guiões, storyboards, thumbnails e relatórios QA aparecem aqui com proveniência e versão.</p>
              <button className="compact" onClick={() => setActiveTab("workflow")}><Play size={14} /> Abrir workflow</button>
            </div>
          </section>
        )}

        <footer>
          <span><Clock3 size={14} /> execução persistente preparada para desktop/mobile/web</span>
          <span>Creator Nexus · approval-first orchestration</span>
        </footer>
      </main>
    </div>
  );
}
