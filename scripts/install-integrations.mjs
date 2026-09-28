import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(".integrations");
mkdirSync(root, {recursive:true});
const catalog = JSON.parse(readFileSync("integrations/catalog.json", "utf8"));

for (const integration of catalog.integrations) {
  if (!["external-process","external-service","local-cli","external-mcp-editor","optional-worker"].includes(integration.mode)) continue;
  const dir = resolve(root, integration.id);
  if (existsSync(dir)) {
    console.log("SKIP", integration.id, "already installed");
    continue;
  }
  console.log("CLONE", integration.id, integration.repo);
  execFileSync("git", ["clone", "--depth", "1", integration.repo, dir], {stdio:"inherit"});
}

console.log("Integration sources installed under .integrations/");
