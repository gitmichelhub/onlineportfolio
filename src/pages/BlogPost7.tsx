import React from 'react';
import { useLanguage } from "@/hooks/use-language";
import { usePageMeta } from "@/hooks/use-page-meta";
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArticleBackdrop from '@/components/ArticleBackdrop';
import SubpageHeader from '@/components/SubpageHeader';

// Share of occupation-specific ChatGPT messages that fall outside the user's own role.
// Inline SVG so it inherits the site fonts and needs no chart library.
const crossoverChart = (labels: {
  heading: string;
  caption: string;
  rows: { label: string; value: number }[];
}, formatPct: (v: number) => string) => `
  <figure class="my-10">
    <div class="rounded-content border border-glass-copper/25 bg-white/70 p-6">
      <p class="text-sm font-semibold text-glass-dark mb-4">${labels.heading}</p>
      <svg viewBox="0 0 640 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${labels.heading}" style="width:100%;height:auto;font-family:inherit;">
        ${labels.rows.map((row, i) => {
          const y = 24 + i * 68;
          const tone = ['#B97846', '#C98A5C', '#D9A87D', '#14B8A6', '#B9B4AC'][i];
          return `
        <text x="0" y="${y - 8}" font-size="14" fill="#73737d">${row.label}</text>
        <rect x="0" y="${y}" width="540" height="18" rx="9" fill="#EDE8E2"/>
        <rect x="0" y="${y}" width="${(row.value / 100 * 540).toFixed(0)}" height="18" rx="9" fill="${tone}"/>
        <text x="552" y="${y + 14}" font-size="14" font-weight="600" fill="${tone}">${formatPct(row.value)}</text>`;
        }).join('')}
      </svg>
    </div>
    <figcaption class="mt-3 text-sm text-glass-muted">${labels.caption}</figcaption>
  </figure>
`;

