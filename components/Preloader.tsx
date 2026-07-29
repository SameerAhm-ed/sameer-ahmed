"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Full-screen intro: a 0→100 counter, then the panel wipes upward to reveal
 * the page. Dispatches `intro:done` (and sets window.__introDone) so the hero
 * reveal plays as the panel lifts. Plays unconditionally, including for
 * reduced-motion users — this is a deliberate one-time brand moment, not
 * ambient decoration, and was chosen knowingly over the usual accessibility
 * default of skipping it.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  // When we're skipping the intro we unmount outright rather than letting
  // AnimatePresence play an exit, which would otherwise slide a second time
  // for no reason on a repeat load.
  const [skip, setSkip] = useState(false);

  const finish = () => {
    (window as typeof window & { __introDone?: boolean }).__introDone = true;
    window.dispatchEvent(new Event("intro:done"));
  };

  useEffect(() => {
    // Show the intro once per session. Making a returning visitor sit through
    // it again is a tax, not a delight.
    const seen = sessionStorage.getItem("intro:seen");

    if (seen) {
      setSkip(true);
      setShow(false);
      finish();
      return;
    }
    sessionStorage.setItem("intro:seen", "1");

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

  // Bail out above AnimatePresence, not inside it — a repeat load should never
  // show or animate the panel at all, not even its exit slide.
  if (skip) return null;

  return (
    <>
      {/* The overlay ships in the SSR HTML, so without JS it would cover the
          page forever. Hide it when scripting is unavailable. */}
      <noscript>
        <style>{`[data-preloader]{display:none !important}`}</style>
      </noscript>
      <AnimatePresence
        onExitComplete={() => {
          document.body.style.overflow = "";
        }}
      >
      {show && (
        <motion.div
          data-preloader
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
    </>
  );
}
