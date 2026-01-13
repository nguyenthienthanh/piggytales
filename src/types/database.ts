/**
 * PiggyTales Database Types
 * Auto-generated from Supabase schema
 */

// ===========================================
// ENUMS
// ===========================================

export type ContentType = 'audiobook' | 'animation' | 'short' | 'music-video';

export type AudienceType = 'children' | 'teenagers' | 'family' | 'young-adult';

export type WorkflowMode = 'full' | 'standard' | 'lite' | 'express' | 'custom';

export type ProjectStatus =
  | 'draft'
  | 'researching'
  | 'scripting'
  | 'producing'
  | 'reviewing'
  | 'scheduled'
  | 'published'
  | 'archived';

export type PhaseStatus = 'pending' | 'in_progress' | 'completed' | 'skipped' | 'failed';

export type AssetType = 'script' | 'image' | 'video' | 'voice' | 'music' | 'sfx' | 'thumbnail' | 'prompt';

export type AssetStatus = 'pending' | 'generating' | 'completed' | 'failed' | 'cancelled';

export type ApiProvider =
  | 'vbee'
  | 'elevenlabs'
  | 'veo3'
  | 'suno'
  | 'dalle'
  | 'midjourney'
  | 'leonardo'
  | 'stable-diffusion'
  | 'manual';

export type PublicationStatus = 'draft' | 'scheduled' | 'publishing' | 'published' | 'failed' | 'unpublished';

export type PlatformType = 'youtube' | 'youtube_shorts' | 'tiktok' | 'instagram' | 'facebook';

// ===========================================
// TABLE TYPES
// ===========================================

export interface Project {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  content_type: ContentType;
  audience: AudienceType;
  workflow_mode: WorkflowMode;
  status: ProjectStatus;

  // Scoring
  viral_score: number | null;
  safety_score: number | null;
  quality_score: number | null;

  // Research data
  trend_data: Record<string, unknown>;
  success_prediction: number | null;

  // Configuration
  config: ProjectConfig;

  // Timestamps
  created_at: string;
  updated_at: string;
  started_at: string | null;
  completed_at: string | null;
  published_at: string | null;

  // Metadata
  tags: string[];
  metadata: Record<string, unknown>;
}

export interface ProjectConfig {
  complexity: 'simple' | 'standard' | 'complex';
  auto_approve: boolean;
  platforms: PlatformType[];
  voice_provider: 'vbee' | 'elevenlabs';
  language: 'vi' | 'en';
}

export interface Phase {
  id: string;
  project_id: string;

  phase_name: string;
  phase_order: number;
  status: PhaseStatus;

  // Timing
  started_at: string | null;
  completed_at: string | null;
  duration_seconds: number | null;

  // Review data
  council_score: number | null;
  council_feedback: Record<string, unknown>;
  human_approved: boolean;
  human_feedback: string | null;

  // Agents used
  agents_used: string[];

  // Artifacts produced
  artifacts: Record<string, unknown>;

  // Metadata
  metadata: Record<string, unknown>;

  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: string;
  project_id: string;
  phase_id: string | null;

  // Asset info
  asset_type: AssetType;
  name: string;
  description: string | null;

  // Generation
  prompt: string | null;
  source_api: ApiProvider | null;
  api_request: Record<string, unknown>;
  api_response: Record<string, unknown>;

  // Storage
  file_url: string | null;
  storage_path: string | null;
  file_size_bytes: number | null;
  mime_type: string | null;
  duration_seconds: number | null;

  // Versioning
  version: number;
  parent_id: string | null;
  is_latest: boolean;

  // Status
  status: AssetStatus;
  error_message: string | null;

  // Quality
  quality_score: number | null;

  // Metadata
  metadata: Record<string, unknown>;

  created_at: string;
  updated_at: string;
}

export interface Publication {
  id: string;
  project_id: string;

  // Platform info
  platform: PlatformType;
  platform_id: string | null;
  platform_url: string | null;

  // Status
  status: PublicationStatus;

  // Scheduling
  scheduled_at: string | null;
  published_at: string | null;

  // Content
  title: string;
  description: string | null;
  tags: string[];
  thumbnail_url: string | null;

  // Platform-specific metadata
  platform_metadata: Record<string, unknown>;

  // Response from platform
  publish_response: Record<string, unknown>;
  error_message: string | null;

  // Metadata
  metadata: Record<string, unknown>;

  created_at: string;
  updated_at: string;
}

export interface Analytics {
  id: string;
  publication_id: string;

  // Metrics
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  shares: number;
  saves: number;

