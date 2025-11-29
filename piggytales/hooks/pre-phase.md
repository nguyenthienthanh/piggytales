# Pre-Phase Hook - Phase Initialization

**Version:** 1.0.0
**Purpose:** Execute before each phase starts
**Trigger:** Automatically run before Phase N execution

---

## Purpose

Prepare environment and context before phase execution begins.

---

## Execution Flow

```
Phase N-1 Approved
      ↓
[PRE-PHASE HOOK] ← YOU ARE HERE
      ↓
Phase N Execution
```

---

## Pre-Phase Checklist

### 1. Load Workflow State
```yaml
actions:
  - Load current workflow state from .piggytales/state/workflow.json
  - Identify current phase number and name
  - Display phase banner
```

### 2. Verify Prerequisites
```yaml
checks:
  - Previous phase status = "approved" or "skipped"
  - Required agents are available
  - Source materials present (if discovery phase)
  - Script exists (if production phase)
```

### 3. Activate Phase Agents
```yaml
phases:
  discovery:
    agents: [content-scout, trend-analyst, legal-checker, audience-researcher]
  script:
    agents: [script-writer, scene-director, emotion-tagger, sfx-planner]
  asset:
    agents: [art-director, prompt-engineer, seo-writer, thumbnail-designer]
  production:
    agents: [image-producer, video-producer, voice-producer, sfx-producer, audio-engineer]
```

### 4. Load Phase Context
```yaml
context:
  - Previous phase deliverables
  - Project configuration
  - Target audience settings
  - Content type (audiobook/animation)
```

### 5. Display Phase Info
```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 PHASE 2: SCRIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Started: 2025-11-29 15:00:00
🤖 Active Agents: Script Writer, Emotion Tagger, SFX Planner
📦 Previous Deliverables: 3 file(s)

🎯 Objectives:
   1. Write age-appropriate script
   2. Add emotion tags for voice
   3. Plan sound effects

✅ Success Criteria:
   1. Script passes content safety check
   2. All scenes have emotion markers
   3. SFX list complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Phase-Specific Setup

### Discovery Phase
- Load source materials
- Check copyright status
- Analyze target audience

### Script Phase
- Load story outline
- Prepare emotion tag reference
- Load SFX catalog

### Asset Phase
- Load style guide
- Prepare prompt templates
- Load platform requirements

### Production Phase
- Load scripts with emotion tags
- Verify API keys (Vbee, ElevenLabs)
- Prepare output directories

---

## Error Handling

```yaml
on_error:
  - Log error to .piggytales/logs/errors.log
  - Display error message with Piggy persona
  - Suggest resolution steps
  - Do not proceed to phase execution

error_messages:
  missing_approval: "🐷❌ Cannot start phase: Previous phase not approved"
  missing_script: "🐷❌ Cannot start production: No script found"
  api_error: "🐷❌ API configuration error: Check /tale config api"
```

---

**Version:** 1.0.0
**Critical:** YES - Must complete successfully before phase runs
