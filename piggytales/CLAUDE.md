# PiggyTales - AI Content Creation Team for Children & Teens

> **Version:** 2.0
> **Type:** Claude Code Plugin (CCPM - Claude Code Project Management)
> **Tagline:** "Where Piggy & Shroom tell amazing tales"
> **MCP Integrations:** Supabase, Context7, Playwright, YouTube

---

## Overview

PiggyTales is an AI agent team for automated **animation-ready content creation** targeting **children and teenagers**. All scripts are designed to be directly animatable with synchronized narration and character voices.

### Primary Output: Animation Scripts
Scripts include:
- **Visual directions** (English) - Camera, actions, expressions, transitions
- **Vietnamese dialogue** - Character voices and narrator lines
- **Timing cues** - Animation sync points, expression changes
- **Production notes** - SFX, music, special effects

### Content Types
- **Animated Stories** - Full animation scripts with visual direction
- **Audiobooks** - Voice narration scripts with emotion tags
- **Short Videos** - TikTok/YouTube Shorts animation scripts
- **Music Videos** - Audio-visual content scripts

### Language Standard
- **Technical directions**: English (for production team)
- **Dialogue/Narration**: Vietnamese (for audience)

### Mascots

- **Piggy** 🐷: Cute pink kawaii pig - critical thinking, quality control
- **Shroom** 🍄: Cute red mushroom with white spots - creativity, optimism

---

## Quick Start

```bash
# Create a simple audiobook
/tale new audiobook "Story Title"
/tale audience children
/tale preset audiobook-simple

# Create full animation
/tale new animation "Adventure"
/tale audience family
/tale preset animation-full

# Quick test/draft
/tale quick test "Draft Story"
```

---

## Target Audiences

```yaml
audiences:
  children:
    age_range: "4-12"
    requirements:
      - Simple, clear language
      - No scary or violent content
      - Educational value preferred
      - Bright, friendly visuals
      - Positive role models

  teenagers:
    age_range: "13-17"
    requirements:
      - Age-appropriate themes
      - No explicit content
      - Positive messaging
      - Relatable characters

  family:
    age_range: "All ages"
    requirements:
      - Content suitable for all
      - Multi-generational appeal

  young-adult:
    age_range: "18-25"
    requirements:
      - Mature themes allowed
      - Complex narratives
```

---

## Agent Architecture (22 Agents)

### Discovery Phase (4 agents)
| Agent | Purpose | Required |
|-------|---------|----------|
| **Content Scout** | Find content ideas, public domain sources | No |
| **Trend Analyst** | Analyze viral patterns | No |
| **Legal Checker** | Copyright verification | **YES** |
| **Audience Researcher** | Target audience research | No |

### Script Phase (4 agents)
| Agent | Purpose | Required |
|-------|---------|----------|
| **Script Writer** | Write animation-ready scripts with visual directions | **YES** |
| **Scene Director** | Detailed scene breakdown, timing, character blocking | **YES** (animation) |
| **Emotion Tagger** | Voice emotions + character expressions for animation | **YES** |
| **SFX Planner** | Sound effects planning and timing | No |

### Asset Phase (4 agents)
| Agent | Purpose | Required |
|-------|---------|----------|
| **Art Director** | Style guide | No (audiobook) |
| **Prompt Engineer** | AI prompts | No (audiobook) |
| **SEO Writer** | Metadata | **YES** |
| **Thumbnail Designer** | Thumbnails | No |

### Production Phase (5 agents)
| Agent | Purpose | Required |
|-------|---------|----------|
| **Image Producer** | Generate/export image prompts | No |
| **Video Producer** | Generate/export video prompts | No |
| **Voice Producer** | Generate voice via Vbee | **YES** |
| **SFX Producer** | Source/generate SFX | No |
| **Audio Engineer** | Merge or create timing guide | Partial |

### Council (3 agents)
| Agent | Persona | Purpose | Required |
|-------|---------|---------|----------|
| **Critic** | 🐷 Piggy | Find weaknesses | Optional |
| **Optimist** | 🍄 Shroom | Find strengths | Optional |
| **Analyst** | 🐷🍄 Both | Viral scoring | **YES** |

### Management (2 agents)
| Agent | Purpose | Required |
|-------|---------|----------|
| **Project Manager** | Orchestrate workflow | **YES** |
| **QA Reviewer** | Quality checks | **YES** |

---

## Workflow Modes

### Full Mode 🐢
- All phases, all reviews
- Council review after each phase
- Human approval at all gates
- Best for: Complex animation, series, high-stakes content

