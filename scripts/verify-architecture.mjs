import fs from "node:fs";
import path from "node:path";

const mustExist = [
  "apps/studio/src/App.tsx",
  "apps/gateway/src/server.ts",
  "packages/core/src/workflow-engine.ts",
  "packages/adapters/src/ollama.ts",
  "packages/adapters/src/comfyui.ts",
  "packages/adapters/src/drift-mcp.ts",
  "packages/adapters/src/youtube-reference.ts",
  "packages/runtime/src/router.ts",
  "packages/mcp/src/client.ts",
  "packages/browser/src/router.ts",
  "packages/virality/src/scorer.ts",
  "packages/publishing/src/index.ts",
  "config/workflows/idea-to-final-video.json",
  "config/workflows/reference-to-better-longform.json",
  "config/workflows/reference-to-shorts-factory.json",
  "config/workflows/viral-launch-loop.json",
  "integrations/catalog.json",
];

for (const file of mustExist) {
  if (!fs.existsSync(path.resolve(file))) {
    throw new Error("Architecture regression: missing " + file);
  }
}

const catalog = JSON.parse(fs.readFileSync("integrations/catalog.json", "utf8"));
const ids = new Set(catalog.integrations.map((x) => x.id));
for (const required of [
  "ollama","gemini-cli","playwright-mcp","browser-use","comfyui","wan2.1",
  "kokoro","whisper.cpp","yt-dlp","ffmpeg","drift","openshorts","autoclip",
  "moneyprinterturbo","postiz"
]) {
  if (!ids.has(required)) throw new Error("Integration regression: missing " + required);
}

const workflowFiles = fs.readdirSync("config/workflows").filter((x) => x.endsWith(".json"));
for (const file of workflowFiles) {
  const workflow = JSON.parse(fs.readFileSync(path.join("config/workflows", file), "utf8"));
  const serialized = JSON.stringify(workflow);
  if (/publish/i.test(serialized) && !/approval|human|neverAutoPublish/i.test(serialized)) {
    throw new Error("Safety regression: publishing workflow lacks approval language in " + file);
  }
}

console.log("Architecture verification OK (" + mustExist.length + " critical assets, " + workflowFiles.length + " workflows).");
