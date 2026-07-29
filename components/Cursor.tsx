"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom blend-mode cursor: a small dot that grows and inverts over
 * interactive elements. Disabled on touch / coarse pointers and when
 * the user prefers reduced motion.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    // Only now does CSS hide the native cursor — see .has-custom-cursor
    document.body.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target;
      setHover(
        t instanceof Element &&
          !!t.closest("a, button, [data-cursor='hover']")
      );
    };

    const render = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", move);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full bg-white transition-[width,height] duration-300 ease-out"
      style={{
        mixBlendMode: "difference",
        width: hover ? 56 : 12,
        height: hover ? 56 : 12,
      }}
    />
  );
}
