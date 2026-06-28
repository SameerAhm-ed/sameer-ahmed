"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "We talk goals, audience, and what success looks like. I dig into your brand so the work is built on substance, not guesswork.",
  },
  {
    n: "02",
    title: "Design",
    body: "I shape the direction — layout, type, motion — and share work early and often so you're never surprised by the result.",
  },
  {
    n: "03",
    title: "Build",
    body: "Full-stack engineering — front-end, APIs, data, and any AI wired in. Pixel-faithful, tested, and built to scale.",
  },
  {
    n: "04",
    title: "Ship & Scale",
    body: "We deploy to production, set up monitoring, and make it fast and reliable. I stay on to help it grow after go-live.",
  },
];

export default function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (reduce || !desktop) return; // mobile/reduced → vertical stack (CSS)

    const ctx = gsap.context(() => {
      const t = track.current!;
      const panels = gsap.utils.toArray<HTMLElement>(".process-panel");
      gsap.to(t, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + t.offsetWidth,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="process"
      className="overflow-hidden border-t border-line bg-ink text-bone"
    >
      <div
        ref={track}
        className="flex flex-col md:h-screen md:flex-row md:flex-nowrap"
      >
        {/* Intro panel */}
        <div className="process-panel flex shrink-0 flex-col justify-center px-6 py-20 md:h-screen md:w-screen md:px-10">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-stone">
            (How we work)
          </p>
          <h2 className="max-w-2xl font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
            A simple, calm process.
          </h2>
          <p className="mt-6 max-w-md text-bone/60 md:text-lg">
            Four steps, no chaos. Here&apos;s how a project goes from first call
            to launch.
          </p>
          <p className="mt-10 hidden font-mono text-xs uppercase tracking-widest text-stone md:block">
            Scroll →
          </p>
        </div>

        {STEPS.map((s) => (
          <div
            key={s.n}
            className="process-panel flex shrink-0 flex-col justify-center border-t border-bone/10 px-6 py-20 md:h-screen md:w-screen md:border-l md:border-t-0 md:px-10"
          >
            <span className="font-mono text-sm text-cobalt">{s.n}</span>
            <h3 className="mt-6 font-display text-5xl font-semibold tracking-tight md:text-8xl">
              {s.title}
            </h3>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-bone/70">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
