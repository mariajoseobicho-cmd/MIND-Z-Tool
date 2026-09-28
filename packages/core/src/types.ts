export type WorkflowStepStatus =
  | "pending"
  | "running"
  | "awaiting_approval"
  | "approved"
  | "rejected"
  | "completed"
  | "failed";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface DecisionEvidence {
  source: string;
  summary: string;
  url?: string;
}

export interface StepOutput {
  summary: string;
  payload?: Record<string, unknown>;
  confidence?: number;
  evidence?: DecisionEvidence[];
  artifacts?: string[];
}

export interface WorkflowStepDefinition {
  id: string;
  title: string;
  description: string;
  agent: string;
  capability: string;
  risk: RiskLevel;
  requiresApproval: boolean;
  minConfidence?: number;
  dependsOn?: string[];
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  version: string;
  steps: WorkflowStepDefinition[];
}

export interface WorkflowStepRun extends WorkflowStepDefinition {
  status: WorkflowStepStatus;
  output?: StepOutput;
  error?: string;
  startedAt?: string;
  finishedAt?: string;
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  projectId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  steps: WorkflowStepRun[];
}

export interface StepExecutorContext {
  run: WorkflowRun;
  step: WorkflowStepRun;
}

export type StepExecutor = (context: StepExecutorContext) => Promise<StepOutput>;
