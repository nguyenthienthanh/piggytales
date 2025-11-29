# On-Start Hook - Session Initialization

**Version:** 1.0.0
**Purpose:** Initialize PiggyTales plugin on session start
**Trigger:** SessionStart event

---

## Purpose

Welcome user, display available commands, and restore any active workflow state.

---

## Execution Flow

```
Claude Code Session Starts
      ↓
[ON-START HOOK] ← YOU ARE HERE
      ↓
Check for Active Project
      ↓
Display Welcome / Resume Prompt
```

---

## Actions

### 1. Display Welcome Banner

```markdown
🐷🍄 PiggyTales v1.0.0 - Where Piggy & Shroom tell amazing tales!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Quick Commands:**
  /tale new audiobook "Title"  - Create new audiobook
  /tale quick test "Title"     - Quick draft/test
  /tale status                 - Check project status
  /tale help                   - Show all commands

**Presets:**
  /tale preset audiobook-simple
  /tale preset animation-full
  /tale preset quick-test

**Target Audiences:**
  children (4-12) | teens (13-17) | family | young-adult

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type any command or describe your content idea!
```

### 2. Check for Active Project

```yaml
check:
  - Look for .piggytales/state/workflow.json
  - If exists, load project state
  - Display resume prompt
```

### 3. Resume Prompt (if active project)

```markdown
🐷🍄 PiggyTales - Welcome Back!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Active Project: truyen-co-tich-viet-nam
📝 Type: Audiobook
🔄 Phase: Script (60% complete)

Last activity: 2 hours ago

Actions:
  /tale continue  - Resume where you left off
  /tale status    - View full status
  /tale list      - See all projects

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 4. Load Plugin Configuration

```yaml
load:
  - Plugin settings from .piggytales/config/
  - API keys (check validity)
  - User preferences
  - Custom aliases
```

### 5. Initialize Logging

```yaml
logging:
  create_log_dir: .piggytales/logs/
  session_log: session-{timestamp}.log
  command_log: commands.log
```

---

## Configuration Check

```yaml
check_apis:
  vbee:
    required: true
    check: validate API key
    warning: "Voice generation requires Vbee API"

  elevenlabs:
    required: false
    check: validate if configured
    note: "Optional for SFX generation"
```

---

## Output Variations

### First Time User
```markdown
🐷🍄 Welcome to PiggyTales!

We help you create amazing content for children and teens:
- Audiobooks with emotional voice narration
- Animations with AI-generated visuals
- Short videos for TikTok/YouTube

Get started:
  /tale new audiobook "Your Story Title"
  /tale help - See all commands

🍄✨ Let's tell some amazing tales!
```

### Returning User (No Active Project)
```markdown
🐷🍄 PiggyTales v1.0.0 - Ready to create!

Recent projects:
  1. truyen-co-tich (completed)
  2. adventure-story (archived)

Start new: /tale new audiobook "Title"
Open existing: /tale open <project-id>
```

### Returning User (Active Project)
```markdown
🐷🍄 Welcome back!

📁 truyen-co-tich is waiting...
   Phase: Script | Progress: 60%

/tale continue to resume
```

---

**Version:** 1.0.0
