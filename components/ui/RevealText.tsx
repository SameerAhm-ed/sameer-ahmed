"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  /** delay between words, seconds */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Splits text into words and reveals each with a masked upward slide as it
 * scrolls into view. Was GSAP + ScrollTrigger; Framer Motion already ships in
 * this bundle and does the same job with variants.
 */
export default function RevealText({
  text,
  className = "",
  stagger = 0.06,
  as = "h2",
}: Props) {
  const Tag = motion[as];
  const words = text.split(" ");

  // `initial` must not branch on this — the server can't know the preference,
  // and diverging here is a hydration mismatch. Collapse the durations instead:
  // the words still land in place, they just don't travel.
  const reduce = useReducedMotion();

  return (
    <Tag
      className={className}
      variants={container}
      custom={reduce ? 0 : stagger}
      initial="hidden"
      whileInView="show"
      transition={reduce ? { duration: 0 } : undefined}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      {words.map((w, i) => (
        // The separator sits BETWEEN the masks, not inside one: a trailing
        // space within an inline-block is collapsed, which ran every heading
        // together into one word.
        <Fragment key={i}>
          <span
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
          >
            <motion.span
              data-reveal
              variants={word}
              className="inline-block will-change-transform"
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
