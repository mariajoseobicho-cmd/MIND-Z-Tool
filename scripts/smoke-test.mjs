import fs from "node:fs";
import path from "node:path";

const required = [
  "README.md",
  "apps/studio/src/App.tsx",
  "apps/studio/src-tauri/tauri.conf.json",
  "packages/core/src/workflow-engine.ts",
  "packages/adapters/src/openai-compatible.ts",
  ".github/workflows/release.yml"
];

for (const file of required) {
  if (!fs.existsSync(path.resolve(file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const workflow = JSON.parse(fs.readFileSync("config/workflows/vertical-short.json", "utf8"));
if (!workflow.policy?.neverAutoPublish) throw new Error("Safety policy regression: publish must remain approval-gated");
console.log(`Creator Nexus smoke test OK (${required.length} files checked).`);
