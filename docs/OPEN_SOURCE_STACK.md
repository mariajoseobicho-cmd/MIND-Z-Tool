# MIND-Z open-source media stack

The product goal is: one idea in, one professionally edited video out.

## Local-first production chain

1. Ollama — planning, creative direction, script and agent reasoning.
2. ComfyUI — image/video generation graph and model orchestration.
3. Wan2.1 — text-to-video, image-to-video and video generation inside the visual stack.
4. Kokoro — local TTS/narration.
5. whisper.cpp — transcription, word timing and subtitle generation.
6. FFmpeg — deterministic assembly, muxing, normalisation, transcodes and pre-render.
7. Drift — professional finishing editor controlled over MCP.
8. MIND-Z — orchestration, state, approvals, memory, routing, QA and final delivery.

## GPL boundary

ComfyUI and Drift are GPL-licensed. MIND-Z keeps them as independent executables/services and communicates over HTTP/MCP. This preserves a clean architectural boundary and makes upgrades/replacements easy.

## Drift finishing loop

MIND-Z should launch or connect to Drift headless, import generated media, create tracks, assemble the rough cut, inspect the timeline and visual activity, apply effects/transitions/audio/caption edits, render previews, perform QA, request final human approval and export the master.

Drift exposes MCP through stdio and HTTP in headless mode.
