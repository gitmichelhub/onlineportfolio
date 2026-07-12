import React from 'react';
import { useLanguage } from "@/hooks/use-language";
import { usePageMeta } from "@/hooks/use-page-meta";
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPost4: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Your Second Brain Is a Folder of Markdown: Karpathy's LLM Wiki and Garry Tan's gstack",
      subtitle: "The two most influential dev 'products' of 2026 so far are a gist and a folder of prompts. Both are plain markdown — and that is exactly the point.",
      date: "Jul 3, 2026",
      readTime: "5 min read",
      category: "AI Tooling",
      back: "Back to Blog",
      content: `
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Look at what actually changed how developers work this year, and you won't find a new IDE or a new framework. You'll find a <a href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">GitHub gist</a> by Andrej Karpathy and a <a href="https://github.com/garrytan/gstack" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">repo of 23 prompt files</a> from Garry Tan. No binaries, no SaaS, no vector database. Just markdown files that tell an agent how to behave. That's not a coincidence — it's the shape of the new abstraction layer.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Karpathy's LLM Wiki: knowledge that compounds</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          In April, Karpathy published his personal knowledge-base pattern, and the design is almost aggressively simple. Three layers: <code class="bg-glass-cream px-2 py-1 rounded text-sm text-glass-copper border border-glass-copper/20">raw/</code> holds your immutable sources (articles, PDFs, transcripts), <code class="bg-glass-cream px-2 py-1 rounded text-sm text-glass-copper border border-glass-copper/20">wiki/</code> holds interlinked markdown pages the LLM writes and maintains, and a <code class="bg-glass-cream px-2 py-1 rounded text-sm text-glass-copper border border-glass-copper/20">CLAUDE.md</code> defines the schema and conventions. Three operations: <strong class="text-glass-dark">ingest</strong> new sources, <strong class="text-glass-dark">query</strong> with citations, and <strong class="text-glass-dark">lint</strong> for contradictions and stale pages.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          The line that stuck with me: <em>"You never (or rarely) write the wiki yourself — the LLM writes and maintains all of it."</em> That's the inversion. Classic RAG re-derives understanding from raw documents on every single query and throws it away afterwards. The LLM wiki keeps the understanding: every ingest updates entity pages, cross-references, and an index, so the knowledge base gets <strong class="text-glass-dark">better</strong> the more you feed it. It's the difference between hiring a researcher with amnesia and hiring one who keeps notes.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          The tooling is deliberately boring: Claude Code as the maintainer, Obsidian as the viewer, git for history, and a local search tool when the wiki outgrows the context window. Everything is a file. Everything diffs.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">gstack: a startup team in 23 markdown files</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Garry Tan's <a href="https://www.ycombinator.com/library/OW-inside-garry-tan-s-ai-coding-setup" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">gstack</a> attacks a different problem with the same material. It packages his personal Claude Code setup as 23 opinionated skills that role-play an entire startup: a CEO who challenges your scope in <code class="bg-glass-cream px-2 py-1 rounded text-sm text-glass-copper border border-glass-copper/20">/plan-ceo-review</code>, an engineering manager who audits architecture, a designer, a QA lead who drives a real browser, a security officer running OWASP and STRIDE checks, and a release engineer who ships. Tan's own numbers: roughly 10,000 lines of code and 100 pull requests a week over a 50-day stretch — and the repo collected tens of thousands of GitHub stars within weeks of open-sourcing.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          His framing is the honest one: <em>"The point isn't who typed it, it's what shipped."</em> You can quibble with lines-of-code metrics (Tan himself normalizes them), but the structural claim stands — <strong class="text-glass-dark">opinionated prompts, not custom tooling, are becoming the right abstraction layer</strong> for AI-assisted development. A skill file is a job description that executes.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">The common thread: prose is the new config</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Put the two side by side and the pattern is obvious. Karpathy encodes <strong class="text-glass-dark">what a team knows</strong> in markdown; Tan encodes <strong class="text-glass-dark">how a team works</strong> in markdown. Both bet on the same properties: plain text is model-agnostic, versionable, reviewable in a pull request, and readable by the intern and the agent alike. The moat isn't the format — it's the curation. A wiki is only as good as its lint discipline, and a skill library is only as good as the opinions baked into it.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          I run a scaled-down version of both patterns on this very website: the repo has a memory directory of markdown facts the agent maintains across sessions, and project-specific skills for things like the liquid-glass UI you're looking at. It's unreasonably effective for a one-person project — which tells you something about what it does for a 300-person one.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">What I tell clients</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          If you lead an engineering organization, the takeaway is not "install gstack." It's that your team's tribal knowledge and your team's working agreements are about to become <strong class="text-glass-dark">executable assets</strong> — or liabilities, if they only live in people's heads and in slide decks nobody opens. Start embarrassingly small: one <code class="bg-glass-cream px-2 py-1 rounded text-sm text-glass-copper border border-glass-copper/20">CLAUDE.md</code> per repo, three skills for your most repetitive review rituals, one shared wiki folder with an ingest routine. Then let it compound. The teams I see winning with agents aren't the ones with the biggest budgets — they're the ones whose knowledge was already written down.
        </p>
      `
    },
    de: {
      title: "Dein zweites Gehirn ist ein Ordner voller Markdown: Karpathys LLM-Wiki und Garry Tans gstack",
      subtitle: "Die zwei einflussreichsten Entwickler-'Produkte' des Jahres 2026 sind ein Gist und ein Ordner voller Prompts. Beide sind reines Markdown — und genau das ist der Punkt.",
      date: "3. Jul 2026",
      readTime: "5 Min. Lesezeit",
      category: "AI Tooling",
      back: "Zurück zum Blog",
      content: `
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Wer sich anschaut, was die Arbeitsweise von Entwicklern dieses Jahr wirklich verändert hat, findet keine neue IDE und kein neues Framework. Sondern einen <a href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">GitHub-Gist</a> von Andrej Karpathy und ein <a href="https://github.com/garrytan/gstack" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">Repo mit 23 Prompt-Dateien</a> von Garry Tan. Keine Binaries, kein SaaS, keine Vektordatenbank. Nur Markdown-Dateien, die einem Agenten sagen, wie er sich verhalten soll. Das ist kein Zufall — das ist die Form der neuen Abstraktionsschicht.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Karpathys LLM-Wiki: Wissen, das sich verzinst</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Im April hat Karpathy sein persönliches Knowledge-Base-Muster veröffentlicht, und das Design ist fast schon aggressiv einfach. Drei Ebenen: <code class="bg-glass-cream px-2 py-1 rounded text-sm text-glass-copper border border-glass-copper/20">raw/</code> enthält die unveränderlichen Quellen (Artikel, PDFs, Transkripte), <code class="bg-glass-cream px-2 py-1 rounded text-sm text-glass-copper border border-glass-copper/20">wiki/</code> enthält verlinkte Markdown-Seiten, die das LLM schreibt und pflegt, und eine <code class="bg-glass-cream px-2 py-1 rounded text-sm text-glass-copper border border-glass-copper/20">CLAUDE.md</code> definiert Schema und Konventionen. Drei Operationen: <strong class="text-glass-dark">Ingest</strong> neuer Quellen, <strong class="text-glass-dark">Query</strong> mit Zitaten und <strong class="text-glass-dark">Lint</strong> gegen Widersprüche und veraltete Seiten.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Der Satz, der hängen bleibt: <em>„Du schreibst das Wiki nie (oder selten) selbst — das LLM schreibt und pflegt alles."</em> Das ist die Umkehrung. Klassisches RAG leitet das Verständnis bei jeder einzelnen Anfrage neu aus Rohdokumenten ab und wirft es danach weg. Das LLM-Wiki behält das Verständnis: Jeder Ingest aktualisiert Entitätsseiten, Querverweise und einen Index — die Wissensbasis wird <strong class="text-glass-dark">besser</strong>, je mehr man sie füttert. Es ist der Unterschied zwischen einem Rechercheur mit Amnesie und einem, der Notizen führt.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Das Tooling ist bewusst langweilig: Claude Code als Maintainer, Obsidian als Viewer, Git für die Historie und lokale Suche, wenn das Wiki aus dem Kontextfenster herauswächst. Alles ist eine Datei. Alles lässt sich diffen.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">gstack: ein Startup-Team in 23 Markdown-Dateien</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Garry Tans <a href="https://www.ycombinator.com/library/OW-inside-garry-tan-s-ai-coding-setup" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">gstack</a> löst mit demselben Material ein anderes Problem. Es verpackt sein persönliches Claude-Code-Setup als 23 meinungsstarke Skills, die ein ganzes Startup nachspielen: ein CEO, der in <code class="bg-glass-cream px-2 py-1 rounded text-sm text-glass-copper border border-glass-copper/20">/plan-ceo-review</code> den Scope infrage stellt, ein Engineering Manager für Architektur-Audits, ein Designer, ein QA-Lead, der einen echten Browser steuert, ein Security Officer mit OWASP- und STRIDE-Checks und ein Release Engineer, der ausliefert. Tans eigene Zahlen: rund 10.000 Zeilen Code und 100 Pull Requests pro Woche über 50 Tage — und das Repo sammelte innerhalb weniger Wochen Zehntausende GitHub-Sterne.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Sein Framing ist das ehrliche: <em>„Es geht nicht darum, wer es getippt hat, sondern was ausgeliefert wurde."</em> Über Lines-of-Code-Metriken kann man streiten (Tan normalisiert sie selbst), aber die strukturelle These steht — <strong class="text-glass-dark">meinungsstarke Prompts, nicht Custom-Tooling, werden zur richtigen Abstraktionsschicht</strong> für KI-gestützte Entwicklung. Eine Skill-Datei ist eine Stellenbeschreibung, die ausführbar ist.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Der gemeinsame Nenner: Prosa ist die neue Config</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Legt man beides nebeneinander, ist das Muster offensichtlich. Karpathy kodiert in Markdown, <strong class="text-glass-dark">was ein Team weiß</strong>; Tan kodiert in Markdown, <strong class="text-glass-dark">wie ein Team arbeitet</strong>. Beide setzen auf dieselben Eigenschaften: Klartext ist modellunabhängig, versionierbar, im Pull Request reviewbar und für Praktikanten wie Agenten gleichermaßen lesbar. Der Burggraben ist nicht das Format — es ist die Kuratierung. Ein Wiki ist nur so gut wie seine Lint-Disziplin, eine Skill-Bibliothek nur so gut wie die Meinungen, die darin stecken.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Eine verkleinerte Version beider Muster läuft auf genau dieser Website: Das Repo hat ein Memory-Verzeichnis mit Markdown-Fakten, die der Agent über Sessions hinweg pflegt, und projektspezifische Skills — etwa für das Liquid-Glass-UI, das du gerade ansiehst. Für ein Ein-Personen-Projekt ist das unverhältnismäßig effektiv — was einiges darüber aussagt, was es für ein 300-Personen-Projekt bedeutet.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Was ich Kunden sage</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/70">
          Wer eine Engineering-Organisation führt, sollte nicht „gstack installieren" mitnehmen. Sondern: Das Stammeswissen und die Arbeitsvereinbarungen eures Teams werden gerade zu <strong class="text-glass-dark">ausführbaren Assets</strong> — oder zu Altlasten, wenn sie nur in Köpfen und in Foliensätzen leben, die niemand öffnet. Fangt beschämend klein an: eine <code class="bg-glass-cream px-2 py-1 rounded text-sm text-glass-copper border border-glass-copper/20">CLAUDE.md</code> pro Repo, drei Skills für die repetitivsten Review-Rituale, ein gemeinsamer Wiki-Ordner mit Ingest-Routine. Und dann: verzinsen lassen. Die Teams, die ich mit Agenten gewinnen sehe, sind nicht die mit den größten Budgets — es sind die, deren Wissen schon aufgeschrieben war.
        </p>
      `
    }
  };

  const t = content[language];

  usePageMeta(`${t.title} — Michel Werner`, t.subtitle);

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
        <div className="glass liquid-glass rounded-2xl p-8">
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

export default BlogPost4;
