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
        <p class="mb-6 text-lg leading-relaxed">
          <em>"I just vibe-coded this whole menu app in an afternoon."</em> That throw-away tweet from Andrej Karpathy back in February turned into a mini-movement. Developers everywhere started describing their late-night Copilot sessions as <strong>vibing</strong>—letting an LLM fill in most of the blanks while they steer. A few months later, Karpathy formalised the idea in his <strong>Software 3.0</strong> keynote at YC's AI Startup School and introduced a UX pattern he calls the <strong>autonomy slider</strong>.
        </p>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">1. Where We Came From</h2>
        <p class="mb-6 text-lg leading-relaxed">
          Software history can be plotted as a climb up the abstraction ladder: <strong>binary → assembly → C → Python → English prompts → agents</strong>. Each rung trades mechanical detail for creative leverage. Vibe coding sits on the second-to-last rung: you still supply intent in natural language, but the AI handles the clickety-clack.
        </p>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">2. Why "Vibe" Resonates</h2>
        <ul class="list-disc list-inside mb-6 text-lg leading-relaxed space-y-2">
          <li><strong>Flow, not syntax</strong>—You stay in product-thinking mode.</li>
          <li><strong>Fast feedback loops</strong>—Inline completions give sub-second dopamine hits.</li>
          <li><strong>Expandable scope</strong>—Need a refactor? Slide autonomy from "just autocomplete" to "rewrite this whole package for me."</li>
        </ul>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">3. Tools Fueling the Trend</h2>
        <div class="overflow-x-auto mb-6">
          <table class="table-auto border-collapse w-full text-left">
            <thead>
              <tr>
                <th class="border-b pb-2 pr-4">Tool</th>
                <th class="border-b pb-2 pr-4">Sweet Spot</th>
                <th class="border-b pb-2 pr-4">Slider Ceiling</th>
                <th class="border-b pb-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border-b py-2 pr-4 font-semibold">Cursor</td>
                <td class="border-b py-2 pr-4">Pro devs</td>
                <td class="border-b py-2 pr-4">3<sup>+</sup></td>
                <td class="border-b py-2">Inline suggestions, multi-file refactors <em>and</em> <strong>background agents</strong> that run tests and propose PRs across the repo.</td>
              </tr>
              <tr>
                <td class="border-b py-2 pr-4 font-semibold">Lovable</td>
                <td class="border-b py-2 pr-4">Makers / PMs</td>
                <td class="border-b py-2 pr-4">4</td>
                <td class="border-b py-2">"Build me a Shopify clone" → runnable repo in minutes.</td>
              </tr>
              <tr>
                <td class="border-b py-2 pr-4 font-semibold">GitHub Copilot</td>
                <td class="border-b py-2 pr-4">Everyday coding</td>
                <td class="border-b py-2 pr-4">2</td>
                <td class="border-b py-2">Steady trickle of inline suggestions keeps flow going.</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-semibold">AWS Kiro (Preview)</td>
                <td class="py-2 pr-4">Enterprise IDE</td>
                <td class="py-2 pr-4">4 – 5</td>
                <td class="py-2">Spec-driven agent that plans, tests, and self-verifies across giant monorepos.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">4. Anatomy of the Autonomy Slider</h2>
        <ol class="list-decimal list-inside mb-6 text-lg leading-relaxed space-y-2">
          <li><strong>Off</strong>—No AI involved.</li>
          <li><strong>Hints</strong>—Inline autocomplete only.</li>
          <li><strong>Macro</strong>—On-demand multi-file edits.</li>
          <li><strong>Guarded agent</strong>—Proposed diffs, human approval.</li>
          <li><strong>Trusted agent</strong>—Applies patch, sends summary.</li>
          <li><strong>Fully autonomous</strong>—Continuous plan → code → test → deploy loop.</li>
        </ol>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">5. Common Pitfalls & Mitigations</h2>
        <div class="overflow-x-auto mb-6">
          <table class="table-auto border-collapse w-full text-left">
            <thead>
              <tr>
                <th class="border-b pb-2 pr-4">Pain Point</th>
                <th class="border-b pb-2 pr-4">Low-Slider Fix (1-3)</th>
                <th class="border-b pb-2">High-Slider Fix (4-5)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border-b py-2 pr-4 font-semibold">Hallucinated APIs</td>
                <td class="border-b py-2 pr-4">IDE type checking</td>
                <td class="border-b py-2">Agent self-tests & rollback</td>
              </tr>
              <tr>
                <td class="border-b py-2 pr-4 font-semibold">Security vulns</td>
                <td class="border-b py-2 pr-4">Static analysis in CI</td>
                <td class="border-b py-2">AI fuzzing + policy code</td>
              </tr>
              <tr>
                <td class="border-b py-2 pr-4 font-semibold">IP / Licensing drift</td>
                <td class="border-b py-2 pr-4">Human diff review</td>
                <td class="border-b py-2">Contract-aware agents, SBOM</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-semibold">Loss of mental model</td>
                <td class="py-2 pr-4">Local docs / explain-my-code</td>
                <td class="py-2">Chat log of agent decisions</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">6. Where It's Going Next</h2>
        <ul class="list-disc list-inside mb-6 text-lg leading-relaxed space-y-2">
          <li><strong>Million-token context windows</strong> → agents reason across entire monorepos.</li>
          <li><strong>Org-wide sliders</strong> → CTO sets a default autonomy ceiling, with per-repo overrides.</li>
          <li><strong>DevOps takeover</strong> → Release pipelines become agent territory ("GitHub Actions on steroids").</li>
          <li><strong>Spec-driven everything</strong> → Tools like AWS Kiro start from a business spec, not a code file.</li>
        </ul>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">7. Should You Ride the Vibes?</h2>
        <p class="mb-6 text-lg leading-relaxed">
          <strong>Side projects</strong> → absolutely. It's the fastest way to learn what the new tools can (and cannot) do.
        </p>
        <p class="mb-6 text-lg leading-relaxed">
          <strong>Client work</strong> → start at slider 2, layer on unit tests, and move up only when the risk budget allows.
        </p>
        <p class="mb-6 text-lg leading-relaxed">
          <strong>Enterprise</strong> → prototype with Kiro-style agents in a sandbox before touching prod.
        </p>
        <p class="mb-6 text-lg leading-relaxed">
          I've found the sweet spot at <strong>level 3</strong>: let the agent propose a patch, skim the diff, run tests, merge. That keeps me in the strategic head-space while shaving hours off routine refactors.
        </p>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">8. Further Reading</h2>
        <ul class="list-disc list-inside mb-6 text-lg leading-relaxed space-y-2">
          <li><a href="https://www.youtube.com/watch?v=TODO" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:text-indigo-700 underline">Karpathy – "Software 3.0" keynote (June 17 2025)</a></li>
          <li><a href="https://www.latent.space/p/agents?utm_source=publication-search" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:text-indigo-700 underline">Latent Space – Agents </a></li>
          <li><a href="https://www.techradar.com/pro/aws-launches-kiro-an-agentic-ai-ide-to-end-the-chaos-of-vibe-coding" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:text-indigo-700 underline">TechRadar – "AWS launches Kiro to tame vibe coding chaos"</a></li>
        </ul>
      `
    },
    de: {
      title: "Vibe Coding: Auf dem Autonomy Slider von Tastatureingaben zu Agenten",
      subtitle: "Die Evolution KI-gestützter Entwicklung und das Autonomy Slider Konzept, das die Art, wie wir Code schreiben, verändert.",
      date: "15. Jul 2025",
      readTime: "6 Min. Lesezeit",
      category: "Entwicklung",
      back: "Zurück zum Blog",
      content: `
        <p class="mb-6 text-lg leading-relaxed">
          <em>„Ich habe diese ganze Menü‑App an einem Nachmittag im Vibe‑Coding‑Stil programmiert."</em> Als ich diesen Tweet von Andrej Karpathy im Februar sah, wusste ich noch nicht, dass eine ganze AI Bewegung danach benannt werden würde. Entwickler:innen auf der ganzen Welt begannen, ihre nächtlichen Copilot‑Sessions als <strong>Vibing</strong> zu bezeichnen – sie lassen ein LLM die meisten Lücken füllen, während sie nur noch die Richtung vorgeben. Wenige Monate später konkretisierte Karpathy das Konzept in seiner <strong>Software 3.0</strong>‑Keynote auf der YC AI Startup School und stellte das UX‑Muster des <strong>Autonomie‑Schiebereglers</strong> vor.
        </p>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">1. Woher wir kommen</h2>
        <p class="mb-6 text-lg leading-relaxed">
          Die Geschichte der Software lässt sich als Aufstieg auf der Abstraktionsleiter darstellen: <strong>Binär → Assembler → C → Python → englische Prompts → Agenten</strong>. Jede Stufe tauscht mechanische Details gegen kreative Hebelwirkung ein. Vibe Coding befindet sich auf der vorletzten Stufe: Du gibst deine Absicht in natürlicher Sprache an, das KI‑System erledigt das Tippen.
        </p>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">2. Warum „Vibe" so gut ankommt</h2>
        <ul class="list-disc list-inside mb-6 text-lg leading-relaxed space-y-2">
          <li><strong>Flow statt Syntax</strong> – Du bleibst im Produkt‑Thinking, das Modell kümmert sich um Klammern & Semikolons.</li>
          <li><strong>Schnelle Feedback‑Loops</strong> – Inline‑Vervollständigungen geben Dopamin‑Hits im Millisekundenbereich.</li>
          <li><strong>Skalierbarer Umfang</strong> – Brauchst du ein Refactoring? Schiebe die Autonomie von „nur Autocomplete" auf „schreibe mir dieses komplette Paket um".</li>
        </ul>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">3. Werkzeuge, die den Trend befeuern</h2>
        <div class="overflow-x-auto mb-6">
          <table class="table-auto border-collapse w-full text-left">
            <thead>
              <tr>
                <th class="border-b pb-2 pr-4">Werkzeug</th>
                <th class="border-b pb-2 pr-4">Sweet Spot</th>
                <th class="border-b pb-2 pr-4">Slider‑Höchststufe</th>
                <th class="border-b pb-2">Hinweise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border-b py-2 pr-4 font-semibold">Cursor</td>
                <td class="border-b py-2 pr-4">Pro‑Devs</td>
                <td class="border-b py-2 pr-4">3<sup>+</sup></td>
                <td class="border-b py-2">Inline‑Vorschläge, Refactorings über mehrere Dateien und <strong>Hintergrund‑Agenten</strong>, die Tests ausführen und Pull‑Requests im gesamten Repository vorschlagen. Ein integrierter Autonomie‑Schieberegler mit mehreren Ebenen erlaubt das Umschalten zwischen schnellen Hinweisen und vollständigen Projekt‑Rewrites.</td>
              </tr>
              <tr>
                <td class="border-b py-2 pr-4 font-semibold">Lovable</td>
                <td class="border-b py-2 pr-4">Maker / PMs</td>
                <td class="border-b py-2 pr-4">4</td>
                <td class="border-b py-2">„Erstelle mir einen Shopify‑Klon" → lauffähiges Repo in wenigen Minuten.</td>
              </tr>
              <tr>
                <td class="border-b py-2 pr-4 font-semibold">GitHub Copilot</td>
                <td class="border-b py-2 pr-4">Alltägliches Coding</td>
                <td class="border-b py-2 pr-4">2</td>
                <td class="border-b py-2">Konstantes Rinnsal an Inline‑Vorschlägen hält den Flow am Laufen.</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-semibold">AWS Kiro (Vorschau)</td>
                <td class="py-2 pr-4">Enterprise‑IDE</td>
                <td class="py-2 pr-4">4 – 5</td>
                <td class="py-2">Spezifikationsgetriebener Agent, der plant, testet und sich selbst verifiziert in riesigen Monorepos.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">4. Anatomie des Autonomie‑Schiebereglers</h2>
        <ol class="list-decimal list-inside mb-6 text-lg leading-relaxed space-y-2">
          <li><strong>Aus</strong> – Keine KI beteiligt.</li>
          <li><strong>Hinweise</strong> – Nur Inline‑Autocomplete.</li>
          <li><strong>Makro</strong> – Auf Abruf mehrere Dateien ändern.</li>
          <li><strong>Bewachter Agent</strong> – Schlägt Diffs vor, Mensch bestätigt.</li>
          <li><strong>Vertrauenswürdiger Agent</strong> – Wendet Patch an, schickt Zusammenfassung.</li>
          <li><strong>Vollständig autonom</strong> – Kontinuierliche Schleife: planen → coden → testen → deployen.</li>
        </ol>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">5. Häufige Stolperfallen & Gegenmaßnahmen</h2>
        <div class="overflow-x-auto mb-6">
          <table class="table-auto border-collapse w-full text-left">
            <thead>
              <tr>
                <th class="border-b pb-2 pr-4">Problemfeld</th>
                <th class="border-b pb-2 pr-4">Lösung bei niedriger Stufe (1–3)</th>
                <th class="border-b pb-2">Lösung bei hoher Stufe (4–5)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border-b py-2 pr-4 font-semibold">Halluzinierte APIs</td>
                <td class="border-b py-2 pr-4">IDE‑Typprüfung</td>
                <td class="border-b py-2">Agenten‑Selbsttests & Rollback</td>
              </tr>
              <tr>
                <td class="border-b py-2 pr-4 font-semibold">Sicherheitslücken</td>
                <td class="border-b py-2 pr-4">Static Analysis im CI</td>
                <td class="border-b py-2">KI‑Fuzzing + Policy‑Code</td>
              </tr>
              <tr>
                <td class="border-b py-2 pr-4 font-semibold">IP‑/Lizenz‑Drift</td>
                <td class="border-b py-2 pr-4">Manuelle Diff‑Review</td>
                <td class="border-b py-2">Vertragsbewusste Agenten, SBOM</td>
              </tr>
              <tr>
                <td class="py-2 pr-4 font-semibold">Verlust des Mental Models</td>
                <td class="py-2 pr-4">Lokale Doku / „Erkläre meinen Code"</td>
                <td class="py-2">Chat‑Log der Agenten‑Entscheidungen</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">6. Wohin die Reise geht</h2>
        <ul class="list-disc list-inside mb-6 text-lg leading-relaxed space-y-2">
          <li><strong>Kontextfenster mit Millionen Tokens</strong> → Agenten überschauen ganze Monorepos.</li>
          <li><strong>Org‑weite Slider</strong> → CTOs setzen ein Autonomie‑Limit, mit Repo‑Ausnahmen.</li>
          <li><strong>DevOps‑Übernahme</strong> → Release‑Pipelines werden Agenten‑Territorium ("GitHub Actions on Steroids").</li>
          <li><strong>Spezifikationsgetriebene Entwicklung</strong> → Tools wie AWS Kiro starten beim Business‑Spec, nicht bei der Code‑Datei.</li>
        </ul>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">7. Solltest du den Vibes folgen?</h2>
        <p class="mb-6 text-lg leading-relaxed"><strong>Nebenprojekte</strong> → Unbedingt. Schnellster Weg, die Grenzen der neuen Tools kennenzulernen.</p>
        <p class="mb-6 text-lg leading-relaxed"><strong>Kundenprojekte</strong> → Starte auf Stufe 2, ergänze Unit‑Tests und steigere die Autonomie nur, wenn es das Risiko erlaubt.</p>
        <p class="mb-6 text-lg leading-relaxed"><strong>Unternehmen</strong> → Erst in einer Sandbox mit Kiro‑ähnlichen Agenten prototypisieren, bevor es Richtung Produktion geht.</p>
        <p class="mb-6 text-lg leading-relaxed">
          Mein Sweet Spot liegt bei <strong>Level 3</strong>: Der Agent schlägt einen Patch vor, ich überfliege den Diff, führe Tests aus und merge. So bleibe ich im strategischen Kopfmodus und spare Stunden bei Routine‑Refactorings.
        </p>

        <h2 class="text-2xl font-semibold text-slate-800 mb-4 mt-8">8. Weiterführende Links</h2>
        <ul class="list-disc list-inside mb-6 text-lg leading-relaxed space-y-2">
          <li><a href="https://www.youtube.com/watch?v=TODO" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:text-indigo-700 underline">Karpathy – »Software 3.0«‑Keynote (17. Juni 2025)</a></li>
          <li><a href="https://www.latent.space/p/agents?utm_source=publication-search" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:text-indigo-700 underline">Latent Space – Agents</a></li>
          <li><a href="https://www.techradar.com/pro/aws-launches-kiro-an-agentic-ai-ide-to-end-the-chaos-of-vibe-coding" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:text-indigo-700 underline">TechRadar – „AWS veröffentlicht Kiro, um das Vibe‑Coding‑Chaos zu bändigen"</a></li>
        </ul>
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

export default BlogPost2; 