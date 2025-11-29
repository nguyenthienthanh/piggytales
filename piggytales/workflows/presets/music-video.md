# Preset: Music Video

> **Workflow:** Standard
> **Best for:** Audio-visual music content, lyric videos

---

## Configuration

```yaml
preset_name: "music-video"
workflow_mode: standard
complexity: standard

phases:
  discovery: false
  script: true
  asset: true
  production: true

agents:
  script:
    - script-writer  # Lyrics/concept
    - scene-director
  asset:
    - art-director
    - prompt-engineer
    - seo-writer
    - thumbnail-designer
  production:
    - image-producer
    - video-producer
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
/tale preset music-video
```

---

## Typical Output

- Lyrics/concept script
- Scene breakdown
- Style guide
- Image prompts per scene
- Video prompts
- Generated images
- Generated videos (or prompts)
- Timing guide for audio sync
- SEO package
- Thumbnails

---

## Notes

- Music/audio must be provided separately
- Focus is on visual storytelling
- Audio engineer handles sync, not generation

---

## Estimated Time

4-8 hours

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
