import { MindZMcpClient } from "@mind-z/mcp";
import type { BrowserBackend,BrowserTask,BrowserTaskResult } from "./types.js";
export class PlaywrightMcpBackend implements BrowserBackend{
  readonly id="playwright-mcp"; readonly label="Playwright MCP"; private readonly client:MindZMcpClient;
  constructor(url="http://127.0.0.1:8931/sse"){this.client=new MindZMcpClient(this.id,url,"auto");}
  async health(){try{const tools=await this.client.listTools();return Array.isArray(tools.tools)&&tools.tools.length>0;}catch{return false;}}
  async run(task:BrowserTask):Promise<BrowserTaskResult>{
    if(task.destructive)return{taskId:task.id,providerId:this.id,ok:false,requiresHuman:true,error:"Destructive browser actions require explicit human approval."};
    try{const tools=await this.client.listTools();const names=new Set(tools.tools.map(t=>t.name));if(task.url&&names.has("browser_navigate"))await this.client.callTool("browser_navigate",{url:task.url});const result=names.has("browser_snapshot")?await this.client.callTool("browser_snapshot"):{availableTools:[...names]};return{taskId:task.id,providerId:this.id,ok:true,summary:"Browser task prepared through Playwright MCP.",data:result};}
    catch(error){return{taskId:task.id,providerId:this.id,ok:false,error:error instanceof Error?error.message:String(error)};}
  }
}