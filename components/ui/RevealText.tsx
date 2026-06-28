"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  className?: string;
  /** delay between words, seconds */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Splits text into words and reveals each one with a masked upward slide
 * as it scrolls into view. Falls back to plain visible text when reduced
 * motion is requested.
 */
export default function RevealText({
  text,
  className = "",
  stagger = 0.06,
  as = "h2",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as;
  const words = text.split(" ");

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const el = ref.current;
    if (!el || reduce) return;

    const inners = el.querySelectorAll("[data-word-inner]");
    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 110 });
      gsap.to(inners, {
        yPercent: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <Tag className={className}>
      <span ref={ref} className="inline">
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
          >
            <span data-word-inner className="inline-block will-change-transform">
              {word}
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}
