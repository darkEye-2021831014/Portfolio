import { cn } from "@/lib/cn";

type GlowStop = {
  className: string;
  /** Layer index — higher values render above (closer to viewer). */
  z?: number;
};

type RadialGlowProps = {
  /** Stops, from back to front. When omitted, we render the default
   *  2-blob hero atmosphere (top-left teal, top-right violet). */
  stops?: GlowStop[];
  className?: string;
};

const defaultStops: GlowStop[] = [
  {
    className:
      "absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none",
  },
  {
    className:
      "absolute top-1/3 right-10 h-80 w-80 rounded-full bg-secondary/10 blur-[100px] pointer-events-none",
  },
];

/**
 * Decorative ambient glow layer. Renders absolutely-positioned blurred
 * blobs that sit behind content. Use as the first child of a section
 * with `relative` positioning so the layer does not interrupt layout.
 */
export function RadialGlow({
  stops = defaultStops,
  className,
}: RadialGlowProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {stops.map((stop, i) => (
        <div key={i} aria-hidden className={stop.className} style={{ zIndex: stop.z ?? -1 }} />
      ))}
    </div>
  );
}
