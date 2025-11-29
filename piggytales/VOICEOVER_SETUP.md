# Voiceover Setup Guide

> **PiggyTales Voice Production Configuration**

---

## Overview

PiggyTales uses **Vbee API** for Vietnamese voice generation with emotional delivery. This guide covers setup and configuration.

---

## Vbee API Setup

### Step 1: Get API Credentials

1. Visit [Vbee AI](https://vbee.vn/) and create an account
2. Navigate to API settings
3. Generate an API key
4. Note your API endpoint

### Step 2: Configure Environment

Create `.env` file in your project:

```bash
# Vbee API Configuration
VBEE_API_KEY="your-vbee-api-key"
VBEE_API_URL="https://api.vbee.vn/v1"

# Optional: ElevenLabs for SFX
ELEVENLABS_API_KEY="your-elevenlabs-api-key"
```

### Step 3: Set Voice in PiggyTales

```bash
# List available voices
/tale config voice list

# Set voice
/tale config voice hn_female_ngochuyen_news_48k-fhg

# Preview voice
/tale config voice preview hn_female_ngochuyen_news_48k-fhg
```

---

## Available Voices

### Vietnamese Female Voices

| Voice ID | Name | Style | Recommended For |
|----------|------|-------|-----------------|
| `hn_female_ngochuyen_news_48k-fhg` | Ngoc Huyen | News/Narration | Audiobooks, Stories |
| `hn_female_maianh_news_48k-fhg` | Mai Anh | News/Narration | Educational |
| `hn_female_thuhuong_call_48k-fhg` | Thu Huong | Conversational | Dialogue |

### Vietnamese Male Voices

| Voice ID | Name | Style | Recommended For |
|----------|------|-------|-----------------|
| `hn_male_minhhoang_news_48k-fhg` | Minh Hoang | News/Narration | Narration |
| `hn_male_phuongtuan_news_48k-fhg` | Phuong Tuan | News/Narration | Stories |

### Children's Voices

| Voice ID | Name | Style | Recommended For |
|----------|------|-------|-----------------|
| `hn_female_child_48k-fhg` | Child Female | Playful | Kids content |
| `hn_male_child_48k-fhg` | Child Male | Playful | Kids content |

---

## Emotion Tags

The Emotion Tagger agent adds these markers to scripts:

### Basic Emotions

```markdown
[happy] Wow, that's amazing!
[sad] I miss my friend...
[scared] What was that sound?
[angry] That's not fair!
[neutral] Once upon a time...
```

### Advanced Tags

```markdown
[whisper] Shh, they might hear us
[excited] Let's go on an adventure!
[calm] Everything will be okay
[surprised] Oh! I didn't expect that!
[loving] I care about you so much
```

### Pacing Tags

```markdown
[pause:short] ... (0.3s pause)
[pause:medium] ... (0.5s pause)
[pause:long] ... (1.0s pause)
[slow] Speak slowly here
[fast] Speak quickly here
```

---

## Emotion Intensity

```bash
# Set emotion intensity
/tale config voice emotion low
/tale config voice emotion medium
/tale config voice emotion high
```

| Level | Description | Use Case |
|-------|-------------|----------|
| `low` | Subtle emotions | Documentary |
| `medium` | Balanced delivery | Stories |
| `high` | Expressive | Animation |

---

## Audio Settings

### Quality Presets

```yaml
draft:
  sample_rate: 22050
  bitrate: 128
  format: mp3

standard:
  sample_rate: 44100
  bitrate: 192
  format: mp3

high:
  sample_rate: 48000
  bitrate: 320
  format: wav
```

### Configure Quality

```bash
/tale config quality draft
/tale config quality standard
/tale config quality high
```

---

## Voice Generation

### Generate All Chapters

```bash
/tale voice generate
```

### Generate Specific Chapter

```bash
/tale voice generate chapter-1
```

### Preview Before Full Generation

```bash
/tale voice preview chapter-1
```

### Regenerate Specific File

```bash
/tale voice regenerate chapter-3
```

---

## Output Structure

```
production/voice/
├── audiobook/
│   ├── chapter-01.mp3
│   ├── chapter-02.mp3
│   └── chapter-03.mp3
└── animation/
    ├── scene-001.mp3
    ├── scene-002.mp3
    └── scene-003.mp3
```

---

## API Usage & Limits

### Check API Status

```bash
/tale config api check
```

### View Usage Stats

```bash
/tale config api usage
```

### Rate Limits

| Plan | Characters/Day | Concurrent |
|------|---------------|------------|
| Free | 10,000 | 1 |
| Basic | 100,000 | 3 |
| Pro | 1,000,000 | 10 |

---

## Troubleshooting

### API Key Invalid

```bash
# Check API key
/tale config api vbee check

# Reset API key
/tale config api vbee "new-api-key"
```

### Voice Not Found

```bash
# List all available voices
/tale config voice list

# Use default voice
/tale config voice reset
```

### Generation Failed

1. Check API status: `/tale config api check`
2. Verify script exists: `/tale script show`
3. Check emotion tags: `/tale script validate`
4. Try preview first: `/tale voice preview`

---

## ElevenLabs SFX (Optional)

For enhanced sound effects:

### Setup

```bash
# Set ElevenLabs API key
/tale config api elevenlabs "your-api-key"
```

### Generate SFX

```bash
# Generate specific SFX
/tale sfx generate "forest ambience"

# Generate from library
/tale sfx library search "footsteps"
```

---

## Best Practices

### Script Preparation

1. Add emotion tags before generation
2. Use `[pause]` tags for natural pacing
3. Validate script with `/tale script validate`
4. Preview samples before full generation

### For Children's Content

1. Use expressive emotion settings
2. Add more pauses for comprehension
3. Keep sentences short
4. Use playful voices when appropriate

### Audio Quality

1. Use `standard` or `high` quality
2. Preview before full generation
3. Regenerate if quality issues found
4. Export in appropriate format for platform

---

## Quick Reference

```bash
# Setup
/tale config api vbee "your-api-key"
/tale config voice hn_female_ngochuyen_news_48k-fhg

# Generate
/tale voice generate
/tale voice preview chapter-1
/tale voice regenerate chapter-2

# Check
/tale voice list
/tale voice status
/tale config api usage
```

---

**Need help?** Run `/tale help voice` for more options.
