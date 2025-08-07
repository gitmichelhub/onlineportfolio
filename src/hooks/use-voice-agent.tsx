import { useState, useCallback, useEffect, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';

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
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Debug: Log when useConversation is called
  useEffect(() => {
    console.log('[VoiceAgent] useVoiceAgent hook called');
    console.log('[VoiceAgent] agentId:', options.agentId, 'apiKey:', options.apiKey);
    console.log('[VoiceAgent] useConversation hook called');
  }, [options.agentId, options.apiKey]);

  const conversation = useConversation({
    // For public agents, we don't need an API key
    apiKey: options.apiKey || undefined,
    // Add agent configuration for public agents
    agentId: options.agentId,
    onConnect: () => {
      console.log('[VoiceAgent] Connected to ElevenLabs agent');
      console.log('[VoiceAgent] Connection established - conversation should now be active');
      console.log('[VoiceAgent] Starting timer for', TIMER_DURATION, 'seconds');
      setError(null);
      setIsProcessing(false);
      setIsAgentSpeaking(false);
      // Start the countdown timer when connection is successful
      setTimeRemaining(TIMER_DURATION);
      setIsTimerActive(true);
    },
    onDisconnect: () => {
      console.log('[VoiceAgent] Disconnected from ElevenLabs agent');
      console.log('[VoiceAgent] Connection lost - conversation ended');
      setError(null);
      setIsProcessing(false);
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
      // Stop the timer when disconnected
      setIsTimerActive(false);
      setTimeRemaining(null);
    },
    onMessage: (message) => {
      console.log('[VoiceAgent] Agent message received:', message);
      console.log('[VoiceAgent] Message source:', message.source);
      console.log('[VoiceAgent] Message text:', message.message);
    },
    onError: (error) => {
      console.error('[VoiceAgent] ElevenLabs conversation error:', error);
      setError(typeof error === 'string' ? error : 'Connection error');
      setIsProcessing(false);
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
      // Stop the timer and automatically decouple on error
      setIsTimerActive(false);
      setTimeRemaining(null);
      // Automatically stop conversation on error
      conversation.endSession().catch(console.error);
    },
    // Add missing callbacks for proper audio handling
    onAudioStart: () => {
      console.log('[VoiceAgent] Audio started - conversation is now active');
      console.log('[VoiceAgent] Audio stream should now be available');
      console.log('[VoiceAgent] Microphone and speakers should be working');
    },
    onAudioEnd: () => {
      console.log('[VoiceAgent] Audio ended - conversation has stopped');
      console.log('[VoiceAgent] Audio stream has been closed');
      console.log('[VoiceAgent] This might indicate the conversation ended unexpectedly');
      // Reset speaking state when audio ends
      setIsAgentSpeaking(false);
    },
    onUserStartSpeaking: () => {
      console.log('[VoiceAgent] User started speaking');
      console.log('[VoiceAgent] Microphone input detected');
      console.log('[VoiceAgent] User voice should be transmitted to agent');
      setIsUserSpeaking(true);
    },
    onUserStopSpeaking: () => {
      console.log('[VoiceAgent] User stopped speaking');
      console.log('[VoiceAgent] Microphone input stopped');
      console.log('[VoiceAgent] Agent should process the user input');
      setIsUserSpeaking(false);
    },
    onAgentStartSpeaking: () => {
      console.log('[VoiceAgent] Agent started speaking');
      console.log('[VoiceAgent] AI response audio should now be playing');
      console.log('[VoiceAgent] You should hear the agent through your speakers');
      setIsAgentSpeaking(true);
    },
    onAgentStopSpeaking: () => {
      console.log('[VoiceAgent] Agent stopped speaking');
      console.log('[VoiceAgent] AI response audio has finished');
      console.log('[VoiceAgent] Agent is ready for next user input');
      setIsAgentSpeaking(false);
    },
    // Audio configuration
    audioConfig: {
      inputDeviceId: undefined, // Use default input device
      outputDeviceId: undefined, // Use default output device
      sampleRate: 8000, // Match the ulaw_8000 format from config
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  });

  // Timer effect
  useEffect(() => {
    console.log('[VoiceAgent] Timer effect - isTimerActive:', isTimerActive, 'timeRemaining:', timeRemaining);
    
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
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
      conversation.endSession().catch(console.error);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTimerActive, timeRemaining, conversation]);

  // Additional effect to ensure states are reset when timer expires
  useEffect(() => {
    if (timeRemaining === 0) {
      console.log('[VoiceAgent] Timer reached zero, ensuring all states are reset');
      setIsAgentSpeaking(false);
      setIsUserSpeaking(false);
      setIsProcessing(false);
      setIsTimerActive(false);
    }
  }, [timeRemaining]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      console.log('[VoiceAgent] Component unmounting, cleaning up...');
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // Stop any active conversation only on actual unmount
      if (conversation.status === 'connected') {
        console.log('[VoiceAgent] Ending session on component unmount');
        conversation.endSession().catch(console.error);
      }
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
    };
  }, []); // Empty dependency array - only run on mount/unmount

  const startConversation = useCallback(async () => {
    console.log('[VoiceAgent] startConversation called');
    console.log('[VoiceAgent] agentId:', options.agentId);
    console.log('[VoiceAgent] apiKey available:', !!options.apiKey);
    console.log('[VoiceAgent] conversation status before start:', conversation.status);
    
    try {
      setError(null);
      setIsProcessing(true);
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
      // Reset timer state
      setTimeRemaining(null);
      setIsTimerActive(false);

      // Start the conversation session - ElevenLabs SDK handles microphone access
      console.log('[VoiceAgent] Starting conversation session...');
      const sessionId = await conversation.startSession({
        agentId: options.agentId,
      });
      console.log('[VoiceAgent] Conversation session started successfully with session ID:', sessionId);
      console.log('[VoiceAgent] conversation status after start:', conversation.status);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start conversation';
      console.error('[VoiceAgent] Failed to start conversation:', err);
      setError(errorMessage);
      setIsProcessing(false);
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
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
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
      
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
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
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
    setIsUserSpeaking(false);
    setIsAgentSpeaking(false);
    
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
  // Use our local state for speaking to ensure it's properly reset
  const state = {
    isConnected: conversation.status === 'connected',
    isListening: conversation.status === 'connected' && !isAgentSpeaking && !isUserSpeaking,
    isSpeaking: isAgentSpeaking, // Use our local state instead of conversation.isSpeaking
    isProcessing,
  };

  // Debug conversation status
  useEffect(() => {
    console.log('[VoiceAgent] Conversation status:', conversation.status);
    console.log('[VoiceAgent] SDK is speaking:', conversation.isSpeaking);
    console.log('[VoiceAgent] Local is speaking:', isAgentSpeaking);
    console.log('[VoiceAgent] Is connected:', state.isConnected);
    console.log('[VoiceAgent] Is user speaking:', isUserSpeaking);
    console.log('[VoiceAgent] Is listening:', state.isListening);
  }, [conversation.status, conversation.isSpeaking, isAgentSpeaking, state.isConnected, isUserSpeaking, state.isListening]);

  // Cleanup effect that monitors connection status and resets states when disconnected
  useEffect(() => {
    if (conversation.status !== 'connected') {
      // Connection is lost, reset all speaking states
      console.log('[VoiceAgent] Connection lost, resetting speaking states');
      setIsAgentSpeaking(false);
      setIsUserSpeaking(false);
      setIsProcessing(false);
      setIsTimerActive(false);
      setTimeRemaining(null);
    }
  }, [conversation.status]);

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