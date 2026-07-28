/**
 * The single source of truth for case studies: the list on the home page and
 * the /work/[slug] pages both read from here.
 *
 * These were written from the repos and READMEs — every claim below is one you
 * can point at in the code. What's deliberately NOT here: business outcomes
 * (hours saved, cost avoided, users onboarded). Add those where you know them;
 * a real number in `outcome` is worth more than everything else on the page.
 */
export type CaseStudy = {
  slug: string;
  name: string;
  /** One line on what it does — not a category label. */
  kind: string;
  year: string;
  /** Gradient stand-in until there's a real screenshot. */
  grad: string;
  /** Shown on the detail page. */
  role: string;
  stack: string[];
  /** Headline outcome, e.g. "6h → 4min first response". */
  outcome?: string;
  /** Live deployment, if there is one. */
  href?: string;
  repo?: string;
  sections: { heading: string; body: string }[];
};

export const WORK: CaseStudy[] = [
  {
    slug: "energy-monitoring-system",
    name: "Artistic Milliners EMS",
    kind: "Real-time energy monitoring across four manufacturing sites",
    year: "2026",
    grad: "linear-gradient(135deg, #2b36f0, #6b74ff)",
    role: "Sole engineer: data layer, backend, UI, deployment",
    stack: ["Next.js", "TypeScript", "MS SQL Server", "Tailwind CSS", "PWA"],
    outcome: "Eight utility units across four sites, polled live on one screen.",
    // Redirects to /login — the dashboard is behind auth, so a visitor sees a
    // sign-in screen rather than the telemetry.
    href: "https://auth-app-omega.vercel.app",
    repo: "https://github.com/SameerAhm-ed/auth-app",
    sections: [
      {
        heading: "The problem",
        body: "Artistic Milliners runs power houses, steam distribution, solar generation and gas lines across four sites: AM4, AM5, AM14 and AM15. The telemetry existed, but it lived in separate SQL Server databases with no shared view. Knowing how a plant was performing meant querying the right database and already knowing which one that was.",
      },
      {
        heading: "What I built",
        body: "A single real-time dashboard over all four sites. It reads from two separate MS SQL Server databases (one shared across AM4, AM14 and AM15, and a dedicated one for AM5) and presents power, steam, solar and gas pressure as one continuously-updating picture. Access is role-based, so an operator and a plant manager see the surface that belongs to them.",
      },
      {
        heading: "Built for the floor",
        body: "It installs as a Progressive Web App, because the people who need it are walking the site with a phone, nowhere near a workstation. The service worker caches the app shell only, deliberately. Live telemetry always comes from the network, because a cached energy reading is worse than no reading: it looks current and isn't.",
      },
      {
        heading: "The interesting constraint",
        body: "Two databases with different schemas behind one coherent interface. The temptation is to paper over the difference in the UI and end up with per-site special cases scattered through the components. I normalised at the data layer instead, so the site split stays a configuration detail and the interface doesn't know or care which database a reading came from.",
      },
    ],
  },
  {
    slug: "rag-support-assistant",
    name: "Grounded Support Assistant",
    kind: "Fully local RAG chatbot that refuses to guess, and proves it",
    year: "2026",
    grad: "linear-gradient(135deg, #15140f, #2b36f0)",
    role: "Sole engineer: retrieval pipeline, backend, UI, eval harness",
    stack: ["FastAPI", "Python 3.12", "ChromaDB", "Llama 3.2", "React 19", "Vite"],
    outcome: "7/7 on a live eval, including correctly saying “I don't know”.",
    repo: "https://github.com/SameerAhm-ed/artistic-milliners-rag-bot",
    sections: [
      {
        heading: "The problem",
        body: "Most support chatbots demo beautifully and then confidently invent an answer the first time a customer asks something outside their knowledge base. For a manufacturer answering questions about MOQs, lead times and returns policy, a plausible-sounding wrong answer is worse than no chatbot at all.",
      },
      {
        heading: "What I built",
        body: "A retrieval-augmented assistant that answers only from a fixed corpus and shows its working. Every answer carries the document and section it came from, plus the raw retrieved passages in a “show your work” panel, so you can check that retrieval actually happened. Follow-up questions keep conversation context: ask “do you offer stretch denim?” then “what fits is it suited for?” and it resolves the pronoun from history.",
      },
      {
        heading: "Refusing to answer is a feature",
        body: "The anti-hallucination path is the part I care about most. Ask it who the CEO is, something genuinely not in the corpus, and it says it doesn't know and routes you to the sales team instead of assembling a confident guess from adjacent text. A test pins that behaviour, so it stays true.",
      },
      {
        heading: "The eval",
        body: "There's a fixed evaluation harness that runs live against the API: five in-corpus factual questions checked for the correct answer and the correct cited source, one out-of-corpus question checked for a refusal, and one multi-turn check proving history is actually used. Current result is 7/7. The harness matters more than the score, because it means a regression shows up in a test run and not in front of a customer.",
      },
      {
        heading: "It runs on nothing",
        body: "Entirely local, at zero API cost: MiniLM embeddings via ONNX on CPU, Chroma for the vector store, and Llama 3.2 3B through Ollama for generation. That constraint does real work. A 3B model needs a tighter prompt and better retrieval than a frontier model would, so the retrieval quality has to carry more of the weight.",
      },
    ],
  },
  {
    slug: "samdocs",
    name: "SamDocs",
    kind: "RAG-as-a-service: upload documents, get cited answers",
    year: "2026",
    grad: "linear-gradient(135deg, #6b74ff, #2b36f0)",
    role: "Sole engineer: full stack and infrastructure",
    stack: ["FastAPI", "LangChain", "PostgreSQL + pgvector", "Next.js", "TypeScript", "Docker"],
    outcome: "One `docker compose up` from clone to working RAG stack.",
    repo: "https://github.com/SameerAhm-ed/samdocs",
    sections: [
      {
        heading: "The problem",
        body: "The gap between a RAG notebook and something a team can actually use is mostly unglamorous: ingestion, storage, deployment, and being able to check where an answer came from. Notebooks skip all four.",
      },
      {
        heading: "What I built",
        body: "A self-hostable document QA service. You upload documents; it splits, embeds and stores them in Postgres with pgvector. When you ask a question it retrieves the relevant passages and answers from them, with citations back to the source so every claim is checkable.",
      },
      {
        heading: "Boring infrastructure on purpose",
        body: "Postgres with pgvector, no dedicated vector database. Most teams already run Postgres, already know how to back it up, and already have opinions about how to operate it. Adding a second stateful service to a stack buys a marginal retrieval improvement in exchange for a permanent operational cost, and that trade rarely pays.",
      },
      {
        heading: "One command to run it",
        body: "The whole stack (Next.js frontend, FastAPI backend, Postgres) comes up with a single `docker compose up`, and CI runs on every push. The measure of this project is that someone else can clone it and have it working in a minute without asking me anything.",
      },
    ],
  },
];

export const bySlug = (slug: string) => WORK.find((w) => w.slug === slug);
