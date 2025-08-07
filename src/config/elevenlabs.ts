/**
 * ElevenLabs Conversational AI Configuration
 * This file contains the configuration for ElevenLabs WebSocket API
 */

// ElevenLabs API configuration
export const ELEVENLABS_CONFIG = {
  // WebSocket URL for Conversational AI
  WS_URL: 'wss://api.elevenlabs.io/v1/convai/conversation',
  
  // API base URL
  API_BASE_URL: 'https://api.elevenlabs.io/v1',
  
  // Default voice settings
  DEFAULT_VOICE_SETTINGS: {
    stability: 0.5,
    similarity_boost: 0.8,
    style: 0.0,
    use_speaker_boost: true
  },
  
  // Conversation settings
  CONVERSATION_CONFIG: {
    // Audio encoding settings
    audio_encoding: 'ulaw_8000',
    
    // Voice ID (you'll need to replace this with your actual voice ID)
    voice_id: 'your-voice-id-here',
    
    // Model settings
    model: 'eleven_turbo_v2',
    
    // Agent settings
    agent: {
      prompt: {
        prompt: `You are Mike's AI assistant. You are knowledgeable about Mike's professional background, 
        skills, and experience. You speak in a friendly, professional manner and are eager to help 
        visitors learn more about Mike's work and capabilities. You have access to information about 
        Mike's projects, technical skills, and career history. Always be helpful and engaging.`,
      },
      first_message: "Hello! I'm Mike's AI assistant. How can I help you today?",
      language: 'en',
    },
    
    // Audio settings
    audio: {
      input_audio_encoding: 'ulaw_8000',
      output_audio_encoding: 'ulaw_8000',
      sample_rate: 8000,
    },
    
    // Response settings
    response_timeout_ms: 10000,
    turn_detection: {
      type: 'server_vad',
      threshold: 0.5,
      prefix_padding_ms: 300,
      silence_duration_ms: 500,
    },
  },
} as const;

// Environment variable getters
export const getElevenLabsApiKey = (): string => {
  const apiKey = getEnvVar('VITE_ELEVENLABS_API_KEY');
  if (!apiKey) {
    console.warn('⚠️ VITE_ELEVENLABS_API_KEY not found in environment variables');
    return '';
  }
  return apiKey;
};

export const getElevenLabsVoiceId = (): string => {
  const voiceId = getEnvVar('VITE_ELEVENLABS_VOICE_ID');
  if (!voiceId) {
    console.warn('⚠️ VITE_ELEVENLABS_VOICE_ID not found in environment variables');
    return ELEVENLABS_CONFIG.CONVERSATION_CONFIG.voice_id;
  }
  return voiceId;
};

// Utility function to safely check environment variables
function getEnvVar(key: string): string | undefined {
  try {
    // Try to access Vite environment variables
    return (import.meta as any).env?.[key];
  } catch {
    // Fallback for environments where import.meta.env is not available
    return undefined;
  }
}

// Audio format utilities
export const AUDIO_FORMATS = {
  PCM_16000: 'pcm_16000',
  PCM_22050: 'pcm_22050',
  PCM_24000: 'pcm_24000',
  PCM_44100: 'pcm_44100',
  ULAW_8000: 'ulaw_8000',
  MP3_22050: 'mp3_22050_32',
  MP3_44100: 'mp3_44100_32',
} as const;

// WebSocket connection states
export const CONNECTION_STATES = {
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  ERROR: 'error',
  RECONNECTING: 'reconnecting',
} as const;

export type ConnectionState = typeof CONNECTION_STATES[keyof typeof CONNECTION_STATES];
export type AudioFormat = typeof AUDIO_FORMATS[keyof typeof AUDIO_FORMATS];