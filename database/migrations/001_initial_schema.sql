-- PiggyTales Database Schema
-- Migration: 001_initial_schema
-- Description: Core tables for content management system
-- Created: 2025-12-23

-- ===========================================
-- EXTENSIONS
-- ===========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- ENUM TYPES
-- ===========================================

-- Content types
CREATE TYPE content_type AS ENUM (
  'audiobook',
  'animation',
  'short',
  'music-video'
);

-- Target audiences
CREATE TYPE audience_type AS ENUM (
  'children',
  'teenagers',
  'family',
  'young-adult'
);

-- Workflow modes
CREATE TYPE workflow_mode AS ENUM (
  'full',
  'standard',
  'lite',
  'express',
  'custom'
);

-- Project status
CREATE TYPE project_status AS ENUM (
  'draft',
  'researching',
  'scripting',
  'producing',
  'reviewing',
  'scheduled',
  'published',
  'archived'
);

-- Phase status
CREATE TYPE phase_status AS ENUM (
  'pending',
  'in_progress',
  'completed',
  'skipped',
  'failed'
);

-- Asset types
CREATE TYPE asset_type AS ENUM (
  'script',
  'image',
  'video',
  'voice',
  'music',
  'sfx',
  'thumbnail',
  'prompt'
);

-- Asset generation status
CREATE TYPE asset_status AS ENUM (
  'pending',
  'generating',
  'completed',
  'failed',
  'cancelled'
);

-- API providers
CREATE TYPE api_provider AS ENUM (
  'vbee',
  'elevenlabs',
  'veo3',
  'suno',
  'dalle',
  'midjourney',
  'leonardo',
  'stable-diffusion',
  'manual'
);

-- Publication status
CREATE TYPE publication_status AS ENUM (
  'draft',
  'scheduled',
  'publishing',
  'published',
  'failed',
  'unpublished'
);

-- Platform types
CREATE TYPE platform_type AS ENUM (
  'youtube',
  'youtube_shorts',
  'tiktok',
  'instagram',
  'facebook'
);

-- ===========================================
-- CORE TABLES
-- ===========================================

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  content_type content_type NOT NULL,
  audience audience_type NOT NULL DEFAULT 'children',
  workflow_mode workflow_mode NOT NULL DEFAULT 'standard',
  status project_status NOT NULL DEFAULT 'draft',

  -- Scoring
  viral_score DECIMAL(4,2),
  safety_score DECIMAL(4,2),
  quality_score DECIMAL(4,2),

  -- Research data
  trend_data JSONB DEFAULT '{}',
  success_prediction DECIMAL(4,2),

  -- Configuration
  config JSONB DEFAULT '{
    "complexity": "standard",
    "auto_approve": false,
    "platforms": ["youtube"],
    "voice_provider": "vbee",
    "language": "vi"
  }',

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,

  -- Metadata
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}'
);

