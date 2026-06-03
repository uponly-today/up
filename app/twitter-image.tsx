import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "uponly — AI co-pilot for Base";

export default function Image() {
  return renderOg();
}
