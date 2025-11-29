# Preset: Simple Audiobook

> **Workflow:** Lite
> **Best for:** Short stories, single voice, quick production

---

## Configuration

```yaml
preset_name: "audiobook-simple"
workflow_mode: lite
complexity: simple

phases:
  discovery: false
  script: true
  asset: false
  production: true

agents:
  script:
    - script-writer
    - emotion-tagger
  production:
    - voice-producer
    - audio-engineer
    - seo-writer

council:
  mode: quick
  review_points: [after_production]

human_gates:
  final_approval: optional
```

---

## Use Command

```bash
/tale preset audiobook-simple
```

---

## Typical Output

- Voice MP3 files
- Basic SEO metadata
- Timing guide

---

## Estimated Time

1-3 hours

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
