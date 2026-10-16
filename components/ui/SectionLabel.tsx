import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionLabelProps = {
  /** e.g. "01. About Me" — the eyebrow text. */
  children: ReactNode;
  /** Optional lucide-react icon name slot; we render an invisible box
   *  sized like a 16px icon for layout parity with the original design. */
  withIcon?: boolean;
  className?: string;
};

/**
 * Eyebrow label used at the top of every section. Matches the
 * "01. About Me" / "02. Algorithmic Prowess" pairs in the desktop
 * design — uppercase, wide letter-spacing, primary tint.
 */
export function SectionLabel({
  children,
  withIcon = false,
  className,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-[0.08em] text-primary",
        className
      )}
    >
      {withIcon ? <span aria-hidden className="inline-block h-4 w-4" /> : null}
      <span>{children}</span>
    </div>
  );
}
