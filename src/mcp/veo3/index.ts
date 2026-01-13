/**
 * PiggyTales Veo3 MCP Server
 *
 * Provides Google Veo 3.1 video generation capabilities via MCP.
 *
 * @see https://ai.google.dev/gemini-api/docs/video
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

interface Veo3Config {
  apiKey: string;
  model: string;
  defaultAspectRatio: '16:9' | '9:16' | '1:1';
  maxDuration: number;
}

interface GenerateVideoParams {
  prompt: string;
  duration?: number;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  style?: string;
  referenceImages?: string[];
  withAudio?: boolean;
  negativePrompt?: string;
}

interface VideoResult {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  cost?: number;
  metadata?: Record<string, unknown>;
}

// ===========================================
// CONFIGURATION
// ===========================================

const config: Veo3Config = {
  apiKey: process.env.GOOGLE_AI_API_KEY || '',
  model: process.env.VEO3_MODEL || 'veo-3.1-generate-preview',
  defaultAspectRatio: '16:9',
  maxDuration: 8, // seconds per clip
};

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

// ===========================================
// TOOLS DEFINITION
// ===========================================

const tools: Tool[] = [
  {
    name: 'veo3_generate_video',
    description: `Generate a video using Google Veo 3.1.

Features:
- Text-to-video generation
- Native audio generation (dialogue, SFX, music)
- Up to 8 seconds per clip
- Aspect ratios: 16:9 (landscape), 9:16 (portrait/TikTok), 1:1 (square)
- Reference images for character consistency

Cost: $0.40/second with audio

Best practices:
- Be specific about camera movements, lighting, style
- Include style keywords (Pixar, anime, watercolor, etc.)
- For child content, always include "child-friendly, no scary elements"`,
    inputSchema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Detailed description of the video to generate. Include style, lighting, camera movement, and mood.',
        },
        duration: {
          type: 'number',
          description: 'Video duration in seconds (1-8). Default: 5',
          minimum: 1,
          maximum: 8,
        },
        aspectRatio: {
          type: 'string',
          enum: ['16:9', '9:16', '1:1'],
          description: 'Aspect ratio. 16:9 for YouTube, 9:16 for TikTok/Shorts, 1:1 for Instagram',
        },
        style: {
          type: 'string',
          description: 'Visual style preset (pixar, anime, watercolor, realistic, cartoon)',
        },
        referenceImages: {
          type: 'array',
          items: { type: 'string' },
          description: 'Up to 3 reference image URLs for character/scene consistency',
          maxItems: 3,
        },
        withAudio: {
          type: 'boolean',
          description: 'Generate synchronized audio (dialogue, SFX, music). Default: true',
        },
        negativePrompt: {
          type: 'string',
          description: 'Elements to avoid in the video',
        },
      },
      required: ['prompt'],
    },
  },
  {
    name: 'veo3_check_status',
    description: 'Check the status of a video generation job',
    inputSchema: {
      type: 'object',
      properties: {
        jobId: {
          type: 'string',
          description: 'The job ID returned from veo3_generate_video',
        },
      },
      required: ['jobId'],
    },
  },
  {
    name: 'veo3_estimate_cost',
    description: 'Estimate the cost for video generation',
    inputSchema: {
      type: 'object',
      properties: {
        duration: {
          type: 'number',
          description: 'Total video duration in seconds',
        },
        withAudio: {
          type: 'boolean',
          description: 'Include audio generation',
        },
      },
      required: ['duration'],
    },
  },
  {
    name: 'veo3_create_prompt',
    description: 'Help create an optimized prompt for Veo3 video generation',
    inputSchema: {
      type: 'object',
      properties: {
        subject: {
          type: 'string',
          description: 'Main subject of the video',
        },
        action: {
          type: 'string',
          description: 'What is happening in the video',
        },
        setting: {
          type: 'string',
          description: 'Location/environment',
        },
        mood: {
          type: 'string',
          description: 'Emotional tone (happy, calm, exciting, mysterious)',
        },
        style: {
          type: 'string',
          description: 'Visual style (Pixar, anime, realistic, etc.)',
        },
        cameraMovement: {
          type: 'string',
          description: 'Camera movement (static, pan left, zoom in, tracking shot)',
        },
        audience: {
          type: 'string',
          enum: ['children', 'teenagers', 'family', 'young-adult'],
          description: 'Target audience for content safety',
        },
      },
      required: ['subject', 'action'],
    },
  },
];

// ===========================================
// API FUNCTIONS
// ===========================================

async function generateVideo(params: GenerateVideoParams): Promise<VideoResult> {
  const {
    prompt,
    duration = 5,
    aspectRatio = config.defaultAspectRatio,
    style,
    referenceImages,
    withAudio = true,
    negativePrompt,
  } = params;

  // Build the full prompt
  let fullPrompt = prompt;
  if (style) {
    fullPrompt = `${fullPrompt}, ${style} style`;
  }
  if (negativePrompt) {
    fullPrompt = `${fullPrompt}. Avoid: ${negativePrompt}`;
  }

  // Prepare request body
  const requestBody = {
    model: `models/${config.model}`,
    contents: [
      {
        parts: [
          { text: fullPrompt },
          // Add reference images if provided
          ...(referenceImages || []).map(url => ({
            inlineData: {
              mimeType: 'image/jpeg',
              data: url, // In production, this should be base64
            },
          })),
        ],
      },
    ],
    generationConfig: {
      videoDuration: `${duration}s`,
      aspectRatio: aspectRatio,
      generateAudio: withAudio,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/models/${config.model}:generateVideo?key=${config.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Veo3 API error: ${error.error?.message || response.statusText}`);
    }

    const result = await response.json();

    return {
      id: result.name || `job-${Date.now()}`,
      status: 'processing',
      metadata: {
        prompt: fullPrompt,
        duration,
        aspectRatio,
        withAudio,
        estimatedCost: duration * 0.40,
      },
    };
  } catch (error) {
    console.error('Veo3 generation error:', error);
    throw error;
  }
}

async function checkStatus(jobId: string): Promise<VideoResult> {
  try {
    const response = await fetch(
      `${BASE_URL}/${jobId}?key=${config.apiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Veo3 API error: ${error.error?.message || response.statusText}`);
    }

    const result = await response.json();

    // Map API status to our status
    let status: VideoResult['status'] = 'processing';
    if (result.done) {
      status = result.error ? 'failed' : 'completed';
    }

    return {
      id: jobId,
      status,
      videoUrl: result.response?.generatedVideos?.[0]?.uri,
      thumbnailUrl: result.response?.generatedVideos?.[0]?.thumbnail,
      duration: result.response?.generatedVideos?.[0]?.duration,
    };
  } catch (error) {
    console.error('Veo3 status check error:', error);
    throw error;
  }
}

function estimateCost(duration: number, withAudio: boolean = true): { cost: number; breakdown: string } {
  const costPerSecond = withAudio ? 0.40 : 0.35;
  const cost = duration * costPerSecond;

  return {
    cost,
    breakdown: `${duration} seconds × $${costPerSecond}/sec = $${cost.toFixed(2)}`,
  };
}

function createOptimizedPrompt(params: {
  subject: string;
  action: string;
  setting?: string;
  mood?: string;
  style?: string;
  cameraMovement?: string;
  audience?: string;
}): string {
  const parts: string[] = [];

  // Subject and action
  parts.push(`${params.subject} ${params.action}`);

  // Setting
  if (params.setting) {
    parts.push(`in ${params.setting}`);
  }

  // Mood and lighting
  if (params.mood) {
    const moodMappings: Record<string, string> = {
      happy: 'bright cheerful lighting, warm colors',
      calm: 'soft diffused lighting, peaceful atmosphere',
      exciting: 'dynamic lighting, vibrant colors, high energy',
      mysterious: 'atmospheric lighting, subtle shadows, intriguing mood',
    };
    parts.push(moodMappings[params.mood] || params.mood);
  }

  // Style
  if (params.style) {
    parts.push(`${params.style} animation style`);
  }

  // Camera
  if (params.cameraMovement) {
    parts.push(`${params.cameraMovement}`);
  }

  // Safety for children
  if (params.audience === 'children' || params.audience === 'family') {
    parts.push('child-friendly, no scary elements, bright and inviting');
  }

  // Quality
  parts.push('high quality, detailed, smooth motion');

  return parts.join(', ');
}

// ===========================================
// MCP SERVER
// ===========================================

const server = new Server(
  {
    name: 'piggytales-veo3',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'veo3_generate_video': {
        const result = await generateVideo(args as GenerateVideoParams);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'veo3_check_status': {
        const result = await checkStatus(args.jobId as string);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'veo3_estimate_cost': {
        const result = estimateCost(
          args.duration as number,
          args.withAudio as boolean
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'veo3_create_prompt': {
        const prompt = createOptimizedPrompt(args as any);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ optimizedPrompt: prompt }, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('PiggyTales Veo3 MCP Server running on stdio');
}

main().catch(console.error);
