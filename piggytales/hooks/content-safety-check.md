# Content Safety Check Hook

**Version:** 1.0.0
**Purpose:** Validate content against child-safety guidelines
**Trigger:** Before content creation, during review
**Priority:** CRITICAL

---

## Purpose

Ensure all content is appropriate for target audience (children 4-12, teenagers 13-17).

---

## When Triggered

1. Before script writing
2. During emotion tagging
3. Before voice generation
4. During council review
5. Before final export

---

## Safety Categories

### Prohibited Content (BLOCK)

```yaml
prohibited:
  violence:
    - Gore, blood, graphic violence
    - Weapons (guns, knives in threatening context)
    - Physical abuse
    - Animal cruelty

  horror:
    - Jump scares
    - Monsters designed to frighten
    - Nightmarish imagery
    - Psychological horror

  sexual:
    - Any sexual content
    - Nudity
    - Romantic content beyond age-appropriate

  language:
    - Profanity
    - Vulgar language
    - Hate speech
    - Discriminatory language

  substances:
    - Drug references
    - Alcohol consumption
    - Smoking

  dangerous:
    - Dangerous challenges
    - Imitable harmful behavior
    - Self-harm

  other:
    - Bullying themes (without resolution)
    - Discrimination
    - Misleading information
```

### Requires Review (FLAG)

```yaml
requires_review:
  emotional:
    - Death themes (handled sensitively)
    - Loss, grief
    - Separation anxiety

  conflict:
    - Arguments between characters
    - Competitive situations
    - Mild peril

  sensitive:
    - Family issues
    - Friendship conflicts
    - Exclusion themes
```

### Allowed with Age Consideration

```yaml
age_specific:
  children_4_7:
    - Very simple conflicts
    - Always positive resolution
    - No villains, only misunderstandings

  children_8_12:
    - Mild conflict
    - Clear good vs bad
    - Positive resolution required

  teenagers:
    - More complex themes
    - Realistic conflicts
    - Positive messaging required
```

---

## Check Process

### Step 1: Keyword Scan
```yaml
scan:
  prohibited_words: [list of blocked terms]
  warning_words: [list of flagged terms]
  context_check: true
```

### Step 2: Theme Analysis
```yaml
analyze:
  story_themes: extract main themes
  character_behavior: check for negative modeling
  conflict_resolution: verify positive outcome
```

### Step 3: Visual Check (Animation)
```yaml
visual_check:
  prompts: scan image/video prompts
  style: verify age-appropriate style
  characters: check character design
```

### Step 4: Audio Check
```yaml
audio_check:
  emotion_tags: verify appropriate emotions
  sfx: check sound effect appropriateness
  music: verify music mood
```

---

## Output

### Pass
```markdown
🍄✨ Content Safety: PASSED

✅ No prohibited content detected
✅ Themes appropriate for target audience
✅ Positive messaging confirmed

Proceed with: /tale next
```

### Warning (Needs Review)
```markdown
🐷❓ Content Safety: NEEDS REVIEW

⚠️ Flagged items:
  - Line 45: "death" theme detected
  - Scene 3: Conflict without clear resolution

📋 Recommendation:
  - Review line 45 for sensitive handling
  - Add resolution scene after conflict

Actions:
  - /tale approve - Accept after review
  - /tale revise "instructions" - Make changes
```

### Block
```markdown
🐷❌ Content Safety: BLOCKED

❌ Prohibited content detected:
  - Line 23: Inappropriate language
  - Scene 5: Violence reference

🚫 Cannot proceed until resolved.

Actions:
  - /tale script edit - Edit script
  - /tale redo - Restart phase
```

---

## Escalation

```yaml
escalation:
  auto_block:
    - Any prohibited content
    - Multiple warnings

  human_required:
    - Edge cases
    - Context-dependent content
    - Unusual themes

  ai_decides:
    - Clear passes
    - Minor style issues
```

---

**Version:** 1.0.0
**Critical:** YES - Content safety is non-negotiable
