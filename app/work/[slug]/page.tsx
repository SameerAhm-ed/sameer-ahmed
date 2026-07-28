import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WORK, bySlug } from "@/lib/work";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = bySlug(slug);
  if (!study) return {};
  // Without its own url/canonical, each case study inherits the root
  // OpenGraph block and advertises the home page instead of itself — so a
  // shared case-study link previews as "/". Relative paths resolve against
  // metadataBase in app/layout.tsx.
  const path = `/work/${study.slug}`;
  return {
    title: `${study.name} — Sameer Ahmed`,
    description: study.kind,
    alternates: { canonical: path },
    openGraph: {
      title: `${study.name} — Sameer Ahmed`,
      description: study.kind,
      url: path,
      type: "article",
    },
  };
}

export default async function WorkDetail({ params }: Props) {
  const { slug } = await params;
  const study = bySlug(slug);
  if (!study) notFound();

  return (
    <main className="px-6 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36">
      <article className="mx-auto max-w-3xl">
        <Reveal>
          <Link
            href="/#work"
            data-cursor="hover"
            className="font-mono text-xs uppercase tracking-widest text-stone underline-offset-4 hover:text-cobalt hover:underline"
          >
            ← All work
          </Link>
        </Reveal>

        <RevealText
          as="h1"
          text={study.name}
          className="mt-8 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-7xl"
          stagger={0.05}
        />

        <Reveal delay={0.05}>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">
            {study.kind}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-8 sm:grid-cols-4">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-stone">
                Role
              </dt>
              <dd className="mt-1 text-sm font-medium text-ink">{study.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-stone">
                Year
              </dt>
              <dd className="mt-1 text-sm font-medium text-ink">{study.year}</dd>
            </div>
            <div className="col-span-2">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-stone">
                Stack
              </dt>
              <dd className="mt-1 text-sm font-medium text-ink">
                {study.stack.join(" · ")}
              </dd>
            </div>
          </dl>
        </Reveal>

        {(study.href || study.repo) && (
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap gap-3">
              {study.href && (
                <a
                  href={study.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-bone transition-colors hover:bg-cobalt"
                >
                  Live site <span aria-hidden>↗</span>
                </a>
              )}
              {study.repo && (
                <a
                  href={study.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-cobalt hover:text-cobalt"
                >
                  Source <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </Reveal>
        )}

        {study.outcome && (
          <Reveal delay={0.15}>
            <p className="mt-12 font-display text-2xl font-medium leading-snug text-cobalt md:text-4xl">
              {study.outcome}
            </p>
          </Reveal>
        )}

        {study.sections.map((s, i) => (
          <Reveal key={s.heading} delay={0.05 * i}>
            <section className="mt-12">
              <h2 className="font-display text-xl font-medium text-ink md:text-2xl">
                {s.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft md:text-lg">
                {s.body}
              </p>
            </section>
          </Reveal>
        ))}

        <Reveal>
          <div className="mt-20 border-t border-line pt-8">
            <Link
              href="/#contact"
              data-cursor="hover"
              className="font-display text-2xl underline underline-offset-8 transition-colors hover:text-cobalt md:text-3xl"
            >
              Want something like this? →
            </Link>
          </div>
        </Reveal>
      </article>
    </main>
  );
}
