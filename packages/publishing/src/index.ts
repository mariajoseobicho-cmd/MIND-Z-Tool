export interface PublishAsset {
  path: string;
  title: string;
  description?: string;
  platforms: string[];
  scheduledAt?: string;
  metadata?: Record<string, unknown>;
}

export interface PublishResult {
  platform: string;
  externalId?: string;
  url?: string;
  status: "scheduled" | "published" | "failed";
  raw?: unknown;
}

export interface Publisher {
  id: string;
  publish(asset: PublishAsset): Promise<PublishResult[]>;
}

export class HttpPublisher implements Publisher {
  readonly id: string;

  constructor(
    id: string,
    private readonly endpoint: string,
    private readonly token?: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {
    this.id = id;
  }

  async publish(asset: PublishAsset): Promise<PublishResult[]> {
    const response = await this.fetchImpl(this.endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(this.token ? {authorization: "Bearer " + this.token} : {}),
      },
      body: JSON.stringify(asset),
    });
    if (!response.ok) throw new Error(this.id + " publish failed with HTTP " + response.status);
    const raw = await response.json() as any;
    return Array.isArray(raw?.results) ? raw.results : [{platform:"custom",status:"published",raw}];
  }
}
