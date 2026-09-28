# MIND-Z project invariants

These rules protect the product's reasoning model as the codebase grows.

1. **Capability-first architecture** — workflows request capabilities, not hard-coded vendors.
2. **Fallbacks are first-class** — critical capabilities should expose at least one alternate path when practical.
3. **Open-source/local-first** — free/local providers are preferred where quality is acceptable.
4. **Human control** — publishing and other irreversible/high-risk actions remain approval-gated.
5. **Reference originality** — reference videos teach abstract structure and production patterns; they are not copied.
6. **Professional finishing remains available** — Drift MCP stays a supported final-edit path.
7. **Browser is a fallback/tool surface, not the only path** — APIs/CLIs/local engines remain preferred where more reliable.
8. **Observability before autonomy** — routing decisions, fallbacks and errors must remain inspectable.
9. **No silent capability deletion** — integration/workflow removals must fail architecture checks unless intentionally updated.
10. **Regression tests accompany architecture changes** — every major subsystem must have at least one invariant checked in CI.

The CI smoke and architecture scripts enforce a minimum version of these guarantees.
