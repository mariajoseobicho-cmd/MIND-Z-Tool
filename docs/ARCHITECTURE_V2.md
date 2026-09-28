# MIND-Z v0.2 architecture

MIND-Z is an orchestration product, not a bundle of copied repositories. Existing open-source engines run behind stable adapters so each can be upgraded or replaced independently.

## End-to-end flow

Idea -> strategy -> research -> script approval -> shot plan -> image/video generation -> narration -> transcription/captions -> automatic rough cut -> Drift MCP professional finishing -> QA -> human approval -> export/publish.

## Core planes

- Control plane: workflow engine, approval rules, provenance, quality policy and project state.
- Provider plane: local and optional cloud engines registered by capability.
- Tool plane: MCP clients/servers and local process wrappers.
- Media plane: ComfyUI/Wan, Kokoro, whisper.cpp and FFmpeg.
- Finishing plane: Drift over MCP.
- Runtime plane: queues, workers, persistence and secrets.

## Quality loop

The differentiator is not merely generation. MIND-Z should iterate automatically:

1. Generate candidate assets.
2. Score technical quality and semantic fit.
3. Reject/regenerate weak shots.
4. Assemble a rough cut.
5. Ask Drift for timeline state and visual samples.
6. Apply edit batches through MCP.
7. Capture/inspect again.
8. Continue until quality thresholds pass.
9. Ask the human for final approval.

This turns the system from a content generator into a semi-autonomous production agent.
