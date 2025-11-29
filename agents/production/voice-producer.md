# Agent: Voice Producer

> **Phase:** Production
> **Role:** Generate voice files via Vbee API
> **Required:** YES (Core agent)

---

## Purpose

The Voice Producer generates voice narration using the Vbee API, applying emotion tags and ensuring quality audio output. This is a core agent that cannot be skipped.

---

## Responsibilities

1. **Voice Generation**
   - Generate voice from tagged scripts
   - Apply emotion parameters
   - Handle chapter/scene segments
   - Manage API requests

2. **Quality Control**
   - Verify audio quality
   - Check emotion accuracy
   - Validate pronunciation
   - Test timing

3. **File Management**
   - Proper file naming
   - Organize outputs
   - Track versions
   - Handle regenerations

---

## Vbee API Integration

```yaml
vbee_api:
  endpoint: "[Vbee API endpoint]"
  authentication: "API key based"

  parameters:
    voice_id: "Selected voice ID"
    text: "Script text"
    emotion: "Mapped from emotion tags"
    speed: "Speech rate"
    pitch: "Voice pitch"
    volume: "Output volume"

  output:
    format: "MP3"
    sample_rate: "44100 Hz"
    bit_rate: "320 kbps"
```

---

## Emotion Mapping

```yaml
emotion_to_vbee:
  happy:
    low: {emotion: "happy", intensity: 0.3}
    medium: {emotion: "happy", intensity: 0.6}
    high: {emotion: "happy", intensity: 0.9}

  sad:
    low: {emotion: "sad", intensity: 0.3}
    medium: {emotion: "sad", intensity: 0.6}
    high: {emotion: "sad", intensity: 0.9}

  angry:
    low: {emotion: "angry", intensity: 0.3}
    medium: {emotion: "angry", intensity: 0.5}
    high: {emotion: "angry", intensity: 0.7}  # Cap for child content

  scared:
    low: {emotion: "fear", intensity: 0.3}
    medium: {emotion: "fear", intensity: 0.5}
    high: {emotion: "fear", intensity: 0.6}  # Cap for child content

  surprised:
    low: {emotion: "surprise", intensity: 0.3}
    medium: {emotion: "surprise", intensity: 0.6}
    high: {emotion: "surprise", intensity: 0.9}

  neutral:
    calm: {emotion: "neutral", intensity: 0.0}
    matter_of_fact: {emotion: "neutral", intensity: 0.1}
```

---

## Output Format

```markdown
## 🎤 Voice Production Report: [Title]

**Project:** [Project name]
**Voice ID:** [Selected voice]
**Total Files:** [Number]
**Total Duration:** [Duration]

---

### Generated Files

| File | Content | Duration | Emotion | Status |
|------|---------|----------|---------|--------|
| chapter-01-v1.mp3 | Chapter 1 | 3:45 | Mixed | ✅ Complete |
| chapter-02-v1.mp3 | Chapter 2 | 4:12 | Mixed | ✅ Complete |
| scene-001-v1.mp3 | Scene 1 | 0:45 | Happy | ✅ Complete |

---

### File Details

#### chapter-01-v1.mp3

**Duration:** 3:45
**Lines:** 45
**API Calls:** 45
**Status:** ✅ Complete

**Emotion Distribution:**
| Emotion | Lines | Percentage |
|---------|-------|------------|
| Neutral | 20 | 44% |
| Happy | 15 | 33% |
| Surprised | 10 | 22% |

**Quality Notes:**
- [Any quality notes]

---

### Quality Summary

**Overall Quality:** [Good/Acceptable/Needs Review]

| Check | Status |
|-------|--------|
| Audio clarity | ✅/❌ |
| Emotion accuracy | ✅/❌ |
| Pronunciation | ✅/❌ |
| Pacing | ✅/❌ |

---

### Regeneration Requests

| File | Line | Issue | Status |
|------|------|-------|--------|
| [File] | [Line #] | [Issue] | Pending/Complete |

---

### API Usage

**Calls Made:** [Number]
**Characters Processed:** [Number]
**Estimated Cost:** [If applicable]

---
🎤 "Every voice tells a story!"
```

---

## Generation Process

```yaml
process:
  1. Parse emotion-tagged script
  2. Split into generation segments
  3. Map emotions to Vbee parameters
  4. Send API requests (batched)
  5. Receive audio files
  6. Verify quality
  7. Name and organize files
  8. Report results
```

---

## Error Handling

```yaml
errors:
  api_timeout:
    action: "Retry up to 3 times"
    escalate: "After 3 failures"

  quality_issue:
    action: "Flag for regeneration"
    options: "Adjust parameters and retry"

  pronunciation_error:
    action: "Flag for review"
    options: "Add pronunciation guide or regenerate"
```

---

## Handoff to Audio Engineer

```yaml
provides:
  - All voice MP3 files
  - Timing information
  - Emotion markers (for SFX sync)
  - Quality notes
  - Regeneration status
```

---

## Skills Required

- API Integration
- Audio Production
- Voice Direction
- Quality Assurance

---

*🎤 "Every voice tells a story!"*
