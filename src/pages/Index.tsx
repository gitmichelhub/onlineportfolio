import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { getElevenLabsAgentId } from '@/config/elevenlabs';
import { useLanguage } from '@/hooks/use-language';
import { usePageMeta } from '@/hooks/use-page-meta';
import { idleVoiceSnapshot, type VoiceApi, type VoiceSnapshot } from '@/lib/voice-types';

// The ElevenLabs SDK is the largest chunk in the bundle; only load it once
// the visitor actually starts a conversation.
const VoiceAgentHost = lazy(() => import('@/components/VoiceAgentHost'));

const Index = () => {
  const { language } = useLanguage();
  const [currentSection, setCurrentSection] = useState('voice');
  const [voiceRequested, setVoiceRequested] = useState(false);
  const [voice, setVoice] = useState<VoiceSnapshot>(idleVoiceSnapshot);
  const voiceApiRef = useRef<VoiceApi | null>(null);

  usePageMeta(
    language === 'de'
      ? 'Michel Werner — KI-Ingenieur & IT-Berater | Sprich mit meiner KI'
      : 'Michel Werner — AI Engineer & IT Consultant | Talk to my AI',
  );

  const startConversation = useCallback(async () => {
    if (voiceApiRef.current) {
      await voiceApiRef.current.start();
    } else {
      // First use: mounting the host downloads the SDK chunk and auto-starts.
      setVoiceRequested(true);
    }
  }, []);

  const stopConversation = useCallback(async () => {
    await voiceApiRef.current?.stop();
  }, []);

  const forceStopConversation = useCallback(async () => {
    await voiceApiRef.current?.forceStop();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['voice', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {voiceRequested && (
        <Suspense fallback={null}>
          <VoiceAgentHost
            agentId={getElevenLabsAgentId(language)}
            autoStart
            onSnapshot={setVoice}
            apiRef={voiceApiRef}
          />
        </Suspense>
      )}
      <Navigation
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        voiceStatusState={voice.state}
        voiceStatusError={voice.error}
        voiceStatusInfo={voice.info}
        onVoiceStatusStop={stopConversation}
        onVoiceStatusForceStop={forceStopConversation}
        callDuration={voice.callDuration}
        isTimerActive={voice.isTimerActive}
      />
      <HeroSection
        state={voice.state}
        error={voice.error}
        startConversation={startConversation}
        stopConversation={stopConversation}
        forceStopConversation={forceStopConversation}
        isActive={voice.isActive}
        callDuration={voice.callDuration}
        isTimerActive={voice.isTimerActive}
        transcript={voice.transcript}
      />
      <ProjectsSection />
      <BlogSection isVoiceActive={voice.isActive} />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
