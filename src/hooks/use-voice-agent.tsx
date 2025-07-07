import { useState, useCallback } from 'react';
import { useConversation } from '@elevenlabs/react';

// Debug: Log when useVoiceAgent is called
console.log('[VoiceAgent] useVoiceAgent hook called');

interface UseVoiceAgentOptions {
  agentId: string;
  apiKey?: string;
}

interface UseVoiceAgentReturn {
  state: {
    isConnected: boolean;
    isListening: boolean;
    isSpeaking: boolean;
    isProcessing: boolean;
  };
  startConversation: () => Promise<void>;
  stopConversation: () => void;
  testConnection: () => Promise<void>;
  isActive: boolean;
  error: string | null;
}

export const useVoiceAgent = (options: UseVoiceAgentOptions): UseVoiceAgentReturn => {
  // Debug: Log agentId and apiKey
  console.log('[VoiceAgent] agentId:', options.agentId, 'apiKey:', options.apiKey);

  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Debug: Log when useConversation is called
  console.log('[VoiceAgent] useConversation hook called');

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs agent');
      setError(null);
      setIsProcessing(false);
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs agent');
      setError(null);
      setIsProcessing(false);
    },
    onMessage: (message) => {
      console.log('Agent message:', message);
    },
    onError: (error) => {
      console.error('ElevenLabs conversation error:', error);
      setError(typeof error === 'string' ? error : 'Connection error');
      setIsProcessing(false);
    },
  });

  const startConversation = useCallback(async () => {
    console.log('[VoiceAgent] startConversation called');
    try {
      setError(null);
      setIsProcessing(true);

      // Request microphone access first
      await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });

      // Start the conversation session
      await conversation.startSession({ agentId: options.agentId });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start conversation';
      setError(errorMessage);
      setIsProcessing(false);
      console.error('Failed to start conversation:', err);
    }
  }, [conversation, options.agentId]);

  const stopConversation = useCallback(async () => {
    console.log('[VoiceAgent] stopConversation called');
    try {
      await conversation.endSession();
    } catch (err) {
      console.error('Failed to stop conversation:', err);
    }
  }, [conversation]);

  const testConnection = useCallback(async () => {
    if (!options.agentId) {
      throw new Error('Agent ID is required');
    }
    // Return void instead of boolean to match the expected interface
  }, [options.agentId]);

  // Map the ElevenLabs SDK status to our state format
  const state = {
    isConnected: conversation.status === 'connected',
    isListening: conversation.status === 'connected' && !conversation.isSpeaking,
    isSpeaking: conversation.isSpeaking,
    isProcessing,
  };

  const isActive = state.isConnected || state.isListening || state.isSpeaking || isProcessing;

  return {
    state,
    startConversation,
    stopConversation,
    testConnection,
    isActive,
    error,
  };
}; 