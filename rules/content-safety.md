# Content Safety Rules

> **Priority:** CRITICAL
> **Applies to:** All agents, all phases
> **Enforcement:** Automatic blocking + human escalation

---

## Target Audience Guidelines

### Children (Ages 4-12)

```yaml
requirements:
  language:
    - Simple, clear vocabulary
    - Short sentences
    - No complex idioms without explanation
    - No slang or inappropriate language

  themes:
    - Friendship, kindness, sharing
    - Adventure, discovery, learning
    - Family, love, belonging
    - Problem-solving, courage
    - Respect for nature and animals

  visuals:
    - Bright, friendly colors
    - Cute, non-threatening characters
    - Simple, clear compositions
    - No dark or scary imagery

  audio:
    - Warm, friendly voice tones
    - Appropriate pace for comprehension
    - Gentle sound effects
    - No loud, startling sounds
```

### Teenagers (Ages 13-17)

```yaml
requirements:
  language:
    - Age-appropriate vocabulary
    - No explicit profanity
    - Relatable expressions allowed
    - No hate speech or discrimination

  themes:
    - Identity, self-discovery
    - Friendship, relationships (non-romantic or age-appropriate)
    - Challenges, growth, resilience
    - Social issues (presented responsibly)
    - Aspirations, dreams

  visuals:
    - Can be more complex/detailed
    - Age-appropriate styling
    - No explicit or suggestive content

  audio:
    - Can be more dynamic
    - Contemporary styles allowed
    - No explicit lyrics
```

### Family (All Ages)

```yaml
requirements:
  - Content enjoyable for all age groups
  - No content inappropriate for youngest viewers
  - Multi-generational appeal
  - Educational value encouraged
```

---

## Prohibited Content

### Category: Violence

```yaml
absolutely_prohibited:
  - Gore, blood, graphic injury
  - Torture, abuse
  - Weapons used against people
  - Death depicted graphically
  - Self-harm

requires_careful_handling:
  - Mild cartoon conflict
  - Non-graphic consequences
  - Resolution through non-violence
  - Must serve educational purpose
```

### Category: Horror/Fear

```yaml
absolutely_prohibited:
  - Jump scares
  - Disturbing imagery
  - Psychological horror
  - Nightmarish scenarios
  - Body horror

requires_careful_handling:
  - Mild suspense (age-appropriate)
  - "Scary" villains (must be non-threatening resolution)
  - Dark themes (must have positive outcome)
```

### Category: Sexual Content

```yaml
absolutely_prohibited:
  - Any sexual content
  - Nudity
  - Sexual innuendo
  - Romantic content beyond age-appropriate
  - Objectification
```

### Category: Substance Abuse

```yaml
absolutely_prohibited:
  - Drug use or references
  - Alcohol consumption (glamorized)
  - Smoking
  - Substance abuse normalization
```

### Category: Harmful Behavior

```yaml
absolutely_prohibited:
  - Bullying (unless showing consequences)
  - Discrimination (race, gender, religion, etc.)
  - Dangerous challenges/activities
  - Criminal behavior (glamorized)
  - Disrespect to authority figures

requires_careful_handling:
  - Conflict between characters (must resolve positively)
  - Rule-breaking (must show consequences)
  - Peer pressure (must show resistance)
```

### Category: Misinformation

```yaml
absolutely_prohibited:
  - False health information
  - Conspiracy theories
  - Historical revisionism
  - Scientific misinformation
  - Misleading claims
```

---

## Content Review Triggers

### Automatic Escalation to Human

```yaml
triggers:
  - Any mention of death (even natural)
  - Loss of family member/pet themes
  - Illness or medical themes
  - Conflict or fighting scenes
  - Emotional distress depiction
  - Authority figure criticism
  - Religious or cultural references
  - Political themes (even indirect)

action: Pause and request human review
```

### Warning Signs in Content

```yaml
yellow_flags:
  - Intense emotional scenes
  - Character in danger
  - Natural disaster themes
  - Animal predator/prey scenarios
  - Competition themes

action: Flag for council review with extra scrutiny
```

---

## Safety Checklist

### Pre-Production Checklist

- [ ] Target audience clearly defined
- [ ] Source material verified appropriate
- [ ] Themes reviewed for age-appropriateness
- [ ] No prohibited content categories present
- [ ] Educational value identified (if applicable)

### Script Review Checklist

- [ ] Language appropriate for target age
- [ ] No prohibited themes or content
- [ ] Conflict resolved positively
- [ ] Positive messaging present
- [ ] No harmful stereotypes

### Visual Content Checklist

- [ ] Art style appropriate for audience
- [ ] No scary or disturbing imagery
- [ ] Characters dressed appropriately
- [ ] Settings safe and friendly
- [ ] Color palette age-appropriate

### Audio Content Checklist

- [ ] Voice tone warm and friendly
- [ ] No startling sound effects
- [ ] Volume levels appropriate
- [ ] Music appropriate for content
- [ ] No inappropriate lyrics

---

## Escalation Protocol

### Level 1: Automatic Block

```
Trigger: Prohibited content detected
Action: Block content generation, alert Project Manager
Resolution: Revise and re-submit
```

### Level 2: Council Review

```
Trigger: Warning flag content
Action: Full council review with safety focus
Resolution: Approve with modifications or reject
```

### Level 3: Human Required

```
Trigger: Content safety uncertainty
Action: Pause all work, escalate to human
Resolution: Human decision required to proceed
```

---

## Agent Responsibilities

### All Agents

- Run content against prohibited list before output
- Flag any concerning themes immediately
- Prioritize child safety over creative goals
- Err on the side of caution

### Critic (Piggy) 🐷

- Primary safety reviewer
- Questions: "Is this safe for our youngest viewers?"
- Has veto power on safety concerns

### QA Reviewer

- Final safety check before export
- Runs full checklist
- Signs off on content safety

---

## Non-Compliance Consequences

1. **First Violation:** Content blocked, revision required
2. **Repeated Issues:** Agent review and recalibration
3. **Serious Violation:** Project suspension, human review
4. **Critical Violation:** Immediate stop, full audit

---

*🐷 "Piggy says: If in doubt, leave it out!"*
