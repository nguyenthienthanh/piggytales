# Command: /tale voice-prompt

> **Purpose:** Convert existing story text to optimized ElevenLabs TTS prompt
> **Skill:** `elevenlabs-tts.md`
> **Workflow:** Story Input -> Analysis -> ElevenLabs Prompt

---

## Usage

```bash
/tale voice-prompt [options]
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--lang <language>` | Story language (vi, en) | auto-detect |
| `--model <model>` | ElevenLabs model (v3, v2, turbo, flash) | v3 |
| `--style <style>` | Narration style (warm, dramatic, soothing, playful, neutral) | warm |
| `--stability <value>` | Voice stability 0.0-1.0 | 0.45 |
| `--speed <value>` | Speaking speed 0.7-1.2 | 0.95 |
| `--split` | Split into segments for long content | false |

---

## Workflow

### Step 1: User Shares Story

User provides story text in any format:
- Plain text
- Markdown
- Copy-pasted from document

### Step 2: Analysis

Claude analyzes the story for:

```yaml
analysis:
  language: "Detect Vietnamese or English"
  length: "Estimate duration (150 words/min avg)"
  characters:
    - name: "Character name"
      personality: "Inferred traits"
      voice_suggestion: "Recommended voice type"

  emotional_beats:
    - timestamp: "~0:30"
      emotion: "excited"
      intensity: "high"

  pacing_notes:
    - "Opening is calm, builds tension"
    - "Climax at middle, fast-paced"
    - "Gentle resolution"

  pronunciation_concerns:
    - word: "Nguyễn"
      note: "Vietnamese name, preserve tones"
```

### Step 3: Generate Optimized Prompt

Transform story based on selected model:

---

## Output Format by Model

### Eleven v3 Output

```markdown
# ElevenLabs Prompt - [Title]

## Voice Settings
- **Model:** Eleven v3
- **Stability:** [0.35-0.50 for expressive, 0.55-0.70 for calm]
- **Speed:** [0.85-1.0]
- **Recommended Voice:** [suggestion based on content]

## Story with Audio Tags

[softly] Once upon a time... [pause]

[warmly] There was a little girl named Mai. [cheerfully] She loved to sing!

[excitedly] "Look, mama!" [laughs] "A butterfly!"

[whispers][nervously] But then... she heard something strange... [pause]

[gasps] What was that?

---

## Character Voice Guide

**Narrator:** Warm, engaging, slightly slower pace
- Use [softly] for intimate moments
- Use [excitedly] for discoveries
- Use [whispers] for suspense

**Mai (child):** Bright, innocent
- Higher energy, more [cheerfully] and [excitedly]
- [laughs] and [giggles] for playful moments

---

## Segment Breakdown (if long)

| Segment | Duration | Primary Emotion |
|---------|----------|-----------------|
| Opening | ~1:00 | calm, curious |
| Discovery | ~1:30 | excited |
| Challenge | ~2:00 | tense, nervous |
| Resolution | ~1:00 | warm, happy |

---

## Pronunciation Notes

| Word | Pronunciation | Note |
|------|---------------|------|
| Mai | /mai/ | Vietnamese name |
```

### Multilingual v2 / Turbo v2.5 Output

```markdown
# ElevenLabs Prompt - [Title]

## Voice Settings
- **Model:** Multilingual v2 / Turbo v2.5
- **Stability:** [value]
- **Speed:** [value]
- **Language Code:** vi / en

## Story with SSML & Emotion Context

Once upon a time, the narrator began softly...

<break time="0.5s" />

There was a little girl named Mai, her voice bright and innocent. She loved to sing!

"Look, mama!" Mai exclaimed with pure joy, her eyes sparkling. "A butterfly!"

<break time="0.8s" />

But then... she heard something strange, the narrator whispered ominously.

<break time="1s" />

"What was that?" she asked, her voice trembling slightly.

---

## Emotion Cues Reference

Instead of audio tags, use narrative descriptions:
- "she said excitedly"
- "he whispered nervously"
- "the narrator intoned dramatically"
- "her voice trembling with emotion"

---

## Voice Direction

**Overall Tone:** [Description]
**Pacing:** [Description]
**Emotional Arc:** [Start -> Middle -> End]
```

---

## Example Usage

