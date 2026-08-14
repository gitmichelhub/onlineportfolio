import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';

const SubpageHeader: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const t = {
    en: { home: 'Michel Werner — Home' },
    de: { home: 'Michel Werner — Startseite' },
  };

  return (
    <header className="glass glass-sheen liquid-glass-soft rounded-full flex items-center justify-between gap-3 px-3 py-2 sm:px-4 mb-8">
      <Link
        to="/"
        aria-label={t[language].home}
        className="min-w-0 truncate px-2 py-2 text-sm sm:text-base font-semibold text-glass-dark hover:text-glass-copper transition-colors"
      >
        Michel Werner
      </Link>

      <div className="glass liquid-glass-soft rounded-full flex shrink-0 items-center p-1">
        <button
          type="button"
          className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
            language === 'en'
              ? 'bg-white/80 text-glass-copper shadow-sm'
              : 'text-glass-dark/80 hover:text-glass-copper'
          }`}
          onClick={() => setLanguage('en')}
          aria-pressed={language === 'en'}
        >
          EN
        </button>
        <button
          type="button"
          className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
            language === 'de'
              ? 'bg-white/80 text-glass-copper shadow-sm'
              : 'text-glass-dark/80 hover:text-glass-copper'
          }`}
          onClick={() => setLanguage('de')}
          aria-pressed={language === 'de'}
        >
          DE
        </button>
      </div>
    </header>
  );
};

export default SubpageHeader;
