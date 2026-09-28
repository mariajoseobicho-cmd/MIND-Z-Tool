import { decideApproval } from "./approval-policy.js";
import type {
  StepExecutor,
  WorkflowDefinition,
  WorkflowRun,
  WorkflowStepRun,
} from "./types.js";

export interface WorkflowEngineOptions {
  definition: WorkflowDefinition;
  executors: Record<string, StepExecutor>;
  onChange?: (run: WorkflowRun) => void;
}

function cloneRun(run: WorkflowRun): WorkflowRun {
  return structuredClone(run);
}

export class WorkflowEngine {
  private run: WorkflowRun;
  private readonly definition: WorkflowDefinition;
  private readonly executors: Record<string, StepExecutor>;
  private readonly onChange?: (run: WorkflowRun) => void;

  constructor(options: WorkflowEngineOptions, projectId: string, title: string) {
    this.definition = options.definition;
    this.executors = options.executors;
    this.onChange = options.onChange;
    const now = new Date().toISOString();
    this.run = {
      id: crypto.randomUUID(),
      workflowId: options.definition.id,
      projectId,
      title,
      createdAt: now,
      updatedAt: now,
      steps: options.definition.steps.map((step) => ({ ...step, status: "pending" })),
    };
  }

  snapshot(): WorkflowRun {
    return cloneRun(this.run);
  }

  private emit(): void {
    this.run.updatedAt = new Date().toISOString();
    this.onChange?.(this.snapshot());
  }

  private dependenciesSatisfied(step: WorkflowStepRun): boolean {
    return (step.dependsOn ?? []).every((dependencyId) => {
      const dependency = this.run.steps.find((candidate) => candidate.id === dependencyId);
      return dependency?.status === "completed" || dependency?.status === "approved";
    });
  }

  async runNext(): Promise<WorkflowRun> {
    const step = this.run.steps.find(
      (candidate) => candidate.status === "pending" && this.dependenciesSatisfied(candidate),
    );

    if (!step) return this.snapshot();

    const executor = this.executors[step.capability];
    if (!executor) {
      step.status = "failed";
      step.error = `No executor registered for capability: ${step.capability}`;
      this.emit();
      return this.snapshot();
    }

    step.status = "running";
    step.startedAt = new Date().toISOString();
    this.emit();

    try {
      const output = await executor({ run: this.snapshot(), step: structuredClone(step) });
      step.output = output;
      step.finishedAt = new Date().toISOString();
      const policy = decideApproval(step, output);
      step.status = policy.requiresHuman ? "awaiting_approval" : "completed";
      if (policy.requiresHuman) {
        step.output = {
          ...step.output,
          payload: { ...step.output.payload, approvalReason: policy.reason },
        };
      }
    } catch (error) {
      step.status = "failed";
      step.error = error instanceof Error ? error.message : String(error);
      step.finishedAt = new Date().toISOString();
    }

    this.emit();
    return this.snapshot();
  }

  approve(stepId: string): WorkflowRun {
    const step = this.run.steps.find((candidate) => candidate.id === stepId);
    if (!step || step.status !== "awaiting_approval") return this.snapshot();
    step.status = "approved";
    this.emit();
    return this.snapshot();
  }

  reject(stepId: string, reason = "Rejected by user"): WorkflowRun {
    const step = this.run.steps.find((candidate) => candidate.id === stepId);
    if (!step || step.status !== "awaiting_approval") return this.snapshot();
    step.status = "rejected";
    step.error = reason;
    this.emit();
    return this.snapshot();
  }
}
