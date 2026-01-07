import React from 'react';
import { useLanguage } from "@/hooks/use-language";
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPost3: React.FC = () => {
  const { language } = useLanguage();
  
  const content = {
    en: {
      title: "Flow & Focus: How Coastal Origins and Team Dynamics Shape My Consulting Path",
      subtitle: "How coastal upbringing, collaborative energy, and disciplined routines create the foundation for professional success and personal well-being.",
      date: "Jul 17, 2025",
      readTime: "2 min read",
      category: "Leadership",
      back: "Back to Blog",
      content: `
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Growing up with the Baltic Sea practically at my doorstep, water and wide-open horizons set an early benchmark for my quality of life. Today, those shorelines have transformed into train tracks and Autobahn lanes between Braunschweig and Stuttgart. Yet the essence remains unchanged: space, movement, and fresh air keep my thinking clear and sharp.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Why Stuttgart Keeps Pulling Me Back</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Most of my teams—and the innovative prototypes we passionately develop—are located around Stuttgart. Being onsite sparks spontaneous conversations, dynamic whiteboard sessions, and boosts team morale.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Finding the Sweet Spot with Remote Work</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          However, remote setups still have their moments, especially once the vision-to-task pipeline is crystal clear. Well-prepared backlogs and sharp task definitions allow team members to tap into their peak productivity rhythms.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Espresso Rituals and Productivity</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Every sprint review is punctuated by my espresso ritual (18 grams in, 38 grams out, 27 seconds precisely—yes, details matter). Beyond the caffeine boost, this ritual helps center my focus.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Putting it all Together</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Combining a coastal upbringing, collaborative onsite energy, structured remote workflows, sunlight therapy, meticulous espresso rituals, and disciplined workouts forms the foundation that keeps my professional life balanced and thriving.
        </p>
      `
    },
    de: {
      title: "Zwischen Küste und Kollaboration: Wie Meer und Teamgeist meinen beruflichen Weg prägen",
      subtitle: "Wie eine Küstenkindheit, kollaborative Energie und disziplinierte Routinen die Grundlage für beruflichen Erfolg und persönliches Wohlbefinden schaffen.",
      date: "17. Jul 2025",
      readTime: "2 Min. Lesezeit",
      category: "Leadership",
      back: "Zurück zum Blog",
      content: `
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Aufgewachsen an der Ostsee verbinde ich meine frühesten Erinnerungen mit salziger Luft und endlosen Horizonten. Heute hat sich die Kulisse verändert—Züge und Autobahnen verbinden meine jetzigen Lebensmittelpunkte Braunschweig und Stuttgart.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Warum Stuttgart? Weil Teams gemeinsam wachsen</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Der Großteil meiner Beratungsprojekte konzentriert sich rund um Stuttgart. Der Funke springt vor Ort über: spontane Design-Diskussionen, schnell gefüllte Whiteboards und sichtbare Motivation.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Alles in einem Paket</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Diese Mischung—meine Küstenwurzeln, dynamische Teamumgebungen, effektive Remote-Strategien, sonnenreiche Gewohnheiten, präzise Kaffeerituale und diszipliniertes Krafttraining—bildet das ideale Rezept.
        </p>
      `
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-glass-light via-white to-glass-cream py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/#blog" 
          className="inline-flex items-center space-x-2 text-glass-muted hover:text-glass-copper transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>{t.back}</span>
        </Link>

        {/* Main Content */}
        <div className="glass rounded-2xl p-8">
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

export default BlogPost3;
