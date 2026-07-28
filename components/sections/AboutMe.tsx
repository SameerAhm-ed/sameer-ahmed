import Reveal from "@/components/ui/Reveal";
import Portrait from "@/components/ui/Portrait";

const FACTS = [
  { k: "Based in", v: "Pakistan · GMT+5" },
  { k: "Focus", v: "Full-stack + AI" },
  { k: "Experience", v: "2+ years" },
  { k: "Availability", v: "Open for projects" },
];

export default function AboutMe() {
  return (
    <section
      id="aboutme"
      className="border-t border-line px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-5">
          <Portrait />
        </Reveal>

        {/* Story */}
        <div className="md:col-span-7">
          <Reveal>
            <p className="mb-8 font-mono text-xs uppercase tracking-widest text-stone">
              (About me)
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              Hi, I&apos;m Sameer — I build the whole product, not just the
              pretty part.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft md:text-lg">
              <p>
                I&apos;m a full-stack engineer. Two years of turning ideas into
                products people actually use — front-end, back-end,
                infrastructure, and the AI that makes them smart.
              </p>
              <p>
                Two years is not a long time. It is long enough to have shipped
                real things, broken them in production, and learned what that
                costs — which is mostly what I&apos;d want to know about someone
                I was hiring.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
              {FACTS.map((f) => (
                <div key={f.k}>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-stone">
                    {f.k}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
