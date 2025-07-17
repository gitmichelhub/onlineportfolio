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
        <p class="mb-6 text-lg leading-relaxed">
          Growing up with the Baltic Sea practically at my doorstep, water and wide-open horizons set an early benchmark for my quality of life. Today, those shorelines have transformed into train tracks and Autobahn lanes between Braunschweig and Stuttgart. Yet the essence remains unchanged: space, movement, and fresh air keep my thinking clear and sharp.
        </p>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">Why Stuttgart Keeps Pulling Me Back</h2>
        <p class="mb-6 text-lg leading-relaxed">
          Most of my teams—and the innovative prototypes we passionately develop—are located around Stuttgart. Being onsite sparks spontaneous conversations, dynamic whiteboard sessions, and boosts team morale. These soft skills have a tangible impact: teams sharing a workspace often outpace their distributed counterparts in problem-solving speed and brainstorming depth.
        </p>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">Finding the Sweet Spot with Remote Work</h2>
        <p class="mb-6 text-lg leading-relaxed">
          However, remote setups still have their moments, especially once the vision-to-task pipeline is crystal clear. Well-prepared backlogs and sharp task definitions allow team members to tap into their peak productivity rhythms. The key? Maintaining rapid feedback loops and clear ownership.
        </p>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">SAFe Trainings: Why Physical Beats Digital</h2>
        <p class="mb-6 text-lg leading-relaxed">
          Yes, I can simulate PI-planning digitally with tools like Miro. But nothing compares to the collective excitement when sticky notes move across an actual program board. In-person trainings keep distractions at bay and drive deeper, more focused discussions.
        </p>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">Espresso Rituals and Productivity</h2>
        <p class="mb-6 text-lg leading-relaxed">
          Every sprint review is punctuated by my espresso ritual (18 grams in, 38 grams out, 27 seconds precisely—yes, details matter). Beyond the caffeine boost, this ritual helps center my focus. Science agrees: moderate coffee consumption enhances alertness and reduces burnout.
        </p>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">Chasing Sunlight for Performance</h2>
        <p class="mb-6 text-lg leading-relaxed">
          I thrive during long, northern summers. Bonus sunlight equates to a tangible lift in serotonin, vitamin D, and productivity. When daylight wanes, I recharge by stepping out for a crisp walk or snowboarding—proving fresh alpine air can reset the mind nearly as effectively as ocean breezes.
        </p>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">The Unexpected Insights of the "Deadlift Index"</h2>
        <p class="mb-6 text-lg leading-relaxed">
          Interestingly, Truflation analysts created an index tracking companies led by weightlifting CEOs—and it surprisingly outperformed segments of the S&P 500. While correlation isn't causation, it definitely aligns with my personal enthusiasm for disciplined strength training.
        </p>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">Putting it all Together</h2>
        <p class="mb-6 text-lg leading-relaxed">
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
          <p class="mb-6 text-lg leading-relaxed">
            Aufgewachsen an der Ostsee verbinde ich meine frühesten Erinnerungen mit salziger Luft und endlosen Horizonten. Heute hat sich die Kulisse verändert—Züge und Autobahnen verbinden meine jetzigen Lebensmittelpunkte Braunschweig und Stuttgart—doch meine Kernphilosophie bleibt unverändert: Freiraum, stetige Bewegung und frischer Wind fördern klares Denken und hohe Energie.
          </p>

          <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">Warum Stuttgart? Weil Teams gemeinsam wachsen</h2>
          <p class="mb-6 text-lg leading-relaxed">
            Der Großteil meiner Beratungsprojekte—und der getarnten Automobilprototypen, die wir verfeinern—konzentriert sich rund um Stuttgart. Der Funke springt vor Ort über: spontane Design-Diskussionen, schnell gefüllte Whiteboards und sichtbare Motivation. Einfach gesagt, Teams, die physischen Raum teilen, übertreffen oft jene, die nur über Bildschirme verbunden sind.
          </p>

          <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">Remote: Essenziell, aber präzise</h2>
          <p class="mb-6 text-lg leading-relaxed">
            Remote-Arbeit entfaltet ihre Stärken, sobald Klarheit herrscht. Präzise definierte Aufgaben und sorgfältig gepflegte Backlogs erlauben Teammitgliedern, asynchron und dennoch reibungslos zu arbeiten. Der Schlüssel dazu: enge Feedback-Schleifen kombiniert mit klarer individueller Verantwortung.
          </p>

          <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">SAFe-Trainings: Die echte Welt gewinnt immer</h2>
          <p class="mb-6 text-lg leading-relaxed">
            Natürlich lässt sich ein PI-Planning digital koordinieren, doch ein physisches Whiteboard und Klebezettel bringen eine ganz eigene Dynamik mit sich. Die gemeinsame Erfahrung direkter Interaktion steigert das Lernen, vertieft Diskussionen und sorgt für hohe Aufmerksamkeit.
          </p>

          <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">Espresso-Pausen, die wirken</h2>
          <p class="mb-6 text-lg leading-relaxed">
            Meine Sprint Reviews sind berühmt für präzise gezogene Espresso-Shots (genau 18 Gramm rein, 38 Gramm raus, exakt 27 Sekunden). Mehr als nur Koffein liefert dieses Ritual geistige Klarheit—zahlreiche Studien bestätigen die Rolle von Kaffee bei der Steigerung der Konzentration und der Vorbeugung von Burnout.
          </p>

          <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">Mehr Leistung durch Sonnenlicht</h2>
          <p class="mb-6 text-lg leading-relaxed">
            Die nordischen Sommer liefern mir reichlich Serotonin und Vitamin D, was meine Produktivität enorm ankurbelt. Wenn der Winter naht, setze ich auf Aktivitäten wie Spaziergänge im Schnee oder Snowboarden—denn frische Bergluft ist fast so belebend wie meine geliebte Meeresbrise.
          </p>

          <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">Krafttraining und Führung: Eine unerwartete Verbindung</h2>
          <p class="mb-6 text-lg leading-relaxed">
            Wusstest du, dass Analysten von Truflation eine Korrelation zwischen krafttrainierenden CEOs und starken Unternehmensergebnissen entdeckt haben? Das ist sicher keine endgültige Kausalität, doch es spiegelt meine persönliche Überzeugung wider, dass disziplinierte Fitnessroutinen leistungsfördernd wirken.
          </p>

          <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">Alles in einem Paket</h2>
          <p class="mb-6 text-lg leading-relaxed">
            Diese Mischung—meine Küstenwurzeln, dynamische Teamumgebungen, effektive Remote-Strategien, sonnenreiche Gewohnheiten, präzise Kaffeerituale und diszipliniertes Krafttraining—bildet das ideale Rezept, das mein Beraterleben produktiv, ausgeglichen und lebendig hält.
          </p>
        `
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/#blog" 
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>{t.back}</span>
        </Link>

        {/* Main Content */}
        <div className="glass rounded-2xl p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
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
            
            <h1 className="text-4xl font-bold text-slate-800 mb-4">{t.title}</h1>
            <p className="text-xl text-slate-600 leading-relaxed">{t.subtitle}</p>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: t.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPost3; 