import React from 'react';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from "@/hooks/use-language";
import { Link } from 'react-router-dom';
import { BLOG_SECTION_CONTENT } from '@/content/blog-content';

interface BlogSectionProps {
  isVoiceActive?: boolean;
}

// Category chip tone per post (keyed by slug, which is stable across languages)
// so the list doesn't read as a wall of identical copper chips.
const CATEGORY_TONE: Record<string, string> = {
  'agentic-work-adoption': 'glass-tag',
  'markdown-llm-wiki-gstack': 'glass-tag-amber',
  'ai-voice-interfaces': 'glass-tag-teal',
  'scalable-react-applications': 'glass-tag',
  'connected-cars-iot': 'glass-tag-teal',
};

const BlogSection: React.FC<BlogSectionProps> = ({ isVoiceActive = false }) => {
  const { language } = useLanguage();
  const t = BLOG_SECTION_CONTENT[language];
  const posts = t.posts;

  return (
    <section id="blog" className="min-h-screen py-20 bg-gradient-to-br from-glass-light via-white to-glass-cream relative overflow-hidden">
      {/* Ambient backdrop — gives the glass cards something to refract */}
      <div className="section-geometry geometry-blog" aria-hidden="true">
        <div className="floating-shape-strong absolute top-16 -right-24 w-96 h-96 rounded-full" />
        <div className="floating-shape-strong absolute bottom-1/4 -left-24 w-80 h-80 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-semibold text-glass-dark mb-4 font-playfair">{t.sectionTitle}</h2>
          <p className="text-xl text-glass-muted">
            {t.subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={index}
              className="glass glass-content liquid-glass-soft rounded-content p-8 transition-all duration-300 hover:scale-[1.015] hover:shadow-xl animate-fade-up group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex h-full flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className={`${CATEGORY_TONE[post.slug] ?? 'glass-tag'} px-3 py-1 text-sm rounded-full font-semibold`}>
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-glass-muted">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-glass-dark group-hover:text-glass-copper transition-colors font-playfair">
                  {post.title}
                </h3>

                <p className="text-glass-muted leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-2">
                  {isVoiceActive ? (
                    <a 
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-glass-copper hover:text-glass-amber transition-colors font-medium"
                      title="Opens in new tab (voice assistant active)"
                    >
                      <span>{t.readMore}</span>
                      <ExternalLink size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="flex items-center space-x-2 text-glass-copper hover:text-glass-amber transition-colors font-medium"
                    >
                      <span>{t.readMore}</span>
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
