"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Konami code flips the site into "blueprint" mode — every box outlined, the
 * way it looks in devtools. Audience is developers; this is the joke they get.
 */
export default function EasterEgg() {
  const [on, setOn] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    console.log(
      "%cBuilt by Sameer Ahmed",
      "font-size:14px;font-weight:bold;color:#2b36f0"
    );
    console.log(
      "%cSince you're in here — press ⌘K, or try ↑↑↓↓←→←→BA.",
      "color:#686355"
    );
  }, []);

  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      // Don't swallow keystrokes meant for the palette's search field.
      if (e.target instanceof HTMLInputElement) return;
      i = e.key.toLowerCase() === KONAMI[i].toLowerCase() ? i + 1 : 0;
      if (i === KONAMI.length) {
        i = 0;
        setOn((v) => !v);
        setToast(true);
        setTimeout(() => setToast(false), 2600);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("blueprint", on);
  }, [on]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          role="status"
          className="fixed bottom-20 left-1/2 z-[95] -translate-x-1/2 whitespace-nowrap rounded-full border border-cobalt bg-bone px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-cobalt"
        >
          Blueprint mode {on ? "on" : "off"}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
