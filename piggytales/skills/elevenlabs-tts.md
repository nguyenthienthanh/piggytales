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

## Storytelling Prompt Structure

### For Eleven v3 (Audio Tags)
```
[Narrator voice - warm, engaging]

[softly] Once upon a time, in a land far, far away... [pause]

There lived a little pig named Piggy. [cheerfully] He loved to explore the mushroom forest!

[excitedly] "Look, Shroom!" [laughs] "I found a magical flower!"

[curious] Shroom hopped over... "What kind of flower is it?"

[whispers][nervously] But something was watching them from the shadows... [pause]
```

### For Multilingual v2/Turbo (Narrative Style)
```
Once upon a time, in a land far, far away...

<break time="1s" />

There lived a little pig named Piggy, she said cheerfully. He loved to explore the mushroom forest!

"Look, Shroom!" Piggy exclaimed with excitement, laughing. "I found a magical flower!"

Shroom hopped over, his voice filled with curiosity. "What kind of flower is it?"

But something was watching them from the shadows, the narrator whispered ominously...

<break time="1.5s" />
```

---

## API Emotion Trick

Use `next_text` parameter to influence emotion without speaking it:
```json
{
  "text": "I can't believe you did that.",
  "next_text": "she said angrily, her voice trembling with rage"
}
```

The model will NOT speak `next_text` but uses it as emotional context.

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
