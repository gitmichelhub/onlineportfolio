import React, { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';
import { useLanguage } from "@/hooks/use-language";

const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

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
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-semibold text-glass-dark mb-4 font-playfair">{t[language].sectionTitle}</h2>
          <p className="text-xl text-glass-muted">
            {t[language].subtitle}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass rounded-2xl p-8">
              <div className="text-center">
                {/* Email icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-glass-copper/10 flex items-center justify-center">
                    <Mail size={28} className="text-glass-copper" />
                  </div>
                  <p className="text-glass-dark font-medium text-lg mb-1">{email}</p>
                  <p className="text-glass-muted text-sm">{t[language].subtitle.split('?')[0]}?</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
