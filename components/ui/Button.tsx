import Link from "next/link";
import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "icon";
type Size = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-headline-md font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:pointer-events-none";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-fixed hover:shadow-[0_0_20px_var(--glow-teal-strong)] active:translate-y-0",
  ghost:
    "bg-surface-container-high text-on-surface hover:bg-surface-bright border border-outline/40",
  icon:
    "h-9 w-9 rounded-lg bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-primary",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-[13px] leading-5",
  md: "h-10 px-4 text-[14px] leading-5",
  lg: "h-12 px-6 text-[15px] leading-5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
  /** Render as a different element/component. Defaults to <button>. */
  as?: ElementType;
};

/**
 * Polymorphic Button. Renders an <a> when given an `href` prop, otherwise
 * a <button>. When `as` is provided, it takes precedence.
 */
type ButtonProps<E extends ElementType> = CommonProps & {
  as?: E;
  href?: string;
} & Omit<ComponentPropsWithoutRef<E>, keyof CommonProps | "href">;

export function Button<E extends ElementType = "button">(
  props: ButtonProps<E>
) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    as,
    href,
    ...rest
  } = props;

  const Comp: ElementType = as ?? (href ? Link : "button");
  const linkProps = href ? { href } : {};

  const classes = cn(
    baseClasses,
    variant === "icon" ? "h-9 w-9 px-0" : sizeClasses[size],
    variantClasses[variant],
    className
  );

  return (
    <Comp className={classes} {...linkProps} {...rest}>
      {children}
    </Comp>
  );
}
