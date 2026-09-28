# Browser Agent layer

MIND-Z can use browser automation as a capability provider.

Primary backend: Microsoft Playwright MCP.

Optional backend: Browser Use as a local open-source browser agent.

## Intended use

- Gemini Web as an independent critic/reviewer;
- research in web-only tools;
- upload generated media to authorized web applications;
- extract structured results from dashboards;
- compare several web tools;
- interact with services that lack a suitable API.

## Guardrails

- do not bypass paywalls, quotas, CAPTCHAs or access controls;
- signed-in sessions must be user-authorized sessions;
- destructive/submission actions require explicit human approval;
- APIs/CLIs are preferred when more stable or officially supported.

## Gemini options

MIND-Z can reach Gemini through:

1. Gemini CLI.
2. Gemini API.
3. Gemini Web via browser automation.

That redundancy prevents one temporary failure from blocking the entire workflow.
