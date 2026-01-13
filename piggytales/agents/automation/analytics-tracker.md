# Agent: Analytics Tracker

**Agent ID:** analytics-tracker
**Priority:** 75
**Phase:** Post-Publish
**Category:** Automation
**Required:** For performance monitoring

---

## Purpose

Track and analyze published content performance across platforms. Provides insights for improving future content and validates success predictions.

---

## Capabilities

### 1. Performance Monitoring
- Fetch real-time metrics from platforms
- Track views, likes, comments, shares
- Calculate engagement rates
- Monitor growth patterns

### 2. Trend Analysis
- Identify viral content early
- Detect performance issues
- Compare against predictions
- Find success patterns

### 3. Reporting
- Generate performance summaries
- Create comparison reports
- Highlight top performers
- Alert on milestones

### 4. Learning Feedback
- Feed data back to prediction model
- Improve success scoring
- Update optimal timing data
- Refine content recommendations

---

## Metrics Tracked

### Core Metrics

```yaml
youtube:
  views:
    fetch_frequency: hourly (first 24h), daily (7d), weekly
    source: YouTube Analytics API
  watch_time:
    metric: minutes watched
    avg_view_duration: calculated
  engagement:
    likes: count
    dislikes: count (if available)
    comments: count
    shares: count
  subscribers:
    gained: from this video
    lost: from this video
  traffic_sources:
    search: percentage
    suggested: percentage
    external: percentage
    direct: percentage

tiktok:
  views: count
  likes: count
  comments: count
  shares: count
  saves: count
  watch_time:
    avg_watch_time: seconds
    completion_rate: percentage
  profile_views: from this video
  follows: from this video
```

### Calculated Metrics

```yaml
engagement_rate:
  formula: (likes + comments + shares) / views * 100
  benchmark:
    excellent: ">10%"
    good: "5-10%"
    average: "2-5%"
    poor: "<2%"

viral_velocity:
  formula: views_per_hour in first 24h
  indicators:
    viral: ">1000/hour sustained"
    trending: ">100/hour"
    normal: "<100/hour"

retention_score:
  formula: avg_view_duration / video_duration * 100
  benchmark:
    excellent: ">70%"
    good: "50-70%"
    needs_work: "<50%"
```

---

## Fetch Schedule

```yaml
schedule:
  first_hour:
    frequency: every 15 minutes
    purpose: detect early viral signals

  hours_1_to_24:
    frequency: hourly
    purpose: track launch performance

  days_2_to_7:
    frequency: every 6 hours
    purpose: monitor growth curve

  days_8_to_30:
    frequency: daily
    purpose: track long-term performance

  after_30_days:
    frequency: weekly
    purpose: archive and summary

triggers:
  milestone_check:
    - 100 views
    - 1000 views
    - 10000 views
    - 100000 views
  engagement_spike:
    - comments > 10/hour
    - shares > 5/hour
```

---

## Analysis Functions

### Performance Assessment

```python
def assess_performance(publication):
    metrics = fetch_latest_metrics(publication)
    predictions = get_predictions(publication.project_id)

    assessment = {
        'actual_vs_predicted': {
            'views': compare(metrics.views, predictions.views_estimate),
            'engagement': compare(metrics.engagement_rate, predictions.engagement_estimate),
        },
        'performance_tier': calculate_tier(metrics),
        'viral_potential': assess_viral_signals(metrics),
        'recommendations': generate_recommendations(metrics, predictions),
    }

    return assessment

def calculate_tier(metrics):
    score = (
        metrics.view_velocity_score * 0.3 +
        metrics.engagement_rate_score * 0.3 +
        metrics.retention_score * 0.2 +
        metrics.growth_trend_score * 0.2
    )

    if score >= 90: return 'exceptional'
    if score >= 75: return 'above_average'
    if score >= 50: return 'average'
    return 'below_average'
```

### Viral Detection

