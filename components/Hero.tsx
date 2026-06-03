"use client";

import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center px-5 pt-28 text-center">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="bg-aura pointer-events-none absolute inset-0" />

      <motion.div
        custom={0}
        variants={fade}
        initial="hidden"
        animate="show"
        className="z-10 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-xs text-fog backdrop-blur"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-up" />
        Live on the Base chain
      </motion.div>

      <motion.h1
        custom={1}
        variants={fade}
        initial="hidden"
        animate="show"
        className="z-10 mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl"
      >
        <span className="text-gradient">Your AI co-pilot</span>
        <br />
        for <span className="text-up">Base.</span> Everything{" "}
        <span className="italic">uponly.</span>
      </motion.h1>

      <motion.p
        custom={2}
        variants={fade}
        initial="hidden"
        animate="show"
        className="z-10 mt-6 max-w-xl text-balance text-base text-fog sm:text-lg"
      >
        Ask anything about wallets, tokens and transactions in plain language.
        uponly reads the chain in real time and answers — no block explorers, no
        spreadsheets.
      </motion.p>

      <motion.div
        custom={3}
        variants={fade}
        initial="hidden"
        animate="show"
        className="z-10 mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href="#chat"
          className="rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
        >
          Start chatting →
        </a>
        <a
          href="#features"
          className="rounded-full border border-line px-6 py-3 text-sm text-bone transition-colors hover:border-fog"
        >
          See what it does
        </a>
      </motion.div>
    </section>
  );
}
