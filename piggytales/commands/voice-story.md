# Command: /tale voice-story

> **Purpose:** Create story from requirements, then generate ElevenLabs TTS prompt after approval
> **Skill:** `elevenlabs-tts.md`
> **Workflow:** Requirements -> Story Draft -> User Approval -> ElevenLabs Prompt

---

## Usage

```bash
/tale voice-story [options]
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `--lang <language>` | Story language (vi, en) | en |
| `--audience <type>` | Target audience (children, teens, family) | children |
| `--model <model>` | ElevenLabs model (v3, v2, turbo, flash) | v3 |
| `--length <type>` | Story length (short, medium, long) | medium |
| `--style <style>` | Narration style (warm, dramatic, soothing, playful) | warm |

---

## Workflow

### Phase 1: Requirements Gathering

When user runs `/tale voice-story`, prompt for:

```yaml
required_info:
  title: "Story title or theme"
  summary: "Brief description or key plot points"
  language: "Vietnamese (vi) or English (en)"
  audience: "children (4-12), teens (13-17), family (all ages)"

optional_info:
  characters: "Main characters and their traits"
  mood: "Overall emotional tone"
  lesson: "Moral or takeaway message"
  length: "short (~2min), medium (~5min), long (~10min)"
  special_requests: "Any specific requirements"
```

### Phase 2: Story Creation

Create story following these guidelines:

```yaml
structure:
  opening:
    - Hook within first 2 sentences
    - Set scene and introduce characters
    - Establish tone

  middle:
    - Build tension or curiosity
    - Character development
    - Emotional moments
    - Age-appropriate challenges

  ending:
    - Satisfying resolution
    - Clear takeaway (if educational)
    - Memorable closing line

style_by_audience:
  children:
    - Simple, clear vocabulary
    - Short sentences (8-15 words)
    - Repetition for engagement
    - Onomatopoeia welcome
    - Positive, uplifting themes

  teens:
    - More complex vocabulary
    - Relatable themes
    - Some tension/stakes allowed
    - Contemporary references OK

  family:
    - Multi-layered storytelling
    - Something for everyone
    - Wholesome themes
```

### Phase 3: User Review

Present story with:
1. Full story text
2. Estimated duration
3. Suggested emotion markers
4. Voice recommendations

Ask user to:
- Approve story
- Request revisions
- Reject and restart

### Phase 4: ElevenLabs Prompt Generation

After approval, generate prompt optimized for selected model:

**For Eleven v3 (with audio tags):**
```markdown
# ElevenLabs Prompt - [Title]

## Recommended Settings
- Model: Eleven v3
- Stability: [value based on content]
- Speed: [value based on content]
- Voice: [recommendation]

## Story with Audio Tags

[Insert story with embedded audio tags for emotions, pauses, delivery]

## Character Voice Notes
[Character-specific delivery instructions]
```

**For Multilingual v2/Turbo (narrative style):**
```markdown
# ElevenLabs Prompt - [Title]

## Recommended Settings
- Model: Multilingual v2 / Turbo v2.5
- Stability: [value]
- Speed: [value]
- Voice: [recommendation]

## Story with Emotion Context

[Insert story with narrative emotion cues and SSML break tags]

## Voice Direction
[Overall delivery guidance]
```

---

## Example Session

```
User: /tale voice-story --lang vi --audience children

Claude: I'll help you create a Vietnamese children's story. Please share:

1. **Title/Theme:** What's the story about?
2. **Summary:** Brief plot or key moments
3. **Characters:** Who are the main characters?
4. **Mood:** Happy, adventurous, calm, etc.?
5. **Length:** short (~2min), medium (~5min), long (~10min)?
6. **Lesson:** Any moral or message?

User: Theme: A little firefly who is afraid of the dark
      Characters: Firefly named Lu, wise owl grandmother
      Mood: Gentle, encouraging
      Lesson: Your light shines brightest when you're brave
      Length: Medium

Claude: Creating your story draft...

---
## Story Draft: "Lu - Chú Đom Đóm Nhỏ"

Ngày xửa ngày xưa, trong một khu rừng yên bình, có một chú đom đóm nhỏ tên là Lu...

[Full story presented]

---

**Duration:** ~4 minutes
**Recommended Voice:** Warm, gentle female narrator
**Model:** Eleven v3 for emotional expression

Do you approve this story, or would you like revisions?

User: Approved!

Claude: Generating ElevenLabs prompt...

[ElevenLabs-optimized prompt with audio tags output]
```

---

## Output Format

After approval, output contains:

1. **Settings Block** - Model, stability, speed, voice recommendations
2. **Tagged Script** - Full story with emotion/delivery tags embedded
3. **Voice Notes** - Character-specific instructions
4. **Pronunciation Guide** - For difficult words (especially Vietnamese names)
5. **Segment Breakdown** - For long stories, split into manageable chunks

---

## Related Commands

| Command | Purpose |
|---------|---------|
| `/tale voice-prompt` | Convert existing story to ElevenLabs prompt |
| `/tale voice generate` | Generate audio using configured API |
| `/tale config voice` | Configure voice settings |

---

## Tips for Best Results

1. **Be specific about mood** - "gentle and soothing" vs just "calm"
2. **Name your characters** - Helps with consistency
3. **Mention key emotional beats** - "should feel triumphant at the end"
4. **Specify dialect if needed** - Northern/Southern Vietnamese
5. **Note any pronunciation concerns** - Unusual names or words

---

*This command streamlines story creation for high-quality TTS output.*