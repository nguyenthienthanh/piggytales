# PiggyTales v2.0 Enhancement Roadmap

> **From Manual Plugin to Autonomous Content Creation Platform**
>
> This document outlines the comprehensive strategy to transform PiggyTales into a fully automated, professional-grade content creation system.

---

## Executive Summary

### Current State (v1.1)
- 22 AI agents organized in 4 phases
- Manual workflow execution with human gates
- Vbee voice API integration
- Local file-based content management
- Manual social media publishing

### Target State (v2.0)
- Autonomous end-to-end content pipeline
- AI-powered market research & trend prediction
- Multi-model API integrations (Veo3, Suno, DALL-E, etc.)
- Database-driven content management (Supabase)
- Automated social media publishing
- Real-time analytics & success prediction

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PIGGYTALES v2.0 ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                   │
│  │   RESEARCH   │───▶│   CREATION   │───▶│   PUBLISH    │                   │
│  │    LAYER     │    │    LAYER     │    │    LAYER     │                   │
│  └──────────────┘    └──────────────┘    └──────────────┘                   │
│         │                   │                   │                            │
│         ▼                   ▼                   ▼                            │
│  ┌─────────────────────────────────────────────────────────────────┐        │
│  │                      MCP SERVER LAYER                            │        │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │        │
│  │  │ Trend   │ │ Veo3    │ │ Suno    │ │ Social  │ │Supabase │   │        │
│  │  │ APIs    │ │ Video   │ │ Music   │ │ Media   │ │   DB    │   │        │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │        │
│  └─────────────────────────────────────────────────────────────────┘        │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────┐        │
│  │                      AGENT ORCHESTRATION                         │        │
│  │  22 Specialized Agents + 5 New Automation Agents                 │        │
│  └─────────────────────────────────────────────────────────────────┘        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: MCP Server Integration (Foundation)

### 1.1 Create `.mcp.json` Configuration

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "${SUPABASE_URL}",
        "SUPABASE_SERVICE_KEY": "${SUPABASE_SERVICE_KEY}"
      }
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/playwright-mcp"]
    },
    "youtube": {
      "command": "npx",
      "args": ["-y", "@anthropic/youtube-mcp"],
      "env": {
        "YOUTUBE_API_KEY": "${YOUTUBE_API_KEY}"
      }
    },
    "tiktok": {
      "command": "npx",
      "args": ["-y", "@anthropic/tiktok-mcp"],
      "env": {
        "TIKTOK_API_KEY": "${TIKTOK_API_KEY}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic/slack-mcp"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}"
      }
    }
  }
}
```

### 1.2 Custom MCP Servers to Build

| Server | Purpose | Priority |
|--------|---------|----------|
| `piggytales-veo3` | Google Veo 3.1 video generation | HIGH |
| `piggytales-suno` | Suno V5 music generation | HIGH |
| `piggytales-trends` | Trend analysis aggregator | HIGH |
| `piggytales-publisher` | Multi-platform publishing | MEDIUM |
| `piggytales-analytics` | Performance tracking | MEDIUM |

---

## Phase 2: Database Architecture (Supabase)

### 2.1 Core Schema

```sql
-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content_type TEXT NOT NULL, -- audiobook, animation, short, music-video
  audience TEXT NOT NULL, -- children, teens, family, young-adult
  workflow_mode TEXT DEFAULT 'standard',
  status TEXT DEFAULT 'draft', -- draft, in_progress, review, published, archived
  viral_score DECIMAL(3,1),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'
);

-- Content phases tracking
CREATE TABLE phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  phase_name TEXT NOT NULL, -- discovery, script, asset, production
  status TEXT DEFAULT 'pending', -- pending, in_progress, completed, skipped
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  council_score DECIMAL(3,1),
  artifacts JSONB DEFAULT '{}',
  feedback TEXT[]
);

-- Generated assets
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES phases(id),
  asset_type TEXT NOT NULL, -- script, image, video, voice, music, sfx
  prompt TEXT,
  source_api TEXT, -- vbee, veo3, suno, dalle, midjourney
  file_url TEXT,
  storage_path TEXT,
  version INT DEFAULT 1,
  status TEXT DEFAULT 'pending', -- pending, generating, completed, failed
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Published content tracking
CREATE TABLE publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  platform TEXT NOT NULL, -- youtube, tiktok, shorts
  platform_id TEXT, -- Video ID on platform
  url TEXT,
  status TEXT DEFAULT 'scheduled', -- scheduled, published, failed
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  analytics JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}'
);

