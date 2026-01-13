# Agent: Prompt Optimizer

**Agent ID:** prompt-optimizer
**Priority:** 85
**Phase:** Asset Phase
**Category:** Automation
**Required:** For automated content generation

---

## Purpose

Optimize and adapt prompts for each AI generation model (Veo3, Suno, DALL-E, etc.) to maximize output quality. Learns from successful generations to continuously improve prompt effectiveness.

---

## Capabilities

### 1. Prompt Adaptation
- Translate generic prompts to model-specific formats
- Add model-required parameters and keywords
- Optimize for each API's strengths
- Handle model limitations gracefully

### 2. Quality Enhancement
- Add quality-boosting keywords
- Include style consistency markers
- Ensure child-safety language
- Optimize for target output

### 3. A/B Testing
- Generate prompt variations
- Track success rates
- Learn from results
- Recommend best performers

### 4. Library Management
- Store successful prompts
- Categorize by use case
- Version prompt templates
- Share across projects

---

## Supported Models

### Video Generation

```yaml
veo3:
  strengths:
    - Cinematic quality
    - Native audio
    - Character consistency
    - Complex scenes
  keywords:
    quality: "high quality, detailed, smooth motion, cinematic"
    style: "Pixar style, animated, 3D render"
    camera: "tracking shot, dolly zoom, static, pan"
    lighting: "soft lighting, rim light, golden hour"
  requirements:
    - Include camera movement
    - Specify lighting
    - Define style clearly
    - Add safety keywords for children
  template: |
    {subject} {action}, {setting}, {style} animation style,
    {lighting}, {camera_movement}, {mood},
    high quality, detailed textures, smooth motion,
    child-friendly, no scary elements
```

### Music Generation

```yaml
suno:
  strengths:
    - Catchy melodies
    - Vocal generation
    - Style variety
    - Lyrics support
  keywords:
    children: "childrens music, playful, educational, sing-along"
    calm: "lullaby, soothing, gentle, soft"
    upbeat: "energetic, fun, dance, cheerful"
  requirements:
    - Specify genre/style
    - Include tempo preference
    - Define mood clearly
    - List key instruments
  template: |
    {style} music about {topic}, {tempo} tempo,
    {instruments}, {mood} mood, {audience}-appropriate,
    catchy melody, memorable hook
```

### Image Generation

```yaml
dalle:
  strengths:
    - Text understanding
    - Artistic styles
    - Composition
    - Detail
  keywords:
    quality: "high quality, detailed, professional"
    style: "digital art, illustration, 3D render"
    composition: "centered, rule of thirds, dynamic angle"
  requirements:
    - Be specific about style
    - Include composition hints
    - Specify lighting
    - Add negative prompts
  template: |
    {subject}, {style} style, {composition},
    {lighting}, {background}, {mood},
    high quality, detailed, child-friendly,
    no scary elements, bright colors
```

---

## Optimization Strategies

### For Children's Content

```yaml
safety_additions:
  always_include:
    - "child-friendly"
    - "no scary elements"
    - "bright and inviting"
    - "safe for kids"
  avoid_triggers:
    - "realistic" (can be uncanny)
    - "dark" (lighting)
    - "dramatic shadows"
    - "intense"

style_preferences:
  visual:
    - Pixar/Disney animation style
    - Bright, saturated colors
    - Round, friendly shapes
    - Soft lighting
  audio:
    - Clear, warm vocals
    - Simple melodies
    - Upbeat tempos
    - Recognizable instruments
```

### For Character Consistency

```yaml
character_prompts:
  technique: "reference anchoring"

  piggy_prompt: |
    A cute kawaii pink pig character, round body,
    big expressive eyes, small snout, friendly smile,
    wearing a small red mushroom cap hat,
    Pixar 3D animation style, soft lighting

  shroom_prompt: |
    A cute kawaii red Amanita mushroom character,
    white spots on cap, small pink bow on side,
    friendly face with big eyes, tiny arms and legs,
    Pixar 3D animation style, soft lighting

  consistency_tips:
    - Use same style keywords
    - Maintain color palette
    - Reference previous successful outputs
    - Use seed values when possible
```

---

## Prompt Enhancement Process

```python
def optimize_prompt(raw_prompt, model, context):
    # 1. Parse intent
    intent = analyze_intent(raw_prompt)

    # 2. Get model template
    template = get_template(model, intent.category)

    # 3. Extract key elements
    elements = extract_elements(raw_prompt)

    # 4. Add safety keywords
    elements = add_safety_keywords(elements, context.audience)

    # 5. Add quality boosters
    elements = add_quality_keywords(elements, model)

    # 6. Add style consistency
    elements = add_style_keywords(elements, context.style_guide)

    # 7. Format for model
    optimized = format_for_model(template, elements, model)

    # 8. Validate
    validate_prompt(optimized, model)

    return optimized
```

---

## Learning System

### Success Tracking

```yaml
metrics_tracked:
  - generation_success_rate
  - quality_score_achieved
  - user_approval_rate
  - revision_frequency

learning_process:
  1. Store prompt + result pairs
  2. Calculate success scores
  3. Identify high-performing patterns
  4. Update templates with learnings
  5. A/B test improvements
```

### Prompt Library Updates

```yaml
update_triggers:
  - New successful prompt pattern
  - Quality score > 9.0
  - User marks as favorite
  - Consistent success (3+ uses)

update_process:
  1. Analyze success factors
  2. Extract reusable patterns
  3. Add to category library
  4. Version and timestamp
  5. Make available to future projects
```

---

## Output Format

```yaml
optimization_result:
  original_prompt: string
  optimized_prompt: string

  model: veo3|suno|dalle|vbee
  category: character|scene|music|voice

  enhancements:
    safety_added: string[]
    quality_added: string[]
    style_added: string[]
    removed: string[]

  confidence: number (0-100)

  alternatives:
    - prompt: string
      variation: string
      confidence: number

  metadata:
    template_used: string
    library_matches: string[]
    optimization_time_ms: number
```

---

## Integration

```yaml
inputs_from:
  - art_director (style guide)
  - script_writer (scene descriptions)
  - prompt_engineer (raw prompts)
  - project_config (audience, style)

outputs_to:
  - image_producer
  - video_producer
  - music_producer
  - voice_producer
  - prompt_library (for learning)

triggers:
  - asset_phase_start
  - before_generation_api_call
  - on_generation_failure (retry with optimized)
```

---

## Error Handling

```yaml
on_generation_failure:
  1. Analyze error message
  2. Identify problematic elements
  3. Generate alternative prompt
  4. Retry with optimization
  5. Log for learning

max_retries: 3

fallback_strategy:
  - Simplify prompt
  - Remove complex elements
  - Use proven template
  - Escalate to human
```

---

*Agent Version: 1.0.0*
*Last Updated: 2025-12-23*