### Standard Mode 🚶
- Discovery (optional) → Script → Asset → Production
- Council review after Script and Production
- Human approval optional
- Best for: Regular audiobooks, standard animations

### Lite Mode 🏃
- Script → Production
- Quick council review (Analyst only)
- Minimal human gates
- Best for: Simple audiobooks, quick content

### Express Mode ⚡
- Script → Voice Production only
- No council review (QA only)
- No human gates
- Best for: Drafts, tests, rapid prototyping

### Custom Mode 🔧
- Select phases to include
- Select agents to use
- Configure review points
- Best for: Unique requirements

---

## Complexity Levels

```yaml
simple:
  council_reviews: 1
  human_gates: 0-1
  skip_agents: [trend-analyst, scene-director, art-director, prompt-engineer, image-producer, video-producer]

standard:
  council_reviews: 2
  human_gates: 1-2
  skip_agents: [trend-analyst]

complex:
  council_reviews: 4
  human_gates: 3-4
  skip_agents: []
  extra_iterations: true
```

---

## Content Type Presets

| Preset | Workflow | Agents |
|--------|----------|--------|
| `audiobook-simple` | Lite | script-writer, emotion-tagger, voice-producer, audio-engineer, seo-writer |
| `audiobook-full` | Standard | All discovery + script + voice production agents |
| `animation-short` | Standard | Script, asset, and production agents for short form |
| `animation-full` | Full | All 22 agents |
| `music-video` | Standard | Script, visual, and audio agents |
| `quick-test` | Express | script-writer, emotion-tagger, voice-producer |

---

## Commands Reference

### Project Commands
```bash
/tale new audiobook|animation|short|music-video "Title"
/tale status
/tale list
/tale open|archive|clone|delete <project-id>
/tale info|history|timeline
```

### Phase Commands
```bash
/tale phase discovery|script|asset|production
/tale next                    # Proceed to next phase
/tale back                    # Return to previous phase
/tale jump <phase>            # Jump to any phase
/tale skip <phase>            # Skip a phase
/tale unskip <phase>          # Re-enable skipped phase
/tale redo [<phase>]          # Redo current/specific phase
/tale phases                  # Show all phases and status
/tale progress                # Show progress percentage
```

### Workflow Commands
```bash
/tale workflow full|standard|lite|express|custom
/tale workflow save|load|list|show|reset "name"
/tale complexity simple|standard|complex|auto
/tale preset audiobook-simple|audiobook-full|animation-short|animation-full|music-video|quick-test
/tale preset list
```

### Review Commands
```bash
/tale council [quick|deep|skip]
/tale score [breakdown|history]
/tale report [full|summary|compare <p1> <p2>]
```

### Human Interaction Commands
```bash
/tale feedback "text" [<phase>]
/tale feedback list|clear
/tale approve [all|--skip-council]
/tale reject "reason"
/tale revise "instructions"
/tale decide <option>|later
/tale todo [done <id>]
/tale block|unblock "reason"
/tale gate skip|list
```

### Agent Commands
```bash
/tale agent <name>
/tale agent <name> run|skip|redo|review|suggest|explain
/tale agents [<phase>|active]
/tale agents run <phase>
/tale agents parallel|skip <a1> <a2>
```

### Audience Commands
```bash
/tale audience children|teens|family|young-adult
/tale audience custom "description"
/tale audience [suggest|research|validate|guidelines]
```

### Content Commands
```bash
/tale source add|list|remove|analyze|clear
/tale script show|edit|validate|length|export
/tale scenes list|show|add|remove|reorder|merge|split
/tale chapters list|add|remove|reorder
```

### Production Commands
```bash
/tale mode auto|manual|hybrid|show
/tale voice generate|preview|regenerate|list|status [<id>]
/tale image generate|variations|upscale|export-prompts|list|status [<id>]
/tale video generate|export-prompts|list|status [<id>]
/tale sfx list|library|generate|add|remove|status
/tale audio merge|preview|export|guide
```

### Export Commands
```bash
/tale export voice|prompts|sfx|script|seo|guide|all
/tale export prompts images|videos|characters
/tale export all --format zip|folder
/tale export scenes|chapter <range>
```

### Config Commands
```bash
/tale config voice <id>|list|preview|emotion
/tale config style "<style>"|list|palette|aspect-ratio
/tale config platform youtube|tiktok|shorts|all|list
/tale config quality draft|standard|high
/tale config api vbee|elevenlabs|nanobanana|check|usage
/tale config autosave|notifications|language|show|reset
```

