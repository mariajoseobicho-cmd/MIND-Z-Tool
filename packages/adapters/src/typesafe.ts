import type { DecisionProvider, DecisionRequest, DecisionResponse } from "./contracts.js";

export interface TypeSafeDecisionOptions {
  endpoint: string;
  apiKey: string;
  fetchImpl?: typeof fetch;
}

export class TypeSafeDecisionProvider implements DecisionProvider {
  readonly id = "typesafe";
  constructor(private readonly options: TypeSafeDecisionOptions) {}

  async decide<T extends string>(request: DecisionRequest<T>): Promise<DecisionResponse<T>> {
    const http = this.options.fetchImpl ?? fetch;
    const response = await http(this.options.endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${this.options.apiKey}`,
      },
      body: JSON.stringify({
        question: request.question,
        choices: request.choices,
        context: request.context,
      }),
    });

    if (!response.ok) throw new Error(`TypeSafe decision request failed with HTTP ${response.status}`);
    const raw = (await response.json()) as any;
    const choice = raw?.choice ?? raw?.decision;
    const confidence = Number(raw?.confidence ?? raw?.probability ?? 0);
    if (!request.choices.includes(choice)) throw new Error("Decision provider returned an invalid choice");
    return { choice, confidence, probabilities: raw?.probabilities, raw };
  }
}
