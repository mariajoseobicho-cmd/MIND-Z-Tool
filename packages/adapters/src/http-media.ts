import type { MediaJob, MediaJobResult, MediaProvider } from "./contracts.js";

export interface HttpMediaProviderOptions {
  id: string;
  baseUrl: string;
  apiKey?: string;
  fetchImpl?: typeof fetch;
}

export class HttpMediaProvider implements MediaProvider {
  readonly id: string;
  constructor(private readonly options: HttpMediaProviderOptions) {
    this.id = options.id;
  }

  async submit(job: MediaJob): Promise<MediaJobResult> {
    const http = this.options.fetchImpl ?? fetch;
    const response = await http(`${this.options.baseUrl.replace(/\/$/, "")}/jobs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(this.options.apiKey ? { authorization: `Bearer ${this.options.apiKey}` } : {}),
      },
      body: JSON.stringify(job),
    });
    if (!response.ok) throw new Error(`${this.id} submit failed with HTTP ${response.status}`);
    return (await response.json()) as MediaJobResult;
  }

  async status(jobId: string): Promise<MediaJobResult> {
    const http = this.options.fetchImpl ?? fetch;
    const response = await http(`${this.options.baseUrl.replace(/\/$/, "")}/jobs/${encodeURIComponent(jobId)}`,
      { headers: this.options.apiKey ? { authorization: `Bearer ${this.options.apiKey}` } : undefined },
    );
    if (!response.ok) throw new Error(`${this.id} status failed with HTTP ${response.status}`);
    return (await response.json()) as MediaJobResult;
  }
}
