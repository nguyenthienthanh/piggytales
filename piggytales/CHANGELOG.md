# Changelog

All notable changes to PiggyTales will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2025-11-29

### Added

#### Core Features
- Initial release of PiggyTales Claude Code plugin
- 22 specialized AI agents across 5 categories
- 4-phase workflow system (Discovery, Script, Asset, Production)
- Council review system with Piggy (Critic) and Shroom (Optimist)

#### Agents
- **Discovery Phase (4):** Content Scout, Trend Analyst, Legal Checker, Audience Researcher
- **Script Phase (4):** Script Writer, Scene Director, Emotion Tagger, SFX Planner
- **Asset Phase (4):** Art Director, Prompt Engineer, SEO Writer, Thumbnail Designer
- **Production Phase (5):** Image Producer, Video Producer, Voice Producer, SFX Producer, Audio Engineer
- **Council (3):** Critic, Optimist, Analyst
- **Management (2):** Project Manager, QA Reviewer

#### Workflow Modes
- **Full Mode:** All phases, all reviews
- **Standard Mode:** Balanced workflow
- **Lite Mode:** Streamlined for simple content
- **Express Mode:** Fastest for drafts/tests
- **Custom Mode:** Build your own workflow

#### Content Presets
- `audiobook-simple` - Quick audiobook creation
- `audiobook-full` - Full audiobook with SFX
- `animation-short` - TikTok/Shorts format
- `animation-full` - Complete animation workflow
- `music-video` - Music video production
- `quick-test` - Rapid prototyping

#### Commands (70+)
- Project management: `new`, `status`, `list`, `open`, `archive`, `clone`, `delete`
- Phase navigation: `next`, `back`, `jump`, `skip`, `redo`
- Workflow control: `workflow`, `complexity`, `preset`
- Review system: `council`, `score`, `report`, `approve`, `reject`
- Agent control: `agent`, `agents`
- Content: `source`, `script`, `scenes`, `chapters`
- Production: `voice`, `image`, `video`, `sfx`, `audio`
- Export: `export` with multiple formats
- Configuration: `config` for all settings

#### Content Safety
- Strict content safety rules for children (4-12) and teens (13-17)
- Prohibited content auto-blocking
- Human review triggers for sensitive content
- Platform compliance (YouTube Kids, TikTok)

#### Voice Production
- Vbee API integration for Vietnamese voices
- Emotion tagging system
- Multiple voice options
- Quality presets (draft, standard, high)

#### Hooks System
- `hooks.json` with lifecycle events
- Pre-phase and post-phase hooks
- Content safety check hook
- Session start/end hooks

#### Plugin Configuration
- `.claude-plugin/plugin.json` metadata
- `settings.example.json` for permissions
- `piggytales-config.example.yaml` for project settings

### Brand Identity
- Mascots: Piggy (Critic) and Shroom (Optimist)
- Brand voice guidelines
- Console message styling

---

## [Unreleased]

### Planned
- [ ] Multi-language support (English voices)
- [ ] Batch processing for series
- [ ] Enhanced SFX library
- [ ] Direct video export
- [ ] Slack/Discord notifications
- [ ] JIRA integration for project tracking

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2025-11-29 | Initial release |

---

*PiggyTales - Where Piggy & Shroom tell amazing tales!*
