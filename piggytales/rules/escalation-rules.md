# Escalation Rules

> **Priority:** HIGH
> **Applies to:** All agents, all phases
> **Purpose:** Clear decision-making hierarchy

---

## Escalation Levels

### Level 0: AI Autonomous

```yaml
description: "AI can decide without escalation"
response_time: "Immediate"

applies_to:
  - Technical formatting decisions
  - Minor wording adjustments
  - File organization and naming
  - SFX selection from library
  - Timing micro-adjustments
  - Prompt parameter tweaks
  - Documentation updates
  - Progress reporting
```

### Level 1: Council Review

```yaml
description: "Requires council review before proceeding"
response_time: "Within current phase"

applies_to:
  - Script revisions
  - Visual style choices
  - Emotion interpretation
  - Scene structure changes
  - Character voice decisions
  - Pacing adjustments
  - Creative alternatives

process:
  1. Agent flags item for review
  2. Council convenes (based on mode)
  3. Council provides recommendation
  4. Agent implements recommendation
```

### Level 2: Human Notification

```yaml
description: "Human notified but can continue"
response_time: "Before phase completion"

applies_to:
  - Viral score below 7.0
  - Minor content flags
  - Unusual source material
  - Schedule concerns
  - Resource usage alerts
  - Quality near threshold

process:
  1. Agent flags and notifies human
  2. Work continues with caution
  3. Human reviews notification
  4. Human may intervene or acknowledge
```

### Level 3: Human Approval Required

```yaml
description: "Must wait for human decision"
response_time: "Before proceeding"

applies_to:
  - Major creative decisions
  - Story direction changes
  - Character design approval
  - Viral score below 6.5
  - Budget/resource decisions
  - Platform targeting changes
  - Audience changes

process:
  1. Agent presents options
  2. Work pauses on affected items
  3. Human reviews and decides
  4. Agent implements decision
```

### Level 4: Human Required - Critical

```yaml
description: "Immediate stop, human escalation"
response_time: "Immediate"

applies_to:
  - Content safety concern (ANY)
  - Legal uncertainty
  - Viral score below 5.0
  - Platform compliance risk
  - Copyright question
  - Harmful content detected
  - System malfunction

process:
  1. Immediate stop all work
  2. Flag with 🐷❌ alert
  3. Document concern fully
  4. Wait for human resolution
  5. Do not attempt workarounds
```

---

## Safety Escalation Matrix

### Content Safety

| Issue | Level | Action |
|-------|-------|--------|
| Potential violence | Level 3 | Human approval |
| Scary content possible | Level 3 | Human approval |
| Emotional theme | Level 2 | Notify human |
| Prohibited content detected | Level 4 | STOP |
| Safety uncertain | Level 4 | STOP |

### Legal Concerns

| Issue | Level | Action |
|-------|-------|--------|
| Copyright clear | Level 0 | Proceed |
| Copyright uncertain | Level 3 | Human approval |
| Copyright likely violated | Level 4 | STOP |
| License terms unclear | Level 3 | Human approval |

### Quality Concerns

| Issue | Level | Action |
|-------|-------|--------|
| Minor quality issue | Level 1 | Council review |
| Quality below standard | Level 2 | Notify human |
| Quality significantly below | Level 3 | Human approval |
| Quality unacceptable | Level 4 | STOP |

---

## Decision Authority Matrix

### Project Manager Agent

```yaml
can_decide:
  - Phase transitions (if criteria met)
  - Agent activation order
  - Workflow adjustments (minor)
  - Progress tracking
  - Resource allocation (within limits)

must_escalate:
  - Workflow mode changes
  - Phase skipping
  - Major timeline changes
  - New agent requirements
```

### QA Reviewer Agent

```yaml
can_decide:
  - Quality pass/fail
  - Minor revision requests
  - Checklist completion
  - Documentation standards

must_escalate:
  - Safety concerns
  - Repeated failures
  - Standard exceptions
  - Final sign-off override
```

### Council Agents

```yaml
can_decide:
  - Score assignments
  - Improvement recommendations
  - Creative suggestions
  - Priority of changes

must_escalate:
  - Score below 5.0
  - Conflicting opinions unresolved
  - Safety concerns
  - Major direction changes
```

### Production Agents

```yaml
can_decide:
  - Technical implementation
  - File formatting
  - Tool selection
  - Retry attempts (up to 3)

must_escalate:
  - Generation failures
  - Quality issues
  - Tool limitations
  - Cost overruns
```

---

## Escalation Communication

### Alert Formats

```markdown
🐷❓ WARNING: [Brief description]
Details: [Full explanation]
Recommended Action: [Suggestion]
Waiting for: [What's needed]
```

```markdown
🐷❌ CRITICAL: [Brief description]
Details: [Full explanation]
Work Status: STOPPED
Required: Human decision
```

### Notification Templates

**Level 2 Notification:**
```
📋 NOTIFICATION: [Title]

What: [Description]
Why flagged: [Reason]
Current status: Continuing with caution
Please review: [Before deadline]

🐷🍄 PiggyTales
```

**Level 3 Request:**
```
🐷❓ APPROVAL NEEDED: [Title]

What: [Description]
Options:
  A) [Option A]
  B) [Option B]
  C) [Other suggestions welcome]

Recommendation: [If any]
Waiting for your decision.

🐷🍄 PiggyTales
```

**Level 4 Alert:**
```
🐷❌ CRITICAL STOP: [Title]

Issue: [Description]
Severity: CRITICAL
All work: STOPPED

This requires immediate human attention.
Cannot proceed without resolution.

🐷🍄 PiggyTales
```

---

## Response Handling

### If Human Doesn't Respond

```yaml
level_2:
  timeout: "48 hours"
  action: "Escalate to Level 3"

level_3:
  timeout: "24 hours"
  action: "Send reminder, continue waiting"

level_4:
  timeout: "None"
  action: "Continue waiting, send periodic reminders"
```

### Human Response Options

```yaml
approve:
  - Proceed as planned
  - Log approval
  - Continue work

approve_with_changes:
  - Note changes required
  - Implement changes
  - Re-validate if needed

reject:
  - Note reason
  - Return to previous state
  - Request alternative

defer:
  - Note deferral
  - Set reminder
  - Continue other work if possible
```

---

## Escalation History

### Logging Requirements

```yaml
log_all_escalations:
  - Timestamp
  - Level
  - Description
  - Decision made
  - Decision maker
  - Outcome
```

### Review Triggers

```yaml
review_escalation_patterns:
  - If same issue escalates 3+ times
  - If Level 4 occurs
  - If human requests review
  - At project completion
```

---

*🐷🍄 "Where Piggy & Shroom tell amazing tales!"*
