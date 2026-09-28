import { Client, SSEClientTransport, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";
export type McpTransportMode="auto"|"streamable-http"|"sse";
export class MindZMcpClient{
  private client?:Client;
  constructor(readonly id:string,readonly url:string,readonly transport:McpTransportMode="auto"){}
  private async connectWith(mode:Exclude<McpTransportMode,"auto">){ const client=new Client({name:"mind-z",version:"0.4.0"}); if(mode==="streamable-http") await client.connect(new StreamableHTTPClientTransport(new URL(this.url))); else await client.connect(new SSEClientTransport(new URL(this.url))); return client; }
  async connect(){ if(this.client)return this.client; if(this.transport!=="auto"){this.client=await this.connectWith(this.transport);return this.client;} try{this.client=await this.connectWith("streamable-http");}catch{this.client=await this.connectWith("sse");} return this.client; }
  async listTools(){ return (await this.connect()).listTools(); }
  async callTool(name:string,args:Record<string,unknown>={}){ return (await this.connect()).callTool({name,arguments:args}); }
  async close(){ if(this.client)await this.client.close(); this.client=undefined; }
}