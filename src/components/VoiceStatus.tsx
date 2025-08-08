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
        icon: <MicOff className="w-4 h-4 text-red-400" />,
        text: error,
        color: 'text-red-300',
        bgColor: 'bg-red-500/20',
        borderColor: 'border-red-400/30'
      };
    }

    if (isProcessing) {
      return {
        icon: <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />,
        text: 'Connecting...',
        color: 'text-blue-300',
        bgColor: 'bg-blue-500/20',
        borderColor: 'border-blue-400/30'
      };
    }

    if (isListening) {
      return {
        icon: <Mic className="w-4 h-4 text-green-400" />,
        text: 'Listening...',
        color: 'text-green-300',
        bgColor: 'bg-green-500/20',
        borderColor: 'border-green-400/30'
      };
    }

    if (isSpeaking) {
      return {
        icon: <Volume2 className="w-4 h-4 text-purple-400" />,
        text: 'AI speaking...',
        color: 'text-purple-300',
        bgColor: 'bg-purple-500/20',
        borderColor: 'border-purple-400/30'
      };
    }

    if (isConnected) {
      return {
        icon: <Mic className="w-4 h-4 text-white" />,
        text: 'Ready',
        color: 'text-white',
        bgColor: 'bg-white/20',
        borderColor: 'border-white/30'
      };
    }

    return {
      icon: <MicOff className="w-4 h-4 text-white/60" />,
      text: 'Voice AI',
      color: 'text-white/80',
      bgColor: 'bg-white/10',
      borderColor: 'border-white/20'
    };
  };

  const statusInfo = getStatusInfo();

  const isActive = isListening || isSpeaking || isProcessing;

  // Only render if the agent is active (listening, speaking, or processing)
  if (!isActive && !error) {
    return null;
  }

  return (
    <div
      className={`
        glass rounded-full flex items-center px-3 py-2 shadow-lg backdrop-blur-xl border border-white/20 bg-white/10
        transition-all duration-300 ease-in-out touch-manipulation liquid-glass
        ${isActive ? 'opacity-100 scale-105' : 'opacity-80 scale-100'}
      `}
      style={{ filter: "url(#liquid-glass-filter)" }}
    >
      {statusInfo.icon}
      <span className={`text-sm font-medium ${statusInfo.color} ml-2`}>
        {statusInfo.text}
      </span>
      
      {/* Timer display */}
      {isTimerActive && timeRemaining !== null && timeRemaining > 0 && (
        <div className="flex items-center ml-3 px-2 py-1 bg-orange-500/20 rounded-full border border-orange-400/30 backdrop-blur-sm">
          <Clock className="w-3 h-3 text-orange-300 mr-1" />
          <span className="text-xs font-mono font-medium text-orange-200">
            {formatTime(timeRemaining)}
          </span>
        </div>
      )}
      
      {isActive && onStop && (
        <button
          onClick={onStop}
          className="ml-2 p-1 md:p-1 p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-all duration-200 touch-manipulation backdrop-blur-sm border border-red-400/30"
          title="Stop conversation"
          aria-label="Stop conversation"
        >
          <Square className="w-4 h-4 md:w-4 md:h-4 w-5 h-5 text-red-300" />
        </button>
      )}
    </div>
  );
};

export default VoiceStatus; 