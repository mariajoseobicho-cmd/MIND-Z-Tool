# Resilient routing

MIND-Z routes by capability, not by vendor.

For every requested capability the runtime produces an ordered plan containing one selected provider and zero or more fallbacks.

## Decision factors

- provider health;
- explicit priority;
- historical reliability;
- free vs free-tier vs paid;
- local vs remote privacy;
- preferred/excluded providers;
- whether browser automation is allowed;
- whether paid fallbacks are allowed.

## Default philosophy

1. Prefer local/free engines when they can do the job well.
2. Prefer stable APIs or CLIs for structured work.
3. Use MCP for rich tool ecosystems and stateful editors.
4. Use browser automation when a useful capability exists only in the web UI or an authenticated browser session.
5. Treat paid APIs as optional last-resort fallbacks unless the user explicitly prefers them.
6. Never silently perform destructive or irreversible browser actions.

Example chain:

Ollama -> Gemini CLI -> Gemini API -> Gemini Web via browser

ComfyUI -> Wan -> optional cloud video API

Drift MCP -> FFmpeg fallback

whisper.cpp -> alternative local transcriber -> optional remote transcription
