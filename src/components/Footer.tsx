import React from 'react';
import { Github, Linkedin } from 'lucide-react';
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
      <div className="glass glass-content liquid-glass-soft rounded-content px-6 py-3 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-glass-muted text-center">
          <span>{t[language].built}</span>
          <span className="hidden sm:inline text-glass-copper/50">•</span>
          <a
            href="https://github.com/gitmichelhub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-glass-copper transition-colors"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
          <span className="hidden sm:inline text-glass-copper/50">•</span>
          <a
            href="https://www.linkedin.com/in/michel-werner-9a9878160/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-glass-copper transition-colors"
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </a>
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
