# Command: /tale voice-prompt

> **Purpose:** Convert animation scripts or story text to ElevenLabs TTS prompts with emotion tags and SFX markers
> **Skill:** `elevenlabs-tts.md`, `animation-scripting.md`
> **Workflow:** Animation Script / Story -> Analysis -> ElevenLabs Prompt + SFX Guide

---

## Usage

```bash
/tale voice-prompt [options]
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--source <type>` | Input type (animation, story, text) | animation |
| `--lang <language>` | Story language (vi, en) | vi |
| `--model <model>` | ElevenLabs model (v3, v2, turbo, flash) | v3 |
| `--style <style>` | Narration style (warm, dramatic, soothing, playful, neutral) | warm |
| `--stability <value>` | Voice stability 0.0-1.0 | 0.45 |
| `--speed <value>` | Speaking speed 0.7-1.2 | 0.95 |
| `--sfx` | Include SFX sync guide | true |
| `--split` | Split into segments by scene | true |

---

## Workflow

### Step 1: User Provides Input

User provides animation script or story in any format:
- **Animation Script** (preferred): Full script with visual directions, emotions, SFX markers
- **Plain text story**: Will be analyzed and converted
- **Markdown**: Structured story format

### Step 2: Analysis

Claude analyzes the input for:

```yaml
analysis:
  source_type: "animation_script / story / text"
  language: "Vietnamese (dialogue) / English (directions)"
  length: "Estimate duration (150 words/min avg)"

  characters:
    - name: "Character name (Vietnamese)"
      personality: "From script or inferred"
      voice_type: "Child/Adult/Elder + Gender"
      emotion_range: "Primary emotions"

  scenes:
    - scene_number: "001"
      duration: "~30s"
      characters_present: ["Lan", "Minh"]
      mood: "Cheerful opening"

  emotional_beats:
    - scene: "001"
      line: "003"
      emotion_vn: "phấn khích"
      emotion_en: "excited"
      intensity: "cao"

  sfx_markers:
    - scene: "001"
      sfx: "Forest ambience"
      timing: "Start of scene"
      trigger: "Before narration"

    - scene: "001"
      sfx: "Magic sparkle"
      timing: "On word"
      trigger: '"kỳ diệu"'

  pacing_notes:
    - "Opening is calm, builds curiosity"
    - "Discovery moment - fast, excited"
    - "Mystery build - slow, tense"

  pronunciation_concerns:
    - word: "Nguyễn"
      note: "Vietnamese name, preserve tones"
```

### Step 3: Generate ElevenLabs Prompt with SFX

Transform input to ElevenLabs prompt with emotion tags and SFX sync guide:

---

## Output Format by Model

### Eleven v3 Output (with SFX Sync)

