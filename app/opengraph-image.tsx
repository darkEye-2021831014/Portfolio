import { ImageResponse } from "next/og";
import { SITE } from "@/content";

/**
 * Generated Open Graph image (1200x630) used by social previews.
 * Next.js will hash the file and serve it from
 * `/opengraph-image-<hash>.png` automatically.
 *
 * Rendered as JSX → SVG-equivalent via Satori (the engine behind
 * `next/og`). We use Satori's built-in sans-serif stack instead of
 * fetching Google Fonts at build time — this keeps the build offline-
 * safe and avoids a 400 from `next/og`'s font loader when the build
 * runs in restricted network contexts (CI, Vercel preview, etc.).
 */

export const runtime = "nodejs";
export const alt = `${SITE.fullName} (${SITE.handle}) — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0c0e13 0%, #111318 50%, #1a1b21 100%)",
          color: "#e2e2e9",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* 4-point sparkle mark */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="#4fdbc8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 600,
              color: "#e2e2e9",
              letterSpacing: "-0.01em",
            }}
          >
            {SITE.fullName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 500,
              color: "#4fdbc8",
              backgroundColor: "#282a2f",
              padding: "4px 14px",
              borderRadius: 10,
              marginLeft: 8,
            }}
          >
            {SITE.handle}
          </div>
        </div>

        {/* Middle: hero headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              color: "#4fdbc8",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Software Engineer · Competitive Programmer
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 86,
              fontWeight: 700,
              color: "#e2e2e9",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Quiet corners hide the best stories.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 30,
              color: "#bbcac6",
              maxWidth: 920,
              lineHeight: 1.35,
            }}
          >
            Final-year SE @ SUST · Codeforces Expert 1715 · CodeChef 4
            {/* Inline SVG star — avoids a Satori font fetch for the U+2605
                codepoint which would 400 from Google and log a warning. */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="#bbcac6"
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: "0 6px", display: "flex" }}
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            1956 · 2000+ problems solved
          </div>
        </div>

        {/* Bottom: pill row + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 500,
                color: "#4fdbc8",
                backgroundColor: "rgba(79, 219, 200, 0.12)",
                border: "1px solid rgba(79, 219, 200, 0.4)",
                padding: "10px 18px",
                borderRadius: 999,
              }}
            >
              Next.js
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 500,
                color: "#d0bcff",
                backgroundColor: "rgba(208, 188, 255, 0.12)",
                border: "1px solid rgba(208, 188, 255, 0.4)",
                padding: "10px 18px",
                borderRadius: 999,
              }}
            >
              Go
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 500,
                color: "#adc6ff",
                backgroundColor: "rgba(173, 198, 255, 0.12)",
                border: "1px solid rgba(173, 198, 255, 0.4)",
                padding: "10px 18px",
                borderRadius: 999,
              }}
            >
              Kotlin
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#859490",
              fontWeight: 500,
            }}
          >
            {SITE.handle}.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
