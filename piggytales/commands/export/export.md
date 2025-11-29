# Command: export

**Category:** Export
**Priority:** High
**Syntax:** `/tale export <type> [options]`
**Alias:** `/t export`

---

## Description

Export project deliverables in various formats.

---

## Export Types

### Voice Files
```bash
/tale export voice
```
Exports: `production/voice/*.mp3`

### AI Prompts
```bash
# All prompts
/tale export prompts

# Specific types
/tale export prompts images
/tale export prompts videos
/tale export prompts characters
```
Exports: `prompts/` directory

### SFX Files
```bash
/tale export sfx
```
Exports: `production/sfx/*.mp3`

### Script
```bash
/tale export script
```
Exports: `scripts/full-script.md`, `scripts/voice-script-tagged.md`

### SEO Package
```bash
/tale export seo
```
Exports: `seo/youtube-metadata.md`, `seo/tiktok-metadata.md`

### Post-Production Guide
```bash
/tale export guide
```
Exports: `guides/timing-guide.md`, `guides/sfx-placement.md`

### Everything
```bash
/tale export all
```

---

## Export Formats

```bash
# As ZIP archive
/tale export all --format zip

# As folder structure
/tale export all --format folder
```

---

## Selective Export

```bash
# Export specific scenes
/tale export scenes 1-5

# Export specific chapter
/tale export chapter 3

# Export only specific phase outputs
/tale export --phase script
/tale export --phase production
```

---

## Output Structure

```
exports/
├── voice/
│   ├── chapter-01.mp3
│   ├── chapter-02.mp3
│   └── ...
├── prompts/
│   ├── images/
│   ├── videos/
│   └── characters/
├── scripts/
│   ├── full-script.md
│   └── voice-script-tagged.md
├── seo/
│   ├── youtube-metadata.md
│   └── tiktok-metadata.md
├── guides/
│   ├── timing-guide.md
│   └── sfx-placement.md
└── sfx/
    └── *.mp3
```

---

## Output

```markdown
📦 Export Complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 Location: exports/truyen-co-tich-2025-11-29/

✅ Exported:
  - 5 voice files (15.2 MB)
  - 1 script file
  - 1 SEO package
  - 1 timing guide
  - 8 SFX files (2.1 MB)

📊 Total Size: 17.3 MB

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🍄✨ Ready to share amazing tales!
```

---

**Version:** 1.0.0
