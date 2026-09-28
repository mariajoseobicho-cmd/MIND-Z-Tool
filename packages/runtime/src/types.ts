export type AccessMode = "local" | "cli" | "mcp" | "api" | "browser";
export type CostClass = "free" | "free-tier" | "paid";
export type PrivacyClass = "local" | "remote";
export type ProviderHealth = "unknown" | "healthy" | "degraded" | "offline";
export interface ProviderDefinition { id:string; label:string; capabilities:string[]; accessMode:AccessMode; costClass:CostClass; privacy:PrivacyClass; priority?:number; reliability?:number; enabled?:boolean; metadata?:Record<string,unknown>; }
export interface RegisteredProvider extends ProviderDefinition { enabled:boolean; health:ProviderHealth; lastCheckedAt?:string; }
export interface RoutePolicy { preferFree?:boolean; preferLocal?:boolean; allowBrowser?:boolean; allowPaid?:boolean; requirePrivacy?:PrivacyClass; preferredProviderIds?:string[]; excludedProviderIds?:string[]; }
export interface RouteRequest { capability:string; policy?:RoutePolicy; }
export interface RoutePlan { capability:string; selected?:RegisteredProvider; fallbacks:RegisteredProvider[]; rejected:Array<{providerId:string;reason:string}>; reason:string; }