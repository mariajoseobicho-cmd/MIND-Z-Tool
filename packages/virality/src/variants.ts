import type { CreativeVariant, Platform } from "./types.js";

export interface VariantSeed {
  concept: string;
  platform: Platform;
  count?: number;
}

const hookPatterns = [
  "contrarian",
  "curiosity-gap",
  "unexpected-proof",
  "problem-first",
  "identity-challenge",
  "fast-transformation",
  "story-open-loop",
  "myth-vs-reality",
];

export function createVariantPlan(seed: VariantSeed): CreativeVariant[] {
  const count = Math.max(2, Math.min(seed.count ?? 5, hookPatterns.length));
  return hookPatterns.slice(0, count).map((pattern, index) => ({
    id: crypto.randomUUID(),
    hook: "Generate a " + pattern + " hook for: " + seed.concept,
    thumbnailConcept: "Variant " + (index + 1) + " thumbnail optimized for immediate comprehension",
    firstFrameConcept: "Pattern interrupt aligned with " + pattern,
    platform: seed.platform,
    metadata: {pattern, experimentGroup:"pre-publish"},
  }));
}
