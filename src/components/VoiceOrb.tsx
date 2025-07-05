
import React, { useState } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useVoiceAgent } from '../hooks/use-voice-agent';

interface VoiceOrbProps {
  size?: 'large' | 'small';
  position?: 'center' | 'bottom';
  onVoiceStart?: () => void;
}

const VoiceOrb: React.FC<VoiceOrbProps> = ({ 
  size = 'large', 
  position = 'center',
  onVoiceStart 
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const { 
    isConnected, 
    isConnecting, 
    isMockMode, 
    connect, 
    disconnect, 
    error 
  } = useVoiceAgent();

  const handleClick = async () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    
    if (onVoiceStart) {
      onVoiceStart();
    }
    
    if (isConnected) {
      console.log('🔌 Disconnecting voice interaction');
      disconnect();
    } else {
      console.log('🔗 Starting voice interaction');
      await connect();
    }
  };

  const orbSize = size === 'large' ? 'w-20 h-20' : 'w-16 h-16';
  const iconSize = size === 'large' ? 32 : 24;

  const positionClasses = position === 'bottom' 
    ? 'fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 md:hidden'
    : '';

  // Choose icon based on state
  const getIcon = () => {
    if (isConnecting) {
      return <Loader2 size={iconSize} className="animate-spin text-indigo-600 relative z-10" />;
    }
    if (isConnected) {
      return <MicOff size={iconSize} className="text-red-500 relative z-10" />;
    }
    return <Mic size={iconSize} className="text-indigo-600 relative z-10 transition-transform duration-200 group-hover:scale-110" />;
  };

  // Choose colors based on state
  const getGlowColor = () => {
    if (isConnected) return 'rgba(239, 68, 68, 0.3)'; // Red glow when connected
    if (error) return 'rgba(245, 101, 101, 0.3)'; // Light red for error
    return 'rgba(79, 70, 229, 0.3)'; // Default indigo
  };

  const getGradientClasses = () => {
    if (isConnected) return 'from-red-500 to-pink-600';
    if (error) return 'from-red-400 to-orange-500';
    return 'from-indigo-500 to-purple-600';
  };

  return (
    <div className={positionClasses}>
      <button
        onClick={handleClick}
        disabled={isConnecting}
        className={`
          ${orbSize} rounded-full glass
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-2xl
          active:scale-95
          group relative overflow-hidden
          ${isConnecting ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
        style={{
          boxShadow: `0 0 30px ${getGlowColor()}`,
        }}
        role="button"
        aria-label={isConnected ? "Stop voice chat" : "Start voice chat"}
        title={isMockMode ? "Mock Mode Active" : undefined}
      >
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getGradientClasses()} opacity-20 animate-pulse-glow`} />
        
        {/* Mock mode indicator */}
        {isMockMode && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-white" />
        )}
        
        {/* Ripple effect */}
        {isClicked && (
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-ripple" />
        )}
        
        {/* Dynamic icon */}
        {getIcon()}
      </button>
    </div>
  );
};

export default VoiceOrb;
