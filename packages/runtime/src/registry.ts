import type { ProviderDefinition, ProviderHealth, RegisteredProvider } from "./types.js";
export class ProviderRegistry {
  private readonly providers = new Map<string, RegisteredProvider>();
  constructor(initial: ProviderDefinition[] = []) { for (const provider of initial) this.register(provider); }
  register(provider: ProviderDefinition): RegisteredProvider { const previous=this.providers.get(provider.id); const registered={...provider,enabled:provider.enabled??previous?.enabled??true,health:previous?.health??"unknown",lastCheckedAt:previous?.lastCheckedAt} as RegisteredProvider; this.providers.set(provider.id,registered); return structuredClone(registered); }
  unregister(id:string){ return this.providers.delete(id); }
  get(id:string){ const p=this.providers.get(id); return p?structuredClone(p):undefined; }
  list(){ return [...this.providers.values()].map(p=>structuredClone(p)); }
  byCapability(capability:string){ return this.list().filter(p=>p.capabilities.includes(capability)); }
  setHealth(id:string,health:ProviderHealth){ const p=this.providers.get(id); if(!p)return undefined; p.health=health; p.lastCheckedAt=new Date().toISOString(); return structuredClone(p); }
  setEnabled(id:string,enabled:boolean){ const p=this.providers.get(id); if(!p)return undefined; p.enabled=enabled; return structuredClone(p); }
}