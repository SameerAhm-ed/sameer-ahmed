"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { WORK } from "@/lib/work";

const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

// Rows slide in from the left, echoing the direction they travel on hover.
const row: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Work() {
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 });

  // Cursor-follow preview (fine pointers only). The rAF loop and the mousemove
  // listener only exist while a row is actually hovered — previously both ran
  // for the lifetime of the page, at 60fps, showing nothing.
  useEffect(() => {
    if (active === null) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    // Start where the pointer already is, so the panel eases out from under the
    // cursor rather than flying in from wherever it was left last time.
    pos.current.cx = pos.current.x;
    pos.current.cy = pos.current.y;

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
  }, [active]);

  // Deliberately the roomiest section on the page — it's the one that matters
  // most, and density is how a page signals that.
  return (
    <section id="work" className="border-t border-line px-6 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-semibold tracking-tight text-ink md:text-8xl">
            Selected work
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-stone">
            (Index)
          </p>
        </Reveal>

        {/* One trigger for the whole list, not one per row. Per-row triggers
            fire as each row scrolls in, so the rows just fade independently and
            the stagger is never visible. */}
        <motion.ul
          onMouseLeave={() => setActive(null)}
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          {WORK.map((w, i) => (
            <motion.li
              key={w.slug}
              data-reveal
              variants={row}
              className="border-t border-line last:border-b"
            >
                <Link
                  href={`/work/${w.slug}`}
                  data-cursor="hover"
                  onMouseEnter={(e) => {
                    pos.current.x = e.clientX;
                    pos.current.y = e.clientY;
                    setActive(i);
                  }}
                  className="group grid grid-cols-12 items-center gap-4 py-7 transition-colors hover:bg-bone-deep md:py-9"
                >
                  <span className="col-span-2 font-mono text-xs text-stone md:text-sm">
                    {String(i + 1).padStart(2, "0")}
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
                </Link>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal className="mt-10">
          <p className="max-w-lg text-base text-ink-soft">
            Every one of these is source-available — read the code, or{" "}
            <a
              href="#contact"
              data-cursor="hover"
              className="text-ink underline underline-offset-4 hover:text-cobalt"
            >
              ask me to walk you through one
            </a>
            .
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
            key={w.slug}
            className="absolute inset-0 transition-opacity duration-200"
            style={{ background: w.grad, opacity: active === i ? 1 : 0 }}
          >
            {w.image && (
              <Image
                src={w.image}
                alt=""
                fill
                sizes="288px"
                // Eager: the card sits behind an opacity-0 parent, so lazy
                // loading never fires and the preview flashes empty the first
                // time it's hovered. They're ~40 KB each.
                loading="eager"
                // Screenshots are wider or taller than the card, so the top-left
                // is what gets kept: that's where the interface identifies itself.
                className="object-cover object-left-top"
              />
            )}
            {/* The label sits on the screenshot, so it needs its own contrast
                rather than relying on whatever pixels are underneath — fixed
                colours, not ink/bone, since those flip in dark mode and
                inverted to a dark label on a light scrim. */}
            <div
              className="absolute inset-0 flex items-end p-5"
              style={{
                background:
                  "linear-gradient(to top, rgba(21,20,15,0.85), rgba(21,20,15,0.2) 55%, transparent)",
              }}
            >
              <span className="font-display text-lg font-medium text-[#e9e7df]">
                {w.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
