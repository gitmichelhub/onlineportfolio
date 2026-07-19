/**
 * Voice-agent types shared between Index (which renders the UI immediately)
 * and the lazily loaded VoiceAgentHost (which pulls in the ElevenLabs SDK).
 * Keep this module free of SDK imports — Index imports it eagerly.
 */

export interface TranscriptEntry {
  source: 'user' | 'ai';
  text: string;
}

export interface VoiceAgentState {
  isConnecting: boolean;
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
}

export interface VoiceSnapshot {
  state: VoiceAgentState;
  isActive: boolean;
  error: string | null;
  info: string | null;
  callDuration: number | null;
  isTimerActive: boolean;
  transcript: TranscriptEntry[];
}

export const idleVoiceSnapshot: VoiceSnapshot = {
  state: {
    isConnecting: false,
    isConnected: false,
    isListening: false,
    isSpeaking: false,
    isProcessing: false,
  },
  isActive: false,
  error: null,
  info: null,
  callDuration: null,
  isTimerActive: false,
  transcript: [],
};

export interface VoiceApi {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  forceStop: () => Promise<void>;
}
