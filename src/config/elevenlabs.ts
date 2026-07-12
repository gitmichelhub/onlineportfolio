/**
 * ElevenLabs Conversational AI configuration.
 *
 * The agents themselves (system prompt, voice, first message, knowledge base)
 * are configured in the ElevenLabs dashboard — the frontend only needs the
 * agent ID and connects via the @elevenlabs/react SDK (see use-voice-agent).
 */

const DEFAULT_AGENT_IDS = {
  en: 'agent_3501k22cm910e4y8raq2cs3xx0nr', // Portfolio_test_2
  de: 'agent_5901k24kk6mrfg3btpgnmpxabv95', // Portfolio_test_1_DE
} as const;

// Utility function to safely check environment variables
function getEnvVar(key: string): string | undefined {
  try {
    // Try to access Vite environment variables
    const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
    return env?.[key];
  } catch {
    // Fallback for environments where import.meta.env is not available
    return undefined;
  }
}

// Function to get the appropriate agent ID based on language
export const getElevenLabsAgentId = (language: 'en' | 'de'): string => {
  if (language === 'de') {
    const germanAgentId = getEnvVar('VITE_ELEVENLABS_GERMAN_AGENT_ID');
    if (!germanAgentId) {
      console.warn('VITE_ELEVENLABS_GERMAN_AGENT_ID not found. Using default Portfolio_test_1_DE agent.');
      return DEFAULT_AGENT_IDS.de;
    }
    return germanAgentId;
  } else {
    // Default to English agent
    const englishAgentId = getEnvVar('VITE_ELEVENLABS_ENGLISH_AGENT_ID');
    if (!englishAgentId) {
      console.warn('VITE_ELEVENLABS_ENGLISH_AGENT_ID not found. Using default Portfolio_test_2 agent.');
      return DEFAULT_AGENT_IDS.en;
    }
    return englishAgentId;
  }
};
