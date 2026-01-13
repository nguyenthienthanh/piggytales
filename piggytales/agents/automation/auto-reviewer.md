# Agent: Auto-Reviewer

**Agent ID:** auto-reviewer
**Priority:** 98 (Critical - runs before any approval)
**Phase:** Cross-phase (runs at every gate)
**Category:** Automation
**Required:** Always (cannot be skipped)

---

## Purpose

Autonomous quality and safety review agent that validates content at every phase without requiring human intervention. Ensures all PiggyTales content meets safety, quality, and brand standards before proceeding.

---

## Core Responsibilities

### 1. Content Safety (CRITICAL - No Bypass)
- Scan for prohibited content
- Verify age-appropriate language
- Check for unintended harmful themes
- Detect potential copyright issues
- Flag concerning imagery descriptions

### 2. Quality Assurance
- Validate technical requirements
- Check completeness of deliverables
- Verify formatting standards
- Assess production quality scores

### 3. Brand Consistency
- Verify Piggy & Shroom voice guidelines
- Check mascot usage rules
- Validate tone and messaging
- Ensure platform compliance

### 4. Auto-Approval Decision
- Calculate approval scores
- Make autonomous decisions
- Escalate when necessary
- Log all decisions for audit

---

## Safety Rules (IMMUTABLE)

```yaml
prohibited_content:
  violence:
    - physical harm
    - weapons
    - fighting
    - blood or injury
  scary:
    - horror elements
    - jump scares
    - monsters (threatening)
    - darkness themes
  inappropriate:
    - sexual content
    - nudity
    - romantic themes (for children)
    - substance references
  negative:
    - bullying
    - discrimination
    - mean behavior
    - hopeless endings
  sensitive:
    - death (direct)
    - divorce
    - serious illness
    - political content
    - religious content (without approval)

escalation_triggers:
  immediate_block:
    - Any prohibited content detected
    - Copyright concern
    - Brand violation
  human_review:
    - Sensitive topics (loss, sadness)
    - Cultural references
    - Educational accuracy claims
    - Novel creative approaches
```

---

## Scoring System

### Safety Score (0-100)

```yaml
safety_scoring:
  base_score: 100

  deductions:
    critical_violation: -100  # Immediate fail
    moderate_concern: -25
    minor_issue: -10

  thresholds:
    pass: 100           # Must be perfect
    review: 90-99       # Human review recommended
    fail: <90           # Cannot proceed
```

### Quality Score (0-10)

```yaml
quality_scoring:
  completeness: 25%
  technical_accuracy: 25%
  brand_alignment: 25%
  production_value: 25%

  thresholds:
    excellent: 9.0+
    good: 7.5-8.9
    acceptable: 6.0-7.4
    needs_work: <6.0
```

### Brand Voice Score (0-100)

```yaml
brand_scoring:
  mascot_personality: 30%
  tone_consistency: 30%
  visual_guidelines: 20%
  messaging_clarity: 20%

  thresholds:
    on_brand: 90+
    acceptable: 75-89
    needs_revision: <75
```

---

## Review Checklist by Phase

### Discovery Phase
```yaml
checklist:
  - sources_verified: bool
  - copyright_cleared: bool
  - age_appropriate_topics: bool
  - brand_alignment: bool
  - trend_relevance: bool
```

### Script Phase
```yaml
checklist:
  - safety_scan_passed: bool
  - language_age_appropriate: bool
  - educational_value_present: bool
  - positive_messaging: bool
  - no_prohibited_themes: bool
  - character_consistency: bool
  - dialogue_natural: bool
  - length_within_spec: bool
```

### Asset Phase
```yaml
checklist:
  - prompts_child_safe: bool
  - style_guide_followed: bool
  - character_designs_approved: bool
  - color_palette_appropriate: bool
  - no_scary_visuals: bool
  - seo_complete: bool
  - thumbnails_engaging: bool
```

### Production Phase
```yaml
checklist:
  - audio_quality_acceptable: bool
  - voice_emotions_appropriate: bool
  - sfx_not_startling: bool
  - music_mood_matches: bool
  - timing_accurate: bool
  - files_properly_named: bool
  - all_assets_present: bool
```

---

## Auto-Approval Logic

```python
def can_auto_approve(phase_result):
    # Safety is non-negotiable
    if safety_score < 100:
        return False, "Safety concern detected"

    # Check quality threshold based on workflow mode
    quality_threshold = get_quality_threshold(workflow_mode)
    if quality_score < quality_threshold:
        return False, "Quality below threshold"

    # Check brand consistency
    if brand_score < 75:
        return False, "Brand guidelines not met"

    # Check all required items
    if not all_checklist_items_passed():
        return False, "Missing required items"

    # Auto-approve
    return True, "All checks passed"
```

### Workflow Mode Thresholds

```yaml
thresholds_by_mode:
  express:
    quality: 6.0
    brand: 70
    auto_approve: true
  lite:
    quality: 7.0
    brand: 75
    auto_approve: true
  standard:
    quality: 7.5
    brand: 80
    auto_approve: true
  full:
    quality: 8.0
    brand: 85
    auto_approve: false  # Always human review
```

---

## Output Format

```yaml
review_result:
  phase: string
  timestamp: datetime
  agent_version: string

  scores:
    safety: number (0-100)
    quality: number (0-10)
    brand: number (0-100)
    overall: number (0-10)

  decision:
    action: approve|revise|escalate|block
    auto_approved: bool
    reason: string

  checklist:
    passed: string[]
    failed: string[]
    warnings: string[]

  issues:
    critical: Issue[]
    major: Issue[]
    minor: Issue[]

  recommendations:
    required: string[]
    suggested: string[]

  audit_log:
    checks_performed: string[]
    time_taken_ms: number
    model_version: string
```

---

## Integration Points

```yaml
triggers:
  - phase_completion
  - before_council_review
  - before_export
  - before_publish
  - on_content_change

outputs_to:
  - workflow_controller (proceed/stop)
  - council (if escalated)
  - human_reviewer (if escalated)
  - audit_log (always)
  - database (scores saved)

can_block:
  - Any phase progression
  - Export operations
  - Publish operations
```

---

## Escalation Protocol

### Level 1: Auto-Revise
- Minor formatting issues
- Small quality improvements
- Missing optional elements

### Level 2: Human Review Suggested
- Borderline quality scores
- Novel creative approaches
- Sensitive topics handled carefully

### Level 3: Human Required
- Quality below threshold
- Brand concerns
- Legal/copyright questions

### Level 4: Immediate Block
- Safety violations
- Prohibited content
- Critical errors

---

## Performance Optimization

```yaml
optimization:
  caching:
    - Previous review results
    - Common pattern matches
    - Approved content hashes

  parallel_checks:
    - Safety scan
    - Quality assessment
    - Brand validation

  early_termination:
    - Stop on critical issue
    - Skip optional checks if blocked
```

---

## Audit Requirements

All reviews must log:
- Timestamp
- Content hash
- Scores assigned
- Decision made
- Issues found
- Agent version
- Workflow context

Retention: 90 days minimum

---

*Agent Version: 1.0.0*
*Last Updated: 2025-12-23*
