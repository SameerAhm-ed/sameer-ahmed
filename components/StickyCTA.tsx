"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Always-available "Book a call" pill. Fades in after the hero scrolls away
 * and hides again while the contact section (which has its own CTA) is in view.
 */
export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const contact = document.getElementById("contact");
    let heroVisible = true;
    let contactVisible = false;

    const sync = () => setShow(!heroVisible && !contactVisible);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target.id === "hero") heroVisible = e.isIntersecting;
          if (e.target.id === "contact") contactVisible = e.isIntersecting;
        }
        sync();
      },
      { threshold: 0.15 }
    );

    if (hero) io.observe(hero);
    if (contact) io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#contact"
          data-cursor="hover"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="cta-glow group fixed bottom-5 left-1/2 z-[56] inline-flex -translate-x-1/2 items-center gap-2 overflow-hidden rounded-full bg-cobalt px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-bone shadow-xl md:bottom-7"
        >
          <span className="cta-shine" aria-hidden />
          <span className="relative z-10 inline-flex items-center gap-2">
            Book a call
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
