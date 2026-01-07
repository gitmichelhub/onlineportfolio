import React from 'react';
import VoiceOrb from './VoiceOrb';
import { useLanguage } from "@/hooks/use-language";

interface HeroSectionProps {
  state: {
    isConnected: boolean;
    isListening: boolean;
    isSpeaking: boolean;
    isProcessing: boolean;
  };
  error: string | null;
  startConversation: () => Promise<void>;
  stopConversation: () => void;
  forceStopConversation: () => Promise<void>;
  testConnection: () => Promise<void>;
  isActive: boolean;
  timeRemaining?: number | null;
  isTimerActive?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ state, error, startConversation, stopConversation, forceStopConversation, testConnection, isActive, timeRemaining, isTimerActive }) => {
  const { language } = useLanguage();

  const handleVoiceToggle = async () => {
    try {
      if (isActive) {
        // Try normal stop first, then force stop if needed
        try {
          stopConversation();
        } catch (err) {
          console.error('Normal stop failed, trying force stop:', err);
          await forceStopConversation();
        }
      } else {
        // Test connection first
        await testConnection();
        await startConversation();
      }
    } catch (err) {
      console.error('Voice interaction error:', err);
    }
  };
  const t = {
    en: {
      headline: "Talk to my AI",
      subtitle: "Ask \"me\" anything about my experience, my work, or my life.",
      info: "Click the voice button to start an interactive conversation. I'm here to help with your questions regarding technology, product development, and more."
    },
    de: {
      headline: "Sprich mit AI",
      subtitle: "Frag \"mich\" alles über meine Erfahrung, meine Arbeit oder mein Leben.",
      info: "Klicke auf den Sprachbutton, um ein interaktives Gespräch zu starten. Ich helfe dir gerne bei Fragen zu Technologie, Produktentwicklung und mehr."
    }
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
        {/* Subtle light beams */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-glass-copper/10 via-glass-copper/5 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-glass-teal/10 via-transparent to-glass-teal/5" />
      </div>

      {/* Soft light overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-glass-dark mb-6 leading-tight font-playfair">
              <span className="text-gradient-warm">{t[language].headline}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-glass-dark/60 mb-8 leading-relaxed">
              {t[language].subtitle}
            </p>
            <div className="hidden lg:block">
              <p className="text-lg text-glass-muted max-w-md">
                {t[language].info}
              </p>
            </div>
          </div>

          {/* Right side - Voice Orb (centered for all screen sizes) */}
          <div className="flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <VoiceOrb 
              size="large" 
              state={state}
              onToggle={handleVoiceToggle}
              timeRemaining={timeRemaining}
              isTimerActive={isTimerActive}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
