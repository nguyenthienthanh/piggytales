# Skill: Database Operations

**Skill ID:** database-operations
**Category:** Infrastructure
**Priority:** High

## Overview

This skill enables Claude to perform CRUD operations on the PiggyTales Supabase database using the Supabase MCP server.

## Triggers

- `/tale db` commands
- Project creation/updates
- Asset tracking
- Publication management

## Available Operations

### Project Operations

**Create Project:**
```sql
INSERT INTO projects (title, content_type, audience, workflow_mode, config)
VALUES (
  'Project Title',
  'audiobook',
  'children',
  'standard',
  '{"complexity": "standard", "auto_approve": false, "platforms": ["youtube"], "voice_provider": "vbee", "language": "vi"}'
)
RETURNING *;
```

**Get Project by ID:**
```sql
SELECT * FROM projects WHERE id = 'uuid';
```

**Get Project with Relations:**
```sql
SELECT
  p.*,
  (SELECT json_agg(ph.* ORDER BY ph.phase_order) FROM phases ph WHERE ph.project_id = p.id) as phases,
  (SELECT json_agg(a.*) FROM assets a WHERE a.project_id = p.id AND a.is_latest = true) as assets,
  (SELECT json_agg(pub.*) FROM publications pub WHERE pub.project_id = p.id) as publications
FROM projects p
WHERE p.id = $1;
```

**Update Project Status:**
```sql
UPDATE projects
SET status = 'producing', started_at = NOW()
WHERE id = 'uuid'
RETURNING *;
```

**List Active Projects:**
```sql
SELECT * FROM project_summary
WHERE status NOT IN ('archived')
ORDER BY updated_at DESC
LIMIT 20;
```

### Phase Operations

**Initialize Phases for Project:**
```sql
INSERT INTO phases (project_id, phase_name, phase_order, status)
VALUES
  ('project-uuid', 'discovery', 1, 'pending'),
  ('project-uuid', 'script', 2, 'pending'),
  ('project-uuid', 'asset', 3, 'pending'),
  ('project-uuid', 'production', 4, 'pending'),
  ('project-uuid', 'review', 5, 'pending')
RETURNING *;
```

**Update Phase Status:**
```sql
UPDATE phases
SET
  status = 'in_progress',
  started_at = NOW()
WHERE project_id = 'uuid' AND phase_name = 'script'
RETURNING *;
```

**Complete Phase:**
```sql
UPDATE phases
SET
  status = 'completed',
  completed_at = NOW(),
  duration_seconds = EXTRACT(EPOCH FROM (NOW() - started_at)),
  council_score = 8.5,
  human_approved = true
WHERE project_id = 'uuid' AND phase_name = 'script'
RETURNING *;
```

### Asset Operations

**Create Asset:**
```sql
INSERT INTO assets (
  project_id, phase_id, asset_type, name, prompt, source_api, status
)
VALUES (
  'project-uuid',
  'phase-uuid',
  'script',
  'Full Script v1',
  null,
  'manual',
  'completed'
)
RETURNING *;
```

**Get Assets by Project:**
```sql
SELECT * FROM assets
WHERE project_id = 'uuid' AND is_latest = true
ORDER BY asset_type, created_at DESC;
```

**Update Asset Status:**
```sql
UPDATE assets
SET
  status = 'completed',
  file_url = 'https://storage.example.com/file.mp3',
  storage_path = 'projects/uuid/voice/chapter-01.mp3',
  quality_score = 9.0
WHERE id = 'asset-uuid'
RETURNING *;
```

**Create Asset Version:**
```sql
-- Mark previous as not latest
UPDATE assets SET is_latest = false WHERE id = 'old-asset-uuid';

-- Insert new version
INSERT INTO assets (
  project_id, phase_id, asset_type, name, parent_id, version, status
)
SELECT
  project_id, phase_id, asset_type,
  name, id, version + 1, 'pending'
FROM assets WHERE id = 'old-asset-uuid'
RETURNING *;
```

### Publication Operations

**Schedule Publication:**
```sql
INSERT INTO publications (
  project_id, platform, title, description, tags, status, scheduled_at
)
VALUES (
  'project-uuid',
  'youtube',
  'Amazing Story for Kids',
  'Join Piggy and Shroom on an adventure...',
  ARRAY['bedtime', 'story', 'kids'],
  'scheduled',
  '2025-01-15 18:00:00+07'
)
RETURNING *;
```

**Update to Published:**
```sql
UPDATE publications
SET
  status = 'published',
  published_at = NOW(),
  platform_id = 'youtube-video-id',
  platform_url = 'https://youtube.com/watch?v=...'
WHERE id = 'publication-uuid'
RETURNING *;
```

**Get Publication Performance:**
```sql
SELECT * FROM publication_performance
WHERE project_id = 'uuid';
```

### Analytics Operations

**Record Analytics Snapshot:**
```sql
INSERT INTO analytics (
  publication_id, views, likes, comments, shares, engagement_rate
)
VALUES (
  'publication-uuid',
  1500, 120, 25, 15,
  (120.0 + 25.0 + 15.0) / 1500.0
)
RETURNING *;
```

**Get Analytics History:**
```sql
SELECT * FROM analytics
WHERE publication_id = 'uuid'
ORDER BY fetched_at DESC
LIMIT 10;
```

### Template & Prompt Library

**Get Templates:**
```sql
SELECT * FROM templates
WHERE content_type = 'audiobook' AND audience = 'children'
ORDER BY success_rate DESC;
```

**Get Prompts by Category:**
```sql
SELECT * FROM prompt_library
WHERE category = 'character' AND provider = 'dalle'
ORDER BY usage_count DESC;
```

**Update Prompt Usage:**
```sql
UPDATE prompt_library
SET usage_count = usage_count + 1
WHERE id = 'prompt-uuid';
```

### Trend Operations

**Get Active Trends:**
```sql
SELECT * FROM trends
WHERE expires_at > NOW()
  AND platform = 'youtube'
  AND region = 'VN'
ORDER BY fetched_at DESC;
```

**Insert New Trend Data:**
```sql
INSERT INTO trends (
  platform, category, region, keywords, trending_topics, recommendations, expires_at
)
VALUES (
  'youtube',
  'children',
  'VN',
  ARRAY['bedtime', 'stories', 'animals'],
  '{"topics": [{"name": "Animal adventures", "score": 92}]}',
  '{"content_gaps": ["Vietnamese animation"], "focus": ["educational"]}',
  NOW() + INTERVAL '7 days'
)
RETURNING *;
```

## Command Reference

| Command | Description |
|---------|-------------|
| `/tale db status` | Show database connection status |
| `/tale db projects` | List all projects |
| `/tale db project <id>` | Show project details |
| `/tale db assets <project-id>` | List project assets |
| `/tale db publications` | List all publications |
| `/tale db analytics <pub-id>` | Show publication analytics |
| `/tale db trends` | Show active trends |
| `/tale db templates` | List available templates |
| `/tale db prompts <category>` | List prompts by category |

## Error Handling

When database operations fail:

1. Check connection status
2. Verify table exists
3. Check for constraint violations
4. Review Supabase logs

## Best Practices

1. Always use parameterized queries
2. Include RETURNING clause for inserts/updates
3. Use transactions for multi-table operations
4. Check for existing records before insert
5. Use views for complex queries

## Security Notes

1. Service role key bypasses RLS - use carefully
2. Never expose keys in logs or outputs
3. Sanitize user inputs before queries
4. Audit sensitive operations
