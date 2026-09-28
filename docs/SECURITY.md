# Security model

## Trust boundaries

- UI: untrusted input surface.
- Workflow engine: trusted state transition layer.
- Provider adapters: external network boundary.
- Media workers/plugins: potentially high-risk execution boundary.
- Publishing connectors: irreversible external-action boundary.

## Required production controls

1. Store secrets in OS keychain/credential manager or a server-side secret manager.
2. Never expose provider keys to web/PWA JavaScript in production.
3. Validate all structured provider outputs against schemas before execution.
4. Require explicit approval immediately before irreversible writes (publish, delete, spend, account changes).
5. Record approval receipts with actor, timestamp, step version and artifact hash.
6. Sandbox plugins with explicit permissions for filesystem, network, process execution and credentials.
7. Use signed URLs for local/remote asset access and short expirations.
8. Add SSRF protection to URL import/research components.
9. Add antivirus/media validation for uploaded files before processing.
10. Keep audit logs immutable enough to reconstruct who approved what.

The current demo contains no real secrets and no automatic external publishing.
