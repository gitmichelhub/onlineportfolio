import React from 'react';
import { useLanguage } from "@/hooks/use-language";
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArticleBackdrop from '@/components/ArticleBackdrop';
import { BLOG_POST_2_CONTENT } from '@/content/blog-post2-content';
import { usePageMeta } from '@/hooks/use-page-meta';

const BlogPost2: React.FC = () => {
  const { language } = useLanguage();
  
  const t = BLOG_POST_2_CONTENT[language];

  usePageMeta(`${t.title} — Michel Werner`, t.subtitle);

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-glass-light via-white to-glass-cream py-20 px-4">
      <ArticleBackdrop />
      <div className="max-w-4xl mx-auto relative">
        {/* Back Button */}
        <Link 
          to="/#blog" 
          className="glass liquid-glass-soft rounded-full inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-glass-dark/80 hover:text-glass-copper transition-all duration-200 hover:scale-105 mb-8"
        >
          <ArrowLeft size={20} />
          <span>{t.back}</span>
        </Link>

        {/* Main Content */}
        <div className="glass glass-content rounded-content p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-glass-muted mb-4">
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{t.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{t.readTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Tag size={14} />
                <span>{t.category}</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-glass-dark mb-4 font-playfair">{t.title}</h1>
            <p className="text-xl text-glass-muted leading-relaxed">{t.subtitle}</p>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: t.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPost2; 
