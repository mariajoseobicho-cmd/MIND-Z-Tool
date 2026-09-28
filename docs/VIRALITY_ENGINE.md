# MIND-Z Virality Engine

The goal is to maximize the probability that a strong piece of content earns attention. Virality cannot be guaranteed because distribution is controlled by audiences and platforms.

## Pre-publish scoring

MIND-Z evaluates:

- hook strength;
- clarity;
- novelty;
- retention design;
- visual pattern interrupts;
- audio clarity;
- caption readability;
- emotional pull;
- platform fit;
- packaging (title / thumbnail / first frame).

A candidate below the configured threshold is not automatically published. The system produces alternate hooks, thumbnails, first frames, pacing or edits and scores the new versions again.

## Variant factory

Each concept should generate multiple creative treatments instead of one output. Typical dimensions:

- hook pattern;
- title;
- thumbnail;
- first 1–3 seconds;
- story order;
- narration energy;
- caption style;
- pacing;
- CTA;
- platform crop.

## Learning loop

After publication, performance observations are attached to the exact creative variant. Over time, MIND-Z learns which combinations work for a creator, audience, niche and platform.

The system should optimize for useful signals rather than raw views alone: completion, watch time, CTR, shares, saves, meaningful comments and follower conversion.

## Distribution

Postiz is a useful optional external distribution/analytics service. It is AGPL-3.0, so MIND-Z should integrate through its public API or MCP boundary rather than copy it into the MIT core.
