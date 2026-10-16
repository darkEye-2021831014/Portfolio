import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  /**
   * If true, the mark is rendered as a monogram inside a teal circle —
   * matches the avatar slot in the desktop header. If false, it is rendered
   * as a 28x8 inline wordmark for the small "darkEye" brand mark.
   */
  variant?: "wordmark" | "monogram";
};

/**
 * Brand mark. The original design used an external PNG monogram; we
 * inline a stylised SVG so there are no remote assets, no Material
 * Symbols, and no <img> layout shift.
 */
export function Logo({ className, variant = "wordmark" }: LogoProps) {
  if (variant === "monogram") {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary",
          className
        )}
      >
        <svg fill="currentColor" height={18} viewBox="0 0 24 24" width={18}>
          <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-3.3 0-9 1.7-9 5v3h18v-3c0-3.3-5.7-5-9-5z" />
        </svg>
      </span>
    );
  }

  return (
    <span
      aria-label="darkEye monogram"
      className={cn(
        "inline-flex h-8 items-center gap-2 font-headline-md text-headline-md text-on-surface",
        className
      )}
    >
      <svg
        aria-hidden
        className="h-7 w-7 shrink-0"
        viewBox="0 0 32 32"
        fill="none"
      >
        <defs>
          <linearGradient id="lg-stroke" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor="#4fdbc8" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <circle
          cx="16"
          cy="16"
          r="13"
          stroke="url(#lg-stroke)"
          strokeWidth="1.5"
        />
        <path
          d="M11 11l-3 5 3 5M21 11l3 5-3 5M18 10l-4 12"
          stroke="url(#lg-stroke)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="tracking-tight">Ashraful Islam</span>
    </span>
  );
}
