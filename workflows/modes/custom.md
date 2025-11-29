# Custom Workflow Mode

> **Speed:** 🔧 Variable
> **Quality:** Variable
> **Use for:** Unique requirements

---

## Overview

Custom mode allows you to build your own workflow by selecting phases, agents, review points, and human gates.

---

## How to Use

### Command

```bash
/tale workflow custom
```

### Interactive Builder

```
🔧 Custom Workflow Builder

Select phases to include:
  [x] Discovery
      [x] Content Scout
      [ ] Trend Analyst (skipped)
      [x] Legal Checker
      [x] Audience Researcher
  [x] Script
      [x] Script Writer
      [ ] Scene Director (skipped - audiobook)
      [x] Emotion Tagger
      [x] SFX Planner
  [ ] Asset (skipped - audiobook)
  [x] Production
      [ ] Image Producer (skipped)
      [ ] Video Producer (skipped)
      [x] Voice Producer
      [x] SFX Producer
      [x] Audio Engineer

Council review points:
  [ ] After Discovery
  [x] After Script
  [ ] After Asset
  [x] After Production

Human approval gates:
  [ ] Discovery approval
  [x] Script approval
  [ ] Asset approval
  [x] Final approval

Save as template? [y/n]: y
Template name: "my-audiobook-workflow"

✅ Custom workflow saved!
```

---

## Configuration Options

### Phase Selection

```yaml
phases:
  discovery:
    include: true/false
    agents: [list of agents to include]

  script:
    include: true/false
    agents: [list of agents to include]

  asset:
    include: true/false
    agents: [list of agents to include]

  production:
    include: true/false
    agents: [list of agents to include]
```

### Agent Selection

```yaml
# Discovery agents
discovery_agents:
  - content-scout    # Optional
  - trend-analyst    # Optional
  - legal-checker    # Required (auto-included)
  - audience-researcher  # Optional

# Script agents
script_agents:
  - script-writer    # Required (auto-included)
  - scene-director   # Optional
  - emotion-tagger   # Required (auto-included)
  - sfx-planner      # Optional

# Asset agents
asset_agents:
  - art-director     # Optional
  - prompt-engineer  # Optional
  - seo-writer       # Required (auto-included)
  - thumbnail-designer  # Optional

# Production agents
production_agents:
  - image-producer   # Optional
  - video-producer   # Optional
  - voice-producer   # Required (auto-included)
  - sfx-producer     # Optional
  - audio-engineer   # Optional (required if SFX)
```

### Council Configuration

```yaml
council:
  mode: none/quick/standard/deep
  review_points:
    - after_discovery  # Optional
    - after_script     # Optional
    - after_asset      # Optional
    - after_production # Recommended
```

### Human Gates

```yaml
human_gates:
  discovery_approval: true/false
  script_approval: true/false
  asset_approval: true/false
  final_approval: true/false
```

---

## Validation Rules

Custom workflows must meet minimum requirements:

```yaml
required_agents:
  - legal-checker    # Cannot skip
  - script-writer    # Cannot skip
  - emotion-tagger   # Cannot skip
  - voice-producer   # Cannot skip
  - seo-writer       # Cannot skip
  - qa-reviewer      # Auto-included

required_checks:
  - content_safety   # Always runs
  - final_qa         # Always runs
```

---

## Template Commands

```bash
# Save current custom workflow
/tale workflow save "template-name"

# Load saved template
/tale workflow load "template-name"

# List saved templates
/tale workflow list

# Delete template
/tale workflow delete "template-name"
```

---

## Example Custom Workflows

### Audiobook with Discovery

```yaml
name: "audiobook-with-research"
phases:
  discovery:
    include: true
    agents: [content-scout, legal-checker, audience-researcher]
  script:
    include: true
    agents: [script-writer, emotion-tagger, sfx-planner]
  asset:
    include: false
  production:
    include: true
    agents: [voice-producer, sfx-producer, audio-engineer, seo-writer]
council:
  mode: standard
  review_points: [after_script, after_production]
human_gates:
  script_approval: true
  final_approval: true
```

### Quick Animation

```yaml
name: "quick-animation"
phases:
  discovery:
    include: false
  script:
    include: true
    agents: [script-writer, scene-director, emotion-tagger]
  asset:
    include: true
    agents: [art-director, prompt-engineer, seo-writer]
  production:
    include: true
    agents: [image-producer, voice-producer, audio-engineer]
council:
  mode: quick
  review_points: [after_production]
human_gates:
  final_approval: true
```

### Voice-Only Test

```yaml
name: "voice-test"
phases:
  discovery:
    include: false
  script:
    include: true
    agents: [script-writer, emotion-tagger]
  asset:
    include: false
  production:
    include: true
    agents: [voice-producer]
council:
  mode: none
human_gates: none
```

---

## Import/Export

```bash
# Export workflow to file
/tale workflow export "template-name"
# Creates: templates/workflows/template-name.yaml

# Import workflow from file
/tale workflow import "path/to/workflow.yaml"
```

---

## Best Practices

```yaml
recommendations:
  - Always include legal-checker
  - Include council review for important content
  - Add human gates for major decisions
  - Test custom workflows on draft content first
  - Save frequently-used configurations as templates

warnings:
  - Minimal workflows may miss quality issues
  - Skipping council reduces feedback
  - No human gates means no checkpoints
```

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
