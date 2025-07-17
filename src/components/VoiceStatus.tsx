import React from 'react';
import { Mic, MicOff, Volume2, Loader2, Square, Clock } from 'lucide-react';

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
  timeRemaining?: number | null;
  isTimerActive?: boolean;
}

const VoiceStatus: React.FC<VoiceStatusProps> = ({ 
  state, 
  error, 
  onStop, 
  timeRemaining, 
  isTimerActive 
}) => {
  const { isConnected, isListening, isSpeaking, isProcessing } = state;

  // Format time remaining as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
        transition-all duration-300 ease-in-out touch-manipulation
        ${isConnected || isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      style={{ filter: "url(#liquid-glass-filter)" }}
    >
      {statusInfo.icon}
      <span className={`text-sm font-medium ${statusInfo.color} ml-2`}>
        {statusInfo.text}
      </span>
      
      {/* Timer display */}
      {isTimerActive && timeRemaining !== null && timeRemaining > 0 && (
        <div className="flex items-center ml-3 px-2 py-1 bg-orange-100 rounded-full border border-orange-200">
          <Clock className="w-3 h-3 text-orange-600 mr-1" />
          <span className="text-xs font-mono font-medium text-orange-700">
            {formatTime(timeRemaining)}
          </span>
        </div>
      )}
      
      {isActive && onStop && (
        <button
          onClick={onStop}
          className="ml-2 p-1 md:p-1 p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors touch-manipulation"
          title="Stop conversation"
          aria-label="Stop conversation"
        >
          <Square className="w-4 h-4 md:w-4 md:h-4 w-5 h-5 text-red-600" />
        </button>
      )}
    </div>
  );
};

export default VoiceStatus; 