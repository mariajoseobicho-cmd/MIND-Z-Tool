import type { PerformanceObservation } from "./types.js";

export interface LearnedPreference {
  metric: string;
  value: number;
  confidence: number;
  sampleSize: number;
}

export function summarizePerformance(observations: PerformanceObservation[]): LearnedPreference[] {
  if (!observations.length) return [];
  const avg = (values: number[]) => values.length ? values.reduce((a,b)=>a+b,0)/values.length : 0;
  const completion = observations.map(o=>o.completionRate).filter((v): v is number => typeof v === "number");
  const ctr = observations.map(o=>o.clickThroughRate).filter((v): v is number => typeof v === "number");
  const shares = observations.map(o=>o.shares).filter((v): v is number => typeof v === "number");
  const result: LearnedPreference[] = [];
  if (completion.length) result.push({metric:"completionRate",value:avg(completion),confidence:Math.min(1,completion.length/20),sampleSize:completion.length});
  if (ctr.length) result.push({metric:"clickThroughRate",value:avg(ctr),confidence:Math.min(1,ctr.length/20),sampleSize:ctr.length});
  if (shares.length) result.push({metric:"shares",value:avg(shares),confidence:Math.min(1,shares.length/20),sampleSize:shares.length});
  return result;
}
