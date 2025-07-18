import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from "@/hooks/use-language";
import VoiceStatus from './VoiceStatus';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  voiceStatusState: {
    isConnected: boolean;
    isListening: boolean;
    isSpeaking: boolean;
    isProcessing: boolean;
  };
  voiceStatusError: string | null;
  onVoiceStatusStop: () => void;
  onVoiceStatusForceStop?: () => Promise<void>;
  timeRemaining?: number | null;
  isTimerActive?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onSectionChange, voiceStatusState, voiceStatusError, onVoiceStatusStop, onVoiceStatusForceStop, timeRemaining, isTimerActive }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const navLabels = {
    en: { voice: "Voice AI", projects: "Projects", blog: "Blog", contact: "Contact" },
    de: { voice: "Sprach KI", projects: "Projekte", blog: "Blog", contact: "Kontakt" }
  };

  const navItems = [
    { id: 'voice', label: navLabels[language].voice },
    { id: 'projects', label: navLabels[language].projects },
    { id: 'blog', label: navLabels[language].blog },
    { id: 'contact', label: navLabels[language].contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      onVoiceStatusStop();
    } catch (err) {
      console.error('Normal stop failed, trying force stop:', err);
      if (onVoiceStatusForceStop) {
        await onVoiceStatusForceStop();
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-start h-20 pt-4 relative">
          {/* Left spacer (empty for centering) */}
          <div className="hidden md:flex flex-1" />

          {/* Centered nav items and language switcher */}
          <div className="hidden md:flex flex-col items-center justify-center flex-none">
            <div className="flex gap-4 items-center">
              {/* Nav Items Pill */}
              <div
                className="glass rounded-full flex items-center px-3 py-2 shadow-md backdrop-blur-md border border-white/30 bg-white/40 liquid-glass"
                style={{ filter: "url(#liquid-glass-filter)" }}
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                      currentSection === item.id
                        ? 'bg-white bg-opacity-70 text-indigo-600 shadow'
                        : 'text-slate-700 hover:text-indigo-600 hover:bg-white hover:bg-opacity-30'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {/* Language Pill */}
              <div
                className="glass rounded-full flex items-center px-3 py-2 shadow-md backdrop-blur-md border border-white/30 bg-white/40 liquid-glass"
                style={{ filter: "url(#liquid-glass-filter)" }}
              >
                <button
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${language === 'en' ? 'bg-white bg-opacity-60 text-indigo-600 shadow' : 'text-slate-700 hover:text-indigo-600'}`}
                  onClick={() => setLanguage('en')}
                  aria-pressed={language === 'en'}
                >
                  EN
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${language === 'de' ? 'bg-white bg-opacity-60 text-indigo-600 shadow' : 'text-slate-700 hover:text-indigo-600'}`}
                  onClick={() => setLanguage('de')}
                  aria-pressed={language === 'de'}
                >
                  DE
                </button>
              </div>
            </div>
          </div>

          {/* Right: VoiceStatus */}
          <div className="hidden md:flex flex-1 justify-end items-center">
            <VoiceStatus 
              state={voiceStatusState} 
              error={voiceStatusError} 
              onStop={handleVoiceStop}
              timeRemaining={timeRemaining}
              isTimerActive={isTimerActive}
            />
          </div>
        </div>
        {/* Mobile Navigation Pills and VoiceStatus (stacked) */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col items-center gap-3 mt-2">
            <div
              className="glass rounded-full flex items-center px-3 py-2 shadow-md backdrop-blur-md border border-white/30 bg-white/40 w-full max-w-xs liquid-glass"
              style={{ filter: "url(#liquid-glass-filter)" }}
            >
              <div className="flex flex-col w-full">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                      currentSection === item.id
                        ? 'bg-white bg-opacity-70 text-indigo-600 shadow'
                        : 'text-slate-700 hover:text-indigo-600 hover:bg-white hover:bg-opacity-30'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 w-full max-w-xs">
              <div
                className="glass rounded-full flex items-center px-3 py-2 shadow-md backdrop-blur-md border border-white/30 bg-white/40 flex-1 liquid-glass"
                style={{ filter: "url(#liquid-glass-filter)" }}
              >
                <button
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${language === 'en' ? 'bg-white bg-opacity-60 text-indigo-600 shadow' : 'text-slate-700 hover:text-indigo-600'}`}
                  onClick={() => setLanguage('en')}
                  aria-pressed={language === 'en'}
                >
                  EN
                </button>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${language === 'de' ? 'bg-white bg-opacity-60 text-indigo-600 shadow' : 'text-slate-700 hover:text-indigo-600'}`}
                  onClick={() => setLanguage('de')}
                  aria-pressed={language === 'de'}
                >
                  DE
                </button>
              </div>
              <VoiceStatus 
                state={voiceStatusState} 
                error={voiceStatusError} 
                onStop={handleVoiceStop}
                timeRemaining={timeRemaining}
                isTimerActive={isTimerActive}
              />
            </div>
          </div>
        )}
        {/* Mobile Menu Button */}
        <div className="md:hidden absolute right-4 top-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3 text-slate-700 hover:text-indigo-600 transition-colors touch-manipulation rounded-full hover:bg-white/20"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
