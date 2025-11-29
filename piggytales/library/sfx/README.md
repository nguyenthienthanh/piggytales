# PiggyTales SFX Library

This directory contains the sound effects library for PiggyTales content creation.

## Structure

```
sfx/
├── catalog.yaml      # Sound catalog and metadata
├── ambient/          # Background atmosphere sounds
├── action/           # Action and movement sounds
├── emotional/        # Emotional accent sounds
├── character/        # Character expression sounds
└── transition/       # Scene transition sounds
```

## Usage

1. Check `catalog.yaml` for available sounds
2. Reference sounds by ID (e.g., `amb-forest-01`)
3. SFX Producer will match requests to library
4. If no match found, ElevenLabs generation is used

## Child Safety

All sounds in this library are:
- Child-safe and appropriate
- Non-startling
- Pleasant and friendly

## Adding New Sounds

1. Verify sound is child-appropriate
2. Add to correct category folder
3. Update `catalog.yaml` with metadata
4. Use consistent naming convention

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
