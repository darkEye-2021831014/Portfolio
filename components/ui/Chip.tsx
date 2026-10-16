import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "primary" | "secondary" | "tertiary" | "outline";
type Shape = "pill" | "tag";

type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  shape?: Shape;
  /** Render the value portion in a strong colour while the label stays muted. */
  value?: ReactNode;
  /** Render the label portion in muted text. */
  label?: ReactNode;
  children?: ReactNode;
};

const toneClasses: Record<Tone, string> = {
  neutral: "bg-surface-container text-on-surface",
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  tertiary: "bg-tertiary/10 text-tertiary",
  outline:
    "bg-surface-container-lowest text-on-surface border border-outline-variant/60",
};

const shapeClasses: Record<Shape, string> = {
  pill: "rounded-full",
  tag: "rounded-md",
};

/**
 * Generic chip / pill used for tags, tech stacks, and metadata. The
 * `label` / `value` pair enables the "Label: <value>" pattern seen
 * throughout the design (e.g. "Percentile: Top 8.4%").
 */
export function Chip({
  className,
  tone = "neutral",
  shape = "tag",
  value,
  label,
  children,
  ...rest
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 font-code-badge text-code-badge",
        shapeClasses[shape],
        toneClasses[tone],
        className
      )}
      {...rest}
    >
      {label ? <span className="text-on-surface-variant">{label}</span> : null}
      {value ? <span className="font-semibold">{value}</span> : null}
      {children}
    </span>
  );
}

/** Convenience alias — a fully rounded pill in the brand palette. */
export function Pill(props: ChipProps) {
  return <Chip shape="pill" {...props} />;
}
