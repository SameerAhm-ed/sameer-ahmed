"use client";

import { motion, type Variants } from "framer-motion";

// One trigger for the whole list, not one per step — a per-item trigger fires
// as each step scrolls in, so the stagger delay never has anything to
// stagger against. Also fixes invalid markup: Reveal renders a div, and
// <ol><div><li> isn't valid HTML.
const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const step: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "We talk goals, audience, and what success looks like. I dig into your brand first, so the decisions later have something to stand on.",
  },
  {
    n: "02",
    title: "Design",
    body: "I shape the direction, layout, type and motion, and share it while it's still cheap to change.",
  },
  {
    n: "03",
    title: "Build",
    body: "Full-stack engineering: front-end, APIs, data, and any AI wired in. Faithful to the design, tested, and ready for real traffic.",
  },
  {
    n: "04",
    title: "Ship & Scale",
    body: "We deploy to production and set up monitoring, so you find out about problems before your users report them. I stay on after go-live.",
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

        <motion.ol
          className="md:col-span-7"
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {STEPS.map((s) => (
            <motion.li
              key={s.n}
              data-reveal
              variants={step}
              className="border-t border-bone/15 py-10 first:border-t-0 first:pt-0 md:py-12"
            >
              <span className="font-mono text-sm text-cobalt">{s.n}</span>
              <h3 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                {s.title}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-bone/70">
                {s.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