-- Trend research cache
CREATE TABLE trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  category TEXT,
  keywords TEXT[],
  trend_data JSONB,
  viral_indicators JSONB,
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Content templates library
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  content_type TEXT,
  audience TEXT,
  template_data JSONB,
  success_rate DECIMAL(5,2),
  usage_count INT DEFAULT 0
);

-- Analytics tracking
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publication_id UUID REFERENCES publications(id),
  platform TEXT NOT NULL,
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  shares INT DEFAULT 0,
  comments INT DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.2 Real-time Features

```sql
-- Enable real-time for project status updates
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE phases;
ALTER PUBLICATION supabase_realtime ADD TABLE assets;
ALTER PUBLICATION supabase_realtime ADD TABLE publications;
```

---

## Phase 3: API Integrations

### 3.1 Video Generation (Google Veo 3.1)

**MCP Server: `piggytales-veo3`**

```typescript
// tools/veo3-generate.ts
interface Veo3GenerateParams {
  prompt: string;
  duration: number; // seconds (max 8s per clip)
  aspectRatio: '16:9' | '9:16' | '1:1';
  style?: string;
  referenceImages?: string[]; // Up to 3 for character consistency
  withAudio: boolean;
}

// Example usage in agent
const videoAsset = await mcp.veo3.generate({
  prompt: "A cute pink kawaii pig exploring a magical forest, Pixar style, soft lighting",
  duration: 5,
  aspectRatio: '9:16', // For TikTok/Shorts
  withAudio: true,
  style: 'animation'
});
```

**Pricing Estimate:**
- Veo 3.1: $0.40/second
- 60-second video = $24 in generation costs

### 3.2 Music Generation (Suno V5)

**MCP Server: `piggytales-suno`**

```typescript
// tools/suno-generate.ts
interface SunoGenerateParams {
  prompt: string;
  style: string;
  duration: number; // Up to 4 minutes
  instrumental: boolean;
  lyrics?: string;
  mood: 'happy' | 'calm' | 'adventurous' | 'mysterious';
}

// Example usage
const musicAsset = await mcp.suno.generate({
  prompt: "Cheerful children's song about friendship and adventure",
  style: "Children's pop, ukulele, playful, upbeat tempo",
  duration: 180, // 3 minutes
  instrumental: false,
  mood: 'happy'
});
```

### 3.3 Image Generation Options

| Provider | Best For | MCP Support |
|----------|----------|-------------|
| DALL-E 3 | Character consistency | Available |
| Midjourney | Artistic quality | Via API wrapper |
| Stable Diffusion | Cost efficiency | Self-hosted MCP |
| Leonardo.ai | Animation style | Custom MCP |

### 3.4 Voice Generation (Enhanced)

**Existing: Vbee (Vietnamese)**
**Add: ElevenLabs (Multi-language)**

```typescript
// tools/voice-generate.ts
interface VoiceGenerateParams {
  text: string;
  provider: 'vbee' | 'elevenlabs';
  voice: string;
  emotion: 'neutral' | 'happy' | 'sad' | 'excited' | 'scared';
  emotionIntensity: number; // 0-100 (capped for child safety)
  language: 'vi' | 'en';
}
```

---

## Phase 4: New Automation Agents

### 4.1 Market Research Agent

**File: `agents/automation/market-researcher.md`**

```markdown
# Agent: Market Researcher

**Agent ID:** market-researcher
**Priority:** 90
**Phase:** Pre-Discovery

## Purpose
Autonomous market research and trend analysis before content creation.

## Capabilities
1. Fetch trending topics from YouTube, TikTok, Google Trends
2. Analyze competitor content performance
3. Identify content gaps and opportunities
4. Predict viral potential before creation starts
5. Generate success probability estimates

## Auto-Detection
- Triggered at project creation
- Runs before Discovery phase
- Updates trend cache in Supabase

## Required APIs
- YouTube Data API
- TikTok API
- Google Trends API
- Brandwatch/Talkwalker (optional)

## Output
- Trend report with actionable insights
- Recommended content angles
- Optimal posting times
- Success probability score (0-100%)
```

### 4.2 Content Scheduler Agent