```
User: /tale voice-prompt --lang vi --model v3

Please convert this story:

Ngày xửa ngày xưa, ở một ngôi làng nhỏ bên sông, có một cô bé tên là Hoa.
Hoa rất thích chơi với những con bướm trong vườn.
Một ngày nọ, Hoa thấy một con bướm rất đẹp. "Ôi, đẹp quá!" Hoa reo lên.
Nhưng con bướm bay đi mất. Hoa buồn lắm.
Bà ngoại nhìn Hoa âu yếm: "Cháu ơi, những gì đẹp nhất không cần phải giữ lại."
Hoa hiểu ra và mỉm cười.

---

Claude: Analyzing story...

## Analysis
- **Language:** Vietnamese
- **Duration:** ~1.5 minutes
- **Characters:** Hoa (child), Grandmother
- **Emotional Arc:** Curious -> Excited -> Sad -> Comforted -> Wise

Generating ElevenLabs prompt...

---

# ElevenLabs Prompt - "Hoa và Con Bướm"

## Voice Settings
- **Model:** Eleven v3
- **Stability:** 0.45
- **Speed:** 0.90
- **Recommended Voice:** Warm Vietnamese female narrator

## Story with Audio Tags

[softly] Ngày xửa ngày xưa, ở một ngôi làng nhỏ bên sông... [pause]

[warmly] Có một cô bé tên là Hoa.

[cheerfully] Hoa rất thích chơi với những con bướm trong vườn.

[curiously] Một ngày nọ, Hoa thấy một con bướm rất đẹp.

[excitedly] "Ôi, đẹp quá!" [laughs softly] Hoa reo lên.

[pause]

[sadly] Nhưng con bướm bay đi mất.

[sorrowfully] Hoa buồn lắm...

[pause]

[warmly][softly] Bà ngoại nhìn Hoa âu yếm:

[gently] "Cháu ơi, những gì đẹp nhất không cần phải giữ lại."

[pause]

[contentedly] Hoa hiểu ra... [smiles] và mỉm cười.

---

## Character Voice Guide

**Narrator:** Warm, gentle grandmother-like voice
**Hoa:** Child-like wonder, emotional range from excited to sad
**Grandmother:** Wise, loving, slow and deliberate

## Pronunciation Notes

| Word | Note |
|------|------|
| Hoa | /hwa/ - means "flower" |
| Bà ngoại | Maternal grandmother |
```

---

## Conversion Rules

### Adding Audio Tags (v3)

```yaml
patterns:
  excitement:
    triggers: ["!", "reo lên", "exclaimed", "shouted"]
    tags: "[excitedly]", "[happily]"

  sadness:
    triggers: ["buồn", "sad", "crying", "tears"]
    tags: "[sadly]", "[sorrowfully]"

  fear/suspense:
    triggers: ["...", "suddenly", "mysterious", "strange"]
    tags: "[nervously]", "[whispers]"

  warmth:
    triggers: ["smiled", "mỉm cười", "loved", "yêu"]
    tags: "[warmly]", "[softly]"

  pause_points:
    triggers: [".", "...", "paragraph break", "scene change"]
    tags: "[pause]", "[breathes]"
```

### Adding Narrative Context (v2/Turbo)

```yaml
patterns:
  dialogue_attribution:
    before: '"Wow!" she said.'
    after: '"Wow!" she exclaimed with wonder.'

  action_emotion:
    before: "She ran away."
    after: "She ran away, her heart pounding with fear."

  pause_insertion:
    before: "He opened the door. Inside was..."
    after: "He opened the door. <break time=\"1s\" /> Inside was..."
```

---

## Tips for Best Conversion

1. **Preserve original meaning** - Don't add emotions not in the text
2. **Match tone to content** - Children's stories = warmer, gentler tags
3. **Don't over-tag** - 1-2 tags per paragraph is usually enough
4. **Strategic pauses** - Use [pause] for dramatic effect, not every sentence
5. **Character consistency** - Same character = similar emotional delivery
6. **Test pronunciation** - Vietnamese names may need phonetic guides

---

## Related Commands

| Command | Purpose |
|---------|---------|
| `/tale voice-story` | Create story from requirements first |
| `/tale voice generate` | Generate audio from prompt |
| `/tale script show` | View current project script |

---

*This command transforms any story into an ElevenLabs-optimized prompt.*
