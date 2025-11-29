# Preset: Quick Test

> **Workflow:** Express
> **Best for:** Drafts, tests, rapid prototyping

---

## Configuration

```yaml
preset_name: "quick-test"
workflow_mode: express
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

council:
  mode: none

human_gates: none
```

---

## Use Command

```bash
/tale preset quick-test
# or
/tale quick test "Title"
```

---

## Typical Output

- Draft script
- Draft voice file

---

## Limitations

- No SEO
- No images/videos
- No SFX
- Not production-ready
- Output marked as DRAFT

---

## Estimated Time

30-60 minutes

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