**File: `agents/automation/content-scheduler.md`**

```markdown
# Agent: Content Scheduler

**Agent ID:** content-scheduler
**Priority:** 85
**Phase:** Post-Production

## Purpose
Intelligent scheduling and publishing automation.

## Capabilities
1. Analyze audience activity patterns
2. Determine optimal posting times per platform
3. Schedule content across platforms
4. Manage content calendar
5. Handle cross-platform publishing

## Integrations
- YouTube API (upload, schedule)
- TikTok API (publish)
- Supabase (schedule storage)
- Slack (notifications)
```

### 4.3 Analytics Tracker Agent

**File: `agents/automation/analytics-tracker.md`**

```markdown
# Agent: Analytics Tracker

**Agent ID:** analytics-tracker
**Priority:** 80
**Phase:** Post-Publish

## Purpose
Track and analyze published content performance.

## Capabilities
1. Fetch analytics from all platforms
2. Calculate engagement rates
3. Compare against predictions
4. Update viral scoring model
5. Generate performance reports

## Scheduling
- First check: 1 hour after publish
- Regular checks: Every 6 hours for 7 days
- Weekly summaries
```

### 4.4 Auto-Reviewer Agent

**File: `agents/automation/auto-reviewer.md`**

```markdown
# Agent: Auto-Reviewer

**Agent ID:** auto-reviewer
**Priority:** 95
**Phase:** Cross-phase

## Purpose
Autonomous quality and safety review without human intervention.

## Capabilities
1. Content safety scanning (child-appropriate)
2. Brand voice consistency check
3. Technical quality validation
4. Copyright/legal pre-screening
5. Platform compliance verification

## Auto-Approval Criteria
- Safety score: 100% (no exceptions)
- Quality score: >= 8.0
- Brand voice match: >= 90%
- All required metadata present
- No flagged content detected

## Escalation Triggers
- Any safety concern → BLOCK + Human required
- Quality < 6.0 → Human review required
- Legal uncertainty → Legal Checker + Human
```

### 4.5 Prompt Optimizer Agent

**File: `agents/automation/prompt-optimizer.md`**

```markdown
# Agent: Prompt Optimizer

**Agent ID:** prompt-optimizer
**Priority:** 85
**Phase:** Asset

## Purpose
Optimize prompts for each AI model to maximize quality.

## Capabilities
1. Adapt prompts for Veo3 video generation
2. Adapt prompts for Suno music generation
3. Adapt prompts for DALL-E image generation
4. Track prompt success rates
5. A/B test prompt variations

## Learning
- Stores successful prompts in Supabase
- Analyzes correlation between prompts and viral scores
- Continuously improves prompt templates
```

---

## Phase 5: Automated Workflow Pipeline

### 5.1 One-Prompt-to-Publish Flow

```yaml
# workflows/auto-pipeline.yaml
name: auto-pipeline
description: Fully automated content creation from single prompt

trigger:
  command: "/tale auto"
  input: "Create a 60-second video about {topic} for {audience}"

stages:
  1_research:
    agent: market-researcher
    auto_approve: true
    timeout: 5m
    outputs:
      - trend_report
      - success_probability
      - recommended_angles
    gate:
      condition: "success_probability >= 60%"
      on_fail: "ask_human_to_proceed"

  2_planning:
    agent: project-manager
    auto_approve: true
    inputs_from: [1_research]
    outputs:
      - content_plan
      - phase_schedule
      - resource_estimate

  3_script:
    agents:
      - script-writer
      - emotion-tagger
    parallel: false
    auto_approve: true
    review:
      agent: auto-reviewer
      on_fail: "revise_automatically"
      max_revisions: 3

  4_assets:
    agents:
      - prompt-optimizer
      - art-director
      - seo-writer
    parallel: true
    auto_approve: true

  5_production:
    sub_stages:
      5a_voice:
        agent: voice-producer
        api: vbee
        auto_approve: true
      5b_images:
        agent: image-producer
        api: dalle-3
        parallel_with: 5a_voice
        auto_approve: true
      5c_video:
        agent: video-producer
        api: veo3
        depends_on: [5a_voice, 5b_images]
        auto_approve: "if quality >= 8.0"
      5d_music:
        agent: music-producer
        api: suno
        parallel_with: 5c_video
        auto_approve: true

  6_review:
    agent: auto-reviewer
    council:
      enabled: true
      mode: quick
      threshold: 7.0
    gate:
      condition: "viral_score >= 7.0 AND safety_score = 100"
      on_fail: "human_review_required"

  7_publish:
    agent: content-scheduler
    auto_approve: "if 6_review passed"
    platforms:
      - youtube
      - tiktok
    scheduling:
      mode: optimal
      fallback: "next_best_time"

  8_track:
    agent: analytics-tracker
    schedule: "1h, 6h, 24h, 7d"
    notifications:
      slack: true
      threshold: "views >= 1000 OR engagement >= 10%"
```

