
import React, { useState } from 'react';
import { Mic } from 'lucide-react';

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

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    
    if (onVoiceStart) {
      onVoiceStart();
    }
    
    console.log('Voice interaction started!');
  };

  const orbSize = size === 'large' ? 'w-20 h-20' : 'w-16 h-16';
  const iconSize = size === 'large' ? 32 : 24;

  const positionClasses = position === 'bottom' 
    ? 'fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 md:hidden'
    : '';

  return (
    <div className={positionClasses}>
      <button
        onClick={handleClick}
        className={`
          ${orbSize} rounded-full glass
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-2xl
          active:scale-95
          group relative overflow-hidden
        `}
        style={{
          boxShadow: '0 0 30px rgba(79, 70, 229, 0.3)',
        }}
        role="button"
        aria-label="Start voice chat"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 animate-pulse-glow" />
        
        {/* Ripple effect */}
        {isClicked && (
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-ripple" />
        )}
        
        {/* Mic icon */}
        <Mic 
          size={iconSize} 
          className="text-indigo-600 relative z-10 transition-transform duration-200 group-hover:scale-110" 
        />
      </button>
    </div>
  );
};

export default VoiceOrb;
