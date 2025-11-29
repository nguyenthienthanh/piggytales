# PiggyTales Testing Guide

**Version:** 1.0.0
**Purpose:** How to test PiggyTales commands and workflows

---

## How Commands Work

PiggyTales uses `/tale` commands (or `/t` shortcut):

```bash
/tale status
/t s
```

Claude Code reads the command and executes the workflow.

---

## TEST 1: Quick Command Test (2 minutes)

### Test if commands are recognized:

```bash
/tale status
```

**Expected Response:**
```markdown
🐷🍄 PiggyTales - No Active Project

No project currently open.

Start a new project:
  /tale new audiobook "Title"
  /tale quick test "Title"

Or open existing:
  /tale list
  /tale open <project-id>
```

---

## TEST 2: Create Project (3 minutes)

### Create a test project:

```bash
/tale quick test "My Test Story"
```

**Expected: Claude Should:**
1. Create project with Express workflow
2. Activate minimal agents (Script Writer, Emotion Tagger, Voice Producer)
3. Show project created message

**Expected Output:**
```markdown
🐷🍄 PiggyTales - Quick Start!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 Project: my-test-story
📝 Type: Audiobook (Quick Test)
🔄 Mode: Express

⚡ Skipped:
  - Discovery phase
  - Asset phase
  - Council reviews

🤖 Active Agents:
  1. Script Writer
  2. Emotion Tagger
  3. Voice Producer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Ready! Provide your content or use:
  /tale source add "your story text..."

Then: /tale next
```

---

## TEST 3: Set Audience (2 minutes)

### Test audience command:

```bash
/tale audience children
```

**Expected Output:**
```markdown
🐷🍄 Target Audience Set: Children

📋 Guidelines Active:
  - Age range: 4-12 years
  - Simple, clear language
  - No scary or violent content
  - Educational value preferred
  - Bright, friendly visuals

🛡️ Content Safety: STRICT MODE
```

---

## TEST 4: Preset Application (2 minutes)

### Test preset loading:

```bash
/tale preset audiobook-simple
```

**Expected Output:**
```markdown
🐷🍄 Preset Applied: audiobook-simple

📋 Configuration:
  - Workflow: Lite Mode
  - Phases: Script → Production
  - Agents: 5 active
  - Council: Quick review

🤖 Active Agents:
  1. Script Writer
  2. Emotion Tagger
  3. Voice Producer
  4. Audio Engineer
  5. SEO Writer
```

---

## TEST 5: Workflow Commands (5 minutes)

### Test workflow status:

```bash
/tale phases
```

**Expected Output:**
```markdown
🐷🍄 Workflow Phases

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Progress: ░░░░░░░░░░░░░░░░ 0%

📋 Phases:
  ⏳ Discovery - Skipped
  ⏳ Script - Pending
  ⏳ Asset - Skipped
  ⏳ Production - Pending

Current: Ready to start Script phase
Next: /tale next or /tale phase script
```

---

## TEST 6: Council Review (3 minutes)

### Test council command:

```bash
/tale council quick
```

**Expected (if no content yet):**
```markdown
🐷❓ Cannot run council review

No content to review yet.
Complete Script phase first:
  /tale phase script
```

**Expected (with content):**
```markdown
🐷🍄 Council Review - Quick Mode

🐷🍄 ANALYST:

📊 Viral Score: X.X/10

Breakdown:
- Hook Strength: X/10
- Emotional Impact: X/10
- Shareability: X/10
- Trend Alignment: X/10
- Uniqueness: X/10

Recommendation: [APPROVE/REVISE]
```

---

## TEST 7: Help System (1 minute)

### Test help command:

```bash
/tale help
```

**Expected Output:**
Shows complete command reference.

### Test specific command help:

```bash
/tale help voice
```

**Expected Output:**
Shows voice command details.

---

## TEST 8: Full Workflow (10 minutes)

### Complete mini workflow:

```bash
# 1. Create project
/tale new audiobook "Test Story"

# 2. Set audience
/tale audience children

# 3. Apply preset
/tale preset audiobook-simple

# 4. Add source (simple test content)
/tale source add "Once upon a time, there was a kind little rabbit."

# 5. Start script phase
/tale phase script

# 6. Run council review
/tale council quick

# 7. Check status
/tale status

# 8. Export what we have
/tale export script
```

---

## Expected Workflow Flow

```
/tale new audiobook "Title"
       ↓
🐷🍄 Project Created
       ↓
/tale preset audiobook-simple
       ↓
🐷🍄 Preset Applied
       ↓
/tale next (or /tale phase script)
       ↓
🤖 Script Writer runs
       ↓
🐷🍄 Script Complete
       ↓
/tale council
       ↓
🐷 Critic, 🍄 Optimist review
       ↓
/tale approve
       ↓
🤖 Production agents run
       ↓
🐷🍄 Complete!
       ↓
/tale export all
```

---

## Troubleshooting

### Commands Not Recognized

Try being explicit:
```bash
Please execute: /tale status
```

### Need to Reset

```bash
/tale reset project
```

### Check Debug Info

```bash
/tale debug state
```

---

## Shortcut Reference

| Shortcut | Full Command |
|----------|-------------|
| `/t s` | `/tale status` |
| `/t n` | `/tale next` |
| `/t a` | `/tale approve` |
| `/t c` | `/tale council` |
| `/t r` | `/tale report` |
| `/t f "text"` | `/tale feedback "text"` |

---

## Test Checklist

- [ ] `/tale status` works
- [ ] `/tale new audiobook "Title"` creates project
- [ ] `/tale audience children` sets audience
- [ ] `/tale preset audiobook-simple` applies preset
- [ ] `/tale phases` shows workflow
- [ ] `/tale help` shows commands
- [ ] Shortcuts (`/t s`) work

---

*PiggyTales v1.0.0*
