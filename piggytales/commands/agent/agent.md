# Command: agent

**Category:** Agent
**Priority:** Medium
**Syntax:** `/tale agent <name> [action]`
**Alias:** `/t agent`

---

## Description

Summon or control a specific agent.

---

## Usage

### Summon Agent
```bash
/tale agent script-writer
/tale agent critic
/tale agent voice-producer
```

### Agent Actions
```bash
/tale agent <name> run        # Run agent's main task
/tale agent <name> skip       # Skip this agent
/tale agent <name> redo       # Redo agent's work
/tale agent <name> review     # Ask agent to review current work
/tale agent <name> suggest    # Get suggestions from agent
/tale agent <name> explain    # Agent explains their work
```

---

## All Agents (22)

### Discovery Phase (4)
| Agent | Purpose | Skippable |
|-------|---------|-----------|
| `content-scout` | Find content ideas, public domain sources | Yes |
| `trend-analyst` | Analyze viral patterns | Yes |
| `legal-checker` | Copyright verification | **No** |
| `audience-researcher` | Target audience research | Yes |

### Script Phase (4)
| Agent | Purpose | Skippable |
|-------|---------|-----------|
| `script-writer` | Write age-appropriate scripts | **No** |
| `scene-director` | Scene breakdown | Yes (audiobook) |
| `emotion-tagger` | Voice emotion markers | **No** |
| `sfx-planner` | Sound effects planning | Yes |

### Asset Phase (4)
| Agent | Purpose | Skippable |
|-------|---------|-----------|
| `art-director` | Style guide | Yes (audiobook) |
| `prompt-engineer` | AI prompts | Yes (audiobook) |
| `seo-writer` | Metadata | **No** |
| `thumbnail-designer` | Thumbnails | Yes |

### Production Phase (5)
| Agent | Purpose | Skippable |
|-------|---------|-----------|
| `image-producer` | Generate/export images | Yes |
| `video-producer` | Generate/export videos | Yes |
| `voice-producer` | Generate voice via Vbee | **No** |
| `sfx-producer` | Source/generate SFX | Yes |
| `audio-engineer` | Merge audio/timing guide | Partial |

### Council (3)
| Agent | Persona | Purpose | Skippable |
|-------|---------|---------|-----------|
| `critic` | Piggy | Find weaknesses | Optional |
| `optimist` | Shroom | Find strengths | Optional |
| `analyst` | Both | Viral scoring | **No** |

### Management (2)
| Agent | Purpose | Skippable |
|-------|---------|-----------|
| `project-manager` | Orchestrate workflow | **No** |
| `qa-reviewer` | Quality checks | **No** |

---

## Output (summon)

```markdown
🤖 Agent Summoned: Script Writer

📋 Role: Write age-appropriate scripts with emotional hooks
🎯 Phase: Script
📊 Status: Active

Skills:
- Creative Writing (Expert)
- Storytelling (Expert)
- Age-appropriate content (Expert)

Current Task: Writing chapter 3

Actions:
- /tale agent script-writer run
- /tale agent script-writer suggest
- /tale agent script-writer explain
```

---

## Related Commands

- `/tale agents` - List all agents
- `/tale agents <phase>` - List agents for phase
- `/tale agents active` - List currently active agents
- `/tale agents run <phase>` - Run all phase agents

---

**Version:** 1.0.0
