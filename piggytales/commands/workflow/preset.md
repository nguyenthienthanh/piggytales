# Command: preset

**Category:** Workflow
**Priority:** High
**Syntax:** `/tale preset <name>`
**Alias:** `/t preset`

---

## Description

Load a content type preset with pre-configured workflow, phases, and agents.

---

## Available Presets

### audiobook-simple
```bash
/tale preset audiobook-simple
```
- **Workflow:** Lite
- **Phases:** Script → Production
- **Agents:** script-writer, emotion-tagger, voice-producer, audio-engineer, seo-writer
- **Council:** Quick (Analyst only)
- **Best for:** Short audiobooks, simple narration

### audiobook-full
```bash
/tale preset audiobook-full
```
- **Workflow:** Standard
- **Phases:** Discovery → Script → Asset → Production
- **Agents:** All discovery + script + voice production agents
- **Council:** Standard
- **Best for:** Full-length audiobooks with SFX

### animation-short
```bash
/tale preset animation-short
```
- **Workflow:** Standard
- **Phases:** Script → Asset → Production
- **Agents:** Script, visual, and production agents for short form
- **Council:** Standard
- **Best for:** TikTok, YouTube Shorts

### animation-full
```bash
/tale preset animation-full
```
- **Workflow:** Full
- **Phases:** All phases
- **Agents:** All 22 agents
- **Council:** Deep
- **Best for:** Complex animations, series

### music-video
```bash
/tale preset music-video
```
- **Workflow:** Standard
- **Phases:** Script → Asset → Production
- **Agents:** Script, visual, and audio agents
- **Council:** Standard
- **Best for:** Music videos with visuals

### quick-test
```bash
/tale preset quick-test
```
- **Workflow:** Express
- **Phases:** Script → Voice Production only
- **Agents:** script-writer, emotion-tagger, voice-producer
- **Council:** None (QA only)
- **Best for:** Drafts, testing, rapid prototyping

---

## List Presets

```bash
/tale preset list
```

Output:
```markdown
📦 Available Presets:

| Preset | Workflow | Agents | Council |
|--------|----------|--------|---------|
| audiobook-simple | Lite | 5 | Quick |
| audiobook-full | Standard | 10 | Standard |
| animation-short | Standard | 10 | Standard |
| animation-full | Full | 22 | Deep |
| music-video | Standard | 9 | Standard |
| quick-test | Express | 3 | None |

Usage: /tale preset <name>
```

---

## Output

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

✨ Ready to create a simple audiobook!
```

---

**Version:** 1.0.0
