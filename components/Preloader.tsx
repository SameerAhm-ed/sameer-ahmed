"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Full-screen intro: a 0→100 counter, then the panel wipes upward to reveal
 * the page. Dispatches `intro:done` (and sets window.__introDone) so the hero
 * reveal plays as the panel lifts. Reduced-motion users skip straight to done.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  const finish = () => {
    (window as typeof window & { __introDone?: boolean }).__introDone = true;
    window.dispatchEvent(new Event("intro:done"));
  };

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      setShow(false);
      finish();
      return;
    }

    // lock scroll during intro
    document.body.style.overflow = "hidden";

    const duration = 1400;
    const startT = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - startT) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // fire reveal as the panel begins to lift
        finish();
        setTimeout(() => setShow(false), 50);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
      }}
    >
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-6 text-bone md:px-10 md:py-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-stone">
            <span>Sameer Ahmed</span>
            <span>Portfolio ’26</span>
          </div>

          <div className="flex items-end justify-between">
            <span className="font-display text-[22vw] font-semibold leading-none tracking-tight text-bone md:text-[12vw]">
              {count}
            </span>
            <span className="mb-3 font-mono text-sm text-cobalt md:mb-6">
              %
            </span>
          </div>

          <div className="h-px w-full origin-left bg-bone/20">
            <motion.div
              className="h-full bg-cobalt"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
