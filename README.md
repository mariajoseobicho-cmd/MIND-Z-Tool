# MIND-Z Tool — Open Creator Operating System

MIND-Z is being built as a local-first, human-in-the-loop content production system: give it an idea and it orchestrates planning, script, images, video, narration, captions, assembly and professional finishing.

## v0.2 direction

The core principle is open-source-first. Paid APIs are optional fallbacks, not requirements.

Production chain:

1. Ollama — local planning, reasoning and script.
2. ComfyUI + Wan2.1 — image/video generation and visual workflows.
3. Kokoro — local narration/TTS.
4. whisper.cpp — transcription and subtitle timing.
5. FFmpeg — deterministic assembly and media processing.
6. Drift — professional final edit controlled by MIND-Z through MCP.
7. MIND-Z — orchestration, approvals, routing, QA, memory and delivery.

## Why this repository does not copy every upstream project

Large external engines are intentionally kept as separate processes/services. This avoids fragile forks, allows independent updates, and preserves clear license boundaries (especially GPL projects such as ComfyUI and Drift). MIND-Z owns the orchestration and integration layer.

Install supported integration source trees for development:

    npm run integrations:install

They are cloned into the ignored `.integrations/` directory and are not vendored into MIND-Z history.

## Workflow

The target workflow is defined in `config/workflows/idea-to-final-video.json`:

Idea -> Strategy -> Research -> Script -> Storyboard -> Images -> Video scenes -> Narration -> Transcript -> Rough cut -> Drift MCP edit -> QA -> Export -> Publish.

Human approval remains mandatory before sensitive/final stages.

## Current implemented integration code

- OpenAI-compatible routing adapter
- TypeSafe-style decision adapter
- Ollama local LLM adapter
- ComfyUI HTTP client
- Drift MCP HTTP client
- Generic media-job adapter
- approval-aware workflow engine
- cross-platform React/Tauri studio shell
- GitHub CI and installer build matrix

## Repository structure

- `apps/studio` — user interface + Tauri shell
- `packages/core` — workflow/state/policy
- `packages/adapters` — engine/API/MCP adapters
- `integrations/catalog.json` — external open-source engine catalog
- `config/workflows` — production workflows
- `docs` — architecture, security and build docs

See `docs/ARCHITECTURE_V2.md` and `docs/OPEN_SOURCE_STACK.md`.

## Important license boundary

MIND-Z itself remains MIT. GPL software is not copied into the MIND-Z codebase; it is treated as an independently executed tool and accessed over documented process/API/MCP boundaries. Model weights can have separate licenses from the software hosting them and must be reviewed before commercial distribution.
