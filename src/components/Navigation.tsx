import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from "@/hooks/use-language";
import VoiceStatus from './VoiceStatus';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  voiceStatusState: {
    isConnecting: boolean;
    isConnected: boolean;
    isListening: boolean;
    isSpeaking: boolean;
    isProcessing: boolean;
  };
  voiceStatusError: string | null;
  voiceStatusInfo?: string | null;
  onVoiceStatusStop: () => Promise<void>;
  onVoiceStatusForceStop?: () => Promise<void>;
  callDuration?: number | null;
  isTimerActive?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onSectionChange, voiceStatusState, voiceStatusError, voiceStatusInfo, onVoiceStatusStop, onVoiceStatusForceStop, callDuration, isTimerActive }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuToggleRef = useRef<HTMLButtonElement | null>(null);
  const wasMobileMenuOpenRef = useRef(false);

  const navLabels = {
    en: { voice: "Voice AI", projects: "Projects", blog: "Blog", contact: "Contact" },
    de: { voice: "Sprach KI", projects: "Projekte", blog: "Blog", contact: "Kontakt" }
  };
  const mobileLabels = {
    en: { navigation: "Navigation", language: "Language", voice: "Voice AI", toggle: "Toggle mobile menu" },
    de: { navigation: "Navigation", language: "Sprache", voice: "Sprach KI", toggle: "Mobiles Menü umschalten" }
  };

  const navItems = [
    { id: 'voice', label: navLabels[language].voice },
    { id: 'projects', label: navLabels[language].projects },
    { id: 'blog', label: navLabels[language].blog },
    { id: 'contact', label: navLabels[language].contact },
  ];

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      if (wasMobileMenuOpenRef.current) {
        wasMobileMenuOpenRef.current = false;
        mobileMenuToggleRef.current?.focus();
      }
      return;
    }

    wasMobileMenuOpenRef.current = true;
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const frame = window.requestAnimationFrame(() => {
      mobileMenuRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !mobileMenuRef.current) return;

      const focusableElements = Array.from(
        mobileMenuRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute('disabled'));
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVoiceStop = async () => {
    try {
      await onVoiceStatusStop();
    } catch (err) {
      console.error('Normal stop failed, trying force stop:', err);
      if (onVoiceStatusForceStop) {
        await onVoiceStatusForceStop();
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="h-20 pt-4 relative">
            {/* Nav Items Pill — centred independently on the page axis.
                Centred with inset-x-0 + mx-auto rather than -translate-x-1/2:
                `.liquid-glass` sets `transform: translateZ(0)` for layer
                promotion, which would clobber a translate-based centring. */}
            <div
              className="glass glass-sheen liquid-glass rounded-full hidden lg:flex absolute inset-x-0 mx-auto w-fit items-center px-2 xl:px-3 py-2 shadow-md"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    currentSection === item.id
                      ? 'bg-white/80 text-glass-copper shadow-sm'
                      : 'text-glass-dark/80 hover:text-glass-copper hover:bg-white/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right cluster: stacks at narrower desktop widths to avoid the centred nav. */}
            <div className="hidden lg:flex absolute right-16 2xl:right-0 flex-col-reverse xl:flex-row items-end xl:items-center gap-2">
              <VoiceStatus
                state={voiceStatusState}
                error={voiceStatusError}
                info={voiceStatusInfo}
                onStop={handleVoiceStop}
                callDuration={callDuration}
                isTimerActive={isTimerActive}
              />
              <div
                className="glass glass-sheen liquid-glass rounded-full flex items-center px-2 xl:px-3 py-2 shadow-md"
              >
                <button
                  className={`px-3 xl:px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${language === 'en' ? 'bg-white/80 text-glass-copper shadow-sm' : 'text-glass-dark/80 hover:text-glass-copper'}`}
                  onClick={() => setLanguage('en')}
                  aria-pressed={language === 'en'}
                >
                  EN
                </button>
                <button
                  className={`px-3 xl:px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${language === 'de' ? 'bg-white/80 text-glass-copper shadow-sm' : 'text-glass-dark/80 hover:text-glass-copper'}`}
                  onClick={() => setLanguage('de')}
                  aria-pressed={language === 'de'}
                >
                  DE
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden absolute right-4 top-2">
            <button
              ref={mobileMenuToggleRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="glass glass-sheen liquid-glass p-3 text-glass-dark/80 hover:text-glass-copper transition-colors touch-manipulation rounded-full hover:bg-white/60"
              aria-label={mobileLabels[language].toggle}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-glass-dark/20 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            ref={mobileMenuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            className="glass glass-sheen liquid-glass absolute top-20 left-4 right-4 rounded-content p-6 max-w-sm mx-auto"
            style={{ 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.8)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Items */}
            <div className="space-y-3 mb-6">
              <h3 id="mobile-navigation-title" className="text-sm font-semibold text-glass-muted mb-3">{mobileLabels[language].navigation}</h3>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 text-base font-medium rounded-full transition-all duration-300 ${
                    currentSection === item.id
                      ? 'bg-glass-copper/15 text-[#8f552f] shadow-sm border border-glass-copper/30'
                      : 'text-glass-dark/80 hover:text-glass-copper hover:bg-glass-copper/5 border border-transparent hover:border-glass-copper/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-semibold text-glass-muted mb-3">{mobileLabels[language].language}</h3>
              <div className="flex gap-2">
                <button
                  className={`flex-1 px-4 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-glass-copper/15 text-[#8f552f] shadow-sm border border-glass-copper/30'
                      : 'bg-glass-cream text-glass-dark/80 hover:text-glass-copper hover:bg-glass-copper/5 border border-transparent hover:border-glass-copper/10'
                  }`}
                  onClick={() => setLanguage('en')}
                  aria-pressed={language === 'en'}
                >
                  English
                </button>
                <button
                  className={`flex-1 px-4 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    language === 'de'
                      ? 'bg-glass-copper/15 text-[#8f552f] shadow-sm border border-glass-copper/30'
                      : 'bg-glass-cream text-glass-dark/80 hover:text-glass-copper hover:bg-glass-copper/5 border border-transparent hover:border-glass-copper/10'
                  }`}
                  onClick={() => setLanguage('de')}
                  aria-pressed={language === 'de'}
                >
                  Deutsch
                </button>
              </div>
            </div>

            {/* Voice Status */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-glass-muted mb-3">{mobileLabels[language].voice}</h3>
              <div className="flex justify-center">
                <VoiceStatus 
                  state={voiceStatusState} 
                  error={voiceStatusError} 
                  info={voiceStatusInfo}
                  onStop={handleVoiceStop}
                  callDuration={callDuration}
                  isTimerActive={isTimerActive}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
