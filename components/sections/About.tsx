import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-10 font-mono text-xs uppercase tracking-widest text-stone">
            (Approach)
          </p>
        </Reveal>
        <RevealText
          as="h2"
          text="I treat every project like it carries my name — because it does. Product thinking, full-stack engineering, and AI built in, all under one roof — so nothing gets lost between idea and launch."
          className="font-display text-3xl font-medium leading-[1.15] tracking-tight text-ink md:text-5xl"
          stagger={0.04}
        />
      </div>
    </section>
  );
}
