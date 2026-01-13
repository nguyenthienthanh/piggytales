-- PiggyTales Seed Data
-- Seed: 001_initial_data
-- Description: Initial templates and prompt library
-- Created: 2025-12-23

-- ===========================================
-- TEMPLATES
-- ===========================================

INSERT INTO templates (name, description, content_type, audience, template_data, tags) VALUES

-- Audiobook Templates
(
  'Simple Bedtime Story',
  'Short, calming bedtime story for young children',
  'audiobook',
  'children',
  '{
    "structure": {
      "intro": "30-60 seconds",
      "problem": "60-90 seconds",
      "journey": "120-180 seconds",
      "resolution": "60-90 seconds",
      "outro": "30 seconds"
    },
    "tone": "calm, warm, soothing",
    "pacing": "slow",
    "voice_style": "gentle narrator",
    "music": "soft lullaby background",
    "sfx": "minimal, nature sounds"
  }',
  ARRAY['bedtime', 'calm', 'short', 'lullaby']
),

(
  'Adventure Story',
  'Exciting adventure story with action and discovery',
  'audiobook',
  'children',
  '{
    "structure": {
      "hook": "30 seconds",
      "setup": "120 seconds",
      "adventure": "300 seconds",
      "climax": "120 seconds",
      "resolution": "90 seconds"
    },
    "tone": "exciting, energetic, fun",
    "pacing": "varied, builds tension",
    "voice_style": "animated, expressive",
    "music": "adventurous orchestral",
    "sfx": "action sounds, environment"
  }',
  ARRAY['adventure', 'exciting', 'action', 'discovery']
),

-- Animation Templates
(
  'TikTok Short',
  'Quick, hook-driven content for TikTok',
  'short',
  'teenagers',
  '{
    "duration": "30-60 seconds",
    "structure": {
      "hook": "1-3 seconds (CRITICAL)",
      "content": "20-50 seconds",
      "cta": "5-10 seconds"
    },
    "aspect_ratio": "9:16",
    "pacing": "fast cuts",
    "music": "trending sounds",
    "text_overlays": true
  }',
  ARRAY['tiktok', 'viral', 'short', 'hook']
),

(
  'YouTube Animation',
  'Full animation episode for YouTube',
  'animation',
  'family',
  '{
    "duration": "5-10 minutes",
    "structure": {
      "cold_open": "30 seconds",
      "intro": "30 seconds",
      "act1": "120 seconds",
      "act2": "180 seconds",
      "act3": "120 seconds",
      "outro": "30 seconds"
    },
    "aspect_ratio": "16:9",
    "style": "2D animation, bright colors",
    "music": "original score",
    "sfx": "full sound design"
  }',
  ARRAY['youtube', 'animation', 'episode', 'family']
),

-- Music Video Templates
(
  'Kids Music Video',
  'Educational music video with dance-along elements',
  'music-video',
  'children',
  '{
    "duration": "2-3 minutes",
    "structure": {
      "intro": "10 seconds",
      "verse1": "30 seconds",
      "chorus": "30 seconds",
      "verse2": "30 seconds",
      "chorus": "30 seconds",
      "bridge": "20 seconds",
      "final_chorus": "30 seconds",
      "outro": "10 seconds"
    },
    "music_style": "catchy, repetitive, educational",
    "visuals": "bright colors, simple characters, dance moves",
    "interaction": "dance-along, sing-along prompts"
  }',
  ARRAY['music', 'educational', 'dance', 'sing-along']
);

-- ===========================================
-- PROMPT LIBRARY
-- ===========================================

INSERT INTO prompt_library (name, category, provider, prompt_template, variables, tags) VALUES

-- Character Prompts (DALL-E / Midjourney)
(
  'Piggy Mascot',
  'character',
  'dalle',
  'A cute kawaii pink pig character named Piggy, wearing a small red mushroom cap hat, round body, big expressive eyes, friendly smile, {pose}, {background}, Pixar style 3D render, soft lighting, child-friendly',
  ARRAY['pose', 'background'],
  ARRAY['mascot', 'piggy', 'kawaii']
),

(
  'Shroom Mascot',
  'character',
  'dalle',
  'A cute kawaii red Amanita mushroom character named Shroom, white spots on cap, small pink bow, friendly face with big eyes, {pose}, {background}, Pixar style 3D render, soft lighting, child-friendly',
  ARRAY['pose', 'background'],
  ARRAY['mascot', 'shroom', 'kawaii']
),

(
  'Child Protagonist',
  'character',
  'dalle',
  'A {age} year old {gender} child character, {ethnicity}, wearing {outfit}, {hair_style}, {expression}, cute cartoon style, bright colors, child-friendly, {background}',
  ARRAY['age', 'gender', 'ethnicity', 'outfit', 'hair_style', 'expression', 'background'],
  ARRAY['protagonist', 'child', 'character']
),

(
  'Animal Friend',
  'character',
  'dalle',
  'A cute friendly {animal} character, {color} fur/feathers, big expressive eyes, {accessories}, cartoon style, child-friendly, {pose}, {background}',
  ARRAY['animal', 'color', 'accessories', 'pose', 'background'],
  ARRAY['animal', 'friend', 'sidekick']
),

