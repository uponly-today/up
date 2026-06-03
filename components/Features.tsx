import Reveal from "./Reveal";

const FEATURES = [
  {
    title: "Base-native, end to end",
    body: "Built for Coinbase's L2 — chain 8453 and nothing else. Fast, low-fee and focused, so uponly speaks Base fluently instead of spreading thin.",
    glyph: "▲",
  },
  {
    title: "An agent, not a search bar",
    body: "uponly reasons, picks the right on-chain tools and chains them together to answer. Ask a follow-up and it keeps the thread — a real AI agent for the chain.",
    glyph: "✦",
  },
  {
    title: "Tokenized & real-world assets",
    body: "From memecoins to stablecoins and tokenized RWAs on Base — look up any ERC-20 by name or symbol for price, supply, holders and market cap, live.",
    glyph: "◎",
  },
  {
    title: "Privacy by default",
    body: "Read-only and connectionless. No wallet to link, no signatures, no keys held. Your address lookups and questions aren't tied to your identity.",
    glyph: "⦿",
  },
  {
    title: "Security signals built in",
    body: "Every token answer carries reputation and contract context, so honeypots and sketchy deployments surface before you act. Diligence, not hype.",
    glyph: "🛡",
  },
  {
    title: "Data, not promises",
    body: "Powered by Xiaomi MiMo and wired straight to live chain reads. Every number is fetched at query time with its source — no price calls, no made-up figures.",
    glyph: "≡",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-5 py-28">
      <Reveal>
        <p className="font-display text-sm uppercase tracking-[0.3em] text-up">
          Why uponly
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
          What only uponly does.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 0.08}>
            <div className="group h-full bg-ink p-7 transition-colors hover:bg-surface">
              <div className="mb-5 grid h-10 w-10 place-items-center rounded-xl border border-line text-lg text-up transition-transform group-hover:-translate-y-0.5">
                {f.glyph}
              </div>
              <h3 className="font-display text-lg font-medium">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
