import React from 'react';
import { useLanguage } from "@/hooks/use-language";
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPost2: React.FC = () => {
  const { language } = useLanguage();
  
  const content = {
    en: {
      title: "Vibe Coding: Riding the Autonomy Slider From Keystrokes to Agents",
      subtitle: "Exploring the evolution of AI-assisted development and the autonomy slider concept that's reshaping how we write code.",
      date: "Jul 15, 2025",
      readTime: "6 min read",
      category: "Development",
      back: "Back to Blog",
      content: `
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          <em class="text-glass-dark/80">"I just vibe-coded this whole menu app in an afternoon."</em> That throw-away tweet from Andrej Karpathy back in February turned into a mini-movement. Developers everywhere started describing their late-night Copilot sessions as <strong class="text-glass-dark">vibing</strong>—letting an LLM fill in most of the blanks while they steer. A few months later, Karpathy formalised the idea in his <strong class="text-glass-dark">Software 3.0</strong> keynote at YC's AI Startup School and introduced a UX pattern he calls the <strong class="text-glass-copper">autonomy slider</strong>.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">1. Where We Came From</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Software history can be plotted as a climb up the abstraction ladder: <strong class="text-glass-dark">binary → assembly → C → Python → English prompts → agents</strong>. Each rung trades mechanical detail for creative leverage. Vibe coding sits on the second-to-last rung: you still supply intent in natural language, but the AI handles the clickety-clack.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">2. Why "Vibe" Resonates</h2>
        <ul class="list-disc list-inside mb-6 text-lg leading-relaxed space-y-2 text-glass-dark/70">
          <li><strong class="text-glass-dark">Flow, not syntax</strong>—You stay in product-thinking mode.</li>
          <li><strong class="text-glass-dark">Fast feedback loops</strong>—Inline completions give sub-second dopamine hits.</li>
          <li><strong class="text-glass-dark">Expandable scope</strong>—Need a refactor? Slide autonomy from "just autocomplete" to "rewrite this whole package for me."</li>
        </ul>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">3. Tools Fueling the Trend</h2>
        <div class="overflow-x-auto mb-6">
          <table class="table-auto border-collapse w-full text-left text-glass-dark/70">
            <thead>
              <tr>
                <th class="border-b border-glass-copper/30 pb-2 pr-4 text-glass-dark">Tool</th>
                <th class="border-b border-glass-copper/30 pb-2 pr-4 text-glass-dark">Sweet Spot</th>
                <th class="border-b border-glass-copper/30 pb-2 pr-4 text-glass-dark">Slider Ceiling</th>
                <th class="border-b border-glass-copper/30 pb-2 text-glass-dark">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border-b border-glass-cream py-2 pr-4 font-semibold text-glass-copper">Cursor</td>
                <td class="border-b border-glass-cream py-2 pr-4">Devs</td>
                <td class="border-b border-glass-cream py-2 pr-4">4<sup>+</sup></td>
                <td class="border-b border-glass-cream py-2">Inline suggestions, multi-file refactors <em>and</em> <strong class="text-glass-dark">background agents</strong> that run tests and propose PRs across the repo.</td>
              </tr>
              <tr>
                <td class="border-b border-glass-cream py-2 pr-4 font-semibold text-glass-copper">Lovable</td>
                <td class="border-b border-glass-cream py-2 pr-4">Makers / PMs</td>
                <td class="border-b border-glass-cream py-2 pr-4">4</td>
                <td class="border-b border-glass-cream py-2">"Build a Shopify clone" → runnable repo in minutes. Lovable is also the fastest growing startup in history.</td>
              </tr>
              <tr>
                <td class="border-b border-glass-cream py-2 pr-4 font-semibold text-glass-copper">GitHub Copilot</td>
                <td class="border-b border-glass-cream py-2 pr-4">Everyday coding</td>
                <td class="border-b border-glass-cream py-2 pr-4">2</td>
                <td class="border-b border-glass-cream py-2">Steady trickle of inline suggestions keeps flow going.</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-semibold text-glass-copper">AWS Kiro (Preview)</td>
                <td class="py-2 pr-4">Enterprise IDE</td>
                <td class="py-2 pr-4">4 – 5</td>
                <td class="py-2">Spec-driven agent that plans, tests, and self-verifies across giant monorepos (no experience yet).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">4. Anatomy of the Autonomy Slider</h2>
        <ol class="list-decimal list-inside mb-6 text-lg leading-relaxed space-y-2 text-glass-dark/70">
          <li><strong class="text-glass-dark">Off</strong>—No AI involved.</li>
          <li><strong class="text-glass-dark">Hints</strong>—Inline autocomplete only (Cursor Tab).</li>
          <li><strong class="text-glass-dark">Macro</strong>—On-demand multi-file edits (Curser command + K).</li>
          <li><strong class="text-glass-dark">Guarded agent</strong>—Proposed diffs, human approval (Cursor command + L).</li>
          <li><strong class="text-glass-dark">Trusted agent</strong>—Applies patch, sends summary (Cursor command + I).</li>
          <li><strong class="text-glass-dark">(Future)Fully autonomous</strong>—Continuous plan → code → test → deploy loop.</li>
        </ol>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">5. Common Pitfalls & Mitigations</h2>
        <div class="overflow-x-auto mb-6">
          <table class="table-auto border-collapse w-full text-left text-glass-dark/70">
            <thead>
              <tr>
                <th class="border-b border-glass-copper/30 pb-2 pr-4 text-glass-dark">Pain Point</th>
                <th class="border-b border-glass-copper/30 pb-2 pr-4 text-glass-dark">Low-Slider Fix (1-3)</th>
                <th class="border-b border-glass-copper/30 pb-2 text-glass-dark">High-Slider Fix (4-5)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border-b border-glass-cream py-2 pr-4 font-semibold text-glass-copper">Hallucinated APIs</td>
                <td class="border-b border-glass-cream py-2 pr-4">IDE type checking</td>
                <td class="border-b border-glass-cream py-2">Agent self-tests & rollback</td>
              </tr>
              <tr>
                <td class="border-b border-glass-cream py-2 pr-4 font-semibold text-glass-copper">Security vulns</td>
                <td class="border-b border-glass-cream py-2 pr-4">Static analysis in CI</td>
                <td class="border-b border-glass-cream py-2">AI fuzzing + policy code</td>
              </tr>
              <tr>
                <td class="border-b border-glass-cream py-2 pr-4 font-semibold text-glass-copper">IP / Licensing drift</td>
                <td class="border-b border-glass-cream py-2 pr-4">Human diff review</td>
                <td class="border-b border-glass-cream py-2">Contract-aware agents, SBOM</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-semibold text-glass-copper">Loss of mental model</td>
                <td class="py-2 pr-4">Local docs / explain-my-code</td>
                <td class="py-2">Chat log of agent decisions</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">6. Where It's Going Next</h2>
        <ul class="list-disc list-inside mb-6 text-lg leading-relaxed space-y-2 text-glass-dark/70">
          <li><strong class="text-glass-dark">Million-token context windows</strong> → agents reason across entire monorepos.</li>
          <li><strong class="text-glass-dark">Org-wide sliders</strong> → CTO sets a default autonomy ceiling, with per-repo overrides.</li>
          <li><strong class="text-glass-dark">DevOps takeover</strong> → Release pipelines become agent territory ("GitHub Actions on steroids").</li>
          <li><strong class="text-glass-dark">Spec-driven everything</strong> → Tools like AWS Kiro start from a business spec, not a code file.</li>
        </ul>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">7. Am I a Vibe Coder? Yes, and no</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          <strong class="text-glass-dark">Side projects</strong> → Absolutely. Fastest way to learn the boundaries of the new tools.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          <strong class="text-glass-dark">Client work</strong> → Start at level 2, add unit tests and only increase autonomy when the risk allows. Due to compliance and security concerns, agents are not yet viable in client projects (and German corporations in general).
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          <strong class="text-glass-dark">Enterprise</strong> → We experiment with different approaches, but for the same reasons as in client projects, more autonomy is still far away.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          My sweet spot (in my private projects) is at <strong class="text-glass-copper">level 3</strong>: The agent proposes a patch, I skim the diff, run tests and merge. This keeps me in flow while saving hours on routine refactorings.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">8. Further Reading</h2>
        <ul class="list-disc list-inside mb-6 text-lg leading-relaxed space-y-2 text-glass-dark/70">
          <li><a href="https://www.youtube.com/watch?v=TODO" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">Karpathy – "Software 3.0" keynote (June 17 2025)</a></li>
          <li><a href="https://www.latent.space/p/agents?utm_source=publication-search" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">Latent Space – Agents </a></li>
          <li><a href="https://www.techradar.com/pro/aws-launches-kiro-an-agentic-ai-ide-to-end-the-chaos-of-vibe-coding" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">TechRadar – "AWS launches Kiro to tame vibe coding chaos"</a></li>
        </ul>
      `
    },
    de: {
      title: "Vibe Coding: Auf dem Autonomy Slider",
      subtitle: "Die Evolution KI-gestützter Entwicklung und das Autonomy Slider Konzept, das mein Verhältnis zu Code verändert.",
      date: "15. Jul 2025",
      readTime: "6 Min. Lesezeit",
      category: "Entwicklung",
      back: "Zurück zum Blog",
      content: `
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          <em class="text-glass-dark/80">„I just vibe-coded this whole menu app in an afternoon."</em> Als ich diesen Tweet von Andrej Karpathy im Februar sah, wusste ich noch nicht, dass eine ganze AI Bewegung danach benannt werden würde. Entwickler:innen auf der ganzen Welt begannen, ihre nächtlichen Copilot‑Sessions als <strong class="text-glass-dark">Vibing</strong> zu bezeichnen – sie lassen ein LLM die meisten Lücken füllen, während sie nur noch die Richtung vorgeben. Wenige Monate später konkretisierte Karpathy das Konzept in seiner <strong class="text-glass-dark">Software 3.0</strong>‑Keynote auf der YC AI Startup School und stellte das UX‑Muster des <strong class="text-glass-copper">Autonomie‑Schiebereglers</strong> vor.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">1. Woher wir kommen</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Die Geschichte der Software lässt sich als Aufstieg auf der Abstraktionsleiter darstellen: <strong class="text-glass-dark">Binär → Assembler → C → Python → englische Prompts → Agenten</strong>. Jede Stufe tauscht mechanische Details gegen kreative Hebelwirkung ein. Vibe Coding befindet sich auf der vorletzten Stufe: Du gibst deine Absicht in natürlicher Sprache an, das KI‑System erledigt das Tippen.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">7. Bin ich ein Vibe Coder? Ja, und nein</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70"><strong class="text-glass-dark">Nebenprojekte</strong> → Unbedingt. Schnellster Weg, die Grenzen der neuen Tools kennenzulernen.</p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70"><strong class="text-glass-dark">Kundenprojekte</strong> → Starte auf Stufe 2, ergänze Unit‑Tests und steigere die Autonomie nur, wenn es das Risiko erlaubt.</p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Mein Sweet Spot liegt (in meinen privaten Projekten) bei <strong class="text-glass-copper">Level 3</strong>: Der Agent schlägt einen Patch vor, ich überfliege den Diff, führe Tests aus und merge.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Interessante Links</h2>
        <ul class="list-disc list-inside mb-6 text-lg leading-relaxed space-y-2 text-glass-dark/70">
          <li><a href="https://www.youtube.com/watch?v=TODO" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">Karpathy – »Software 3.0«‑Keynote (17. Juni 2025)</a></li>
          <li><a href="https://www.latent.space/p/agents?utm_source=publication-search" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">Latent Space – Agents</a></li>
          <li><a href="https://www.techradar.com/pro/aws-launches-kiro-an-agentic-ai-ide-to-end-the-chaos-of-vibe-coding" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">TechRadar – „AWS veröffentlicht Kiro"</a></li>
        </ul>
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

export default BlogPost2; 
