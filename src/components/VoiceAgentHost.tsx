import React, { useEffect, useRef } from 'react';
import { useVoiceAgent } from '@/hooks/use-voice-agent';
import type { VoiceApi, VoiceSnapshot } from '@/lib/voice-types';

/**
 * Renders nothing — exists so the ElevenLabs SDK (the largest vendor chunk)
 * is only downloaded when the visitor actually starts a voice conversation.
 * Index lazy-mounts this on first interaction and keeps it mounted for the
 * rest of the session; it reports voice state upward via onSnapshot and
 * exposes start/stop through apiRef.
 */
interface VoiceAgentHostProps {
  agentId: string;
  autoStart: boolean;
  onSnapshot: (snapshot: VoiceSnapshot) => void;
  apiRef: React.MutableRefObject<VoiceApi | null>;
}

const VoiceAgentHost: React.FC<VoiceAgentHostProps> = ({ agentId, autoStart, onSnapshot, apiRef }) => {
  const {
    state,
    startConversation,
    stopConversation,
    forceStopConversation,
    isActive,
    error,
    info,
    callDuration,
    isTimerActive,
    transcript,
  } = useVoiceAgent({ agentId });

  useEffect(() => {
    apiRef.current = {
      start: startConversation,
      stop: stopConversation,
      forceStop: forceStopConversation,
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef, startConversation, stopConversation, forceStopConversation]);

  useEffect(() => {
    onSnapshot({ state, isActive, error, info, callDuration, isTimerActive, transcript });
    // The state object is rebuilt every render; depend on its fields so we
    // only publish when something actually changed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.isConnecting,
    state.isConnected,
    state.isListening,
    state.isSpeaking,
    state.isProcessing,
    isActive,
    error,
    info,
    callDuration,
    isTimerActive,
    transcript,
    onSnapshot,
  ]);

  // First mount is triggered by a user click, so start the session as soon
  // as the SDK chunk is ready. Guarded so agent-id changes don't re-trigger.
  const startedRef = useRef(false);
  useEffect(() => {
    if (autoStart && !startedRef.current) {
      startedRef.current = true;
      startConversation();
    }
  }, [autoStart, startConversation]);

  return null;
};

export default VoiceAgentHost;
