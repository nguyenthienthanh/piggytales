# Skill: Animation Scripting

> **Used by:** Script Writer, Scene Director, Emotion Tagger, Prompt Engineer

---

## Overview

Animation Scripting skill enables the creation of production-ready animation scripts that include visual directions, character actions, expression cues, dialogue synchronization, and timing information. Scripts are designed to be directly translatable to animated content.

---

## Core Principles

```yaml
animation_scripting_principles:
  visual_storytelling:
    - Story is told through visuals first
    - Dialogue supports and enhances visuals
    - Every scene must be animatable
    - Actions speak louder than words

  production_ready:
    - Clear enough for animators to execute
    - Timing specified for each element
    - Expression changes documented
    - Camera movements planned

  audio_visual_sync:
    - Voice and animation synchronized
    - SFX timed to actions
    - Music cues marked
    - Lip-sync priorities identified

  language_consistency:
    - Technical directions in English
    - Dialogue and narration in Vietnamese
    - Clear separation maintained
```

---

## Script Element Types

### 1. Visual Elements (English)

```yaml
visual_elements:
  scene_header:
    format: "SCENE [NUMBER]: [Title]"
    example: "SCENE 003: The Discovery"

  location_description:
    format: "**Location:** [Description]"
    example: "**Location:** Dense forest clearing, morning mist"

  visual_direction:
    format: "[VISUAL] [Description]"
    example: "[VISUAL] Wide shot of village at dawn, smoke rising from chimneys"

  camera_instruction:
    format: "[CAMERA] [Type] - [Movement]"
    example: "[CAMERA] Medium shot - Slow zoom to close-up"

  action_description:
    format: "[ACTION] [Character] [Action description]"
    example: "[ACTION] Lan reaches out tentatively toward the glowing orb"

  transition:
    format: "[TRANSITION] [Type]"
    example: "[TRANSITION] Dissolve to next scene"
```

### 2. Character Elements (Mixed)

```yaml
character_elements:
  character_tag:
    format: "**[CHARACTER NAME]** (emotion: [emotion], intensity: [level])"
    example: "**[LAN]** (emotion: ngạc nhiên, intensity: cao)"

  expression:
    format: "[Expression: description]"
    example: "[Expression: eyes wide, mouth open in surprise]"
    note: "Can use Vietnamese for expression descriptions"

  gesture:
    format: "[Gesture: description]"
    example: "[Gesture: steps back, hands raised defensively]"

  dialogue:
    format: '"Vietnamese dialogue text"'
    example: '"Ôi! Đây là gì thế này?"'
    note: "Always in Vietnamese"
```

### 3. Audio Elements (English + Vietnamese)

```yaml
audio_elements:
  narrator:
    format: |
      **[NARRATOR]** (tone: [description])
      "Vietnamese narration text"
      [Voice: direction]
    example: |
      **[NARRATOR]** (tone: warm, storytelling)
      "Ngày xửa ngày xưa, trong một khu rừng xa xôi..."
      [Voice: gentle pace, inviting]

  sfx:
    format: "[SFX] [Description] - [timing]"
    example: "[SFX] Magical chime sound - 0.5s before dialogue"

  music:
    format: "[MUSIC] [Description] - [timing]"
    example: "[MUSIC] Soft tension building - start at scene opening"
```

---

## Scene Structure Template

```markdown
## SCENE [NUMBER]: [Title]

**Location:** [Setting description]
**Time:** [Time of day]
**Duration:** [X seconds]
**Characters:** [List]
**Mood:** [Emotional tone]

---

### VISUAL SETUP

| Element | Description |
|---------|-------------|
| Camera | [Initial shot type and position] |
| Background | [BG description] |
| Lighting | [Lighting mood] |
| Props | [List of props in scene] |

---

### BEAT 1: [Beat description]

**[TRANSITION IN]** [Type]

**[VISUAL]** [Scene establishment]

**[NARRATOR]** (tone: [tone])
"Vietnamese narration if any"
[Voice: direction]

---

### BEAT 2: [Beat description]

**[ACTION]** [Character action description]

**[CHARACTER]** (emotion: [emotion], intensity: [level])
[Expression: description]
[Gesture: description]
"Vietnamese dialogue"
[Voice: direction]
[Animation: special cue if needed]

**[SFX]** [Sound description] - [timing]

---

### BEAT 3: [Beat description]

[Continue pattern...]

---

**[TRANSITION OUT]** [Type]

---

### Scene Notes

- [Animation note 1]
- [Timing note 2]
- [Special requirement 3]
```

