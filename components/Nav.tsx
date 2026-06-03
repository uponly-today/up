"use client";

import { Logo } from "./Logo";

const X_HANDLE = process.env.NEXT_PUBLIC_X_HANDLE || "uponly";

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.97 6.817H1.682l7.73-8.835L1.254 2.25h6.83l4.713 6.231 5.447-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-line bg-ink/70 px-4 py-2.5 backdrop-blur-xl sm:px-5">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo size={28} rounded={7} />
          <span className="font-display text-lg font-medium tracking-tight">
            uponly
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-fog md:flex">
          <a href="#features" className="transition-colors hover:text-bone">
            Features
          </a>
          <a href="#how" className="transition-colors hover:text-bone">
            How it works
          </a>
          <a href="#faq" className="transition-colors hover:text-bone">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`https://x.com/${X_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="uponly on X"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-fog transition-colors hover:border-fog hover:text-bone"
          >
            <XIcon className="h-3.5 w-3.5" />
          </a>
          <a
            href="#chat"
            className="rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
          >
            Launch chat
          </a>
        </div>
      </div>
    </header>
  );
}
