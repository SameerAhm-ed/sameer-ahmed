import Reveal from "@/components/ui/Reveal";

// Placeholder testimonials — replace with real client quotes.
const QUOTES = [
  {
    quote:
      "Sameer shipped our MVP faster than we thought possible — and it actually held up when users showed up. Rare to find one person who can do all of it.",
    name: "Placeholder Name",
    role: "Founder, AI Startup",
  },
  {
    quote:
      "He owns the entire stack. We handed him a vague idea and got back a production-ready product, AI features and all.",
    name: "Placeholder Name",
    role: "CTO, SaaS",
  },
  {
    quote:
      "Genuinely strong at both engineering and design — which almost never happens. Communication was effortless start to finish.",
    name: "Placeholder Name",
    role: "Product Lead, Fintech",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-t border-line px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-6xl">
            Kind words
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-stone">
            (Clients)
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure
                data-cursor="hover"
                className="flex h-full flex-col justify-between rounded-2xl border border-line bg-bone-deep/40 p-8 transition-colors duration-300 hover:bg-bone-deep"
              >
                <span aria-hidden className="font-display text-5xl leading-none text-cobalt">
                  &ldquo;
                </span>
                <blockquote className="mt-4 text-lg leading-relaxed text-ink">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-line pt-5">
                  <p className="font-display text-base font-medium text-ink">
                    {q.name}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-wider text-stone">
                    {q.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