---

## Dialogue-Action Synchronization

```yaml
sync_principles:
  timing_rules:
    expression_lead: "Expression changes 0.1-0.3s BEFORE dialogue"
    gesture_with: "Gestures happen DURING key words"
    reaction_delay: "Reactions 0.2-0.5s AFTER trigger"

  sync_example:
    timeline:
      - "0.0s: [Expression changes to surprised]"
      - "0.2s: [SFX: magical sound]"
      - "0.3s: [CHARACTER starts dialogue]"
      - "0.5s: [Gesture: hands raise] (on word 'này')"
      - "1.2s: [Hold expression]"
      - "1.5s: [Transition to next emotion]"
```

---

## Character Voice Profiles

```yaml
voice_profile_template:
  character_name: "[Name]"
  voice_type: "[Child/Adult/Elder] [Male/Female]"
  pitch: "[High/Medium/Low]"
  speed: "[Fast/Normal/Slow]"
  energy: "[High/Medium/Low]"
  emotion_range: "[List of typical emotions]"
  verbal_quirks: "[Catchphrases, speech habits]"
  sample_lines:
    happy: '"Sample happy line in Vietnamese"'
    sad: '"Sample sad line in Vietnamese"'
    surprised: '"Sample surprised line in Vietnamese"'
```

---

## Expression Reference Library

### Basic Expressions

```yaml
expressions:
  happy:
    eyes: "Bright, crescent-shaped when smiling"
    eyebrows: "Relaxed, slightly raised"
    mouth: "Wide smile, teeth may show"
    body: "Open posture, bouncy movement"
    vietnamese: "vui vẻ, hạnh phúc"

  sad:
    eyes: "Downcast, droopy lids"
    eyebrows: "Inner corners raised"
    mouth: "Slight frown, corners down"
    body: "Slouched, closed in"
    vietnamese: "buồn bã"

  angry:
    eyes: "Narrowed, intense"
    eyebrows: "Furrowed, V-shape"
    mouth: "Tight, clenched"
    body: "Tense, aggressive stance"
    vietnamese: "tức giận"

  scared:
    eyes: "Wide open, pupils small"
    eyebrows: "Raised high"
    mouth: "Open, trembling"
    body: "Shrunk, protective"
    vietnamese: "sợ hãi"

  surprised:
    eyes: "Wide open, raised brows"
    eyebrows: "High, arched"
    mouth: "Open 'O' shape"
    body: "Jumped back, hands up"
    vietnamese: "ngạc nhiên"

  curious:
    eyes: "Focused, one brow raised"
    eyebrows: "One raised"
    mouth: "Slight smile or neutral"
    body: "Leaning forward, head tilted"
    vietnamese: "tò mò"

  thinking:
    eyes: "Looking up or to side"
    eyebrows: "One raised or both neutral"
    mouth: "Pursed or slightly open"
    body: "Hand on chin or crossed arms"
    vietnamese: "suy nghĩ"

  determined:
    eyes: "Focused, narrowed slightly"
    eyebrows: "Lowered, determined"
    mouth: "Firm, closed"
    body: "Strong stance, fists clenched"
    vietnamese: "quyết tâm"
```

### Expression Transitions

```yaml
transition_timing:
  snap: "0.1-0.2s for instant change (shock, surprise)"
  quick: "0.3-0.5s for fast reaction"
  normal: "0.5-1.0s for natural transition"
  slow: "1.0-2.0s for gradual change"
  hold: "2.0s+ for emphasis"
```

