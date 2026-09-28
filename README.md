# Creator Nexus

**Creator Nexus** is a cross-platform, human-in-the-loop content production operating system. It is designed for creators and small teams that want AI to execute the repetitive work while keeping **explicit human approval** at editorial, brand, legal/safety and publishing checkpoints.

The repository is intentionally built as an **original implementation** with clean provider contracts. It does not vendor or copy the source code of the reference projects listed below.

## What makes it different

- **Approval-first orchestration** — workflows stop at configured human gates; high/critical risk steps are never silently auto-approved.
- **Confidence-aware automation** — low-confidence outputs escalate to review instead of being treated as certain.
- **Provider mesh** — AI models, decision engines, renderers, clippers and publishing services are interchangeable adapters.
- **Local-first foundation** — the app works as a local UI and can point at local or remote OpenAI-compatible endpoints.
- **Cross-platform shell** — React/Vite for web/PWA plus Tauri 2 for Windows, macOS, Linux and mobile targets.
- **Creator pipeline** — brief → research → script → storyboard → render → QA → publish.
- **No automatic publication by default** — irreversible external actions are approval gated.

## Current runnable scope

The included application is a functional product foundation rather than a fake screenshot. The demo workflow executes real state transitions, dependency checks, confidence thresholds and approval/rejection actions. Provider adapters are included as integration contracts; external services require your own credentials and endpoint configuration.

## Repository layout

```text
creator-nexus/
├── apps/
│   └── studio/                 React/Vite UI + Tauri 2 shell
├── packages/
│   ├── core/                   workflow engine, approval policy, domain types
│   └── adapters/               OpenAI-compatible, TypeSafe-style and media HTTP adapters
├── config/workflows/           portable workflow definitions
├── docs/                       architecture, security and build documentation
├── scripts/                    smoke checks
└── .github/workflows/          CI + multi-platform release builds
```

## Quick start — web

Requirements: Node.js 22+.

```bash
npm install
npm run dev
```

Open `http://localhost:1420`.

Build and validate:

```bash
npm run typecheck
npm run build
npm test
```

## Desktop app

Install Rust and the Tauri prerequisites for your operating system, then:

```bash
npm install
npm run tauri -- dev
```

Windows installer:

```bash
npm run tauri -- build --bundles nsis
```

The GitHub Actions release workflow builds the Windows installer on a native Windows runner.

## Android

Tauri mobile requires Android Studio/SDK, Java and Rust Android targets. Initial local setup:

```bash
npm install
npm run tauri -- android init
npm run tauri -- android dev
```

For an installable test APK:

```bash
npm run tauri -- android build --debug --apk
```

The included CI job performs this on Linux with the Android SDK and uploads the generated APK artifact. For production Play Store distribution, configure a release keystore and signing secrets instead of using a debug package.

## Provider strategy

Creator Nexus does **not** hard-code one vendor. The default architecture supports:

| Capability | Adapter direction |
|---|---|
| LLM routing/fallback | OpenAI-compatible gateway; suitable for OmniRoute-style routing |
| Typed decisions/confidence | Decision provider contract; suitable for TypeSafe-style decision APIs |
| Video/motion | HTTP media-job adapter; suitable for HyperFrames/HeyGen or self-hosted render services |
| Clip generation | Media adapter or local worker; suitable for OpenShorts/AutoClip-style pipelines |
| Script/media assembly | Workflow executor plugins; FFmpeg/local workers can be attached without changing the core |
| Publishing | Webhook/provider adapter; always approval gated by default |

## Safety and credentials

- Never commit API keys. Use `.env` locally and secret stores in production.
- Keep provider keys server-side or in an OS credential store for production builds.
- Publishing, account changes, destructive actions and sensitive external writes should remain `high`/`critical` risk.
- Treat generated factual claims as unverified until the workflow records supporting evidence.
- The demo executors return sample outputs and are clearly separated from provider integrations.

See [`docs/SECURITY.md`](docs/SECURITY.md).

## Reference projects and licensing

The product architecture was informed by the public behavior/documentation of the following projects/services:

- OmniRoute — MIT
- codex-chatgpt-web — MIT
- treg — Apache-2.0 with additional hosted-service restrictions
- HyperFrames — Apache-2.0
- OpenShorts — MIT
- AutoClip — MIT
- MoneyPrinterTurbo — MIT
- Drift — GPL-3.0
- OpenMuse — MIT
- ContentFlow — source-available proprietary; **no code copied or incorporated**
- TypeSafe AI — external hosted service/API subject to its own service terms

See [`THIRD_PARTY_INSPIRATION.md`](THIRD_PARTY_INSPIRATION.md) for the design boundary.

## Release artifacts

The release workflow is prepared to produce:

- Web/PWA bundle (`dist`)
- Windows NSIS installer (`.exe`)
- Linux AppImage (`.AppImage`)
- macOS disk image (`.dmg`)
- Android test APK (`.apk`)

Actual binary generation happens on GitHub-hosted runners because each native package must be built on a compatible toolchain/OS.

## Roadmap

1. Secure local secret vault / OS keyring bridge.
2. Durable SQLite workflow persistence and resumable jobs.
3. Real provider configuration UI and health checks.
4. Browser/research worker with source provenance.
5. Media worker pool (FFmpeg, Whisper, face tracking, captions).
6. Brand kit, reusable prompt blocks and template marketplace.
7. Multi-channel content calendar and analytics ingestion.
8. Collaboration, role-based approvals and audit logs.
9. Signed production installers and auto-update channels.
10. Plugin SDK with explicit permission manifests and sandboxing.

## License

Creator Nexus itself is MIT licensed. Third-party services, APIs and any independently installed plugins retain their own licenses and terms.
