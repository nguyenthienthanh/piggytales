# PiggyTales Supabase Setup Guide

This guide walks you through setting up Supabase as the database backend for PiggyTales.

## Prerequisites

- A Supabase account (free tier works)
- Node.js 18+ installed
- Claude Code with MCP support

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Name:** `piggytales`
   - **Database Password:** (save this securely)
   - **Region:** Choose closest to your users
4. Click "Create new project" and wait for setup

## Step 2: Get API Credentials

1. In your Supabase dashboard, go to **Settings > API**
2. Copy these values:
   - **Project URL** → `SUPABASE_URL`
   - **service_role key** (under "Project API keys") → `SUPABASE_SERVICE_KEY`
   - **anon public key** → `SUPABASE_ANON_KEY`

## Step 3: Configure Environment

1. Copy the environment template:
   ```bash
   cd /path/to/piggytales
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_KEY=your-service-role-key
   SUPABASE_ANON_KEY=your-anon-key
   ```

## Step 4: Run Database Migrations

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project → **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `database/migrations/001_initial_schema.sql`
4. Click "Run" (or press Cmd/Ctrl + Enter)
5. Repeat for `database/seeds/001_initial_data.sql`

### Option B: Using Setup Script

```bash
./scripts/setup/setup-supabase.sh
```

### Option C: Using Supabase CLI

```bash
# Install Supabase CLI
brew install supabase/tap/supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

## Step 5: Verify Setup

1. In Supabase Dashboard, go to **Table Editor**
2. You should see these tables:
   - `projects`
   - `phases`
   - `assets`
   - `publications`
   - `analytics`
   - `trends`
   - `templates`
   - `prompt_library`
   - `workflow_runs`

3. Check `templates` and `prompt_library` have seed data

## Step 6: Enable MCP Integration

The `.mcp.json` file is already configured. To activate:

1. Restart Claude Code to pick up the MCP configuration
2. Test the connection:
   ```
   Ask Claude: "List all tables in the Supabase database"
   ```

## Database Schema Overview

### Core Tables

| Table | Purpose |
|-------|---------|
| `projects` | Content projects with status, scores, config |
| `phases` | Workflow phases (discovery, script, asset, production) |
| `assets` | Generated content (scripts, images, videos, audio) |
| `publications` | Social media publishing status |
| `analytics` | Performance metrics from platforms |

### Support Tables

| Table | Purpose |
|-------|---------|
| `trends` | Cached trend research data |
| `templates` | Reusable content templates |
| `prompt_library` | AI generation prompt presets |
| `workflow_runs` | Automation run tracking |

### Key Relationships

```
projects
  ├── phases (1:many)
  ├── assets (1:many)
  ├── publications (1:many)
  └── workflow_runs (1:many)

publications
  └── analytics (1:many)

assets
  └── parent_id → assets (versioning)
```

## Realtime Subscriptions

These tables have realtime enabled for live updates:
- `projects`
- `phases`
- `assets`
- `publications`
- `workflow_runs`

## Security Notes

1. **Never commit `.env`** - it's in `.gitignore`
2. **Use service_role key only server-side** - it bypasses RLS
3. **For production**, implement proper Row Level Security policies

## Troubleshooting

### "Permission denied" errors
- Make sure you're using the `service_role` key, not the `anon` key
- Check that RLS policies are created (see migration file)

### "Table not found" errors
- Run migrations in order: schema first, then seeds
- Check SQL Editor for any error messages

### MCP not connecting
- Verify `.mcp.json` is in project root
- Restart Claude Code after adding MCP config
- Check environment variables are set

## Next Steps

After setup, you can:

1. Create your first project:
   ```
   /tale new audiobook "My First Story"
   ```

2. Check database:
   ```
   Ask Claude: "Show me all projects in the database"
   ```

3. Proceed to MCP integration testing (see next section)

---

*Last updated: 2025-12-23*
