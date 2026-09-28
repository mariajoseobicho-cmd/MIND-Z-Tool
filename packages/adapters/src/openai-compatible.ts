import type { TextGenerationRequest, TextGenerationResponse, TextProvider } from "./contracts.js";

export interface OpenAICompatibleOptions {
  id?: string;
  label?: string;
  baseUrl: string;
  apiKey?: string;
  defaultModel: string;
  fetchImpl?: typeof fetch;
}

export class OpenAICompatibleProvider implements TextProvider {
  readonly id: string;
  readonly label: string;
  private readonly options: OpenAICompatibleOptions;

  constructor(options: OpenAICompatibleOptions) {
    this.options = options;
    this.id = options.id ?? "openai-compatible";
    this.label = options.label ?? "OpenAI-compatible provider";
  }

  async generate(request: TextGenerationRequest): Promise<TextGenerationResponse> {
    const http = this.options.fetchImpl ?? fetch;
    const endpoint = `${this.options.baseUrl.replace(/\/$/, "")}/chat/completions`;
    const response = await http(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(this.options.apiKey ? { authorization: `Bearer ${this.options.apiKey}` } : {}),
      },
      body: JSON.stringify({
        model: request.model ?? this.options.defaultModel,
        temperature: request.temperature ?? 0.4,
        messages: [
          ...(request.system ? [{ role: "system", content: request.system }] : []),
          { role: "user", content: request.prompt },
        ],
        ...(request.responseFormat === "json"
          ? { response_format: { type: "json_object" } }
          : {}),
      }),
    });

    if (!response.ok) {
      throw new Error(`${this.label} failed with HTTP ${response.status}`);
    }

    const raw = (await response.json()) as any;
    const text = raw?.choices?.[0]?.message?.content;
    if (typeof text !== "string") throw new Error(`${this.label} returned no text`);

    return {
      text,
      model: raw?.model ?? request.model ?? this.options.defaultModel,
      raw,
    };
  }
}
