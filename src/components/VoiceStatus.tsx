import React from 'react';
import { Mic, MicOff, Volume2, Loader2, Square } from 'lucide-react';

interface VoiceAgentState {
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
}

interface VoiceStatusProps {
  state: VoiceAgentState;
  error: string | null;
  onStop?: () => void;
}

const VoiceStatus: React.FC<VoiceStatusProps> = ({ state, error, onStop }) => {
  const { isConnected, isListening, isSpeaking, isProcessing } = state;

  const getStatusInfo = () => {
    if (error) {
      return {
        icon: <MicOff className="w-4 h-4 text-red-500" />,
        text: error,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-200'
      };
    }

    if (isProcessing) {
      return {
        icon: <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />,
        text: 'Connecting...',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-200'
      };
    }

    if (isListening) {
      return {
        icon: <Mic className="w-4 h-4 text-green-500" />,
        text: 'Listening...',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        borderColor: 'border-green-200'
      };
    }

    if (isSpeaking) {
      return {
        icon: <Volume2 className="w-4 h-4 text-purple-500" />,
        text: 'AI speaking...',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        borderColor: 'border-purple-200'
      };
    }

    if (isConnected) {
      return {
        icon: <Mic className="w-4 h-4 text-indigo-500" />,
        text: 'Ready',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100',
        borderColor: 'border-indigo-200'
      };
    }

    return {
      icon: <MicOff className="w-4 h-4 text-gray-500" />,
      text: 'Voice AI',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-200'
    };
  };

  const statusInfo = getStatusInfo();

  const isActive = isListening || isSpeaking || isProcessing;

  return (
    <div
      className={`
        glass rounded-full flex items-center px-3 py-2 shadow-md backdrop-blur-md border border-white/30 bg-white/40
        transition-all duration-300 ease-in-out
        ${isConnected || isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      style={{ filter: "url(#liquid-glass-filter)" }}
    >
      {statusInfo.icon}
      <span className={`text-sm font-medium ${statusInfo.color} ml-2`}>
        {statusInfo.text}
      </span>
      {isActive && onStop && (
        <button
          onClick={onStop}
          className="ml-2 p-1 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
          title="Stop conversation"
          aria-label="Stop conversation"
        >
          <Square className="w-4 h-4 text-red-600" />
        </button>
      )}
    </div>
  );
};

export default VoiceStatus; 