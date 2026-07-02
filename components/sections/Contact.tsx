import MagneticButton from "@/components/ui/MagneticButton";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";

const EMAIL = "sameer03054@gmail.com";
// No booking tool yet → "Book a call" opens a pre-filled email.
// Swap CALENDLY for a real scheduling URL (e.g. Calendly) when you have one.
const CALENDLY = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Project inquiry — let's talk"
)}`;
const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sameerahm-ed/" },
  { label: "Email", href: `mailto:${EMAIL}` },
];

export default function Contact() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-ink px-6 pb-12 pt-28 text-bone md:px-10 md:pt-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 hidden h-[40vw] w-[40vw] rounded-full bg-cobalt opacity-30 blur-[110px] md:block"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-8 font-mono text-xs uppercase tracking-widest text-stone">
          (Let&apos;s work together)
        </p>

        <RevealText
          as="h2"
          text="Got something to build?"
          className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-bone md:text-8xl"
          stagger={0.05}
        />

        <Reveal className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
          <MagneticButton
            href={CALENDLY}
            className="bg-cobalt text-bone hover:bg-bone hover:text-ink"
          >
            Book a call
            <span aria-hidden>→</span>
          </MagneticButton>
          <a
            href={`mailto:${EMAIL}`}
            data-cursor="hover"
            className="font-display text-2xl text-bone underline underline-offset-8 transition-colors hover:text-cobalt md:text-3xl"
          >
            {EMAIL}
          </a>
        </Reveal>

        <div className="mt-24 flex flex-col justify-between gap-8 border-t border-bone/15 pt-8 text-sm text-stone md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Sameer Ahmed. All rights reserved.</span>
          <ul className="flex flex-wrap gap-6">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-cursor="hover"
                  className="font-mono text-xs uppercase tracking-widest text-bone/80 underline-offset-4 hover:text-cobalt hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
