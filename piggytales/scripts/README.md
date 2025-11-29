# PiggyTales Scripts

> **Shell scripts for automation and utilities**

---

## Available Scripts

| Script | Purpose |
|--------|---------|
| `voice-generate.sh` | Batch voice generation |
| `content-safety.sh` | Content safety check |
| `export-package.sh` | Package exports |
| `api-check.sh` | Verify API connectivity |

---

## Usage

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run a script
./scripts/voice-generate.sh --project "my-project"
```

---

## Environment Variables

Scripts expect these environment variables:

```bash
# Required for voice generation
VBEE_API_KEY="your-api-key"

# Optional
ELEVENLABS_API_KEY="your-api-key"
```

---

*PiggyTales v1.0.0*
