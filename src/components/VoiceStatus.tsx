import React from 'react';
import { Mic, Volume2, Loader2, Wifi, WifiOff, AlertCircle, Clock, X } from 'lucide-react';

interface VoiceStatusProps {
  state: {
    isConnected: boolean;
    isListening: boolean;
    isSpeaking: boolean;
    isProcessing: boolean;
  };
  error: string | null;
  onStop?: () => void;
  callDuration?: number | null;
  isTimerActive?: boolean;
}

const VoiceStatus: React.FC<VoiceStatusProps> = ({ state, error, onStop, callDuration, isTimerActive }) => {
  const isActive = state.isConnected || state.isListening || state.isSpeaking || state.isProcessing;

  // Don't render anything if not active
  if (!isActive && !error) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusInfo = () => {
    if (error) {
      return {
        icon: <AlertCircle size={16} className="text-red-500" />,
        text: 'Error',
        color: 'text-red-500',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-200'
      };
    }
    if (state.isProcessing) {
      return {
        icon: <Loader2 size={16} className="text-glass-teal animate-spin" />,
        text: 'Processing',
        color: 'text-glass-teal',
        bgColor: 'bg-teal-100',
        borderColor: 'border-teal-200'
      };
    }
    if (state.isSpeaking) {
      return {
        icon: <Volume2 size={16} className="text-glass-copper" />,
        text: 'Speaking',
        color: 'text-glass-copper',
        bgColor: 'bg-amber-100',
        borderColor: 'border-amber-200'
      };
    }
    if (state.isListening) {
      return {
        icon: <Mic size={16} className="text-emerald-500" />,
        text: 'Listening',
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-100',
        borderColor: 'border-emerald-200'
      };
    }
    if (state.isConnected) {
      return {
        icon: <Wifi size={16} className="text-glass-copper" />,
        text: 'Connected',
        color: 'text-glass-copper',
        bgColor: 'bg-amber-100',
        borderColor: 'border-amber-200'
      };
    }
    return {
      icon: <WifiOff size={16} className="text-glass-muted" />,
      text: 'Disconnected',
      color: 'text-glass-muted',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-200'
    };
  };

  const status = getStatusInfo();

  return (
    <div className="glass rounded-full px-4 py-2 flex items-center space-x-3">
      {/* Status indicator */}
      <div className={`flex items-center space-x-2 px-2 py-1 rounded-full ${status.bgColor} border ${status.borderColor}`}>
        {status.icon}
        <span className={`text-xs font-medium ${status.color}`}>
          {status.text}
        </span>
      </div>

      {/* Duration display */}
      {isTimerActive && callDuration !== null && (
        <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-glass-cream border border-glass-cream">
          <Clock size={14} className="text-glass-muted" />
          <span className="text-xs font-mono text-glass-muted">
            {formatTime(callDuration)}
          </span>
        </div>
      )}

      {/* Stop button */}
      {onStop && isActive && (
        <button
          onClick={onStop}
          className="p-1.5 rounded-full bg-glass-cream hover:bg-red-100 text-glass-muted hover:text-red-500 transition-all duration-200 border border-glass-cream hover:border-red-200"
          title="Stop voice chat"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default VoiceStatus;