  // Calculated metrics
  engagement_rate: number | null;
  watch_time_seconds: number | null;
  avg_view_duration: number | null;

  // Demographics
  demographics: Record<string, unknown>;

  // Traffic sources
  traffic_sources: Record<string, unknown>;

  // Snapshot time
  fetched_at: string;

  // Raw API response
  raw_data: Record<string, unknown>;
}

export interface Trend {
  id: string;

  // Source info
  platform: PlatformType | null;
  category: string | null;
  region: string;

  // Trend data
  keywords: string[];
  trending_topics: TrendingTopics;
  viral_indicators: ViralIndicators;

  // Competitor analysis
  top_content: Record<string, unknown>;
  content_gaps: Record<string, unknown>;

  // Recommendations
  recommendations: TrendRecommendations;

  // Validity
  fetched_at: string;
  expires_at: string;

  // Raw data
  raw_data: Record<string, unknown>;
}

export interface TrendingTopics {
  topics: Array<{
    name: string;
    score: number;
  }>;
}

export interface ViralIndicators {
  optimal_duration: string;
  best_posting_time: string;
  engagement_hooks: string[];
}

export interface TrendRecommendations {
  content_gaps: string[];
  avoid: string[];
  focus: string[];
}

export interface Template {
  id: string;

  // Template info
  name: string;
  description: string | null;
  content_type: ContentType | null;
  audience: AudienceType | null;

  // Template data
  template_data: Record<string, unknown>;

  // Usage stats
  usage_count: number;
  success_rate: number | null;
  avg_viral_score: number | null;

  // Metadata
  tags: string[];
  is_public: boolean;

  created_at: string;
  updated_at: string;
}

export interface PromptLibrary {
  id: string;

  // Prompt info
  name: string;
  category: string;
  provider: ApiProvider | null;

  // Prompt content
  prompt_template: string;
  variables: string[];

  // Usage stats
  usage_count: number;
  avg_quality_score: number | null;

  // Examples
  example_outputs: Record<string, unknown>;

  // Metadata
  tags: string[];

  created_at: string;
  updated_at: string;
}

export interface WorkflowRun {
  id: string;
  project_id: string;

  // Workflow info
  workflow_name: string;
  workflow_mode: WorkflowMode;

  // Status
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  current_stage: string | null;

  // Progress
  stages_completed: string[];
  stages_pending: string[];

  // Timing
  started_at: string;
  completed_at: string | null;

  // Results
  final_scores: {
    viral_score?: number;
    safety_score?: number;
    quality_score?: number;
  };
  errors: Record<string, unknown>;

  // Logs
  logs: WorkflowLog[];

  // Metadata
  metadata: Record<string, unknown>;
}

export interface WorkflowLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  agent?: string;
  message: string;
  data?: Record<string, unknown>;
}

// ===========================================
// INSERT TYPES (for creating new records)
// ===========================================

export type ProjectInsert = Omit<Project, 'id' | 'slug' | 'created_at' | 'updated_at'>;
export type PhaseInsert = Omit<Phase, 'id' | 'created_at' | 'updated_at'>;
export type AssetInsert = Omit<Asset, 'id' | 'created_at' | 'updated_at'>;
export type PublicationInsert = Omit<Publication, 'id' | 'created_at' | 'updated_at'>;
export type TemplateInsert = Omit<Template, 'id' | 'created_at' | 'updated_at'>;
export type PromptLibraryInsert = Omit<PromptLibrary, 'id' | 'created_at' | 'updated_at'>;

// ===========================================
// UPDATE TYPES
// ===========================================

export type ProjectUpdate = Partial<Omit<Project, 'id' | 'created_at'>>;
export type PhaseUpdate = Partial<Omit<Phase, 'id' | 'project_id' | 'created_at'>>;
export type AssetUpdate = Partial<Omit<Asset, 'id' | 'project_id' | 'created_at'>>;
export type PublicationUpdate = Partial<Omit<Publication, 'id' | 'project_id' | 'created_at'>>;

// ===========================================
// VIEW TYPES
// ===========================================

export interface ProjectSummary {
  id: string;
  title: string;
  slug: string | null;
  content_type: ContentType;
  audience: AudienceType;
  status: ProjectStatus;
  viral_score: number | null;
  success_prediction: number | null;
  created_at: string;
  published_at: string | null;
  completed_phases: number;
  total_assets: number;
  published_platforms: number;
}

export interface PublicationPerformance {
  id: string;
  project_id: string;
  project_title: string;
  platform: PlatformType;
  status: PublicationStatus;
  published_at: string | null;
  latest_views: number;
  latest_engagement: number;
}
