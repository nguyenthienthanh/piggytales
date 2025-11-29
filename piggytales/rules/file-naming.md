# File Naming Rules

> **Priority:** MEDIUM
> **Applies to:** All file outputs
> **Purpose:** Consistent organization

---

## Naming Convention

### Standard Format

```
{project}-{phase}-{type}-{identifier}-v{version}.{ext}
```

### Components

| Component | Description | Example |
|-----------|-------------|---------|
| `{project}` | Project slug (lowercase, hyphenated) | `truyen-co-tich` |
| `{phase}` | Phase name | `discovery`, `script`, `asset`, `production` |
| `{type}` | Content type | `report`, `script`, `prompt`, `voice`, `sfx` |
| `{identifier}` | Specific item ID | `chapter-01`, `scene-005`, `sigh-001` |
| `{version}` | Version number | `1`, `2`, `3` |
| `{ext}` | File extension | `md`, `mp3`, `png`, `docx` |

---

## Examples by Phase

### Discovery Phase

```
truyen-co-tich-discovery-report-v1.docx
truyen-co-tich-discovery-sources-v1.md
truyen-co-tich-discovery-legal-check-v1.md
truyen-co-tich-discovery-audience-research-v1.md
```

### Script Phase

```
truyen-co-tich-script-full-v1.md
truyen-co-tich-script-full-v2.md
truyen-co-tich-script-scene-breakdown-v1.md
truyen-co-tich-script-voice-tagged-v1.md
truyen-co-tich-script-sfx-plan-v1.md
```

### Asset Phase

```
truyen-co-tich-asset-style-guide-v1.md
truyen-co-tich-asset-prompt-scene-001-v1.md
truyen-co-tich-asset-prompt-scene-002-v1.md
truyen-co-tich-asset-character-piggy-v1.md
truyen-co-tich-asset-seo-package-v1.md
truyen-co-tich-asset-thumbnail-concepts-v1.md
```

### Production Phase

```
# Voice files
truyen-co-tich-production-voice-chapter-01-v1.mp3
truyen-co-tich-production-voice-chapter-02-v1.mp3
truyen-co-tich-production-voice-scene-001-v1.mp3

# Image files
truyen-co-tich-production-image-scene-001-v1.png
truyen-co-tich-production-image-scene-001-v2.png

# SFX files
truyen-co-tich-production-sfx-sigh-001-v1.mp3
truyen-co-tich-production-sfx-footsteps-001-v1.mp3

# Final audio
truyen-co-tich-production-audio-final-v1.mp3
```

### Reports

```
truyen-co-tich-report-discovery-v1.docx
truyen-co-tich-report-script-council-v1.docx
truyen-co-tich-report-final-v1.docx
```

---

## Special Naming Rules

### Chapters (Audiobook)

```
{project}-production-voice-chapter-{nn}-v{v}.mp3

Examples:
- truyen-co-tich-production-voice-chapter-01-v1.mp3
- truyen-co-tich-production-voice-chapter-02-v1.mp3
- truyen-co-tich-production-voice-chapter-10-v1.mp3
```

### Scenes (Animation)

```
{project}-{phase}-{type}-scene-{nnn}-v{v}.{ext}

Examples:
- truyen-co-tich-asset-prompt-scene-001-v1.md
- truyen-co-tich-production-image-scene-001-v1.png
- truyen-co-tich-production-voice-scene-001-v1.mp3
```

### Characters

```
{project}-asset-character-{name}-v{v}.{ext}

Examples:
- truyen-co-tich-asset-character-piggy-v1.md
- truyen-co-tich-asset-character-main-hero-v1.md
- truyen-co-tich-asset-character-villain-v1.md
```

### SFX

```
{project}-production-sfx-{description}-{nnn}-v{v}.mp3

Examples:
- truyen-co-tich-production-sfx-sigh-001-v1.mp3
- truyen-co-tich-production-sfx-footsteps-001-v1.mp3
- truyen-co-tich-production-sfx-door-creak-001-v1.mp3
```

---

## Project Slug Rules

### Creating Project Slug

```yaml
rules:
  - Lowercase only
  - Replace spaces with hyphens
  - Remove special characters
  - Remove Vietnamese diacritics (optional)
  - Maximum 50 characters

examples:
  "Truyện Cổ Tích" → "truyen-co-tich"
  "The Little Prince" → "the-little-prince"
  "Chuyến Phiêu Lưu Kỳ Thú" → "chuyen-phieu-luu-ky-thu"
```

### Reserved Words

```yaml
avoid:
  - test
  - temp
  - draft (unless actually draft)
  - final (use version instead)
  - new
  - old
```

---

## Version Management

### When to Increment

```yaml
major_revision:
  - Significant content change
  - After council feedback
  - After human feedback

minor_revision:
  - Technical fixes
  - Format corrections
  - Typo fixes (create new version)
```

### Version Tracking

```yaml
requirements:
  - Never delete previous versions
  - Document changes in changelog
  - Link versions in metadata
  - Mark current version clearly
```

---

## Directory Structure

### Standard Project Layout

```
project-name/
├── reports/
│   ├── discovery-report.docx
│   ├── script-report.docx
│   ├── asset-report.docx
│   └── production-report.docx
│
├── scripts/
│   ├── full-script.md
│   ├── scene-breakdown.md
│   └── voice-script-tagged.md
│
├── prompts/
│   ├── images/
│   │   ├── scene-001.md
│   │   └── ...
│   ├── videos/
│   │   └── ...
│   ├── characters/
│   │   └── character-sheet-*.md
│   ├── thumbnails/
│   │   └── thumbnail-concepts.md
│   └── style-guide.md
│
├── production/
│   ├── images/
│   ├── videos/
│   ├── voice/
│   │   ├── audiobook/
│   │   │   ├── chapter-01.mp3
│   │   │   └── ...
│   │   └── animation/
│   │       ├── scene-001.mp3
│   │       └── ...
│   └── sfx/
│       └── *.mp3
│
├── guides/
│   ├── timing-guide.md
│   ├── sfx-placement.md
│   └── post-production-guide.md
│
├── seo/
│   ├── youtube-metadata.md
│   ├── tiktok-metadata.md
│   └── thumbnails.md
│
└── exports/
    └── [final deliverables]
```

---

## Export Naming

### ZIP Exports

```
{project}-export-{date}-{type}.zip

Examples:
- truyen-co-tich-export-2024-01-15-full.zip
- truyen-co-tich-export-2024-01-15-voice-only.zip
- truyen-co-tich-export-2024-01-15-prompts.zip
```

### Final Deliverables

```
{project}-final-{type}-{date}.{ext}

Examples:
- truyen-co-tich-final-audiobook-2024-01-15.mp3
- truyen-co-tich-final-animation-2024-01-15.mp4
```

---

## Validation Rules

### Automatic Checks

```yaml
validate:
  - No spaces in filename
  - All lowercase
  - Valid characters only [a-z0-9-]
  - Correct extension
  - Version number present
  - Path exists
```

### Error Messages

```
🐷❌ Invalid filename: "My File.mp3"
   Expected format: {project}-{phase}-{type}-{identifier}-v{version}.mp3
   Suggestion: my-project-production-voice-chapter-01-v1.mp3
```

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
