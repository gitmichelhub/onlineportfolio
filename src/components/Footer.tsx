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
    <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 w-[90%] max-w-4xl">
      <div className="glass rounded-2xl px-6 py-3 opacity-75">
        <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
          <span>{t[language].built}</span>
          <span>•</span>
          <Link to="/imprint" className="hover:text-slate-800 transition-colors">
            {t[language].imprint}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
