export type ReferenceMode = "long-form" | "shorts-factory";

export interface YouTubeReferenceInput {
  url: string;
  mode: ReferenceMode;
  language?: string;
  targetDurationSeconds?: number;
  targetCount?: number;
}

export interface ReferenceFingerprint {
  sourceUrl: string;
  title?: string;
  durationSeconds?: number;
  transcriptPath?: string;
  audioPath?: string;
  videoPath?: string;
  shotMapPath?: string;
  structuralSummary?: string;
  hooks?: string[];
  pacing?: { cutsPerMinute?: number; avgShotSeconds?: number };
  topics?: string[];
}

export interface YouTubeIngestOptions {
  ytDlpBin?: string;
  outputDir: string;
  exec?: (command: string, args: string[]) => Promise<void>;
}

export class YouTubeReferenceIngestor {
  constructor(private readonly options: YouTubeIngestOptions) {}

  async prepare(input: YouTubeReferenceInput): Promise<{ sourceUrl: string; workspace: string; command: string[] }> {
    const bin = this.options.ytDlpBin ?? "yt-dlp";
    const args = [
      "--no-playlist",
      "--write-info-json",
      "--write-thumbnail",
      "--write-subs",
      "--write-auto-subs",
      "--sub-langs", input.language ?? "en.*,pt.*,fr.*",
      "--merge-output-format", "mp4",
      "-o", this.options.outputDir + "/reference.%(ext)s",
      input.url,
    ];
    if (this.options.exec) await this.options.exec(bin, args);
    return { sourceUrl: input.url, workspace: this.options.outputDir, command: [bin, ...args] };
  }
}
