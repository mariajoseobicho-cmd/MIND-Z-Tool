export type BrowserTaskKind="ask"|"research"|"upload"|"download"|"compare"|"extract"|"submit"|"capture";
export interface BrowserTask{id:string;kind:BrowserTaskKind;providerId?:string;objective:string;url?:string;input?:Record<string,unknown>;allowedDomains?:string[];destructive?:boolean;}
export interface BrowserTaskResult{taskId:string;providerId:string;ok:boolean;summary?:string;data?:unknown;artifacts?:string[];requiresHuman?:boolean;error?:string;}
export interface BrowserBackend{id:string;label:string;run(task:BrowserTask):Promise<BrowserTaskResult>;health?():Promise<boolean>;}