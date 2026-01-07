import React from 'react';
import { useLanguage } from "@/hooks/use-language";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Imprint: React.FC = () => {
  const { language } = useLanguage();
  
  const content = {
    en: {
      title: "Imprint",
      contact: "Contact Information",
      name: "Name",
      address: "Address",
      email: "Email",
      phone: "Phone",
      responsibility: "Responsibility for Content",
      disclaimer: "Disclaimer",
      disclaimerText: "The information provided on this website is for general informational purposes only. While I strive to keep the information up to date and correct, I make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.",
      copyright: "Copyright",
      copyrightText: "All content on this website is protected by copyright law. Unauthorized use or reproduction of any content is strictly prohibited.",
      back: "Back to Home"
    },
    de: {
      title: "Impressum",
      contact: "Kontaktinformationen",
      name: "Name",
      address: "Adresse",
      email: "E-Mail",
      phone: "Telefon",
      responsibility: "Verantwortlich für den Inhalt",
      disclaimer: "Haftungsausschluss",
      disclaimerText: "Die auf dieser Website bereitgestellten Informationen dienen nur zu allgemeinen Informationszwecken. Obwohl ich mich bemühe, die Informationen aktuell und korrekt zu halten, gebe ich keine Zusicherungen oder Garantien jeglicher Art, ausdrücklich oder stillschweigend, über die Vollständigkeit, Genauigkeit, Zuverlässigkeit, Eignung oder Verfügbarkeit in Bezug auf die Website oder die Informationen, Produkte, Dienstleistungen oder zugehörigen Grafiken auf der Website für jeden Zweck.",
      copyright: "Urheberrecht",
      copyrightText: "Alle Inhalte auf dieser Website sind durch das Urheberrecht geschützt. Unbefugte Verwendung oder Vervielfältigung von Inhalten ist strengstens untersagt.",
      back: "Zurück zur Startseite"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-glass-light via-white to-glass-cream py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-glass-muted hover:text-glass-copper transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>{t.back}</span>
        </Link>

        {/* Main Content */}
        <div className="glass rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-glass-dark mb-8 font-playfair">{t.title}</h1>
          
          <div className="space-y-8">
            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-glass-dark mb-4 font-playfair">{t.contact}</h2>
              <div className="space-y-2 text-glass-muted">
                <p><strong className="text-glass-dark">{t.name}:</strong> Michel Werner</p>
                <p><strong className="text-glass-dark">{t.address}:</strong> Gliesmaroder Straße 30, Braunschweig</p>
                <p><strong className="text-glass-dark">{t.email}:</strong> <a href="mailto:michel.tech.user@gmail.com" className="text-glass-copper hover:text-glass-amber transition-colors">michel.tech.user@gmail.com</a></p>
              </div>
            </section>

            {/* Responsibility */}
            <section>
              <h2 className="text-2xl font-semibold text-glass-dark mb-4 font-playfair">{t.responsibility}</h2>
              <p className="text-glass-muted">
                Michel Werner<br />
                Gliesmaroder Straße 30, Braunschweig
              </p>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-2xl font-semibold text-glass-dark mb-4 font-playfair">{t.disclaimer}</h2>
              <p className="text-glass-muted leading-relaxed">{t.disclaimerText}</p>
            </section>

            {/* Copyright */}
            <section>
              <h2 className="text-2xl font-semibold text-glass-dark mb-4 font-playfair">{t.copyright}</h2>
              <p className="text-glass-muted leading-relaxed">{t.copyrightText}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imprint;
