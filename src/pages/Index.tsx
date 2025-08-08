import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { getElevenLabsAgentId } from '@/config/elevenlabs';
import { useVoiceAgent } from '@/hooks/use-voice-agent';
import { useLanguage } from '@/hooks/use-language';

const Index = () => {
  const { language } = useLanguage();
  const [currentSection, setCurrentSection] = useState('voice');
  const { state, startConversation, stopConversation, forceStopConversation, testConnection, isActive, error, timeRemaining, isTimerActive } = useVoiceAgent({
    agentId: getElevenLabsAgentId(language),
  });

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
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
        voiceStatusState={state}
        voiceStatusError={error}
        onVoiceStatusStop={stopConversation}
        onVoiceStatusForceStop={forceStopConversation}
        timeRemaining={timeRemaining}
        isTimerActive={isTimerActive}
      />
      <HeroSection 
        state={state}
        error={error}
        startConversation={startConversation}
        stopConversation={stopConversation}
        forceStopConversation={forceStopConversation}
        testConnection={testConnection}
        isActive={isActive}
        timeRemaining={timeRemaining}
        isTimerActive={isTimerActive}
      />
      <ProjectsSection />
      <BlogSection isVoiceActive={isActive} />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
