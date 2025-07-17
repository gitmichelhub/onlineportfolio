import React from 'react';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from "@/hooks/use-language";
import { Link } from 'react-router-dom';

interface BlogSectionProps {
  isVoiceActive?: boolean;
}

const BlogSection: React.FC<BlogSectionProps> = ({ isVoiceActive = false }) => {
  const { language } = useLanguage();
  const t = {
    en: {
      sectionTitle: "Latest Thoughts",
      subtitle: "Insights on technology, development, and the future of digital experiences.",
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
        },
        {
          title: "Design Systems in the Age of AI",
          excerpt: "Creating consistent, accessible design systems that can adapt to AI-generated content and dynamic user interfaces.",
          date: "Nov 28, 2024",
          readTime: "7 min read",
          category: "Design",
          slug: "design-systems-ai"
        }
      ]
    },
    de: {
      sectionTitle: "Neueste Gedanken",
      subtitle: "Einblicke in Technologie, Entwicklung und die Zukunft digitaler Erlebnisse.",
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
        },
        {
          title: "Designsysteme im KI-Zeitalter",
          excerpt: "Konsistente, zugängliche Designsysteme, die sich an KI-generierte Inhalte und dynamische Benutzeroberflächen anpassen können.",
          date: "28. Nov 2024",
          readTime: "7 Min. Lesezeit",
          category: "Design",
          slug: "design-systems-ai"
        }
      ]
    }
  };
  const posts = t[language].posts;

  return (
    <section id="blog" className="min-h-screen py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-semibold text-slate-900 mb-4">{t[language].sectionTitle}</h2>
          <p className="text-xl text-slate-600">
            {t[language].subtitle}
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <article 
              key={index}
              className="glass rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fade-up group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4">
                  {isVoiceActive ? (
                    <a 
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
                      title="Opens in new tab (voice assistant active)"
                    >
                      <span>{t[language].readMore}</span>
                      <ExternalLink size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
                    >
                      <span>{t[language].readMore}</span>
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
