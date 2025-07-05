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
  testConnection: () => Promise<void>;
  isActive: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ state, error, startConversation, stopConversation, testConnection, isActive }) => {
  const { language } = useLanguage();

  const handleVoiceToggle = async () => {
    try {
      if (isActive) {
        stopConversation();
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
      info: "Click the voice button to start an interactive conversation. I'm here to help with your questions regardabout technology, product development, and more."
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
      </div>

      {/* White glass overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 leading-tight">
              {t[language].headline}
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-8 leading-relaxed">
              {t[language].subtitle}
            </p>
            <div className="hidden lg:block">
              <p className="text-lg text-slate-500 max-w-md">
                {t[language].info}
              </p>
            </div>
          </div>

          {/* Right side - Voice Orb */}
          <div className="flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <VoiceOrb 
              size="large" 
              state={state}
              onToggle={handleVoiceToggle}
            />
          </div>
        </div>
      </div>

      {/* Mobile Voice Orb */}
      <VoiceOrb 
        size="small" 
        position="bottom" 
        state={state}
        onToggle={handleVoiceToggle}
      />
    </section>
  );
};

export default HeroSection;
