import { Language } from '@/hooks/use-language';

export interface BlogPostPreview {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export interface BlogSectionCopy {
  sectionTitle: string;
  subtitle: string;
  readMore: string;
  posts: BlogPostPreview[];
}

export const BLOG_SECTION_CONTENT: Record<Language, BlogSectionCopy> = {
  en: {
    sectionTitle: "Latest Thoughts",
    subtitle: "Insights on my life, technology, development, and the future of digital experiences.",
    readMore: "Read more",
    posts: [
      {
        title: "The Future of AI-Powered Voice Interfaces",
        excerpt: "Exploring how conversational AI is reshaping user interactions and what developers need to know about implementing voice-first experiences.",
        date: "Dec 15, 2024",
        readTime: "5 min read",
        category: "AI",
        slug: "ai-voice-interfaces"
      },
      {
        title: "Vibe Coding: Riding the Autonomy Slider From Keystrokes to Agents",
        excerpt: "Exploring the evolution of AI-assisted development and the autonomy slider concept that's reshaping how we write code.",
        date: "Jul 15, 2025",
        readTime: "6 min read",
        category: "Development",
        slug: "scalable-react-applications"
      },
      {
        title: "Flow & Focus: How Coastal Origins and Team Dynamics Shape My Consulting Path",
        excerpt: "How coastal upbringing, collaborative energy, and disciplined routines create the foundation for professional success and personal well-being.",
        date: "Jul 17, 2025",
        readTime: "2 min read",
        category: "Leadership",
        slug: "connected-cars-iot"
      }
    ]
  },
  de: {
    sectionTitle: "Aktuelle Gedanken",
    subtitle: "Einblicke in mein Leben,Technologie, Entwicklung und die Zukunft digitaler Erlebnisse.",
    readMore: "Mehr lesen",
    posts: [
      {
        title: "Die Zukunft KI-gestützter Sprachschnittstellen",
        excerpt: "Wie Conversational AI die Nutzerinteraktion verändert und was Entwickler über Voice-First-Erlebnisse wissen sollten.",
        date: "15. Dez 2024",
        readTime: "5 Min. Lesezeit",
        category: "KI",
        slug: "ai-voice-interfaces"
      },
      {
        title: "Vibe Coding: Auf dem Autonomy Slider von Tastatureingaben zu Agenten",
        excerpt: "Die Evolution KI-gestützter Entwicklung und das Autonomy Slider Konzept, das die Art, wie wir Code schreiben, verändert.",
        date: "15. Jul 2025",
        readTime: "6 Min. Lesezeit",
        category: "Entwicklung",
        slug: "scalable-react-applications"
      },
      {
        title: "Zwischen Küste und Kollaboration: Wie Meer und Teamgeist meinen beruflichen Weg prägen",
        excerpt: "Wie eine Küstenkindheit, kollaborative Energie und disziplinierte Routinen die Grundlage für beruflichen Erfolg und persönliches Wohlbefinden schaffen.",
        date: "17. Jul 2025",
        readTime: "2 Min. Lesezeit",
        category: "Leadership",
        slug: "connected-cars-iot"
      }
    ]
  }
};
