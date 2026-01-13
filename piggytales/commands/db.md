# Database Commands

Commands for interacting with the PiggyTales Supabase database.

## Command Reference

### `/tale db status`

Check database connection and show statistics.

**Output:**
- Connection status
- Table counts
- Recent activity

### `/tale db projects`

List all projects with summary information.

**Options:**
- `--status <status>` - Filter by status (draft, producing, published, archived)
- `--type <type>` - Filter by content type
- `--audience <audience>` - Filter by audience
- `--limit <n>` - Limit results (default: 20)

**Examples:**
```bash
/tale db projects
/tale db projects --status published
/tale db projects --type audiobook --audience children
```

### `/tale db project <id>`

Show detailed information about a specific project.

**Output:**
- Project details
- All phases with status
- Asset summary
- Publication status
- Viral/quality scores

**Examples:**
```bash
/tale db project abc123
/tale db project my-story-slug
```

### `/tale db assets <project-id>`

List all assets for a project.

**Options:**
- `--type <type>` - Filter by asset type (script, image, video, voice, music, sfx)
- `--status <status>` - Filter by status
- `--latest` - Show only latest versions

**Examples:**
```bash
/tale db assets abc123
/tale db assets abc123 --type voice
/tale db assets abc123 --latest
```

### `/tale db publications`

List all publications with performance data.

**Options:**
- `--platform <platform>` - Filter by platform
- `--status <status>` - Filter by status
- `--period <period>` - Time period (7d, 30d, 90d)

**Examples:**
```bash
/tale db publications
/tale db publications --platform youtube --status published
```

### `/tale db analytics <publication-id>`

Show analytics history for a publication.

**Options:**
- `--period <period>` - Time period
- `--export` - Export to CSV

**Examples:**
```bash
/tale db analytics pub123
/tale db analytics pub123 --period 30d
```

### `/tale db trends`

Show active trend data.

**Options:**
- `--platform <platform>` - Filter by platform
- `--refresh` - Fetch fresh data

**Examples:**
```bash
/tale db trends
/tale db trends --platform tiktok
/tale db trends --refresh
```

### `/tale db templates`

List available content templates.

**Options:**
- `--type <type>` - Filter by content type
- `--audience <audience>` - Filter by audience

**Examples:**
```bash
/tale db templates
/tale db templates --type audiobook
```

### `/tale db prompts <category>`

List prompts from the prompt library.

**Categories:**
- `character` - Character generation prompts
- `scene` - Scene/background prompts
- `music` - Music generation prompts
- `voice` - Voice style prompts
- `style` - Visual style presets

**Options:**
- `--provider <provider>` - Filter by API provider

**Examples:**
```bash
/tale db prompts character
/tale db prompts music --provider suno
```

### `/tale db sync`

Sync local project files with database.

**Options:**
- `--force` - Overwrite conflicts
- `--dry-run` - Preview changes

**Examples:**
```bash
/tale db sync
/tale db sync --dry-run
```

### `/tale db backup`

Create a backup of project data.

**Options:**
- `--output <path>` - Output file path
- `--format <format>` - json or sql

**Examples:**
```bash
/tale db backup
/tale db backup --output backup.json
```

## Usage Notes

1. Database commands require Supabase MCP to be configured
2. Use `--help` with any command for more details
3. All data is stored in Supabase cloud
4. Local files are synced on demand

## Aliases

| Alias | Full Command |
|-------|--------------|
| `/tale db` | `/tale database` |
| `/tale db p` | `/tale db projects` |
| `/tale db a` | `/tale db assets` |
| `/tale db t` | `/tale db trends` |
