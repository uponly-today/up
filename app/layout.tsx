import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const SITE = "https://uponly.today";
const DESC =
  "uponly is your AI co-pilot for the Base chain. Ask anything about wallets, tokens and transactions in plain language — answered with live on-chain data.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "uponly — AI co-pilot for Base",
    template: "%s · uponly",
  },
  description: DESC,
  keywords: [
    "uponly",
    "Base chain",
    "AI",
    "crypto",
    "on-chain",
    "blockchain explorer",
    "Base",
    "wallet",
  ],
  applicationName: "uponly",
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "uponly",
    title: "uponly — AI co-pilot for Base",
    description: DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: "uponly — AI co-pilot for Base",
    description: DESC,
    creator: `@${process.env.NEXT_PUBLIC_X_HANDLE || "uponly"}`,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
