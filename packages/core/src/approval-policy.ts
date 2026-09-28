import type { RiskLevel, StepOutput, WorkflowStepDefinition } from "./types.js";

export interface ApprovalDecision {
  requiresHuman: boolean;
  reason: string;
}

const alwaysReview: RiskLevel[] = ["high", "critical"];

export function decideApproval(
  step: WorkflowStepDefinition,
  output: StepOutput,
): ApprovalDecision {
  if (step.requiresApproval || alwaysReview.includes(step.risk)) {
    return {
      requiresHuman: true,
      reason: step.requiresApproval
        ? "This stage is configured as a mandatory human checkpoint."
        : `Risk level ${step.risk} requires explicit human approval.`,
    };
  }

  if (typeof step.minConfidence === "number") {
    const confidence = output.confidence ?? 0;
    if (confidence < step.minConfidence) {
      return {
        requiresHuman: true,
        reason: `Confidence ${confidence.toFixed(2)} is below the ${step.minConfidence.toFixed(2)} threshold.`,
      };
    }
  }

  return { requiresHuman: false, reason: "Policy allows automatic continuation." };
}
