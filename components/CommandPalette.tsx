"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toggleTheme } from "@/lib/theme";

type Command = {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Actions" | "Elsewhere";
  keywords?: string;
  run: () => void;
};

const EMAIL = "sameer03054@gmail.com";

const go = (id: string) => () =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const open = (url: string) => () =>
  window.open(url, "_blank", "noopener,noreferrer");

/**
 * ⌘K palette. Hand-rolled rather than pulling in a combobox library: the whole
 * surface is one input and one list, and the keyboard contract is short enough
 * to own outright.
 */
export default function CommandPalette() {
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  // Where focus came from, so Escape can hand it back.
  const restoreTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    restoreTo.current?.focus();
  }, []);

  const commands = useMemo<Command[]>(
    () => [
      { id: "work", label: "Selected work", hint: "Section", group: "Navigate", run: go("work") },
      { id: "about", label: "About me", hint: "Section", group: "Navigate", keywords: "bio background experience", run: go("aboutme") },
      { id: "services", label: "What I do", hint: "Section", group: "Navigate", keywords: "services skills", run: go("services") },
      { id: "process", label: "Process", hint: "Section", group: "Navigate", keywords: "how we work", run: go("process") },
      { id: "activity", label: "Live GitHub activity", hint: "Section", group: "Navigate", keywords: "commits code", run: go("activity") },
      { id: "faq", label: "Questions & pricing", hint: "Section", group: "Navigate", keywords: "faq cost rates", run: go("faq") },
      { id: "contact", label: "Get in touch", hint: "Section", group: "Navigate", keywords: "hire email contact", run: go("contact") },

      {
        id: "copy",
        label: "Copy email address",
        hint: EMAIL,
        group: "Actions",
        keywords: "clipboard mail",
        run: async () => {
          try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            window.location.href = `mailto:${EMAIL}`;
          }
        },
      },
      { id: "mail", label: "Email me", hint: "Opens mail client", group: "Actions", keywords: "write message", run: () => { window.location.href = `mailto:${EMAIL}`; } },
      { id: "theme", label: "Toggle light / dark", hint: "Theme", group: "Actions", keywords: "dark mode colour color", run: () => toggleTheme() },

      { id: "github", label: "GitHub", hint: "github.com/SameerAhm-ed", group: "Elsewhere", keywords: "code repos", run: open("https://github.com/SameerAhm-ed") },
      { id: "linkedin", label: "LinkedIn", hint: "in/sameerahm-ed", group: "Elsewhere", keywords: "cv resume", run: open("https://www.linkedin.com/in/sameerahm-ed/") },
    ],
    []
  );

  // Subsequence match, so "gh" finds GitHub and "wrk" finds work.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => {
      const hay = `${c.label} ${c.keywords ?? ""} ${c.hint}`.toLowerCase();
      let i = 0;
      for (const ch of q) {
        i = hay.indexOf(ch, i);
        if (i === -1) return false;
        i += 1;
      }
      return true;
    });
  }, [commands, query]);

  // Open/close hotkeys live on the window so they work from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        restoreTo.current = document.activeElement as HTMLElement;
        setOpen((v) => !v);
        setQuery("");
        setActive(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const runAt = (i: number) => {
    const cmd = results[i];
    if (!cmd) return;
    // Close first: several commands scroll, and Lenis wants the overlay gone.
    close();
    setTimeout(cmd.run, 0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(active);
    }
  };

  let cursor = -1;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={close}
              aria-hidden
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ y: -8, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-bone shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-line px-5 py-4">
                <span aria-hidden className="font-mono text-xs text-cobalt">
                  ⌘
                </span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0); // new results, so start from the top again
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Jump to a section, copy my email…"
                  aria-label="Search commands"
                  aria-controls="command-list"
                  aria-activedescendant={
                    results[active] ? `cmd-${results[active].id}` : undefined
                  }
                  className="w-full bg-transparent text-base text-ink outline-none placeholder:text-stone"
                />
                <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase text-stone sm:block">
                  Esc
                </kbd>
              </div>

              <ul
                id="command-list"
                ref={listRef}
                role="listbox"
                aria-label="Commands"
                className="max-h-[52vh] overflow-y-auto p-2"
              >
                {results.length === 0 && (
                  <li className="px-3 py-6 text-center text-sm text-stone">
                    Nothing matches “{query}”.
                  </li>
                )}

                {(["Navigate", "Actions", "Elsewhere"] as const).map((group) => {
                  const inGroup = results.filter((c) => c.group === group);
                  if (!inGroup.length) return null;
                  return (
                    <li key={group}>
                      <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-stone">
                        {group}
                      </p>
                      <ul>
                        {inGroup.map((c) => {
                          cursor += 1;
                          const i = cursor;
                          const isActive = i === active;
                          return (
                            <li key={c.id}>
                              <button
                                id={`cmd-${c.id}`}
                                role="option"
                                aria-selected={isActive}
                                data-active={isActive}
                                onMouseEnter={() => setActive(i)}
                                onClick={() => runAt(i)}
                                className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left transition-colors ${
                                  isActive ? "bg-cobalt text-bone" : "text-ink"
                                }`}
                              >
                                <span className="text-sm font-medium">{c.label}</span>
                                <span
                                  className={`truncate font-mono text-[11px] ${
                                    isActive ? "text-bone/70" : "text-stone"
                                  }`}
                                >
                                  {c.hint}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation for the copy action, which otherwise gives no feedback. */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            role="status"
            className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-bone"
          >
            Email copied
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
