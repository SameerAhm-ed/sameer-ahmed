import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const FACTS = [
  { k: "Based in", v: "Pakistan · GMT+5" },
  { k: "Focus", v: "Full-stack + AI" },
  { k: "Experience", v: "8+ years" },
  { k: "Availability", v: "Open for projects" },
];

export default function AboutMe() {
  return (
    <section
      id="aboutme"
      className="border-t border-line px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-16">
        {/* Photo placeholder — replace with next/image of your portrait */}
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-bone-deep">
            {/* Monogram sits behind the photo as a graceful fallback */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-7xl font-semibold text-ink/15">
                SA
              </span>
            </div>
            <Image
              src="/sameer.png"
              alt="Sameer Ahmed"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top"
            />
          </div>
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
                I&apos;m a full-stack engineer who&apos;s spent years turning
                ideas into products people rely on — front-end, back-end,
                infrastructure, and increasingly the AI that makes them smart.
              </p>
              <p>
                I work end to end: I architect it, build it, and ship it to
                production — so you get one person accountable for the whole
                thing, and a result that&apos;s cohesive from first idea to
                launch day.
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
