"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";

// Placeholder catalogue — replace each entry with a real case study + image later.
const WORK = [
  {
    index: "01",
    name: "Case study",
    kind: "AI Platform",
    year: "Soon",
    grad: "linear-gradient(135deg, #2b36f0, #6b74ff)",
  },
  {
    index: "02",
    name: "Case study",
    kind: "Full-Stack App",
    year: "Soon",
    grad: "linear-gradient(135deg, #15140f, #2b36f0)",
  },
  {
    index: "03",
    name: "Case study",
    kind: "Cloud Product",
    year: "Soon",
    grad: "linear-gradient(135deg, #6b74ff, #e9e7df)",
  },
];

export default function Work() {
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 });

  // Cursor-follow preview (fine pointers only).
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    let raf = 0;
    const render = () => {
      const p = pos.current;
      p.cx += (p.x - p.cx) * 0.15;
      p.cy += (p.y - p.cy) * 0.15;
      if (preview.current) {
        preview.current.style.transform = `translate3d(${p.cx}px, ${p.cy}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(render);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="work" className="border-t border-line px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-6xl">
            Selected work
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-stone">
            (Index)
          </p>
        </Reveal>

        <ul onMouseLeave={() => setActive(null)}>
          {WORK.map((w, i) => (
            <Reveal key={w.index} delay={i * 0.06}>
              <li
                data-cursor="hover"
                onMouseEnter={() => setActive(i)}
                className="group grid grid-cols-12 items-center gap-4 border-t border-line py-7 transition-colors last:border-b hover:bg-bone-deep md:py-9"
              >
                <span className="col-span-2 font-mono text-xs text-stone md:text-sm">
                  {w.index}
                </span>
                <span className="col-span-6 font-display text-2xl font-medium text-ink transition-transform duration-300 group-hover:translate-x-2 md:col-span-5 md:text-4xl">
                  {w.name}
                </span>
                <span className="col-span-4 text-sm text-ink-soft md:col-span-3">
                  {w.kind}
                </span>
                <span className="col-span-12 mt-2 font-mono text-xs uppercase tracking-widest text-cobalt md:col-span-2 md:mt-0 md:text-right">
                  {w.year}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8">
          <p className="text-sm text-ink-soft">
            Real case studies are on the way. Want a closer look at past work in
            the meantime?{" "}
            <a
              href="#contact"
              data-cursor="hover"
              className="text-ink underline underline-offset-4 hover:text-cobalt"
            >
              Just ask.
            </a>
          </p>
        </Reveal>
      </div>

      {/* Floating cursor-follow preview */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-56 w-72 overflow-hidden rounded-xl shadow-2xl transition-[opacity,scale] duration-300 md:block"
        style={{
          opacity: active !== null ? 1 : 0,
          scale: active !== null ? "1" : "0.85",
        }}
      >
        {WORK.map((w, i) => (
          <div
            key={w.index}
            className="absolute inset-0 flex items-end p-5 transition-opacity duration-200"
            style={{ background: w.grad, opacity: active === i ? 1 : 0 }}
          >
            <span className="font-display text-lg font-medium text-bone mix-blend-difference">
              {w.kind}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
