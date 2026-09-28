export interface DriftMcpOptions {
  url?: string;
  token?: string;
  fetchImpl?: typeof fetch;
}

interface RpcResponse<T = unknown> {
  jsonrpc: "2.0";
  id: number;
  result?: T;
  error?: {code:number; message:string; data?:unknown};
}

export class DriftMcpClient {
  private id = 1;
  private readonly url: string;
  private readonly token?: string;
  private readonly http: typeof fetch;

  constructor(options: DriftMcpOptions = {}) {
    this.url = options.url ?? "http://127.0.0.1:4731/mcp";
    this.token = options.token;
    this.http = options.fetchImpl ?? fetch;
  }

  async call<T = unknown>(name: string, args: Record<string, unknown> = {}): Promise<T> {
    const response = await this.http(this.url, {
      method:"POST",
      headers:{
        "content-type":"application/json",
        "accept":"application/json, text/event-stream",
        ...(this.token ? {authorization:"Bearer " + this.token} : {})
      },
      body:JSON.stringify({jsonrpc:"2.0", id:this.id++, method:"tools/call", params:{name, arguments:args}})
    });
    if (!response.ok) throw new Error("Drift MCP HTTP " + response.status);
    const text = await response.text();
    const payload = text.startsWith("event:")
      ? JSON.parse(text.split("\n").find(line => line.startsWith("data: "))?.slice(6) ?? "{}")
      : JSON.parse(text);
    const rpc = payload as RpcResponse<T>;
    if (rpc.error) throw new Error("Drift MCP: " + rpc.error.message);
    return rpc.result as T;
  }

  catalog(brief = true) { return this.call("catalog", {brief}); }
  inspect(detail = false) { return this.call("inspect", {detail}); }
  capture(at: number) { return this.call("capture", {at}); }
  apply(ops: Array<{tool:string; args:Record<string, unknown>}>) { return this.call("apply", {ops}); }
}
