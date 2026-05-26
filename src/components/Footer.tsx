import React from 'react';
import { useLanguage } from "@/hooks/use-language";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = {
    en: { 
      built: "Built with AI using React, Tailwind, and modern web technologies",
      imprint: "Imprint"
    },
    de: { 
      built: "Erstellt mit AI: React, Tailwind und modernen Webtechnologien",
      imprint: "Impressum"
    }
  };
  return (
    <footer className="bg-white/50 px-4 pb-8">
      <div className="glass rounded-2xl px-6 py-3 opacity-90 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-glass-muted text-center">
          <span>{t[language].built}</span>
          <span className="hidden sm:inline text-glass-copper/50">•</span>
          <Link to="/imprint" className="hover:text-glass-copper transition-colors">
            {t[language].imprint}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
