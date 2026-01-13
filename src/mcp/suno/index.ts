/**
 * PiggyTales Suno MCP Server
 *
 * Provides Suno V5 music generation capabilities via MCP.
 *
 * @see https://docs.sunoapi.org
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

interface SunoConfig {
  apiKey: string;
  apiUrl: string;
  defaultModel: string;
}

interface GenerateMusicParams {
  prompt: string;
  style?: string;
  duration?: number;
  instrumental?: boolean;
  lyrics?: string;
  mood?: string;
  tempo?: string;
  title?: string;
}

interface MusicResult {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  audioUrl?: string;
  duration?: number;
  title?: string;
  lyrics?: string;
  style?: string;
  metadata?: Record<string, unknown>;
}

interface LyricsParams {
  topic: string;
  mood?: string;
  audience?: string;
  structure?: string;
}

// ===========================================
// CONFIGURATION
// ===========================================

const config: SunoConfig = {
  apiKey: process.env.SUNO_API_KEY || '',
  apiUrl: process.env.SUNO_API_URL || 'https://api.sunoapi.org',
  defaultModel: 'v5',
};

// ===========================================
// TOOLS DEFINITION
// ===========================================

const tools: Tool[] = [
  {
    name: 'suno_generate_music',
    description: `Generate music using Suno V5 AI.

Features:
- Text-to-music generation
- Custom lyrics support
- Multiple styles and moods
- Up to 4 minutes per track
- Vocal and instrumental options

Best practices for children's content:
- Use cheerful, upbeat styles
- Simple, repetitive melodies
- Educational or positive themes
- Age-appropriate tempo`,
    inputSchema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Description of the music to generate. Include style, instruments, mood, and theme.',
        },
        style: {
          type: 'string',
          description: 'Music style (childrens pop, lullaby, adventure orchestral, educational, nursery rhyme)',
        },
        duration: {
          type: 'number',
          description: 'Duration in seconds (30-240). Default: 120',
          minimum: 30,
          maximum: 240,
        },
        instrumental: {
          type: 'boolean',
          description: 'Generate instrumental only (no vocals). Default: false',
        },
        lyrics: {
          type: 'string',
          description: 'Custom lyrics to use. If not provided, AI will generate lyrics based on prompt.',
        },
        mood: {
          type: 'string',
          enum: ['happy', 'calm', 'exciting', 'mysterious', 'playful', 'soothing'],
          description: 'Emotional mood of the music',
        },
        tempo: {
          type: 'string',
          enum: ['slow', 'medium', 'fast', 'varied'],
          description: 'Tempo/speed of the music',
        },
        title: {
          type: 'string',
          description: 'Title for the generated track',
        },
      },
      required: ['prompt'],
    },
  },
  {
    name: 'suno_generate_lyrics',
    description: 'Generate lyrics for a song based on topic and style',
    inputSchema: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'Topic or theme for the lyrics',
        },
        mood: {
          type: 'string',
          description: 'Mood of the song (happy, calm, exciting)',
        },
        audience: {
          type: 'string',
          enum: ['children', 'teenagers', 'family'],
          description: 'Target audience for age-appropriate lyrics',
        },
        structure: {
          type: 'string',
          description: 'Song structure (verse-chorus-verse, AABA, simple)',
        },
      },
      required: ['topic'],
    },
  },
  {
    name: 'suno_check_status',
    description: 'Check the status of a music generation job',
    inputSchema: {
      type: 'object',
      properties: {
        jobId: {
          type: 'string',
          description: 'The job ID returned from suno_generate_music',
        },
      },
      required: ['jobId'],
    },
  },
  {
    name: 'suno_list_styles',
    description: 'List available music styles optimized for PiggyTales content',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['children', 'background', 'intro', 'emotional'],
          description: 'Category of styles to list',
        },
      },
    },
  },
  {
    name: 'suno_create_prompt',
    description: 'Help create an optimized prompt for Suno music generation',
    inputSchema: {
      type: 'object',
      properties: {
        contentType: {
          type: 'string',
          enum: ['audiobook-background', 'intro-music', 'song', 'lullaby', 'adventure-theme'],
          description: 'Type of music content',
        },
        theme: {
          type: 'string',
          description: 'Theme or topic (friendship, adventure, learning, bedtime)',
        },
        mood: {
          type: 'string',
          description: 'Emotional mood',
        },
        instruments: {
          type: 'array',
          items: { type: 'string' },
          description: 'Preferred instruments',
        },
        audience: {
          type: 'string',
          enum: ['children', 'teenagers', 'family'],
        },
      },
      required: ['contentType'],
    },
  },
];

// ===========================================
// STYLE PRESETS
// ===========================================

const stylePresets = {
  children: [
    { name: 'Cheerful Pop', description: 'Upbeat, catchy melodies for kids', prompt: 'cheerful childrens pop, ukulele, claps, happy vocals' },
    { name: 'Educational Fun', description: 'Learning songs with repetition', prompt: 'educational childrens song, simple melody, repetitive chorus' },
    { name: 'Nursery Rhyme', description: 'Classic nursery rhyme style', prompt: 'traditional nursery rhyme, playful, acoustic guitar, simple' },
    { name: 'Dance Along', description: 'Energetic dance music for kids', prompt: 'kids dance music, electronic beats, fun, energetic' },
    { name: 'Lullaby', description: 'Gentle bedtime music', prompt: 'soft lullaby, music box, gentle piano, soothing, slow tempo' },
  ],
  background: [
    { name: 'Gentle Adventure', description: 'Soft background for stories', prompt: 'gentle orchestral, adventure theme, background music, subtle' },
    { name: 'Magical Forest', description: 'Whimsical nature sounds', prompt: 'magical forest ambience, flute, harp, nature sounds, dreamy' },
    { name: 'Cozy Home', description: 'Warm domestic atmosphere', prompt: 'warm acoustic, cozy atmosphere, light piano, gentle' },
    { name: 'Ocean Waves', description: 'Calm water ambience', prompt: 'ocean sounds, calm, ambient, peaceful, soft pads' },
  ],
  intro: [
    { name: 'Show Opener', description: 'Exciting intro fanfare', prompt: 'exciting intro music, fanfare, bright, memorable hook, 10 seconds' },
    { name: 'Story Time', description: 'Magical story beginning', prompt: 'magical intro, sparkle sounds, wonder, building anticipation' },
    { name: 'Adventure Start', description: 'Epic adventure beginning', prompt: 'adventure intro, orchestral hit, exciting, heroic' },
  ],
  emotional: [
    { name: 'Happy Moment', description: 'Joyful celebration', prompt: 'happy celebration, upbeat, cheerful, achievement, bright' },
    { name: 'Tender Moment', description: 'Touching emotional scene', prompt: 'tender moment, soft piano, emotional, heartwarming, gentle strings' },
    { name: 'Funny Scene', description: 'Comedic timing music', prompt: 'funny comedy music, playful, pizzicato, silly, light' },
    { name: 'Mystery', description: 'Curious discovery', prompt: 'mysterious but not scary, curious, wonder, gentle suspense' },
  ],
};

// ===========================================
// API FUNCTIONS
// ===========================================

async function generateMusic(params: GenerateMusicParams): Promise<MusicResult> {
  const {
    prompt,
    style,
    duration = 120,
    instrumental = false,
    lyrics,
    mood,
    tempo,
    title,
  } = params;

  // Build full prompt
  let fullPrompt = prompt;
  if (style) fullPrompt += `, ${style}`;
  if (mood) fullPrompt += `, ${mood} mood`;
  if (tempo) fullPrompt += `, ${tempo} tempo`;

  const requestBody = {
    prompt: fullPrompt,
    make_instrumental: instrumental,
    custom_lyrics: lyrics || null,
    duration: duration,
    title: title || 'Untitled',
    model: config.defaultModel,
  };

  try {
    const response = await fetch(`${config.apiUrl}/v1/music/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Suno API error: ${error.message || response.statusText}`);
    }

    const result = await response.json();

    return {
      id: result.id || `job-${Date.now()}`,
      status: 'processing',
      title: title,
      metadata: {
        prompt: fullPrompt,
        duration,
        instrumental,
        style,
        mood,
      },
    };
  } catch (error) {
    console.error('Suno generation error:', error);
    throw error;
  }
}

async function generateLyrics(params: LyricsParams): Promise<{ lyrics: string; structure: string }> {
  const { topic, mood = 'happy', audience = 'children', structure = 'verse-chorus-verse' } = params;

  // Build lyrics prompt based on audience
  let lyricsStyle = '';
  if (audience === 'children') {
    lyricsStyle = 'simple words, repetitive phrases, easy to sing along, educational themes';
  } else if (audience === 'teenagers') {
    lyricsStyle = 'relatable themes, age-appropriate, positive messaging';
  } else {
    lyricsStyle = 'family-friendly, multi-generational appeal';
  }

  const requestBody = {
    prompt: `Write ${mood} song lyrics about ${topic}. Style: ${lyricsStyle}. Structure: ${structure}`,
  };

  try {
    const response = await fetch(`${config.apiUrl}/v1/lyrics/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      // Fallback to template lyrics if API fails
      return generateTemplateLyrics(topic, mood, structure);
    }

    const result = await response.json();
    return {
      lyrics: result.lyrics,
      structure: structure,
    };
  } catch {
    return generateTemplateLyrics(topic, mood, structure);
  }
}

function generateTemplateLyrics(topic: string, mood: string, structure: string): { lyrics: string; structure: string } {
  // Simple template-based lyrics generation
  const templates = {
    happy: `[Verse 1]
Today is such a wonderful day
Let's learn about ${topic} in a fun way
Come along and sing with me
It's as easy as 1, 2, 3!

[Chorus]
${topic}, ${topic}, let's explore
There's so much to learn and more
${topic}, ${topic}, come and see
Learning is fun for you and me!

[Verse 2]
Every day we grow and learn
New adventures at every turn
With our friends by our side
In knowledge and joy we take pride!

[Chorus]
${topic}, ${topic}, let's explore
There's so much to learn and more
${topic}, ${topic}, come and see
Learning is fun for you and me!`,
    calm: `[Verse 1]
Close your eyes and drift away
After such a lovely day
${topic} fills our dreams tonight
Everything is soft and bright

[Chorus]
Rest now, little one
The day is done
Dream of ${topic}
Until the morning sun

[Verse 2]
Stars are shining up above
Wrapped in warmth and lots of love
${topic} in our dreams so sweet
Tomorrow we will meet

[Chorus]
Rest now, little one
The day is done
Dream of ${topic}
Until the morning sun`,
  };

  return {
    lyrics: templates[mood as keyof typeof templates] || templates.happy,
    structure,
  };
}

async function checkStatus(jobId: string): Promise<MusicResult> {
  try {
    const response = await fetch(`${config.apiUrl}/v1/music/status/${jobId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Suno API error: ${response.statusText}`);
    }

    const result = await response.json();

    return {
      id: jobId,
      status: result.status,
      audioUrl: result.audio_url,
      duration: result.duration,
      title: result.title,
      lyrics: result.lyrics,
    };
  } catch (error) {
    console.error('Suno status check error:', error);
    throw error;
  }
}

function listStyles(category?: string): typeof stylePresets[keyof typeof stylePresets] {
  if (category && category in stylePresets) {
    return stylePresets[category as keyof typeof stylePresets];
  }
  return Object.values(stylePresets).flat();
}

function createOptimizedPrompt(params: {
  contentType: string;
  theme?: string;
  mood?: string;
  instruments?: string[];
  audience?: string;
}): string {
  const parts: string[] = [];

  // Base style by content type
  const contentStyles: Record<string, string> = {
    'audiobook-background': 'gentle background music, subtle, non-intrusive, ambient',
    'intro-music': 'catchy intro, memorable hook, bright, 10-15 seconds',
    'song': 'full song, verses and chorus, singable melody',
    'lullaby': 'soft lullaby, slow tempo, soothing, music box, gentle',
    'adventure-theme': 'adventure orchestral, exciting, building energy, heroic',
  };

  parts.push(contentStyles[params.contentType] || 'children\'s music');

  // Theme
  if (params.theme) {
    parts.push(`about ${params.theme}`);
  }

  // Mood
  if (params.mood) {
    parts.push(`${params.mood} mood`);
  }

  // Instruments
  if (params.instruments && params.instruments.length > 0) {
    parts.push(params.instruments.join(', '));
  }

  // Audience safety
  if (params.audience === 'children') {
    parts.push('child-friendly, safe, positive');
  }

  return parts.join(', ');
}

// ===========================================
// MCP SERVER
// ===========================================

const server = new Server(
  {
    name: 'piggytales-suno',
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
      case 'suno_generate_music': {
        const result = await generateMusic(args as GenerateMusicParams);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'suno_generate_lyrics': {
        const result = await generateLyrics(args as LyricsParams);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'suno_check_status': {
        const result = await checkStatus(args.jobId as string);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'suno_list_styles': {
        const result = listStyles(args.category as string);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'suno_create_prompt': {
        const prompt = createOptimizedPrompt(args as any);
        return {
          content: [{ type: 'text', text: JSON.stringify({ optimizedPrompt: prompt }, null, 2) }],
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
  console.error('PiggyTales Suno MCP Server running on stdio');
}

main().catch(console.error);
