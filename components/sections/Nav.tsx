"use client";

import LiveClock from "@/components/ui/LiveClock";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      {/* text-bone would track the theme token, but --bone flips to near-black
          in dark mode — the same value the hero background already sits at.
          A mix-blend-difference trick needs one fixed reference colour to
          invert against; theming it makes the nav invisible in dark mode. */}
      <nav className="flex items-center justify-between px-6 py-5 text-[#e9e7df] md:px-10">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          Sameer Ahmed
        </a>
        <span className="hidden items-center gap-2 font-mono text-xs uppercase tracking-widest sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cobalt opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cobalt" />
          </span>
          Available
          <span className="text-stone">/</span>
          <LiveClock />
        </span>
        <span className="flex items-center gap-5">
          <kbd className="hidden rounded border border-current/30 px-2 py-1 font-mono text-[10px] uppercase tracking-widest opacity-70 lg:block">
            ⌘K
          </kbd>
          <ThemeToggle />
          <a
            href="#contact"
            data-cursor="hover"
            className="font-mono text-xs uppercase tracking-widest underline-offset-4 hover:underline"
          >
            Get in touch
          </a>
        </span>
      </nav>
    </header>
  );
}
