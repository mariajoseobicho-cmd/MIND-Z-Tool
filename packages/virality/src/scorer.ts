import type { ViralityScore, ViralitySignals } from "./types.js";

const weights: Record<keyof ViralitySignals, number> = {
  hookStrength: 0.17,
  clarity: 0.10,
  novelty: 0.10,
  retentionDesign: 0.16,
  visualPatternInterrupt: 0.09,
  audioClarity: 0.07,
  captionReadability: 0.06,
  emotionalPull: 0.09,
  platformFit: 0.08,
  packaging: 0.08,
};

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export function scoreVirality(signals: ViralitySignals, threshold = 78): ViralityScore {
  const score = Math.round(Object.entries(weights).reduce((sum, [key, weight]) => {
    return sum + clamp(signals[key as keyof ViralitySignals]) * weight;
  }, 0));

  const blockers: string[] = [];
  const opportunities: string[] = [];
  const inspect = (key: keyof ViralitySignals, label: string) => {
    const value = signals[key];
    if (value < 55) blockers.push(label + " is below acceptable quality.");
    else if (value < 75) opportunities.push("Improve " + label.toLowerCase() + ".");
  };

  inspect("hookStrength", "Hook strength");
  inspect("retentionDesign", "Retention design");
  inspect("clarity", "Clarity");
  inspect("platformFit", "Platform fit");
  inspect("packaging", "Packaging");

  return {
    score,
    signals,
    blockers,
    opportunities,
    publishReady: score >= threshold && blockers.length === 0,
    disclaimer: "This is a creative-quality heuristic, not a guarantee of reach or virality.",
  };
}
