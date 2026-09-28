import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const catalog = JSON.parse(readFileSync("integrations/catalog.json", "utf8"));
for (const item of catalog.integrations) {
  const local = existsSync(resolve(".integrations", item.id));
  console.log(`${local ? "[installed]" : "[external ]"} ${item.id.padEnd(18)} ${item.mode.padEnd(20)} ${item.license}`);
}
