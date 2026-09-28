export type Platform = "youtube" | "youtube-shorts" | "tiktok" | "instagram-reels" | "facebook" | "linkedin" | "x" | "pinterest";

export interface CreativeVariant {
  id: string;
  hook: string;
  title?: string;
  thumbnailConcept?: string;
  firstFrameConcept?: string;
  captionStyle?: string;
  cta?: string;
  platform: Platform;
  metadata?: Record<string, unknown>;
}

export interface ViralitySignals {
  hookStrength: number;
  clarity: number;
  novelty: number;
  retentionDesign: number;
  visualPatternInterrupt: number;
  audioClarity: number;
  captionReadability: number;
  emotionalPull: number;
  platformFit: number;
  packaging: number;
}

export interface ViralityScore {
  score: number;
  signals: ViralitySignals;
  blockers: string[];
  opportunities: string[];
  publishReady: boolean;
  disclaimer: string;
}

export interface PerformanceObservation {
  variantId: string;
  platform: Platform;
  impressions?: number;
  views?: number;
  averageViewDurationSeconds?: number;
  completionRate?: number;
  clickThroughRate?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  followersGained?: number;
  observedAt: string;
}
