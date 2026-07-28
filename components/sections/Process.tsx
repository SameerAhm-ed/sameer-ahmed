import Reveal from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "We talk goals, audience, and what success looks like. I dig into your brand so the work is built on substance, not guesswork.",
  },
  {
    n: "02",
    title: "Design",
    body: "I shape the direction — layout, type, motion — and share work early and often so you're never surprised by the result.",
  },
  {
    n: "03",
    title: "Build",
    body: "Full-stack engineering — front-end, APIs, data, and any AI wired in. Pixel-faithful, tested, and built to scale.",
  },
  {
    n: "04",
    title: "Ship & Scale",
    body: "We deploy to production, set up monitoring, and make it fast and reliable. I stay on to help it grow after go-live.",
  },
];

/**
 * Previously a GSAP-pinned horizontal scroll: it hijacked the scrollbar for
 * five viewport-heights to deliver four sentences. Same content, now a sticky
 * heading beside a normal list — no scroll hijack and no JS at all.
 */
export default function Process() {
  return (
    <section
      id="process"
      className="border-t border-line bg-ink px-6 py-24 text-bone md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-stone">
              (How we work)
            </p>
            <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              A simple, calm process.
            </h2>
            <p className="mt-6 max-w-sm text-bone/60 md:text-lg">
              Four steps, no chaos. Here&apos;s how a project goes from first
              call to launch.
            </p>
          </div>
        </div>

        <ol className="md:col-span-7">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <li className="border-t border-bone/15 py-10 first:border-t-0 first:pt-0 md:py-12">
                <span className="font-mono text-sm text-cobalt">{s.n}</span>
                <h3 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-bone/70">
                  {s.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
