# Command: quick

**Category:** Utility
**Priority:** High
**Syntax:** `/tale quick <type> "Title"`
**Alias:** `/t quick`

---

## Description

Quick start a project with minimal setup - skips discovery phase and uses express/lite workflow.

---

## Usage

### Quick Audiobook
```bash
/tale quick audiobook "Story Title"
```
- Uses `audiobook-simple` preset
- Skips discovery phase
- Lite workflow
- Fast output

### Quick Animation
```bash
/tale quick animation "Animation Title"
```
- Uses `animation-short` preset
- Skips discovery phase
- Standard workflow (minimal)

### Quick Test/Draft
```bash
/tale quick test "Draft Title"
```
- Uses `quick-test` preset
- Express mode
- Script + Voice only
- No reviews, no gates
- Fastest possible output

---

## Comparison

| Command | Preset | Workflow | Phases | Council |
|---------|--------|----------|--------|---------|
| `quick audiobook` | audiobook-simple | Lite | Script, Production | Quick |
| `quick animation` | animation-short | Standard | Script, Asset, Production | Standard |
| `quick test` | quick-test | Express | Script, Voice only | None |

---

## Output

```markdown
🐷🍄 PiggyTales - Quick Start!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 Project: draft-story
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

🎯 Ready! Just provide your content:
- Paste story text, or
- Add source: /tale source add "..."

Then: /tale next to start script phase

✨ Let's create something quick!
```

---

## Related Commands

- `/tale new` - Full project creation
- `/tale preset` - Apply preset manually
- `/tale workflow express` - Set express mode

---

**Version:** 1.0.0
