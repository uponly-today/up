import { ImageResponse } from "next/og";
import { MARK_PATH } from "@/components/Logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <svg width="180" height="180" viewBox="0 0 500 500">
          <rect width="500" height="500" rx="110" fill="#000000" />
          <path d={MARK_PATH} fill="#FCFCFC" transform="translate(412,81.5)" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
