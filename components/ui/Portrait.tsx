"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * The portrait is a cut-out standing directly on the page — no panel, no frame.
 * A shadow and a grounding line are the only things placing it.
 */
export default function Portrait() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const figureY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <div
      ref={ref}
      className="relative mx-auto flex aspect-[4/5] w-full max-w-[380px] items-end justify-center md:max-w-none"
    >
      {/* The transform is applied unconditionally — branching it on a motion
          preference the server can't know is a hydration mismatch. CSS
          neutralises it for reduced-motion users instead. */}
      <motion.div
        data-parallax
        style={{ y: figureY }}
        className="relative w-full max-w-[440px]"
      >
        <Image
          src="/sameer-cutout.webp"
          alt="Sameer Ahmed"
          width={845}
          height={886}
          sizes="(max-width: 768px) 86vw, 440px"
          className="portrait-fig h-auto w-full origin-bottom object-contain drop-shadow-[0_34px_60px_rgba(21,20,15,0.28)] transition-transform duration-700 ease-out hover:scale-[1.02]"
          // The source is a bust crop, so it ends abruptly at the chest. Fading
          // the last stretch turns a hard cut into a deliberate one.
          style={{
            maskImage:
              "linear-gradient(to bottom, #000 76%, rgba(0,0,0,0.35) 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 76%, rgba(0,0,0,0.35) 92%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Grounding line, so the figure reads as standing on something */}
      <div
        aria-hidden
        className="absolute inset-x-[4%] bottom-[4%] h-px bg-gradient-to-r from-transparent via-line to-transparent"
      />
    </div>
  );
}