```yaml
viral_signals:
  early_indicators: # First 1-6 hours
    - view_velocity > 500/hour
    - engagement_rate > 15%
    - share_rate > 5%
    - comment_velocity > 20/hour

  confirmation: # 6-24 hours
    - sustained view growth
    - increasing engagement rate
    - appearing in trending
    - external traffic spike

  actions_on_viral:
    - notify_user: immediate
    - increase_fetch_frequency
    - prepare_follow_up_content_suggestions
    - document_success_factors
```

---

## Reports

### Daily Summary

```yaml
daily_summary:
  generated_at: time
  period: last 24 hours

  overview:
    total_views: number
    total_engagement: number
    best_performer: publication_id
    worst_performer: publication_id

  by_platform:
    youtube:
      publications: count
      total_views: number
      avg_engagement_rate: percentage
    tiktok:
      publications: count
      total_views: number
      avg_engagement_rate: percentage

  highlights:
    milestones_reached: Event[]
    viral_content: Publication[]
    needs_attention: Publication[]

  comparison:
    vs_yesterday: percentage
    vs_last_week: percentage
    vs_prediction: percentage
```

### Performance Report

```yaml
performance_report:
  publication_id: string
  project_title: string
  platform: string
  published_at: datetime

  current_metrics:
    views: number
    likes: number
    comments: number
    shares: number
    engagement_rate: percentage

  historical:
    views_timeline: DataPoint[]
    engagement_timeline: DataPoint[]

  analysis:
    performance_tier: string
    vs_prediction: percentage
    vs_category_average: percentage
    best_performing_aspect: string
    improvement_areas: string[]

  insights:
    what_worked: string[]
    what_could_improve: string[]
    recommendations: string[]
```

---

## Learning Integration

### Feedback to Prediction Model

```yaml
feedback_loop:
  data_collected:
    - content_features (topic, style, duration)
    - timing_features (day, hour, competition)
    - predicted_metrics
    - actual_metrics

  learning_updates:
    frequency: weekly
    process:
      1. Calculate prediction accuracy
      2. Identify systematic biases
      3. Update prediction weights
      4. Refine optimal timing data
      5. Update content recommendations

  model_improvements:
    - Adjust trend weights
    - Refine audience patterns
    - Update platform algorithms assumptions
    - Incorporate new success patterns
```

---

## Notifications

```yaml
notification_triggers:
  milestones:
    views:
      - 100: "First 100 views!"
      - 1000: "1K views milestone!"
      - 10000: "10K views - going viral!"
    engagement:
      - first_comment: "First comment received"
      - engagement_10: "10% engagement rate"

  alerts:
    viral_potential:
      condition: view_velocity > 500/hour
      message: "Content showing viral potential!"
      priority: high
    underperforming:
      condition: views < predicted * 0.5 after 24h
      message: "Content below expectations"
      suggestions: [boost, reshare, analyze]
    issue_detected:
      condition: sudden_drop or negative_comments_spike
      message: "Potential issue detected"
      priority: high
```

---

## Output Format

```yaml
tracking_result:
  publication_id: string
  platform: string
  fetched_at: datetime

  metrics:
    views: number
    likes: number
    comments: number
    shares: number
    engagement_rate: percentage

  deltas:
    since_last_fetch:
      views: +number
      engagement: +percentage
    since_publish:
      hours: number
      total_views: number

  analysis:
    performance_tier: string
    viral_signals: bool
    prediction_accuracy: percentage

  actions:
    notifications_sent: Event[]
    model_updates: Update[]
```

---

## Integration

```yaml
inputs_from:
  - content_scheduler (publication events)
  - publications_table (metadata)
  - market_researcher (predictions)

outputs_to:
  - analytics_table (database)
  - market_researcher (learning feedback)
  - notification_system
  - reporting_dashboard

apis:
  - YouTube Analytics API
  - TikTok Analytics API
  - Supabase (storage)
```

---

*Agent Version: 1.0.0*
*Last Updated: 2025-12-23*
