import React, { useEffect, useRef, useState } from 'react';
import VoiceOrb from './VoiceOrb';
import VoiceConsentDialog from './VoiceConsentDialog';
import { useLanguage } from "@/hooks/use-language";
import type { TranscriptEntry } from '@/lib/voice-types';

const CONSENT_STORAGE_KEY = 'voice-consent';

interface HeroSectionProps {
  state: {
    isConnecting: boolean;
    isConnected: boolean;
    isListening: boolean;
    isSpeaking: boolean;
    isProcessing: boolean;
  };
  error: string | null;
  startConversation: () => Promise<void>;
  stopConversation: () => Promise<void>;
  forceStopConversation: () => Promise<void>;
  isActive: boolean;
  callDuration?: number | null;
  isTimerActive?: boolean;
  transcript: TranscriptEntry[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ state, error, startConversation, stopConversation, forceStopConversation, isActive, callDuration, isTimerActive, transcript }) => {
  const { language } = useLanguage();
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [hasConsented, setHasConsented] = useState(() => {
    try {
      return localStorage.getItem(CONSENT_STORAGE_KEY) === 'accepted';
    } catch {
      return false;
    }
  });
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [transcript]);

  const beginConversation = async () => {
    if (!hasConsented) {
      setShowConsentDialog(true);
      return;
    }
    await startConversation();
  };

  const handleVoiceToggle = async () => {
    try {
      if (isActive) {
        // Try normal stop first, then force stop if needed
        try {
          await stopConversation();
        } catch (err) {
          console.error('Normal stop failed, trying force stop:', err);
          await forceStopConversation();
        }
      } else {
        await beginConversation();
      }
    } catch (err) {
      console.error('Voice interaction error:', err);
    }
  };

  const handlePromptClick = async () => {
    if (isActive) return;
    try {
      await beginConversation();
    } catch (err) {
      console.error('Voice interaction error:', err);
    }
  };

  const handleConsentAgree = async () => {
    setHasConsented(true);
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    } catch {
      // Ignore storage errors — consent just won't persist across visits.
    }
    try {
      await startConversation();
    } catch (err) {
      console.error('Voice interaction error after consent:', err);
    }
  };
  const t = {
    en: {
      name: "Michel Werner",
      role: "AI Engineer & IT Consultant",
      headline: "Talk to my AI",
      subtitle: "Ask \"me\" anything about my experience, my work, or my life.",
      info: "Click the voice button to start an interactive conversation. I'm here to help with your questions regarding technology, product development, and more.",
      prompts: ["Current projects", "Consulting experience", "AI and product work"],
      promptHint: "Start a voice conversation about",
      you: "You",
      agent: "AI"
    },
    de: {
      name: "Michel Werner",
      role: "KI-Ingenieur & IT-Berater",
      headline: "Sprich mit meiner AI",
      subtitle: "Frag \"mich\" alles über meine Erfahrung, meine Arbeit oder mein Leben.",
      info: "Klicke auf den Sprachbutton, um ein interaktives Gespräch zu starten. Ich helfe dir gerne bei Fragen zu Technologie, Produktentwicklung und mehr.",
      prompts: ["Aktuelle Projekte", "Consulting-Erfahrung", "KI und Produktarbeit"],
      promptHint: "Starte ein Sprachgespräch über",
      you: "Du",
      agent: "KI"
    }
  };

  return (
    <section id="voice" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16">
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Identity */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-up">
          <img
            src="/avatar.png"
            alt=""
            className="w-12 h-12 rounded-full border border-white/80 shadow-md object-cover bg-white/60"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="text-left">
            <p className="font-semibold text-glass-dark leading-tight">{t[language].name}</p>
            <p className="text-sm text-glass-muted leading-tight">{t[language].role}</p>
          </div>
        </div>

        {/* Headline */}
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-glass-dark mb-6 leading-tight font-playfair">
            <span className="text-gradient-warm">{t[language].headline}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-glass-dark/60 leading-relaxed max-w-xl mx-auto">
            {t[language].subtitle}
          </p>
        </div>

        {/* Voice Orb — the centerpiece */}
        <div
          className="flex justify-center my-14 sm:my-16 animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          <VoiceOrb
            size="large"
            state={state}
            onToggle={handleVoiceToggle}
          />
        </div>

        {/* Suggested prompts */}
        <div
          className="flex flex-wrap justify-center gap-3 animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          {t[language].prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={handlePromptClick}
              aria-label={`${t[language].promptHint} ${prompt}`}
              className="glass liquid-glass-soft rounded-full px-4 py-2 text-sm font-medium text-glass-copper transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Supporting copy */}
        <p
          className="mt-8 text-base text-glass-muted max-w-md mx-auto animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          {t[language].info}
        </p>

        {/* Live transcript */}
        {transcript.length > 0 && (
          <div className="mt-10 animate-fade-up">
            <div
              ref={transcriptRef}
              aria-live="polite"
              className="glass liquid-glass-soft rounded-2xl p-5 max-w-2xl mx-auto max-h-72 overflow-y-auto text-left space-y-3"
            >
              {transcript.map((entry, index) => (
                <div key={index} className="text-sm leading-relaxed">
                  <span className={`font-semibold mr-2 ${entry.source === 'user' ? 'text-glass-teal' : 'text-glass-copper'}`}>
                    {entry.source === 'user' ? t[language].you : t[language].agent}
                  </span>
                  <span className="text-glass-dark/80">{entry.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Voice Consent Dialog */}
      <VoiceConsentDialog
        open={showConsentDialog}
        onOpenChange={setShowConsentDialog}
        onAgree={handleConsentAgree}
      />
    </section>
  );
};

export default HeroSection;
