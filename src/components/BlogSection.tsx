import React from 'react';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from "@/hooks/use-language";
import { Link } from 'react-router-dom';
import { BLOG_SECTION_CONTENT } from '@/content/blog-content';

interface BlogSectionProps {
  isVoiceActive?: boolean;
}

const BlogSection: React.FC<BlogSectionProps> = ({ isVoiceActive = false }) => {
  const { language } = useLanguage();
  const t = BLOG_SECTION_CONTENT[language];
  const posts = t.posts;

  return (
    <section id="blog" className="min-h-screen py-20 bg-gradient-to-br from-glass-light via-white to-glass-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl font-semibold text-glass-dark mb-4 font-playfair">{t[language].sectionTitle}</h2>
          <p className="text-xl text-glass-muted">
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
                  <span className="px-3 py-1 bg-glass-copper/10 text-glass-copper text-sm rounded-full font-medium border border-glass-copper/20">
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

                <div className="flex items-center justify-between pt-4">
                  {isVoiceActive ? (
                    <a 
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-glass-copper hover:text-glass-amber transition-colors font-medium"
                      title="Opens in new tab (voice assistant active)"
                    >
                      <span>{t[language].readMore}</span>
                      <ExternalLink size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="flex items-center space-x-2 text-glass-copper hover:text-glass-amber transition-colors font-medium"
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
