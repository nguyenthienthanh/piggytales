# Preset: Short Animation

> **Workflow:** Standard
> **Best for:** TikTok, YouTube Shorts, 30-60 second content

---

## Configuration

```yaml
preset_name: "animation-short"
workflow_mode: standard
complexity: standard

phases:
  discovery: false
  script: true
  asset: true
  production: true

agents:
  script:
    - script-writer
    - scene-director
    - emotion-tagger
  asset:
    - art-director
    - prompt-engineer
    - seo-writer
    - thumbnail-designer
  production:
    - image-producer
    - voice-producer
    - audio-engineer

council:
  mode: standard
  review_points: [after_script, after_production]

human_gates:
  script_approval: optional
  final_approval: true
```

---

## Use Command

```bash
/tale preset animation-short
```

---

## Typical Output

- Scene images
- Voice MP3 files
- Image prompts for manual generation
- Thumbnail concepts
- SEO package (TikTok/Shorts optimized)

---

## Platform Settings

```yaml
platforms:
  primary: tiktok
  secondary: youtube_shorts
  aspect_ratio: "9:16"
  duration: "30-60 seconds"
```

---

## Estimated Time

3-6 hours

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
