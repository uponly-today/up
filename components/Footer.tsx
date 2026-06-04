import { Logo } from "./Logo";

const X_HANDLE = process.env.NEXT_PUBLIC_X_HANDLE || "uponly_today";

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.97 6.817H1.682l7.73-8.835L1.254 2.25h6.83l4.713 6.231 5.447-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-line">
      {/* CTA band */}
      <div className="bg-aura mx-auto max-w-6xl px-5 py-24 text-center">
        <h2 className="mx-auto max-w-2xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
          Ready to read the chain?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-fog">
          Open the chat and ask uponly anything about Base.
        </p>
        <a
          href="#chat"
          className="mt-8 inline-block rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
        >
          Launch chat →
        </a>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Logo size={24} rounded={6} />
            <span className="font-display font-medium">uponly</span>
            <span className="text-sm text-fog">· AI co-pilot for Base</span>
          </div>

          <div className="flex items-center gap-5 text-sm text-fog">
            <span>© {new Date().getFullYear()} uponly</span>
            <a
              href={`https://x.com/${X_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="uponly on X"
              className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors hover:border-fog hover:text-bone"
            >
              <XIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
