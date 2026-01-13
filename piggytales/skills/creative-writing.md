# Skill: Creative Writing

> **Used by:** Script Writer, Emotion Tagger, Scene Director, Council agents

---

## Overview

Creative Writing skill enables compelling storytelling for animation, dialogue creation, visual narrative development, and character voice design. Focused on creating scripts that translate directly to animated content with synchronized narration and character voices.

---

## Capabilities

- Animation story structure development
- Character voice creation (multiple distinct voices)
- Age-appropriate dialogue in Vietnamese
- Visual hook writing
- Emotional narrative with expression cues
- Pacing management for animation
- Scene-based narrative design
- Character action writing

---

## Animation Storytelling Techniques

```yaml
storytelling:
  three_act_for_animation:
    act_1_setup:
      - Visual establishment of world
      - Character introduction with action
      - Hook within first 3-5 seconds
      - Inciting incident with visual impact
    act_2_confrontation:
      - Rising action with visual beats
      - Character expression arcs
      - Multiple scene locations
      - Emotional peaks and valleys
    act_3_resolution:
      - Climax with strongest visual moment
      - Character transformation shown visually
      - Satisfying conclusion
      - Emotional payoff

  visual_narrative:
    - Show don't tell (when possible)
    - Action drives dialogue
    - Expression changes tell story
    - Environment reflects emotion

  character_arcs_for_animation:
    - Clear visual transformation
    - Expression evolution throughout
    - Gesture patterns that develop
    - Voice tone progression
```

---

## Visual Hooks for Animation

```yaml
hooks:
  action_visual_hook:
    description: "Start with dynamic action"
    example:
      visual: "Dragon bursts from mountain peak"
      audio: "Thundering roar + dramatic music"
      duration: "3 seconds"

  mystery_visual_hook:
    description: "Intrigue through visual mystery"
    example:
      visual: "Glowing object in dark forest"
      audio: "Whispered question from narrator"
      duration: "4 seconds"

  character_visual_hook:
    description: "Compelling character moment"
    example:
      visual: "Hero strikes iconic pose"
      audio: "Confident character intro line"
      duration: "3 seconds"

  emotion_visual_hook:
    description: "Strong emotional moment"
    example:
      visual: "Close-up on character's tearful eyes"
      audio: "Soft narrator line about loneliness"
      duration: "4 seconds"
```

---

## Dialogue Writing for Animation

```yaml
dialogue_principles:
  natural_conversation:
    - Dialogue sounds spoken, not written
    - Contractions and casual speech
    - Character-specific speech patterns
    - Reactions and interruptions

  animation_friendly:
    - Short enough for lip-sync
    - Clear mouth shapes (open vowels)
    - Pauses built into dialogue
    - Emphasis words marked

  vietnamese_dialogue:
    - Natural Vietnamese speech patterns
    - Age-appropriate vocabulary
    - Regional neutrality (unless specified)
    - Clear pronunciation for TTS

character_voice_design:
  elements:
    - Pitch range (cao/trung/thấp)
    - Speaking speed (nhanh/vừa/chậm)
    - Energy level (năng động/bình thường/trầm)
    - Verbal quirks (catchphrases, habits)
    - Emotional range

  example_profiles:
    hero_child:
      pitch: "Medium-high"
      speed: "Moderate with excitement bursts"
      energy: "High"
      quirk: "Kết thúc câu bằng 'nhỉ?'"

    wise_elder:
      pitch: "Low"
      speed: "Slow, deliberate"
      energy: "Calm"
      quirk: "Hay dùng tục ngữ"
```

---

## Narrator Voice Writing

```yaml
narrator_styles:
  warm_storyteller:
    tone: "Friendly, inviting"
    pacing: "Moderate, with pauses for effect"
    vietnamese: "Ngày xửa ngày xưa, ở một vương quốc xa xôi..."
    use_for: "Children's content, fairy tales"

  dramatic_narrator:
    tone: "Intense, building tension"
    pacing: "Varied - slow for tension, fast for action"
    vietnamese: "Và trong khoảnh khắc đó, mọi thứ thay đổi..."
    use_for: "Adventure, action sequences"

  educational_guide:
    tone: "Clear, encouraging"
    pacing: "Steady, with emphasis on key points"
    vietnamese: "Các bạn có biết không? Điều này rất thú vị đấy!"
    use_for: "Educational content"

  mysterious_narrator:
    tone: "Soft, intriguing"
    pacing: "Slow, whispered moments"
    vietnamese: "Nhưng có điều gì đó kỳ lạ đang chờ đợi..."
    use_for: "Mystery, discovery moments"
```

---

## Age Adaptations for Animation

```yaml
children_4_7:
  dialogue:
    - Simple vocabulary (từ đơn giản)
    - Short sentences (5-8 từ)
    - Concrete concepts
    - Repetition for emphasis
  visuals:
    - Clear, simple actions
    - Exaggerated expressions
    - Bright, friendly characters
    - Slow pacing
  example: |
    [LAN] "Ôi! Một con bướm! Đẹp quá!"
    [Expression: mắt sáng rỡ, miệng cười to]

children_8_12:
  dialogue:
    - Moderate complexity
    - More nuanced emotions
    - Some abstract concepts explained
    - Contemporary references
  visuals:
    - More subtle expressions
    - Complex character interactions
    - Varied pacing
    - Action sequences
  example: |
    [MINH] "Tớ nghĩ là... có lẽ chúng ta nên thử cách khác."
    [Expression: suy nghĩ, lông mày nhíu nhẹ]

teenagers:
  dialogue:
    - Complex narratives
    - Sophisticated themes
    - Contemporary language
    - Emotional depth
  visuals:
    - Nuanced expressions
    - Complex relationships
    - Fast-paced action
    - Subtle visual storytelling
  example: |
    [LINH] "Đôi khi tớ tự hỏi liệu mình có đang đi đúng hướng không."
    [Expression: nhìn xa xăm, nét mặt trầm tư]
```

---

## Scene Writing for Animation

```yaml
scene_writing_principles:
  visual_first:
    - Start with what viewers SEE
    - Then add what they HEAR
    - Dialogue supports visuals

  action_description:
    - Clear, animatable actions
    - Character positions specified
    - Movement paths described
    - Timing suggested

  example_scene:
    visual: |
      Wide shot: Forest clearing, morning light filtering through trees
      LAN enters from left, looking around curiously
      Spots glowing object near old tree stump
    action: |
      [ACTION] Lan walks slowly into frame, head turning left and right
      [ACTION] Stops suddenly, eyes widen
      [ACTION] Points toward the glowing object
    dialogue: |
      [LAN] (emotion: tò mò → ngạc nhiên)
      "Hình như có gì đó... Ôi!"
```

---

## Language Consistency Rules

```yaml
language_rules:
  english_elements:
    - Scene headers and titles
    - Technical directions
    - Camera instructions
    - Animation notes
    - Expression tags
    - Action descriptions

  vietnamese_elements:
    - All dialogue lines
    - Narrator text
    - Character internal thoughts
    - On-screen text/titles in final product
    - Emotion words (vui, buồn, sợ, etc.)

  bilingual_example:
    scene_header: "SCENE 003: The Discovery (English)"
    action: "[ACTION] Character reaches for the key (English)"
    dialogue: '"Đây là gì thế này?" (Vietnamese)'
    narrator: '"Và đó là lúc cuộc phiêu lưu bắt đầu..." (Vietnamese)'
```

---

*🎬 "Where Piggy & Shroom create animated tales!"*
