import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Mic, MicOff } from 'lucide-react';

interface VoiceAgentState {
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
}

interface VoiceOrbProps {
  size?: 'large' | 'small';
  state: VoiceAgentState;
  onToggle: () => void;
}

const VoiceOrb: React.FC<VoiceOrbProps> = ({ 
  size = 'large', 
  state,
  onToggle
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const STICKY_THRESHOLD = 100;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > STICKY_THRESHOLD);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    onToggle();
  };

  const getOrbSize = () => {
    if (isSticky) {
      return 'w-10 h-10';
    }
    if (isMobile) {
      return size === 'large' ? 'w-16 h-16' : 'w-14 h-14';
    }
    return size === 'large' ? 'w-20 h-20' : 'w-16 h-16';
  };

  const getIconSize = () => {
    if (isSticky) {
      return 20;
    }
    if (isMobile) {
      return size === 'large' ? 28 : 24;
    }
    return size === 'large' ? 32 : 24;
  };

  const getPositionClasses = () => {
    if (isSticky) {
      if (isMobile) {
        return 'fixed top-4 left-4 z-[9999]';
      }
      return 'fixed top-4 right-4 z-[9999]';
    }
    return '';
  };

  const isProcessing = state.isProcessing;
  const isListening = state.isListening;
  const isSpeaking = state.isSpeaking;
  const isConnected = state.isConnected;
  const isActive = isListening || isSpeaking || isProcessing;

  const getButtonClasses = () => {
    let baseClasses = `${getOrbSize()} rounded-full glass flex items-center justify-center transition-all duration-300 ease-out group relative overflow-hidden`;
    
    if (isActive) {
      baseClasses += ' backdrop-blur-xl border border-white/80 bg-white/70 shadow-lg';
    } else {
      baseClasses += ' backdrop-blur-xl border border-white/80 bg-white/60 hover:scale-105 hover:shadow-xl hover:bg-white/75 active:scale-95';
    }
    
    if (isMobile) {
      baseClasses += ' touch-manipulation';
    }
    
    if (isProcessing) {
      return `${baseClasses} animate-pulse`;
    }
    return baseClasses;
  };

  const getGlowColor = () => {
    if (isProcessing) return 'rgba(20, 184, 166, 0.4)';
    if (isListening) return 'rgba(34, 197, 94, 0.4)';
    if (isSpeaking) return 'rgba(185, 120, 70, 0.4)';
    if (isConnected) return 'rgba(185, 120, 70, 0.3)';
    return 'rgba(185, 120, 70, 0.2)';
  };

  const getIconColor = () => {
    if (isProcessing) return 'text-glass-teal';
    if (isListening) return 'text-emerald-500';
    if (isSpeaking) return 'text-glass-copper';
    if (isConnected) return 'text-glass-copper';
    return 'text-glass-copper';
  };

  const getBackgroundGradient = () => {
    if (isProcessing) return 'from-glass-teal/15 to-emerald-400/15';
    if (isListening) return 'from-emerald-400/15 to-green-400/15';
    if (isSpeaking) return 'from-glass-copper/15 to-glass-amber/15';
    if (isConnected) return 'from-glass-copper/15 to-glass-amber/15';
    return 'from-glass-copper/10 to-glass-amber/10';
  };

  const getGlowIntensity = () => {
    if (isMobile) {
      return '0 0 25px';
    }
    return '0 0 35px';
  };

  const getStatusIndicatorSize = () => {
    if (isSticky) {
      return '-top-0.5 -right-0.5 w-2 h-2';
    }
    if (isMobile) {
      return '-top-1 -right-1 w-3 h-3';
    }
    return '-top-1 -right-1 w-4 h-4';
  };

  const voiceOrbElement = (
    <div className={getPositionClasses()}>
      <button
        onClick={handleClick}
        disabled={isProcessing}
        className={getButtonClasses()}
        style={{
          boxShadow: `${getGlowIntensity()} ${getGlowColor()}, 0 8px 32px rgba(0, 0, 0, 0.08)`,
        }}
        role="button"
        aria-label={isActive ? "Stop voice chat" : "Start voice chat"}
      >
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getBackgroundGradient()} opacity-50`} />
        
        {isClicked && (
          <div className="absolute inset-0 rounded-full border-2 border-glass-copper/50 animate-ripple" />
        )}
        
        {isActive && (
          <div className={`absolute ${getStatusIndicatorSize()} bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50`} />
        )}
        
        {isActive ? (
          <MicOff 
            size={getIconSize()} 
            className={`${getIconColor()} relative z-10 transition-transform duration-200 group-hover:scale-110 drop-shadow-sm`} 
          />
        ) : (
          <Mic 
            size={getIconSize()} 
            className={`${getIconColor()} relative z-10 transition-transform duration-200 group-hover:scale-110 drop-shadow-sm`} 
          />
        )}
      </button>
    </div>
  );

  if (isSticky) {
    return createPortal(voiceOrbElement, document.body);
  }

  return voiceOrbElement;
};

export default VoiceOrb;
