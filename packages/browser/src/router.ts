import type { BrowserBackend,BrowserTask,BrowserTaskResult } from "./types.js";
export class BrowserTaskRouter{
  constructor(private readonly backends:BrowserBackend[]){}
  async run(task:BrowserTask):Promise<BrowserTaskResult>{
    const ordered=task.providerId?[...this.backends.filter(b=>b.id===task.providerId),...this.backends.filter(b=>b.id!==task.providerId)]:this.backends;
    const failures:string[]=[];
    for(const backend of ordered){try{if(backend.health&&!(await backend.health())){failures.push(backend.id+": unhealthy");continue;}const result=await backend.run(task);if(result.ok||result.requiresHuman)return result;failures.push(backend.id+": "+(result.error??"failed"));}catch(error){failures.push(backend.id+": "+(error instanceof Error?error.message:String(error)));}}
    return{taskId:task.id,providerId:"none",ok:false,error:"All browser backends failed: "+failures.join(" | ")};
  }
}