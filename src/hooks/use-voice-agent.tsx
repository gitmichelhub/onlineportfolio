import { useState, useCallback, useEffect, useRef } from 'react';
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
  forceStopConversation: () => Promise<void>;
  testConnection: () => Promise<void>;
  isActive: boolean;
  error: string | null;
  timeRemaining: number | null;
  isTimerActive: boolean;
}

const TIMER_DURATION = 3 * 60; // 3 minutes in seconds

export const useVoiceAgent = (options: UseVoiceAgentOptions): UseVoiceAgentReturn => {
  // Debug: Log agentId and apiKey
  console.log('[VoiceAgent] agentId:', options.agentId, 'apiKey:', options.apiKey);

  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Debug: Log when useConversation is called
  console.log('[VoiceAgent] useConversation hook called');

  const conversation = useConversation({
    // For public agents, we don't need an API key
    apiKey: options.apiKey || undefined,
    // Add additional configuration for public agents
    agentId: options.agentId,
    onConnect: () => {
      console.log('[VoiceAgent] Connected to ElevenLabs agent');
      setError(null);
      setIsProcessing(false);
      // Start the countdown timer when connection is successful
      setTimeRemaining(TIMER_DURATION);
      setIsTimerActive(true);
    },
    onDisconnect: () => {
      console.log('[VoiceAgent] Disconnected from ElevenLabs agent');
      setError(null);
      setIsProcessing(false);
      // Stop the timer when disconnected
      setIsTimerActive(false);
      setTimeRemaining(null);
    },
    onMessage: (message) => {
      console.log('[VoiceAgent] Agent message:', message);
    },
    onError: (error) => {
      console.error('[VoiceAgent] ElevenLabs conversation error:', error);
      setError(typeof error === 'string' ? error : 'Connection error');
      setIsProcessing(false);
      // Stop the timer and automatically decouple on error
      setIsTimerActive(false);
      setTimeRemaining(null);
      // Automatically stop conversation on error
      conversation.endSession().catch(console.error);
    },
  });

  // Timer effect
  useEffect(() => {
    if (isTimerActive && timeRemaining !== null && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => {
          if (prev !== null && prev > 0) {
            return prev - 1;
          }
          return 0;
        });
      }, 1000);
    } else if (timeRemaining === 0) {
      // Timer expired, automatically stop conversation
      console.log('[VoiceAgent] Timer expired, stopping conversation');
      setIsTimerActive(false);
      setError(null);
      setIsProcessing(false);
      conversation.endSession().catch(console.error);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTimerActive, timeRemaining, conversation]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      console.log('[VoiceAgent] Component unmounting, cleaning up...');
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // Stop any active conversation
      if (conversation.status === 'connected') {
        conversation.endSession().catch(console.error);
      }
    };
  }, [conversation]);

  const startConversation = useCallback(async () => {
    console.log('[VoiceAgent] startConversation called');
    console.log('[VoiceAgent] agentId:', options.agentId);
    console.log('[VoiceAgent] apiKey available:', !!options.apiKey);
    
    try {
      setError(null);
      setIsProcessing(true);
      // Reset timer state
      setTimeRemaining(null);
      setIsTimerActive(false);

      // Request microphone access first
      console.log('[VoiceAgent] Requesting microphone access...');
      await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });
      console.log('[VoiceAgent] Microphone access granted');

      // Start the conversation session
      console.log('[VoiceAgent] Starting conversation session...');
      await conversation.startSession({ agentId: options.agentId });
      console.log('[VoiceAgent] Conversation session started successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start conversation';
      console.error('[VoiceAgent] Failed to start conversation:', err);
      setError(errorMessage);
      setIsProcessing(false);
      // Reset timer state on error
      setTimeRemaining(null);
      setIsTimerActive(false);
    }
  }, [conversation, options.agentId, options.apiKey]);

  const stopConversation = useCallback(async () => {
    console.log('[VoiceAgent] stopConversation called');
    try {
      // Stop the timer first
      setIsTimerActive(false);
      setTimeRemaining(null);
      
      // Clear any errors
      setError(null);
      
      // Stop processing state
      setIsProcessing(false);
      
      // End the conversation session
      await conversation.endSession();
      
      console.log('[VoiceAgent] Conversation stopped successfully');
    } catch (err) {
      console.error('[VoiceAgent] Failed to stop conversation:', err);
      // Even if there's an error, reset the state
      setError(null);
      setIsProcessing(false);
      setIsTimerActive(false);
      setTimeRemaining(null);
    }
  }, [conversation]);

  // Enhanced stop function that handles edge cases
  const forceStopConversation = useCallback(async () => {
    console.log('[VoiceAgent] forceStopConversation called');
    
    // Immediately reset all state
    setError(null);
    setIsProcessing(false);
    setIsTimerActive(false);
    setTimeRemaining(null);
    
    // Clear timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    try {
      // Try to end session, but don't wait too long
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Stop timeout')), 5000)
      );
      
      await Promise.race([
        conversation.endSession(),
        timeoutPromise
      ]);
      
      console.log('[VoiceAgent] Conversation force stopped successfully');
    } catch (err) {
      console.error('[VoiceAgent] Force stop conversation error:', err);
      // State is already reset, so we're good
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

  // Debug conversation status
  console.log('[VoiceAgent] Conversation status:', conversation.status);
  console.log('[VoiceAgent] Is speaking:', conversation.isSpeaking);
  console.log('[VoiceAgent] Is connected:', state.isConnected);

  const isActive = state.isConnected || state.isListening || state.isSpeaking || isProcessing;

  return {
    state,
    startConversation,
    stopConversation,
    forceStopConversation,
    testConnection,
    isActive,
    error,
    timeRemaining,
    isTimerActive,
  };
}; 