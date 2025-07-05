/**
 * Example usage of the Mock WebSocket system for ElevenLabs Conversational AI
 * This demonstrates how to toggle between real and mock WebSocket connections
 */

import React, { useState, useEffect } from 'react';
import { useVoiceAgent } from '../hooks/use-voice-agent';
import { mockUtils } from '../services/mockWebSocket';
import VoiceOrb from '../components/VoiceOrb';
import VoiceStatus from '../components/VoiceStatus';

const MockWebSocketExample: React.FC = () => {
  const [isMockEnabled, setIsMockEnabled] = useState(mockUtils.isMockEnabled());
  
  const {
    isConnected,
    isConnecting,
    isMockMode,
    currentTranscription,
    messages,
    error,
    connectionState,
    connect,
    disconnect,
    sendMessage,
    clearMessages,
    clearError,
  } = useVoiceAgent();

  // Toggle mock mode
  const toggleMockMode = () => {
    if (isMockEnabled) {
      mockUtils.disableMock();
    } else {
      mockUtils.enableMock();
    }
    setIsMockEnabled(!isMockEnabled);
    
    // Disconnect if currently connected
    if (isConnected) {
      disconnect();
    }
  };

  // Send a test message
  const sendTestMessage = () => {
    const testMessage = {
      type: 'user_message',
      content: 'Hello, this is a test message from the frontend!',
      timestamp: Date.now()
    };
    
    sendMessage(testMessage);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ElevenLabs Mock WebSocket Example
        </h1>
        <p className="text-gray-600">
          Demonstrates switching between real and mock WebSocket connections
        </p>
      </div>

      {/* Mock Mode Toggle */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Configuration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={isMockEnabled}
                onChange={toggleMockMode}
                className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Use Mock WebSocket
              </span>
            </label>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isMockEnabled 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {isMockEnabled ? 'MOCK MODE' : 'REAL MODE'}
            </span>
          </div>
          
          {!isMockEnabled && (
            <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
              <strong>Note:</strong> Real mode requires valid ElevenLabs API credentials.
              Set <code>VITE_ELEVENLABS_API_KEY</code> and <code>VITE_ELEVENLABS_VOICE_ID</code> 
              in your environment variables.
            </div>
          )}
        </div>
      </div>

      {/* Voice Controls */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Voice Controls</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <VoiceOrb 
            size="large"
            onVoiceStart={() => console.log('Voice interaction started from example')}
          />
          <div className="flex gap-3">
            <button
              onClick={sendTestMessage}
              disabled={!isConnected}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Test Message
            </button>
            <button
              onClick={clearMessages}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Clear Messages
            </button>
            {error && (
              <button
                onClick={clearError}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Clear Error
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <VoiceStatus className="max-w-md mx-auto" />

      {/* Message History */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Message History</h2>
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No messages yet. Connect and start talking!
          </p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.type === 'transcription' 
                    ? 'bg-blue-100 border-l-4 border-blue-500'
                    : message.type === 'connection'
                    ? 'bg-green-100 border-l-4 border-green-500'
                    : 'bg-gray-100 border-l-4 border-gray-400'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      {message.type.charAt(0).toUpperCase() + message.type.slice(1)}
                    </p>
                    <div className="text-sm text-gray-600">
                      {message.type === 'transcription' && (
                        <div>
                          <p>{(message.data as any).text}</p>
                          <p className="text-xs mt-1">
                            Confidence: {((message.data as any).confidence * 100).toFixed(1)}%
                            {(message.data as any).is_final && ' (Final)'}
                          </p>
                        </div>
                      )}
                      {message.type === 'connection' && (
                        <p>Status: {(message.data as any).status}</p>
                      )}
                      {message.type === 'audio' && (
                        <p>Audio data received (Sample rate: {(message.data as any).sample_rate})</p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 ml-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Development Info */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Development Info</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Connection State:</strong> {connectionState}
          </div>
          <div>
            <strong>Is Connected:</strong> {isConnected ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>Is Connecting:</strong> {isConnecting ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>Mock Mode:</strong> {isMockMode ? 'Yes' : 'No'}
          </div>
          <div className="col-span-2">
            <strong>Current Transcription:</strong> {currentTranscription || 'None'}
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Toggle "Use Mock WebSocket" to switch between real and mock connections</li>
          <li>Click the voice orb to connect/disconnect</li>
          <li>When connected in mock mode, you'll see periodic transcription messages</li>
          <li>Use "Send Test Message" to test sending data to the WebSocket</li>
          <li>Watch the message history to see real-time communication</li>
          <li>For real mode, ensure your ElevenLabs API key and voice ID are configured</li>
        </ol>
      </div>
    </div>
  );
};

export default MockWebSocketExample;