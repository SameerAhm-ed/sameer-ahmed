"use client";

import { useEffect, useState } from "react";

const SECTIONS: { id: string; label: string }[] = [
  { id: "hero", label: "Intro" },
  { id: "aboutme", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "testimonials", label: "Clients" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);

      const probe = window.scrollY + window.innerHeight * 0.4;
      let current = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= probe) current = i;
      });
      setActive(current);
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
      <div className="fixed bottom-5 right-6 z-[55] mix-blend-difference md:bottom-7 md:right-10">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-white">
          <span className="text-cobalt">
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-6 bg-white/50" />
          <span>{SECTIONS[active].label}</span>
        </div>
      </div>
    </>
  );
}
