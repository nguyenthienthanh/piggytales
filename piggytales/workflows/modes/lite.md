# Lite Workflow Mode

> **Speed:** 🏃 Fast
> **Quality:** Good
> **Use for:** Simple audiobooks, quick content

---

## Overview

Lite workflow streamlines production by focusing on script and production phases with minimal reviews.

---

## Phase Configuration

```yaml
phases:
  discovery:
    enabled: false  # Skipped
    note: "Legal check embedded in script phase"

  script:
    enabled: true
    agents:
      - script-writer
      - emotion-tagger
    council_review: false
    human_gate: false

  asset:
    enabled: false  # Skipped
    note: "SEO moved to production"

  production:
    enabled: true
    agents:
      - voice-producer
      - audio-engineer
      - seo-writer  # Moved from asset
    council_review: true  # Quick only
    human_gate: true
```

---

## Council Configuration

```yaml
council:
  mode: quick
  reviewers:
    - analyst  # Only analyst
  iterations: 1
  debate: false
  human_summary: false

review_points:
  - after_production
```

---

## Human Gates

```yaml
human_gates:
  final_approval:
    trigger: "After production phase"
    requires: "Human sign-off for export"
    can_skip: true
```

---

## Quality Requirements

```yaml
quality:
  minimum_score: 6.0
  council_iterations: 1
  revision_rounds: 1
  final_qa: required
```

---

## Estimated Timeline

```
Script: 1-2 hours
Production: 2-3 hours
Review: +30 minutes

Total: 3-5 hours
```

---

## When to Use

- Simple audiobooks
- Single-voice content
- Short stories
- Internal drafts
- Time-sensitive content
- Low-complexity narratives

---

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         LITE MODE 🏃                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                      SCRIPT PHASE                          │ │
│  │                                                            │ │
│  │   ┌───────────────┐      ┌───────────────┐               │ │
│  │   │ Script Writer │  →   │ Emotion Tagger │               │ │
│  │   └───────────────┘      └───────────────┘               │ │
│  │                                                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                              │                                  │
│                              ▼                                  │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    PRODUCTION PHASE                        │ │
│  │                                                            │ │
│  │   ┌────────────┐  ┌──────────────┐  ┌───────────┐        │ │
│  │   │   Voice    │→ │    Audio     │→ │    SEO    │        │ │
│  │   │  Producer  │  │   Engineer   │  │   Writer  │        │ │
│  │   └────────────┘  └──────────────┘  └───────────┘        │ │
│  │                                                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────┐   ┌──────────┐   ┌─────────┐   ┌──────────┐      │
│  │ COUNCIL │ → │  HUMAN   │ → │   QA    │ → │  EXPORT  │      │
│  │ (quick) │   │(optional)│   │ REVIEW  │   │          │      │
│  └─────────┘   └──────────┘   └─────────┘   └──────────┘      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Included Checks

Even in lite mode, these safety measures remain:

```yaml
always_included:
  - Content safety check (embedded in script-writer)
  - Basic legal verification (for public domain)
  - QA review checklist
  - File naming standards
```

---

## Upgrade Path

If during lite workflow you need more:

```yaml
upgrade_to_standard:
  command: "/tale workflow standard"
  note: "May need to redo some work"

add_discovery:
  command: "/tale unskip discovery"
  note: "Adds research phase"

add_visuals:
  command: "/tale unskip asset"
  note: "Adds visual production"
```

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
