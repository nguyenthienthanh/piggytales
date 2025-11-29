# Preset: Full Audiobook

> **Workflow:** Standard
> **Best for:** Complete audiobooks with research, SFX, full SEO

---

## Configuration

```yaml
preset_name: "audiobook-full"
workflow_mode: standard
complexity: standard

phases:
  discovery: true
  script: true
  asset: true  # SEO only
  production: true

agents:
  discovery:
    - content-scout
    - legal-checker
    - audience-researcher
  script:
    - script-writer
    - emotion-tagger
    - sfx-planner
  asset:
    - seo-writer
  production:
    - voice-producer
    - sfx-producer
    - audio-engineer

council:
  mode: standard
  review_points: [after_script, after_production]

human_gates:
  script_approval: true
  final_approval: true
```

---

## Use Command

```bash
/tale preset audiobook-full
```

---

## Typical Output

- Multiple voice MP3 files (chapters)
- SFX files
- Merged audio files
- Complete SEO package
- Timing guide

---

## Estimated Time

4-8 hours

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
