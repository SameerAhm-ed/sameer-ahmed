import Reveal from "@/components/ui/Reveal";

// Placeholder wordmarks — swap for real client/brand logos (SVGs) later.
const LOGOS = ["Acme", "Nova", "Vertex", "Lumen", "Northwind", "Atlas"];

export default function Logos() {
  return (
    <section className="border-b border-line px-6 py-14 md:px-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-8 text-center font-mono text-xs uppercase tracking-widest text-stone">
            Trusted by ambitious teams
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
            {LOGOS.map((name) => (
              <li
                key={name}
                className="font-display text-2xl font-semibold tracking-tight text-ink/35 transition-colors duration-300 hover:text-ink md:text-3xl"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
