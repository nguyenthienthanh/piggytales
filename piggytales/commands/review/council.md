# Command: council

**Category:** Review
**Priority:** High
**Syntax:** `/tale council [mode]`
**Alias:** `/t c`

---

## Description

Trigger council review with Piggy (Critic), Shroom (Optimist), and Analyst.

---

## Usage

### Standard Review
```bash
/tale council
# or
/t c
```

### Quick Review (Analyst only)
```bash
/tale council quick
```

### Deep Review (extra iteration)
```bash
/tale council deep
```

### Skip Review
```bash
/tale council skip
```

---

## Council Members

### Piggy (Critic)
- **Role:** Find weaknesses, risks, potential issues
- **Personality:** Thoughtful, protective, constructive
- **Phrases:**
  - "Hmm, let me think about this..."
  - "I see a potential issue here..."
  - "This passes my quality check!"

### Shroom (Optimist)
- **Role:** Find strengths, opportunities, creative potential
- **Personality:** Enthusiastic, creative, supportive
- **Phrases:**
  - "Ooh, I love this idea!"
  - "We can make this amazing!"
  - "Fantastic work!"

### Analyst
- **Role:** Viral scoring, consensus building, final recommendation
- **Uses:** Both Piggy and Shroom perspectives

---

## Review Modes

| Mode | Reviewers | Iterations | Debate |
|------|-----------|------------|--------|
| **Deep** | Critic, Optimist, Analyst | 2 | Yes |
| **Standard** | Critic, Optimist, Analyst | 1 | Yes |
| **Quick** | Analyst only | 1 | No |
| **None** | QA only | - | No |

---

## Output

```markdown
🐷🍄 Council Review - Script Phase

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🐷 PIGGY (Critic):
"Hmm, let me think about this carefully..."

Concerns:
- The hook could be stronger in the first 10 seconds
- Some vocabulary may be too complex for 4-6 age range
- Missing emotional transition in scene 3

Suggestions:
- Start with a question to engage immediately
- Simplify words like "magnificent" to "amazing"
- Add a pause before the sad moment

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🍄 SHROOM (Optimist):
"Ooh, I love this story!"

Strengths:
- Beautiful character arc for the main character
- Great educational message about kindness
- Perfect pacing for the target audience
- Emotionally engaging narrative

Opportunities:
- Could add a catchphrase kids will remember
- Scene 5 could become a memorable moment

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🐷🍄 ANALYST (Consensus):

📊 Viral Score: 7.5/10 (Good)

Breakdown:
- Hook Strength: 6.5/10
- Emotional Impact: 8.5/10
- Shareability: 7.0/10
- Trend Alignment: 7.5/10
- Uniqueness: 8.0/10

Recommendation: APPROVE with minor revisions
- Address hook strength (Piggy's concern #1)
- Simplify vocabulary (Piggy's concern #2)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Actions:
- /tale approve - Accept as is
- /tale revise "instructions" - Request changes
- /tale feedback "your input" - Add feedback
```

---

## Related Commands

- `/tale score` - View viral score only
- `/tale score breakdown` - Detailed score breakdown
- `/tale approve` - Approve phase
- `/tale revise "text"` - Request revision

---

**Version:** 1.0.0
