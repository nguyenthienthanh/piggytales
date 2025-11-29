# Standard Workflow Mode

> **Speed:** 🚶 Balanced
> **Quality:** High
> **Use for:** Regular audiobooks, standard animations

---

## Overview

Standard workflow provides a balanced approach with optional discovery, key council reviews, and selective human gates.

---

## Phase Configuration

```yaml
phases:
  discovery:
    enabled: optional  # Can skip if source provided
    agents:
      - content-scout
      - legal-checker  # Always required
      - audience-researcher
    council_review: false
    human_gate: false

  script:
    enabled: true
    agents:
      - script-writer
      - scene-director  # Skip for audiobook
      - emotion-tagger
      - sfx-planner  # Optional
    council_review: true
    human_gate: optional

  asset:
    enabled: true  # Skip for audiobook
    agents:
      - art-director
      - prompt-engineer
      - seo-writer
      - thumbnail-designer
    council_review: false
    human_gate: false

  production:
    enabled: true
    agents:
      - image-producer  # Skip for audiobook
      - video-producer  # Skip for audiobook
      - voice-producer
      - sfx-producer  # Optional
      - audio-engineer
    council_review: true
    human_gate: true
```

---

## Council Configuration

```yaml
council:
  mode: standard
  reviewers:
    - critic
    - optimist
    - analyst
  iterations: 1
  debate: true
  human_summary: false

review_points:
  - after_script
  - after_production
```

---

## Human Gates

```yaml
human_gates:
  script_approval:
    trigger: "After script phase"
    requires: "Human approval of script"
    can_skip: true

  final_approval:
    trigger: "After production phase"
    requires: "Human sign-off for export"
    can_skip: false
```

---

## Quality Requirements

```yaml
quality:
  minimum_score: 6.5
  council_iterations: 1
  revision_rounds: 2
  final_qa: required
```

---

## Estimated Timeline

```
Discovery: 1-2 hours (if included)
Script: 2-3 hours
Asset: 2-3 hours (if included)
Production: 3-5 hours
Reviews: +1-2 hours per review point

Total: 3-8 hours
```

---

## When to Use

- Regular content production
- Established content formats
- Standard audiobooks
- Simple animations
- Follow-up content in series
- Moderate time constraints

---

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      STANDARD MODE 🚶                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐                    ┌─────────────┐           │
│  │  DISCOVERY   │ ─────────────────→ │   SCRIPT    │           │
│  │  (optional)  │                    │ (4 agents)  │           │
│  └──────────────┘                    └─────────────┘           │
│                                              │                  │
│                                              ▼                  │
│                     ┌─────────────┐   ┌───────────┐            │
│                     │   HUMAN     │ ← │  COUNCIL  │            │
│                     │  (optional) │   │ (standard)│            │
│                     └─────────────┘   └───────────┘            │
│                            │                                    │
│                            ▼                                    │
│  ┌───────────┐       ┌─────────────┐                           │
│  │  ASSET    │ ────→ │ PRODUCTION  │                           │
│  │ (optional)│       │ (5 agents)  │                           │
│  └───────────┘       └─────────────┘                           │
│                            │                                    │
│                            ▼                                    │
│  ┌───────────┐   ┌──────────┐   ┌─────────┐   ┌──────────┐    │
│  │  COUNCIL  │ → │  HUMAN   │ → │   QA    │ → │  EXPORT  │    │
│  │ (standard)│   │ APPROVAL │   │ REVIEW  │   │          │    │
│  └───────────┘   └──────────┘   └─────────┘   └──────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Skip Options

### For Audiobook

```yaml
skip:
  agents:
    - scene-director
    - art-director
    - prompt-engineer
    - thumbnail-designer
    - image-producer
    - video-producer
```

### For Quick Content

```yaml
skip:
  phases:
    - discovery
  agents:
    - trend-analyst
```

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
