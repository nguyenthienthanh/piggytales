# Post-Phase Hook - Phase Completion

**Version:** 1.0.0
**Purpose:** Execute after each phase completes
**Trigger:** Automatically run after Phase N completion

---

## Purpose

Save deliverables, update state, and trigger reviews after phase completion.

---

## Execution Flow

```
Phase N Execution
      ↓
[POST-PHASE HOOK] ← YOU ARE HERE
      ↓
Council Review (if configured)
      ↓
Human Approval Gate (if configured)
      ↓
Phase N+1
```

---

## Post-Phase Actions

### 1. Save Deliverables
```yaml
actions:
  - Collect all files created during phase
  - Move to appropriate project directories
  - Update deliverables list in workflow state
```

### 2. Update Phase Status
```yaml
state_update:
  phase_status: "completed"
  completed_at: <timestamp>
  deliverables: [list of files]
  duration_ms: <execution time>
```

### 3. Generate Phase Report
```yaml
report:
  format: markdown
  location: reports/{phase}-report.md
  contents:
    - Phase summary
    - Deliverables list
    - Agent contributions
    - Issues/warnings
```

### 4. Trigger Council Review
```yaml
council_trigger:
  full_mode: after_each_phase
  standard_mode: after_script, after_production
  lite_mode: after_production_only
  express_mode: skip (QA only)
```

### 5. Check Human Gate
```yaml
human_gates:
  full_mode: all_phases
  standard_mode: script_approval, final_approval
  lite_mode: final_approval_only
  express_mode: none
```

---

## Phase-Specific Actions

### After Discovery
```yaml
actions:
  - Save discovery report
  - Update project context with findings
  - Check legal status
  - Confirm target audience
```

### After Script
```yaml
actions:
  - Save full script
  - Save voice script with emotion tags
  - Generate scene breakdown (animation)
  - Validate content safety
  - Calculate estimated duration
```

### After Asset
```yaml
actions:
  - Save style guide
  - Export image/video prompts
  - Save SEO metadata
  - Generate thumbnail concepts
```

### After Production
```yaml
actions:
  - Collect all generated files
  - Generate timing guide
  - Create post-production guide
  - Package for export
```

---

## Output Display

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ PHASE 2: SCRIPT - COMPLETED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Summary:
  - Duration: 15 minutes
  - Files created: 4

📁 Deliverables:
  - scripts/full-script.md
  - scripts/voice-script-tagged.md
  - scripts/scene-breakdown.md
  - guides/sfx-list.md

🤖 Agent Contributions:
  - Script Writer: Main script
  - Emotion Tagger: 45 emotion markers
  - SFX Planner: 12 SFX points

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔄 Next: Council Review
   Use /tale council to proceed
```

---

## Error Handling

```yaml
on_error:
  - Log error details
  - Mark phase as "error"
  - Display resolution suggestions
  - Allow retry with /tale redo

recovery:
  - /tale redo - Restart current phase
  - /tale back - Return to previous phase
  - /tale skip - Skip current phase (if allowed)
```

---

**Version:** 1.0.0
**Critical:** YES - Must complete to advance workflow
