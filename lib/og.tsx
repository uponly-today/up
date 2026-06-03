import { ImageResponse } from "next/og";
import { MARK_PATH } from "@/components/Logo";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Shared social card: logo mark + wordmark + tagline on near-black. */
export function renderOg() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "90px",
          background:
            "radial-gradient(900px 500px at 60% -10%, #103a26 0%, #050505 60%)",
          color: "#FCFCFC",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="96" height="96" viewBox="0 0 500 500">
            <rect width="500" height="500" rx="110" fill="#000000" />
            <path d={MARK_PATH} fill="#FCFCFC" transform="translate(412,81.5)" />
          </svg>
          <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: -2 }}>
            uponly
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 48,
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: -3,
            maxWidth: 940,
          }}
        >
          <span>Your AI co-pilot for&nbsp;</span>
          <span style={{ color: "#7cffb2" }}>Base.</span>
        </div>

        <div style={{ marginTop: 28, fontSize: 34, color: "#8a8a90", maxWidth: 900 }}>
          Ask anything about wallets, tokens and transactions — answered with
          live on-chain data.
        </div>

        <div
          style={{
            marginTop: 56,
            fontSize: 26,
            color: "#7cffb2",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          uponly.today
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
