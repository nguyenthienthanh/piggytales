# Preset: Full Animation

> **Workflow:** Full
> **Best for:** Complete animations, YouTube videos, series content

---

## Configuration

```yaml
preset_name: "animation-full"
workflow_mode: full
complexity: complex

phases:
  discovery: true
  script: true
  asset: true
  production: true

agents:
  discovery:
    - content-scout
    - trend-analyst
    - legal-checker
    - audience-researcher
  script:
    - script-writer
    - scene-director
    - emotion-tagger
    - sfx-planner
  asset:
    - art-director
    - prompt-engineer
    - seo-writer
    - thumbnail-designer
  production:
    - image-producer
    - video-producer
    - voice-producer
    - sfx-producer
    - audio-engineer

council:
  mode: deep
  review_points: [after_discovery, after_script, after_asset, after_production]

human_gates:
  discovery_approval: true
  script_approval: true
  asset_approval: true
  final_approval: true
```

---

## Use Command

```bash
/tale preset animation-full
```

---

## Typical Output

- Research report
- Full script with scene breakdown
- Character sheets
- Style guide
- All image prompts
- Video prompts
- Generated images
- Generated videos (or prompts)
- Voice files
- SFX files
- Merged audio
- Complete SEO package
- Thumbnails

---

## Platform Settings

```yaml
platforms:
  primary: youtube
  aspect_ratio: "16:9"
  duration: "2-10 minutes"
```

---

## Estimated Time

1-2 days

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