-- Scene Prompts (Veo3)
(
  'Forest Scene',
  'scene',
  'veo3',
  'A magical forest scene, {time_of_day}, {weather}, soft dappled light through trees, {atmosphere}, Pixar animation style, child-friendly, no scary elements, {camera_movement}',
  ARRAY['time_of_day', 'weather', 'atmosphere', 'camera_movement'],
  ARRAY['forest', 'nature', 'magical']
),

(
  'Cozy Home',
  'scene',
  'veo3',
  'A warm cozy {room_type}, {style} interior design, soft warm lighting, {decorations}, inviting atmosphere, Pixar animation style, child-friendly, {camera_movement}',
  ARRAY['room_type', 'style', 'decorations', 'camera_movement'],
  ARRAY['home', 'cozy', 'indoor']
),

(
  'Adventure Location',
  'scene',
  'veo3',
  'An exciting {location_type}, {time_of_day}, {weather}, sense of wonder and discovery, vibrant colors, Pixar animation style, child-friendly adventure setting, {camera_movement}',
  ARRAY['location_type', 'time_of_day', 'weather', 'camera_movement'],
  ARRAY['adventure', 'exploration', 'exciting']
),

-- Music Prompts (Suno)
(
  'Cheerful Children Song',
  'music',
  'suno',
  'A cheerful childrens song about {topic}, {tempo} tempo, {instruments}, catchy melody, easy to sing along, {mood}, suitable for ages 4-10',
  ARRAY['topic', 'tempo', 'instruments', 'mood'],
  ARRAY['cheerful', 'children', 'sing-along']
),

(
  'Calming Lullaby',
  'music',
  'suno',
  'A gentle calming lullaby, slow tempo, soft {instruments}, soothing melody, {mood}, perfect for bedtime, child-friendly lyrics about {topic}',
  ARRAY['instruments', 'mood', 'topic'],
  ARRAY['lullaby', 'calm', 'bedtime']
),

(
  'Adventure Theme',
  'music',
  'suno',
  'An adventurous orchestral theme, {tempo} tempo, building excitement, {instruments}, heroic and fun, suitable for children animation, {mood}',
  ARRAY['tempo', 'instruments', 'mood'],
  ARRAY['adventure', 'orchestral', 'exciting']
),

-- Voice Prompts (Vbee)
(
  'Narrator - Warm',
  'voice',
  'vbee',
  '{text}',
  ARRAY['text'],
  ARRAY['narrator', 'warm', 'storytelling']
),

(
  'Character - Excited',
  'voice',
  'vbee',
  '{text}',
  ARRAY['text'],
  ARRAY['character', 'excited', 'dialogue']
),

-- Style Presets
(
  'Pixar Style',
  'style',
  'dalle',
  '{subject}, Pixar animation style, 3D render, soft lighting, vibrant colors, high quality, child-friendly, detailed textures, warm atmosphere',
  ARRAY['subject'],
  ARRAY['pixar', '3d', 'animation']
),

(
  'Watercolor Style',
  'style',
  'dalle',
  '{subject}, watercolor illustration style, soft edges, pastel colors, dreamy atmosphere, storybook illustration, child-friendly, artistic',
  ARRAY['subject'],
  ARRAY['watercolor', '2d', 'storybook']
),

(
  'Anime Style',
  'style',
  'dalle',
  '{subject}, anime style illustration, big expressive eyes, clean lines, vibrant colors, cute aesthetic, child-friendly, high quality',
  ARRAY['subject'],
  ARRAY['anime', '2d', 'cute']
);

-- ===========================================
-- SAMPLE TRENDS DATA
-- ===========================================

INSERT INTO trends (platform, category, region, keywords, trending_topics, viral_indicators, recommendations, expires_at) VALUES
(
  'youtube',
  'children',
  'VN',
  ARRAY['bedtime stories', 'nursery rhymes', 'learning', 'animals', 'colors'],
  '{
    "topics": [
      {"name": "Animal adventures", "score": 92},
      {"name": "Learning numbers", "score": 88},
      {"name": "Friendship stories", "score": 85},
      {"name": "Bedtime routines", "score": 82}
    ]
  }',
  '{
    "optimal_duration": "5-8 minutes",
    "best_posting_time": "18:00-20:00",
    "engagement_hooks": ["question in title", "colorful thumbnails", "character faces"]
  }',
  '{
    "content_gaps": ["Vietnamese language high-quality animation", "Local folklore adaptations"],
    "avoid": ["scary elements", "fast pacing for young children"],
    "focus": ["educational value", "sing-along elements", "repetition"]
  }',
  NOW() + INTERVAL '7 days'
),
(
  'tiktok',
  'teenagers',
  'VN',
  ARRAY['relatable', 'school life', 'friendship', 'humor', 'trends'],
  '{
    "topics": [
      {"name": "School humor", "score": 95},
      {"name": "Friend group dynamics", "score": 90},
      {"name": "Study motivation", "score": 85},
      {"name": "Life hacks", "score": 82}
    ]
  }',
  '{
    "optimal_duration": "30-60 seconds",
    "best_posting_time": "19:00-22:00",
    "engagement_hooks": ["1-second hook", "trending sounds", "text overlays"]
  }',
  '{
    "content_gaps": ["Positive teen content in Vietnamese", "Educational entertainment"],
    "avoid": ["slow intros", "boring thumbnails"],
    "focus": ["immediate hook", "trending audio", "relatable scenarios"]
  }',
  NOW() + INTERVAL '3 days'
);
