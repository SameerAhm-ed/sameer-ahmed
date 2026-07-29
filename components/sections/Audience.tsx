"use client";

import { motion, type Variants } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

// One trigger for both cards, not one each — on mobile they stack and a
// per-card trigger fires as each individually scrolls in, same dead-stagger
// bug as the other lists on this page.
const gridStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

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
    body: "Scope, timelines, and pricing for project work, plus what I take on and how a project runs.",
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
        <motion.div
          className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2"
          variants={gridStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {TRACKS.map((t) => (
            <motion.a
              key={t.href}
              href={t.href}
              data-reveal
              data-cursor="hover"
              variants={card}
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
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