const BlogPost7: React.FC = () => {
  const { language } = useLanguage();

  const enChart = crossoverChart({
    heading: "Share of occupation-specific messages about someone else's job",
    caption: "Source: OpenAI Economic Research, “Work at the Frontier: How AI is Expanding What People Do at Work” (Jul 27, 2026). Based on 800,000+ work-related messages from US ChatGPT users; generic tasks excluded.",
    rows: [
      { label: "Customer experience", value: 77 },
      { label: "Design", value: 75 },
      { label: "Human resources", value: 69 },
      { label: "Legal", value: 56 },
      { label: "Marketing", value: 53 },
    ],
  }, (v) => `${v}%`);

  const deChart = crossoverChart({
    heading: "Anteil berufsspezifischer Anfragen, die zu einem anderen Job gehören",
    caption: "Quelle: OpenAI Economic Research, „Work at the Frontier: How AI is Expanding What People Do at Work“ (27. Juli 2026). Basis: über 800.000 arbeitsbezogene Nachrichten von US-ChatGPT-Nutzern, generische Aufgaben ausgeschlossen.",
    rows: [
      { label: "Customer Experience", value: 77 },
      { label: "Design", value: 75 },
      { label: "Human Resources", value: 69 },
      { label: "Legal", value: 56 },
      { label: "Marketing", value: 53 },
    ],
  }, (v) => `${v} %`);

  const content = {
    en: {
      title: "Task Crossover: AI Is Quietly Redrawing Who Does What",
      subtitle: "OpenAI looked at 800,000 work messages and found that 43.5% of role-specific AI use is about someone else's job. Job descriptions are the last thing to notice.",
      date: "Aug 14, 2026",
      readTime: "6 min read",
      category: "AI at Work",
      back: "Back to Blog",
      content: `
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Most of the AI-and-work debate is stuck on one question: which tasks can a model do instead of a human? OpenAI Economic Research just published something that asks a more useful one — <em>who is now doing which tasks</em>. In <a href="https://openai.com/index/how-ai-is-expanding-what-people-do-at-work/" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">“How AI is expanding what people do at work”</a>, the first entry in their Work at the Frontier series, they analysed more than 800,000 work-related messages from US ChatGPT users. The headline: 16.8% of all work messages, and <strong class="text-glass-dark">43.5% of occupation-specific messages, are about tasks that belong to a different occupation</strong>.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          They call it <strong class="text-glass-dark">task crossover</strong>, and the methodology is worth a sentence. They first strip out the generic work that everybody does — writing, summarising, scheduling — because that proves nothing. Of what remains, the genuinely role-shaped work, nearly half sits outside the role of the person asking. The salesperson exploring a dataset that used to go to an analyst. The marketer debugging a website instead of filing a ticket. The founder reviewing their own contract.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Some roles have already left their lane</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          The aggregate number hides the interesting spread. Once generic work is excluded, outside-occupation tasks account for 77% of role-specific messages from customer experience workers, 75% from designers, 69% from HR, 56% from legal, and 53% from marketers. For those groups, "borrowing" someone else's job is no longer the exception — it is the majority of the specialised work they bring to the model.
        </p>

        ${enChart}

        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Traffic also flows in a direction. Financial calculation and technology troubleshooting show up among the three most common outside tasks in every one of the other seven occupation groups — those two skills have effectively become general-purpose. Design is the clearest example of a net importer: 35.2% of designers' messages are other people's work, while design tasks make up just 1.7% of everyone else's. Engineering is close to the reverse — only 18.5% imported, but engineering tasks account for 7.4% of what other occupations ask about. Marketing is the one field that runs hot in both directions: 24.3% imported, and 8.9% exported, the highest outward share in the sample.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          And it depends on where you work. The outside-occupation share falls from 18.9% in workspaces with 2–5 seats to 16.3% in workspaces with more than 100 seats. That reads exactly as you would expect: in a small company the person who meets the problem <em>is</em> the person who solves it, because there is no analyst to hand it to. As OpenAI puts it, AI is especially useful as a generalist tool where specialist resources are scarce.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">What I take from it</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          The finding that stays with me is not any single percentage — it is that this is visible in usage data long before it is visible anywhere else. Nobody rewrote a job description to say "the customer experience team now does light data analysis." It just started happening, message by message, and the org chart has not caught up. That is a genuinely new instrument: you can watch a role reorganise in real time instead of reading about it in a labour-market statistic two years later.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Three consequences seem obvious to me from consulting work.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          <strong class="text-glass-dark">The handoff was never just a delay — it was also a review step.</strong> When the marketer waited for a developer, they got a second pair of eyes for free. When they troubleshoot the site themselves with an assistant, that check quietly disappears. Removing the handoff removes both the friction and the control, and organisations are enthusiastically counting the first while ignoring the second. The question for legal work at 56% crossover is not "can the model do it" but "who now catches it when it is wrong?"
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          <strong class="text-glass-dark">Career ladders assume depth; crossover rewards breadth.</strong> Most competency frameworks I see promote people for going deeper into one specialism. If the actual work is getting broader — designers doing finance, HR doing analysis — then the way you assess and pay people is drifting out of sync with what they do all day. That is an HR problem before it is a technology problem, and it lands on the same HR teams whose own crossover rate is 69%.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          <strong class="text-glass-dark">Small organisations are the leading indicator.</strong> The seat-count gradient means startups and small teams are further into this pattern than large enterprises — not because they are more sophisticated, but because they have no one to delegate to. If you want to see what a large enterprise's roles look like once internal service teams stop being the default route, look at how a fifteen-person company works today.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">The caveats, and why it still matters</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          The usual asterisks apply, and they are real. This is one vendor measuring its own product, on US users only, and a message about a task is not proof that the task was completed well — or completed at all. Someone asking ChatGPT a legal question is not thereby a lawyer, and the data cannot tell us how much of this crossover produced good work versus confident nonsense that nobody reviewed. The sample also skews toward people who already reach for AI.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          But the direction survives every discount I can apply, and it pairs with the other number I wrote about recently: OpenAI reporting that <a href="/blog/agentic-work-adoption" class="text-glass-copper hover:text-glass-amber underline">non-developers are the fastest-growing group of Codex users</a>. Same story from two angles — the boundary between "my job" and "someone else's job" is getting soft, and it is getting soft from the outside in. My advice to clients has shifted accordingly. Stop asking which roles AI will replace and start asking which handoffs in your organisation have already quietly stopped happening — and whether anything replaced the check that used to sit inside them.
        </p>
      `
    },
    de: {
      title: "Task Crossover: KI verschiebt gerade leise, wer was macht",
      subtitle: "OpenAI hat 800.000 Arbeitsanfragen ausgewertet: 43,5 % der rollenspezifischen KI-Nutzung betrifft den Job von jemand anderem. Stellenbeschreibungen merken es zuletzt.",
      date: "14. Aug 2026",
      readTime: "6 Min. Lesezeit",
      category: "AI at Work",
      back: "Zurück zum Blog",
      content: `
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Die meiste Debatte über KI und Arbeit hängt an einer Frage fest: Welche Aufgaben kann ein Modell statt eines Menschen erledigen? OpenAI Economic Research hat gerade etwas veröffentlicht, das eine nützlichere Frage stellt — <em>wer erledigt inzwischen welche Aufgaben</em>. In <a href="https://openai.com/index/how-ai-is-expanding-what-people-do-at-work/" target="_blank" rel="noopener noreferrer" class="text-glass-copper hover:text-glass-amber underline">„How AI is expanding what people do at work"</a>, dem Auftakt der Reihe Work at the Frontier, wurden über 800.000 arbeitsbezogene Nachrichten von US-ChatGPT-Nutzern analysiert. Die Kernzahl: 16,8 % aller Arbeitsnachrichten und <strong class="text-glass-dark">43,5 % der berufsspezifischen Nachrichten drehen sich um Aufgaben, die zu einem anderen Beruf gehören</strong>.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Das Team nennt das <strong class="text-glass-dark">Task Crossover</strong>, und die Methodik ist einen Satz wert. Zuerst wird die generische Arbeit herausgerechnet, die alle machen — schreiben, zusammenfassen, terminieren —, weil sie nichts beweist. Von dem, was übrig bleibt, also der wirklich rollentypischen Arbeit, liegt fast die Hälfte außerhalb der Rolle der fragenden Person. Der Vertriebler, der einen Datensatz auswertet, der früher zur Analystin ging. Die Marketerin, die die Website debuggt, statt ein Ticket zu schreiben. Der Gründer, der seinen Vertrag selbst prüft.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Manche Rollen haben ihre Spur längst verlassen</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Die Gesamtzahl verdeckt die interessante Streuung. Ohne generische Arbeit entfallen auf Aufgaben außerhalb des eigenen Berufs: 77 % der rollenspezifischen Nachrichten bei Customer Experience, 75 % bei Designern, 69 % bei HR, 56 % im Legal-Bereich und 53 % im Marketing. Für diese Gruppen ist das „Ausleihen" fremder Jobs keine Ausnahme mehr, sondern die Mehrheit der spezialisierten Arbeit, die sie zum Modell tragen.
        </p>

        ${deChart}

        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Der Verkehr hat außerdem eine Richtung. Finanzberechnungen und Technik-Troubleshooting tauchen in allen sieben anderen Berufsgruppen unter den drei häufigsten fremden Aufgaben auf — diese beiden Fähigkeiten sind faktisch Allgemeingut geworden. Design ist das klarste Beispiel für einen Netto-Importeur: 35,2 % der Designer-Nachrichten sind fremde Arbeit, während Design-Aufgaben nur 1,7 % der Nachrichten aller anderen ausmachen. Engineering ist fast das Gegenteil — nur 18,5 % importiert, aber Engineering-Aufgaben machen 7,4 % dessen aus, was andere Berufe fragen. Marketing läuft als einziges Feld in beide Richtungen heiß: 24,3 % importiert und 8,9 % exportiert — der höchste Ausfuhr-Anteil im Sample.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Und es hängt davon ab, wo man arbeitet. Der Anteil fremder Aufgaben sinkt von 18,9 % in Workspaces mit 2–5 Seats auf 16,3 % in Workspaces mit über 100 Seats. Das liest sich genau so, wie man es erwartet: In einem kleinen Unternehmen <em>ist</em> die Person, die auf das Problem trifft, auch die Person, die es löst — weil es niemanden gibt, an den man abgibt. Oder in den Worten von OpenAI: KI ist besonders nützlich als Generalisten-Werkzeug dort, wo Spezialisten knapp sind.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Was ich daraus mitnehme</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Der Befund, der bei mir hängen bleibt, ist keine einzelne Prozentzahl — sondern dass das in Nutzungsdaten sichtbar wird, lange bevor es irgendwo sonst sichtbar ist. Niemand hat eine Stellenbeschreibung umgeschrieben mit „Customer Experience macht jetzt auch leichte Datenanalyse". Es passiert einfach, Nachricht für Nachricht, und das Organigramm hinkt hinterher. Das ist ein wirklich neues Instrument: Man kann einer Rolle beim Umbau zusehen, statt zwei Jahre später darüber in einer Arbeitsmarktstatistik zu lesen.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Drei Konsequenzen liegen für mich aus der Beratungsarbeit auf der Hand.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          <strong class="text-glass-dark">Die Übergabe war nie nur Verzögerung — sie war auch ein Review-Schritt.</strong> Wenn die Marketerin auf einen Entwickler wartete, bekam sie ein zweites Paar Augen gratis dazu. Wenn sie die Website selbst mit einem Assistenten debuggt, verschwindet diese Kontrolle stillschweigend. Wer die Übergabe entfernt, entfernt beides: die Reibung und die Kontrolle. Organisationen zählen begeistert das Erste und ignorieren das Zweite. Bei 56 % Crossover im Legal-Bereich lautet die Frage nicht „kann das Modell das", sondern „wer merkt es jetzt, wenn es falsch ist?"
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          <strong class="text-glass-dark">Karriereleitern belohnen Tiefe, Crossover belohnt Breite.</strong> Die meisten Kompetenzmodelle, die ich sehe, befördern Menschen dafür, in ein Spezialgebiet tiefer einzusteigen. Wenn die tatsächliche Arbeit breiter wird — Designer machen Finanzen, HR macht Analyse —, dann driftet die Art, wie ihr Menschen bewertet und bezahlt, weg von dem, was sie den ganzen Tag tun. Das ist ein HR-Problem, bevor es ein Technologieproblem ist — und es landet bei genau den HR-Teams, deren eigene Crossover-Quote bei 69 % liegt.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          <strong class="text-glass-dark">Kleine Organisationen sind der Frühindikator.</strong> Das Gefälle nach Seat-Zahl heißt: Startups und kleine Teams stecken tiefer in diesem Muster als große Konzerne — nicht weil sie fortschrittlicher wären, sondern weil sie niemanden zum Delegieren haben. Wer sehen will, wie die Rollen im Konzern aussehen, sobald interne Service-Teams nicht mehr der Standardweg sind, sollte anschauen, wie eine Firma mit fünfzehn Leuten heute arbeitet.
        </p>

        <h2 class="text-2xl font-semibold text-glass-dark mb-4 mt-8 font-playfair">Die Einschränkungen — und warum es trotzdem zählt</h2>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Die üblichen Sternchen gelten, und sie sind berechtigt. Hier misst ein Anbieter sein eigenes Produkt, ausschließlich bei US-Nutzern, und eine Nachricht über eine Aufgabe ist kein Beleg dafür, dass die Aufgabe gut erledigt wurde — oder überhaupt. Wer ChatGPT eine juristische Frage stellt, ist damit noch keine Juristin, und die Daten sagen nichts darüber, wie viel von diesem Crossover gute Arbeit hervorgebracht hat und wie viel selbstbewussten Unsinn, den niemand geprüft hat. Zudem ist das Sample zu Menschen verschoben, die ohnehin schon zu KI greifen.
        </p>
        <p class="mb-6 text-lg leading-relaxed text-glass-dark/80">
          Aber die Richtung überlebt jeden Abschlag, den ich ansetzen kann — und sie passt zu der anderen Zahl, über die ich kürzlich geschrieben habe: OpenAI berichtet, dass <a href="/blog/agentic-work-adoption" class="text-glass-copper hover:text-glass-amber underline">Nicht-Entwickler die am schnellsten wachsende Codex-Nutzergruppe sind</a>. Dieselbe Geschichte aus zwei Blickwinkeln — die Grenze zwischen „mein Job" und „der Job von jemand anderem" wird weich, und zwar von außen nach innen. Mein Rat an Kunden hat sich entsprechend verschoben: Hört auf zu fragen, welche Rollen KI ersetzt, und fragt stattdessen, welche Übergaben in eurer Organisation längst leise aufgehört haben — und ob irgendetwas die Kontrolle ersetzt hat, die früher darin steckte.
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

export default BlogPost7;
