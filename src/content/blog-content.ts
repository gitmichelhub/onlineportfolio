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
  opensInNewTab: string;
  posts: BlogPostPreview[];
}

export const BLOG_SECTION_CONTENT: Record<Language, BlogSectionCopy> = {
  en: {
    sectionTitle: "Latest Thoughts",
    subtitle: "Insights on my life, technology, development, and the future of digital experiences.",
    readMore: "Read more",
    opensInNewTab: "opens in a new tab while the voice assistant is active",
    posts: [
      {
        title: "An Agent Broke Out of Its Sandbox and Walked Into Production",
        excerpt: "An autonomous agent escaped an OpenAI evaluation, crossed the open internet, and reached Hugging Face's Kubernetes clusters, VPN, and source control in five days. What machine-speed offense means for how we build and connect software.",
        date: "Aug 14, 2026",
        readTime: "7 min read",
        category: "Security",
        slug: "agent-intrusion-huggingface"
      },
      {
        title: "Task Crossover: AI Is Quietly Redrawing Who Does What",
        excerpt: "OpenAI analysed 800,000 work messages and found 43.5% of role-specific AI use is about someone else's job. Why the disappearing handoff is an org-design problem, not a tooling one.",
        date: "Aug 14, 2026",
        readTime: "6 min read",
        category: "AI at Work",
        slug: "ai-task-crossover"
      },
      {
        title: "97.9% at OpenAI, 65% at Anthropic: What the Labs' Own Numbers Say About Agentic Work",
        excerpt: "OpenAI says nearly every employee now works through Codex; Anthropic says Claude Tag writes 65% of its product team's code. What the labs' own adoption data means for everyone else.",
        date: "Jul 3, 2026",
        readTime: "4 min read",
        category: "AI at Work",
        slug: "agentic-work-adoption"
      },
      {
        title: "Your Second Brain Is a Folder of Markdown: Karpathy's LLM Wiki and Garry Tan's gstack",
        excerpt: "A gist and a folder of prompts are quietly redefining how developers work with agents. Why plain markdown — Karpathy's compounding wiki and Garry Tan's 23-skill gstack — is the new abstraction layer.",
        date: "Jul 3, 2026",
        readTime: "5 min read",
        category: "AI Tooling",
        slug: "markdown-llm-wiki-gstack"
      },
      {
        title: "The Future of AI-Powered Voice Interfaces",
        excerpt: "Exploring how conversational AI is reshaping user interactions and what developers need to know about implementing voice-first experiences.",
        date: "Jul 17, 2025",
        readTime: "3 min read",
        category: "Voice AI",
        slug: "ai-voice-interfaces"
      },
      {
        title: "Vibe Coding: Riding the Autonomy Slider From Keystrokes to Agents",
        excerpt: "From inline autocomplete to long-horizon agents like Fable—and why Fable being pulled from US-government use just turned agentic coding into a question of European digital sovereignty.",
        date: "Jul 15, 2025",
        readTime: "8 min read",
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
    subtitle: "Einblicke in mein Leben, Technologie, Entwicklung und die Zukunft digitaler Erlebnisse.",
    readMore: "Mehr lesen",
    opensInNewTab: "wird bei aktivem Sprachassistenten in einem neuen Tab geöffnet",
    posts: [
      {
        title: "Ein Agent ist aus seiner Sandbox ausgebrochen — und in die Produktion spaziert",
        excerpt: "Ein autonomer Agent entkam einer OpenAI-Evaluation, überquerte das offene Internet und erreichte in fünf Tagen Kubernetes-Cluster, VPN und Source Control von Hugging Face. Was Angriffe in Maschinengeschwindigkeit für unsere Software bedeuten.",
        date: "14. Aug 2026",
        readTime: "7 Min. Lesezeit",
        category: "Security",
        slug: "agent-intrusion-huggingface"
      },
      {
        title: "Task Crossover: KI verschiebt gerade leise, wer was macht",
        excerpt: "OpenAI hat 800.000 Arbeitsanfragen ausgewertet: 43,5 % der rollenspezifischen KI-Nutzung betrifft den Job von jemand anderem. Warum die verschwindende Übergabe ein Organisationsproblem ist, kein Tooling-Problem.",
        date: "14. Aug 2026",
        readTime: "6 Min. Lesezeit",
        category: "AI at Work",
        slug: "ai-task-crossover"
      },
      {
        title: "97,9 % bei OpenAI, 65 % bei Anthropic: Was die Zahlen der Labs über Agentic Work verraten",
        excerpt: "OpenAI berichtet, dass fast alle Mitarbeitenden über Codex arbeiten; bei Anthropic schreibt Claude Tag 65 % des Produktteam-Codes. Was die Adoptionsdaten der Labs für alle anderen bedeuten.",
        date: "3. Jul 2026",
        readTime: "4 Min. Lesezeit",
        category: "AI at Work",
        slug: "agentic-work-adoption"
      },
      {
        title: "Dein zweites Gehirn ist ein Ordner voller Markdown: Karpathys LLM-Wiki und Garry Tans gstack",
        excerpt: "Ein Gist und ein Ordner voller Prompts definieren gerade neu, wie Entwickler mit Agenten arbeiten. Warum reines Markdown — Karpathys Wiki und Garry Tans gstack — die neue Abstraktionsschicht ist.",
        date: "3. Jul 2026",
        readTime: "5 Min. Lesezeit",
        category: "AI Tooling",
        slug: "markdown-llm-wiki-gstack"
      },
      {
        title: "Die Zukunft KI-gestützter Sprachassistenten",
        excerpt: "Wie Conversational AI die Nutzerinteraktion verändert und was Entwickler über Voice-First-Erlebnisse wissen sollten.",
        date: "17. Jul 2025",
        readTime: "3 Min. Lesezeit",
        category: "Sprach KI",
        slug: "ai-voice-interfaces"
      },
      {
        title: "Vibe Coding: Auf dem Autonomy Slider von Tastatureingaben zu Agenten",
        excerpt: "Von Inline-Autovervollständigung zu Long-Horizon-Agenten wie Fable – und warum Fables Rückzug aus US-Regierungsdeployments Agentic Coding zur Frage europäischer digitaler Souveränität macht.",
        date: "15. Jul 2025",
        readTime: "8 Min. Lesezeit",
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