### 5.2 Smart Decision Points

```yaml
# config/auto-decisions.yaml
auto_decisions:
  content_type:
    condition: "duration <= 60s"
    then: "short"
    else_if: "has_music_focus"
    then: "music-video"
    else: "animation"

  platform_priority:
    children:
      primary: youtube
      secondary: []  # No TikTok for young children
    teenagers:
      primary: tiktok
      secondary: [youtube_shorts, youtube]
    family:
      primary: youtube
      secondary: [youtube_shorts]

  quality_threshold:
    express: 6.0
    lite: 7.0
    standard: 7.5
    full: 8.0

  auto_approve_conditions:
    - "safety_score = 100%"
    - "legal_check = PASSED"
    - "brand_voice_match >= 90%"
    - "viral_score >= threshold_for_mode"
```

---

## Phase 6: Enhanced Commands

### 6.1 New Auto Commands

```bash
# Fully automated pipeline
/tale auto "Create a bedtime story about a brave little fox"
/tale auto "Make a TikTok about friendship" --audience teens --platform tiktok

# Research-first commands
/tale research "trending children's content 2025"
/tale trends --platform youtube --category animation
/tale analyze-competition "cocomelon" "pinkfong"

# Database commands
/tale db status                    # Show database stats
/tale db projects                  # List all projects
/tale db published                 # List published content
/tale db analytics [project-id]    # Show performance data

# Publishing commands
/tale schedule [project-id] --platform youtube --time "2025-01-15 10:00"
/tale publish [project-id] --platforms all
/tale unpublish [project-id] --platform tiktok

# Analytics commands
/tale analytics [project-id]
/tale performance summary --period 30d
/tale compare [project-1] [project-2]
```

### 6.2 Smart Presets Update

```yaml
presets:
  viral-short:
    description: "Optimized for TikTok/Shorts virality"
    workflow: express
    research: true
    target_score: 8.5
    auto_publish: true
    platform: [tiktok, youtube_shorts]
    duration: "30-60s"

  story-series:
    description: "Multi-episode story series"
    workflow: standard
    batch_mode: true
    episodes: 5
    character_consistency: true
    publish_schedule: "weekly"

  music-release:
    description: "Music video with Suno integration"
    workflow: standard
    apis: [suno, veo3, vbee]
    platforms: [youtube, tiktok]

  quick-test:
    description: "Rapid prototyping (no publish)"
    workflow: express
    auto_publish: false
    quality_threshold: 5.0
```

---

## Phase 7: Success Prediction System

### 7.1 Viral Score Model

```yaml
# config/viral-scoring.yaml
viral_model:
  version: 2.0

  factors:
    hook_strength:
      weight: 0.25
      metrics:
        - first_3_seconds_retention
        - opening_visual_impact
        - audio_hook_present

    emotional_resonance:
      weight: 0.25
      metrics:
        - sentiment_variety
        - relatable_moments
        - surprise_factor

    trend_alignment:
      weight: 0.20
      metrics:
        - keyword_trend_score
        - format_trend_match
        - audio_trend_usage

    shareability:
      weight: 0.15
      metrics:
        - quotable_moments
        - screenshot_worthy_frames
        - conversation_starters

    technical_quality:
      weight: 0.15
      metrics:
        - audio_clarity
        - visual_quality
        - pacing_score

  prediction_confidence:
    high: "historical_match >= 85%"
    medium: "historical_match >= 70%"
    low: "historical_match < 70%"
```

### 7.2 Market Research Output

