import { cn } from "@/lib/cn";

type SparkleProps = {
  className?: string;
  /** When true the star gets a gentle `animate-pulse` twinkle. */
  pulse?: boolean;
  /** Tone the star to one of the brand accents. */
  tone?: "primary" | "secondary" | "tertiary" | "on-surface";
  size?: number;
  "aria-hidden"?: boolean;
};

/**
 * The 4-point "celestial" sparkle used throughout the design. Inline SVG
 * keeps it crisp at any size and avoids runtime icon-fetch cost.
 */
export function Sparkle({
  className,
  pulse = false,
  tone = "primary",
  size = 14,
  "aria-hidden": ariaHidden = true,
}: SparkleProps) {
  const toneClass = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
    "on-surface": "text-on-surface",
  }[tone];

  return (
    <svg
      aria-hidden={ariaHidden}
      className={cn(toneClass, pulse && "animate-pulse", className)}
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}