---

## Camera Direction Vocabulary

```yaml
shot_types:
  establishing: "Wide view showing full environment context"
  wide: "Full body + environment"
  full: "Full body, minimal environment"
  medium: "Waist up"
  medium_close: "Chest up"
  close_up: "Face/shoulders"
  extreme_close: "Single feature (eye, hand)"
  over_shoulder: "POV conversation"
  two_shot: "Two characters in frame"
  group: "Multiple characters"

camera_movements:
  static: "No movement"
  pan: "Horizontal rotation"
  tilt: "Vertical rotation"
  zoom_in: "Move closer (lens)"
  zoom_out: "Pull back (lens)"
  dolly_in: "Camera moves toward"
  dolly_out: "Camera moves away"
  truck: "Camera moves parallel"
  crane: "Camera rises/lowers"
  follow: "Camera tracks character"
  handheld: "Slight shake for realism"
```

---

## Timing Guidelines

```yaml
timing_guidelines:
  dialogue:
    vietnamese_pace: "~3-4 syllables per second for natural speech"
    children_pace: "~2-3 syllables per second (slower)"
    emphasis_hold: "0.3-0.5s extra on key words"

  expressions:
    anticipation: "2-4 frames before main expression"
    main_expression: "6-12 frames for change"
    settle: "2-4 frames overshoot and settle"
    hold_for_reading: "12-24 frames minimum"

  actions:
    walk_cycle: "~1 second per cycle"
    gesture: "0.5-1.5 seconds"
    full_body_action: "1-3 seconds"
    reaction: "0.2-0.5 second delay"

  scene_pacing:
    quick_scene: "5-10 seconds"
    normal_scene: "15-30 seconds"
    extended_scene: "30-60 seconds"
```

---

## Vietnamese Dialogue Guidelines

```yaml
vietnamese_dialogue:
  natural_speech:
    - Use contractions and casual forms
    - Include filler words where natural
    - Match character age and personality
    - Regional neutrality (standard Vietnamese)

  pronunciation_clarity:
    - Avoid tongue twisters
    - Clear vowel sounds for lip-sync
    - Mark emphasis words

  age_appropriate:
    children_4_7:
      words_per_sentence: "5-8"
      vocabulary: "Simple, concrete"
      example: '"Ôi! Một con bướm!"'

    children_8_12:
      words_per_sentence: "8-15"
      vocabulary: "Moderate"
      example: '"Tớ nghĩ mình nên đi theo con đường này."'

    teenagers:
      words_per_sentence: "Variable"
      vocabulary: "Contemporary"
      example: '"Cậu không hiểu đâu. Mọi thứ phức tạp lắm."'
```

---

## Quality Checklist

```yaml
script_quality_checklist:
  visual_completeness:
    - [ ] Every scene has location description
    - [ ] Camera shots specified
    - [ ] Character positions clear
    - [ ] Transitions noted

  dialogue_quality:
    - [ ] All dialogue in Vietnamese
    - [ ] Age-appropriate language
    - [ ] Natural speech patterns
    - [ ] Emotions tagged

  animation_readiness:
    - [ ] Actions are animatable
    - [ ] Timing specified
    - [ ] Expression changes noted
    - [ ] Sync points marked

  production_notes:
    - [ ] SFX cues included
    - [ ] Music cues noted
    - [ ] Special requirements listed
    - [ ] Lip-sync priorities marked
```

---

## Integration with Other Skills

```yaml
skill_integration:
  from_creative_writing:
    - Story structure
    - Character development
    - Dialogue writing
    - Hook creation

  to_audio_production:
    - Voice direction notes
    - SFX placement guide
    - Music cue markers
    - Timing information

  to_visual_design:
    - Character expression references
    - Scene composition notes
    - Mood guidelines
    - Color/lighting suggestions

  to_prompt_crafting:
    - Scene descriptions for image generation
    - Character pose descriptions
    - Background requirements
    - Mood references
```

---

*🎬 "Scripts that animate themselves!"*
