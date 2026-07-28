import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";

// CONFIRM THESE. Every number here must survive being asked "which ones?"
// in an interview. An inflated stat costs more credibility than a small one gains.
const STATS = [
  { value: 2, suffix: "+", label: "Years shipping production software" },
  { value: 6, suffix: "", label: "Products shipped end to end" },
  { value: 100, suffix: "%", label: "Built and deployed solo" },
];

export default function Stats() {
  return (
    <section id="stats" className="border-t border-line px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 md:grid-cols-3 md:gap-y-0">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="md:border-l md:border-line md:pl-6">
              <p className="font-display text-5xl font-semibold tracking-tight text-ink md:text-7xl">
                <span className="text-cobalt">
                  <CountUp value={s.value} suffix={s.suffix} />
                </span>
              </p>
              <p className="mt-3 max-w-[12ch] text-sm text-ink-soft">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
