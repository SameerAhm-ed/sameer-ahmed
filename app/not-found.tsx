import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col justify-center px-6 py-28 md:px-10">
      <div className="mx-auto w-full max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-stone">
          (404)
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,9vw,7rem)] font-semibold leading-[0.95] tracking-tight text-ink">
          This one
          <br />
          <span className="text-cobalt">didn&apos;t ship.</span>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
          The page you were after isn&apos;t here. Everything that did make it
          to production is one link away.
        </p>
        <div className="mt-10 flex flex-wrap gap-6">
          <Link
            href="/"
            data-cursor="hover"
            className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-sm uppercase tracking-widest text-bone transition-colors hover:bg-cobalt"
          >
            Back home <span aria-hidden>→</span>
          </Link>
          <Link
            href="/#contact"
            data-cursor="hover"
            className="inline-flex items-center font-display text-xl underline underline-offset-8 transition-colors hover:text-cobalt"
          >
            Or just email me
          </Link>
        </div>
        <p className="mt-16 font-mono text-[11px] uppercase tracking-wider text-stone">
          Tip: press ⌘K anywhere on this site.
        </p>
      </div>
    </main>
  );
}
