import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "rest" | "lift";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: Variant;
  /** Use the secondary (violet) tint on hover instead of the teal one. */
  altGlow?: boolean;
  /** Optional badge in the top-right corner — a <Sparkle> by convention. */
  badge?: ReactNode;
  children?: ReactNode;
};

/**
 * Card surface. Two visual variants:
 *  - `rest`  — flat resting card, no transform on hover.
 *  - `lift`  — elevates -2px on hover, glow shifts to teal (or violet if
 *              `altGlow` is set), and the border tints toward primary.
 *
 * Background colour matches the desktop design (#121620 = surface-container
 * in the design tokens, #14171F in the project variant — both sit between
 * the surface and surface-container-high tiers; we use `surface-container`
 * for consistency with the rest of the system).
 */
export function Card({
  className,
  variant = "rest",
  altGlow = false,
  badge,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-surface-container p-6 shadow-sm",
        "border border-outline/40",
        variant === "lift" &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50",
        variant === "lift" &&
          (altGlow
            ? "hover:shadow-[0_12px_32px_-8px_var(--glow-violet)]"
            : "hover:shadow-[0_12px_32px_-8px_var(--glow-teal-strong)]"),
        className
      )}
      {...rest}
    >
      {badge ? (
        <div className="absolute right-4 top-4 flex items-center gap-1.5">
          {badge}
        </div>
      ) : null}
      {children}
    </div>
  );
}
