# Session Continuation Guide

**Version:** 1.0.0
**Purpose:** How to handle token limits and continue workflows across sessions

---

## Token Limits

### Claude Code Session Limit

- **200,000 tokens** per conversation
- Shared across all messages
- Monitor usage during long workflows

### Token Thresholds

| Usage | Tokens | Action | Priority |
|-------|--------|--------|----------|
| 0-75% | 0-150K | Continue normally | Safe |
| 75-80% | 150-160K | **Prepare handoff** | Warning |
| 80-90% | 160-180K | **Run handoff NOW** | Urgent |
| 90%+ | 180K+ | **Emergency handoff** | Critical |

---

## Handoff Process

### Step 1: Prepare Handoff

When token usage is high or before taking a break:

```bash
/tale save "session-checkpoint"
```

This creates:
- Workflow state snapshot
- Current phase progress
- Deliverables list
- Resume instructions

### Step 2: Review Saved State

```bash
/tale checkpoints
```

Output:
```markdown
📦 Saved Checkpoints:

1. session-checkpoint (2025-11-29 15:00)
   - Phase: Script (60%)
   - Tokens: 155K / 200K

2. before-production (2025-11-29 14:30)
   - Phase: Asset (100%)
   - Tokens: 120K / 200K
```

### Step 3: Open New Session

1. Close current Claude Code session
2. Start new Claude Code session
3. Navigate to project directory

### Step 4: Resume Workflow

```bash
/tale load "session-checkpoint"
```

Or simply:
```bash
/tale continue
```

---

## What Gets Saved

### Workflow State
- Current phase
- Phase completion status
- Active agents
- Configuration settings

### Deliverables
- Scripts created
- Voice files generated
- Prompts exported
- Reports created

### Context
- Target audience
- Content type
- Preset applied
- Human feedback

---

## Auto-Save Points

PiggyTales auto-saves at these points:

| Event | Auto-Save |
|-------|-----------|
| Phase completion | Yes |
| Council review | Yes |
| Human approval | Yes |
| Export completion | Yes |
| Session end | Yes |

---

## Manual Save Commands

```bash
# Quick save current state
/tale save

# Named checkpoint
/tale save "before-production"

# List all checkpoints
/tale checkpoints

# Load specific checkpoint
/tale load "before-production"
```

---

## Resume After Break

### Quick Resume

```bash
# Continue from last auto-save
/tale continue
```

### With Status Check

```bash
# Check project status first
/tale status

# Then continue
/tale continue
```

### From Specific Point

```bash
# List checkpoints
/tale checkpoints

# Load specific one
/tale load "checkpoint-name"
```

---

## Handoff Context File

When you save, PiggyTales creates a context file:

```
.piggytales/
└── state/
    ├── workflow.json       # Machine-readable state
    └── HANDOFF_CONTEXT.md  # Human-readable summary
```

### HANDOFF_CONTEXT.md Example

```markdown
# PiggyTales Session Handoff

## Project: truyen-co-tich
- Type: Audiobook
- Audience: Children (4-12)
- Workflow: Standard

## Current State
- Phase: Script (in_progress)
- Progress: 60%
- Last Agent: Script Writer

## Completed
- [x] Discovery phase
- [ ] Script phase (60%)
- [ ] Asset phase
- [ ] Production phase

## Deliverables So Far
- discovery-report.md
- partial-script.md

## Next Steps
1. Complete chapter 3-5
2. Run Emotion Tagger
3. Council review

## Resume Command
/tale continue
```

---

## Tips for Long Projects

### 1. Save Frequently
```bash
# After major milestones
/tale save "script-complete"
/tale save "voice-generated"
```

### 2. Monitor Token Usage
Watch for token warnings in the console.

### 3. Clean Up Checkpoints
```bash
# Remove old checkpoints
/tale checkpoints clean --keep 5
```

### 4. Export Before Handoff
```bash
# Export current progress
/tale export all
# Then save
/tale save
```

---

## Troubleshooting

### State Not Loading

```bash
# Check if state file exists
/tale debug state

# Reset and start fresh
/tale reset project
```

### Missing Deliverables

Check the project directory:
```
project-name/
├── scripts/
├── production/
└── exports/
```

### Corrupted State

```bash
# Reset workflow state only
/tale reset phase

# Or full reset
/tale reset project
```

---

*PiggyTales v1.0.0*
