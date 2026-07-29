"use client";

import { motion, type Variants } from "framer-motion";
import CountUp from "@/components/ui/CountUp";

// One trigger for all three, not one each — on the 2-column mobile layout the
// third stat wraps to its own row and a per-item trigger fires as each
// individually scrolls in, same dead-stagger bug as the other lists here.
const gridStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const stat: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Every number here has to survive being asked "which ones?" in an interview,
// so the six are named below. Counted from the non-fork repos on
// github.com/SameerAhm-ed, excluding tutorials, hackathon exercises and
// learning repos:
//
//   1. Aiza Heels ERP              aiza-heels-erp              client work
//   2. Artistic Milliners EMS      auth-app                    live, behind auth
//   3. Support Assistant For AM    artistic-milliners-rag-bot  source only
//   4. SamDocs                     samdocs                     source only
//   5. Aurum                       gold-analytics              source only
//   6. Sameer Associates           sameer_associates           live
//   7. Management System           management-system           live
//
// The ERP is the strongest of the seven: it was built for a paying client and
// is in use, which the other six can't claim. "Built and deployed solo" below
// still holds, but confirm it stays true if anyone else touches the ERP.
// This portfolio is deliberately not counted.
const STATS = [
  { value: 2, suffix: "+", label: "Years shipping production software" },
  { value: 7, suffix: "", label: "Products shipped end to end" },
  { value: 100, suffix: "%", label: "Built and deployed solo" },
];

export default function Stats() {
  return (
    <section id="stats" className="border-t border-line px-6 py-20 md:px-10 md:py-28">
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 md:grid-cols-3 md:gap-y-0"
        variants={gridStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            data-reveal
            variants={stat}
            className="md:border-l md:border-line md:pl-6"
          >
            <p className="font-display text-5xl font-semibold tracking-tight text-ink md:text-7xl">
              <span className="text-cobalt">
                <CountUp value={s.value} suffix={s.suffix} />
              </span>
            </p>
            <p className="mt-3 max-w-[12ch] text-sm text-ink-soft">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
