/**
 * Mock WebSocket implementation for ElevenLabs Conversational AI
 * This module provides a WebSocket-compatible interface for development
 * when you don't have credits or want to work offline.
 */

// Mock response types that match ElevenLabs format
interface MockTranscriptionResponse {
  type: 'transcription';
  transcription: {
    text: string;
    confidence: number;
    is_final: boolean;
    timestamp: number;
  };
}

interface MockAudioResponse {
  type: 'audio';
  audio_data: string; // Base64 encoded audio data
  sample_rate: number;
}

interface MockConnectionResponse {
  type: 'connection';
  status: 'connected' | 'disconnected';
  session_id: string;
}

type MockResponse = MockTranscriptionResponse | MockAudioResponse | MockConnectionResponse;

// Sample mock responses
const MOCK_TRANSCRIPTIONS = [
  "Hello! I'm Mike's AI assistant. How can I help you today?",
  "I see you're interested in learning more about my background.",
  "I have experience in full-stack development, particularly with React and Node.js.",
  "Would you like to know about my recent projects?",
  "I'm passionate about creating intuitive user experiences.",
  "Feel free to ask me anything about my technical skills or experience.",
  "I've worked on various projects including web applications and mobile apps.",
  "My expertise includes TypeScript, Python, and cloud technologies.",
  "I'm always eager to discuss new technologies and development approaches.",
  "Thank you for your interest! Is there anything specific you'd like to know?"
];

export class MockWebSocket {
  private _readyState: number = WebSocket.CONNECTING;
  private _url: string;
  private _protocols?: string | string[];
  private _binaryType: BinaryType = 'blob';
  private _extensions: string = '';
  private _protocol: string = '';
  private _bufferedAmount: number = 0;
  
  // Event handlers
  public onopen: ((event: Event) => void) | null = null;
  public onmessage: ((event: MessageEvent) => void) | null = null;
  public onclose: ((event: CloseEvent) => void) | null = null;
  public onerror: ((event: Event) => void) | null = null;

  private _intervalId: number | null = null;
  private _messageCount = 0;
  private _isConnected = false;
  private _sessionId: string;

  constructor(url: string, protocols?: string | string[]) {
    this._url = url;
    this._protocols = protocols;
    this._sessionId = this._generateSessionId();
    
    console.log('🎭 MockWebSocket: Creating mock connection to', url);
    
    // Simulate connection delay
    setTimeout(() => {
      this._simulateConnection();
    }, 100 + Math.random() * 500); // Random delay between 100-600ms
  }

  private _generateSessionId(): string {
    return 'mock-session-' + Math.random().toString(36).substring(2, 15);
  }

  private _simulateConnection(): void {
    this._readyState = WebSocket.OPEN;
    this._isConnected = true;
    
    console.log('🎭 MockWebSocket: Connection established');
    
    // Trigger onopen event
    if (this.onopen) {
      const event = new Event('open');
      this.onopen(event);
    }

    // Send initial connection message
    this._sendMockMessage({
      type: 'connection',
      status: 'connected',
      session_id: this._sessionId
    });

    // Start periodic mock responses
    this._startMockResponses();
  }

  private _startMockResponses(): void {
    // Send mock transcription responses every 3-8 seconds
    this._intervalId = window.setInterval(() => {
      if (this._isConnected && this._messageCount < MOCK_TRANSCRIPTIONS.length) {
        const transcription = MOCK_TRANSCRIPTIONS[this._messageCount];
        
        // Send partial transcription first
        this._sendMockMessage({
          type: 'transcription',
          transcription: {
            text: transcription.substring(0, Math.floor(transcription.length * 0.7)),
            confidence: 0.85,
            is_final: false,
            timestamp: Date.now()
          }
        });

        // Send final transcription after a short delay
        setTimeout(() => {
          this._sendMockMessage({
            type: 'transcription',
            transcription: {
              text: transcription,
              confidence: 0.95,
              is_final: true,
              timestamp: Date.now()
            }
          });
        }, 500 + Math.random() * 1000);

        this._messageCount++;
      }
    }, 3000 + Math.random() * 5000); // Random interval between 3-8 seconds
  }

