# Command: workflow

**Category:** Workflow
**Priority:** High
**Syntax:** `/tale workflow <mode|action> [name]`
**Alias:** `/t w`

---

## Description

Set workflow mode or manage workflow templates.

---

## Workflow Modes

### Full Mode
```bash
/tale workflow full
```
- All phases, all reviews
- Council review after each phase
- Human approval at key gates
- Best for: Complex animation, series, high-stakes content

### Standard Mode
```bash
/tale workflow standard
```
- Discovery (optional) → Script → Asset → Production
- Council review after Script and Production
- Human approval optional
- Best for: Regular audiobooks, standard animations

### Lite Mode
```bash
/tale workflow lite
```
- Script → Production
- Quick council review (Analyst only)
- Minimal human gates
- Best for: Simple audiobooks, quick content

### Express Mode
```bash
/tale workflow express
```
- Script → Voice Production only
- No council review (QA only)
- No human gates
- Best for: Drafts, tests, rapid prototyping

### Custom Mode
```bash
/tale workflow custom
```
- Interactive workflow builder
- Select phases, agents, review points
- Save as template

---

## Template Management

```bash
# Save current workflow as template
/tale workflow save "my-audiobook-workflow"

# Load saved template
/tale workflow load "my-audiobook-workflow"

# List all templates
/tale workflow list

# Show current workflow config
/tale workflow show

# Reset to default
/tale workflow reset
```

---

## Output (workflow show)

```markdown
🔄 Current Workflow: Standard Mode

📋 Phases:
  [x] Discovery (optional)
  [x] Script
  [x] Asset
  [x] Production

🤖 Active Agents: 15/22

🔍 Council Reviews:
  - After Script (standard)
  - After Production (standard)

👤 Human Gates:
  - Script approval (optional)
  - Final approval (required)
```

---

## Related Commands

- `/tale complexity <level>` - Set complexity level
- `/tale preset <name>` - Load content preset
- `/tale phases` - Show phase status

---

**Version:** 1.0.0
