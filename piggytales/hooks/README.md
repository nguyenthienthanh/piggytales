# PiggyTales Hooks

> **Version:** 1.0.0
> **Purpose:** Lifecycle hooks for workflow automation

---

## Available Hooks

| Hook | Trigger | Purpose |
|------|---------|---------|
| `pre-phase` | Before phase starts | Prepare context, verify prerequisites |
| `post-phase` | After phase completes | Save deliverables, trigger reviews |
| `content-safety-check` | Before content creation | Validate child-safety guidelines |
| `human-feedback` | On user input | Process feedback, update workflow |
| `on-start` | Session start | Initialize plugin, show welcome |

---

## Hook Files

```
hooks/
├── hooks.json           # Hook configuration
├── README.md            # This file
├── pre-phase.md         # Pre-phase hook documentation
├── post-phase.md        # Post-phase hook documentation
├── content-safety-check.md  # Content safety hook
├── human-feedback.md    # Human feedback processing
└── on-start.md          # Session start hook
```

---

## hooks.json Events

| Event | When |
|-------|------|
| `SessionStart` | Claude Code session begins |
| `SessionEnd` | Session ends |
| `PreToolUse` | Before tool execution |
| `PostToolUse` | After tool execution |
| `UserPromptSubmit` | User sends message |
| `Stop` | Claude stops for approval |
| `Notification` | System notification |

---

## Custom Script Example

```bash
#!/bin/bash
# Check content safety before script generation
PLUGIN_DIR="$HOME/.claude/plugins/piggytales"
if [ -f "$PLUGIN_DIR/scripts/content-safety.sh" ]; then
  bash "$PLUGIN_DIR/scripts/content-safety.sh" "$1"
fi
```

---

*PiggyTales v1.0.0*
