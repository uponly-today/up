"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What's the ETH balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 on Base?",
  "Show me USDC on Base — price and market cap",
  "What tokens does 0x4200000000000000000000000000000000000006 hold?",
  "Latest transactions for vitalik.eth's address on Base",
];

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;

    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "assistant", content: `⚠️ ${msg}` };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="mx-auto flex h-[560px] max-w-3xl flex-col overflow-hidden rounded-3xl border border-line bg-surface/80 backdrop-blur-xl">
      {/* header */}
      <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
        <Logo size={22} rounded={6} />
        <span className="font-display text-sm font-medium">uponly</span>
        <span className="ml-1 rounded-full bg-up-dim/30 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-up">
          Base · live
        </span>
        <span className="ml-auto text-[11px] text-fog">
          powered by Xiaomi MiMo
        </span>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="thin-scroll flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        {empty ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Logo size={48} rounded={12} className="mb-5 opacity-90" />
            <h3 className="font-display text-xl">Ask the chain anything.</h3>
            <p className="mt-2 max-w-sm text-sm text-fog">
              Wallets, tokens, balances and transactions on Base — answered with
              live on-chain data.
            </p>
            <div className="mt-6 grid w-full max-w-lg gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-xl border border-line bg-ink/40 px-3.5 py-3 text-left text-xs text-fog transition-colors hover:border-fog/50 hover:text-bone"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {messages.map((m, i) => (
              <Bubble key={i} msg={m} loading={busy && i === messages.length - 1} />
            ))}
          </div>
        )}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-line p-3"
      >
        <div className="flex items-center gap-2 rounded-2xl border border-line bg-ink/60 pl-4 pr-2 focus-within:border-fog/50">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about any wallet or token on Base…"
            className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-fog"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-xl bg-bone px-4 py-2 text-sm font-medium text-ink transition-opacity disabled:opacity-40"
          >
            {busy ? "…" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Bubble({ msg, loading }: { msg: Msg; loading: boolean }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-bone text-ink"
            : "border border-line bg-ink/50 text-bone"
        }`}
      >
        {msg.content || (loading ? <Dots /> : "")}
      </div>
    </div>
  );
}

function Dots() {
  return (
    <span className="inline-flex gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-fog"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}
