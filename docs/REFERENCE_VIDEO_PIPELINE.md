# Reference-video workflows

MIND-Z can start from a YouTube URL instead of a blank idea.

## What the system learns from the reference

The reference is analysed for abstract production signals: topic framing, hook type, information density, pacing, shot duration distribution, visual rhythm, narrative beats, transitions, caption density, audio intensity and likely retention moments.

The reference is not treated as source material to copy. The next stages independently research the topic and create a new angle, new script, new visual plan, newly generated assets and a distinct edit.

## Long-form mode

URL -> ingest -> transcript -> shot map -> structural analysis -> independent research -> new editorial angle -> original script -> storyboard -> local image/video generation -> narration -> rough cut -> Drift MCP finishing -> iterative QA -> approval -> export.

## Shorts Factory mode

URL -> transcript + shot analysis -> highlight/retention map -> multiple standalone concepts -> original short scripts -> 9:16 storyboards -> generated visuals -> TTS -> reframing/captions -> batch rough cuts -> Drift MCP finishing -> quality ranking -> approval -> exports.

## Existing open-source ideas reused

- yt-dlp for URL ingest.
- AutoClip patterns: resumable stages, transcript word indices, shot-aware reframing and highlight detection.
- OpenShorts patterns: long-to-short transformation and multi-output social workflow.
- MoneyPrinterTurbo patterns: topic/script/media/subtitle/music assembly.
- whisper.cpp for local transcript timing.
- ComfyUI/Wan for visual generation.
- Drift MCP for final professional edit.

## Quality target

The goal is not to reproduce the reference. The system should identify what makes it effective and then attempt to improve measurable production dimensions such as clarity, hook strength, pacing consistency, visual variety, audio intelligibility, caption readability and platform fit while remaining materially original.
