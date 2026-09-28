export type ReferenceProductionMode = "long-form" | "shorts-factory";

export interface ReferenceVideoAnalysis {
  sourceUrl: string;
  mode: ReferenceProductionMode;
  abstractStructure: string[];
  audiencePromise?: string;
  hookPatterns: string[];
  pacingNotes: string[];
  visualPatterns: string[];
  narrativeBeats: string[];
  improvementOpportunities: string[];
  prohibitedReuse: string[];
}

export function originalityGuard(): string[] {
  return [
    "Do not reuse source footage unless the user owns or licenses it.",
    "Do not reproduce the source script, narration, music, thumbnails, graphics or distinctive shot sequence.",
    "Use only abstract learnings: topic, pacing ranges, structural patterns, audience intent and production techniques.",
    "Re-research factual claims independently before generating the new script.",
    "Create new wording, new shot plan, new visuals, new narration and a materially distinct edit.",
  ];
}

export function createReferenceAnalysis(sourceUrl: string, mode: ReferenceProductionMode): ReferenceVideoAnalysis {
  return {
    sourceUrl,
    mode,
    abstractStructure: [],
    hookPatterns: [],
    pacingNotes: [],
    visualPatterns: [],
    narrativeBeats: [],
    improvementOpportunities: [],
    prohibitedReuse: originalityGuard(),
  };
}
