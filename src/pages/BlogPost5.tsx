import React from 'react';
import { useLanguage } from "@/hooks/use-language";
import { usePageMeta } from "@/hooks/use-page-meta";
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArticleBackdrop from '@/components/ArticleBackdrop';
import SubpageHeader from '@/components/SubpageHeader';

// Horizontal bar chart of self-reported agent adoption inside the labs.
// Inline SVG so it inherits the site fonts and needs no chart library.
const adoptionChart = (labels: {
  heading: string;
  baseline: string;
  employees: string;
  engineers: string;
  companyWide: string;
  anthropic: string;
  caption: string;
}, formatPct: (v: string) => string) => `
  <figure class="my-10">
    <div class="rounded-content border border-glass-copper/25 bg-white/70 p-6">
      <p class="text-sm font-semibold text-glass-dark mb-4">${labels.heading}</p>
      <svg viewBox="0 0 640 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${labels.heading}" style="width:100%;height:auto;font-family:inherit;">
        <!-- Row 1: Aug 2025 baseline -->
        <text x="0" y="16" font-size="14" fill="#73737d">${labels.baseline}</text>
        <rect x="0" y="24" width="540" height="18" rx="9" fill="#EDE8E2"/>
        <rect x="0" y="24" width="216" height="18" rx="9" fill="#B9B4AC"/>
        <text x="552" y="38" font-size="14" font-weight="600" fill="#73737d">${formatPct('40')}</text>

        <!-- Row 2: Jun 2026 employees -->
        <text x="0" y="84" font-size="14" fill="#73737d">${labels.employees}</text>
        <rect x="0" y="92" width="540" height="18" rx="9" fill="#EDE8E2"/>
        <rect x="0" y="92" width="529" height="18" rx="9" fill="#B97846"/>
        <text x="552" y="106" font-size="14" font-weight="600" fill="#B97846">${formatPct('97.9')}</text>

        <!-- Row 3: engineer output tokens -->
        <text x="0" y="152" font-size="14" fill="#73737d">${labels.engineers}</text>
        <rect x="0" y="160" width="540" height="18" rx="9" fill="#EDE8E2"/>
        <rect x="0" y="160" width="535" height="18" rx="9" fill="#C98A5C"/>
        <text x="552" y="174" font-size="14" font-weight="600" fill="#C98A5C">${formatPct('99')}</text>

        <!-- Row 4: company-wide output tokens -->
        <text x="0" y="220" font-size="14" fill="#73737d">${labels.companyWide}</text>
        <rect x="0" y="228" width="540" height="18" rx="9" fill="#EDE8E2"/>
        <rect x="0" y="228" width="459" height="18" rx="9" fill="#D9A87D"/>
        <text x="552" y="242" font-size="14" font-weight="600" fill="#C98A5C">${formatPct('85')}</text>

        <!-- Row 5: Anthropic Claude Tag -->
        <text x="0" y="288" font-size="14" fill="#73737d">${labels.anthropic}</text>
        <rect x="0" y="296" width="540" height="18" rx="9" fill="#EDE8E2"/>
        <rect x="0" y="296" width="351" height="18" rx="9" fill="#14B8A6"/>
        <text x="552" y="310" font-size="14" font-weight="600" fill="#14B8A6">${formatPct('65')}</text>
      </svg>
    </div>
    <figcaption class="mt-3 text-sm text-glass-muted">${labels.caption}</figcaption>
  </figure>
`;

