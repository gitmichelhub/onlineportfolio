import React, { useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp, Briefcase, GraduationCap, Code, Heart, Award, Users, Lightbulb, BookOpen, Waves, Trophy, Zap, Globe } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useLanguage } from "@/hooks/use-language";

const ProjectsSection: React.FC = () => {
  const { language } = useLanguage();
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState<number | null>(null);

  // ENGLISH DATA
  const projectsEN = [
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
      detailedDescription: "InterviewToText is a specialized web application designed for qualitative researchers, enabling efficient and accurate transcription of audio interviews involving up to 32 speakers. \n\nUsers upload their recordings, and the app automatically handles transcription and formatting using State-of-the-Art AI Models. Key features include detailed word-level timestamps, audio event detection, and integrated speaker diarization. Transcripts are securely stored for their owners and robust data privacy.\n\nReason for Project:\nI created this service during an Aethos Hackathon in Berlin, where I wanted to explore the potential of modern AI transcription technology. InterviewToText streamlines the transcription process, saving researchers considerable time and improving accuracy through advanced AI technology. Researchers or students can focus more on analysis rather than tedious manual transcription tasks, boosting productivity and enhancing overall research quality.\n\nTech Stack:\n- Frontend: React, Next.js (hosted on Vercel)\n- Backend: Supabase (authentication, user management, data storage), Resend (secure SMTP login via magic links)\n- AI Services: ElevenLabs Scribe Model (automated transcription, word-level timestamps, audio event detection, speaker diarization)\n- Storage: AWS S3 (secure storage for audio and transcript files)\n\nThis integrated tech stack provides a scalable, secure, and performant transcription solution tailored specifically for qualitative research needs.",
      technologies: ["Next.js", "ElevenLabs", "AWS", "Supabase"],
      link: "https://interviewtotext.com", 
      github: "https://github.com/gitmichelhub/QualityInterview"
    },
    {
      title: "Autonomous-driving prototype chaos to pre-prod v0.9",
      description: "A top-tier OEM's autonomous-driving division was scaling fast: 25 + teams, 300 + engineers, slipping milestones, and low visibility on blockers.",
      detailedDescription: "Scaled SAFe to 25+ cross-functional teams (≈300 people), adding weekly flow-health checks that gave execs 48-h warning on risks.\n\nRoadmap & Vision: Co-drafted team Objectives, built a rolling 3-quarter roadmap, and aligned it with external hardware milestones.\n\nBacklog Refinement: Partnered with Product Owners to convert vision → features → stories, slicing scope around customer value.\n\nDependency Management in Jira: Implemented new cross-team links & dashboards; first real-time view of critical path.\n\nGen-AI Test-Case Spike: Piloted auto-generation for SiL tests; cut authoring effort 40%.\n\nPlanning Facilitation: Ran PI planning & iteration reviews; velocity up 18% over three increments.\n\nBusiness Impact: Tighter supplier coordination unlocked additional budget for the next release train.",
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
  const timelineDataEN = [
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
      title: "SAFe Trainer",
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
  const getTagColorEN = (tag: string) => {
    switch (tag) {
      case 'FTE': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'Part-time': return 'bg-teal-100 text-teal-700 border border-teal-200';
      case 'Edu': return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'Hobby': return 'bg-orange-100 text-orange-700 border border-orange-200';
      case 'Cert': return 'bg-cyan-100 text-cyan-700 border border-cyan-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  // GERMAN DATA
  const projectsDE = [
    {
      title: "Conversational-AI-Portfolio-Agent: michel.chat",
      description: "Eine Conversational-AI, gebaut mit React und ElevenLabs-Integration für natürliche Sprachinteraktionen.",
      detailedDescription: "Dieser KI-Assistent ermöglicht menschenähnliche Gespräche. Durch die Integration von ElevenLabs wird eine realistische Sprachsynthese erreicht, die ein immersives Nutzererlebnis schafft. Das System bietet Funktionen wie Situationsbewusstsein, Kontext (Erinnerungen) an meinen beruflichen Hintergrund und dynamische Antwortgenerierung.\n\nGrund für das Projekt:\nIch wollte eine Tech-Demo für den aktuellen Stand von Conversational AI erstellen. Ich wollte herausfinden, ob ich einen einfachen Agenten entwickeln kann, der mit mir über meinen beruflichen Hintergrund und meine Expertise sprechen kann. Die Arbeit mit dem System-Prompt und dem notwendigen Kontext war für mich eine wertvolle Erfahrung, um den aktuellen Stand von KI-Agenten zu verstehen. Das Frontend habe ich mit dem Vibe-Coding-Tool Lovable erstellt.\n\n Für den nötigen Kontext habe ich eine detaillierte Beschreibung meines CV, meiner Fähigkeiten sowie meine Blog-Beiträge als Grundlage verwendet, damit der Agent meine Ansichten zu Technik, KI und dem Leben im Allgemeinen kennt. Context Engineering bedeutete hier, dem Agenten die notwendigen Informationen per RAG und Tool-Calls (Suche) bereitzustellen. Als nächstes Feature ist die automatische Nachrichtenerstellung aus Sprachbefehlen vorgesehen, inklusive Versand einer Kalendereinladung an meinen persönlichen Google-Kalender.",
      technologies: ["React", "TypeScript", "ElevenLabs", "WebSocket"],
      link: "https://michel.chat",
      github: "https://github.com/gitmichelhub/onlineportfolio"
    },
    {
      title: "Interviewtranskription: Interview2Text",
      description: "SOTA Speech-to-Text-Transkriptions-Website für bis zu 32 Sprecher:innen",
      detailedDescription: "InterviewToText ist eine Website für qualitative Forschende und ermöglicht eine effiziente und präzise Transkription von Audiointerviews mit bis zu 32 Sprecher:innen.\n\nUser laden ihre Aufnahmen hoch und die App übernimmt automatisch Transkription und Formatierung mithilfe modernster KI-Modelle. Zu den Hauptfunktionen gehören detaillierte Zeitstempel auf Wortebene, Erkennung von Audioereignissen und integrierte Sprecher-Erkennung. Transkripte werden sicher gespeichert.\n\nGrund für das Projekt:\nIch habe diesen Service während eines Aethos Hackathons in Berlin entwickelt, wo ich das Potenzial moderner KI-Transkriptionstechnologie erkunden wollte. Bereits mit dem Release von Whisper-V1 habe ich das Modell lokal laufen lassen, um den Tranksriptionsprozess zu verschnellern. Mittlerweile gibt es aber viel bessere und größsere STT Modelle, welche dementsprechend größsere Infrastruktur benötigen. InterviewToText vereinfacht den Transkriptionsprozess, spart erheblich Zeit und verbessert die Genauigkeit durch State of the art  KI-Technologie. Forschende oder Studierende können sich stärker auf die Analyse konzentrieren, anstatt mühsame manuelle Transkriptionsaufgaben zu erledigen, wodurch die Produktivität steigt und die Forschungsqualität verbessert wird.\n\nTech-Stack:\n- Frontend: React, Next.js (gehostet auf Vercel)\n- Backend: Supabase (Authentifizierung, Benutzerverwaltung, Datenspeicherung), Resend (sicherer SMTP-Login via Magic Links)\n- KI-Services: ElevenLabs Scribe Model (automatisierte Transkription, Wortebene-Zeitstempel, Audioereigniserkennung, Speaker-Diarisation)\n- Storage: AWS S3 (sichere Speicherung von Audio- und Transkriptdateien)\n\nDieser integrierte Tech-Stack bietet eine skalierbare, sichere und performante Transkriptionslösung, die speziell auf die Bedürfnisse der qualitativen Forschung zugeschnitten ist.",
      technologies: ["Next.js", "ElevenLabs", "AWS", "Supabase"],
      link: "https://interviewtotext.com",
      github: "https://github.com/gitmichelhub/QualityInterview"
    },
    {
      title: "Automatisiertes Fahren: Prototyp zu Vorproduktion",
      description: "Das automatisierte Fahren Programm eines OEM skalierte in kürzester Zeit: 25+ Teams, 300+ Ingenieur:innen, rutschende Meilensteine und geringe Transparenz bei Blockern.",
      detailedDescription: "• SAFe auf 25+ funktionsübergreifende Teams (≈300 Personen) skaliert und wöchentliche Health-Checks eingeführt, die dem Management eine 48-h-Vorwarnung vor Risiken gaben.\n\n• Roadmap & Vision: Teamziele mitentwickelt, rollierende 3-Quartals-Roadmap aufgebaut und mit externen Hardware-Meilensteinen abgeglichen.\n\n• Backlog-Pflege: Mit Product Ownern Vision → Features → Stories umgesetzt und den Scope konsequent am Kundennutzen ausgerichtet.\n\n• Abhängigkeitsmanagement in Jira: Neue cross-team Links & Dashboards implementiert; erste Echtzeit-Sicht auf den kritischen Pfad geschaffen.\n\n• Gen-AI-Testfall-Spike: Auto-Generierung für SiL-Tests pilotiert; Authoring-Aufwand um 40 % reduziert.\n\n• Planning-Facilitation: PI-Plannings und Iterations-Reviews durchgeführt; Velocity über drei Inkremente um 18 % gesteigert.\n\n• Business-Impact: Engere Lieferantenkoordination erschloss zusätzliches Budget für den nächsten Release-Train.",
      technologies: ["SAFe", "Jira", "Roadmapping", "GenAI"],
      link: "https://www.mhp.com/de/"
    },
    {
      title: "SAFe Trainer",
      description: "Offizielle SAFe-Zertifizierungstrainings für mehr als 300 Teilnehmende, um agile Praktiken zu skalieren.",
      detailedDescription: "Spezialisiert auf Leading SAFe, SAFe Product Owner/Product Management und SAFe Scrum Master Kurse. Durchführung zweitägiger Trainings sowohl remote als auch vor Ort und Schaffung eines interaktiven Umfelds, das offenen Dialog sowie eine vertiefte Auseinandersetzung mit agilen Skalierungspraktiken und Frameworks förderte.\n\nWarum SAFe? Weil es sich besonders für deutsche Unternehmenskunden eignet, die ihre Produktentwicklungsgeschwindigkeit erheblich steigern wollen. Während viele IT-Teams bereits agile Grundlagen kennen, stellt die Skalierung dieser Praktiken im deutschen Markt, insbesondere in der Automobilindustrie, einzigartige Herausforderungen dar. Strenge Compliance-Anforderungen, detaillierte Prozesse und hierarchische Strukturen können die agile Transformation behindern. SAFe bietet Unternehmen den Rahmen, ihre Wertströme neu auszurichten und einen iterativen sowie effizienten Ansatz für die Produktentwicklung zu fördern, den traditionelle Modelle nur schwer erreichen. Genau deshalb enable ich Kolleg:innen und Fachleute dabei, ihr Verständnis und ihr Praxiswissen in skalierbarer Produktentwicklung zu vertiefen.",
      technologies: ["Agile", "Product", "Enterprise", "Transformation"],
      link: "https://framework.scaledagile.com"
    }
  ];
  const timelineDataDE = [
    {
      date: "Heute",
      title: "Senior Consultant – MHP – A Porsche Company",
      summary: "Requirements aufnehmen und in Arbeitsaufträge übersetzen. Enge Zusammenarbeit mit Kunden zur Definition von Produktvisionen und Roadmaps. Einführung agiler Produktmanagementpraktiken und Metriken. Deployment von produktionsreifen Anwendungen.",
      tag: "FTE",
      icon: <Briefcase />
    },
    {
      date: "2025",
      title: "KI-gestützter Portfolio-Assistent",
      summary: "Portfolio-Website mit eingebettetem KI-Agent, der Besucher in natürlichen Gesprächen über meinen beruflichen Hintergrund und meine Erfahrungen einbindet. Dient als Tech-Demo für den aktuellen Stand von Conversational AI.",
      tag: "Hobby",
      icon: <Code />
    },
    {
      date: "2024",
      title: "KI-Transkriptions-Website",
      summary: "Skalierbarer Audiotranskriptionsdienst. Integration des SOTA Speech-to-Text-Modells von ElevenLabs für hochpräzise Interviewtranskriptionen, Zeitstempel auf Wortebene und Audioereigniserkennung.",
      tag: "Hobby",
      icon: <Code />
    },
    {
      date: "2024",
      title: "Microsoft Azure AI Engineer Associate",
      summary: "Berufszertifizierung in Azure-AI-Services und Machine-Learning-Lösungen.",
      tag: "Zertifikat",
      icon: <Award />
    },
    {
      date: "2024",
      title: "ITIL Foundation",
      summary: "IT-Service-Management-Framework-Zertifizierung für Best Practices im IT-Betrieb.",
      tag: "Zertifikat",
      icon: <Trophy />
    },
    {
      date: "2024–2025",
      title: "IT-Berater – MHP – A Porsche Company",
      summary: "Coaching von 3 Hardware- und Software-Teams und Transformation eines Programmes (Automatiersiertes Fahren) mit 300 Personen zur Steigerung der Engineering-Velocity. Verbesserung von Produktvision und Roadmap. Anpassen und Priorisieren von Anforderungen. Spot-Consulting für mehrere RTEs und Agile Release Trains. Moderation von PI Plannings als RTE.",
      tag: "FTE",
      icon: <Briefcase />
    },
    {
      date: "2022–Heute",
      title: "SAFe-Trainings-Facilitator",
      summary: "Durchführung von SAFe-Trainings als SPC für 300+ Teilnehmende aus mehreren Ländern mit einer Bewertung von 4,8/5,0.",
      tag: "FTE",
      icon: <Users />
    },
    {
      date: "2023",
      title: "SAFe Practice Consultant (SPC)",
      summary: "Fortgeschrittene Zertifizierung im Scaled Agile Framework für Enterprise-Transformation.",
      tag: "Zertifikat",
      icon: <Users />
    },
    {
      date: "2023",
      title: "IT-Berater – MHP – A Porsche Company",
      summary: "Scrum Master und Agile Coach in einem Monetization Release Train eines IT-Unternehmens, enge Zusammenarbeit mit internen und externen Stakeholdern. Transformation zu einem iterativen und inkrementellen Produktentwicklungsansatz. Erstellung von Pre-Sales- und Sales-Material sowie Mitarbeit an Multi-Millionen-Euro-Angeboten.",
      tag: "FTE",
      icon: <Briefcase />
    },
    {
      date: "2023",
      title: "AWS Certified Cloud Practitioner",
      summary: "Grundlagenzertifizierung in AWS-Cloud-Computing-Konzepten und -Services.",
      tag: "Zertifikat",
      icon: <Globe />
    },
    {
      date: "2022",
      title: "Professional Scrum Master",
      summary: "Zertifizierung in Scrum-Methodik und agiler Projektmanagementpraxis.",
      tag: "Zertifikat",
      icon: <Zap />
    },
    {
      date: "2022",
      title: "Junior IT-Berater – MHP – A Porsche Company",
      summary: "Junior-Berater als Scrum Master, Unterstützung eines Development-Teams und mehrerer Rollen.",
      tag: "FTE",
      icon: <Briefcase />
    },
    {
      date: "2021–2022",
      title: "Marketing-Beratung – Steuerkanzlei Dr. Schulte-Ostermann",
      summary: "Optimierung von Google-My-Business- und Social-Media-Präsenz zur Verbesserung von Marketing und Recruiting.",
      tag: "Teilzeit",
      icon: <Briefcase />
    },
    {
      date: "2019–2020",
      title: "Red Bull Consumer Service GmbH",
      summary: "Campus-Marketing, Vertrieb und Event-Support.",
      tag: "Teilzeit",
      icon: <Briefcase />
    },
    {
      date: "2018–2019",
      title: "Chalmers University of Technology, Göteborg",
      summary: "Auslandssemester (Erasmus) mit Schwerpunkt elektrische Antriebe, Urheberrecht und Projektmanagement.",
      tag: "Edu",
      icon: <GraduationCap />
    },
    {
      date: "2017–2022",
      title: "Eventorganisation & Soft-Skills-Training – bonding-Studenteninitiative e.V.",
      summary: "Organisation von Recruiting-Events, Social-Media-Marketing und Durchführung von Workshops zu Zeitmanagement und Kommunikation.",
      tag: "Teilzeit",
      icon: <Heart />
    },
    {
      date: "2017–2018",
      title: "HiWi am Institut für Management & Organisation, TU Braunschweig",
      summary: "Durchführung von Seminaren und Vorlesungen zur Erstsemester-Vorlesung 'Einführung in die Unternehmensführung' und Unterstützung der Doktoranden in ihrer Forschung.",
      tag: "Teilzeit",
      icon: <GraduationCap />
    },
    {
      date: "2017–2018",
      title: "Europcar",
      summary: "Kundendienst und Fahrzeuglogistik.",
      tag: "Teilzeit",
      icon: <Briefcase />
    },
    {
      date: "2016–2021",
      title: "B.Sc. Elektrotechnik und Wirtschaft an der Technischen Universität Braunschweig",
      summary: "Bachelorarbeit: 'Beziehung zwischen Führungskräften und Mitarbeitenden im Kontext flexibler Arbeit'",
      tag: "Edu",
      icon: <GraduationCap />
    },
    {
      date: "2012–2017",
      title: "Nordwind Wassersport e.V., Surendorf",
      summary: "Trainer für Anfänger- und Fortgeschrittenen-Windsurfkurse.",
      tag: "Teilzeit",
      icon: <Waves />
    },
    {
      date: "2009–2016",
      title: "Gymnasium Isarnwohld, Gettorf",
      summary: "Allgemeine Hochschulreife (Abitur). Schulsprecher (2015, 2016).",
      tag: "Edu",
      icon: <GraduationCap />
    }
  ];
  const getTagColorDE = (tag: string) => {
    switch (tag) {
      case 'FTE': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'Teilzeit': return 'bg-teal-100 text-teal-700 border border-teal-200';
      case 'Edu': return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'Hobby': return 'bg-orange-100 text-orange-700 border border-orange-200';
      case 'Zertifikat': return 'bg-cyan-100 text-cyan-700 border border-cyan-200';
      default: return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  // Select data based on language
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

        {/* Simple Chat Component */}
        <div className="glass rounded-2xl p-6 mb-12 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-start">
              <div className="bg-glass-cream rounded-2xl px-4 py-2 max-w-xs border border-glass-cream">
                <p className="text-sm text-glass-dark/80">
                  {language === 'de' 
                    ? 'Erzähl mir von deinen Projekten'
                    : 'Tell me about your projects'
                  }
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-glass-copper text-white rounded-2xl px-4 py-2 max-w-xs">
                <p className="text-sm font-medium">
                  {language === 'de'
                    ? 'Ich zeige dir gerne meine neuesten Projekten! Schau sie dir unten an.'
                    : 'I would love to show you my latest work! Check out the projects below.'
                  }
                </p>
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
              <h3 className="text-xl font-semibold text-glass-dark mb-3 font-playfair">{project.title}</h3>
              <p className="text-glass-muted mb-4 leading-relaxed">{project.description}</p>
              
              {/* Detailed Description Accordion */}
              <Collapsible 
                open={openDetails === index} 
                onOpenChange={(open) => setOpenDetails(open ? index : null)}
                className="mb-4"
              >
                <CollapsibleTrigger asChild>
                  <button className="flex items-center space-x-2 text-glass-copper hover:text-glass-amber transition-colors text-sm font-medium mb-3">
                    <span>More details</span>
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

        {/* CV Toggle Button */}
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

            {/* Collapsible CV Timeline */}
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
