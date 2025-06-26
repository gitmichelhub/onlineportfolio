
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection: React.FC = () => {
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
        <div className="grid md:grid-cols-2 gap-8">
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
      </div>
    </section>
  );
};

export default ProjectsSection;
