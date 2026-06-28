"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import HeroShader from "@/components/ui/HeroShader";

gsap.registerPlugin(ScrollTrigger);

const ROTATING = ["win customers", "scale", "ship fast", "convert"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const blob = useRef<HTMLDivElement>(null);
  const [word, setWord] = useState(0);

  // Load-in timeline + scroll parallax
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const el = root.current;
    if (!el) return;

    let cleanupStart: (() => void) | undefined;

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.set("[data-hero-line] > span", { yPercent: 120 });
        const tl = gsap.timeline({ paused: true });
        tl.to("[data-hero-line] > span", {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.12,
        }).from(
          "[data-hero-fade]",
          { opacity: 0, y: 20, duration: 0.8, stagger: 0.12, ease: "power2.out" },
          "-=0.5"
        );

        // Play the reveal as the intro overlay lifts (or immediately if no intro)
        const start = () => tl.play();
        if (
          (window as typeof window & { __introDone?: boolean }).__introDone
        ) {
          start();
        } else {
          window.addEventListener("intro:done", start, { once: true });
          cleanupStart = () => window.removeEventListener("intro:done", start);
        }

        // Parallax drift of the accent layer
        gsap.to(blob.current, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, el);

    return () => {
      cleanupStart?.();
      ctx.revert();
    };
  }, []);

  // Rotating word
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;
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
      <div ref={blob} aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0">
          <HeroShader />
        </div>
        <div
          className="absolute right-0 top-0 h-[80vw] w-[80vw] md:hidden"
          style={{
            background:
              "radial-gradient(circle at 75% 25%, rgba(43,54,240,0.18), transparent 60%)",
          }}
        />
      </div>

      {/* Headline */}
      <div className="relative z-10">
        <h1 className="font-display font-semibold leading-[0.92] tracking-tight text-ink">
          <span
            data-hero-line
            className="block overflow-hidden text-[13vw] md:text-[9.2vw]"
          >
            <span className="inline-block will-change-transform">
              I build software
            </span>
          </span>
          <span
            data-hero-line
            className="block overflow-hidden text-[13vw] md:text-[9.2vw]"
          >
            <span className="inline-block will-change-transform">
              products that
            </span>
          </span>
          <span className="mt-1 flex items-baseline text-[13vw] text-cobalt md:text-[9.2vw]">
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
        <p
          data-hero-fade
          className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg"
        >
          Sameer Ahmed — a full-stack engineer building modern, AI-powered
          products end to end. From first idea to production, for teams who need
          it shipped right.
        </p>
        <div data-hero-fade className="flex flex-col items-start gap-3 md:items-end">
          <MagneticButton href="#contact">
            Book a call
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </MagneticButton>
          <p className="font-mono text-[11px] uppercase tracking-wider text-stone">
            Free 20-min call · usually replies within a day
          </p>
        </div>
      </div>
    </section>
  );
}
