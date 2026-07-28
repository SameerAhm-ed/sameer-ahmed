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
  /** Gradient, used as the backdrop and as the fallback where `image` is absent. */
  grad: string;
  /** Real screenshot in /public/work. Optional: only some projects have one. */
  image?: string;
  /** Describes the screenshot for screen readers. Required whenever `image` is set. */
  imageAlt?: string;
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
    slug: "aiza-heels-erp",
    name: "Aiza Heels ERP",
    kind: "Client ERP for a heel manufacturing and wholesale business",
    year: "2026",
    grad: "linear-gradient(135deg, #2b36f0, #15140f)",
    image: "/work/aiza-heels-erp.webp",
    imageAlt:
      "The Aiza Heels ERP dashboard: sales KPIs, a 30-day sales trend, expenses by category and low-stock alerts.",
    role: "Built solo: schema, services layer, UI, reporting",
    stack: ["Next.js 16", "TypeScript", "SQLite + Drizzle", "Zod", "Tailwind CSS", "Recharts"],
    outcome: "Invoicing, stock, ledgers and P&L for a working business, on one SQLite file.",
    repo: "https://github.com/SameerAhm-ed/aiza-heels-erp",
    sections: [
      {
        heading: "The problem",
        body: "A small manufacturing and wholesale business runs on an invoice book, a stock list and a ledger until the day nobody can answer the basic questions: how many of that size are left, what does this customer still owe, did we actually make money last month. The information exists, but it lives in three places that only get reconciled by hand, and usually only after something has already gone wrong.",
      },
      {
        heading: "What I built",
        body: "One system covering the whole cycle: sales invoicing, purchasing, inventory with size and colour variants, customer and supplier ledgers, expenses, cash flow, and financial reports. Recording a sale checks stock, decrements the right variant, writes the ledger entry and updates the customer balance in a single operation, so the numbers agree with each other by construction and there is nothing to reconcile later.",
      },
      {
        heading: "Every rupee has to add up",
        body: "Computers do decimal math with tiny rounding errors that are usually invisible. Stack a discount and a tax rate on an invoice and a customer could be charged a fraction of a paisa off from what the receipt says. That sounds too small to matter, but it happens on every invoice, and in a running ledger those fractions never cancel out, they accumulate. Enough of them and the books stop matching the bank statement, and someone has to go hunting for the difference by hand. I built the money handling so the system never approximates: every amount is calculated in whole paisa, so a rupee is a rupee, on every invoice, forever.",
      },
      {
        heading: "No two invoices can share a number",
        body: "If two people create an invoice at nearly the same moment, a careless system can hand out the same number to both. It looks like a small glitch, and it stays invisible for months, until a tax audit turns up two invoices with the same number and now every record has to be checked by hand. I built the numbering so the database itself guarantees each invoice gets a number nobody else can claim, rather than relying on two people never clicking at exactly the same second.",
      },
      {
        heading: "Built for how the business actually works",
        body: "Ledger statements render as paper, because a wholesale customer settling an account expects a printed statement in their hand. Reports export to CSV, because the accountant works in Excel and always will. The whole thing runs from a single SQLite file with no external services, so for a one-operator business there is no monthly cloud bill and nothing that has to stay reachable for the system to keep working.",
      },
    ],
  },
  {
    slug: "energy-monitoring-system",
    name: "Artistic Milliners EMS",
    kind: "Real-time energy monitoring across four manufacturing sites",
    year: "2026",
    grad: "linear-gradient(135deg, #2b36f0, #6b74ff)",
    role: "Built solo: data layer, backend, UI, deployment",
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
        body: "It works like an app on someone's phone, because the people who use it are walking the plant floor, not sitting at a desk. The screen itself can still open on a weak signal, but the actual numbers never come from anything stored on the phone. A reading that looks current but isn't is worse than no reading at all, because someone could act on a number that's already wrong.",
      },
      {
        heading: "The interesting constraint",
        body: "The four sites don't organise their data the same way underneath. The easy shortcut is to handle each site's quirks directly in the screens people see, which then has to be redone for every new site added. Instead, I made that difference disappear before it ever reaches the dashboard, so a fifth site later means changing one setting, not rewriting screens.",
      },
    ],
  },
  {
    slug: "rag-support-assistant",
    name: "Support Assistant For AM",
    kind: "Fully local RAG chatbot that refuses to guess, and proves it",
    year: "2026",
    grad: "linear-gradient(135deg, #15140f, #2b36f0)",
    image: "/work/rag-support-assistant.webp",
    imageAlt:
      "The support assistant on a phone, showing an answer with the source document cited beneath it.",
    role: "Built solo: retrieval pipeline, backend, UI, eval harness",
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
        body: "An assistant that only answers from a specific set of company documents, and shows exactly where each answer came from. Every reply names the document and section it was pulled from, plus a panel showing the actual passages it read, so anyone can check the answer wasn't made up. It also follows a conversation: ask “do you offer stretch denim?” then “what fits is it suited for?” and it knows “it” means stretch denim.",
      },
      {
        heading: "Refusing to answer is a feature",
        body: "The part I care about most is what happens when it doesn't know something. Ask it who the CEO is, which genuinely isn't in its documents, and it says so and points you to the sales team, instead of stitching together a plausible-sounding wrong answer from nearby text. That's the behaviour that matters most for a business chatbot, and a test checks it every time, so it can't quietly stop working without anyone noticing.",
      },
      {
        heading: "The eval",
        body: "There's a fixed set of test questions that run against the live system every time: five it should answer correctly from its documents, checked against both the answer and the source it cites; one it should refuse, because the answer genuinely isn't in its documents; and one follow-up question that only passes if it remembers what was just asked. It currently gets all seven right. The tests matter more than the score, because a problem shows up automatically instead of a customer finding it first.",
      },
      {
        heading: "It runs on nothing",
        body: "It runs entirely on ordinary hardware, with no paid AI service involved and no ongoing bill. That's a real limitation, not a flex: the free, local language model is far smaller than something like GPT-4, so it can't paper over a weak search step with general knowledge the way a bigger model could. Which means finding the right passage has to do more of the work, and getting that right took more effort than it would have with a bigger, paid model doing some of the thinking instead.",
      },
    ],
  },
  {
    slug: "samdocs",
    name: "SamDocs",
    kind: "RAG-as-a-service: upload documents, get cited answers",
    year: "2026",
    grad: "linear-gradient(135deg, #6b74ff, #2b36f0)",
    role: "Built solo, full stack and infrastructure",
    stack: ["FastAPI", "LangChain", "PostgreSQL + pgvector", "Next.js", "TypeScript", "Docker"],
    outcome: "One `docker compose up` from clone to working RAG stack.",
    repo: "https://github.com/SameerAhm-ed/samdocs",
    sections: [
      {
        heading: "The problem",
        body: "A lot of AI document-search demos exist as a script on someone's laptop. Turning that into something a team can actually use means solving the unglamorous problems the demo skips: getting documents into the system reliably, storing them somewhere durable, deploying it so other people can reach it, and being able to check where an answer actually came from.",
      },
      {
        heading: "What I built",
        body: "A document question-answering service you can run on your own servers. Upload documents, and it breaks them into pieces and stores them in a searchable form inside a regular Postgres database. Ask a question and it finds the relevant passages and answers from them, with a citation back to the source, so every claim can be checked against the original document.",
      },
      {
        heading: "Boring infrastructure on purpose",
        body: "I used the same ordinary database, Postgres, to also handle the document search, instead of adding a second, specialised database just for that. Most teams already run Postgres and already know how to keep it backed up and running. A dedicated search database buys a small improvement in result quality, but somebody then has to keep that second system alive, monitored and backed up forever. For most teams, that ongoing cost isn't worth what it buys.",
      },
      {
        heading: "One command to run it",
        body: "The whole system, front end, back end and database, starts up with one command, and an automated check runs every time new code is pushed, so a mistake gets caught immediately instead of days later. The real measure of this project is that someone else can download it and have it running in a minute without asking me anything.",
      },
    ],
  },
];

export const bySlug = (slug: string) => WORK.find((w) => w.slug === slug);
