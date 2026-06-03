"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "What is uponly?",
    a: "uponly is an AI co-pilot for the Base chain. You ask questions in plain language and it answers using live on-chain data — wallet balances, token info, transactions and more.",
  },
  {
    q: "Which network does it support?",
    a: "uponly is focused on Base, Coinbase's Ethereum L2 (chain id 8453). Other chains aren't supported yet.",
  },
  {
    q: "Where does the data come from?",
    a: "On-chain data is read live from public Base infrastructure when you ask. Nothing is pre-cached — every answer reflects the chain at query time.",
  },
  {
    q: "Is this financial advice?",
    a: "No. uponly reports on-chain data and context only. It does not give financial advice or price predictions. Always do your own research.",
  },
  {
    q: "Do I need a wallet to use it?",
    a: "No. uponly is read-only — it never connects to or moves funds. You can ask about any public address without connecting anything.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative mx-auto max-w-3xl px-5 py-28">
      <Reveal>
        <p className="text-center font-display text-sm uppercase tracking-[0.3em] text-up">
          FAQ
        </p>
        <h2 className="mt-3 text-center font-display text-4xl font-medium tracking-tight sm:text-5xl">
          Good questions.
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-col gap-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 0.05}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full rounded-2xl border border-line bg-surface/50 px-6 py-5 text-left transition-colors hover:border-fog/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-base font-medium">{f.q}</span>
                  <span
                    className={`text-up transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </div>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden text-sm leading-relaxed text-fog">
                    {f.a}
                  </p>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