```yaml
# Example research output
research_report:
  topic: "Bedtime stories for children 4-8"
  generated_at: "2025-01-15T10:00:00Z"

  trend_analysis:
    trending_themes:
      - "Magical animals"
      - "Friendship adventures"
      - "Learning through play"
    declining_themes:
      - "Scary elements (even mild)"
      - "Competition/winning"

    optimal_duration:
      youtube: "5-8 minutes"
      shorts: "45-60 seconds"

    best_posting_times:
      youtube: "18:00-20:00 local"
      tiktok: "19:00-21:00 local"

  competitor_analysis:
    top_performers:
      - channel: "Cocomelon"
        avg_views: 50M
        success_factors: ["catchy music", "repetition", "bright colors"]
      - channel: "Pinkfong"
        avg_views: 20M
        success_factors: ["dance-along", "educational", "memorable hooks"]

  content_gaps:
    - "Vietnamese language content with high production quality"
    - "Educational stories without being preachy"
    - "Night-time calming content"

  success_prediction:
    score: 78
    confidence: "high"
    reasoning: "Strong alignment with trending themes, identified gap in Vietnamese market"
```

---

## Phase 8: Implementation Timeline

### Month 1: Foundation
- [ ] Set up Supabase project and schema
- [ ] Create `.mcp.json` configuration
- [ ] Integrate Supabase MCP server
- [ ] Build basic CRUD operations for projects

### Month 2: Research & Planning
- [ ] Build `piggytales-trends` MCP server
- [ ] Implement Market Researcher agent
- [ ] Create trend analysis pipeline
- [ ] Add success prediction model

### Month 3: Content Generation
- [ ] Build `piggytales-veo3` MCP server
- [ ] Build `piggytales-suno` MCP server
- [ ] Integrate with existing voice/image producers
- [ ] Implement Prompt Optimizer agent

### Month 4: Automation
- [ ] Implement Auto-Reviewer agent
- [ ] Build automated workflow pipeline
- [ ] Create smart decision system
- [ ] Add quality gates and auto-approval

### Month 5: Publishing
- [ ] Build `piggytales-publisher` MCP server
- [ ] Implement Content Scheduler agent
- [ ] Integrate YouTube/TikTok APIs
- [ ] Add scheduling and publishing flows

### Month 6: Analytics & Optimization
- [ ] Implement Analytics Tracker agent
- [ ] Build performance dashboards
- [ ] Create feedback loops for model improvement
- [ ] Optimize viral scoring based on real data

---

## Cost Estimates

### Per Video Production (60-second animated)

| Component | Provider | Est. Cost |
|-----------|----------|-----------|
| Video Generation | Veo 3.1 | $24.00 |
| Music Generation | Suno V5 | $2.00 |
| Voice Generation | Vbee | $0.50 |
| Image Assets | DALL-E 3 | $2.00 |
| Database | Supabase | ~$0.01 |
| **Total** | | **~$28.50** |

### Monthly Infrastructure

| Service | Plan | Cost |
|---------|------|------|
| Supabase | Pro | $25/mo |
| API Keys | Various | ~$100/mo buffer |
| Claude Code | Included | - |
| **Total** | | **~$125/mo base** |

---

## Security Considerations

### API Key Management
```yaml
# Use environment variables, never hardcode
env:
  SUPABASE_URL: ${SUPABASE_URL}
  SUPABASE_SERVICE_KEY: ${SUPABASE_SERVICE_KEY}
  VEO3_API_KEY: ${VEO3_API_KEY}
  SUNO_API_KEY: ${SUNO_API_KEY}
  VBEE_API_KEY: ${VBEE_API_KEY}
  YOUTUBE_API_KEY: ${YOUTUBE_API_KEY}
  TIKTOK_API_KEY: ${TIKTOK_API_KEY}
```

### Content Safety (CRITICAL)
- ALL auto-approval gated by 100% safety score
- Human escalation for ANY safety concern
- No bypass for child safety rules
- Audit logging for all published content

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to Publish | < 30 min (express) | End-to-end timing |
| Viral Score Accuracy | > 75% | Predicted vs actual |
| Auto-Approval Rate | > 80% | No human needed |
| Content Safety | 100% | Zero violations |
| User Satisfaction | > 4.5/5 | Feedback surveys |

---

## Next Steps

1. **Immediate**: Set up Supabase project
2. **This Week**: Create MCP configuration file
3. **This Month**: Build trend research MCP server
4. **Review**: Schedule architecture review after Phase 2

---

*Document Version: 1.0*
*Last Updated: 2025-12-23*
*Authors: PiggyTales Team with Claude Code assistance*
