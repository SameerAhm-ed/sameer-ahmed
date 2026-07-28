"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SECTIONS: { id: string; label: string }[] = [
  { id: "hero", label: "Intro" },
  { id: "aboutme", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "activity", label: "Activity" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  // The section list describes the home page. Anywhere else — a case study,
  // a 404 — the indicator would sit there claiming "01 — Intro".
  const hasSections = usePathname() === "/";

  // Progress bar: cheap scroll maths, rAF-throttled.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Active section: one IntersectionObserver instead of reading offsetTop for
  // every section on every scroll frame, which forced a synchronous reflow.
  useEffect(() => {
    const seen = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          seen.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        }
        // The section occupying most of the viewport wins.
        let bestIdx = 0;
        let bestRatio = -1;
        SECTIONS.forEach((s, i) => {
          const ratio = seen.get(s.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = i;
          }
        });
        if (bestRatio > 0) setActive(bestIdx);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* top progress line */}
      <div className="fixed inset-x-0 top-0 z-[55] h-[2px] bg-transparent">
        <div
          className="h-full origin-left bg-cobalt"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* current section indicator */}
      {hasSections && (
        <div className="fixed bottom-5 right-6 z-[55] mix-blend-difference md:bottom-7 md:right-10">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-white">
            <span className="text-cobalt">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-6 bg-white/50" />
            <span>{SECTIONS[active].label}</span>
          </div>
        </div>
      )}
    </>
  );
}
