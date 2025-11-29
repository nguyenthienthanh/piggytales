# Quality Standards

> **Priority:** HIGH
> **Applies to:** All outputs, all phases
> **Enforcement:** QA Reviewer verification

---

## Output Quality Levels

### Draft Quality

```yaml
use_for:
  - Initial concepts
  - Quick tests
  - Internal review

standards:
  - Complete but rough
  - May have placeholders
  - Quick turnaround priority
  - Basic formatting
```

### Standard Quality

```yaml
use_for:
  - Regular production
  - Most audiobooks/animations
  - Normal timeline

standards:
  - Polished and complete
  - No placeholders
  - Proper formatting
  - All checklists passed
```

### High Quality

```yaml
use_for:
  - Premium content
  - Series releases
  - High-stakes projects

standards:
  - Extra polish and refinement
  - Multiple review iterations
  - Extended council review
  - Human sign-off required
```

---

## Script Quality Standards

### Structure

```yaml
requirements:
  - Clear beginning, middle, end
  - Appropriate length for format
  - Scene/chapter breaks where needed
  - Logical flow

checklist:
  - [ ] Hook in first 5 seconds
  - [ ] Clear story arc
  - [ ] Satisfying conclusion
  - [ ] Age-appropriate pacing
```

### Language

```yaml
children_4_8:
  - Simple vocabulary
  - Short sentences (5-10 words avg)
  - Repetition for emphasis
  - Concrete, not abstract

children_9_12:
  - Moderate vocabulary
  - Medium sentences (10-15 words avg)
  - Some complexity allowed
  - Abstract concepts explained

teenagers:
  - Age-appropriate vocabulary
  - Varied sentence structure
  - Complex themes allowed
  - Contemporary references OK
```

### Emotion Tags

```yaml
requirements:
  - Every line tagged
  - Appropriate emotions
  - Natural transitions
  - Intensity levels specified

format:
  example: "[happy, medium] Hello everyone! [excited, high] Today we have an amazing story!"
```

---

## Prompt Quality Standards

### Image Prompts

```yaml
requirements:
  - Detailed scene description
  - Character specifications
  - Style consistency
  - Technical parameters

structure:
  1. Subject description
  2. Action/pose
  3. Setting/background
  4. Style reference
  5. Technical specs

example: |
  A cute chibi pink pig (Piggy) holding a golden storybook,
  standing in a magical forest clearing,
  soft morning light filtering through trees,
  kawaii style, pastel colors, friendly atmosphere,
  high quality, detailed, 4K resolution
```

### Video Prompts

```yaml
requirements:
  - Clear movement description
  - Duration specified
  - Transition notes
  - Audio sync points

structure:
  1. Opening state
  2. Motion/action
  3. End state
  4. Duration
  5. Style notes
```

### Character Prompts

```yaml
requirements:
  - Full character sheet
  - Multiple angles
  - Expression variations
  - Consistency reference

includes:
  - Front view
  - Side view
  - 3/4 view
  - Key expressions
  - Color palette
```

---

## Audio Quality Standards

### Voice

```yaml
technical:
  - Sample rate: 44.1kHz minimum
  - Bit depth: 16-bit minimum
  - Format: MP3 320kbps or WAV
  - No clipping or distortion

performance:
  - Clear pronunciation
  - Appropriate emotions
  - Consistent volume
  - Natural pacing
```

### SFX

```yaml
technical:
  - Clean, no background noise
  - Appropriate volume level
  - Proper fade in/out
  - Correct format

selection:
  - Age-appropriate sounds
  - Non-startling
  - Enhance story
  - Not distracting
```

### Final Mix

```yaml
technical:
  - Balanced levels
  - No clipping
  - Clear voice over SFX
  - Smooth transitions

creative:
  - Emotional enhancement
  - Story support
  - Appropriate atmosphere
  - Not overwhelming
```

---

## Visual Quality Standards

### Images

```yaml
technical:
  - Resolution: 1080p minimum
  - Aspect ratio: As specified
  - File format: PNG or high-quality JPG
  - No artifacts

creative:
  - Style consistency
  - Character accuracy
  - Age-appropriate
  - Engaging composition
```

### Videos

```yaml
technical:
  - Resolution: 1080p minimum
  - Frame rate: 24-30fps
  - Smooth motion
  - No glitches

creative:
  - Consistent style
  - Clear storytelling
  - Appropriate pacing
  - Engaging visuals
```

### Thumbnails

```yaml
technical:
  - Resolution: 1280x720 minimum
  - Clear at small sizes
  - Readable text
  - Platform-compliant

creative:
  - Eye-catching
  - Accurate representation
  - Brand consistent
  - Click-worthy (not clickbait)
```

---

## SEO Quality Standards

### Titles

```yaml
requirements:
  - Accurate to content
  - Include key terms
  - Age-appropriate language
  - Under 100 characters
  - No clickbait

format:
  youtube: "[Content] | [Series/Channel] | [Audience Tag]"
  tiktok: Short, hashtag-friendly
```

### Descriptions

```yaml
requirements:
  - Accurate summary
  - Key information first
  - Include keywords naturally
  - Proper formatting
  - Required credits

structure:
  1. Hook/summary (first 2 lines visible)
  2. Full description
  3. Timestamps (if applicable)
  4. Credits/attributions
  5. Links/calls-to-action
```

### Tags/Hashtags

```yaml
requirements:
  - Relevant to content
  - Mix of broad and specific
  - Include Vietnamese and English
  - No misleading tags

quantity:
  youtube: 10-15 tags
  tiktok: 3-5 hashtags
```

---

## Report Quality Standards

### Structure

```yaml
requirements:
  - Clear sections
  - Professional formatting
  - Complete information
  - Actionable items
```

### Content

```yaml
requirements:
  - Accurate data
  - Specific examples
  - Clear recommendations
  - Prioritized items
```

### Formatting

```yaml
requirements:
  - Consistent headers
  - Proper tables
  - Brand voice
  - Clean layout
```

---

## Quality Checklist

### Pre-Production

- [ ] Project setup complete
- [ ] Target audience defined
- [ ] Workflow configured
- [ ] Source material verified

### Script Phase

- [ ] Script complete and reviewed
- [ ] Language appropriate
- [ ] Emotion tags complete
- [ ] SFX placeholders marked

### Asset Phase

- [ ] Style guide created
- [ ] Prompts complete
- [ ] SEO package ready
- [ ] Character sheets done

### Production Phase

- [ ] All files generated
- [ ] Quality standards met
- [ ] Timing verified
- [ ] Audio balanced

### Export

- [ ] All deliverables ready
- [ ] Files properly named
- [ ] Documentation complete
- [ ] QA sign-off received

---

## Quality Metrics

### Viral Score Components

| Metric | Weight | Target |
|--------|--------|--------|
| Hook Strength | 25% | 8+ |
| Emotional Impact | 25% | 7+ |
| Shareability | 20% | 7+ |
| Trend Alignment | 15% | 6+ |
| Uniqueness | 15% | 7+ |

### Pass Thresholds

| Score | Result | Action |
|-------|--------|--------|
| 8.0+ | Excellent | Proceed |
| 6.5-7.9 | Good | Minor fixes |
| 5.0-6.4 | Acceptable | Revise needed |
| <5.0 | Below Standard | Major revision |

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
