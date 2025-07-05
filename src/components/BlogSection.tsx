import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from "@/hooks/use-language";

const BlogSection: React.FC = () => {
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
          category: "AI"
        },
        {
          title: "Building Scalable React Applications",
          excerpt: "Best practices for structuring large React applications with TypeScript, including state management and component architecture patterns.",
          date: "Dec 10, 2024",
          readTime: "8 min read",
          category: "Development"
        },
        {
          title: "Connected Cars and IoT Integration",
          excerpt: "How modern vehicles are becoming smart devices and the exciting possibilities this creates for developers and users alike.",
          date: "Dec 5, 2024",
          readTime: "6 min read",
          category: "Automotive"
        },
        {
          title: "Design Systems in the Age of AI",
          excerpt: "Creating consistent, accessible design systems that can adapt to AI-generated content and dynamic user interfaces.",
          date: "Nov 28, 2024",
          readTime: "7 min read",
          category: "Design"
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
          category: "KI"
        },
        {
          title: "Skalierbare React-Anwendungen bauen",
          excerpt: "Best Practices für den Aufbau großer React-Anwendungen mit TypeScript, inklusive State-Management und Komponentenarchitektur.",
          date: "10. Dez 2024",
          readTime: "8 Min. Lesezeit",
          category: "Entwicklung"
        },
        {
          title: "Vernetzte Autos und IoT-Integration",
          excerpt: "Wie moderne Fahrzeuge zu smarten Geräten werden und welche Möglichkeiten sich daraus für Entwickler und Nutzer ergeben.",
          date: "5. Dez 2024",
          readTime: "6 Min. Lesezeit",
          category: "Automotive"
        },
        {
          title: "Designsysteme im KI-Zeitalter",
          excerpt: "Konsistente, zugängliche Designsysteme, die sich an KI-generierte Inhalte und dynamische Benutzeroberflächen anpassen können.",
          date: "28. Nov 2024",
          readTime: "7 Min. Lesezeit",
          category: "Design"
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
                  <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors font-medium">
                    <span>{t[language].readMore}</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
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
