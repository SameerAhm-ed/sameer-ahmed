import Reveal from "@/components/ui/Reveal";

const SERVICES = [
  {
    title: "AI Products & Agents",
    body: "LLM apps, chatbots, and agents. RAG over your own data, automations, and Claude/GPT integrations that actually ship.",
    tags: ["LLMs", "RAG", "Agents"],
  },
  {
    title: "Full-Stack Web Apps",
    body: "End-to-end products in Next.js & Node: APIs, databases, auth, payments. Built to survive real traffic.",
    tags: ["Next.js", "APIs", "Databases"],
  },
  {
    title: "Cloud & Infrastructure",
    body: "Deploy, scale, and keep it fast. AWS/Vercel, CI/CD, and performance so it holds up in production.",
    tags: ["AWS", "CI/CD", "Performance"],
  },
  {
    title: "Product Design & UX",
    body: "Interfaces and brand details people trust on sight. Type, spacing, states, and the small things that read as care.",
    tags: ["UI/UX", "Design Systems", "Brand"],
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-line px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-6xl">
            What I do
          </h2>
          <p className="hidden max-w-xs text-sm text-ink-soft md:block">
            Four areas I work in. Most projects touch three of them.
          </p>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <article
                data-cursor="hover"
                className="group flex h-full flex-col justify-between bg-bone p-8 transition-colors duration-300 hover:bg-bone-deep md:p-10"
              >
                <div>
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 rounded-full bg-cobalt transition-transform duration-300 group-hover:scale-150"
                  />
                  <h3 className="mt-6 font-display text-2xl font-medium text-ink md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                    {s.body}
                  </p>
                </div>
                <ul className="mt-10 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-soft transition-colors group-hover:border-ink/30"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
