"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";

const USER = "SameerAhm-ed";
const DAYS = 21;

type Event = {
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: { commits?: unknown[]; action?: string; ref_type?: string };
};

type Shaped = {
  repo: string;
  what: string;
  when: string;
  href: string;
};

const VERB: Record<string, string> = {
  PushEvent: "pushed to",
  PullRequestEvent: "opened a PR on",
  CreateEvent: "created",
  DeleteEvent: "cleaned up",
  IssuesEvent: "filed an issue on",
  IssueCommentEvent: "commented on",
  WatchEvent: "starred",
  ForkEvent: "forked",
  ReleaseEvent: "released",
};

function ago(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  const d = Math.floor(s / 86400);
  return d === 1 ? "yesterday" : `${d}d ago`;
}

export default function Activity() {
  const [events, setEvents] = useState<Shaped[] | null>(null);
  const [buckets, setBuckets] = useState<number[]>([]);
  // Bars are commit-weighted so the shape is interesting; the headline count is
  // raw events, because that's what the label claims it is.
  const [count, setCount] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctl = new AbortController();

    fetch(`https://api.github.com/users/${USER}/events/public?per_page=100`, {
      signal: ctl.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => {
        // Unauthenticated GitHub is rate-limited per IP; treat that as "no data"
        // rather than an error state shouted at the visitor.
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((raw: Event[]) => {
        const days = new Array(DAYS).fill(0);
        let raw_in_window = 0;
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        for (const e of raw) {
          const diff = Math.floor(
            (start.getTime() - new Date(e.created_at).setHours(0, 0, 0, 0)) /
              86400000
          );
          if (diff >= 0 && diff < DAYS) {
            const weight = e.type === "PushEvent" ? e.payload?.commits?.length || 1 : 1;
            days[DAYS - 1 - diff] += weight;
            raw_in_window += 1;
          }
        }
        setBuckets(days);
        setCount(raw_in_window);

        setEvents(
          raw.slice(0, 5).map((e) => ({
            repo: e.repo.name.replace(`${USER}/`, ""),
            what: VERB[e.type] ?? "worked on",
            when: ago(e.created_at),
            href: `https://github.com/${e.repo.name}`,
          }))
        );
      })
      .catch((err) => {
        if (err.name !== "AbortError") setFailed(true);
      });

    return () => ctl.abort();
  }, []);

  // Nothing to show and no way to get it — don't render an empty shell.
  if (failed) return null;

  const peak = Math.max(1, ...buckets);

  return (
    <section
      id="activity"
      className="border-t border-line px-6 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-stone">
              (Live from GitHub)
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-5xl">
              Still building, today.
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-stone">
            {events ? `${count} events · last ${DAYS} days` : "Fetching…"}
          </p>
        </Reveal>

        {/* Activity strip */}
        <Reveal delay={0.05}>
          <ul
            className="flex items-end gap-1.5"
            aria-label={`GitHub activity for the last ${DAYS} days`}
          >
            {(buckets.length ? buckets : new Array(DAYS).fill(0)).map((v, i) => (
              <li
                key={i}
                title={`${v} event${v === 1 ? "" : "s"}`}
                className="flex-1 rounded-sm bg-cobalt transition-[height,opacity] duration-500"
                style={{
                  height: `${12 + (v / peak) * 56}px`,
                  opacity: v ? 0.25 + (v / peak) * 0.75 : 0.12,
                }}
              />
            ))}
          </ul>
        </Reveal>

        {/* Recent events */}
        <Reveal delay={0.1}>
          <ul className="mt-10 border-t border-line">
            {(events ?? new Array(3).fill(null)).map((e, i) => (
              <li key={i} className="border-b border-line">
                {e ? (
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-cobalt"
                  >
                    <span className="text-sm text-ink-soft md:text-base">
                      {e.what}{" "}
                      <span className="font-medium text-ink transition-colors group-hover:text-cobalt">
                        {e.repo}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-stone">
                      {e.when}
                    </span>
                  </a>
                ) : (
                  <div className="py-4">
                    <span className="block h-4 w-2/3 animate-pulse rounded bg-bone-deep" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
