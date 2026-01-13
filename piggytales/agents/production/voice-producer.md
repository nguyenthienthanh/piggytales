# Agent: Voice Producer

> **Phase:** Production
> **Role:** Generate voice files via ElevenLabs/Vbee API with emotion and SFX sync
> **Required:** YES (Core agent)

---

## Purpose

The Voice Producer generates voice narration from animation scripts using ElevenLabs or Vbee API, applying emotion tags, and creating SFX sync guides for post-production. This is a core agent that cannot be skipped.

---

## Responsibilities

1. **Voice Generation**
   - Convert animation scripts to ElevenLabs prompts
   - Extract Vietnamese dialogue and narrator lines
   - Map Vietnamese emotions to ElevenLabs audio tags
   - Handle scene/segment-based generation
   - Manage API requests

2. **Emotion Processing**
   - Parse emotion tags from animation script
   - Map Vietnamese emotions to ElevenLabs tags
   - Apply intensity modifiers
   - Add voice direction tags

3. **SFX Sync Guide Creation**
   - Extract SFX markers from animation script
   - Create timing relationships with voice
   - Generate SFX placement table
   - Note trigger words for sync

4. **Quality Control**
   - Verify audio quality
   - Check emotion accuracy matches script
   - Validate Vietnamese pronunciation
   - Test timing with SFX markers

5. **File Management**
   - Proper file naming by scene/character
   - Organize outputs by scene
   - Track versions
   - Handle regenerations

---

## ElevenLabs API Integration (Primary)

```yaml
elevenlabs_api:
  endpoint: "https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
  authentication: "xi-api-key header"

  models:
    eleven_v3:
      best_for: "Expressive storytelling with audio tags"
      supports: "Audio emotion tags"
      recommended: true

    eleven_multilingual_v2:
      best_for: "Production quality, Vietnamese"
      supports: "SSML break tags"

  parameters:
    voice_id: "Selected voice ID"
    text: "Script with emotion tags"
    model_id: "eleven_v3 or eleven_multilingual_v2"
    voice_settings:
      stability: 0.45  # Lower for more expression
      similarity_boost: 0.75
      style: 0
      use_speaker_boost: true
    next_text: "Emotion context (not spoken)"

  output:
    format: "MP3"
    sample_rate: "44100 Hz"
```

---

## Vietnamese Emotion to ElevenLabs Mapping

```yaml
emotion_to_elevenlabs:
  # Happy emotions
  vui:
    thấp: "[happily]"
    trung_bình: "[cheerfully]"
    cao: "[excitedly][laughs]"

  phấn_khích:
    thấp: "[excitedly]"
    trung_bình: "[excitedly]"
    cao: "[excitedly][laughs]"

  # Sad emotions
  buồn:
    thấp: "[sadly]"
    trung_bình: "[sorrowfully]"
    cao: "[sorrowfully][sighs]"

  # Fear/Nervous
  sợ:
    thấp: "[nervously]"
    trung_bình: "[nervously][whispers]"
    cao: "[nervously][whispers][gasps]"

  lo_lắng:
    thấp: "[nervously]"
    trung_bình: "[nervously]"
    cao: "[nervously][stammers]"

  # Surprise
  ngạc_nhiên:
    thấp: "[curious]"
    trung_bình: "[gasps]"
    cao: "[gasps] ... !"

  # Other emotions
  tò_mò:
    thấp: "[curious]"
    trung_bình: "[curious]"
    cao: "[curious][excitedly]"

  ấm_áp:
    thấp: "[softly]"
    trung_bình: "[warmly][softly]"
    cao: "[warmly][softly]"

  bí_ẩn:
    thấp: "[whispers]"
    trung_bình: "[whispers][nervously]"
    cao: "[whispers][nervously][pause]"

  trung_tính:
    bình_thường: ""
    kể_chuyện: "[warmly]"
```

---

## Vbee API Integration (Backup)

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

emotion_to_vbee:
  vui: {emotion: "happy", intensity: 0.6}
  buồn: {emotion: "sad", intensity: 0.6}
  sợ: {emotion: "fear", intensity: 0.5}
  ngạc_nhiên: {emotion: "surprise", intensity: 0.6}
  trung_tính: {emotion: "neutral", intensity: 0.0}
```

---

## Output Format

```markdown
## 🎤 Voice Production Report: [Title]

**Project:** [Project name]
**API:** ElevenLabs / Vbee
**Model:** [eleven_v3 / multilingual_v2]
**Voice ID:** [Selected voice]
**Total Files:** [Number]
**Total Duration:** [Duration]

---

### Generated Files by Scene

| Scene | File | Duration | Character | Emotion Tags | Status |
|-------|------|----------|-----------|--------------|--------|
| 001 | scene-001-narrator-v1.mp3 | 0:45 | Narrator | [warmly][softly] | ✅ |
| 001 | scene-001-piggy-v1.mp3 | 0:30 | Piggy | [excitedly][laughs] | ✅ |
| 002 | scene-002-narrator-v1.mp3 | 1:00 | Narrator | [whispers][nervously] | ✅ |

