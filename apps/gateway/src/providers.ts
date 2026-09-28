import type { ProviderDefinition } from "@mind-z/runtime";
export const defaultProviders:ProviderDefinition[]=[
{id:"ollama",label:"Ollama",capabilities:["llm.text","content.script","content.strategy"],accessMode:"local",costClass:"free",privacy:"local",priority:100,reliability:0.9},
{id:"gemini-cli",label:"Gemini CLI",capabilities:["llm.text","research.web","browser.assist"],accessMode:"cli",costClass:"free-tier",privacy:"remote",priority:85,reliability:0.88},
{id:"gemini-web",label:"Gemini Web",capabilities:["llm.text","browser.ask","browser.multimodal-review"],accessMode:"browser",costClass:"free-tier",privacy:"remote",priority:70,reliability:0.75},
{id:"playwright-mcp",label:"Playwright MCP",capabilities:["browser.navigate","browser.extract","browser.upload","browser.download"],accessMode:"mcp",costClass:"free",privacy:"local",priority:95,reliability:0.92},
{id:"browser-use",label:"Browser Use",capabilities:["browser.navigate","browser.extract","browser.agent"],accessMode:"local",costClass:"free",privacy:"local",priority:75,reliability:0.8},
{id:"comfyui",label:"ComfyUI",capabilities:["image.generate","image.edit","video.generate"],accessMode:"local",costClass:"free",privacy:"local",priority:100,reliability:0.88},
{id:"wan2.1",label:"Wan2.1",capabilities:["video.generate","video.image-to-video"],accessMode:"local",costClass:"free",privacy:"local",priority:95,reliability:0.84},
{id:"kokoro",label:"Kokoro",capabilities:["voice.tts"],accessMode:"local",costClass:"free",privacy:"local",priority:100,reliability:0.9},
{id:"whisper.cpp",label:"whisper.cpp",capabilities:["audio.transcribe","captions.generate"],accessMode:"local",costClass:"free",privacy:"local",priority:100,reliability:0.95},
{id:"ffmpeg",label:"FFmpeg",capabilities:["video.compose","video.transcode","audio.mix"],accessMode:"cli",costClass:"free",privacy:"local",priority:100,reliability:0.98},
{id:"drift",label:"Drift MCP",capabilities:["edit.professional","video.export"],accessMode:"mcp",costClass:"free",privacy:"local",priority:100,reliability:0.9}
];