```markdown
# ElevenLabs Prompt - [Title]

## Voice Settings
- **Model:** Eleven v3
- **Stability:** [0.35-0.50 for expressive, 0.55-0.70 for calm]
- **Speed:** [0.85-1.0]
- **Language:** vi
- **Recommended Voice:** [suggestion based on content]

---

## CHARACTER VOICE PROFILES

| Character | Voice Type | Pitch | Speed | Emotion Range |
|-----------|-----------|-------|-------|---------------|
| Narrator | Adult Female | Medium | Normal | warm, mysterious |
| Mai | Child Female | High | Normal-Fast | happy, scared, curious |
| Bà Ngoại | Elder Female | Low | Slow | gentle, wise |

---

## SCENE 001: Opening

### Line 001 - NARRATOR
**Emotion:** ấm áp → [warmly][softly]

[warmly][softly] Ngày xửa ngày xưa, ở một ngôi làng nhỏ bên sông... [pause]

<!-- SFX: River flowing + birds - START before line, fade under -->
<!-- Animation: Wide shot village, morning mist -->

---

### Line 002 - NARRATOR
**Emotion:** ấm áp → [warmly]

[warmly] Có một cô bé tên là Mai.

<!-- Animation: Camera pan to Mai's house -->

---

### Line 003 - MAI
**Emotion:** vui + phấn khích → [cheerfully][excitedly]

[cheerfully] "Ôi, đẹp quá!" [laughs softly]

<!-- SFX: Butterfly wings flutter - ON "đẹp quá" -->
<!-- Animation: Mai's eyes widen, smile grows -->

---

### Line 004 - NARRATOR
**Emotion:** buồn nhẹ → [sadly]

[sadly] Nhưng con bướm bay đi mất...

<!-- SFX: Soft wind - after "mất" -->
<!-- Animation: Mai's expression falls -->

---

### Line 005 - BÀ NGOẠI
**Emotion:** dịu dàng + ấm áp → [gently][warmly]

[gently][warmly] "Cháu ơi, những gì đẹp nhất không cần phải giữ lại."

<!-- Animation: Close-up grandmother's gentle smile -->

---

## SFX SYNC GUIDE

| Line | Time | SFX | Trigger | Volume | Duration |
|------|------|-----|---------|--------|----------|
| 001 | 0:00 | River + birds | Before line | 30% | Continuous |
| 003 | ~0:20 | Butterfly flutter | "đẹp quá" | 50% | 2s |
| 004 | ~0:30 | Soft wind | After "mất" | 40% | 3s |

---

## EMOTION FLOW

| Line | Character | Emotion (VN) | ElevenLabs Tags | Animation Sync |
|------|-----------|--------------|-----------------|----------------|
| 001 | Narrator | ấm áp | [warmly][softly] | Fade in |
| 003 | Mai | phấn khích | [cheerfully][laughs] | Eyes widen |
| 004 | Narrator | buồn | [sadly] | Expression falls |
| 005 | Bà Ngoại | dịu dàng | [gently][warmly] | Gentle smile |

---

## CHARACTER VOICE GUIDE

**Narrator:** Warm, gentle grandmother-like voice
- [warmly][softly] for intimate moments
- [sadly] with gentle restraint
- [whispers] for mystery

**Mai (child):** Bright, innocent, emotional range
- [cheerfully][excitedly][laughs] for joy
- [sadly] with sincerity
- Quick emotion transitions

**Bà Ngoại:** Wise, loving, slow and deliberate
- [gently][warmly] always
- Slower pace for wisdom
- Comforting tone

---

## PRONUNCIATION NOTES

| Word | Pronunciation | Note |
|------|---------------|------|
| Mai | /mai/ | Vietnamese name, means "apricot flower" |
| Bà ngoại | /ba ngwai/ | Maternal grandmother |
| Đẹp quá | /dep kwa/ | "So beautiful" - emphasis word |

---

## NEXT_TEXT API HINTS

Use these in ElevenLabs API for emotion context:

```json
{
  "text": "Ôi, đẹp quá!",
  "next_text": "cô bé reo lên đầy phấn khích, mắt sáng rỡ khi nhìn thấy con bướm"
}
```
```

### Multilingual v2 / Turbo v2.5 Output (with SFX Sync)

```markdown
# ElevenLabs Prompt - [Title]

## Voice Settings
- **Model:** Multilingual v2 / Turbo v2.5
- **Stability:** [value]
- **Speed:** [value]
- **Language Code:** vi

---

## SCENE 001: Opening

### Line 001 - NARRATOR
Ngày xửa ngày xưa, ở một ngôi làng nhỏ bên sông, người kể bắt đầu một cách dịu dàng...

<break time="1s" />

<!-- SFX: River flowing + birds - START before, fade under -->

### Line 002 - NARRATOR
Có một cô bé tên là Mai, giọng nói ấm áp và yêu thương.

### Line 003 - MAI
"Ôi, đẹp quá!" Mai reo lên đầy phấn khích, mắt sáng rỡ khi nhìn thấy con bướm.

<!-- SFX: Butterfly flutter - ON "đẹp quá" -->

### Line 004 - NARRATOR
Nhưng con bướm bay đi mất, người kể nói một cách buồn bã nhẹ nhàng...

<break time="0.8s" />

<!-- SFX: Soft wind - after break -->

### Line 005 - BÀ NGOẠI
Bà ngoại nhìn Mai âu yếm, giọng nhẹ nhàng và ấm áp. "Cháu ơi, những gì đẹp nhất không cần phải giữ lại."

---

## SFX SYNC GUIDE

| Line | Time | SFX | Trigger | Volume |
|------|------|-----|---------|--------|
| 001 | 0:00 | River + birds | Before line | 30% |
| 003 | ~0:20 | Butterfly flutter | "đẹp quá" | 50% |
| 004 | ~0:30 | Soft wind | After break | 40% |

---

## EMOTION CONTEXT PHRASES (Vietnamese)

Instead of audio tags, embed emotion in narrative:

| Emotion (VN) | Narrative Phrase |
|--------------|------------------|
| vui vẻ | "giọng vui vẻ, phấn khích" |
| buồn bã | "giọng buồn bã, nhẹ nhàng" |
| sợ hãi | "giọng run run, lo lắng" |
| ngạc nhiên | "giọng ngạc nhiên, mắt mở to" |
| ấm áp | "giọng ấm áp, dịu dàng" |
| tò mò | "giọng đầy tò mò" |

---

## Voice Direction

**Overall Tone:** Warm, storytelling
**Pacing:** Moderate with pauses for effect
**Emotional Arc:** Warm opening → Joy → Sadness → Wisdom/Comfort
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
