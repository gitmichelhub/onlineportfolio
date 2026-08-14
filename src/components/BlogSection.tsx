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
  'agent-intrusion-huggingface': 'glass-tag-amber',
  'ai-task-crossover': 'glass-tag-teal',
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
  const [featuredPost, ...remainingPosts] = posts;

  const renderPost = (
    post: (typeof posts)[number],
    index: number,
    isFeatured = false,
    spansFullRow = false,
  ) => (
    <article
      key={post.slug}
      className={`glass glass-content liquid-glass-soft rounded-content transition-all duration-300 hover:scale-[1.015] hover:shadow-xl animate-fade-up group cursor-pointer ${
        isFeatured ? 'p-8 sm:p-10' : 'p-8'
      } ${spansFullRow ? 'lg:col-span-2' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className={`${CATEGORY_TONE[post.slug] ?? 'glass-tag'} self-start px-3 py-1 text-sm rounded-full font-semibold`}>
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

        <h3 className={`${isFeatured ? 'text-3xl sm:text-4xl' : 'text-2xl'} font-semibold text-glass-dark group-hover:text-glass-copper transition-colors font-playfair`}>
          {isVoiceActive ? (
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:z-10 after:content-['']"
              aria-label={`${post.title} — ${t.opensInNewTab}`}
            >
              {post.title}
            </a>
          ) : (
            <Link
              to={`/blog/${post.slug}`}
              className="after:absolute after:inset-0 after:z-10 after:content-['']"
            >
              {post.title}
            </Link>
          )}
        </h3>

        <p className={`${isFeatured ? 'max-w-4xl text-lg' : ''} text-glass-muted leading-relaxed`}>
          {post.excerpt}
        </p>

        <div aria-hidden="true" className="mt-auto flex items-center space-x-2 pt-2 text-glass-copper font-medium">
          <span>{t.readMore}</span>
          {isVoiceActive ? (
            <ExternalLink size={16} className="transition-transform group-hover:translate-x-1" />
          ) : (
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          )}
        </div>
      </div>
    </article>
  );

  return (
    <section id="blog" className="min-h-screen py-20 bg-gradient-to-br from-glass-light via-white to-glass-cream relative overflow-hidden">
      {/* Ambient backdrop — gives the glass cards something to refract */}
      <div className="section-geometry geometry-blog" aria-hidden="true">
        <div className="ambient-band-teal absolute top-32 -right-24 w-[30rem] h-[30rem] rounded-full" />
        <div className="ambient-band-copper absolute top-[44%] -left-24 w-[26rem] h-[26rem] rounded-full" />
        <div className="floating-shape-strong absolute bottom-[8%] right-[18%] w-96 h-96 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-semibold text-glass-dark mb-4 font-playfair">{t.sectionTitle}</h2>
          <p className="text-xl text-glass-muted">
            {t.subtitle}
          </p>
        </div>

        {featuredPost && (
          <div className="mb-8">
            {renderPost(featuredPost, 0, true)}
          </div>
        )}

        {remainingPosts.length > 0 && (
          <div className="grid gap-8 lg:grid-cols-2">
            {remainingPosts.map((post, index) => renderPost(
              post,
              index + 1,
              false,
              remainingPosts.length % 2 === 1 && index === remainingPosts.length - 1,
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
