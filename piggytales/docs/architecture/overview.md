# PiggyTales Architecture Overview

> **System design and component structure**

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PIGGYTALES CCPM                                 │
│                    🐷 Piggy & 🍄 Shroom                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    COUNCIL (Cross-Review)                        │   │
│  │     🐷 Critic    🍄 Optimist    🐷🍄 Analyst                     │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  DISCOVERY (4)     SCRIPT (4)      ASSET (4)       PRODUCTION (5)      │
│  ┌───────────┐    ┌───────────┐   ┌───────────┐   ┌───────────┐       │
│  │Content    │    │Script     │   │Art        │   │Image      │       │
│  │Scout      │    │Writer     │   │Director   │   │Producer   │       │
│  ├───────────┤    ├───────────┤   ├───────────┤   ├───────────┤       │
│  │Trend      │    │Scene      │   │Prompt     │   │Video      │       │
│  │Analyst    │    │Director   │   │Engineer   │   │Producer   │       │
│  ├───────────┤    ├───────────┤   ├───────────┤   ├───────────┤       │
│  │Legal      │    │Emotion    │   │SEO        │   │Voice      │       │
│  │Checker    │    │Tagger     │   │Writer     │   │Producer   │       │
│  ├───────────┤    ├───────────┤   ├───────────┤   ├───────────┤       │
│  │Audience   │    │SFX        │   │Thumbnail  │   │SFX        │       │
│  │Researcher │    │Planner    │   │Designer   │   │Producer   │       │
│  └───────────┘    └───────────┘   └───────────┘   ├───────────┤       │
│                                                    │Audio      │       │
│                                                    │Engineer   │       │
│                                                    └───────────┘       │
├─────────────────────────────────────────────────────────────────────────┤
│  MANAGEMENT (2)                                                         │
│  ┌───────────────────────────────────────────────────────────────┐     │
│  │     📋 Project Manager          🔍 QA Reviewer                │     │
│  └───────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Workflow Flow

```
User Command
     ↓
┌────────────────┐
│ Project Manager│ ─── Orchestrates workflow
└───────┬────────┘
        ↓
┌────────────────┐
│   Discovery    │ ─── Content research (optional)
│    Phase       │
└───────┬────────┘
        ↓
┌────────────────┐
│    Script      │ ─── Script writing
│    Phase       │
└───────┬────────┘
        ↓
┌────────────────┐
│   Council      │ ─── Cross-review
│   Review       │
└───────┬────────┘
        ↓
┌────────────────┐
│    Asset       │ ─── Visual assets (animation)
│    Phase       │
└───────┬────────┘
        ↓
┌────────────────┐
│  Production    │ ─── Media generation
│    Phase       │
└───────┬────────┘
        ↓
┌────────────────┐
│   Council      │ ─── Final review
│   Review       │
└───────┬────────┘
        ↓
┌────────────────┐
│  QA Reviewer   │ ─── Quality check
└───────┬────────┘
        ↓
    Export
```

---

## Component Structure

### Plugin Files
```
piggytales/
├── .claude-plugin/
│   └── plugin.json          # Plugin metadata
├── CLAUDE.md                # Main instructions
├── commands/                # Command handlers
├── hooks/                   # Lifecycle hooks
├── agents/                  # Agent definitions
├── skills/                  # Skill definitions
├── rules/                   # Rule definitions
├── workflows/               # Workflow configs
├── config/                  # Configuration files
├── library/                 # Asset libraries
├── templates/               # Output templates
├── scripts/                 # Shell scripts
└── docs/                    # Documentation
```

### Runtime Directories
```
.piggytales/                 # Created per project
├── state/
│   ├── workflow.json        # Current workflow state
│   └── pending-approval.json
├── logs/
│   ├── commands.log
│   └── errors.log
├── cache/
│   └── api-responses/
└── exports/
```

---

## Agent Architecture

### Agent Definition

```yaml
# agents/script/script-writer.md
name: Script Writer
phase: script
required: true

skills:
  - creative-writing
  - storytelling

rules:
  - content-safety
  - brand-voice

inputs:
  - source_material
  - target_audience
  - content_type

outputs:
  - full-script.md
  - voice-script-tagged.md
```

### Agent Communication

```
┌─────────────┐    deliverables    ┌─────────────┐
│   Agent A   │ ───────────────→ │   Agent B   │
└─────────────┘                    └─────────────┘
       ↑                                  │
       │         workflow state           │
       └──────────────────────────────────┘
```

---

## Hooks System

### Lifecycle Events

```
SessionStart
     ↓
PreToolUse → Tool Execution → PostToolUse
     ↓
UserPromptSubmit
     ↓
Stop (approval needed)
     ↓
SessionEnd
```

### Hook Types

| Type | Purpose |
|------|---------|
| `prompt` | Display message to user |
| `command` | Execute shell command |
| `script` | Run custom script |

---

## State Management

### Workflow State

```json
{
  "project_id": "truyen-co-tich",
  "type": "audiobook",
  "audience": "children",
  "workflow_mode": "standard",
  "current_phase": "script",
  "phases": {
    "discovery": { "status": "completed" },
    "script": { "status": "in_progress" },
    "asset": { "status": "pending" },
    "production": { "status": "pending" }
  },
  "deliverables": [],
  "viral_score": null
}
```

---

## API Integration

### Vbee TTS

```
Script → Emotion Tags → Vbee API → Audio Files
           ↓
     voice-script-tagged.md
```

### External Services

| Service | Purpose | Status |
|---------|---------|--------|
| Vbee | Vietnamese TTS | Active |
| ElevenLabs | SFX generation | Optional |
| NanoBanana | Image generation | Planned |
| Veo3 | Video generation | Planned |

---

## Security Considerations

### Content Safety

```
User Input
     ↓
┌─────────────────┐
│ Content Safety  │ ─── Block prohibited content
│ Check Hook      │
└───────┬─────────┘
        ↓
   Pass / Block / Flag
```

### Permission Model

- **Allow list:** Safe operations
- **Deny list:** Blocked operations
- **Ask list:** Require confirmation

---

*PiggyTales Architecture v1.0.0*
