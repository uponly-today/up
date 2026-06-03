import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Ask in plain language",
    body: "Type a question — an address, a token, a transaction. No syntax, no setup.",
  },
  {
    n: "02",
    title: "uponly reads Base live",
    body: "The model picks the right on-chain tools and fetches real data from Base in real time.",
  },
  {
    n: "03",
    title: "Get a clear answer",
    body: "Numbers, context and tickers — formatted to read at a glance. Ask a follow-up anytime.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto max-w-6xl px-5 py-28">
      <Reveal>
        <p className="font-display text-sm uppercase tracking-[0.3em] text-up">
          How it works
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
          Three steps. No friction.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1}>
            <div className="h-full rounded-3xl border border-line bg-surface/50 p-8">
              <div className="font-display text-5xl font-medium text-up-dim">
                {s.n}
              </div>
              <h3 className="mt-6 font-display text-xl font-medium">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
