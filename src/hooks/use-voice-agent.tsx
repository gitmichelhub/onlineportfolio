import { useState, useEffect, useCallback, useRef } from 'react';
import { createWebSocket, MockWebSocket } from '../services/mockWebSocket';
import { 
  buildWebSocketUrl, 
  createConversationPayload, 
  CONNECTION_STATES, 
  ConnectionState 
} from '../config/elevenlabs';

// Voice agent response types
interface TranscriptionData {
  text: string;
  confidence: number;
  is_final: boolean;
  timestamp: number;
}

interface AudioData {
  audio_data: string;
  sample_rate: number;
}

interface VoiceAgentMessage {
  type: 'transcription' | 'audio' | 'connection' | 'error';
  data: TranscriptionData | AudioData | { status: string; session_id: string } | { error: string };
  timestamp: number;
}

// Voice agent state
interface VoiceAgentState {
  connectionState: ConnectionState;
  isConnecting: boolean;
  isConnected: boolean;
  sessionId: string | null;
  lastMessage: VoiceAgentMessage | null;
  error: string | null;
  messages: VoiceAgentMessage[];
  currentTranscription: string;
  isMockMode: boolean;
}

// Voice agent hook
export function useVoiceAgent() {
  const [state, setState] = useState<VoiceAgentState>({
    connectionState: CONNECTION_STATES.DISCONNECTED,
    isConnecting: false,
    isConnected: false,
    sessionId: null,
    lastMessage: null,
    error: null,
    messages: [],
    currentTranscription: '',
    isMockMode: false,
  });

  const wsRef = useRef<WebSocket | MockWebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  // Initialize connection
  const connect = useCallback(async () => {
    if (state.isConnecting || state.isConnected) {
      console.log('🔄 Already connecting or connected');
      return;
    }

    try {
      setState(prev => ({ 
        ...prev, 
        isConnecting: true, 
        connectionState: CONNECTION_STATES.CONNECTING,
        error: null 
      }));

      const sessionId = `session-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const wsUrl = buildWebSocketUrl(sessionId);
      
      console.log('🔗 Connecting to WebSocket:', wsUrl);
      
      const ws = createWebSocket(wsUrl);
      wsRef.current = ws;

      // Check if we're using mock mode
      const isMockMode = ws instanceof MockWebSocket;
      
      setState(prev => ({ 
        ...prev, 
        sessionId, 
        isMockMode 
      }));

      // WebSocket event handlers
      ws.onopen = (event) => {
        console.log('✅ WebSocket connected');
        setState(prev => ({
          ...prev,
          isConnecting: false,
          isConnected: true,
          connectionState: CONNECTION_STATES.CONNECTED,
          error: null
        }));
        
        reconnectAttempts.current = 0;
        
        // Send conversation initiation
        const initPayload = createConversationPayload();
        ws.send(JSON.stringify(initPayload));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const message: VoiceAgentMessage = {
            type: data.type,
            data: data.type === 'transcription' ? data.transcription : data,
            timestamp: Date.now()
          };

          console.log('📨 Received message:', message);

          setState(prev => ({
            ...prev,
            lastMessage: message,
            messages: [...prev.messages, message],
            currentTranscription: message.type === 'transcription' 
              ? (message.data as TranscriptionData).text 
              : prev.currentTranscription
          }));

        } catch (error) {
          console.error('❌ Failed to parse WebSocket message:', error);
          setState(prev => ({
            ...prev,
            error: 'Failed to parse message from server'
          }));
        }
      };

      ws.onclose = (event) => {
        console.log('🔌 WebSocket disconnected:', event.code, event.reason);
        
        setState(prev => ({
          ...prev,
          isConnecting: false,
          isConnected: false,
          connectionState: CONNECTION_STATES.DISCONNECTED
        }));

        wsRef.current = null;

        // Attempt to reconnect if not a clean close
        if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          scheduleReconnect();
        }
      };

      ws.onerror = (event) => {
        console.error('❌ WebSocket error:', event);
        setState(prev => ({
          ...prev,
          error: 'WebSocket connection error',
          connectionState: CONNECTION_STATES.ERROR
        }));
      };

    } catch (error) {
      console.error('❌ Failed to connect:', error);
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Failed to connect',
        connectionState: CONNECTION_STATES.ERROR
      }));
    }
  }, [state.isConnecting, state.isConnected]);

  // Disconnect
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnected');
      wsRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isConnecting: false,
      isConnected: false,
      connectionState: CONNECTION_STATES.DISCONNECTED,
      sessionId: null,
      error: null
    }));
  }, []);

  // Send message
  const sendMessage = useCallback((message: string | object) => {
    if (!wsRef.current || !state.isConnected) {
      console.warn('⚠️ Cannot send message: WebSocket not connected');
      return false;
    }

    try {
      const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
      wsRef.current.send(messageStr);
      console.log('📤 Message sent:', messageStr);
      return true;
    } catch (error) {
      console.error('❌ Failed to send message:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to send message'
      }));
      return false;
    }
  }, [state.isConnected]);

  // Schedule reconnection
  const scheduleReconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    reconnectAttempts.current++;
    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
    
    console.log(`🔄 Scheduling reconnect attempt ${reconnectAttempts.current}/${maxReconnectAttempts} in ${delay}ms`);
    
    setState(prev => ({
      ...prev,
      connectionState: CONNECTION_STATES.RECONNECTING
    }));

    reconnectTimeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  }, [connect]);

  // Clear messages
  const clearMessages = useCallback(() => {
    setState(prev => ({
      ...prev,
      messages: [],
      lastMessage: null,
      currentTranscription: '',
      error: null
    }));
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close(1000, 'Component unmounted');
      }
    };
  }, []);

  return {
    // State
    ...state,
    
    // Actions
    connect,
    disconnect,
    sendMessage,
    clearMessages,
    clearError,
    
    // Utilities
    isReconnecting: state.connectionState === CONNECTION_STATES.RECONNECTING,
    canReconnect: reconnectAttempts.current < maxReconnectAttempts,
    reconnectAttempts: reconnectAttempts.current,
    maxReconnectAttempts,
  };
}