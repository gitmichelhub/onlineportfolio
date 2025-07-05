import React from 'react';
import { Loader2, Wifi, WifiOff, AlertCircle } from 'lucide-react';
import { useVoiceAgent } from '../hooks/use-voice-agent';
import { mockUtils } from '../services/mockWebSocket';

interface VoiceStatusProps {
  className?: string;
}

export const VoiceStatus: React.FC<VoiceStatusProps> = ({ className = '' }) => {
  const {
    connectionState,
    isConnecting,
    isConnected,
    isMockMode,
    currentTranscription,
    error,
    reconnectAttempts,
    maxReconnectAttempts,
    isReconnecting,
  } = useVoiceAgent();

  const getStatusIcon = () => {
    if (isConnecting || isReconnecting) {
      return <Loader2 className="w-4 h-4 animate-spin" />;
    }
    if (isConnected) {
      return <Wifi className="w-4 h-4 text-green-500" />;
    }
    if (error) {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
    return <WifiOff className="w-4 h-4 text-gray-400" />;
  };

  const getStatusText = () => {
    if (isConnecting) return 'Connecting...';
    if (isReconnecting) return `Reconnecting... (${reconnectAttempts}/${maxReconnectAttempts})`;
    if (isConnected) return isMockMode ? 'Connected (Mock)' : 'Connected';
    if (error) return `Error: ${error}`;
    return 'Disconnected';
  };

  const getStatusColor = () => {
    if (isConnecting || isReconnecting) return 'text-blue-500';
    if (isConnected) return 'text-green-500';
    if (error) return 'text-red-500';
    return 'text-gray-400';
  };

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 ${className}`}>
      {/* Connection Status */}
      <div className="flex items-center gap-2 mb-3">
        {getStatusIcon()}
        <span className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
        {isMockMode && (
          <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
            MOCK
          </span>
        )}
      </div>

      {/* Mock Mode Toggle */}
      {!isConnected && (
        <div className="mb-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={mockUtils.isMockEnabled()}
              onChange={(e) => {
                if (e.target.checked) {
                  mockUtils.enableMock();
                } else {
                  mockUtils.disableMock();
                }
                // Refresh the page to apply changes
                window.location.reload();
              }}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-300">Use Mock Mode</span>
          </label>
        </div>
      )}

      {/* Current Transcription */}
      {currentTranscription && (
        <div className="mt-3 p-3 bg-black/20 rounded-lg border-l-4 border-indigo-500">
          <p className="text-sm text-gray-300 mb-1">Latest Transcription:</p>
          <p className="text-white text-sm leading-relaxed">{currentTranscription}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-500/20 rounded-lg border-l-4 border-red-500">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Development Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-3 text-xs text-gray-400">
          <p>Connection State: {connectionState}</p>
          <p>Mock Mode: {isMockMode ? 'Yes' : 'No'}</p>
          {isConnected && (
            <p>WebSocket Ready State: {isConnected ? 'OPEN' : 'CLOSED'}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceStatus;