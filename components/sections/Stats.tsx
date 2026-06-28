import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";

// Placeholder figures — swap for your real numbers.
const STATS = [
  { value: 8, suffix: "+", label: "Years building software" },
  { value: 40, suffix: "+", label: "Products shipped to production" },
  { value: 25, suffix: "+", label: "Clients served worldwide" },
  { value: 100, suffix: "%", label: "Ownership, end to end" },
];

export default function Stats() {
  return (
    <section id="stats" className="border-t border-line px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0">
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
