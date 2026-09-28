import fs from "node:fs";

const runtimeRouter = fs.readFileSync("packages/runtime/src/router.ts", "utf8");
const browserRouter = fs.readFileSync("packages/browser/src/router.ts", "utf8");
const approval = fs.readFileSync("packages/core/src/approval-policy.ts", "utf8");
const drift = fs.readFileSync("packages/adapters/src/drift-mcp.ts", "utf8");
const youtube = fs.readFileSync("packages/adapters/src/youtube-reference.ts", "utf8");
const virality = fs.readFileSync("packages/virality/src/scorer.ts", "utf8");

const invariants = [
  [runtimeRouter.includes("fallbacks"), "provider routing keeps fallback chains"],
  [runtimeRouter.includes("preferFree"), "provider routing preserves free-first policy"],
  [runtimeRouter.includes("preferLocal"), "provider routing preserves local-first policy"],
  [browserRouter.includes("failures"), "browser layer keeps backend fallback logic"],
  [approval.includes("critical"), "critical workflow steps remain human-gated"],
  [drift.includes("DriftMcpClient"), "Drift MCP finishing remains available"],
  [youtube.includes("YouTubeReferenceIngestor"), "YouTube reference ingestion remains available"],
  [virality.includes("publishReady"), "virality preflight scoring remains available"],
];

for (const [ok, message] of invariants) {
  if (!ok) throw new Error("Regression detected: " + message);
}

console.log("Runtime regression invariants OK (" + invariants.length + ").");
