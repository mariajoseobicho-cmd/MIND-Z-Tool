export interface TextGenerationRequest {
  system?: string;
  prompt: string;
  model?: string;
  temperature?: number;
  responseFormat?: "text" | "json";
}

export interface TextGenerationResponse {
  text: string;
  model: string;
  confidence?: number;
  raw?: unknown;
}

export interface TextProvider {
  id: string;
  label: string;
  generate(request: TextGenerationRequest): Promise<TextGenerationResponse>;
}

export interface DecisionRequest<T extends string> {
  question: string;
  choices: readonly T[];
  context: Record<string, unknown>;
}

export interface DecisionResponse<T extends string> {
  choice: T;
  confidence: number;
  probabilities?: Partial<Record<T, number>>;
  raw?: unknown;
}

export interface DecisionProvider {
  id: string;
  decide<T extends string>(request: DecisionRequest<T>): Promise<DecisionResponse<T>>;
}

export interface MediaJob {
  id: string;
  type: "clip" | "short" | "motion" | "avatar" | "render";
  input: Record<string, unknown>;
}

export interface MediaJobResult {
  jobId: string;
  status: "queued" | "running" | "completed" | "failed";
  artifacts?: string[];
  raw?: unknown;
}

export interface MediaProvider {
  id: string;
  submit(job: MediaJob): Promise<MediaJobResult>;
  status(jobId: string): Promise<MediaJobResult>;
}
