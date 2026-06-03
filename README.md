<div align="center">
  <img src="./uponly.svg" width="88" alt="uponly logo" />
  <h1>uponly</h1>
  <p>Your AI co-pilot for the <b>Base</b> chain. Ask anything about wallets, tokens and transactions in plain language — answered with live on-chain data.</p>
</div>

---

**uponly** ([uponly.today](https://uponly.today)) is an AI chat that reads the Base chain in real time. It's powered by **Xiaomi MiMo** (the "brain") wired to live on-chain tools via the public **Blockscout** Base API. Inspired by the AI-explorer genre, built around the uponly identity.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** — monochrome design from the logo (black / off-white) with a subtle "up" green accent
- **Framer Motion** — preloader animation + scroll reveals
- **OpenAI SDK** pointed at the Xiaomi MiMo OpenAI-compatible endpoint
- **Blockscout** Base REST API (chain `8453`) for live on-chain reads — no key required

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your MiMo key
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `MIMO_API_KEY` | ✅ | Xiaomi MiMo API key — get one at [platform.xiaomimimo.com](https://platform.xiaomimimo.com/) |
| `MIMO_BASE_URL` | – | OpenAI-compatible base URL (default `https://api.xiaomimimo.com/v1` — adjust to the platform docs if different) |
| `MIMO_MODEL` | – | `mimo-v2.5-pro` (default) or `mimo-v2.5` |
| `BLOCKSCOUT_BASE_URL` | – | Base Blockscout instance (default `https://base.blockscout.com`) |
| `NEXT_PUBLIC_X_HANDLE` | – | X handle shown in the nav/footer (default `uponly`) |

The chat works without a key for the UI, but answers require `MIMO_API_KEY`; without it the API returns a friendly "brain not configured" message.

## Deploy to Vercel

1. Import the repo into Vercel (framework auto-detected as Next.js — `vercel.json` is included).
2. Add the environment variables above in **Project → Settings → Environment Variables**.
3. Add the domain **`uponly.today`** in **Project → Settings → Domains** and point your DNS at Vercel.

Every push to the connected branch deploys automatically.

## Project layout

```
app/
  layout.tsx              # metadata, fonts, OG/Twitter tags
  page.tsx                # landing page composition
  globals.css             # Tailwind v4 theme + design tokens
  icon.svg                # favicon (the logo)
  apple-icon.tsx          # generated apple touch icon
  opengraph-image.tsx     # generated 1200x630 social card
  twitter-image.tsx       # generated Twitter card
  api/chat/route.ts       # streaming chat + on-chain tool loop
components/               # Preloader, Nav, Hero, Chat, Features, ...
lib/
  mimo.ts                 # Xiaomi MiMo client + system prompt
  base-tools.ts           # Blockscout Base tools + OpenAI tool schemas
  og.tsx                  # shared social-card renderer
```

> Not financial advice. uponly reports on-chain data and context only.
