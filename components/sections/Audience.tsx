import Reveal from "@/components/ui/Reveal";

// Two tracks, stated plainly rather than blurred together. Each card owns a
// destination so neither audience has to guess which parts of the page are
// written for them.
const TRACKS = [
  {
    eyebrow: "You're hiring",
    title: "Looking at me for a role",
    body: "How I work, what I've shipped, and what two years of owning things end to end actually taught me.",
    href: "#aboutme",
    cta: "Read the background",
  },
  {
    eyebrow: "You're building",
    title: "You need something built",
    body: "Scope, timelines, and pricing for project work — plus what I take on and how a project runs.",
    href: "#faq",
    cta: "See how projects work",
  },
];

export default function Audience() {
  return (
    <section
      id="start"
      className="border-b border-line px-6 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-8 font-mono text-xs uppercase tracking-widest text-stone">
            (Start here)
          </p>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {TRACKS.map((t, i) => (
            <Reveal key={t.href} delay={i * 0.08}>
              <a
                href={t.href}
                data-cursor="hover"
                className="group flex h-full flex-col justify-between bg-bone p-8 transition-colors duration-300 hover:bg-bone-deep md:p-10"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-cobalt">
                    {t.eyebrow}
                  </p>
                  <h2 className="mt-4 font-display text-2xl font-medium text-ink md:text-3xl">
                    {t.title}
                  </h2>
                  <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-soft">
                    {t.body}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink">
                  {t.cta}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
