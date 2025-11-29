# Get Started with PiggyTales

> **Where Piggy & Shroom tell amazing tales!**

---

**PiggyTales** is a Claude Code plugin for AI-powered content creation targeting **children and teenagers**. Create audiobooks, animations, and short videos with 22 specialized agents.

| **22 Agents** | **8 Skills** | **7 Rules** | **4 Phases** | **70+ Commands** |
|:-------------:|:------------:|:-----------:|:------------:|:----------------:|

---

## Quick Setup (2 minutes)

### Prerequisites

1. **Install Claude Code** - Follow [Anthropic's installation guide](https://docs.anthropic.com/en/docs/claude-code)
2. **Start Claude Code** - Run `claude` in your terminal

### Step 1: Install PiggyTales Plugin

In the Claude Code terminal, run these commands:

**Add PiggyTales to your plugins:**
```bash
/plugin install piggytales
```

**That's it!** PiggyTales is now installed and available.

---

### Step 2: Verify Installation

Check that PiggyTales commands are available:
```bash
/tale help
```

You should see commands like:
- `/tale new audiobook "Title"` - Create new audiobook
- `/tale quick test "Title"` - Quick draft/test
- `/tale status` - Check project status
- `/tale preset list` - List available presets

---

### Step 3: Create Your First Project

```bash
# Simple audiobook for children
/tale new audiobook "My First Story"
/tale audience children
/tale preset audiobook-simple
```

Or use quick start:
```bash
/tale quick audiobook "My First Story"
```

---

## Test Your Setup

### Test 1: Check Status
```bash
/tale status
```

**Expected:** "No active project" or current project status

### Test 2: Create Test Project
```bash
/tale quick test "Draft Story"
```

**Expected:**
- Project created in Express mode
- Script Writer agent activated
- Ready for content input

### Test 3: Set Audience
```bash
/tale audience children
```

**Expected:**
- Audience set to children (4-12)
- Content safety guidelines activated

---

## Common Commands

### Project Commands
```bash
/tale new audiobook "Title"     # Create audiobook project
/tale new animation "Title"     # Create animation project
/tale status                    # Check current status
/tale list                      # List all projects
```

### Workflow Commands
```bash
/tale next                      # Proceed to next phase
/tale back                      # Return to previous phase
/tale approve                   # Approve current phase
/tale council                   # Trigger council review
```

### Preset Commands
```bash
/tale preset audiobook-simple   # Simple audiobook preset
/tale preset audiobook-full     # Full audiobook preset
/tale preset animation-short    # Short animation preset
/tale preset animation-full     # Full animation preset
/tale preset quick-test         # Quick test preset
```

### Production Commands
```bash
/tale voice generate            # Generate voice files
/tale export all                # Export everything
```

### Shortcuts
```bash
/t s    # /tale status
/t n    # /tale next
/t a    # /tale approve
/t c    # /tale council
```

---

## How It Works

### 1. You Give a Command
```bash
/tale new audiobook "Vietnamese Fairy Tale"
```

### 2. PiggyTales Sets Up Project
- Creates project structure
- Loads appropriate agents
- Sets default workflow

### 3. Execute 4-Phase Workflow
```
Phase 1: Discovery (optional) → [Approval Gate]
Phase 2: Script → [Council Review] → [Approval Gate]
Phase 3: Asset (optional) → [Approval Gate]
Phase 4: Production → [Council Review] → [Approval Gate]
```

### 4. You Control Every Step
At each gate:
- Review deliverables
- Type `/tale approve` to continue
- Type `/tale revise "changes"` to adjust
- Type `/tale council` for AI review

---

## Target Audiences

| Audience | Age Range | Content Guidelines |
|----------|-----------|-------------------|
| `children` | 4-12 | Simple language, no scary content, educational |
| `teens` | 13-17 | Age-appropriate themes, positive messaging |
| `family` | All ages | Suitable for everyone |
| `young-adult` | 18-25 | Mature themes allowed |

---

## Content Types

### Audiobook
- Vietnamese voice narration via Vbee API
- Emotion-tagged scripts
- SFX integration
- Timing guides

### Animation
- Scene-based visual storytelling
- AI image/video prompts
- Character consistency
- Thumbnail design

### Short Video
- TikTok/YouTube Shorts format
- Viral-optimized hooks
- Platform compliance

### Music Video
- Audio-visual content
- Music integration
- Visual storytelling

---

## Workflow Modes

| Mode | Phases | Council | Speed |
|------|--------|---------|-------|
| **Full** | All | Deep review | Slow |
| **Standard** | All | Standard | Normal |
| **Lite** | Script + Production | Quick | Fast |
| **Express** | Script + Voice only | None | Fastest |

---

## Troubleshooting

### Commands not recognized?
Try being explicit:
```bash
Please execute: /tale new audiobook "Title"
```

### Need to reconfigure?
```bash
/tale reset config
```

### See all agents?
```bash
/tale agents
```

---

## Next Steps

1. **Read Documentation**
   - `CLAUDE.md` - Full command reference
   - `docs/` - Detailed guides

2. **Configure Voice API**
   - `VOICEOVER_SETUP.md` - Vbee API setup

3. **Explore Presets**
   - `/tale preset list` - See all presets

---

## Support

- **Commands:** `/tale help`
- **Documentation:** `docs/`
- **Examples:** `/tale help examples`

---

**Happy Storytelling!**

```bash
/tale new audiobook "Your Amazing Story"
```
