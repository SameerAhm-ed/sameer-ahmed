"use client";

/**
 * Light/dark switch. Deliberately stateless: the current theme already lives on
 * <html data-theme>, put there before first paint by the init script in
 * layout.tsx, and CSS picks which glyph to show. Mirroring it into React state
 * would only add a hydration-order problem to solve.
 */
import { toggleTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const toggle = () => toggleTheme();

  return (
    <button
      onClick={toggle}
      data-cursor="hover"
      aria-label="Switch colour theme"
      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-current/30 transition-opacity hover:opacity-60"
    >
      <span aria-hidden className="text-[13px] leading-none" data-theme-icon />
    </button>
  );
}