-- Create slug from title
CREATE OR REPLACE FUNCTION generate_project_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL THEN
    NEW.slug := LOWER(REGEXP_REPLACE(NEW.title, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || SUBSTRING(NEW.id::TEXT, 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_project_slug
  BEFORE INSERT ON projects
  FOR EACH ROW
  EXECUTE FUNCTION generate_project_slug();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ===========================================
-- PHASES TABLE
-- ===========================================

CREATE TABLE phases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  phase_name TEXT NOT NULL, -- discovery, script, asset, production, review
  phase_order INT NOT NULL,
  status phase_status NOT NULL DEFAULT 'pending',

  -- Timing
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  duration_seconds INT,

  -- Review data
  council_score DECIMAL(4,2),
  council_feedback JSONB DEFAULT '{}',
  human_approved BOOLEAN DEFAULT FALSE,
  human_feedback TEXT,

  -- Agents used
  agents_used TEXT[] DEFAULT '{}',

  -- Artifacts produced
  artifacts JSONB DEFAULT '{}',

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(project_id, phase_name)
);

CREATE TRIGGER update_phases_updated_at
  BEFORE UPDATE ON phases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ===========================================
-- ASSETS TABLE
-- ===========================================

CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES phases(id) ON DELETE SET NULL,

  -- Asset info
  asset_type asset_type NOT NULL,
  name TEXT NOT NULL,
  description TEXT,

  -- Generation
  prompt TEXT,
  source_api api_provider,
  api_request JSONB DEFAULT '{}',
  api_response JSONB DEFAULT '{}',

  -- Storage
  file_url TEXT,
  storage_path TEXT,
  file_size_bytes BIGINT,
  mime_type TEXT,
  duration_seconds DECIMAL(10,2),

  -- Versioning
  version INT NOT NULL DEFAULT 1,
  parent_id UUID REFERENCES assets(id),
  is_latest BOOLEAN DEFAULT TRUE,

  -- Status
  status asset_status NOT NULL DEFAULT 'pending',
  error_message TEXT,

  -- Quality
  quality_score DECIMAL(4,2),

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_assets_project ON assets(project_id);
CREATE INDEX idx_assets_type ON assets(asset_type);
CREATE INDEX idx_assets_status ON assets(status);

CREATE TRIGGER update_assets_updated_at
  BEFORE UPDATE ON assets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ===========================================
-- PUBLICATIONS TABLE
-- ===========================================

CREATE TABLE publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  -- Platform info
  platform platform_type NOT NULL,
  platform_id TEXT, -- Video ID on platform
  platform_url TEXT,

  -- Status
  status publication_status NOT NULL DEFAULT 'draft',

  -- Scheduling
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,

  -- Content
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  thumbnail_url TEXT,

  -- Platform-specific metadata
  platform_metadata JSONB DEFAULT '{}',

  -- Response from platform
  publish_response JSONB DEFAULT '{}',
  error_message TEXT,

  -- Metadata
  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(project_id, platform)
);

CREATE INDEX idx_publications_platform ON publications(platform);
CREATE INDEX idx_publications_status ON publications(status);
CREATE INDEX idx_publications_scheduled ON publications(scheduled_at);

CREATE TRIGGER update_publications_updated_at
  BEFORE UPDATE ON publications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ===========================================
-- ANALYTICS TABLE
-- ===========================================

CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  publication_id UUID NOT NULL REFERENCES publications(id) ON DELETE CASCADE,

  -- Metrics
  views BIGINT DEFAULT 0,
  likes BIGINT DEFAULT 0,
  dislikes BIGINT DEFAULT 0,
  comments BIGINT DEFAULT 0,
  shares BIGINT DEFAULT 0,
  saves BIGINT DEFAULT 0,

  -- Calculated metrics
  engagement_rate DECIMAL(6,4),
  watch_time_seconds BIGINT,
  avg_view_duration DECIMAL(10,2),

  -- Demographics (if available)
  demographics JSONB DEFAULT '{}',

  -- Traffic sources
  traffic_sources JSONB DEFAULT '{}',

  -- Snapshot time
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Raw API response
  raw_data JSONB DEFAULT '{}'
);

CREATE INDEX idx_analytics_publication ON analytics(publication_id);
CREATE INDEX idx_analytics_fetched ON analytics(fetched_at);

-- ===========================================
-- TRENDS TABLE
-- ===========================================

CREATE TABLE trends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Source info
  platform platform_type,
  category TEXT,
  region TEXT DEFAULT 'VN',

  -- Trend data
  keywords TEXT[] DEFAULT '{}',
  trending_topics JSONB DEFAULT '{}',
  viral_indicators JSONB DEFAULT '{}',

  -- Competitor analysis
  top_content JSONB DEFAULT '{}',
  content_gaps JSONB DEFAULT '{}',

  -- Recommendations
  recommendations JSONB DEFAULT '{}',

  -- Validity
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),

  -- Raw data
  raw_data JSONB DEFAULT '{}'
);

CREATE INDEX idx_trends_platform ON trends(platform);
CREATE INDEX idx_trends_expires ON trends(expires_at);

-- ===========================================
-- TEMPLATES TABLE
-- ===========================================

CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Template info
  name TEXT NOT NULL,
  description TEXT,
  content_type content_type,
  audience audience_type,

  -- Template data
  template_data JSONB NOT NULL DEFAULT '{}',

  -- Usage stats
  usage_count INT DEFAULT 0,
  success_rate DECIMAL(5,2),
  avg_viral_score DECIMAL(4,2),

  -- Metadata
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ===========================================
-- PROMPT LIBRARY TABLE
-- ===========================================

CREATE TABLE prompt_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Prompt info
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- character, scene, style, music, voice
  provider api_provider,

  -- Prompt content
  prompt_template TEXT NOT NULL,
  variables TEXT[] DEFAULT '{}',

  -- Usage stats
  usage_count INT DEFAULT 0,
  avg_quality_score DECIMAL(4,2),

  -- Examples
  example_outputs JSONB DEFAULT '{}',

  -- Metadata
  tags TEXT[] DEFAULT '{}',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_prompts_category ON prompt_library(category);
CREATE INDEX idx_prompts_provider ON prompt_library(provider);

-- ===========================================
-- WORKFLOW RUNS TABLE (for tracking automation)
-- ===========================================

CREATE TABLE workflow_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  -- Workflow info
  workflow_name TEXT NOT NULL,
  workflow_mode workflow_mode NOT NULL,

  -- Status
  status TEXT NOT NULL DEFAULT 'running', -- running, completed, failed, cancelled
  current_stage TEXT,

  -- Progress
  stages_completed TEXT[] DEFAULT '{}',
  stages_pending TEXT[] DEFAULT '{}',

  -- Timing
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  -- Results
  final_scores JSONB DEFAULT '{}',
  errors JSONB DEFAULT '{}',

  -- Logs
  logs JSONB DEFAULT '[]',

  -- Metadata
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_workflow_runs_project ON workflow_runs(project_id);
CREATE INDEX idx_workflow_runs_status ON workflow_runs(status);

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_runs ENABLE ROW LEVEL SECURITY;

-- For now, allow all operations (will be refined with auth)
CREATE POLICY "Allow all operations" ON projects FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON phases FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON assets FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON publications FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON analytics FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON trends FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON templates FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON prompt_library FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON workflow_runs FOR ALL USING (true);

-- ===========================================
-- REALTIME SUBSCRIPTIONS
-- ===========================================

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE phases;
ALTER PUBLICATION supabase_realtime ADD TABLE assets;
ALTER PUBLICATION supabase_realtime ADD TABLE publications;
ALTER PUBLICATION supabase_realtime ADD TABLE workflow_runs;

-- ===========================================
-- VIEWS
-- ===========================================

-- Project summary view
CREATE VIEW project_summary AS
SELECT
  p.id,
  p.title,
  p.slug,
  p.content_type,
  p.audience,
  p.status,
  p.viral_score,
  p.success_prediction,
  p.created_at,
  p.published_at,
  COUNT(DISTINCT ph.id) FILTER (WHERE ph.status = 'completed') as completed_phases,
  COUNT(DISTINCT a.id) as total_assets,
  COUNT(DISTINCT pub.id) FILTER (WHERE pub.status = 'published') as published_platforms
FROM projects p
LEFT JOIN phases ph ON ph.project_id = p.id
LEFT JOIN assets a ON a.project_id = p.id
LEFT JOIN publications pub ON pub.project_id = p.id
GROUP BY p.id;

-- Recent publications with analytics
CREATE VIEW publication_performance AS
SELECT
  pub.id,
  pub.project_id,
  p.title as project_title,
  pub.platform,
  pub.status,
  pub.published_at,
  COALESCE(
    (SELECT views FROM analytics WHERE publication_id = pub.id ORDER BY fetched_at DESC LIMIT 1),
    0
  ) as latest_views,
  COALESCE(
    (SELECT engagement_rate FROM analytics WHERE publication_id = pub.id ORDER BY fetched_at DESC LIMIT 1),
    0
  ) as latest_engagement
FROM publications pub
JOIN projects p ON p.id = pub.project_id
WHERE pub.status = 'published';