const BlogPost5: React.FC = () => {
  const { language } = useLanguage();

  const enChart = adoptionChart({
    heading: "Agent adoption inside the labs (self-reported, mid-2026)",
    baseline: "OpenAI employees using Codex — Aug 2025",
    employees: "OpenAI employees using Codex — Jun 2026",
    engineers: "Avg. OpenAI engineer: output tokens generated via Codex",
    companyWide: "Avg. OpenAI employee: output tokens generated via Codex",
    anthropic: "Anthropic product team: code written by Claude Tag",
    caption: "Sources: OpenAI, “How agents are transforming work” (2026); Anthropic, “Introducing Claude Tag” (Jun 23, 2026). All figures self-reported by the vendors.",
  }, (v) => `${v}%`);

  const deChart = adoptionChart({
    heading: "Agenten-Adoption in den Labs (selbstberichtet, Mitte 2026)",
    baseline: "OpenAI-Mitarbeiter, die Codex nutzen — Aug 2025",
    employees: "OpenAI-Mitarbeiter, die Codex nutzen — Jun 2026",
    engineers: "Ø OpenAI-Engineer: Output-Tokens via Codex",
    companyWide: "Ø OpenAI-Mitarbeiter: Output-Tokens via Codex",
    anthropic: "Anthropic-Produktteam: Code geschrieben von Claude Tag",
    caption: "Quellen: OpenAI, „How agents are transforming work“ (2026); Anthropic, „Introducing Claude Tag“ (23. Jun 2026). Alle Zahlen von den Anbietern selbst berichtet.",
  }, (v) => `${v.replace('.', ',')}\u00A0%`);

  const content = {
    en: {
      title: "97.9% at OpenAI, 65% at Anthropic: What the Labs' Own Numbers Say About Agentic Work",
      subtitle: "The AI labs are patient zero for agent adoption. Two data drops this summer show how far along they already are — and what the rest of us should read into it.",
      date: "Jul 3, 2026",
      readTime: "4 min read",
      category: "AI at Work",
      back: "Back to Blog",
      content: `
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          If you want to know what knowledge work looks like in two years, don't read predictions — look at how the AI labs themselves work today. They have unlimited access to their own frontier models, no procurement process in the way, and every incentive to eat their own cooking. This summer, both OpenAI and Anthropic published numbers about internal agent adoption. The numbers are startling even if you discount them heavily.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">OpenAI: from 40% to 97.9% in under a year</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          In its report <a href="https://openai.com/index/how-agents-are-transforming-work/" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">"How agents are transforming work"</a>, OpenAI states that <strong class="text-glass-dark">97.9% of its employees now use Codex</strong> — up from roughly 40% in August 2025. The more interesting number hides one level deeper: the average OpenAI <em>engineer</em> now generates <strong class="text-glass-dark">99% of their output tokens through Codex</strong> rather than ChatGPT, and across all employees — including sales, legal, and operations — agent-generated tokens account for more than 85%. Non-developers are the fastest-growing user group, roughly 20% of usage and growing three times faster than engineers.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Anthropic: the agent is a teammate in Slack</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Anthropic's data point came with a product. On June 23 it launched <a href="https://www.anthropic.com/news/introducing-claude-tag" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">Claude Tag</a> — an evolution of Claude Code that lives in Slack. You tag <code class="bg-glass-cream px-2 py-1 rounded text-sm text-glass-copper border border-glass-copper/20">@Claude</code> in a channel like a colleague; it builds context from channel history, works asynchronously over hours or days, and everyone in the channel shares the same instance. The stat: <strong class="text-glass-dark">65% of Anthropic's product-team code is now written by their internal version of Claude Tag</strong> — including most of the code that built Claude Tag itself. And usage has spread beyond engineering into support, sales, and bug triage.
        </p>

        ${enChart}

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">The asterisk you should keep</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Every one of these figures is <strong class="text-glass-dark">self-reported by a company selling the tool it measures</strong>, and none have been independently verified — a point <a href="https://thenextweb.com/news/openai-codex-agents-shift-employees-non-developers" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">critics were quick to make</a>. "Output tokens" is also a generous metric: generating ten drafts you throw away counts the same as one you ship. Discount accordingly. But even if the true numbers were half as large, the direction is unambiguous — inside the labs, working <em>without</em> an agent is now the exception that needs justifying.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">What this means outside the labs</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          The labs are living 12–24 months ahead of the average enterprise, so treat their present as your planning horizon. Three things stand out to me from consulting work in exactly that gap. <strong class="text-glass-dark">First</strong>, the bottleneck moves from writing to reviewing: if agents produce 65–99% of the artifacts, your senior people become editors, and most organizations haven't sized review capacity for that. <strong class="text-glass-dark">Second</strong>, the Slack-teammate pattern matters more than the coding stat — once the agent sits in the channel where decisions happen, adoption stops being a tooling question and becomes an org-design question: who approves what the agent ships? <strong class="text-glass-dark">Third</strong>, for European companies the sovereignty question from my <a href="/blog/scalable-react-applications" class="text-glass-copper hover:text-glass-amber underline">vibe-coding post</a> gets sharper: the more of your output flows through a US frontier model, the more that dependency deserves a line in your risk register, not just your tech-radar deck.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          The practical move is the same one I gave clients last year, just with more urgency: pick one team, give it real agent access with real guardrails, measure review load and defect rates — and write down what you learn in a place the next team (and the next agent) can read.
        </p>
      `
    },
    de: {
      title: "97,9 % bei OpenAI, 65 % bei Anthropic: Was die Zahlen der Labs über Agentic Work verraten",
      subtitle: "Die AI-Labs sind Patient Null der Agenten-Adoption. Zwei Datenpunkte aus diesem Sommer zeigen, wie weit sie schon sind — und was der Rest daraus lernen sollte.",
      date: "3. Jul 2026",
      readTime: "4 Min. Lesezeit",
      category: "AI at Work",
      back: "Zurück zum Blog",
      content: `
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Wer wissen will, wie Wissensarbeit in zwei Jahren aussieht, sollte keine Prognosen lesen — sondern schauen, wie die AI-Labs selbst heute arbeiten. Sie haben unbegrenzten Zugriff auf ihre eigenen Frontier-Modelle, keinen Einkaufsprozess im Weg und jeden Anreiz, ihr eigenes Produkt zu nutzen. Diesen Sommer haben sowohl OpenAI als auch Anthropic Zahlen zur internen Agenten-Adoption veröffentlicht. Sie sind verblüffend, selbst wenn man sie stark abzinst.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">OpenAI: von 40 % auf 97,9 % in unter einem Jahr</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          In seinem Report <a href="https://openai.com/index/how-agents-are-transforming-work/" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">„How agents are transforming work"</a> berichtet OpenAI, dass <strong class="text-glass-dark">97,9 % der Mitarbeitenden inzwischen Codex nutzen</strong> — gegenüber rund 40 % im August 2025. Die interessantere Zahl steckt eine Ebene tiefer: Der durchschnittliche OpenAI-<em>Engineer</em> erzeugt inzwischen <strong class="text-glass-dark">99 % seiner Output-Tokens über Codex</strong> statt über ChatGPT, und über alle Mitarbeitenden hinweg — inklusive Sales, Legal und Operations — liegt der Agenten-Anteil bei über 85 %. Nicht-Entwickler sind die am schnellsten wachsende Nutzergruppe: rund 20 % der Nutzung, mit dreifachem Wachstumstempo gegenüber den Engineers.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Anthropic: der Agent ist ein Teamkollege in Slack</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Anthropics Datenpunkt kam mit einem Produkt. Am 23. Juni erschien <a href="https://www.anthropic.com/news/introducing-claude-tag" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">Claude Tag</a> — eine Weiterentwicklung von Claude Code, die in Slack lebt. Man taggt <code class="bg-glass-cream px-2 py-1 rounded text-sm text-glass-copper border border-glass-copper/20">@Claude</code> im Channel wie einen Kollegen; es baut Kontext aus der Channel-Historie auf, arbeitet asynchron über Stunden oder Tage, und alle im Channel teilen sich dieselbe Instanz. Die Zahl dazu: <strong class="text-glass-dark">65 % des Codes im Anthropic-Produktteam schreibt inzwischen die interne Version von Claude Tag</strong> — einschließlich des Großteils des Codes, aus dem Claude Tag selbst besteht. Und die Nutzung ist längst über Engineering hinaus in Support, Sales und Bug-Triage gewandert.
        </p>

        ${deChart}

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Das Sternchen, das man behalten sollte</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Jede dieser Zahlen ist <strong class="text-glass-dark">selbstberichtet von einem Unternehmen, das genau dieses Tool verkauft</strong>, und keine wurde unabhängig verifiziert — ein Punkt, den <a href="https://thenextweb.com/news/openai-codex-agents-shift-employees-non-developers" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">Kritiker schnell gemacht haben</a>. „Output-Tokens" ist zudem eine großzügige Metrik: Zehn verworfene Entwürfe zählen genauso wie einer, der ausgeliefert wird. Also: entsprechend abzinsen. Aber selbst wenn die wahren Zahlen nur halb so groß wären, ist die Richtung eindeutig — in den Labs ist Arbeiten <em>ohne</em> Agent inzwischen die Ausnahme, die begründet werden muss.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Was das außerhalb der Labs bedeutet</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Die Labs leben 12–24 Monate vor dem Durchschnittsunternehmen — ihre Gegenwart ist also euer Planungshorizont. Drei Dinge fallen mir aus der Beratungsarbeit in genau dieser Lücke auf. <strong class="text-glass-dark">Erstens:</strong> Der Engpass wandert vom Schreiben zum Reviewen. Wenn Agenten 65–99 % der Artefakte erzeugen, werden die Senior-Leute zu Redakteuren — und kaum eine Organisation hat ihre Review-Kapazität darauf ausgelegt. <strong class="text-glass-dark">Zweitens:</strong> Das Slack-Teamkollegen-Muster ist wichtiger als die Coding-Statistik. Sobald der Agent in dem Channel sitzt, in dem Entscheidungen fallen, ist Adoption keine Tooling-Frage mehr, sondern eine Frage des Organisationsdesigns: Wer gibt frei, was der Agent ausliefert? <strong class="text-glass-dark">Drittens:</strong> Für europäische Unternehmen wird die Souveränitätsfrage aus meinem <a href="/blog/scalable-react-applications" class="text-glass-copper hover:text-glass-amber underline">Vibe-Coding-Beitrag</a> schärfer: Je mehr des eigenen Outputs durch ein US-Frontier-Modell fließt, desto eher gehört diese Abhängigkeit ins Risikoregister — nicht nur ins Tech-Radar-Deck.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Der praktische Schritt ist derselbe, den ich Kunden schon letztes Jahr empfohlen habe, nur dringlicher: ein Team auswählen, echten Agenten-Zugang mit echten Leitplanken geben, Review-Last und Fehlerraten messen — und die Erkenntnisse dort aufschreiben, wo das nächste Team (und der nächste Agent) sie lesen kann.
        </p>
      `
    }
  };

  const t = content[language];

  usePageMeta(`${t.title} — Michel Werner`, t.subtitle);

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-glass-light via-white to-glass-cream py-20 px-4">
      <ArticleBackdrop />
      <div className="max-w-4xl mx-auto relative">
        <SubpageHeader />
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
            dangerouslySetInnerHTML={{ __html: t.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPost5;
