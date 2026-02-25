import React, { useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useLanguage } from "@/hooks/use-language";
import {
  projectsDE,
  projectsEN,
  timelineDataDE,
  timelineDataEN,
  getTagColorDE,
  getTagColorEN,
} from '@/content/projects-content';

const ProjectsSection: React.FC = () => {
  const { language } = useLanguage();
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState<number | null>(null);

  const projects = language === 'de' ? projectsDE : projectsEN;
  const timelineData = language === 'de' ? timelineDataDE : timelineDataEN;
  const getTagColor = language === 'de' ? getTagColorDE : getTagColorEN;

  return (
    <section id="projects" className="min-h-screen py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-semibold text-glass-dark mb-4 font-playfair">
            {language === 'de' ? 'Ausgewählte Projekte' : 'Featured Projects'}
          </h2>
          <p className="text-xl text-glass-muted max-w-2xl mx-auto">
            {language === 'de'
              ? 'Eine Auswahl meiner aktuellen Projekte in den Bereichen KI, Web- und Produktentwicklung.'
              : 'A showcase of my recent work in AI, web development, and automotive technology.'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-up group"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold text-glass-dark mb-3 font-playfair">{project.title}</h3>
              <p className="text-glass-muted mb-4 leading-relaxed">{project.description}</p>

              <Collapsible
                open={openDetails === index}
                onOpenChange={(open) => setOpenDetails(open ? index : null)}
                className="mb-4"
              >
                <CollapsibleTrigger asChild>
                  <button className="flex items-center space-x-2 text-glass-copper hover:text-glass-amber transition-colors text-sm font-medium mb-3">
                    <span>{language === 'de' ? 'Mehr Details' : 'More details'}</span>
                    {openDetails === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out">
                  <div className="bg-glass-cream/50 rounded-lg p-4 mb-4 border border-glass-cream">
                    <div className="text-glass-dark/70 leading-relaxed whitespace-pre-line">
                      {project.detailedDescription}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-glass-copper/10 text-glass-copper text-sm rounded-full border border-glass-copper/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex space-x-4">
                {project.link && (
                  <a
                    href={project.link}
                    className="flex items-center space-x-2 text-glass-copper hover:text-glass-amber transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm font-medium">View Live</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    className="flex items-center space-x-2 text-glass-muted hover:text-glass-dark transition-colors"
                  >
                    <Github size={16} />
                    <span className="text-sm font-medium">Source</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <Collapsible open={isCVOpen} onOpenChange={setIsCVOpen}>
            <CollapsibleTrigger asChild>
              <button
                className="inline-flex items-center space-x-2 bg-glass-copper text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:bg-glass-amber hover:shadow-lg"
                aria-expanded={isCVOpen}
                aria-controls="cv"
              >
                <span>{isCVOpen ? (language === 'de' ? "CV ausblenden" : "Hide CV") : (language === 'de' ? "Vollständigen CV anzeigen →" : "See full CV →")}</span>
                {isCVOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="overflow-hidden transition-all duration-500 ease-in-out">
              <div id="cv" className="mt-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-glass-dark mb-2 font-playfair">{language === 'de' ? "Karriereverlauf" : "Career Timeline"}</h3>
                  <p className="text-glass-muted">{language === 'de' ? "Meine Reise durch Technologie und Innovation" : "My journey through technology and innovation"}</p>
                </div>

                <VerticalTimeline lineColor="rgba(185, 120, 70, 0.2)">
                  {timelineData.map((item, index) => (
                    <VerticalTimelineElement
                      key={index}
                      className="vertical-timeline-element--work animate-fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        borderRadius: '16px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
                      }}
                      contentArrowStyle={{ borderRight: '7px solid rgba(255, 255, 255, 0.7)' }}
                      date={item.date}
                      iconStyle={{
                        background: '#B97846',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      icon={item.icon}
                    >
                      <h3 className="text-lg font-semibold text-glass-dark mb-2 font-playfair">{item.title}</h3>
                      <p className="text-glass-muted mb-3 leading-relaxed">{item.summary}</p>
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getTagColor(item.tag)}`}>
                        {item.tag}
                      </span>
                    </VerticalTimelineElement>
                  ))}
                </VerticalTimeline>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
