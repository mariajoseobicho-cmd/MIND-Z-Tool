export type PipelineArtifactKind =
  | "brief" | "research" | "script" | "storyboard"
  | "image" | "video" | "voice" | "captions"
  | "rough-cut" | "drift-project" | "final-video";

export interface PipelineArtifact {
  id: string;
  kind: PipelineArtifactKind;
  path?: string;
  url?: string;
  metadata?: Record<string, unknown>;
}

export interface MediaPipelineState {
  idea: string;
  artifacts: PipelineArtifact[];
  currentStage: string;
  approvals: Record<string, "pending"|"approved"|"rejected">;
}

export function createMediaPipelineState(idea: string): MediaPipelineState {
  return {idea, artifacts: [], currentStage: "idea", approvals: {}};
}

export function addArtifact(state: MediaPipelineState, artifact: Omit<PipelineArtifact, "id">): MediaPipelineState {
  return {...state, artifacts: [...state.artifacts, {id: crypto.randomUUID(), ...artifact}]};
}