  private _sendMockMessage(data: MockResponse): void {
    if (this.onmessage && this._isConnected) {
      const event = new MessageEvent('message', {
        data: JSON.stringify(data)
      });
      
      console.log('🎭 MockWebSocket: Sending mock message:', data);
      this.onmessage(event);
    }
  }

  // WebSocket interface methods
  public send(data: string | ArrayBuffer | Blob | ArrayBufferView): void {
    if (this._readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not open');
    }
    
    console.log('🎭 MockWebSocket: Received message:', data);
    
    // Simulate processing delay
    setTimeout(() => {
      // Echo back a confirmation or generate a relevant response
      if (typeof data === 'string') {
        try {
          const parsed = JSON.parse(data);
          console.log('🎭 MockWebSocket: Parsed message:', parsed);
          
          // You can add specific mock responses based on message type
          if (parsed.type === 'conversation_initiation') {
            this._sendMockMessage({
              type: 'connection',
              status: 'connected',
              session_id: this._sessionId
            });
          }
        } catch (e) {
          console.log('🎭 MockWebSocket: Non-JSON message received');
        }
      }
    }, 100 + Math.random() * 200);
  }

  public close(code?: number, reason?: string): void {
    console.log('🎭 MockWebSocket: Closing connection', { code, reason });
    
    this._readyState = WebSocket.CLOSING;
    this._isConnected = false;
    
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
    
    setTimeout(() => {
      this._readyState = WebSocket.CLOSED;
      
      if (this.onclose) {
        const event = new CloseEvent('close', {
          code: code || 1000,
          reason: reason || 'Mock connection closed',
          wasClean: true
        });
        this.onclose(event);
      }
    }, 100);
  }

  // WebSocket properties
  public get readyState(): number {
    return this._readyState;
  }

  public get url(): string {
    return this._url;
  }

  public get protocol(): string {
    return this._protocol;
  }

  public get extensions(): string {
    return this._extensions;
  }

  public get binaryType(): BinaryType {
    return this._binaryType;
  }

  public set binaryType(value: BinaryType) {
    this._binaryType = value;
  }

  public get bufferedAmount(): number {
    return this._bufferedAmount;
  }

  // Static constants (matching WebSocket)
  public static readonly CONNECTING = 0;
  public static readonly OPEN = 1;
  public static readonly CLOSING = 2;
  public static readonly CLOSED = 3;

  // Instance constants
  public readonly CONNECTING = 0;
  public readonly OPEN = 1;
  public readonly CLOSING = 2;
  public readonly CLOSED = 3;
}

// Utility function to safely check environment variables
function getEnvVar(key: string): string | undefined {
  try {
    // Try to access Vite environment variables
    return (import.meta as any).env?.[key];
  } catch {
    // Fallback for environments where import.meta.env is not available
    return undefined;
  }
}

// Factory function to create either real or mock WebSocket
export function createWebSocket(url: string, protocols?: string | string[]): WebSocket | MockWebSocket {
  const useMock = getEnvVar('VITE_USE_MOCK_WEBSOCKET') === 'true' || 
                  localStorage.getItem('use-mock-websocket') === 'true';
  
  if (useMock) {
    console.log('🎭 Using Mock WebSocket for development');
    return new MockWebSocket(url, protocols);
  } else {
    console.log('🔗 Using Real WebSocket connection');
    return new WebSocket(url, protocols);
  }
}

// Utility functions for development
export const mockUtils = {
  enableMock: () => {
    localStorage.setItem('use-mock-websocket', 'true');
    console.log('🎭 Mock WebSocket enabled');
  },
  
  disableMock: () => {
    localStorage.removeItem('use-mock-websocket');
    console.log('🔗 Mock WebSocket disabled');
  },
  
  isMockEnabled: () => {
    return getEnvVar('VITE_USE_MOCK_WEBSOCKET') === 'true' || 
           localStorage.getItem('use-mock-websocket') === 'true';
  }
};