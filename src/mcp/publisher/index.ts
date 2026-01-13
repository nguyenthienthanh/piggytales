/**
 * PiggyTales Publisher MCP Server
 *
 * Multi-platform publishing capabilities via MCP.
 * Supports YouTube, TikTok, and YouTube Shorts.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

// ===========================================
// TYPES
// ===========================================

interface PublishConfig {
  youtube: {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  };
  tiktok: {
    clientKey: string;
    clientSecret: string;
    accessToken: string;
  };
}

interface VideoMetadata {
  title: string;
  description: string;
  tags: string[];
  category?: string;
  privacy?: 'public' | 'unlisted' | 'private';
  madeForKids?: boolean;
  thumbnailPath?: string;
  scheduledAt?: string;
}

interface PublishResult {
  success: boolean;
  platform: string;
  videoId?: string;
  url?: string;
  status: 'published' | 'scheduled' | 'processing' | 'failed';
  error?: string;
  metadata?: Record<string, unknown>;
}

interface ScheduleResult {
  success: boolean;
  scheduledTime: string;
  publicationId: string;
  platform: string;
}

// ===========================================
// TOOLS DEFINITION
// ===========================================

const tools: Tool[] = [
  {
    name: 'publisher_upload_youtube',
    description: `Upload a video to YouTube.

Requirements:
- Video file path (local)
- Title, description, tags
- Thumbnail (recommended)
- Made for Kids setting (required for children's content)

Note: Videos are private by default until explicitly published.`,
    inputSchema: {
      type: 'object',
      properties: {
        videoPath: {
          type: 'string',
          description: 'Local path to the video file',
        },
        title: {
          type: 'string',
          description: 'Video title (max 100 characters)',
          maxLength: 100,
        },
        description: {
          type: 'string',
          description: 'Video description (max 5000 characters)',
          maxLength: 5000,
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Video tags (max 500 characters total)',
        },
        thumbnailPath: {
          type: 'string',
          description: 'Local path to thumbnail image (1280x720 recommended)',
        },
        madeForKids: {
          type: 'boolean',
          description: 'Is this content made for kids? Required for children\'s content.',
          default: true,
        },
        privacy: {
          type: 'string',
          enum: ['public', 'unlisted', 'private'],
          description: 'Privacy setting. Default: private',
          default: 'private',
        },
        scheduledAt: {
          type: 'string',
          description: 'ISO datetime to schedule publish. If not provided, publishes immediately when privacy is public.',
        },
        playlist: {
          type: 'string',
          description: 'Playlist ID to add the video to',
        },
      },
      required: ['videoPath', 'title', 'description', 'tags', 'madeForKids'],
    },
  },
  {
    name: 'publisher_upload_tiktok',
    description: `Upload a video to TikTok.

Requirements:
- Video file (9:16 aspect ratio, max 3 minutes)
- Caption with hashtags

Note: TikTok API has strict requirements for video format.`,
    inputSchema: {
      type: 'object',
      properties: {
        videoPath: {
          type: 'string',
          description: 'Local path to the video file',
        },
        caption: {
          type: 'string',
          description: 'Video caption with hashtags (max 2200 characters)',
          maxLength: 2200,
        },
        privacy: {
          type: 'string',
          enum: ['public', 'friends', 'private'],
          description: 'Privacy setting',
          default: 'public',
        },
        disableComments: {
          type: 'boolean',
          description: 'Disable comments on the video',
          default: false,
        },
        disableDuet: {
          type: 'boolean',
          description: 'Disable duet feature',
          default: false,
        },
        disableStitch: {
          type: 'boolean',
          description: 'Disable stitch feature',
          default: false,
        },
      },
      required: ['videoPath', 'caption'],
    },
  },
  {
    name: 'publisher_schedule',
    description: 'Schedule a video for future publishing',
    inputSchema: {
      type: 'object',
      properties: {
        platform: {
          type: 'string',
          enum: ['youtube', 'tiktok', 'youtube_shorts'],
          description: 'Target platform',
        },
        videoPath: {
          type: 'string',
          description: 'Local path to the video file',
        },
        metadata: {
          type: 'object',
          description: 'Platform-specific metadata (title, description, etc.)',
        },
        scheduledAt: {
          type: 'string',
          description: 'ISO datetime for scheduled publish',
        },
      },
      required: ['platform', 'videoPath', 'metadata', 'scheduledAt'],
    },
  },
  {
    name: 'publisher_check_status',
    description: 'Check the status of an upload or scheduled publish',
    inputSchema: {
      type: 'object',
      properties: {
        platform: {
          type: 'string',
          enum: ['youtube', 'tiktok'],
        },
        videoId: {
          type: 'string',
          description: 'Video ID on the platform',
        },
      },
      required: ['platform', 'videoId'],
    },
  },
  {
    name: 'publisher_update_metadata',
    description: 'Update metadata of a published video',
    inputSchema: {
      type: 'object',
      properties: {
        platform: {
          type: 'string',
          enum: ['youtube', 'tiktok'],
        },
        videoId: {
          type: 'string',
          description: 'Video ID on the platform',
        },
        title: { type: 'string' },
        description: { type: 'string' },
        tags: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      required: ['platform', 'videoId'],
    },
  },
  {
    name: 'publisher_delete',
    description: 'Delete a video from a platform',
    inputSchema: {
      type: 'object',
      properties: {
        platform: {
          type: 'string',
          enum: ['youtube', 'tiktok'],
        },
        videoId: {
          type: 'string',
          description: 'Video ID to delete',
        },
        confirm: {
          type: 'boolean',
          description: 'Confirm deletion (required)',
        },
      },
      required: ['platform', 'videoId', 'confirm'],
    },
  },
  {
    name: 'publisher_get_optimal_time',
    description: 'Get optimal publishing time for content',
    inputSchema: {
      type: 'object',
      properties: {
        platform: {
          type: 'string',
          enum: ['youtube', 'tiktok', 'youtube_shorts'],
        },
        audience: {
          type: 'string',
          enum: ['children', 'teenagers', 'family', 'young-adult'],
        },
        contentType: {
          type: 'string',
          description: 'Type of content',
        },
        timezone: {
          type: 'string',
          description: 'Target timezone (default: Asia/Ho_Chi_Minh)',
        },
      },
      required: ['platform', 'audience'],
    },
  },
  {
    name: 'publisher_validate_video',
    description: 'Validate video meets platform requirements before upload',
    inputSchema: {
      type: 'object',
      properties: {
        videoPath: {
          type: 'string',
          description: 'Local path to the video file',
        },
        platform: {
          type: 'string',
          enum: ['youtube', 'tiktok', 'youtube_shorts'],
        },
      },
      required: ['videoPath', 'platform'],
    },
  },
];

// ===========================================
// PLATFORM CONFIGURATIONS
// ===========================================

const platformConfigs = {
  youtube: {
    maxTitleLength: 100,
    maxDescriptionLength: 5000,
    maxTagsLength: 500,
    supportedFormats: ['mp4', 'mov', 'avi', 'wmv', 'flv', 'webm'],
    maxFileSize: 256 * 1024 * 1024 * 1024, // 256GB
    thumbnailSize: { width: 1280, height: 720 },
  },
  tiktok: {
    maxCaptionLength: 2200,
    supportedFormats: ['mp4', 'mov'],
    maxDuration: 180, // 3 minutes
    aspectRatio: '9:16',
    maxFileSize: 4 * 1024 * 1024 * 1024, // 4GB
  },
  youtube_shorts: {
    maxDuration: 60,
    aspectRatio: '9:16',
    recommendedHashtag: '#Shorts',
  },
};

const optimalTimes = {
  youtube: {
    children: {
      weekday: ['14:00', '15:00', '16:00', '17:00', '18:00'],
      weekend: ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      best: { day: 'Saturday', time: '16:00' },
    },
    teenagers: {
      weekday: ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
      weekend: ['12:00', '14:00', '16:00', '18:00', '20:00'],
      best: { day: 'Friday', time: '18:00' },
    },
    family: {
      weekday: ['18:00', '19:00', '20:00'],
      weekend: ['10:00', '14:00', '18:00', '19:00', '20:00'],
      best: { day: 'Sunday', time: '19:00' },
    },
  },
  tiktok: {
    children: {
      note: 'TikTok not recommended for young children',
      weekday: [],
      weekend: [],
    },
    teenagers: {
      weekday: ['12:00', '15:00', '19:00', '20:00', '21:00'],
      weekend: ['11:00', '14:00', '19:00', '20:00', '21:00', '22:00'],
      best: { day: 'Thursday', time: '20:00' },
    },
    family: {
      weekday: ['18:00', '19:00', '20:00'],
      weekend: ['12:00', '18:00', '19:00', '20:00'],
      best: { day: 'Saturday', time: '19:00' },
    },
  },
};

// ===========================================
// API FUNCTIONS
// ===========================================

async function uploadToYouTube(params: {
  videoPath: string;
  metadata: VideoMetadata;
}): Promise<PublishResult> {
  // This is a placeholder - actual implementation requires YouTube Data API
  const { videoPath, metadata } = params;

  // Validate
  if (!videoPath) {
    return { success: false, platform: 'youtube', status: 'failed', error: 'Video path required' };
  }

  try {
    // In production, this would:
    // 1. Initialize OAuth2 client
    // 2. Create upload request
    // 3. Upload video in chunks
    // 4. Set metadata
    // 5. Upload thumbnail
    // 6. Return video ID

    console.log(`Uploading to YouTube: ${metadata.title}`);

    // Simulated response
    return {
      success: true,
      platform: 'youtube',
      videoId: `yt_${Date.now()}`,
      url: `https://youtube.com/watch?v=yt_${Date.now()}`,
      status: metadata.scheduledAt ? 'scheduled' : 'processing',
      metadata: {
        uploadedAt: new Date().toISOString(),
        privacy: metadata.privacy || 'private',
        madeForKids: metadata.madeForKids,
      },
    };
  } catch (error) {
    return {
      success: false,
      platform: 'youtube',
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function uploadToTikTok(params: {
  videoPath: string;
  caption: string;
  privacy?: string;
}): Promise<PublishResult> {
  const { videoPath, caption, privacy = 'public' } = params;

  try {
    // In production, this would:
    // 1. Initialize TikTok OAuth
    // 2. Get presigned upload URL
    // 3. Upload video
    // 4. Set caption and settings
    // 5. Publish

    console.log(`Uploading to TikTok: ${caption.substring(0, 50)}...`);

    return {
      success: true,
      platform: 'tiktok',
      videoId: `tt_${Date.now()}`,
      url: `https://tiktok.com/@user/video/tt_${Date.now()}`,
      status: 'processing',
      metadata: {
        uploadedAt: new Date().toISOString(),
        privacy,
      },
    };
  } catch (error) {
    return {
      success: false,
      platform: 'tiktok',
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

function getOptimalTime(
  platform: string,
  audience: string,
  timezone: string = 'Asia/Ho_Chi_Minh'
): { times: string[]; best: { day: string; time: string } } {
  const platformTimes = optimalTimes[platform as keyof typeof optimalTimes];
  if (!platformTimes) {
    return { times: [], best: { day: 'Saturday', time: '18:00' } };
  }

  const audienceTimes = platformTimes[audience as keyof typeof platformTimes];
  if (!audienceTimes) {
    return { times: [], best: { day: 'Saturday', time: '18:00' } };
  }

  return {
    times: [...(audienceTimes.weekday || []), ...(audienceTimes.weekend || [])],
    best: audienceTimes.best || { day: 'Saturday', time: '18:00' },
  };
}

async function validateVideo(
  videoPath: string,
  platform: string
): Promise<{ valid: boolean; issues: string[]; warnings: string[] }> {
  const issues: string[] = [];
  const warnings: string[] = [];

  const config = platformConfigs[platform as keyof typeof platformConfigs];
  if (!config) {
    issues.push(`Unknown platform: ${platform}`);
    return { valid: false, issues, warnings };
  }

  // In production, this would check:
  // - File exists
  // - File format
  // - Duration
  // - Aspect ratio
  // - File size
  // - Video quality

  // Simulated validation
  if (!videoPath.endsWith('.mp4') && !videoPath.endsWith('.mov')) {
    warnings.push('Recommended format is MP4 or MOV');
  }

  if (platform === 'tiktok' || platform === 'youtube_shorts') {
    warnings.push('Ensure video is in 9:16 portrait format');
  }

  return {
    valid: issues.length === 0,
    issues,
    warnings,
  };
}

// ===========================================
// MCP SERVER
// ===========================================

const server = new Server(
  {
    name: 'piggytales-publisher',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'publisher_upload_youtube': {
        const result = await uploadToYouTube({
          videoPath: args.videoPath as string,
          metadata: {
            title: args.title as string,
            description: args.description as string,
            tags: args.tags as string[],
            thumbnailPath: args.thumbnailPath as string,
            madeForKids: args.madeForKids as boolean,
            privacy: args.privacy as 'public' | 'unlisted' | 'private',
            scheduledAt: args.scheduledAt as string,
          },
        });
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      }

      case 'publisher_upload_tiktok': {
        const result = await uploadToTikTok({
          videoPath: args.videoPath as string,
          caption: args.caption as string,
          privacy: args.privacy as string,
        });
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      }

      case 'publisher_get_optimal_time': {
        const result = getOptimalTime(
          args.platform as string,
          args.audience as string,
          args.timezone as string
        );
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      }

      case 'publisher_validate_video': {
        const result = await validateVideo(
          args.videoPath as string,
          args.platform as string
        );
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{ type: 'text', text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('PiggyTales Publisher MCP Server running on stdio');
}

main().catch(console.error);
