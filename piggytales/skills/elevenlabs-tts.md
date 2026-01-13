# Skill: ElevenLabs Text-to-Speech Storytelling

> **Used by:** Voice Producer, Emotion Tagger, Script Writer agents
> **Sources:** [ElevenLabs Documentation](https://elevenlabs.io/docs), [Best Practices Guide](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices)

---

## Overview

Master skill for creating natural, emotional storytelling using ElevenLabs TTS. Supports Vietnamese and English with proper pacing, emotion, and delivery control.

---

## Model Selection

```yaml
models:
  eleven_v3:
    name: "Eleven v3 (Alpha)"
    best_for: "Most expressive storytelling, emotional range"
    languages: 70+
    char_limit: 5000
    features:
      - Audio tags for emotion/delivery control
      - Best for narrative storytelling
      - Highest emotional expression
    limitations:
      - No SSML break tag support
      - Requires more prompt engineering
      - Results vary between generations

  eleven_multilingual_v2:
    name: "Multilingual v2"
    best_for: "Production quality, Vietnamese/English"
    languages: 29
    char_limit: 10000
    features:
      - Natural-sounding across languages
      - SSML break tag support
      - More consistent output
    limitations:
      - No audio tags
      - Less expressive than v3

  eleven_turbo_v2.5:
    name: "Turbo v2.5"
    best_for: "Fast prototyping, Vietnamese support"
    languages: 32 (includes Vietnamese)
    char_limit: 40000
    latency: "~250-300ms"
    features:
      - 3x faster for non-English
      - Good for drafts/testing

  eleven_flash_v2.5:
    name: "Flash v2.5"
    best_for: "Real-time, low latency"
    languages: 32 (includes Vietnamese)
    char_limit: 40000
    latency: "~75ms"
    features:
      - Ultra-fast generation
      - SSML phoneme tag support
```

---

## Voice Settings Reference

```yaml
stability:
  description: "Controls voice consistency vs emotional range"
  range: 0.0 - 1.0
  recommendations:
    storytelling_emotional: 0.30 - 0.50  # More dynamic, expressive
    storytelling_calm: 0.50 - 0.65       # Balanced
    narration_serious: 0.65 - 0.85       # Consistent, stable
    character_voices: 0.25 - 0.45        # High variety
  warning: "Too low = unstable, too fast; Too high = monotonous"

similarity_boost:
  description: "How closely to match original voice"
  range: 0.0 - 1.0
  default: 0.75
  note: "Higher = closer to original voice characteristics"

style_exaggeration:
  description: "Amplifies speaker style characteristics"
  range: 0.0 - 1.0
  recommendation: 0  # Keep at 0 for most cases
  use_case: "Only increase if voice sounds robotic"

speed:
  description: "Speaking rate adjustment"
  range: 0.7 - 1.2
  default: 1.0
  recommendations:
    children_content: 0.85 - 0.95   # Slightly slower
    dramatic_moments: 0.80 - 0.90   # Slower for impact
    action_scenes: 1.0 - 1.15       # Normal to faster
    emotional_scenes: 0.85 - 0.95   # Slower for weight
  warning: "Extreme values may affect quality"
```

---

## Audio Tags (Eleven v3 Only)

### Emotions & Tone
```yaml
primary_emotions:
  - "[sad]"
  - "[angry]"
  - "[happily]"
  - "[sorrowful]"
  - "[excited]"
  - "[nervous]"
  - "[curious]"
  - "[crying]"

tone_modifiers:
  - "[cheerfully]"
  - "[flatly]"
  - "[deadpan]"
  - "[playfully]"
  - "[mischievously]"
  - "[sarcastic]"
  - "[timidly]"
```

### Delivery Styles
```yaml
volume_control:
  - "[whispers]"
  - "[shouts]"
  - "[loudly]"
  - "[softly]"

pacing:
  - "[pause]"
  - "[breathes]"
  - "[continues after a beat]"
  - "[rushed]"
  - "[slows down]"
  - "[deliberate]"
  - "[rapid-fire]"

hesitation:
  - "[stammers]"
  - "[drawn out]"
  - "[repeats]"
  - "[emphasized]"
  - "[understated]"
```

### Non-Verbal Sounds
```yaml
reactions:
  - "[laughs]"
  - "[laughs harder]"
  - "[starts laughing]"
  - "[wheezing]"
  - "[sighs]"
  - "[exhales]"
  - "[snorts]"
  - "[clears throat]"
  - "[gulps]"
  - "[gasp]"
  - "[swallows]"

special:
  - "[sings]"
  - "[strong X accent]"  # Replace X with accent
```

### Combining Tags
```yaml
examples:
  nervous_whisper: "[nervously][whispers] I... I'm not sure this is going to work. [gulps]"
  excited_shout: "[happily][shouts] We did it! [laughs]"
  sad_quiet: "[sorrowfully][softly] I never thought it would end this way... [sighs]"
```

---

## SSML Tags (v2 Models Only)

### Break Tags for Pauses
```xml
<!-- Short pause (0.5 seconds) -->
<break time="0.5s" />

<!-- Medium pause (1 second) -->
<break time="1s" />

<!-- Long pause (2 seconds) - max 3s -->
<break time="2s" />
```

### Phoneme Tags for Pronunciation
```xml
<!-- Using IPA -->
<phoneme alphabet="ipa" ph="ˈæk.mə">ACME</phoneme>

<!-- Using CMU Arpabet (recommended) -->
<phoneme alphabet="cmu-arpabet" ph="AE1 K M IY0">ACME</phoneme>
```

**Compatible models:** Flash v2, Turbo v2, English v1

---

## Punctuation & Formatting Guide

```yaml
pauses:
  period: "Full stop, natural pause"
  comma: "Brief pause"
  ellipsis: "... creates thoughtful pause, adds weight"
  dash: "— short dramatic pause"
  paragraph_break: "Longer pause, new thought"

emphasis:
  capitals: "WORD - increases emphasis"
  quotes: '"word" - can add emphasis on specific words'
  exclamation: "Increases energy!"

pacing:
  short_sentences: "Faster, urgent feeling"
  long_sentences: "Slower, more contemplative"
  questions: "Natural rising intonation?"

emotion_through_punctuation:
  excitement: "Use exclamation marks! Multiple for intensity!!"
  uncertainty: "Use ellipses... and questions?"
  dramatic: "Use periods. Short sentences. For impact."
  nervous: "Use dashes - to create - hesitation"
```

---

## Vietnamese Language Guidelines

```yaml
model_support:
  - eleven_v3 (70+ languages)
  - eleven_turbo_v2.5 (32 languages)
  - eleven_flash_v2.5 (32 languages)
  - eleven_multilingual_v2 (29 languages)

best_practices:
  voice_selection: "Choose voice with Vietnamese accent if available"
  pronunciation:
    - "Write Vietnamese with proper diacritics (à, á, ã, ả, ạ)"
    - "Use proper punctuation for tonal accuracy"
    - "Avoid mixing languages in same sentence when possible"

  common_issues:
    wrong_tone: "Add more context around the word"
    too_fast: "Add commas or periods for natural pauses"
    robotic: "Lower stability, increase style exaggeration slightly"

  emotion_markers_vietnamese:
    - "cô ấy nói một cách vui vẻ"
    - "anh ấy thì thầm"
    - "cô bé khóc nức nở"
    - "giọng run run"
```

---

## Animation Script to ElevenLabs Prompt

### Converting Animation Scripts

Animation scripts contain visual directions (English) and dialogue (Vietnamese). For ElevenLabs, extract only voice content while preserving emotion and SFX markers.

```yaml
conversion_process:
  1_extract_voice_lines:
    - Character dialogue (Vietnamese)
    - Narrator lines (Vietnamese)
    - Emotion tags from script

  2_add_audio_tags:
    - Map emotion tags to ElevenLabs audio tags
    - Add voice direction tags
    - Insert pause markers

  3_mark_sfx_sync:
    - Include SFX cues as comments
    - Note timing relationships
    - Mark post-production SFX points

  4_preserve_animation_sync:
    - Keep timing markers
    - Note expression sync points
    - Include lip-sync priority markers
```

---

## Storytelling Prompt Structure with SFX

### For Eleven v3 (Audio Tags) - Animation Ready

```markdown
# ElevenLabs Prompt: [Title]

## Voice Settings
- Model: Eleven v3
- Stability: 0.45
- Speed: 0.90

---

## SCENE 001: Opening

### Voice Line 001 - NARRATOR
[softly] Ngày xửa ngày xưa, ở một vùng đất xa xôi... [pause]
<!-- SFX: Ambient forest sounds - start before, fade under -->
<!-- Animation: Fade in on forest landscape -->

### Voice Line 002 - NARRATOR
[warmly] Có một chú heo nhỏ tên là Piggy. [cheerfully] Piggy rất thích khám phá khu rừng nấm!
<!-- SFX: Birds chirping - layer under -->
<!-- Animation: Character introduction walk -->

### Voice Line 003 - PIGGY
[excitedly] "Shroom ơi, nhìn này!" [laughs] "Tớ tìm thấy một bông hoa kỳ diệu!"
<!-- SFX: Magical sparkle - on "kỳ diệu" -->
<!-- Animation: Character points, eyes wide -->

### Voice Line 004 - SHROOM
[curious] "Đó là loại hoa gì thế?"
<!-- Animation: Head tilt, curious expression -->

### Voice Line 005 - NARRATOR
[whispers][nervously] Nhưng có điều gì đó đang theo dõi họ từ trong bóng tối... [pause]
<!-- SFX: Ominous tone - start at "bóng tối" -->
<!-- SFX: Twig snap - after pause -->
<!-- Animation: Slow zoom, shadow movement -->

---

## SFX SYNC GUIDE

| Line | Time | SFX | Trigger Word | Volume |
|------|------|-----|--------------|--------|
| 001 | 0:00 | Forest ambience | Start | Low |
| 003 | 0:15 | Magic sparkle | "kỳ diệu" | Medium |
| 005 | 0:25 | Ominous tone | "bóng tối" | Low |
| 005 | 0:30 | Twig snap | After pause | Medium |

---

## EMOTION FLOW

| Line | Character | Emotion Tag | Intensity | Notes |
|------|-----------|-------------|-----------|-------|
| 001 | Narrator | [softly] | low | Opening calm |
| 002 | Narrator | [warmly] → [cheerfully] | medium | Introduction |
| 003 | Piggy | [excitedly] | high | Discovery moment |
| 004 | Shroom | [curious] | medium | Question |
| 005 | Narrator | [whispers][nervously] | high | Tension build |
```

### For Multilingual v2/Turbo (Narrative Style) - Animation Ready

```markdown
# ElevenLabs Prompt: [Title]

## Voice Settings
- Model: Multilingual v2
- Stability: 0.50
- Speed: 0.90
- Language: vi

---

## SCENE 001: Opening

### Voice Line 001 - NARRATOR
Ngày xửa ngày xưa, ở một vùng đất xa xôi, người kể chuyện bắt đầu một cách nhẹ nhàng...
<break time="1s" />
<!-- SFX: Ambient forest sounds - start before, fade under -->

### Voice Line 002 - NARRATOR
Có một chú heo nhỏ tên là Piggy, giọng nói ấm áp và vui vẻ. Piggy rất thích khám phá khu rừng nấm!
<!-- SFX: Birds chirping - layer under -->

### Voice Line 003 - PIGGY
"Shroom ơi, nhìn này!" Piggy reo lên đầy phấn khích, cười khúc khích. "Tớ tìm thấy một bông hoa kỳ diệu!"
<!-- SFX: Magical sparkle - on "kỳ diệu" -->

### Voice Line 004 - SHROOM
Shroom nhảy đến, giọng đầy tò mò. "Đó là loại hoa gì thế?"

### Voice Line 005 - NARRATOR
Nhưng có điều gì đó đang theo dõi họ từ trong bóng tối, người kể thì thầm một cách bất an...
<break time="1.5s" />
<!-- SFX: Ominous tone + Twig snap after break -->
```

---

---

## Vietnamese Emotion to Audio Tag Mapping

```yaml
emotion_mapping:
  vietnamese_to_elevenlabs:
    # Happy emotions
    vui: "[happily]"
    vui_vẻ: "[cheerfully]"
    hạnh_phúc: "[happily]"
    phấn_khích: "[excitedly]"
    hào_hứng: "[excitedly]"

    # Sad emotions
    buồn: "[sadly]"
    buồn_bã: "[sorrowfully]"
    đau_khổ: "[sorrowfully]"

    # Fear/Nervous
    sợ: "[nervously]"
    sợ_hãi: "[nervously][whispers]"
    lo_lắng: "[nervously]"
    hồi_hộp: "[nervously]"

    # Anger (capped for children)
    giận: "[flatly]"  # Mild for children
    tức_giận: "[flatly]"

    # Surprise
    ngạc_nhiên: "[gasps]"
    bất_ngờ: "[gasps]"
    sốc: "[gasps]"

    # Other
    tò_mò: "[curious]"
    bí_ẩn: "[whispers]"
    ấm_áp: "[warmly][softly]"
    dịu_dàng: "[softly][gently]"
    nghiêm_túc: "[deliberate]"
    hài_hước: "[playfully]"

intensity_modifiers:
  thấp: "Single tag, normal delivery"
  trung_bình: "Tag + delivery modifier"
  cao: "Multiple tags + emphasis"

examples:
  - input: "(emotion: vui, intensity: cao)"
    output: "[happily][excitedly] text [laughs]"

  - input: "(emotion: sợ, intensity: thấp)"
    output: "[nervously] text"

  - input: "(emotion: ngạc nhiên, intensity: cao)"
    output: "[gasps] text!"
```

---

## SFX Integration Guidelines

### SFX Placement Rules

```yaml
sfx_timing:
  before_voice:
    - Ambient/background sounds
    - Scene-setting sounds
    - Anticipation sounds
    offset: "0.5-2s before voice starts"

  during_voice:
    - Background ambience (low volume)
    - Continuous sounds (wind, rain)
    ducking: "Lower SFX when voice speaks"

  sync_with_word:
    - Accent sounds on specific words
    - Action sounds matching dialogue
    trigger: "Specific word in dialogue"

  after_voice:
    - Reaction sounds
    - Transition sounds
    - Echo/reverb effects
    offset: "0-1s after voice ends"

sfx_volume_levels:
  background: "20-30% of voice volume"
  accent: "60-80% of voice volume"
  full: "80-100% of voice volume (no voice overlap)"
```

### SFX Categories for Animation

```yaml
sfx_categories:
  ambient:
    purpose: "Scene atmosphere"
    examples:
      - Forest sounds (birds, wind)
      - City sounds (traffic, crowds)
      - Indoor sounds (clock, fireplace)
    volume: "Low, continuous"

  character_action:
    purpose: "Sync with character movement"
    examples:
      - Footsteps
      - Door opening/closing
      - Object pickup
    timing: "Sync with animation"

  emotional_accent:
    purpose: "Emphasize emotional moment"
    examples:
      - Magic sparkle (wonder)
      - Heartbeat (fear/tension)
      - Soft chime (realization)
    timing: "On trigger word or after pause"

  transition:
    purpose: "Scene change indicator"
    examples:
      - Whoosh (time passing)
      - Fade out sound
      - New scene intro sound
    timing: "Between scenes"
```

---

## Complete Animation Prompt Template

```markdown
# ElevenLabs Animation Prompt: [Title]

## Project Info
- **Project:** [Name]
- **Scene:** [Scene number]
- **Duration:** [Estimated]
- **Characters:** [List]

## Voice Settings
- **Model:** Eleven v3 / Multilingual v2
- **Stability:** [Value]
- **Speed:** [Value]
- **Language:** vi

---

## SCENE [NUMBER]: [Title]

### Line 001 - [CHARACTER/NARRATOR]
**Emotion:** [Vietnamese emotion] → [ElevenLabs tags]
**Expression:** [For animation reference]

[audio tags] "Vietnamese dialogue text" [delivery tags]

<!-- SFX: [Sound] - [Timing: before/during/on word/after] - [Volume] -->
<!-- Animation: [Visual reference for sync] -->

---

### Line 002 - [CHARACTER/NARRATOR]
[Continue pattern...]

---

## POST-PRODUCTION GUIDE

### Voice + SFX Layering Order
1. Voice track (primary)
2. Background ambience (continuous, low)
3. Accent SFX (sync with words)
4. Music (if applicable)

### SFX SYNC TABLE

| Line | Word/Time | SFX | File | Volume | Duration |
|------|-----------|-----|------|--------|----------|
| 001 | Start | Forest ambience | forest_01.wav | 25% | Continuous |
| 003 | "kỳ diệu" | Magic sparkle | magic_sparkle.wav | 70% | 1.5s |

### EMOTION TIMELINE

| Time | Character | Emotion (VN) | Audio Tag | Animation Sync |
|------|-----------|--------------|-----------|----------------|
| 0:00 | Narrator | ấm áp | [softly][warmly] | Fade in |
| 0:15 | Piggy | phấn khích | [excitedly][laughs] | Eyes wide, jump |

---

## VOICE RECORDING CHECKLIST

- [ ] All Vietnamese dialogue extracted
- [ ] Emotion tags mapped to ElevenLabs
- [ ] SFX markers included as comments
- [ ] Animation sync notes present
- [ ] Pronunciation notes for names
- [ ] Character voice profiles defined
```

---

## API Emotion Trick

Use `next_text` parameter to influence emotion without speaking it:
```json
{
  "text": "Tớ không thể tin được!",
  "next_text": "cô bé nói một cách phấn khích, mắt sáng lên"
}
```

The model will NOT speak `next_text` but uses it as emotional context.

### Vietnamese Emotion Context Examples

```json
{
  "text": "Có ai ở đây không?",
  "next_text": "giọng cô bé run run vì sợ hãi, tim đập thình thịch"
}

{
  "text": "Cuối cùng cũng đến được rồi!",
  "next_text": "anh ấy thở phào nhẹ nhõm, mỉm cười hạnh phúc"
}
```

---

## Quality Checklist

```yaml
before_generation:
  - [ ] Text is 250+ characters for consistency
  - [ ] Proper punctuation for pacing
  - [ ] Emotion tags match voice character
  - [ ] No symbols/emojis that confuse AI
  - [ ] Numbers written as words
  - [ ] Abbreviations spelled out

after_generation:
  - [ ] Generate 2-3 versions, pick best
  - [ ] Check emotional delivery matches intent
  - [ ] Verify pacing feels natural
  - [ ] Confirm pronunciation accuracy
  - [ ] Test on target audience if possible
```

---

## Recommended Settings by Content Type

```yaml
children_audiobook:
  model: eleven_v3 or multilingual_v2
  stability: 0.45 - 0.55
  speed: 0.90
  style: warm, friendly, expressive
  tips:
    - Use more audio tags for character voices
    - Slower pace for comprehension
    - Clear pronunciation

bedtime_story:
  model: multilingual_v2
  stability: 0.55 - 0.65
  speed: 0.85
  style: soft, soothing, gentle
  tips:
    - Lower energy overall
    - More pauses
    - Calming delivery

adventure_story:
  model: eleven_v3
  stability: 0.35 - 0.45
  speed: 1.0 - 1.1
  style: dynamic, exciting
  tips:
    - Vary pace with action
    - Use [excited], [nervous] tags
    - Dynamic range important

emotional_drama:
  model: eleven_v3
  stability: 0.30 - 0.40
  speed: 0.85 - 0.95
  style: expressive, nuanced
  tips:
    - Use [sad], [crying], [sighs]
    - Slower pace for emotional weight
    - More pauses for impact
```

---

## Troubleshooting

```yaml
issue: "Voice sounds robotic"
solutions:
  - Lower stability to 0.40-0.50
  - Increase style exaggeration slightly (0.1-0.2)
  - Add more emotional context in text
  - Use longer sentences

issue: "Inconsistent between generations"
solutions:
  - Use prompts longer than 250 characters
  - Increase stability to 0.60+
  - Use previous_text for continuity
  - Avoid unusual words/symbols

issue: "Wrong pronunciation"
solutions:
  - Write word phonetically
  - Use pronunciation dictionary
  - Use SSML phoneme tags (v2 models)
  - Try different punctuation around word

issue: "Emotion not matching"
solutions:
  - Add explicit emotion context "he said angrily"
  - Use audio tags (v3 only)
  - Use next_text API parameter
  - Adjust stability lower

issue: "Pacing too fast"
solutions:
  - Add punctuation (periods, commas)
  - Use <break> tags (v2 models)
  - Use ellipses for natural pauses
  - Lower speed setting to 0.85-0.90
```

---

## Sources

- [ElevenLabs Documentation](https://elevenlabs.io/docs)
- [Best Practices](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices)
- [Audio Tags Guide](https://elevenlabs.io/blog/v3-audiotags)
- [Voice Design](https://elevenlabs.io/docs/creative-platform/voices/voice-design)
- [Vietnamese TTS](https://elevenlabs.io/text-to-speech/vietnamese)

---

*This skill enables natural, emotional storytelling for children's content.*
