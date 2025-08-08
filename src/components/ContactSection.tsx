import React from 'react';
import { Mail, Send, Copy } from 'lucide-react';
import { useLanguage } from "@/hooks/use-language";

const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const t = {
    en: {
      sectionTitle: "Let's Connect",
      subtitle: "Have a project in mind or just want to chat (this time as a human)? I'd love to hear from you.",
      emailButton: "Send me an email",
      emailButtonDesc: "Click to open your email client",
      emailCopied: "Email copied to clipboard!",
      copyEmail: "Copy email address"
    },
    de: {
      sectionTitle: "Kontakt aufnehmen",
      subtitle: "Hast du ein Projekt im Kopf oder möchtest einfach plaudern (dieses Mal als Mensch)? Ich freue mich auf deine Nachricht.",
      emailButton: "Schick mir eine E-Mail",
      emailButtonDesc: "Klicke um deinen E-Mail-Client zu öffnen",
      emailCopied: "E-Mail-Adresse kopiert!",
      copyEmail: "E-Mail-Adresse kopieren"
    }
  };

  const email = 'michel.tech.user@gmail.com';

  const handleEmailClick = () => {
    const subject = encodeURIComponent('Portfolio Contact');
    const body = encodeURIComponent('Hi Michel,\n\nI\'d like to discuss a project with you...');
    
    try {
      window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    } catch (error) {
      // Fallback: copy email to clipboard
      copyEmailToClipboard();
    }
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      // Show a simple alert since we don't have toast available
      alert(t[language].emailCopied);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert(t[language].emailCopied);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-semibold text-slate-900 mb-4">{t[language].sectionTitle}</h2>
          <p className="text-xl text-slate-600">
            {t[language].subtitle}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass rounded-2xl p-8">
              <div className="text-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">{t[language].emailButton}</h3>
                  <p className="text-slate-600">{t[language].emailButtonDesc}</p>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={handleEmailClick}
                    className="w-full bg-indigo-600 text-white py-4 px-8 rounded-xl font-medium hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center space-x-3 group transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Mail size={20} className="transition-transform group-hover:scale-110" />
                    <span className="text-lg">{t[language].emailButton}</span>
                    <Send size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                  
                  <button
                    onClick={copyEmailToClipboard}
                    className="w-full bg-slate-100 text-slate-700 py-3 px-6 rounded-xl font-medium hover:bg-slate-200 transition-all duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <Copy size={16} />
                    <span>{t[language].copyEmail}</span>
                  </button>
                </div>
                
                <p className="text-sm text-slate-500 mt-4">{email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
