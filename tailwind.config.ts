import type { Config } from "tailwindcss";

/**
 * Design tokens are sourced from `design/desktop/code.html` (which is the
 * canonical source per the user). When `DESIGN.md` prose conflicts with
 * `code.html`, `code.html` wins. The same set of values is mirrored as CSS
 * custom properties in `app/globals.css` for non-Tailwind consumers.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // surface tier
        "surface-container-lowest": "#0c0e13",
        "surface-container-low": "#1a1b21",
        "surface-container": "#1e1f25",
        "surface-container-high": "#282a2f",
        "surface-container-highest": "#33353a",
        surface: "#111318",
        "surface-dim": "#111318",
        "surface-bright": "#37393f",
        "surface-variant": "#33353a",
        "surface-tint": "#4fdbc8",

        // text tiers
        "on-surface": "#e2e2e9",
        "on-surface-variant": "#bbcac6",
        "on-background": "#e2e2e9",
        background: "#111318",
        "inverse-surface": "#e2e2e9",
        "inverse-on-surface": "#2e3036",
        "inverse-primary": "#006b5f",
        outline: "#859490",
        "outline-variant": "#3c4947",
        // Tertiary text colour from design/DESIGN.md — used for
        // understated labels and grid lines. Always pair with a dark
        // surface; we never put it on the canvas (contrast would dip
        // below 4.5:1).
        "tertiary-text": "#64748b",

        // primary (teal)
        primary: "#4fdbc8",
        "primary-container": "#14b8a6",
        "on-primary": "#003731",
        "on-primary-container": "#00423b",
        "primary-fixed": "#71f8e4",
        "primary-fixed-dim": "#4fdbc8",
        "on-primary-fixed": "#00201c",
        "on-primary-fixed-variant": "#005048",

        // secondary (violet)
        secondary: "#d0bcff",
        "secondary-container": "#571bc1",
        "on-secondary": "#3c0091",
        "on-secondary-container": "#c4abff",
        "secondary-fixed": "#e9ddff",
        "secondary-fixed-dim": "#d0bcff",
        "on-secondary-fixed": "#23005c",
        "on-secondary-fixed-variant": "#5516be",

        // tertiary (blue)
        tertiary: "#adc6ff",
        "tertiary-container": "#75a3ff",
        "on-tertiary": "#002e6a",
        "on-tertiary-container": "#00377d",
        "tertiary-fixed": "#d8e2ff",
        "tertiary-fixed-dim": "#adc6ff",
        "on-tertiary-fixed": "#001a42",
        "on-tertiary-fixed-variant": "#004395",

        // error
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        gutter: "1.5rem",
        "gutter-mobile": "1rem",
        margin: "2rem",
        "margin-mobile": "1rem",
        "space-xs": "0.5rem",
        "space-sm": "0.75rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
      },
      fontFamily: {
        "display-hero": ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        "display-hero-mobile": ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        "headline-xl": ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        "headline-xl-mobile": ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        "headline-lg": ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        "headline-md": ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        "body-lg": ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        "body-md": ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        "body-sm": ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        "code-metric": ["var(--font-mono)", "JetBrains Mono", "monospace"],
        "code-badge": ["var(--font-mono)", "JetBrains Mono", "monospace"],
        "label-caps": ["var(--font-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-hero": ["56px", { lineHeight: "64px", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-hero-mobile": ["36px", { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-xl": ["40px", { lineHeight: "48px", letterSpacing: "-0.025em", fontWeight: "700" }],
        "headline-xl-mobile": ["28px", { lineHeight: "36px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["24px", { lineHeight: "32px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "headline-md": ["20px", { lineHeight: "28px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["15px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "20px", fontWeight: "400" }],
        "code-metric": ["24px", { lineHeight: "28px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "code-badge": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "500" }],
        "label-caps": ["11px", { lineHeight: "14px", letterSpacing: "0.08em", fontWeight: "600" }],
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
