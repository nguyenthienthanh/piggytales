# PiggyTales MCP Integration Guide

This guide covers all MCP (Model Context Protocol) integrations for PiggyTales.

## Overview

PiggyTales uses MCP servers to connect Claude with external services:

| Server | Purpose | Status |
|--------|---------|--------|
| **Supabase** | Database operations | Ready |
| **Context7** | Library documentation | Ready |
| **Playwright** | Browser automation | Ready |
| **YouTube** | Video publishing | Ready |
| **Veo3** | Video generation | Planned |
| **Suno** | Music generation | Planned |

## Configuration

The MCP configuration is in `.mcp.json` at the project root:

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
    }
  }
}
```

## Supabase MCP

### Available Tools

| Tool | Description |
|------|-------------|
| `list_tables` | List all tables in database |
| `execute_sql` | Run SQL queries |
| `get_logs` | Get service logs |
| `get_advisors` | Security/performance checks |

### Usage Examples

**Create a new project:**
```sql
INSERT INTO projects (title, content_type, audience)
VALUES ('My Story', 'audiobook', 'children')
RETURNING *;
```

**Get project with phases:**
```sql
SELECT p.*, json_agg(ph.*) as phases
FROM projects p
LEFT JOIN phases ph ON ph.project_id = p.id
WHERE p.id = 'uuid-here'
GROUP BY p.id;
```

**Update project status:**
```sql
UPDATE projects
SET status = 'producing', started_at = NOW()
WHERE id = 'uuid-here'
RETURNING *;
```

**Get recent trends:**
```sql
SELECT * FROM trends
WHERE expires_at > NOW()
  AND platform = 'youtube'
ORDER BY fetched_at DESC
LIMIT 5;
```

**Get templates by content type:**
```sql
SELECT * FROM templates
WHERE content_type = 'audiobook'
ORDER BY success_rate DESC;
```

### Common Queries for PiggyTales

**List all active projects:**
```sql
SELECT * FROM project_summary
WHERE status NOT IN ('archived', 'draft')
ORDER BY updated_at DESC;
```

**Get project with all assets:**
```sql
SELECT
  p.*,
  (SELECT json_agg(a.*) FROM assets a WHERE a.project_id = p.id) as assets,
  (SELECT json_agg(ph.*) FROM phases ph WHERE ph.project_id = p.id) as phases,
  (SELECT json_agg(pub.*) FROM publications pub WHERE pub.project_id = p.id) as publications
FROM projects p
WHERE p.id = $1;
```

**Find high-performing content:**
```sql
SELECT * FROM publication_performance
WHERE latest_views > 1000
ORDER BY latest_engagement DESC;
```

## Context7 MCP

### Purpose
Fetch up-to-date documentation for any library or API.

### Usage

**Get Veo3 documentation:**
```
Use Context7 to find documentation for Google Veo 3.1 video generation API
```

**Get Suno API docs:**
```
Use Context7 to find documentation for Suno V5 music generation API
```

### Supported Libraries
- React, Vue, Next.js
- Supabase, Firebase
- Google APIs (Gemini, Veo)
- Any npm package

## Playwright MCP

### Purpose
Browser automation for research and verification.

### Use Cases

1. **Trend Research**
   - Navigate to YouTube trending
   - Capture trending video titles/thumbnails
   - Analyze competitor channels

2. **Publish Verification**
   - Verify video is live after publishing
   - Capture screenshots for records
   - Check metadata is correct

3. **Analytics Scraping**
   - Get real-time view counts
   - Capture engagement metrics
   - Monitor comments

### Example Usage

**Research trending content:**
```
Use Playwright to:
1. Navigate to youtube.com/feed/trending
2. Take a snapshot of trending videos
3. Extract titles and view counts
```

## YouTube MCP

### Purpose
YouTube Data API integration for video management.

### Available Operations

| Operation | Description |
|-----------|-------------|
| Search | Find videos by keywords |
| Get Video | Fetch video details |
| Get Channel | Fetch channel info |
| Get Subtitles | Extract video captions |

### Usage Examples

**Search for children's content:**
```
Search YouTube for "bedtime stories for kids" in Vietnamese
```

**Analyze competitor video:**
```
Get details for YouTube video ID: abc123
```

## Future Integrations

### Veo3 MCP (Planned)

**Capabilities:**
- Text-to-video generation
- Image-to-video conversion
- Character consistency with reference images
- Audio generation (dialogue, SFX, music)

**API Endpoint:**
```
POST https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-generate-preview:generateVideo
```

**Estimated Cost:**
- $0.40/second with audio
- 60-second video = $24

### Suno MCP (Planned)

**Capabilities:**
- Text-to-music generation
- Lyrics generation
- Style/mood control
- Up to 4 minutes per track

**API Options:**
- Official Suno API (when available)
- Third-party: sunoapi.org, aimlapi.com

### Publisher MCP (Planned)

**Capabilities:**
- YouTube upload with scheduling
- TikTok publishing
- Cross-platform posting
- Unified analytics

## Testing MCP Connections

### Quick Test Commands

**Test Supabase:**
```
Ask Claude: "List all tables in the Supabase database"
```

**Test Context7:**
```
Ask Claude: "Use Context7 to get Supabase documentation for insert operations"
```

**Test Playwright:**
```
Ask Claude: "Use Playwright to navigate to google.com and take a snapshot"
```

**Test YouTube:**
```
Ask Claude: "Search YouTube for children's stories in Vietnamese"
```

## Troubleshooting

### MCP Server Not Found

1. Check `.mcp.json` exists in project root
2. Restart Claude Code
3. Verify npm packages are available

### Environment Variables Not Set

1. Check `.env` file exists
2. Verify variable names match `.mcp.json`
3. Run `source .env` if using shell

### Permission Errors

1. Use `service_role` key for Supabase (not `anon`)
2. Check API key permissions
3. Verify rate limits not exceeded

### Connection Timeouts

1. Check network connectivity
2. Verify API endpoints are correct
3. Check for service outages

## Security Best Practices

1. **Never commit API keys**
   - Use `.env` file (gitignored)
   - Use environment variables in MCP config

2. **Use least privilege**
   - Read-only where possible
   - Limit API scopes

3. **Audit MCP operations**
   - Log all database changes
   - Review Supabase logs regularly

4. **Rotate keys regularly**
   - Update keys quarterly
   - Revoke unused keys

---

*Last updated: 2025-12-23*
