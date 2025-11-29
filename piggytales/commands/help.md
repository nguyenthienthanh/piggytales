# Command: help

**Category:** Utility
**Priority:** Low
**Syntax:** `/tale help [command|topic]`
**Alias:** `/t ?`

---

## Description

Display help information for PiggyTales commands or topics.

---

## Usage

### General Help
```bash
/tale help
```

### Command Help
```bash
/tale help new
/tale help council
/tale help export
```

### Topic Help
```bash
/tale help agents
/tale help workflow
/tale help examples
```

---

## Output

### General Help
```markdown
## PiggyTales - Command Reference

**Project Commands:**
- /tale new <type> "Title" - Create new project
- /tale status - Check progress
- /tale list - List all projects

**Phase Commands:**
- /tale next - Proceed to next phase
- /tale back - Return to previous phase
- /tale phase <name> - Go to specific phase

**Workflow Commands:**
- /tale workflow <mode> - Set workflow mode
- /tale preset <name> - Load preset
- /tale complexity <level> - Set complexity

**Review Commands:**
- /tale council - Trigger council review
- /tale approve - Approve current phase
- /tale score - Show viral score

**Agent Commands:**
- /tale agent <name> - Summon agent
- /tale agents - List all agents

**Production Commands:**
- /tale voice generate - Generate voice
- /tale export all - Export everything

**Quick Start:**
- /tale quick audiobook "Title" - Fast start

**Shortcuts:**
- /t s = status
- /t n = next
- /t a = approve
- /t c = council

**Need more help?**
- /tale help <command>
- /tale help examples
```

---

## Aliases

- `/t ?`
- `/tale ?`

---

**Version:** 1.0.0
