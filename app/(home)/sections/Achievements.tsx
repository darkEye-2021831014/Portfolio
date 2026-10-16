import { Trophy, Award, Cpu, Sparkles, type LucideIcon } from "lucide-react";
import { Card, SectionLabel, Sparkle } from "@/components/ui";
import { ACHIEVEMENTS, type Achievement } from "@/content";
import { cn } from "@/lib/cn";

const categoryIcon: Record<Achievement["category"], LucideIcon> = {
  Continental: Trophy,
  Regional: Award,
  Datathon: Cpu,
  Hackathon: Cpu,
  Contest: Sparkles,
  Academic: Award,
};

const categoryTone: Record<Achievement["category"], "primary" | "secondary"> = {
  Continental: "primary",
  Regional: "secondary",
  Datathon: "primary",
  Hackathon: "primary",
  Contest: "secondary",
  Academic: "primary",
};

/**
 * Honors & Achievements. Vertical timeline of cards along a thin
 * left rail. The top card (ICPC Asia-West Continent Finalist) gets
 * a sparkle in its top-right corner; the rest of the timeline stays
 * unadorned per the design brief.
 */
export function AchievementsSection() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="flex flex-col gap-space-xl"
    >
      <header className="flex items-center gap-3">
        <span className="font-headline-xl text-headline-xl font-bold text-primary">
          {ACHIEVEMENTS.eyebrow.split(" ")[0]}
        </span>
        <h2
          id="achievements-heading"
          className="font-headline-xl text-headline-xl font-bold tracking-tight text-on-surface"
        >
          {ACHIEVEMENTS.heading}
        </h2>
      </header>
      <p className="max-w-2xl font-body-md text-body-md text-on-surface-variant">
        {ACHIEVEMENTS.description}
      </p>

      <div className="relative flex flex-col gap-space-sm pl-7 sm:pl-9">
        {/* vertical rail */}
        <div className="absolute bottom-5 left-2.5 top-5 w-px bg-outline-variant/60" />

        {ACHIEVEMENTS.items.map((a) => (
          <AchievementCard key={a.id} item={a} />
        ))}
      </div>
    </section>
  );
}

function AchievementCard({ item }: { item: Achievement }) {
  const Icon = categoryIcon[item.category];
  const tone = categoryTone[item.category];
  const ringClass =
    tone === "primary"
      ? "border-primary shadow-[0_0_8px_var(--glow-teal-strong)]"
      : "border-secondary shadow-[0_0_8px_var(--glow-violet)]";
  const dotClass = tone === "primary" ? "bg-primary" : "bg-secondary";
  const iconClass = tone === "primary" ? "text-primary" : "text-secondary";

  return (
    <article className="relative">
      <div
        className={cn(
          "absolute -left-7 top-6 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-canvas sm:-left-9",
          ringClass
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", dotClass)} />
      </div>

      <Card
        variant="lift"
        className="flex flex-col gap-2.5 border-outline/40 bg-surface-container-low p-6"
        badge={
          item.sparkle ? (
            <Sparkle tone="primary" pulse size={16} />
          ) : undefined
        }
      >
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 font-code-badge text-[10px] font-semibold uppercase tracking-wider sm:text-[11px]",
              tone === "primary"
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-secondary/30 bg-secondary/10 text-secondary"
            )}
          >
            {item.year} · {item.category}
          </span>
          <Icon size={16} className={iconClass} aria-hidden />
        </div>
        <h3 className="text-base font-bold text-on-surface sm:text-lg">
          {item.title}
        </h3>
        <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
          {item.detail}
        </p>
      </Card>
    </article>
  );
}
