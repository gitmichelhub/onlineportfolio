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
      voiceAI: "Voice AI Service",
      voiceAIProvider: "Service Provider",
      voiceAIProviderText: "The voice assistant feature on this website is powered by ElevenLabs, Inc., a third-party AI voice technology provider.",
      voiceAIDataProcessing: "Data Processing",
      voiceAIDataProcessingText: "When using the voice assistant, your voice communications are recorded, processed, and transmitted to ElevenLabs servers for AI processing. This data may be stored and used in accordance with ElevenLabs' privacy policy.",
      voiceAIConsent: "User Consent",
      voiceAIConsentText: "By using the voice assistant feature, you consent to the recording, storage, and sharing of your communications with ElevenLabs and other third-party service providers necessary for the operation of this service. If you do not wish to have your conversations recorded, please refrain from using the voice assistant.",
      voiceAIThirdParty: "Third-Party Information",
      voiceAIThirdPartyText: "For more information about how ElevenLabs processes your data, please visit their website at elevenlabs.io and review their Privacy Policy and Terms of Service.",
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
      voiceAI: "Sprach-KI-Dienst",
      voiceAIProvider: "Dienstanbieter",
      voiceAIProviderText: "Die Sprachassistenten-Funktion auf dieser Website wird von ElevenLabs, Inc., einem Drittanbieter für KI-Sprachtechnologie, bereitgestellt.",
      voiceAIDataProcessing: "Datenverarbeitung",
      voiceAIDataProcessingText: "Bei der Nutzung des Sprachassistenten werden Ihre Sprachkommunikationen aufgezeichnet, verarbeitet und zur KI-Verarbeitung an ElevenLabs-Server übertragen. Diese Daten können gemäß der Datenschutzerklärung von ElevenLabs gespeichert und verwendet werden.",
      voiceAIConsent: "Einwilligung des Nutzers",
      voiceAIConsentText: "Durch die Nutzung der Sprachassistenten-Funktion stimmen Sie der Aufzeichnung, Speicherung und Weitergabe Ihrer Kommunikation an ElevenLabs und andere Drittanbieter zu, die für den Betrieb dieses Dienstes erforderlich sind. Wenn Sie nicht möchten, dass Ihre Gespräche aufgezeichnet werden, nutzen Sie den Sprachassistenten bitte nicht.",
      voiceAIThirdParty: "Informationen zu Drittanbietern",
      voiceAIThirdPartyText: "Weitere Informationen darüber, wie ElevenLabs Ihre Daten verarbeitet, finden Sie auf deren Website elevenlabs.io. Bitte lesen Sie deren Datenschutzerklärung und Nutzungsbedingungen.",
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

            {/* Voice AI Service */}
            <section className="border-t border-glass-copper/10 pt-8">
              <h2 className="text-2xl font-semibold text-glass-dark mb-6 font-playfair">{t.voiceAI}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-glass-dark mb-2">{t.voiceAIProvider}</h3>
                  <p className="text-glass-muted leading-relaxed">{t.voiceAIProviderText}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-glass-dark mb-2">{t.voiceAIDataProcessing}</h3>
                  <p className="text-glass-muted leading-relaxed">{t.voiceAIDataProcessingText}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-glass-dark mb-2">{t.voiceAIConsent}</h3>
                  <p className="text-glass-muted leading-relaxed">{t.voiceAIConsentText}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-glass-dark mb-2">{t.voiceAIThirdParty}</h3>
                  <p className="text-glass-muted leading-relaxed">
                    {t.voiceAIThirdPartyText.split('elevenlabs.io')[0]}
                    <a 
                      href="https://elevenlabs.io" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-glass-copper hover:text-glass-amber transition-colors"
                    >
                      elevenlabs.io
                    </a>
                    {t.voiceAIThirdPartyText.split('elevenlabs.io')[1]}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imprint;
