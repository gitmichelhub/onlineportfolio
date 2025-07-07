import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { ELEVENLABS_CONFIG, getElevenLabsApiKey, getElevenLabsVoiceId } from '@/config/elevenlabs';
import { useVoiceAgent } from '@/hooks/use-voice-agent';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('voice');
  const { state, startConversation, stopConversation, testConnection, isActive, error } = useVoiceAgent({
    agentId: ELEVENLABS_CONFIG.CONVERSATION_CONFIG.agent.prompt.prompt,
    apiKey: getElevenLabsApiKey(),
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
      />
      <HeroSection 
        state={state}
        error={error}
        startConversation={startConversation}
        stopConversation={stopConversation}
        testConnection={testConnection}
        isActive={isActive}
      />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
