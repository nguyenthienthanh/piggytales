# Full Workflow Mode

> **Speed:** 🐢 Slowest
> **Quality:** Highest
> **Use for:** Complex animation, series, high-stakes content

---

## Overview

Full workflow mode runs all phases with complete reviews and human approval gates. This ensures maximum quality and oversight at every step.

---

## Phase Configuration

```yaml
phases:
  discovery:
    enabled: true
    agents:
      - content-scout
      - trend-analyst
      - legal-checker
      - audience-researcher
    council_review: true
    human_gate: true

  script:
    enabled: true
    agents:
      - script-writer
      - scene-director
      - emotion-tagger
      - sfx-planner
    council_review: true
    human_gate: true

  asset:
    enabled: true
    agents:
      - art-director
      - prompt-engineer
      - seo-writer
      - thumbnail-designer
    council_review: true
    human_gate: true

  production:
    enabled: true
    agents:
      - image-producer
      - video-producer
      - voice-producer
      - sfx-producer
      - audio-engineer
    council_review: true
    human_gate: true
```

---

## Council Configuration

```yaml
council:
  mode: deep
  reviewers:
    - critic
    - optimist
    - analyst
  iterations: 2
  debate: true
  human_summary: true

review_points:
  - after_discovery
  - after_script
  - after_asset
  - after_production
```

---

## Human Gates

```yaml
human_gates:
  discovery_approval:
    trigger: "After discovery phase"
    requires: "Human approval to proceed"
    can_skip: false

  script_approval:
    trigger: "After script phase"
    requires: "Human approval of script"
    can_skip: false

  asset_approval:
    trigger: "After asset phase"
    requires: "Human approval of visual assets"
    can_skip: false

  final_approval:
    trigger: "After production phase"
    requires: "Human sign-off for export"
    can_skip: false
```

---

## Quality Requirements

```yaml
quality:
  minimum_score: 7.5
  council_iterations: 2
  revision_rounds: unlimited
  final_qa: required
```

---

## Estimated Timeline

```
Discovery: 2-4 hours
Script: 3-5 hours
Asset: 3-5 hours
Production: 4-8 hours
Reviews: +2-4 hours per phase

Total: 1-2 days (with human response time)
```

---

## When to Use

- Complex multi-scene animations
- Series content requiring consistency
- High-visibility/featured content
- Content with sensitive themes
- First content in a new style
- When quality is more important than speed

---

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FULL MODE 🐢                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐   ┌─────────┐   ┌──────────┐   ┌─────────────┐  │
│  │DISCOVERY │ → │ COUNCIL │ → │ HUMAN    │ → │   SCRIPT    │  │
│  │(4 agents)│   │ (deep)  │   │ APPROVAL │   │ (4 agents)  │  │
│  └──────────┘   └─────────┘   └──────────┘   └─────────────┘  │
│                                                     │          │
│                                                     ▼          │
│  ┌──────────────┐   ┌──────────┐   ┌─────────┐   ┌─────────┐ │
│  │ PRODUCTION   │ ← │ HUMAN    │ ← │ COUNCIL │ ← │  ASSET  │ │
│  │ (5 agents)   │   │ APPROVAL │   │ (deep)  │   │(4 agents)│ │
│  └──────────────┘   └──────────┘   └─────────┘   └─────────┘ │
│         │                                                      │
│         ▼                                                      │
│  ┌─────────┐   ┌──────────┐   ┌─────────┐   ┌──────────────┐ │
│  │ COUNCIL │ → │ HUMAN    │ → │   QA    │ → │   EXPORT     │ │
│  │ (deep)  │   │ APPROVAL │   │ REVIEW  │   │              │ │
│  └─────────┘   └──────────┘   └─────────┘   └──────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
