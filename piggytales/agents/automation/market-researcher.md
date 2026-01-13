# Agent: Market Researcher

**Agent ID:** market-researcher
**Priority:** 95
**Phase:** Pre-Discovery (runs before main workflow)
**Category:** Automation
**Required:** For `/tale auto` command

---

## Purpose

Autonomous market research and trend analysis agent that runs before content creation to maximize success probability. Analyzes trends, competitors, and content gaps to inform creative decisions.

---

## Capabilities

### 1. Trend Analysis
- Fetch trending topics from YouTube, TikTok, Google Trends
- Identify rising keywords and hashtags
- Detect seasonal patterns and timing opportunities
- Monitor platform algorithm changes

### 2. Competitor Research
- Analyze top-performing channels in niche
- Extract successful content patterns
- Identify engagement hooks and formats
- Benchmark quality standards

### 3. Content Gap Analysis
- Find underserved topics and formats
- Identify audience needs not being met
- Discover localization opportunities
- Spot emerging niches

### 4. Success Prediction
- Calculate viral probability score (0-100%)
- Estimate engagement based on historical data
- Predict optimal posting times
- Recommend content adjustments

---

## Triggers

```yaml
auto_triggers:
  - command: "/tale auto"
  - command: "/tale research"
  - workflow_start: true
  - scheduled: "daily 6:00 AM"

manual_triggers:
  - command: "/tale trends"
  - command: "/tale analyze-competition"
  - command: "/tale predict"
```

---

## Input Requirements

```yaml
required:
  - content_type: audiobook|animation|short|music-video
  - audience: children|teenagers|family|young-adult

optional:
  - topic: string
  - competitors: string[]
  - platforms: youtube|tiktok|shorts
  - region: string (default: VN)
  - language: string (default: vi)
```

---

## Output Format

```yaml
research_report:
  generated_at: timestamp
  confidence: high|medium|low

  trend_analysis:
    trending_themes:
      - name: string
        score: number (0-100)
        growth_rate: string
        sources: string[]
    declining_themes:
      - name: string
        decline_reason: string

    keywords:
      rising: string[]
      stable: string[]
      declining: string[]

    optimal_timing:
      best_days: string[]
      best_hours: string
      avoid: string[]

  competitor_analysis:
    top_performers:
      - channel: string
        avg_views: number
        engagement_rate: number
        success_factors: string[]
        content_frequency: string

    content_patterns:
      popular_formats: string[]
      average_duration: string
      thumbnail_styles: string[]
      title_patterns: string[]

  content_gaps:
    opportunities:
      - gap: string
        potential: high|medium|low
        competition: low|medium|high
        recommendation: string

    avoid:
      - topic: string
        reason: string

  success_prediction:
    overall_score: number (0-100)
    confidence: high|medium|low

    breakdown:
      trend_alignment: number
      competition_level: number
      audience_demand: number
      timing_score: number
      uniqueness_potential: number

    recommendations:
      must_include: string[]
      should_consider: string[]
      avoid: string[]

    estimated_performance:
      views_range: string
      engagement_rate: string
      viral_probability: string
```

---

## Data Sources

### Primary APIs
- YouTube Data API (trending, search, analytics)
- Google Trends API
- TikTok Research API (when available)

### Secondary Sources (via Playwright)
- YouTube Trending page
- TikTok Discover page
- Social media monitoring

### Cached Data (Supabase)
- Historical trend data
- Competitor performance history
- Success pattern database

---

## Algorithm

### Success Prediction Model

```
score = (
  trend_alignment * 0.25 +
  competition_gap * 0.20 +
  audience_demand * 0.25 +
  timing_score * 0.15 +
  uniqueness * 0.15
)

confidence = historical_match_rate
```

### Trend Scoring

```
trend_score = (
  search_volume_growth * 0.30 +
  social_mentions * 0.25 +
  competitor_activity * 0.20 +
  seasonal_relevance * 0.15 +
  longevity_prediction * 0.10
)
```

---

## Workflow Integration

```yaml
workflow_position: pre-discovery

inputs_from:
  - user_prompt
  - project_config
  - historical_data

outputs_to:
  - discovery_phase (if enabled)
  - script_phase (trend keywords, themes)
  - seo_writer (keywords, hashtags)
  - content_scheduler (optimal timing)

gates:
  proceed_threshold: 60
  on_low_score:
    action: warn_user
    message: "Success prediction below threshold. Recommend adjustments."
    options:
      - proceed_anyway
      - get_recommendations
      - cancel
```

---

## Example Execution

### Input
```yaml
command: /tale auto "bedtime story about a brave little fox"
audience: children
content_type: audiobook
platform: youtube
```

### Output Summary
```yaml
success_prediction:
  overall_score: 78
  confidence: high

key_findings:
  - "Animal adventure stories trending +15% this month"
  - "Bedtime content peak hours: 18:00-20:00"
  - "Gap: Vietnamese high-quality bedtime stories"
  - "Competition: Low for this specific niche"

recommendations:
  - "Include educational element (animal facts)"
  - "Duration: 5-8 minutes optimal"
  - "Add calming background music"
  - "Post on Sunday evening for best reach"

proceed: true
adjustments_suggested:
  - "Consider adding 'learning about forest animals' angle"
  - "Use warm, soothing narrator voice"
```

---

## Error Handling

```yaml
on_api_failure:
  - retry: 3 times with exponential backoff
  - fallback: use cached trend data
  - if_no_cache: proceed with warning

on_low_confidence:
  - action: flag_for_review
  - message: "Limited data available. Predictions may be less accurate."
  - allow_proceed: true

on_no_data:
  - action: skip_research
  - message: "Unable to fetch trend data. Proceeding with defaults."
  - log: true
```

---

## Performance Metrics

Track and learn from:
- Prediction accuracy (predicted vs actual performance)
- Trend identification lead time
- Gap recommendation success rate
- User satisfaction with recommendations

---

## Safety Considerations

1. **Data Privacy**: No personal data collection
2. **Rate Limiting**: Respect API quotas
3. **Content Safety**: Filter inappropriate trends
4. **Bias Awareness**: Balance data with creativity

---

*Agent Version: 1.0.0*
*Last Updated: 2025-12-23*
