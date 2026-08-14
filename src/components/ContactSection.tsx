import React, { useState } from 'react';
import { Copy, Check, Mail, Github, Linkedin } from 'lucide-react';
import { useLanguage } from "@/hooks/use-language";

const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = React.useRef<number | null>(null);

  const t = {
    en: {
      sectionTitle: "Let's Connect",
      subtitle: "Have a project in mind or just want to chat (this time as a human)? I'd love to hear from you.",
      copyEmail: "Copy email address",
      emailCopied: "Copied!"
    },
    de: {
      sectionTitle: "Kontakt aufnehmen",
      subtitle: "Hast du ein Projekt im Kopf oder möchtest einfach plaudern (dieses Mal als Mensch)? Ich freue mich auf deine Nachricht.",
      copyEmail: "E-Mail-Adresse kopieren",
      emailCopied: "Kopiert!"
    }
  };

  const email = 'michel.tech.user@gmail.com';

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
      copiedTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
      copiedTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    }
  };

  React.useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="py-16 md:py-20 bg-gradient-to-br from-white/65 via-glass-light/60 to-glass-cream/70 relative overflow-hidden">
      {/* Ambient backdrop — gives the glass card something to refract */}
      <div className="section-geometry geometry-contact" aria-hidden="true">
        <div className="ambient-band-copper absolute top-[8%] left-[8%] w-96 h-96 rounded-full" />
        <div className="ambient-band-teal absolute bottom-[4%] right-[10%] w-[28rem] h-[28rem] rounded-full" />
        <div className="floating-shape-strong absolute top-[42%] left-[44%] w-72 h-72 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl font-semibold text-glass-dark mb-4 font-playfair">{t[language].sectionTitle}</h2>
          <p className="text-xl text-glass-muted max-w-3xl mx-auto">
            {t[language].subtitle}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass glass-content liquid-glass-soft rounded-content p-8">
              <div className="text-center">
                {/* Email icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-glass-copper/15 border border-glass-copper/25 flex items-center justify-center">
                    <Mail size={28} className="text-glass-copper" />
                  </div>
                  <p className="text-glass-dark font-medium text-lg">{email}</p>
                </div>
                
                {/* Copy button with inline feedback */}
                <button
                  onClick={copyEmailToClipboard}
                  className={`
                    relative w-full py-4 px-8 rounded-xl font-medium transition-all duration-300 
                    flex items-center justify-center space-x-3 group transform hover:scale-105
                    ${copied 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
                      : 'bg-glass-copper text-white hover:bg-glass-amber shadow-lg hover:shadow-xl'
                    }
                  `}
                >
                  {copied ? (
                    <>
                      <Check size={20} className="animate-bounce" />
                      <span className="text-lg">{t[language].emailCopied}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={20} className="transition-transform group-hover:scale-110" />
                      <span className="text-lg">{t[language].copyEmail}</span>
                    </>
                  )}
                </button>

                {/* Social links */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://github.com/gitmichelhub"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="glass liquid-glass min-h-11 rounded-full px-5 py-3 inline-flex items-center justify-center gap-2 text-[#8f552f] font-medium transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:bg-glass-copper hover:text-white"
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/michel-werner-9a9878160/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="glass liquid-glass min-h-11 rounded-full px-5 py-3 inline-flex items-center justify-center gap-2 text-[#8f552f] font-medium transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:bg-glass-copper hover:text-white"
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
