import { type ReactNode } from "react";
import { Sparkle } from "./Sparkle";
import { cn } from "@/lib/cn";

type Tone = "primary" | "secondary" | "tertiary" | "on-surface";

type MetricTileProps = {
  /** The big monospace metric. */
  value: ReactNode;
  /** Tertiary/uppercase label above the value. */
  label: ReactNode;
  /** Optional supporting line below the metric. */
  caption?: ReactNode;
  /** Which brand colour to tint the metric with. */
  tone?: Tone;
  /** Toggle the corner sparkle for high-value tiles. */
  sparkle?: boolean;
  className?: string;
};

const toneClasses: Record<Tone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  "on-surface": "text-on-surface",
};

/**
 * Metric tile — large monospace figure over an uppercase label. Matches
 * the 4 CGPA / Solved / Rating cards seen on both desktop and mobile.
 */
export function MetricTile({
  value,
  label,
  caption,
  tone = "on-surface",
  sparkle = false,
  className,
}: MetricTileProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between gap-4 overflow-hidden rounded-2xl bg-surface-container-low p-5 shadow-sm transition-colors hover:bg-surface-container",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-label-caps text-label-caps uppercase tracking-[0.08em] text-on-surface-variant">
          {label}
        </span>
        {sparkle ? (
          <Sparkle
            tone={tone === "on-surface" ? "primary" : tone}
            pulse
            size={14}
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-1">
        <span
          className={cn(
            "font-code-metric font-bold tracking-tight",
            toneClasses[tone]
          )}
        >
          {value}
        </span>
        {caption ? (
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {caption}
          </span>
        ) : null}
      </div>
    </div>
  );
}