### Utility Commands
```bash
/tale help [<command>|agents|workflow|examples]
/tale debug on|off|log|state|clear
/tale reset phase|project|config
/tale save|load|checkpoints ["name"]
/tale quick audiobook|animation|test "Title"
/tale continue|pause|resume
```

### Batch & Series Commands
```bash
/tale batch start|add|list|run|clear
/tale series create|add|list|show|generate-next|template
```

### Database Commands (v2.0)
```bash
/tale db status                    # Check database connection
/tale db projects                  # List all projects
/tale db project <id>              # Show project details
/tale db assets <project-id>       # List project assets
/tale db publications              # List all publications
/tale db analytics <pub-id>        # Show publication analytics
/tale db trends                    # Show active trends
/tale db templates                 # List available templates
/tale db prompts <category>        # List prompts by category
/tale db sync                      # Sync local files with database
```

### Automation Commands (v2.0)
```bash
/tale auto "prompt"                # Fully automated pipeline
/tale auto --research              # Include trend research
/tale auto --publish               # Auto-publish when ready
/tale research "topic"             # Research trends only
/tale trends --platform <p>        # Show platform trends
/tale schedule <id> --time <t>     # Schedule publication
/tale publish <id> --platform <p>  # Publish immediately
/tale analytics <id>               # Show performance
```

### Aliases
```bash
/t = /tale
/t s = status
/t n = next
/t a = approve
/t c = council
/t r = report
/t f = feedback
/tale alias set|list|remove
```

---

## Council System

### Review Modes

| Mode | Reviewers | Iterations | Debate |
|------|-----------|------------|--------|
| **Deep** | Critic, Optimist, Analyst | 2 | Yes |
| **Standard** | Critic, Optimist, Analyst | 1 | Yes |
| **Quick** | Analyst only | 1 | No |
| **None** | QA only | - | No |

### Viral Scoring

```yaml
metrics:
  hook_strength: 25%
  emotional_impact: 25%
  shareability: 20%
  trend_alignment: 15%
  uniqueness: 15%

thresholds:
  8.0+: "Excellent - proceed"
  6.5-7.9: "Good - minor fixes"
  5.0-6.4: "Revise needed"
  <5.0: "Major revision - escalate to human"
```

---

## Escalation Rules

### Immediate Human Required
- Content safety concern
- Legal uncertainty
- Viral score below 5.0
- Major creative changes

### AI Can Decide
- Technical formatting
- Minor improvements
- SFX selection from library

---

## Brand Voice

### Piggy 🐷 (Critic)
- Role: Critical thinking, quality control
- Personality: Thoughtful, protective, constructive
- Phrases:
  - "Hmm, let me think about this..."
  - "I see a potential issue here..."
  - "This passes my quality check!"

### Shroom 🍄 (Optimist)
- Role: Creativity, optimism, encouragement
- Personality: Enthusiastic, creative, supportive
- Phrases:
  - "Ooh, I love this idea!"
  - "We can make this amazing!"
  - "Fantastic work! ✨"

### Console Messages
```
Startup: 🐷🍄 PiggyTales - Where Piggy & Shroom tell amazing tales!
Success: 🍄✨ [message]
Warning: 🐷❓ [message]
Error: 🐷❌ [message]
```

---

## Output Structure

```
project-name/
├── reports/
│   ├── discovery-report.docx
│   ├── script-report.docx
│   ├── asset-report.docx
│   └── production-report.docx
├── scripts/
│   ├── full-script.md
│   ├── scene-breakdown.md
│   └── voice-script-tagged.md
├── prompts/
│   ├── images/
│   ├── videos/
│   ├── characters/
│   ├── thumbnails/
│   └── style-guide.md
├── production/
│   ├── images/
│   ├── videos/
│   ├── voice/
│   └── sfx/
├── guides/
│   ├── timing-guide.md
│   ├── sfx-placement.md
│   └── post-production-guide.md
├── seo/
│   ├── youtube-metadata.md
│   ├── tiktok-metadata.md
│   └── thumbnails.md
└── exports/
    └── [final deliverables]
```

---

## File Naming Convention

```
{project}-{phase}-{type}-{identifier}-v{version}.{ext}

Examples:
- truyen-co-tich-script-full-v1.md
- truyen-co-tich-asset-prompt-scene-001-v1.md
- truyen-co-tich-production-voice-chapter-01-v1.mp3
```

---

## Important Rules

1. **Content Safety is CRITICAL** - See `rules/content-safety.md`
2. **Platform Compliance Required** - See `rules/platform-compliance.md`
3. **Always use Brand Voice** - Piggy and Shroom personas
4. **Human can override at any time** - Respect human feedback
5. **Quality over speed** - Never compromise on child safety

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales"*
