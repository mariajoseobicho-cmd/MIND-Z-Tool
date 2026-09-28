# Third-party inspiration and clean-room boundary

Creator Nexus is an original codebase. The projects below were reviewed to understand product patterns, public feature sets and packaging approaches. No source code from them is copied into this repository.

| Reference | Observed design ideas used at concept level | License / boundary |
|---|---|---|
| diegosouzapw/OmniRoute | provider abstraction, fallback/routing, OpenAI-compatible gateway | MIT; used as an external integration concept |
| miuuyy/codex-chatgpt-web | desktop packaging, approvals/tool harness concepts | MIT; no browser-session automation copied |
| superdesigndev/treg | tool/registry separation | Apache-2.0 plus additional restrictions; no code or hosted-registry implementation copied |
| heygen-com/hyperframes | scene/storyboard/render pipeline, motion composition concepts | Apache-2.0; integrate through adapter/CLI/API only |
| mutonby/openshorts | long-to-short pipeline, captions, reframing, publish workflow | MIT; adapter boundary |
| artbyjazi/autoclip | local-first clipping, transcript-based selection, review/export loop | MIT; adapter boundary |
| harry0703/MoneyPrinterTurbo | topic-to-script-to-media assembly flow | MIT; concept only |
| CutWire-Studios/Drift | reviewed as a separate media project | GPL-3.0; no code incorporated to avoid copyleft coupling |
| CopilotKit/openmuse | durable task plans, approvals, visible agent work | MIT; architecture concepts only |
| andremjr/contentflow | strategy/execution separation, plugin boundaries | Proprietary source-available; no code, UI, schemas or protected documentation copied |
| TypeSafe AI | typed decisions and calibrated confidence for workflow branching | External service governed by TypeSafe terms; adapter is generic and does not reproduce service internals |

Before distributing a commercial product that bundles any third-party component, perform a fresh license review of the exact dependency/version being shipped.