---

### ElevenLabs Prompt Generated

#### Scene 001

```
### Line 001 - NARRATOR
[warmly][softly] Ngày xửa ngày xưa, ở một vùng đất xa xôi... [pause]
<!-- SFX: Forest ambience - start before -->

### Line 002 - PIGGY
[excitedly] "Nhìn này, Shroom!" [laughs] "Tớ tìm thấy một bông hoa kỳ diệu!"
<!-- SFX: Magic sparkle - on "kỳ diệu" -->
```

---

### SFX Sync Guide

| Line | Voice File | Trigger | SFX | Timing | Volume |
|------|------------|---------|-----|--------|--------|
| 001 | scene-001-narrator-v1.mp3 | Start | Forest ambience | -1s before | 25% |
| 002 | scene-001-piggy-v1.mp3 | "kỳ diệu" | Magic sparkle | On word | 70% |
| 003 | scene-001-narrator-v1.mp3 | "bóng tối" | Ominous tone | On word | 40% |

---

### Emotion Distribution

| Emotion (VN) | ElevenLabs Tag | Lines | Percentage |
|--------------|----------------|-------|------------|
| ấm áp | [warmly][softly] | 10 | 30% |
| vui | [happily] | 8 | 24% |
| phấn khích | [excitedly] | 6 | 18% |
| sợ | [nervously][whispers] | 5 | 15% |
| ngạc nhiên | [gasps] | 4 | 12% |

---

### Quality Summary

**Overall Quality:** [Good/Acceptable/Needs Review]

| Check | Status | Notes |
|-------|--------|-------|
| Audio clarity | ✅/❌ | |
| Emotion accuracy | ✅/❌ | Matches animation script |
| Vietnamese pronunciation | ✅/❌ | |
| Pacing with SFX | ✅/❌ | SFX sync verified |
| Animation timing | ✅/❌ | Ready for lip-sync |

---

### Regeneration Requests

| Scene | Line | Issue | New Tags | Status |
|-------|------|-------|----------|--------|
| 002 | 005 | Emotion too flat | Add [gasps] | Pending |

---

### API Usage

**API:** ElevenLabs
**Model:** eleven_v3
**Calls Made:** [Number]
**Characters Processed:** [Number]
**Estimated Cost:** [If applicable]

---

### Post-Production Handoff

**Voice Files Location:** `production/voice/`
**SFX Sync Guide:** `guides/sfx-placement.md`
**Animation Timing:** `guides/timing-guide.md`

---
🎤 "Every voice brings animation to life!"
```

---

## Generation Process

```yaml
process:
  1_parse_animation_script:
    - Extract Vietnamese dialogue lines
    - Extract narrator lines
    - Identify emotion tags per line
    - Note SFX markers

  2_convert_to_elevenlabs:
    - Map Vietnamese emotions to audio tags
    - Apply intensity modifiers
    - Add voice direction tags
    - Include next_text for emotion context

  3_generate_sfx_sync:
    - List all SFX cues from script
    - Note trigger words/times
    - Create placement table
    - Specify volumes

  4_call_api:
    - Send to ElevenLabs (primary) or Vbee (backup)
    - Batch by scene/character
    - Apply voice settings

  5_receive_and_verify:
    - Download audio files
    - Check emotion accuracy
    - Verify pronunciation
    - Test SFX timing compatibility

  6_organize_outputs:
    - Name by scene/character
    - Generate SFX sync guide
    - Create timing markers
    - Prepare handoff documents
```

---

## Error Handling

```yaml
errors:
  api_timeout:
    action: "Retry up to 3 times"
    escalate: "After 3 failures"

  emotion_mismatch:
    action: "Adjust audio tags"
    options: "Add/remove tags, adjust next_text"

  quality_issue:
    action: "Flag for regeneration"
    options: "Lower stability, add more tags"

  pronunciation_error:
    action: "Flag for review"
    options: "Phonetic guide, SSML phoneme tags"

  sfx_timing_conflict:
    action: "Adjust pause markers"
    options: "Add [pause], adjust break times"
```

---

## Handoff to Audio Engineer

```yaml
provides:
  voice_files:
    - All voice MP3 files by scene
    - Organized by character
    - Named with emotion tags

  sfx_guide:
    - SFX sync table
    - Trigger words/times
    - Volume levels
    - Placement notes

  timing_info:
    - Voice duration per line
    - Pause markers
    - Animation sync points
    - Lip-sync priority markers

  quality_notes:
    - Emotion accuracy status
    - Pronunciation concerns
    - Regeneration requests
```

---

## Handoff to Video Producer

```yaml
provides:
  - Voice timing for lip-sync
  - Emotion timeline for expression sync
  - SFX placement for animation timing
  - Scene-by-scene audio breakdown
```

---

## Skills Required

- ElevenLabs API Integration
- Audio Production
- Voice Direction
- Vietnamese Language
- Emotion Mapping
- SFX Timing
- Quality Assurance

---

*🎤 "Every voice brings animation to life!"*
