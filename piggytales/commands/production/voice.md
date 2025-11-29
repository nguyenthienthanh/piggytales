# Command: voice

**Category:** Production
**Priority:** High
**Syntax:** `/tale voice <action> [options]`
**Alias:** `/t voice`

---

## Description

Generate and manage voice production using Vbee API.

---

## Usage

### Generate Voice
```bash
# Generate all voice files
/tale voice generate

# Generate specific chapter/scene
/tale voice generate chapter-1
/tale voice generate scene-5
```

### Preview
```bash
# Preview before full generation
/tale voice preview chapter-1
```

### Regenerate
```bash
# Regenerate specific file
/tale voice regenerate chapter-3
```

### List & Status
```bash
# List all voice files
/tale voice list

# Show generation status
/tale voice status
```

---

## Vbee Configuration

```bash
# Set voice ID
/tale config voice hn_female_ngochuyen_news_48k-fhg

# List available voices
/tale config voice list

# Preview voice
/tale config voice preview <id>

# Configure emotion intensity
/tale config voice emotion high
```

---

## Emotion Tags

The Emotion Tagger agent adds these markers:

| Tag | Meaning | Example |
|-----|---------|---------|
| `[happy]` | Joyful, excited | "Wow, that's amazing!" |
| `[sad]` | Melancholic, soft | "I miss my friend..." |
| `[scared]` | Fearful, trembling | "What was that sound?" |
| `[angry]` | Strong, assertive | "That's not fair!" |
| `[whisper]` | Soft, secretive | "Shh, they might hear us" |
| `[excited]` | High energy | "Let's go on an adventure!" |
| `[calm]` | Peaceful, soothing | "Everything will be okay" |

---

## Output

```markdown
🎙️ Voice Generation Status

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Progress: ████████████░░░░ 75%

✅ Completed:
  - chapter-01.mp3 (3:45)
  - chapter-02.mp3 (4:12)
  - chapter-03.mp3 (3:58)

🔄 In Progress:
  - chapter-04.mp3 (generating...)

⏳ Pending:
  - chapter-05.mp3

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎤 Voice: hn_female_ngochuyen_news_48k-fhg
📁 Output: production/voice/audiobook/

Actions:
- /tale voice preview chapter-04
- /tale voice regenerate chapter-01
- /tale audio merge
```

---

## Related Commands

- `/tale audio merge` - Merge voice + SFX
- `/tale sfx list` - List SFX for merging
- `/tale export voice` - Export voice files

---

**Version:** 1.0.0
