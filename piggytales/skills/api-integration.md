# Skill: API Integration

> **Used by:** Voice Producer, SFX Producer, Image/Video Producers

---

## Overview

API Integration skill enables seamless interaction with external generation services.

---

## Supported APIs

```yaml
voice:
  vbee:
    purpose: "Vietnamese voice generation"
    capabilities:
      - Text-to-speech
      - Emotion control
      - Multiple voices

audio:
  elevenlabs:
    purpose: "SFX generation"
    capabilities:
      - Custom sound generation
      - Sound effects

image:
  midjourney_api:
    purpose: "Image generation"
  dalle_api:
    purpose: "Image generation"
  stable_diffusion:
    purpose: "Image generation"

video:
  veo_3:
    purpose: "Video generation"
  runway:
    purpose: "Video generation"
```

---

## Integration Patterns

```yaml
patterns:
  request_handling:
    - Authentication
    - Rate limiting
    - Error handling
    - Retry logic

  response_processing:
    - File downloading
    - Quality verification
    - Naming convention
    - Organization

  optimization:
    - Batch requests
    - Caching
    - Cost tracking
```

---

## Error Handling

- Retry on timeout (3 attempts)
- Fallback options
- Clear error reporting
- Escalation when needed

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
