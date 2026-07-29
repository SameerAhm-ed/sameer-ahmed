"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const FAQS = [
  {
    q: "How do we get started?",
    a: "Book a quick call or send a message. We'll talk through your goals, scope, and timeline, then I'll send a proposal with fixed pricing.",
  },
  {
    q: "What are your typical timelines?",
    a: "A focused web app or AI feature is usually 2–4 weeks. Full products run 4–8 weeks depending on scope. I'll give you a firm schedule before we begin.",
  },
  {
    q: "Can you build AI features?",
    a: "Yes. I build LLM apps, chatbots, and agents, with RAG over your own data and integrations with models like Claude or GPT. They ship with evals, so you can see when one breaks.",
  },
  {
    q: "How does pricing work?",
    a: "Most projects are fixed-price, quoted upfront so there are no surprises. For ongoing work I also offer monthly retainers.",
  },
  {
    q: "What do you need from me?",
    a: "I need your goals, access to anything relevant, and timely feedback at the review points. I handle architecture, build, and launch.",
  },
  {
    q: "Do you offer revisions and support?",
    a: "Yes. Every project includes review rounds, and I stay available after launch for the bugs that only show up once real people are using it.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  // Tight on purpose: reference material, not a headline moment.
  return (
    <section id="faq" className="border-t border-line px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-4">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-cobalt">
            (For project work)
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-6xl">
            Questions, answered
          </h2>
          <p className="mt-5 max-w-xs text-sm text-ink-soft">
            Scope, timelines and pricing for freelance projects. Hiring for a
            role instead?{" "}
            <a
              href="#aboutme"
              data-cursor="hover"
              className="text-ink underline underline-offset-4 hover:text-cobalt"
            >
              Start here
            </a>
            .
          </p>
        </Reveal>

        <div className="md:col-span-8">
          <ul className="border-t border-line">
            {FAQS.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={i} className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    data-cursor="hover"
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl font-medium text-ink md:text-2xl">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 text-2xl text-cobalt transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 text-base leading-relaxed text-ink-soft">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
