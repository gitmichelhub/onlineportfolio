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
  stopConversation: () => Promise<void>;
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isStartingRef = useRef(false);
  const lastAgentIdRef = useRef<string | null>(null);

  // Debug: Log when useConversation is called
  useEffect(() => {
    console.log('[VoiceAgent] useVoiceAgent hook called');
    console.log('[VoiceAgent] agentId:', options.agentId);
  }, [options.agentId]);

  const conversation = useConversation({
    onConnect: () => {
      console.log('[VoiceAgent] Connected to ElevenLabs agent');
      setError(null);
      setIsProcessing(false);
      // Start the duration counter from 0
      setCallDuration(0);
      setIsTimerActive(true);
    },
    onDisconnect: () => {
      console.log('[VoiceAgent] Disconnected from ElevenLabs agent');
      setError(null);
      setIsProcessing(false);
      // Stop the timer when disconnected
      setIsTimerActive(false);
      setCallDuration(null);
    },
    onMessage: (props) => {
      console.log('[VoiceAgent] Message received:', props);
    },
    onError: (message, context) => {
      console.error('[VoiceAgent] ElevenLabs conversation error:', message, context);
      setError(message || 'Connection error');
      setIsProcessing(false);
      setIsTimerActive(false);
      setCallDuration(null);
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
    };
  }, [conversation]);

  // Ensure we cleanly reset a running session when the selected agent changes (e.g., DE -> EN).
  useEffect(() => {
    const previousAgentId = lastAgentIdRef.current;
    lastAgentIdRef.current = options.agentId;

    if (!previousAgentId || previousAgentId === options.agentId) {
      return;
    }

    setError(null);
    setIsProcessing(false);
    setIsTimerActive(false);
    setCallDuration(null);

    if (conversation.status === 'connected' || conversation.status === 'connecting') {
      conversation.endSession().catch((err) => {
        console.error('[VoiceAgent] Failed to end session after agent switch:', err);
      });
    }
  }, [options.agentId, conversation]);

  const startConversation = useCallback(async () => {
    console.log('[VoiceAgent] startConversation called');
    
    try {
      if (isStartingRef.current) {
        return;
      }

      if (!options.agentId) {
        throw new Error('Agent ID is required');
      }

      isStartingRef.current = true;
      setError(null);
      setIsProcessing(true);
      setCallDuration(null);
      setIsTimerActive(false);

      if (conversation.status === 'connected' || conversation.status === 'connecting') {
        await conversation.endSession();
      }

      // Permission preflight only. Close this stream immediately to avoid keeping a stale capture open.
      const permissionStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      permissionStream.getTracks().forEach((track) => track.stop());

      const sessionId = await conversation.startSession({
        agentId: options.agentId,
        connectionType: 'webrtc',
      });
      console.log('[VoiceAgent] Conversation session started with ID:', sessionId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start conversation';
      console.error('[VoiceAgent] Failed to start conversation:', err);
      setError(errorMessage);
      setIsProcessing(false);
      setCallDuration(null);
      setIsTimerActive(false);
    } finally {
      isStartingRef.current = false;
    }
  }, [conversation, options.agentId]);

  const stopConversation = useCallback(async () => {
    console.log('[VoiceAgent] stopConversation called');
    try {
      setIsTimerActive(false);
      setCallDuration(null);
      setError(null);
      setIsProcessing(false);
      
      await conversation.endSession();
      console.log('[VoiceAgent] Conversation stopped successfully');
    } catch (err) {
      console.error('[VoiceAgent] Failed to stop conversation:', err);
      setError(null);
      setIsProcessing(false);
      setIsTimerActive(false);
      setCallDuration(null);
    }
  }, [conversation]);

  const forceStopConversation = useCallback(async () => {
    console.log('[VoiceAgent] forceStopConversation called');
    
    setError(null);
    setIsProcessing(false);
    setIsTimerActive(false);
    setCallDuration(null);
    
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
    isListening: conversation.status === 'connected' && !conversation.isSpeaking,
    isSpeaking: conversation.isSpeaking,
    isProcessing,
  };

  // Cleanup effect that monitors connection status
  useEffect(() => {
    if (conversation.status !== 'connected') {
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
