<div align="center">

# 🐷🍄 PiggyTales

### A Plugin for [Claude Code](https://docs.anthropic.com/en/docs/claude-code)

> **Where Piggy & Shroom tell amazing tales!**

AI-powered content creation plugin for **Claude Code** with 22 specialized agents for audiobooks, animations, and child-safe content.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](piggytales/CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Plugin-purple.svg)](https://docs.anthropic.com/en/docs/claude-code)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Quick Start](#-quick-start) • [Features](#-key-features) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## At a Glance

<div align="center">

| **Agents** | **Skills** | **Rules** | **Phases** | **Commands** |
|:----------:|:----------:|:---------:|:----------:|:------------:|
| **22** | **8** | **7** | **4** | **70+** |

</div>

**What's Inside:**
- 🤖 **22 Specialized Agents** — Discovery, Script, Asset, Production, Council, Management
- 🎙️ **Voice Production** — Vietnamese TTS via Vbee API with emotion tags
- 🛡️ **Content Safety** — Child-safe guidelines for ages 4-17
- 🔄 **Flexible Workflows** — Full, Standard, Lite, Express, Custom modes
- 🎮 **70+ Commands** — Complete workflow control with `/tale` commands
- 🐷🍄 **Council Review** — Piggy (Critic) & Shroom (Optimist) quality system

---

## Quick Start

### Prerequisites

- **[Claude Code](https://docs.anthropic.com/en/docs/claude-code)** — Install Anthropic's CLI first
- **Git** — Version control

### Installation

In Claude Code terminal:

```bash
# Step 1: Add PiggyTales Marketplace (one-time)
/plugin marketplace add nguyenthienthanh/piggytales

# Step 2: Install PiggyTales Plugin
/plugin install piggytales@piggytales
```

### First Project

```bash
# Create a new audiobook project
/tale new audiobook "My First Story"

# Set target audience
/tale audience children

# Apply preset
/tale preset audiobook-simple

# Start workflow
/tale next
```

---

## Key Features

### Content Types

| Type | Description |
|------|-------------|
| **Audiobook** | Vietnamese voice narration with emotional delivery |
| **Animation** | Scene-based visual storytelling |
| **Short Video** | TikTok/YouTube Shorts content |
| **Music Video** | Audio-visual music content |

### Target Audiences

| Audience | Age Range | Guidelines |
|----------|-----------|------------|
| `children` | 4-12 | Simple language, no scary content |
| `teens` | 13-17 | Age-appropriate themes |
| `family` | All ages | Suitable for everyone |

### Workflow Modes

| Mode | Phases | Speed |
|------|--------|-------|
| **Full** | All 4 phases | Thorough |
| **Standard** | All phases | Balanced |
| **Lite** | Script + Production | Fast |
| **Express** | Script + Voice only | Fastest |

---

## Documentation

| Document | Description |
|----------|-------------|
| [GET_STARTED.md](piggytales/GET_STARTED.md) | Quick setup guide |
| [CLAUDE.md](piggytales/CLAUDE.md) | Full command reference |
| [VOICEOVER_SETUP.md](piggytales/VOICEOVER_SETUP.md) | Voice configuration |
| [TESTING_GUIDE.md](piggytales/TESTING_GUIDE.md) | How to test |

---

## Commands

### Quick Reference

```bash
# Project
/tale new audiobook "Title"
/tale status
/tale list

# Workflow
/tale next
/tale approve
/tale council

# Production
/tale voice generate
/tale export all

# Shortcuts
/t s    # status
/t n    # next
/t a    # approve
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

MIT License - see LICENSE file.

---

<div align="center">

**Made with 🐷❤️🍄 by the PiggyTales Team**

*Where Piggy & Shroom tell amazing tales!*

</div>
