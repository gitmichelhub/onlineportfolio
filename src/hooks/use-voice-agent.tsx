import { useState, useCallback, useEffect, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';

interface UseVoiceAgentOptions {
  agentId: string;
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
  callDuration: number | null;
  isTimerActive: boolean;
}

export const useVoiceAgent = (options: UseVoiceAgentOptions): UseVoiceAgentReturn => {
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [callDuration, setCallDuration] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Debug: Log when useConversation is called
  useEffect(() => {
    console.log('[VoiceAgent] useVoiceAgent hook called');
    console.log('[VoiceAgent] agentId:', options.agentId);
  }, [options.agentId]);

  const conversation = useConversation({
    agentId: options.agentId,
    onConnect: () => {
      console.log('[VoiceAgent] Connected to ElevenLabs agent');
      setError(null);
      setIsProcessing(false);
      setIsAgentSpeaking(false);
      // Start the duration counter from 0
      setCallDuration(0);
      setIsTimerActive(true);
    },
    onDisconnect: () => {
      console.log('[VoiceAgent] Disconnected from ElevenLabs agent');
      setError(null);
      setIsProcessing(false);
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
      // Stop the timer when disconnected
      setIsTimerActive(false);
      setCallDuration(null);
    },
    onMessage: (message) => {
      console.log('[VoiceAgent] Agent message received:', message);
    },
    onError: (error) => {
      console.error('[VoiceAgent] ElevenLabs conversation error:', error);
      setError(typeof error === 'string' ? error : 'Connection error');
      setIsProcessing(false);
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
      setIsTimerActive(false);
      setCallDuration(null);
      conversation.endSession().catch(console.error);
    },
    onAudioStart: () => {
      console.log('[VoiceAgent] Audio started');
    },
    onAudioEnd: () => {
      console.log('[VoiceAgent] Audio ended');
      setIsAgentSpeaking(false);
    },
    onUserStartSpeaking: () => {
      console.log('[VoiceAgent] User started speaking');
      setIsUserSpeaking(true);
    },
    onUserStopSpeaking: () => {
      console.log('[VoiceAgent] User stopped speaking');
      setIsUserSpeaking(false);
    },
    onAgentStartSpeaking: () => {
      console.log('[VoiceAgent] Agent started speaking');
      setIsAgentSpeaking(true);
    },
    onAgentStopSpeaking: () => {
      console.log('[VoiceAgent] Agent stopped speaking');
      setIsAgentSpeaking(false);
    },
    audioConfig: {
      inputDeviceId: undefined,
      outputDeviceId: undefined,
      sampleRate: 8000,
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  });

  // Duration counter effect - counts UP instead of down
  useEffect(() => {
    if (isTimerActive) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => (prev !== null ? prev + 1 : 0));
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerActive]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      console.log('[VoiceAgent] Component unmounting, cleaning up...');
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (conversation.status === 'connected') {
        console.log('[VoiceAgent] Ending session on component unmount');
        conversation.endSession().catch(console.error);
      }
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
    };
  }, []);

  const startConversation = useCallback(async () => {
    console.log('[VoiceAgent] startConversation called');
    
    try {
      setError(null);
      setIsProcessing(true);
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
      setCallDuration(null);
      setIsTimerActive(false);

      const sessionId = await conversation.startSession({
        agentId: options.agentId,
      });
      console.log('[VoiceAgent] Conversation session started with ID:', sessionId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start conversation';
      console.error('[VoiceAgent] Failed to start conversation:', err);
      setError(errorMessage);
      setIsProcessing(false);
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
      setCallDuration(null);
      setIsTimerActive(false);
    }
  }, [conversation, options.agentId]);

  const stopConversation = useCallback(async () => {
    console.log('[VoiceAgent] stopConversation called');
    try {
      setIsTimerActive(false);
      setCallDuration(null);
      setError(null);
      setIsProcessing(false);
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
      
      await conversation.endSession();
      console.log('[VoiceAgent] Conversation stopped successfully');
    } catch (err) {
      console.error('[VoiceAgent] Failed to stop conversation:', err);
      setError(null);
      setIsProcessing(false);
      setIsTimerActive(false);
      setCallDuration(null);
      setIsUserSpeaking(false);
      setIsAgentSpeaking(false);
    }
  }, [conversation]);

  const forceStopConversation = useCallback(async () => {
    console.log('[VoiceAgent] forceStopConversation called');
    
    setError(null);
    setIsProcessing(false);
    setIsTimerActive(false);
    setCallDuration(null);
    setIsUserSpeaking(false);
    setIsAgentSpeaking(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    try {
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
    }
  }, [conversation]);

  const testConnection = useCallback(async () => {
    if (!options.agentId) {
      throw new Error('Agent ID is required');
    }
  }, [options.agentId]);

  const state = {
    isConnected: conversation.status === 'connected',
    isListening: conversation.status === 'connected' && !isAgentSpeaking && !isUserSpeaking,
    isSpeaking: isAgentSpeaking,
    isProcessing,
  };

  // Cleanup effect that monitors connection status
  useEffect(() => {
    if (conversation.status !== 'connected') {
      setIsAgentSpeaking(false);
      setIsUserSpeaking(false);
      setIsProcessing(false);
      setIsTimerActive(false);
      setCallDuration(null);
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
    callDuration,
    isTimerActive,
  };
};
