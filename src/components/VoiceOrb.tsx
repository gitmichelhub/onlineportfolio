
import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceAgentState {
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
}

interface VoiceOrbProps {
  size?: 'large' | 'small';
  position?: 'center' | 'bottom';
  state: VoiceAgentState;
  onToggle: () => void;
}

const VoiceOrb: React.FC<VoiceOrbProps> = ({ 
  size = 'large', 
  position = 'center',
  state,
  onToggle
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    onToggle();
  };

  const orbSize = size === 'large' ? 'w-20 h-20' : 'w-16 h-16';
  const iconSize = size === 'large' ? 32 : 24;

  const positionClasses = position === 'bottom' 
    ? 'fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 md:hidden'
    : '';

  // Determine button state and styling
  const isProcessing = state.isProcessing;
  const isListening = state.isListening;
  const isSpeaking = state.isSpeaking;
  const isConnected = state.isConnected;
  const isActive = isConnected || isListening || isSpeaking;

  // Dynamic styling based on state
  const getButtonClasses = () => {
    let baseClasses = `${orbSize} rounded-full glass flex items-center justify-center transition-all duration-300 ease-out group relative overflow-hidden`;
    
    if (isProcessing) {
      return `${baseClasses} animate-pulse`;
    } else {
      return `${baseClasses} hover:scale-105 hover:shadow-2xl active:scale-95`;
    }
  };

  const getGlowColor = () => {
    if (isProcessing) return 'rgba(59, 130, 246, 0.5)'; // Blue for processing
    if (isListening) return 'rgba(34, 197, 94, 0.5)'; // Green for listening
    if (isSpeaking) return 'rgba(168, 85, 247, 0.5)'; // Purple for speaking
    return 'rgba(79, 70, 229, 0.3)'; // Default indigo
  };

  const getIconColor = () => {
    if (isProcessing) return 'text-blue-600';
    if (isListening) return 'text-green-600';
    if (isSpeaking) return 'text-purple-600';
    return 'text-indigo-600';
  };

  return (
    <div className={positionClasses}>
      <button
        onClick={handleClick}
        disabled={isProcessing}
        className={getButtonClasses()}
        style={{
          boxShadow: `0 0 30px ${getGlowColor()}`,
        }}
        role="button"
        aria-label={isActive ? "Stop voice chat" : "Start voice chat"}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 animate-pulse-glow" />
        
        {/* Ripple effect */}
        {isClicked && (
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-ripple" />
        )}
        
        {/* Status indicator */}
        {isActive && (
          <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        )}
        
        {/* Mic icon */}
        {isActive ? (
          <MicOff 
            size={iconSize} 
            className={`${getIconColor()} relative z-10 transition-transform duration-200 group-hover:scale-110`} 
          />
        ) : (
          <Mic 
            size={iconSize} 
            className={`${getIconColor()} relative z-10 transition-transform duration-200 group-hover:scale-110`} 
          />
        )}
      </button>
    </div>
  );
};

export default VoiceOrb;
