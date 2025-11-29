# Express Workflow Mode

> **Speed:** ⚡ Fastest
> **Quality:** Basic
> **Use for:** Drafts, tests, rapid prototyping

---

## Overview

Express mode is designed for maximum speed with minimal overhead. Perfect for testing ideas or creating quick drafts.

---

## Phase Configuration

```yaml
phases:
  discovery:
    enabled: false

  script:
    enabled: true
    agents:
      - script-writer
      - emotion-tagger
    council_review: false
    human_gate: false

  asset:
    enabled: false

  production:
    enabled: true
    agents:
      - voice-producer  # Voice only
    council_review: false
    human_gate: false
```

---

## Council Configuration

```yaml
council:
  mode: none
  reviewers: []
  note: "QA only, no council review"
```

---

## Human Gates

```yaml
human_gates: none
```

---

## Quality Requirements

```yaml
quality:
  minimum_score: none  # Not scored
  council_iterations: 0
  revision_rounds: 0
  final_qa: basic  # Simplified checklist
```

---

## Estimated Timeline

```
Script: 30-60 minutes
Production: 30-60 minutes

Total: 1-2 hours
```

---

## When to Use

- Testing a story concept
- Quick drafts for review
- Voice actor auditions
- Internal presentations
- Proof of concept
- Learning/experimentation

---

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       EXPRESS MODE ⚡                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────┐      ┌───────────────┐                      │
│  │ Script Writer │  →   │ Emotion Tagger │                      │
│  └───────────────┘      └───────────────┘                      │
│                                │                                │
│                                ▼                                │
│                      ┌────────────────┐                        │
│                      │ Voice Producer │                        │
│                      └────────────────┘                        │
│                                │                                │
│                                ▼                                │
│                      ┌────────────────┐                        │
│                      │   Basic QA     │                        │
│                      └────────────────┘                        │
│                                │                                │
│                                ▼                                │
│                      ┌────────────────┐                        │
│                      │    EXPORT      │                        │
│                      │  (draft only)  │                        │
│                      └────────────────┘                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Limitations

```yaml
not_included:
  - Full council review
  - Human approval gates
  - Visual production
  - SFX production
  - Comprehensive SEO
  - Detailed reports

output_quality:
  - Voice may need refinement
  - No images/videos
  - Basic metadata only
  - Not production-ready
```

---

## Basic QA Checklist

Even express mode includes essential checks:

```yaml
basic_qa:
  - [ ] No prohibited content
  - [ ] Language appropriate
  - [ ] Voice generated successfully
  - [ ] File saves correctly
```

---

## Output Warning

Express outputs include a draft marker:

```
Filename: {project}-DRAFT-voice-v1.mp3

Note: "This is a draft from Express mode.
      Not recommended for publishing without
      upgrade to Standard or Full workflow."
```

---

## Upgrade Path

```yaml
convert_to_lite:
  command: "/tale workflow lite"
  keeps: "Script and voice work"
  adds: "Audio engineer, SEO, council review"

convert_to_standard:
  command: "/tale workflow standard"
  keeps: "Script work"
  adds: "All phases and reviews"
  note: "Voice may need regeneration"

convert_to_full:
  command: "/tale workflow full"
  note: "Recommended to start fresh"
```

---

## Best Practices

```yaml
do:
  - Use for testing concepts
  - Share drafts internally
  - Iterate quickly on ideas
  - Test voice settings

dont:
  - Publish express outputs
  - Skip safety checks
  - Use for final content
  - Expect production quality
```

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
