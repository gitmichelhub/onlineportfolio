
import React from 'react';
import VoiceOrb from './VoiceOrb';
import VoiceStatus from './VoiceStatus';

const HeroSection: React.FC = () => {
  const onVoiceStart = () => {
    console.log('Voice interaction started with ElevenLabs WebSocket');
  };

  return (
    <section id="voice" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-shape absolute top-20 left-20 w-64 h-64 rounded-full animate-float" 
             style={{ animationDelay: '0s', transform: 'rotate(20deg)' }} />
        <div className="floating-shape absolute bottom-20 right-20 w-48 h-48 rounded-full animate-float" 
             style={{ animationDelay: '2s', transform: 'rotate(-20deg)' }} />
        <div className="floating-shape absolute top-1/2 left-10 w-32 h-32 rounded-full animate-float" 
             style={{ animationDelay: '4s', transform: 'rotate(15deg)' }} />
      </div>

      {/* White glass overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 leading-tight">
              Talk to Mike
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-8 leading-relaxed">
              Ask me anything about my experience, my work, or my life.
            </p>
            <div className="hidden lg:block">
              <p className="text-lg text-slate-500 max-w-md">
                Click the voice button to start an interactive conversation. 
                I'm here to help with your questions about technology, development, and more.
              </p>
            </div>
          </div>

          {/* Right side - Voice Orb */}
          <div className="flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <VoiceOrb size="large" onVoiceStart={onVoiceStart} />
          </div>
        </div>
        
        {/* Voice Status Panel */}
        <div className="mt-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <VoiceStatus />
        </div>
      </div>

      {/* Mobile Voice Orb */}
      <VoiceOrb size="small" position="bottom" onVoiceStart={onVoiceStart} />
    </section>
  );
};

export default HeroSection;
