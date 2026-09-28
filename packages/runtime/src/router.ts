import { ProviderRegistry } from "./registry.js";
import type { RegisteredProvider, RoutePlan, RouteRequest } from "./types.js";
const healthScore=(p:RegisteredProvider)=>p.health==="healthy"?40:p.health==="unknown"?20:p.health==="degraded"?5:-10000;
const costScore=(p:RegisteredProvider,preferFree:boolean)=>!preferFree?0:p.costClass==="free"?80:p.costClass==="free-tier"?45:-80;
const localityScore=(p:RegisteredProvider,preferLocal:boolean)=>!preferLocal?0:p.privacy==="local"?55:-10;
export class CapabilityRouter {
  constructor(private readonly registry:ProviderRegistry){}
  plan(request:RouteRequest):RoutePlan{
    const policy=request.policy??{},preferred=new Set(policy.preferredProviderIds??[]),excluded=new Set(policy.excludedProviderIds??[]),rejected:Array<{providerId:string;reason:string}>=[];
    const candidates=this.registry.byCapability(request.capability).filter(p=>{ if(!p.enabled){rejected.push({providerId:p.id,reason:"disabled"});return false;} if(excluded.has(p.id)){rejected.push({providerId:p.id,reason:"explicitly excluded"});return false;} if(p.health==="offline"){rejected.push({providerId:p.id,reason:"offline"});return false;} if(p.accessMode==="browser"&&policy.allowBrowser===false){rejected.push({providerId:p.id,reason:"browser execution disabled"});return false;} if(p.costClass==="paid"&&policy.allowPaid===false){rejected.push({providerId:p.id,reason:"paid providers disabled"});return false;} if(policy.requirePrivacy&&p.privacy!==policy.requirePrivacy){rejected.push({providerId:p.id,reason:"privacy policy mismatch"});return false;} return true;});
    candidates.sort((a,b)=>{ const s=(p:RegisteredProvider)=>(p.priority??0)+Math.round((p.reliability??0.75)*50)+healthScore(p)+costScore(p,policy.preferFree??true)+localityScore(p,policy.preferLocal??true)+(preferred.has(p.id)?1000:0); return s(b)-s(a);});
    return {capability:request.capability,selected:candidates[0],fallbacks:candidates.slice(1),rejected,reason:candidates.length?"Selected "+candidates[0]!.label+" with "+Math.max(0,candidates.length-1)+" fallback(s).":"No provider satisfies the requested capability and policy."};
  }
}