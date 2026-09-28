import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { ProviderRegistry, CapabilityRouter } from "@mind-z/runtime";
import { BrowserTaskRouter, PlaywrightMcpBackend } from "@mind-z/browser";
import { MindZMcpClient } from "@mind-z/mcp";
import { defaultProviders } from "./providers.js";

const registry = new ProviderRegistry(defaultProviders);
const router = new CapabilityRouter(registry);

const playwrightClient = new MindZMcpClient(
  "playwright-mcp",
  process.env.PLAYWRIGHT_MCP_URL ?? "http://127.0.0.1:8931/sse",
  "auto",
);
const browser = new BrowserTaskRouter([new PlaywrightMcpBackend(playwrightClient)]);

const app = new Hono();

app.get("/health", (c) =>
  c.json({
    ok: true,
    version: "0.4.1",
    architecture: "capability-routed",
  }),
);

app.get("/providers", (c) => c.json({ providers: registry.list() }));

app.post("/route", async (c) => {
  const body = await c.req.json<{ capability: string; policy?: Record<string, unknown> }>();
  return c.json(
    router.plan({
      capability: body.capability,
      policy: body.policy as never,
    }),
  );
});

app.post("/browser/tasks", async (c) => {
  const body = await c.req.json<Record<string, unknown>>();
  const result = await browser.run({
    id: typeof body.id === "string" ? body.id : crypto.randomUUID(),
    kind: (typeof body.kind === "string" ? body.kind : "ask") as never,
    providerId: typeof body.providerId === "string" ? body.providerId : undefined,
    objective: typeof body.objective === "string" ? body.objective : "",
    url: typeof body.url === "string" ? body.url : undefined,
    input: typeof body.input === "object" && body.input ? body.input as Record<string, unknown> : undefined,
    allowedDomains: Array.isArray(body.allowedDomains) ? body.allowedDomains.filter((x): x is string => typeof x === "string") : undefined,
    destructive: body.destructive === true,
  });

  return c.json(result, result.ok ? 200 : result.requiresHuman ? 409 : 503);
});

const host = process.env.MINDZ_GATEWAY_HOST ?? "127.0.0.1";
const port = Number(process.env.MINDZ_GATEWAY_PORT ?? 8787);

serve({ fetch: app.fetch, hostname: host, port });
console.log("MIND-Z Gateway listening on http://" + host + ":" + port);
