import type { StepExecutor } from "@creator-nexus/core";

const delay = (ms = 380) => new Promise((resolve) => setTimeout(resolve, ms));

const make = (
  summary: string,
  confidence: number,
  payload: Record<string, unknown>,
  artifacts: string[] = [],
): StepExecutor => async () => {
  await delay();
  return {
    summary,
    confidence,
    payload,
    artifacts,
    evidence: [
      { source: "Project brief", summary: "User-provided project constraints" },
      { source: "Creator Nexus policy", summary: "Human approval and confidence thresholds applied" },
    ],
  };
};

export const demoExecutors: Record<string, StepExecutor> = {
  brief: make(
    "Brief estruturado: vídeo educativo de 45–60s, formato 9:16, linguagem clara e CTA não agressivo.",
    0.97,
    { audience: "adultos 25–55", platform: "Reels / Shorts / TikTok", duration: "45–60s" },
  ),
  research: make(
    "Foram separados factos verificáveis, tendências editoriais e ideias criativas; claims sensíveis ficam marcados para revisão.",
    0.88,
    { angles: ["mito vs facto", "3 sinais", "erro comum"], claimsNeedingReview: 1 },
  ),
  script: make(
    "Três hooks e um guião principal foram gerados, com versão curta e alternativa mais conversacional.",
    0.93,
    { hooks: ["O erro que quase toda a gente comete…", "Três sinais que vale a pena observar…", "Antes de concluir X, veja isto…"] },
    ["script-v1.md", "script-alt.md"],
  ),
  storyboard: make(
    "Storyboard com 8 cenas, legendas cinéticas, B-roll contextual e duas transições discretas.",
    0.91,
    { scenes: 8, captionStyle: "kinetic-clean", aspectRatio: "9:16" },
    ["storyboard.json"],
  ),
  render: make(
    "Render preparado com voz, legendas, música ducked e variantes de 9:16 e 1:1. Nenhuma publicação foi executada.",
    0.86,
    { variants: ["1080x1920", "1080x1080"], providerPlan: ["HyperFrames", "OpenShorts", "FFmpeg"] },
    ["preview-vertical.mp4", "preview-square.mp4"],
  ),
  qa: make(
    "QA concluiu legibilidade e pacing satisfatórios. Um claim deve ser confirmado antes da publicação.",
    0.84,
    { blockingIssues: 1, warnings: 2, checks: 14 },
    ["qa-report.json"],
  ),
  publish: make(
    "Pacote de publicação pronto, mas bloqueado até aprovação explícita do utilizador.",
    0.95,
    { channels: ["YouTube Shorts", "Instagram Reels", "TikTok"], scheduled: false },
    ["publish-package.json"],
  ),
};
