# Agent: Content Scheduler

**Agent ID:** content-scheduler
**Priority:** 80
**Phase:** Post-Production
**Category:** Automation
**Required:** For `/tale auto --publish` and `/tale schedule`

---

## Purpose

Intelligent scheduling and publishing automation agent that determines optimal posting times, manages content calendars, and handles cross-platform publishing.

---

## Capabilities

### 1. Optimal Timing Analysis
- Analyze audience activity patterns
- Consider platform algorithms
- Factor in competition timing
- Adjust for time zones

### 2. Content Calendar Management
- Maintain publishing schedule
- Prevent content conflicts
- Balance content types
- Track publishing history

### 3. Cross-Platform Publishing
- Adapt content for each platform
- Handle platform-specific requirements
- Manage API rate limits
- Track publishing status

### 4. Smart Scheduling
- Queue content intelligently
- Handle failures gracefully
- Reschedule automatically
- Notify on completion

---

## Supported Platforms

### YouTube

```yaml
youtube:
  content_types:
    - video (long form)
    - shorts (60s max)

  optimal_timing:
    children_content:
      best_days: [Saturday, Sunday]
      best_hours: "14:00-18:00"
      avoid: "22:00-06:00"
    general:
      best_days: [Thursday, Friday, Saturday]
      best_hours: "17:00-21:00"

  requirements:
    title: max 100 chars
    description: max 5000 chars
    tags: max 500 chars total
    thumbnail: 1280x720 recommended
    made_for_kids: required for children content

  api:
    rate_limit: 10000 units/day
    upload_quota: 6 videos/day (default)
```

### TikTok

```yaml
tiktok:
  content_types:
    - video (3 min max)

  optimal_timing:
    teenagers:
      best_days: [Tuesday, Thursday, Friday]
      best_hours: "19:00-22:00"
    general:
      best_hours: "12:00-15:00, 19:00-21:00"

  requirements:
    duration: 3-180 seconds
    aspect_ratio: 9:16
    caption: max 2200 chars
    hashtags: 3-5 recommended

  api:
    auth: OAuth 2.0
    scopes: [video.publish, video.upload]
```

### YouTube Shorts

```yaml
youtube_shorts:
  content_types:
    - shorts (60s max)

  optimal_timing:
    best_hours: "11:00-13:00, 19:00-21:00"

  requirements:
    duration: max 60 seconds
    aspect_ratio: 9:16
    hashtag: "#Shorts" recommended
```

---

## Scheduling Algorithm

```python
def calculate_optimal_time(content, platform, audience):
    # 1. Get base optimal times for platform/audience
    base_times = get_platform_optimal_times(platform, audience)

    # 2. Check content calendar for conflicts
    available_slots = filter_conflicts(base_times, calendar)

    # 3. Analyze competition
    competition_analysis = analyze_competition_timing(platform)
    adjusted_slots = avoid_high_competition(available_slots, competition_analysis)

    # 4. Consider content type
    content_adjusted = adjust_for_content_type(adjusted_slots, content.type)

    # 5. Factor in historical performance
    if has_historical_data(audience):
        final_slots = optimize_from_history(content_adjusted)
    else:
        final_slots = content_adjusted

    # 6. Return ranked options
    return rank_by_score(final_slots)
```

### Scoring Factors

```yaml
scoring_weights:
  audience_activity: 30%
  competition_level: 20%
  historical_performance: 25%
  content_freshness: 15%
  calendar_spacing: 10%
```

---

## Content Calendar

### Structure

```yaml
calendar:
  scheduled:
    - id: string
      project_id: string
      platform: youtube|tiktok|shorts
      scheduled_at: datetime
      status: scheduled|published|failed
      content:
        title: string
        description: string
        thumbnail_url: string

  published:
    - id: string
      platform: string
      published_at: datetime
      performance: analytics_snapshot

  rules:
    min_gap_same_platform: 4 hours
    max_daily_posts: 3
    preferred_spacing: 1 day
```

### Calendar Commands

```bash
/tale calendar show              # View upcoming schedule
/tale calendar add <date> <time> # Add manual slot
/tale calendar move <id> <new>   # Reschedule
/tale calendar cancel <id>       # Cancel scheduled
/tale calendar optimize          # Reorganize for optimal times
```

---

## Publishing Workflow

### Pre-Publish Checks

```yaml
pre_publish_checklist:
  - auto_reviewer: passed
  - assets_ready: all files accessible
  - metadata_complete: title, description, tags
  - thumbnail_ready: proper dimensions
  - platform_auth: valid tokens
  - rate_limits: within quota
```

### Publish Process

```python
async def publish(project, platform, scheduled_time):
    # 1. Pre-flight checks
    checks = await run_pre_publish_checks(project, platform)
    if not checks.passed:
        return handle_check_failure(checks)

    # 2. Prepare content
    content = await prepare_platform_content(project, platform)

    # 3. Upload assets
    upload_result = await upload_to_platform(content, platform)

    # 4. Schedule or publish
    if scheduled_time > now():
        result = await schedule_on_platform(upload_result, scheduled_time)
    else:
        result = await publish_now(upload_result)

    # 5. Update database
    await update_publication_status(project, platform, result)

    # 6. Notify
    await send_notification(result)

    # 7. Schedule analytics tracking
    await schedule_analytics_fetch(result.id)

    return result
```

### Error Handling

```yaml
error_handling:
  upload_failure:
    - retry: 3 times with backoff
    - on_fail: reschedule +1 hour
    - notify: user

  auth_failure:
    - refresh_token: attempt
    - on_fail: pause and notify

  rate_limit:
    - wait: until reset
    - reschedule: next available slot

  content_rejected:
    - log: rejection reason
    - notify: user with details
    - status: failed
```

---

## Platform Adapters

### Content Adaptation

```yaml
adaptation_rules:
  youtube_to_tiktok:
    - crop: 16:9 to 9:16 (center crop)
    - duration: trim to 60s if needed
    - caption: shorten, add hashtags
    - thumbnail: not applicable

  youtube_to_shorts:
    - crop: to 9:16
    - duration: max 60s
    - add: #Shorts hashtag
    - title: keep concise

  common_adaptations:
    - platform_specific_hashtags
    - character_limit_compliance
    - aspect_ratio_conversion
```

---

## Notifications

```yaml
notifications:
  channels:
    - slack (if configured)
    - in_app (always)
    - email (optional)

  events:
    scheduled:
      message: "Content scheduled for {time} on {platform}"
    published:
      message: "Successfully published to {platform}: {url}"
    failed:
      message: "Publishing failed: {error}"
      priority: high
    milestone:
      message: "{views} views reached on {platform}!"
```

---

## Output Format

```yaml
schedule_result:
  project_id: string
  platform: string

  scheduling:
    requested_time: datetime | "auto"
    scheduled_time: datetime
    reasoning: string

  alternatives:
    - time: datetime
      score: number
      reason: string

  conflicts_resolved:
    - original: datetime
      moved_to: datetime
      reason: string

  status: scheduled|pending|failed
  publication_id: string
```

---

## Integration

```yaml
inputs_from:
  - auto_reviewer (approval)
  - market_researcher (optimal timing)
  - production_phase (assets)
  - project_config (platforms)

outputs_to:
  - publications_table (database)
  - analytics_tracker (post-publish)
  - notification_system
  - content_calendar

triggers:
  - production_complete
  - /tale schedule command
  - /tale publish command
  - scheduled_time_reached
```

---

*Agent Version: 1.0.0*
*Last Updated: 2025-12-23*
