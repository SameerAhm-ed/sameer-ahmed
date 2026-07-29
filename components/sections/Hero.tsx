"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroShader from "@/components/ui/HeroShader";

const ROTATING = ["win customers", "scale", "ship fast", "convert"];

const lines: Variants = {
  hidden: { y: "120%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [word, setWord] = useState(0);
  const [started, setStarted] = useState(false);

  // Parallax drift of the accent layer, tied to this section's scroll range.
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  // Hold the reveal until the intro overlay lifts. The timeout is a safety net:
  // if the preloader ever fails to fire `intro:done`, the headline would
  // otherwise stay off-screen — i.e. a blank hero. Never let the intro gate
  // the content.
  useEffect(() => {
    if ((window as typeof window & { __introDone?: boolean }).__introDone) {
      setStarted(true);
      return;
    }
    const start = () => setStarted(true);
    window.addEventListener("intro:done", start, { once: true });
    const failsafe = window.setTimeout(start, 3000);
    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener("intro:done", start);
    };
  }, []);

  // Rotating word
  useEffect(() => {
    const id = setInterval(
      () => setWord((w) => (w + 1) % ROTATING.length),
      2200
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pt-28"
    >
      {/* Accent: WebGL aurora on desktop, cheap CSS gradient on mobile */}
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute inset-0">
          <HeroShader />
        </div>
        <div
          className="absolute right-0 top-0 h-[80vw] w-[80vw] md:hidden"
          style={{
            background:
              "radial-gradient(circle at 75% 25%, color-mix(in srgb, var(--cobalt) 18%, transparent), transparent 60%)",
          }}
        />
      </motion.div>

      {/* Headline */}
      <div className="relative z-10">
        <h1 className="font-display font-semibold leading-[0.92] tracking-tight text-ink">
          {["I build software", "products that"].map((line, i) => (
            <span
              key={line}
              className="block overflow-hidden text-[clamp(2.5rem,9.2vw,8rem)]"
            >
              <motion.span
                data-reveal
                className="inline-block will-change-transform"
                variants={lines}
                custom={i}
                initial="hidden"
                animate={started ? "show" : "hidden"}
              >
                {line}
              </motion.span>
            </span>
          ))}
          {/* Screen readers get one stable sentence; the rotating stack is decorative. */}
          <span className="sr-only">win customers.</span>
          <span
            aria-hidden
            className="mt-1 flex items-baseline text-[clamp(2.5rem,9.2vw,8rem)] text-cobalt"
          >
            <span className="relative inline-block h-[1.05em] overflow-hidden align-bottom leading-[1.05]">
              <motion.span
                className="flex flex-col"
                animate={{ y: `-${word * 1.05}em` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {ROTATING.map((w) => (
                  <span
                    key={w}
                    className="block h-[1.05em] whitespace-nowrap leading-[1.05]"
                  >
                    <span className="word-mask">{w}</span>
                    <span className="text-ink">.</span>
                  </span>
                ))}
              </motion.span>
            </span>
          </span>
        </h1>
      </div>

      {/* Bottom row: intro + CTA */}
      <div className="relative z-10 mt-10 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
        <motion.p
          data-reveal
          variants={fade}
          custom={0}
          initial="hidden"
          animate={started ? "show" : "hidden"}
          className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg"
        >
          Sameer Ahmed, full-stack engineer. I build AI-powered products end to
          end, from first idea to production, for teams who need it shipped
          right.
        </motion.p>
        <motion.div
          data-reveal
          variants={fade}
          custom={1}
          initial="hidden"
          animate={started ? "show" : "hidden"}
          className="flex flex-col items-start gap-3 md:items-end"
        >
          <MagneticButton href="#contact">
            Book a call
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </MagneticButton>
          <p className="font-mono text-[11px] uppercase tracking-wider text-stone">
            Free 20-min call · usually replies within a day
          </p>
        </motion.div>
      </div>
    </section>
  );
}
