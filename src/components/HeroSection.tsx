import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
  const [hasScrolled, setHasScrolled] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  // No portrait is shipped today, so the monogram below is the real identity mark
  // rather than a fallback — pointing this at a file in `public/` (e.g.
  // '/avatar.png') swaps the photo back in, with the monogram covering a 404.
  // Kept null deliberately: a missing src would 404 on every load and flash.
  const avatarSrc: string | null = null;

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [transcript]);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      subtitle: "Ask “me” anything about my experience, my work, or my life.",
      info: "I'm here for questions about technology, product development, and the work behind these projects.",
      prompts: ["Current projects", "Consulting experience", "AI and product work"],
      promptHint: "Start a voice conversation about",
      scrollCue: "Scroll to projects",
      voiceIdle: "Start the conversation",
      voiceConnecting: "Connecting…",
      voiceListening: "Listening…",
      voiceSpeaking: "Speaking…",
      voiceProcessing: "Thinking…",
      voiceActive: "End the conversation",
      you: "You",
      agent: "AI"
    },
    de: {
      name: "Michel Werner",
      role: "KI-Ingenieur & IT-Berater",
      headline: "Sprich mit meiner AI",
      subtitle: "Frag „mich“ alles über meine Erfahrung, meine Arbeit oder mein Leben.",
      info: "Ich beantworte gerne Fragen zu Technologie, Produktentwicklung und der Arbeit hinter diesen Projekten.",
      prompts: ["Aktuelle Projekte", "Consulting-Erfahrung", "KI und Produktarbeit"],
      promptHint: "Starte ein Sprachgespräch über",
      scrollCue: "Zu den Projekten scrollen",
      voiceIdle: "Gespräch starten",
      voiceConnecting: "Verbindung wird hergestellt…",
      voiceListening: "Ich höre zu…",
      voiceSpeaking: "Ich spreche…",
      voiceProcessing: "Ich denke nach…",
      voiceActive: "Gespräch beenden",
      you: "Du",
      agent: "KI"
    }
  };

  const getVoiceLabel = () => {
    if (state.isConnecting) return t[language].voiceConnecting;
    if (state.isProcessing) return t[language].voiceProcessing;
    if (state.isSpeaking) return t[language].voiceSpeaking;
    if (state.isListening) return t[language].voiceListening;
    if (isActive) return t[language].voiceActive;
    return t[language].voiceIdle;
  };

  return (
    <section id="voice" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16">
      {/* Floating background shapes */}
      <div className="section-geometry geometry-hero" aria-hidden="true">
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
          {avatarSrc && !avatarFailed ? (
            <img
              src={avatarSrc}
              alt=""
              className="w-12 h-12 rounded-full border border-white/80 shadow-md object-cover bg-white/60"
              onError={() => setAvatarFailed(true)}
            />
          ) : (
            <div
              aria-hidden="true"
              className="w-12 h-12 shrink-0 rounded-full border border-glass-copper/25 bg-gradient-to-br from-glass-cream via-white/80 to-glass-copper/15 shadow-md flex items-center justify-center text-sm font-bold tracking-wide text-[#8f552f]"
            >
              MW
            </div>
          )}
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
          <p className="text-xl sm:text-2xl text-glass-dark/75 leading-relaxed max-w-xl mx-auto">
            {t[language].subtitle}
          </p>
        </div>

        {/* Voice Orb — the centerpiece */}
        <div
          className="my-14 sm:my-16 animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="relative flex justify-center">
            <svg
              className={`sound-field ${isActive ? 'sound-field-active' : ''}`}
              viewBox="0 0 360 360"
              aria-hidden="true"
            >
              <circle className="sound-field-ring" cx="180" cy="180" r="64" stroke="rgba(185, 120, 70, 0.42)" strokeWidth="1.2" />
              <circle className="sound-field-ring" cx="180" cy="180" r="92" stroke="rgba(20, 184, 166, 0.32)" strokeWidth="1" strokeDasharray="3 8" />
              <circle className="sound-field-ring" cx="180" cy="180" r="123" stroke="rgba(185, 120, 70, 0.27)" strokeWidth="1" strokeDasharray="1 10" />
              <circle className="sound-field-ring" cx="180" cy="180" r="156" stroke="rgba(20, 184, 166, 0.22)" strokeWidth="0.9" />
            </svg>
            <VoiceOrb
              size="large"
              state={state}
              onToggle={handleVoiceToggle}
            />
          </div>
          <p aria-live="polite" className="mt-6 text-sm font-semibold text-glass-dark/75">
            {getVoiceLabel()}
          </p>
          {/* Deliberately NOT a .glass surface: .glass-content paints gradient
              background-images, which sit above background-color and would mute
              the red into the same cream as every other panel. An error has to
              read as an error at a glance. */}
          {error && (
            <div
              role="alert"
              className="mt-4 mx-auto max-w-md rounded-2xl border border-red-300/70 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 shadow-sm"
            >
              {error}
            </div>
          )}
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
              className="glass glass-sheen liquid-glass rounded-full px-4 py-2 text-sm font-semibold text-[#8f552f] transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
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
              className="glass glass-content liquid-glass-soft rounded-content p-5 max-w-2xl mx-auto max-h-72 overflow-y-auto text-left space-y-3"
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

      {/* Scroll cue — gives the quiet band at the bottom of the viewport a
          purpose and points first-time visitors at the work below */}
      <div
        className={`scroll-cue absolute bottom-8 left-1/2 z-10 transition-opacity duration-500 ${
          hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <a
          href="#projects"
          aria-label={t[language].scrollCue}
          className="glass glass-sheen liquid-glass-soft rounded-full flex h-11 w-11 items-center justify-center text-glass-copper transition-transform duration-200 hover:scale-110"
        >
          <ChevronDown size={20} />
        </a>
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
