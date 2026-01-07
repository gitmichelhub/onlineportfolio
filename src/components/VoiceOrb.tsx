
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
  timeRemaining?: number | null;
  isTimerActive?: boolean;
}

const VoiceOrb: React.FC<VoiceOrbProps> = ({ 
  size = 'large', 
  state,
  onToggle,
  timeRemaining,
  isTimerActive
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const STICKY_THRESHOLD = 100; // When to start the sticky behavior (after hero section)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > STICKY_THRESHOLD) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint to match navigation
    };

    // Initial check
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

  // Dynamic sizing based on sticky state and screen size
  const getOrbSize = () => {
    if (isSticky) {
      if (isMobile) {
        return 'w-10 h-10'; // 40px when sticky on mobile
      }
      return 'w-10 h-10'; // 40px when sticky on desktop
    }
    
    if (isMobile) {
      return size === 'large' ? 'w-16 h-16' : 'w-14 h-14'; // Smaller on mobile
    }
    
    return size === 'large' ? 'w-20 h-20' : 'w-16 h-16';
  };

  const getIconSize = () => {
    if (isSticky) {
      if (isMobile) {
        return 20; // Smaller icon when sticky on mobile
      }
      return 20; // Smaller icon when sticky on desktop
    }
    
    if (isMobile) {
      return size === 'large' ? 28 : 24; // Smaller icons on mobile
    }
    
    return size === 'large' ? 32 : 24;
  };

  // Dynamic positioning based on sticky state and screen size
  const getPositionClasses = () => {
    if (isSticky) {
      if (isMobile) {
        return 'fixed top-4 left-4 z-[9999]'; // Much higher z-index to stay above all content
      }
      return 'fixed top-4 right-4 z-[9999]'; // Much higher z-index to stay above all content
    }
    
    // When not sticky, return empty string to stay in normal flow (centered in hero section)
    return '';
  };

  // Determine button state and styling
  const isProcessing = state.isProcessing;
  const isListening = state.isListening;
  const isSpeaking = state.isSpeaking;
  const isConnected = state.isConnected;
  const isActive = isListening || isSpeaking || isProcessing;

  // Dynamic styling based on state
  const getButtonClasses = () => {
    let baseClasses = `${getOrbSize()} rounded-full glass flex items-center justify-center transition-all duration-300 ease-out group relative overflow-hidden`;
    
    // Enhanced glass effect when active
    if (isActive) {
      baseClasses += ' backdrop-blur-xl border border-white/80 bg-white/70 shadow-lg';
    } else {
      baseClasses += ' backdrop-blur-xl border border-white/80 bg-white/60 hover:scale-105 hover:shadow-xl hover:bg-white/75 active:scale-95';
    }
    
    // Mobile-specific touch improvements
    if (isMobile) {
      baseClasses += ' touch-manipulation'; // Better touch handling
    }
    
    // Timer warning: custom animation when less than 30 seconds remaining
    if (isTimerActive && timeRemaining !== null && timeRemaining <= 30) {
      return `${baseClasses} animate-timer-warning`;
    }
    
    if (isProcessing) {
      return `${baseClasses} animate-pulse`;
    } else {
      return baseClasses;
    }
  };

  const getGlowColor = () => {
    // Timer warning: less than 30 seconds remaining
    if (isTimerActive && timeRemaining !== null && timeRemaining <= 30) {
      return 'rgba(239, 68, 68, 0.4)'; // Red glow for timer warning
    }
    
    if (isProcessing) return 'rgba(20, 184, 166, 0.4)'; // Teal for processing
    if (isListening) return 'rgba(34, 197, 94, 0.4)'; // Green for listening
    if (isSpeaking) return 'rgba(185, 120, 70, 0.4)'; // Copper for speaking
    if (isConnected) return 'rgba(185, 120, 70, 0.3)'; // Copper for connected
    return 'rgba(185, 120, 70, 0.2)'; // Default copper
  };

  const getIconColor = () => {
    // Timer warning: less than 30 seconds remaining
    if (isTimerActive && timeRemaining !== null && timeRemaining <= 30) {
      return 'text-red-500'; // Red icon for timer warning
    }
    
    if (isProcessing) return 'text-glass-teal';
    if (isListening) return 'text-emerald-500';
    if (isSpeaking) return 'text-glass-copper';
    if (isConnected) return 'text-glass-copper';
    return 'text-glass-copper';
  };

  const getBackgroundGradient = () => {
    // Timer warning: less than 30 seconds remaining
    if (isTimerActive && timeRemaining !== null && timeRemaining <= 30) {
      return 'from-red-500/15 to-orange-500/15'; // Red gradient for timer warning
    }
    
    if (isProcessing) return 'from-glass-teal/15 to-emerald-400/15';
    if (isListening) return 'from-emerald-400/15 to-green-400/15';
    if (isSpeaking) return 'from-glass-copper/15 to-glass-amber/15';
    if (isConnected) return 'from-glass-copper/15 to-glass-amber/15';
    return 'from-glass-copper/10 to-glass-amber/10';
  };

  // Adjust glow intensity for mobile
  const getGlowIntensity = () => {
    if (isMobile) {
      return '0 0 25px'; // Reduced glow on mobile for better performance
    }
    return '0 0 35px';
  };

  // Adjust status indicator size for mobile
  const getStatusIndicatorSize = () => {
    if (isSticky) {
      if (isMobile) {
        return '-top-0.5 -right-0.5 w-2 h-2'; // Smaller on mobile when sticky
      }
      return '-top-0.5 -right-0.5 w-2 h-2'; // Smaller when sticky
    }
    
    if (isMobile) {
      return '-top-1 -right-1 w-3 h-3'; // Smaller on mobile
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
        {/* Enhanced background gradient */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getBackgroundGradient()} opacity-50`} />
        
        {/* Ripple effect */}
        {isClicked && (
          <div className="absolute inset-0 rounded-full border-2 border-glass-copper/50 animate-ripple" />
        )}
        
        {/* Enhanced status indicator - responsive sizing */}
        {isActive && (
          <div className={`absolute ${getStatusIndicatorSize()} bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50`} />
        )}
        
        {/* Mic icon with enhanced styling */}
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

  // Use portal for sticky voice orb to render it outside the normal DOM hierarchy
  if (isSticky) {
    return createPortal(voiceOrbElement, document.body);
  }

  // Return normal voice orb for non-sticky state
  return voiceOrbElement;
};

export default VoiceOrb;
