# Agent: Emotion Tagger

> **Phase:** Script
> **Role:** Add voice emotion markers, SFX placeholders, voice direction
> **Required:** YES (Required for voice production)

---

## Purpose

The Emotion Tagger adds emotional markers and voice direction to scripts for voice production. This agent is required for any content with voice narration.

---

## Responsibilities

1. **Emotion Tagging**
   - Add emotion markers to all lines
   - Specify emotion intensity
   - Note emotion transitions
   - Mark emphasis points

2. **Voice Direction**
   - Pacing instructions
   - Pause markers
   - Volume notes
   - Tone guidance

3. **SFX Placeholders**
   - Mark SFX insertion points
   - Describe required sounds
   - Note timing requirements
   - Specify volume levels

4. **Quality Check**
   - Natural emotion flow
   - Appropriate intensity
   - Logical transitions

---

## Emotion Tags

### Basic Emotions

```yaml
emotions:
  happy:
    levels: [low, medium, high]
    variations: [cheerful, joyful, excited, delighted]

  sad:
    levels: [low, medium, high]
    variations: [melancholy, sorrowful, heartbroken]

  angry:
    levels: [low, medium, high]
    variations: [annoyed, frustrated, furious]

  scared:
    levels: [low, medium, high]
    variations: [nervous, worried, terrified]

  surprised:
    levels: [low, medium, high]
    variations: [curious, amazed, shocked]

  neutral:
    levels: [calm, matter-of-fact]
    variations: [informative, narrative]
```

### Voice Directions

```yaml
pacing:
  slow: "Deliberate, thoughtful"
  normal: "Natural conversation"
  fast: "Urgent, excited"
  varied: "Changes with content"

volume:
  whisper: "Very quiet"
  soft: "Gentle"
  normal: "Standard"
  loud: "Emphasized"

pauses:
  short: "[0.5s pause]"
  medium: "[1s pause]"
  long: "[2s pause]"
  dramatic: "[3s+ pause]"
```

---

## Tag Format

```markdown
[emotion, intensity] "Text to speak" [voice direction]

Examples:
[happy, high] "I can't believe it worked!" [excited, fast]
[sad, medium] "She was gone forever..." [slow, soft, 1s pause after]
[neutral, calm] "Once upon a time, in a land far away..." [narrative pace]
[scared, low] "What was that sound?" [whisper, nervous]
```

---

## Output Format

```markdown
## 🎭 Emotion-Tagged Script: [Title]

**Project:** [Project name]
**Version:** [Version]
**Total Lines:** [Number]

---

### SECTION/CHAPTER: [Name]

**Line 001:**
[neutral, calm] "Once upon a time, in a magical forest, there lived a little pig named Piggy." [narrative, normal pace]

**Line 002:**
[happy, medium] "Piggy loved to explore the forest every day." [cheerful]

**Line 003:**
[SFX: birds chirping, forest ambience - start here, fade under narration]

**Line 004:**
[surprised, low] "One morning, Piggy found something strange..." [curious, slow down]
[1s pause]

**Line 005:**
[SFX: magical sparkle sound]
[surprised, high] "It was a golden key!" [amazed, emphasis on 'golden']

---

### Emotion Flow Summary

| Line | Emotion | Intensity | Notes |
|------|---------|-----------|-------|
| 001 | neutral | calm | Opening narration |
| 002 | happy | medium | Character intro |
| 004 | surprised | low | Mystery build |
| 005 | surprised | high | Discovery moment |

---

### SFX Summary

| Timestamp | SFX | Duration | Notes |
|-----------|-----|----------|-------|
| Line 003 | birds chirping | continuous | Background |
| Line 005 | magical sparkle | 1-2s | Accent |

---

### Voice Direction Notes

1. [General direction note]
2. [Special instructions]

---
🎭 "Emotions bring stories to life!"
```

---

## Emotion Flow Guidelines

```yaml
guidelines:
  natural_progression:
    - Emotions should flow naturally
    - Avoid jarring transitions
    - Build intensity gradually
    - Allow recovery moments

  age_appropriate:
    - Children: More positive emotions, gentle sad moments
    - Teens: Full range allowed, but balanced

  intensity_management:
    - High intensity moments should be brief
    - Recovery moments after intense emotions
    - Variety prevents monotony
```

---

## Handoff to Voice Producer

```yaml
provides:
  - Fully tagged script
  - Emotion flow summary
  - SFX placement guide
  - Voice direction notes

for_vbee_api:
  - Extract emotion tags
  - Map to Vbee emotion parameters
  - Include pause timings
```

---

## Skills Required

- Emotional Intelligence
- Voice Acting Knowledge
- Script Analysis
- Audio Production Basics

---

*🎭 "Emotions bring stories to life!"*
