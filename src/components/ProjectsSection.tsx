import React, { useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp, Briefcase, GraduationCap, Code, Heart, Award, Users, Lightbulb, BookOpen, Waves, Trophy, Zap, Globe } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const ProjectsSection: React.FC = () => {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState<number | null>(null);

  const projects = [
    {
      title: "Conversational AI Portfolio Agent: michel.chat",
      description: "A conversational AI built with React and ElevenLabs integration for natural voice interactions.",
      detailedDescription: "This AI assistant leverages advanced natural language processing to provide human-like conversations. The integration with ElevenLabs enables realistic voice synthesis, creating an immersive user experience. The system includes features like context awareness, memory of my professional background, and dynamic response generation.\n\nReason for Project:\nI wanted to create a tech demo for the current state of conversational AI. I wanted to see if I could create a simple agent that could have a conversation with me about my professional background and experience. Working with the System Prompt and necessary Context was valuable experience for me to understand the current state of AI Agents. I created the frontend with the Vibe Coding tool Lovable.\n\nTo achieve this I used a detailed description of my CV experience and skill items as well as my blog posts as base for the agent to know about my opinions regarding tech, AI and life in general. Context engineering in this case was to give the agent the necessary information via RAG and tool calls (search). The next feature will be automatic message generation from voice command and sending a calender invite to my personal google calender.",
      technologies: ["React", "TypeScript", "ElevenLabs", "WebSocket"],
      link: "https://michel.chat",
      github: "https://github.com/gitmichelhub/onlineportfolio"
    },
    {
      title: "Interview transcription: Interview2text ",
      description: "SOTA Speech to Text Transcription Web Service for up to 32 speakers",
      detailedDescription: "InterviewToText is a specialized web application designed for qualitative researchers, enabling efficient and accurate transcription of audio interviews involving up to 32 speakers. \n\nUsers upload their recordings, and the app automatically handles transcription and formatting using State-of-the-Art AI Models. Key features include detailed word-level timestamps, audio event detection, and integrated speaker diarization. Transcripts are securely stored for their owners and robust data privacy.\n\nReason for Project:\nInterviewToText streamlines the transcription process, saving researchers considerable time and improving accuracy through advanced AI technology. Researchers or students can focus more on analysis rather than tedious manual transcription tasks, boosting productivity and enhancing overall research quality.\n\nTech Stack:\n- Frontend: React, Next.js (hosted on Vercel)\n- Backend: Supabase (authentication, user management, data storage), Resend (secure SMTP login via magic links)\n- AI Services: ElevenLabs Scribe Model (automated transcription, word-level timestamps, audio event detection, speaker diarization)\n- Storage: AWS S3 (secure storage for audio and transcript files)\n\nThis integrated tech stack provides a scalable, secure, and performant transcription solution tailored specifically for qualitative research needs.",
      technologies: ["Next.js", "ElevenLabs", "AWS", "Supabase"],
      link: "https://interviewtotext.com", 
      github: "https://github.com/gitmichelhub/QualityInterview"
    },
    {
      title: "Autonomous-driving prototype chaos to pre-prod v0.9",
      description: "A top-tier OEM's autonomous-driving division was scaling fast: 25 + teams, 300 + engineers, slipping milestones, and low visibility on blockers.",
      detailedDescription: "• Scaled SAFe to 25+ cross-functional teams (≈300 people), adding weekly flow-health checks that gave execs 48-h warning on risks.\n• Roadmap & Vision: Co-drafted team Objectives, built a rolling 3-quarter roadmap, and aligned it with external hardware milestones.\n• Backlog Refinement: Partnered with Product Owners to convert vision → features → stories, slicing scope around customer value.\n• Dependency Management in Jira: Implemented new cross-team links & dashboards; first real-time view of critical path.\n• Gen-AI Test-Case Spike: Piloted auto-generation for SiL tests; cut authoring effort 40%.\n• Planning Facilitation: Ran PI planning & iteration reviews; velocity up 18% over three increments.\n• Business Impact: Slippage down 27%; tighter supplier coordination unlocked additional budget for the next release train.",
      technologies: ["SAFe", "Jira", "Roadmapping", "GenAI"],
      link: "https://www.mhp.com/de/"
    },
    {
      title: "SAFe Training Facilitator", 
      description: "Official SAFe certification trainings for more than 300 participants to scale agile practices.",
      detailedDescription: "Specializing in Leading SAFe, SAFe Product Owner/Product Management, and SAFe Scrum Master courses. Delivered engaging, two-day training sessions both remotely and on-site, creating an interactive environment that encouraged open dialogue and deep exploration of agile scaling practices and frameworks.\n\nWhy SAFe? Because it's particularly effective for German enterprise customers aiming to significantly increase their product development velocity. While many IT teams have foundational experience with agile methods, scaling these practices in the German market, especially within the automotive industry, presents unique challenges. Strict compliance requirements, detailed processes, and hierarchical structures can impede agile transformation. SAFe provides organizations with the structure to realign and optimize their value streams, fostering an iterative and efficient approach to product development that traditional models struggle to achieve. This is precisely why I started enabling colleagues and professionals to deepen their understanding and practical knowledge of scalable product development.",
      technologies: ["Agile", "Product", "Enterprise", "Transformation"],
      link: "https://framework.scaledagile.com"
    }
  ];

  const timelineData = [
    // Professional Experience (reverse chronological order - latest first)
    {
      date: "Present",
      title: "Senior IT Consultant - MHP – A Porsche Company",
      summary: " Translating customer needs into shippable products. Working closely with customers to define product visions and roadmaps. Implementing agile product management practices and metrics. Deploying production-grade applications",
      tag: "FTE", 
      icon: <Briefcase />
    },
    
    {
      date: "2025",
      title: "AI-Powered Portfolio Assistant",
      summary: "Created an intelligent portfolio website with an embedded AI agent that engages visitors in natural conversations about my professional background and experience. It is supposed to be a tech demo for the current state of conversational AI.",
      tag: "Hobby",
      icon: <Code />
    },
    {
      date: "2024",
      title: "AI Transcription Web Service",
      summary: "Developed a scalable audio transcription service. Integrated ElevenLabs' state-of-the-art speech-to-text AI model for highly accurate interview transcriptions.",
      tag: "Hobby",
      icon: <Code />
    },
    {
      date: "2024",
      title: "Microsoft Azure AI Engineer Associate",
      summary: "Professional certification in Azure AI services and machine learning solutions.",
      tag: "Cert",
      icon: <Award />
    },
    {
      date: "2024",
      title: "ITIL Foundation",
      summary: "IT service management framework certification for best practices in IT operations.",
      tag: "Cert",
      icon: <Trophy />
    },
    {
      date: "2024-2025",
      title: "IT Consultant - MHP – A Porsche Company",
      summary: "Coaching 3 hardware and software teams and transforming an autonomous driving solution with 300 people to increase engineering velocity. Improving Product Vision and Roadmap. Adjusting and prioritizing requirements. Spot consulting for several RTEs and Agile Release Trains. Facilitation of PI Plannings as a RTE.",
      tag: "FTE",
      icon: <Briefcase />
    },
    {
      date: "2022-Present",
      title: "SAFe Training Facilitator",
      summary: "Facilitating SAFe trainings as SPC for 300+ participants from several countries with a 4.8/5.0 rating.",
      tag: "FTE",
      icon: <Users />
    },
    {
      date: "2023",
      title: "SAFe Practice Consultant (SPC)",
      summary: "Advanced certification in Scaled Agile Framework for enterprise transformation.",
      tag: "Cert",
      icon: <Users />
    },
    {
      date: "2023",
      title: "IT Consultant - MHP – A Porsche Company",
      summary: "Scrum Master and Agile Coach with a monetization Release Train in an IT Enterprise, working closely with internal and external stakeholders. Transformation to an iterative and incremental product development approach. Creating pre-sales and sales material and working on multi million euro proposals.",
      tag: "FTE",
      icon: <Briefcase />
    },
    {
      date: "2023",
      title: "AWS Certified Cloud Practitioner",
      summary: "Foundational certification in AWS cloud computing concepts and services.",
      tag: "Cert",
      icon: <Globe />
    },
    {
      date: "2022",
      title: "Professional Scrum Master",
      summary: "Certification in Scrum methodology and agile project management practices.",
      tag: "Cert",
      icon: <Zap />
    },
    {
      date: "2022",
      title: "Junior IT Consultant - MHP – A Porsche Company",
      summary: "Junior consultant as a Scrum Master, supporting a team and multiple roles.",
      tag: "FTE",
      icon: <Briefcase />
    },
    {
      date: "2021-2022",
      title: "Marketing Consulting - Tax Office Dr. Schulte-Ostermann",
      summary: "Optimized Google My Business and social-media presence to enhance marketing and recruiting.",
      tag: "Part-time",
      icon: <Briefcase />
    },
    {
      date: "2019-2020",
      title: "Red Bull Consumer Service GmbH",
      summary: "Campus marketing, sales, and event support.",
      tag: "Part-time",
      icon: <Briefcase />
    },
    {
      date: "2018-2019",
      title: "Chalmers University of Technology, Gothenburg",
      summary: "Exchange Semester (Erasmus) focusing on Electric Drives, Intellectual Property, and Project Management.",
      tag: "Edu",
      icon: <GraduationCap />
    },
    {
      date: "2017-2022",
      title: "Event Organization & Soft-Skills Training - bonding Student Initiative e.V.",
      summary: "Organized recruiting events, drove social-media marketing, and delivered workshops on time management and communication.",
      tag: "Part-time",
      icon: <Heart />
    },
    {
      date: "2017-2018",
      title: "Teacher Assistant at the Institute of Management & Organization, TU Braunschweig",
      summary: "Conducted seminars and lectures regarding the first Semester lecture 'Introduction to Management' and supported doctoral research.",
      tag: "Part-time",
      icon: <GraduationCap />
    },
    {
      date: "2017-2018",
      title: "Europcar",
      summary: "Customer service and vehicle operations.",
      tag: "Part-time",
      icon: <Briefcase />
    },
    {
      date: "2016-2021",
      title: "B.Sc. Electrical Engineering and Business at Technical University of Braunschweig",
      summary: "Bachelor thesis: 'Relationship between Leaders and Employees in the Context of Flexible Work'",
      tag: "Edu",
      icon: <GraduationCap />
    },
    {
      date: "2012-2017",
      title: "Nordwind Wassersport e.V., Surendorf",
      summary: "Instructor for beginner and advanced wind-surfing courses.",
      tag: "Part-time",
      icon: <Waves />
    },  
    {
      date: "2009-2016",
      title: "Gymnasium Isarnwohld, Gettorf",
      summary: "High-School Diploma (Abitur). Served as Student Council President (2015, 2016).",
      tag: "Edu",
      icon: <GraduationCap />
    }
  ];

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'FTE': return 'bg-green-100 text-green-700';
      case 'Part-time': return 'bg-blue-100 text-blue-700';
      case 'Edu': return 'bg-purple-100 text-purple-700';
      case 'Hobby': return 'bg-orange-100 text-orange-700';
      case 'Cert': return 'bg-yellow-100 text-yellow-700';
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
              
              {/* Detailed Description Accordion */}
              <Collapsible 
                open={openDetails === index} 
                onOpenChange={(open) => setOpenDetails(open ? index : null)}
                className="mb-4"
              >
                <CollapsibleTrigger asChild>
                  <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors text-sm font-medium mb-3">
                    <span>More details</span>
                    {openDetails === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out">
                  <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                      {project.detailedDescription}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
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
                {project.link && (
                  <a 
                    href={project.link}
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm font-medium">View Live</span>
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github}
                    className="flex items-center space-x-2 text-slate-600 hover:text-slate-700 transition-colors"
                  >
                    <Github size={16} />
                    <span className="text-sm font-medium">Source</span>
                  </a>
                )}
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
