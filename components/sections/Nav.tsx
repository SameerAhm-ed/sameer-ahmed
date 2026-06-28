"use client";

import LiveClock from "@/components/ui/LiveClock";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav className="flex items-center justify-between px-6 py-5 text-bone md:px-10">
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
        <a
          href="#contact"
          data-cursor="hover"
          className="font-mono text-xs uppercase tracking-widest underline-offset-4 hover:underline"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
