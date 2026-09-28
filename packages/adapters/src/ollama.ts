import type { TextGenerationRequest, TextGenerationResponse, TextProvider } from "./contracts.js";

export interface OllamaProviderOptions {
  baseUrl?: string;
  model: string;
  fetchImpl?: typeof fetch;
}

export class OllamaProvider implements TextProvider {
  readonly id = "ollama";
  readonly label = "Ollama Local";

  constructor(private readonly options: OllamaProviderOptions) {}

  async generate(request: TextGenerationRequest): Promise<TextGenerationResponse> {
    const http = this.options.fetchImpl ?? fetch;
    const base = (this.options.baseUrl ?? "http://127.0.0.1:11434").replace(/\/$/, "");
    const response = await http(base + "/api/chat", {
      method: "POST",
      headers: {"content-type":"application/json"},
      body: JSON.stringify({
        model: request.model ?? this.options.model,
        stream: false,
        messages: [
          ...(request.system ? [{role:"system", content:request.system}] : []),
          {role:"user", content:request.prompt}
        ],
        options: {temperature: request.temperature ?? 0.4}
      })
    });
    if (!response.ok) throw new Error("Ollama failed with HTTP " + response.status);
    const raw = await response.json() as any;
    const text = raw?.message?.content;
    if (typeof text !== "string") throw new Error("Ollama returned no text");
    return {text, model: raw?.model ?? this.options.model, raw};
  }
}
