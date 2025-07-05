export const ELEVENLABS_CONFIG = {
  AGENT_ID: 'agent_01jynqjwg7f77aendk120trhj5',
  API_KEY: import.meta.env.VITE_ELEVENLABS_API_KEY || '',
  WEBSOCKET_URL: 'wss://api.elevenlabs.io/v1/agents',
};

export const getElevenLabsConfig = () => {
  return {
    agentId: ELEVENLABS_CONFIG.AGENT_ID,
    apiKey: ELEVENLABS_CONFIG.API_KEY,
    websocketUrl: ELEVENLABS_CONFIG.WEBSOCKET_URL,
  };
}; 