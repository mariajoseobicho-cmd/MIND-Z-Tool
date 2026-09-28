# MIND-Z Tool — Open Creator Operating System

MIND-Z is a local-first, human-in-the-loop creator operating system designed to turn an idea, topic, file or reference URL into original long-form and short-form content.

## Core product promise

One input can become:
- original long-form video;
- multiple shorts/reels;
- thumbnails and first-frame variants;
- narration and captions;
- professional Drift-edited masters;
- platform-specific publish packages;
- post-publish learning data.

## Open-source-first production stack

1. Ollama — local reasoning, strategy and script.
2. ComfyUI + Wan2.1 — image/video generation.
3. Kokoro — local TTS.
4. whisper.cpp — transcription and timing.
5. yt-dlp — reference URL ingest.
6. FFmpeg — deterministic assembly/transcode/audio.
7. Drift — professional finishing through MCP.
8. MIND-Z — orchestration, approvals, scoring, routing, QA and learning.

Paid APIs remain optional fallbacks.

## Reference-video modes

- Reference URL -> original better long-form
- Reference URL -> Shorts Factory
- Multi-reference fusion is planned next

The reference is used to extract abstract structure, pacing and production patterns. MIND-Z does not intentionally reuse source footage, script, music, graphics or distinctive edit sequences.

## Virality Engine

MIND-Z does not claim to guarantee virality. It optimizes measurable creative factors before publication:
- hook strength
- clarity
- novelty
- retention design
- pattern interruption
- audio clarity
- caption readability
- emotional pull
- platform fit
- packaging

Candidates below the quality threshold are iterated before publication.

The system also generates multiple hooks, titles, thumbnails and first-frame variants, then links real post-publish metrics back to the exact variant for continuous learning.

See:
- docs/VIRALITY_ENGINE.md
- docs/REFERENCE_VIDEO_PIPELINE.md
- docs/ARCHITECTURE_V2.md
- docs/OPEN_SOURCE_STACK.md

## Optional external distribution

Postiz can be used as a separate AGPL-licensed distribution/analytics service over API/MCP. It is not copied into the MIT MIND-Z core.

## Integration model

Large engines are kept as independent processes/services. This makes upgrades easier and keeps GPL/AGPL components behind explicit HTTP, CLI or MCP boundaries.

Run:

    npm run integrations:install

to clone supported external source trees into the ignored local .integrations directory for development.

## Current code

- approval-aware workflow engine
- YouTube-reference ingestion adapter
- Ollama adapter
- ComfyUI client
- Drift MCP client
- provider/media adapters
- reference originality guard
- long-form reference workflow
- Shorts Factory workflow
- Virality Engine scoring/variants/learning
- publishing abstraction
- React/Tauri studio shell
- CI and multi-platform build workflows

## License

The MIND-Z core remains MIT. External engines and model weights retain their own licenses and terms.
