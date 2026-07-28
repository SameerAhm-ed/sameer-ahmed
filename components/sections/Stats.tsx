import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";

// Every number here has to survive being asked "which ones?" in an interview,
// so the six are named below. Counted from the non-fork repos on
// github.com/SameerAhm-ed, excluding tutorials, hackathon exercises and
// learning repos:
//
//   1. Artistic Milliners EMS      auth-app                    deployment down
//   2. Grounded Support Assistant  artistic-milliners-rag-bot  source only
//   3. SamDocs                     samdocs                     source only
//   4. Aurum                       gold-analytics              source only
//   5. Sameer Associates           sameer_associates           live, verified
//   6. Management System           management-system           live, verified
//
// Only two of the six currently answer on a URL. The others are defensible in
// an interview from the code, but "shipped" is easiest to defend when someone
// can click it — redeploying EMS would do the most for this number.
// This portfolio is deliberately not counted.
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
