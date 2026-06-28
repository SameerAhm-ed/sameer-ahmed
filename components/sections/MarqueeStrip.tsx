import Marquee from "@/components/ui/Marquee";

// Core stack — adjust to match exactly what you want to lead with.
const SKILLS = [
  "AI Agents",
  "RAG",
  "LLM Apps",
  "Next.js",
  "TypeScript",
  "Node & APIs",
  "PostgreSQL",
  "AWS / Vercel",
  "React",
  "Automation",
  "Design Systems",
];

export default function MarqueeStrip() {
  return (
    <section className="border-y border-line bg-ink py-5 text-bone">
      <Marquee
        items={SKILLS}
        duration={34}
        className="font-display text-2xl font-medium md:text-4xl"
      />
    </section>
  );
}
