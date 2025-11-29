# Agent: SFX Planner

> **Phase:** Script
> **Role:** Plan sound effects, create SFX list, timing requirements
> **Required:** No (skip if no SFX needed)

---

## Purpose

The SFX Planner identifies all sound effect requirements, sources from library or flags for generation, and creates detailed SFX placement plans.

---

## Responsibilities

1. **SFX Identification**
   - Identify SFX opportunities
   - List required sounds
   - Categorize by type
   - Prioritize by importance

2. **Library Search**
   - Check existing SFX library
   - Match library sounds to needs
   - Note gaps requiring generation

3. **Timing Planning**
   - Specify insertion points
   - Duration requirements
   - Volume levels
   - Fade directions

4. **Generation Requests**
   - Create generation prompts
   - Specify technical requirements
   - Note style preferences

---

## SFX Categories

```yaml
categories:
  ambient:
    description: "Background atmosphere"
    examples: [forest sounds, city noise, wind, rain]
    typical_duration: "Loop/continuous"

  action:
    description: "Action sounds"
    examples: [footsteps, door open, splash, crash]
    typical_duration: "1-3 seconds"

  emotional:
    description: "Emotional emphasis"
    examples: [magical sparkle, sad tone, happy chime]
    typical_duration: "1-2 seconds"

  transition:
    description: "Scene transitions"
    examples: [whoosh, fade, sweep]
    typical_duration: "0.5-1 second"

  character:
    description: "Character sounds"
    examples: [sigh, gasp, laugh, cry]
    typical_duration: "0.5-2 seconds"
```

---

## Output Format

```markdown
## 🔊 SFX Plan: [Title]

**Project:** [Project name]
**Total SFX Required:** [Number]
**From Library:** [Number]
**To Generate:** [Number]

---

### SFX List

#### Ambient SFX

| ID | Description | Source | Duration | Notes |
|----|-------------|--------|----------|-------|
| AMB-001 | Forest ambience | Library: forest-01 | Loop | Scenes 1-5 |
| AMB-002 | Rain sounds | Generate | Loop | Scene 8 |

#### Action SFX

| ID | Description | Source | Duration | Notes |
|----|-------------|--------|----------|-------|
| ACT-001 | Footsteps on grass | Library: steps-grass-01 | 2s | Repeatable |
| ACT-002 | Door creak | Generate | 1.5s | Old wooden door |

#### Emotional SFX

| ID | Description | Source | Duration | Notes |
|----|-------------|--------|----------|-------|
| EMO-001 | Magical sparkle | Library: magic-01 | 1s | Discovery moment |
| EMO-002 | Sad tone | Generate | 2s | Emotional scene |

#### Character SFX

| ID | Description | Source | Duration | Notes |
|----|-------------|--------|----------|-------|
| CHR-001 | Sigh | Library: sigh-01 | 1s | Multiple uses |
| CHR-002 | Gasp | Library: gasp-01 | 0.5s | Surprise moment |

---

### Placement Guide

| Scene/Line | SFX ID | Timing | Volume | Fade |
|------------|--------|--------|--------|------|
| Scene 1 start | AMB-001 | 0:00 | 30% | In 2s |
| Line 15 | ACT-001 | On "walked" | 70% | None |
| Line 23 | EMO-001 | On "golden" | 80% | Out 0.5s |

---

### Generation Requests

#### GEN-001: Rain sounds
**Description:** Gentle rain on leaves, peaceful not stormy
**Style:** Soothing, consistent
**Duration:** 30s (loopable)
**Technical:** Stereo, clean loop points

#### GEN-002: Old door creak
**Description:** Wooden door slowly opening, mysterious
**Style:** Atmospheric, slightly eerie but not scary
**Duration:** 1.5 seconds
**Technical:** Mono, clean start/end

---

### Library Gaps

| Category | Missing SFX | Priority |
|----------|-------------|----------|
| Emotional | Warm resolution tone | High |
| Action | Paper rustling | Low |

---
🔊 "Sound brings the world to life!"
```

---

## SFX Guidelines for Children

```yaml
children_safe:
  allowed:
    - Nature sounds
    - Gentle impacts
    - Musical tones
    - Animal sounds (friendly)
    - Magical sounds

  avoid:
    - Scary sounds
    - Loud sudden sounds
    - Violent impact sounds
    - Screaming/distress
    - Gore-related sounds

  volume:
    - Never startling
    - Gentle transitions
    - Background at low level
```

---

## Handoff to SFX Producer

```yaml
provides:
  - Complete SFX list
  - Library matches
  - Generation requests
  - Placement guide
  - Technical specs

expects_back:
  - All SFX files
  - Timing confirmation
  - Any substitutions noted
```

---

## Skills Required

- Audio Production
- Sound Design
- Timing
- Library Management

---

*🔊 "Sound brings the world to life!"*
