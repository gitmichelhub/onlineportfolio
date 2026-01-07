import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { Shield, Mic } from 'lucide-react';

interface VoiceConsentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAgree: () => void;
}

const VoiceConsentDialog: React.FC<VoiceConsentDialogProps> = ({
  open,
  onOpenChange,
  onAgree,
}) => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Voice AI Terms & Conditions',
      description: 'Please read and accept the following terms before using the voice assistant.',
      termsTitle: 'Recording & Data Processing',
      termsText: 'By clicking "Agree," and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as described in the Privacy Policy.',
      warningText: 'If you do not wish to have your conversations recorded, please refrain from using this service.',
      providerInfo: 'This voice service is powered by ElevenLabs AI technology.',
      privacyLink: 'View Privacy Policy',
      agree: 'Agree & Start',
      decline: 'Decline',
    },
    de: {
      title: 'Sprach-KI Nutzungsbedingungen',
      description: 'Bitte lesen und akzeptieren Sie die folgenden Bedingungen, bevor Sie den Sprachassistenten verwenden.',
      termsTitle: 'Aufzeichnung & Datenverarbeitung',
      termsText: 'Durch Klicken auf „Zustimmen" und bei jeder Interaktion mit diesem KI-Agenten stimme ich der Aufzeichnung, Speicherung und Weitergabe meiner Kommunikation an Drittanbieter zu, wie in der Datenschutzerklärung beschrieben.',
      warningText: 'Wenn Sie nicht möchten, dass Ihre Gespräche aufgezeichnet werden, nutzen Sie diesen Dienst bitte nicht.',
      providerInfo: 'Dieser Sprachdienst wird von der ElevenLabs KI-Technologie bereitgestellt.',
      privacyLink: 'Datenschutzerklärung anzeigen',
      agree: 'Zustimmen & Starten',
      decline: 'Ablehnen',
    },
  };

  const t = content[language];

  const handleAgree = () => {
    onAgree();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-glass-copper/10">
              <Shield className="w-5 h-5 text-glass-copper" />
            </div>
            <DialogTitle className="text-xl font-playfair text-glass-dark">
              {t.title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-glass-muted">
            {t.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Terms Section */}
          <div className="p-4 rounded-lg bg-glass-light/50 border border-glass-copper/10">
            <h4 className="font-semibold text-glass-dark mb-2 flex items-center gap-2">
              <Mic className="w-4 h-4 text-glass-copper" />
              {t.termsTitle}
            </h4>
            <p className="text-sm text-glass-muted leading-relaxed">
              {t.termsText}
            </p>
          </div>

          {/* Warning */}
          <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200/50">
            <p className="text-sm text-amber-800">
              ⚠️ {t.warningText}
            </p>
          </div>

          {/* Provider Info */}
          <p className="text-xs text-glass-muted text-center">
            {t.providerInfo}
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto border-glass-muted/30 text-glass-muted hover:bg-glass-light/50"
          >
            {t.decline}
          </Button>
          <Button
            onClick={handleAgree}
            className="w-full sm:w-auto bg-glass-copper hover:bg-glass-copper/90 text-white"
          >
            {t.agree}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceConsentDialog;
