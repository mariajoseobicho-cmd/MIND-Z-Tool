import type { BrowserBackend, BrowserTask, BrowserTaskResult } from "./types.js";

export interface McpToolClient {
  listTools(): Promise<{ tools: Array<{ name: string }> }>;
  callTool(name: string, args?: Record<string, unknown>): Promise<unknown>;
}

export class PlaywrightMcpBackend implements BrowserBackend {
  readonly id = "playwright-mcp";
  readonly label = "Playwright MCP";

  constructor(private readonly client: McpToolClient) {}

  async health(): Promise<boolean> {
    try {
      const tools = await this.client.listTools();
      return Array.isArray(tools.tools) && tools.tools.length > 0;
    } catch {
      return false;
    }
  }

  async run(task: BrowserTask): Promise<BrowserTaskResult> {
    if (task.destructive) {
      return {
        taskId: task.id,
        providerId: this.id,
        ok: false,
        requiresHuman: true,
        error: "Destructive browser actions require explicit human approval.",
      };
    }

    try {
      const tools = await this.client.listTools();
      const names = new Set(tools.tools.map((tool) => tool.name));

      if (task.url && names.has("browser_navigate")) {
        await this.client.callTool("browser_navigate", { url: task.url });
      }

      const result = names.has("browser_snapshot")
        ? await this.client.callTool("browser_snapshot")
        : { availableTools: [...names] };

      return {
        taskId: task.id,
        providerId: this.id,
        ok: true,
        summary: "Browser task prepared through Playwright MCP.",
        data: result,
      };
    } catch (error) {
      return {
        taskId: task.id,
        providerId: this.id,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
