import Reveal from "./Reveal";

const FEATURES = [
  {
    title: "Read any wallet",
    body: "Drop a 0x address and get ETH balance, token holdings and recent activity — instantly, in plain English.",
    glyph: "◎",
  },
  {
    title: "Track tokens in real time",
    body: "Look up any ERC-20 on Base by name or symbol. Price, market cap, supply and holders, pulled live.",
    glyph: "↗",
  },
  {
    title: "Natural-language on-chain",
    body: "No query language, no explorer tabs. Just ask. uponly translates your question into live chain reads.",
    glyph: "✦",
  },
  {
    title: "Built for Base",
    body: "Native to Coinbase's L2. Fast, low-fee, and focused — uponly speaks Base fluently.",
    glyph: "▲",
  },
  {
    title: "Powered by Xiaomi MiMo",
    body: "A sharp reasoning model under the hood, wired directly to on-chain tools for grounded, factual answers.",
    glyph: "✶",
  },
  {
    title: "Data, not promises",
    body: "Every number is fetched live and shown with its source context. No price calls, no hype — just the chain.",
    glyph: "≡",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-5 py-28">
      <Reveal>
        <p className="font-display text-sm uppercase tracking-[0.3em] text-up">
          Features
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
          The chain, finally readable.
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
