import React, { useState } from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from "@/hooks/use-language";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = {
    en: {
      sectionTitle: "Let's Connect",
      subtitle: "Have a project in mind or just want to chat? I'd love to hear from you.",
      getInTouch: "Get in Touch",
      email: "Email",
      bestFor: "Best for detailed discussions",
      voiceChat: "Voice Chat",
      useVoice: "Use the voice button above",
      quick: "Quick questions and instant feedback",
      responseTime: "Response Time:",
      responseText: "I typically respond within 24 hours. For urgent matters, feel free to use the voice chat feature.",
      name: "Name",
      emailLabel: "Email",
      subject: "Subject",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      subjectPlaceholder: "What's this about?",
      messagePlaceholder: "Tell me about your project or question...",
      send: "Send Message",
      toastTitle: "Message sent!",
      toastDesc: "Thanks for reaching out. I'll get back to you soon."
    },
    de: {
      sectionTitle: "Kontakt aufnehmen",
      subtitle: "Hast du ein Projekt im Kopf oder möchtest einfach plaudern? Ich freue mich auf deine Nachricht.",
      getInTouch: "Kontakt aufnehmen",
      email: "E-Mail",
      bestFor: "Am besten für ausführliche Anfragen",
      voiceChat: "Sprachchat",
      useVoice: "Nutze den Sprachbutton oben",
      quick: "Kurze Fragen und sofortiges Feedback",
      responseTime: "Antwortzeit:",
      responseText: "In der Regel antworte ich innerhalb von 24 Stunden. Für dringende Anliegen nutze gerne den Sprachchat.",
      name: "Name",
      emailLabel: "E-Mail",
      subject: "Betreff",
      message: "Nachricht",
      namePlaceholder: "Dein Name",
      emailPlaceholder: "deine@email.de",
      subjectPlaceholder: "Worum geht es?",
      messagePlaceholder: "Erzähl mir von deinem Projekt oder deiner Frage...",
      send: "Nachricht senden",
      toastTitle: "Nachricht gesendet!",
      toastDesc: "Danke für deine Nachricht. Ich melde mich bald zurück."
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: t[language].toastTitle,
      description: t[language].toastDesc,
    });

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Contact info */}
          <div className="animate-fade-up">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">{t[language].getInTouch}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{t[language].email}</h4>
                    <p className="text-slate-600">mike@example.com</p>
                    <p className="text-sm text-slate-500 mt-1">{t[language].bestFor}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{t[language].voiceChat}</h4>
                    <p className="text-slate-600">{t[language].useVoice}</p>
                    <p className="text-sm text-slate-500 mt-1">{t[language].quick}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-indigo-50 rounded-xl">
                <p className="text-sm text-indigo-700">
                  <strong>{t[language].responseTime}</strong> {t[language].responseText}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      {t[language].name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder={t[language].namePlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      {t[language].emailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder={t[language].emailPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    {t[language].subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder={t[language].subjectPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    {t[language].message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
                    placeholder={t[language].messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>{t[language].send}</span>
                  <Send size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
