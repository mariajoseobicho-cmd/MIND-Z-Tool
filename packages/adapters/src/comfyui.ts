export interface ComfyWorkflow {
  prompt: Record<string, unknown>;
  clientId?: string;
}

export interface ComfyPromptResponse {
  prompt_id: string;
  number?: number;
  node_errors?: Record<string, unknown>;
}

export class ComfyUiClient {
  constructor(
    readonly baseUrl = "http://127.0.0.1:8188",
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  async health(): Promise<boolean> {
    try {
      const r = await this.fetchImpl(this.baseUrl.replace(/\/$/, "") + "/system_stats");
      return r.ok;
    } catch { return false; }
  }

  async queue(workflow: ComfyWorkflow): Promise<ComfyPromptResponse> {
    const r = await this.fetchImpl(this.baseUrl.replace(/\/$/, "") + "/prompt", {
      method: "POST",
      headers: {"content-type":"application/json"},
      body: JSON.stringify({prompt: workflow.prompt, client_id: workflow.clientId ?? crypto.randomUUID()})
    });
    if (!r.ok) throw new Error("ComfyUI queue failed with HTTP " + r.status);
    return r.json() as Promise<ComfyPromptResponse>;
  }

  async history(promptId: string): Promise<unknown> {
    const r = await this.fetchImpl(this.baseUrl.replace(/\/$/, "") + "/history/" + encodeURIComponent(promptId));
    if (!r.ok) throw new Error("ComfyUI history failed with HTTP " + r.status);
    return r.json();
  }
}
