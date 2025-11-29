# Contributing to PiggyTales

### A Plugin for [Claude Code](https://docs.anthropic.com/en/docs/claude-code)

> **Where Piggy & Shroom tell amazing tales!**

---

Thank you for your interest in contributing to PiggyTales! This is a plugin for **[Claude Code](https://docs.anthropic.com/en/docs/claude-code)** (Anthropic's official CLI for Claude). This guide will help you get started.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Content Safety Guidelines](#content-safety-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)

---

## Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/). By participating, you agree to uphold this code.

**Special Note:** PiggyTales creates content for children and teenagers. All contributions must prioritize child safety and age-appropriate content.

---

## Getting Started

### Prerequisites

- **[Claude Code](https://docs.anthropic.com/en/docs/claude-code)** — Anthropic's agentic coding CLI
- **Git** — Version control
- **Bash** — For running scripts (macOS/Linux/WSL)

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/piggytales.git
cd piggytales
```

---

## Development Setup

### Install the Plugin Locally

```bash
# Link to your Claude plugins directory
ln -s $(pwd) ~/.claude/plugins/marketplaces/piggytales
```

### Test Installation

```bash
# In Claude Code
/plugin list
# Should show piggytales
```

---

## Project Structure

```
piggytales/                    # Marketplace root
├── .claude-plugin/
│   └── marketplace.json       # Marketplace configuration
├── assets/
│   └── logo/                  # Logo and brand assets
├── scripts/                   # Marketplace scripts
├── piggytales/               # Plugin folder
│   ├── .claude-plugin/
│   │   └── plugin.json       # Plugin configuration
│   ├── agents/               # 22 agent definitions
│   ├── commands/             # /tale commands
│   ├── hooks/                # Lifecycle hooks
│   ├── rules/                # Content safety rules
│   ├── skills/               # Agent skills
│   ├── workflows/            # Workflow definitions
│   ├── config/               # Configuration files
│   └── docs/                 # Documentation
├── README.md
├── CONTRIBUTING.md
└── install.sh
```

---

## Making Changes

### Adding a New Agent

1. Create agent file in `piggytales/agents/<phase>/`
2. Follow the agent template format
3. Update `piggytales/CLAUDE.md` if needed

### Adding a New Command

1. Create command file in `piggytales/commands/<category>/`
2. Follow the command template format
3. Update command README

### Modifying Rules

1. Edit files in `piggytales/rules/`
2. **CRITICAL:** Content safety rules require extra review

---

## Content Safety Guidelines

**This is CRITICAL for PiggyTales contributions.**

### Always Prioritize

- Child safety (ages 4-17)
- Age-appropriate content
- Platform compliance (YouTube Kids, TikTok)
- Positive messaging

### Never Include

- Violence, gore, or scary content
- Sexual or inappropriate content
- Profanity or vulgar language
- Drug or alcohol references
- Bullying or discrimination

### Review Required

- Emotional themes (loss, sadness)
- Conflict scenes
- Any edge cases

---

## Testing

### Test Commands

```bash
# In Claude Code with plugin installed
/tale help
/tale status
/tale quick test "Test Story"
```

### Test Checklist

- [ ] Commands work as expected
- [ ] Content safety rules apply
- [ ] Documentation is updated
- [ ] No breaking changes

---

## Submitting Changes

### Pull Request Process

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Update documentation
5. Submit PR with clear description

### PR Template

```markdown
## Description
[What does this PR do?]

## Type
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Agent/Command addition

## Content Safety
- [ ] I have reviewed content safety guidelines
- [ ] This PR does not introduce unsafe content
- [ ] This PR maintains child-appropriate standards

## Testing
- [ ] I have tested my changes
- [ ] Commands work as expected
```

---

## Questions?

Open an issue on GitHub or reach out to the maintainers.

---

**Thank you for helping make PiggyTales better!** 🐷🍄
