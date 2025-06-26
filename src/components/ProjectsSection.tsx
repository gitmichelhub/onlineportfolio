
import React, { useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp, Briefcase, GraduationCap, Code, Heart, Award, Users, Lightbulb, BookOpen } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const ProjectsSection: React.FC = () => {
  const [isCVOpen, setIsCVOpen] = useState(false);

  const projects = [
    {
      title: "AI Chat Assistant",
      description: "A conversational AI built with React and ElevenLabs integration for natural voice interactions.",
      technologies: ["React", "TypeScript", "ElevenLabs", "WebSocket"],
      link: "#",
      github: "#"
    },
    {
      title: "Smart Car Dashboard",
      description: "IoT dashboard for monitoring vehicle telemetry with real-time data visualization.",
      technologies: ["Next.js", "D3.js", "WebRTC", "MongoDB"],
      link: "#",
      github: "#"
    },
    {
      title: "Code Review Bot",
      description: "Automated code review system using machine learning to detect patterns and suggest improvements.",
      technologies: ["Python", "TensorFlow", "GitHub API", "Docker"],
      link: "#",
      github: "#"
    },
    {
      title: "Portfolio Generator",
      description: "Dynamic portfolio website generator with customizable themes and content management.",
      technologies: ["Vue.js", "Nuxt", "Strapi", "Tailwind"],
      link: "#",
      github: "#"
    }
  ];

  const timelineData = [
    {
      date: "2024-Present",
      title: "Lead AI Solutions Architect",
      summary: "Spearheading enterprise AI transformation initiatives and leading cross-functional teams.",
      tag: "FTE",
      icon: <Award />
    },
    {
      date: "2023-2024",
      title: "Senior AI Developer",
      summary: "Leading AI integration projects and developing conversational interfaces for enterprise clients.",
      tag: "FTE",
      icon: <Briefcase />
    },
    {
      date: "2022-2023",
      title: "AI Research Collaborator",
      summary: "Collaborated with university researchers on machine learning optimization algorithms.",
      tag: "Part-time",
      icon: <Lightbulb />
    },
    {
      date: "2021-2023",
      title: "Full Stack Developer",
      summary: "Built scalable web applications using React, Node.js, and cloud infrastructure.",
      tag: "FTE",
      icon: <Code />
    },
    {
      date: "2021",
      title: "Tech Mentorship Program",
      summary: "Mentored junior developers through coding bootcamp and career transition programs.",
      tag: "Hobby",
      icon: <Users />
    },
    {
      date: "2020-2021",
      title: "Automotive Tech Consultant",
      summary: "Specialized in IoT solutions for vehicle diagnostics and fleet management systems.",
      tag: "Part-time",
      icon: <Briefcase />
    },
    {
      date: "2020",
      title: "Machine Learning Certification",
      summary: "Completed advanced certification in deep learning and neural network architectures.",
      tag: "Edu",
      icon: <Award />
    },
    {
      date: "2019-2020",
      title: "Hackathon Champion",
      summary: "Won multiple hackathons focusing on AI-powered automotive safety solutions.",
      tag: "Hobby",
      icon: <Award />
    },
    {
      date: "2018-2020",
      title: "Open Source Contributor",
      summary: "Active contributor to various React and Python libraries, with focus on developer tooling.",
      tag: "Hobby",
      icon: <Heart />
    },
    {
      date: "2018-2019",
      title: "Technical Writing",
      summary: "Published technical articles on AI implementation and automotive technology trends.",
      tag: "Hobby",
      icon: <BookOpen />
    },
    {
      date: "2017-2018",
      title: "Software Engineering Intern",
      summary: "Developed web applications and gained experience in agile development methodologies.",
      tag: "Part-time",
      icon: <Code />
    },
    {
      date: "2016-2020",
      title: "Computer Science Degree",
      summary: "Bachelor's degree focusing on machine learning, algorithms, and software engineering principles.",
      tag: "Edu",
      icon: <GraduationCap />
    },
    {
      date: "2015-2016",
      title: "First Programming Project",
      summary: "Built my first web application - a car enthusiast forum that sparked my passion for tech.",
      tag: "Hobby",
      icon: <Heart />
    }
  ];

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'FTE': return 'bg-green-100 text-green-700';
      case 'Part-time': return 'bg-blue-100 text-blue-700';
      case 'Edu': return 'bg-purple-100 text-purple-700';
      case 'Hobby': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section id="projects" className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-semibold text-slate-900 mb-4">Featured Projects</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A showcase of my recent work in AI, web development, and automotive technology.
          </p>
        </div>

        {/* Simple Chat Component */}
        <div className="glass rounded-2xl p-6 mb-12 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-2xl px-4 py-2 max-w-xs">
                <p className="text-sm text-slate-700">Tell me about your projects</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-indigo-600 text-white rounded-2xl px-4 py-2 max-w-xs">
                <p className="text-sm">I'd love to show you my latest work! Check out the projects below.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="glass rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-up group"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{project.title}</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex space-x-4">
                <a 
                  href={project.link}
                  className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  <ExternalLink size={16} />
                  <span className="text-sm font-medium">View Live</span>
                </a>
                <a 
                  href={project.github}
                  className="flex items-center space-x-2 text-slate-600 hover:text-slate-700 transition-colors"
                >
                  <Github size={16} />
                  <span className="text-sm font-medium">Source</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CV Toggle Button */}
        <div className="text-center mb-8">
          <Collapsible open={isCVOpen} onOpenChange={setIsCVOpen}>
            <CollapsibleTrigger asChild>
              <button
                className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:bg-indigo-700"
                aria-expanded={isCVOpen}
                aria-controls="cv"
              >
                <span>{isCVOpen ? "Hide CV" : "See full CV →"}</span>
                {isCVOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </CollapsibleTrigger>

            {/* Collapsible CV Timeline */}
            <CollapsibleContent className="overflow-hidden transition-all duration-500 ease-in-out">
              <div id="cv" className="mt-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">Career Timeline</h3>
                  <p className="text-slate-600">My journey through technology and innovation</p>
                </div>

                <VerticalTimeline lineColor="#CBD5E1">
                  {timelineData.map((item, index) => (
                    <VerticalTimelineElement
                      key={index}
                      className="vertical-timeline-element--work animate-fade-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      contentStyle={{ 
                        background: 'rgba(255, 255, 255, 0.8)', 
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '16px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                      }}
                      contentArrowStyle={{ borderRight: '7px solid rgba(255, 255, 255, 0.8)' }}
                      date={item.date}
                      iconStyle={{ 
                        background: '#4F46E5', 
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      icon={item.icon}
                    >
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 mb-3 leading-relaxed">{item.summary}</p>
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
