import { cn } from "@/lib/cn";

type Platform = "codeforces" | "codechef";

type PlatformRatingChipProps = {
  platform: Platform;
  handle: string;
  rating: string;
  tier?: string;
  className?: string;
};

// Brand-neutral palette pulled from the design brief:
//   "Codeforces Blue (#3B82F6), Codeforces Master Violet (#A855F7),
//    CodeChef Bronze/Gold (#D97706)"
const platformStyles: Record<
  Platform,
  { ring: string; bg: string; text: string; accent: string; label: string }
> = {
  codeforces: {
    ring: "ring-1 ring-inset",
    bg: "bg-[rgba(59,130,246,0.12)]",
    text: "text-[#3B82F6]",
    accent: "bg-[#3B82F6]",
    label: "Codeforces",
  },
  codechef: {
    ring: "ring-1 ring-inset",
    bg: "bg-[rgba(217,119,6,0.14)]",
    text: "text-[#D97706]",
    accent: "bg-[#D97706]",
    label: "CodeChef",
  },
};

/**
 * Inline platform identification + rating chip, used by the CP section.
 * Renders a small coloured dot (`accent`) followed by the platform name
 * and a tier/rating pair in JetBrains Mono.
 */
export function PlatformRatingChip({
  platform,
  handle,
  rating,
  tier,
  className,
}: PlatformRatingChipProps) {
  const s = platformStyles[platform];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 font-code-badge text-code-badge backdrop-blur-sm",
        s.ring,
        s.bg,
        s.text,
        "ring-current/30",
        className
      )}
    >
      <span aria-hidden className={cn("h-2 w-2 rounded-full", s.accent)} />
      <span className="font-semibold uppercase tracking-wider">{s.label}</span>
      {tier ? <span className="opacity-80">· {tier}</span> : null}
      {rating ? (
        <span className="font-mono font-bold text-on-surface">{rating}</span>
      ) : null}
      <span className="font-mono text-on-surface-variant">@{handle}</span>
    </span>
  );
}
