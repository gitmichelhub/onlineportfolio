
import React, { useState, useEffect } from 'react';
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
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Calculate navbar height (approximately 80px based on h-20)
  const NAVBAR_HEIGHT = 80;
  const STICKY_THRESHOLD = 100; // When to start the sticky behavior

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
      setIsMobile(window.innerWidth < 768); // md breakpoint
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
        return 'w-12 h-12'; // 48px when sticky on mobile
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
        return 24; // Larger icon when sticky on mobile for better touch target
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
        return 'fixed top-3 left-1/2 transform -translate-x-1/2 z-50'; // Center horizontally, avoid mobile menu button
      }
      return 'fixed top-4 right-4 z-50'; // Desktop sticky position
    }
    
    if (position === 'bottom') {
      return 'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 md:hidden'; // Adjusted bottom position
    }
    
    return ''; // Original position
  };

  // Determine button state and styling
  const isProcessing = state.isProcessing;
  const isListening = state.isListening;
  const isSpeaking = state.isSpeaking;
  const isConnected = state.isConnected;
  const isActive = isConnected || isListening || isSpeaking;

  // Dynamic styling based on state
  const getButtonClasses = () => {
    let baseClasses = `${getOrbSize()} rounded-full glass flex items-center justify-center transition-all duration-300 ease-out group relative overflow-hidden`;
    
    // Enhanced glass effect when active, matching navbar styling
    if (isActive) {
      baseClasses += ' glass backdrop-blur-md border border-white/30 bg-white/40 shadow-lg shadow-indigo-500/20';
    } else {
      baseClasses += ' glass backdrop-blur-md border border-white/30 bg-white/40 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95';
    }
    
    // Mobile-specific touch improvements
    if (isMobile) {
      baseClasses += ' touch-manipulation'; // Better touch handling
    }
    
    if (isProcessing) {
      return `${baseClasses} animate-pulse`;
    } else {
      return baseClasses;
    }
  };

  const getGlowColor = () => {
    if (isProcessing) return 'rgba(59, 130, 246, 0.6)'; // Enhanced blue for processing
    if (isListening) return 'rgba(34, 197, 94, 0.6)'; // Enhanced green for listening
    if (isSpeaking) return 'rgba(168, 85, 247, 0.6)'; // Enhanced purple for speaking
    if (isConnected) return 'rgba(79, 70, 229, 0.5)'; // Enhanced indigo for connected
    return 'rgba(79, 70, 229, 0.3)'; // Default indigo
  };

  const getIconColor = () => {
    if (isProcessing) return 'text-blue-600';
    if (isListening) return 'text-green-600';
    if (isSpeaking) return 'text-purple-600';
    if (isConnected) return 'text-indigo-600';
    return 'text-indigo-600';
  };

  const getBackgroundGradient = () => {
    if (isProcessing) return 'from-blue-500/20 to-blue-600/20';
    if (isListening) return 'from-green-500/20 to-emerald-600/20';
    if (isSpeaking) return 'from-purple-500/20 to-violet-600/20';
    if (isConnected) return 'from-indigo-500/20 to-purple-600/20';
    return 'from-indigo-500/20 to-purple-600/20';
  };

  // Adjust glow intensity for mobile
  const getGlowIntensity = () => {
    if (isMobile) {
      return '0 0 30px'; // Reduced glow on mobile for better performance
    }
    return '0 0 40px';
  };

  // Adjust status indicator size for mobile
  const getStatusIndicatorSize = () => {
    if (isSticky) {
      if (isMobile) {
        return '-top-0.5 -right-0.5 w-3 h-3'; // Same size as desktop sticky
      }
      return '-top-0.5 -right-0.5 w-3 h-3';
    }
    
    if (isMobile) {
      return '-top-1 -right-1 w-3 h-3'; // Smaller on mobile
    }
    
    return '-top-1 -right-1 w-4 h-4';
  };

  return (
    <div className={getPositionClasses()}>
      <button
        onClick={handleClick}
        disabled={isProcessing}
        className={getButtonClasses()}
        style={{
          boxShadow: `${getGlowIntensity()} ${getGlowColor()}, 0 8px 32px rgba(0, 0, 0, 0.1)`,
        }}
        role="button"
        aria-label={isActive ? "Stop voice chat" : "Start voice chat"}
      >
        {/* Enhanced background gradient */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getBackgroundGradient()} opacity-30`} />
        
        {/* Ripple effect */}
        {isClicked && (
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-ripple" />
        )}
        
        {/* Enhanced status indicator - responsive sizing */}
        {isActive && (
          <div className={`absolute ${getStatusIndicatorSize()} bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50`} />
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
};

export default VoiceOrb;
