import {
  Code2,
  Layers,
  Database,
  Wrench,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";
import { Card, SectionLabel } from "@/components/ui";
import { SKILLS, type SkillGroup } from "@/content";
import { cn } from "@/lib/cn";

const skillIcons: Record<SkillGroup["icon"], LucideIcon> = {
  Code2,
  Layers,
  Database,
  Wrench,
  BrainCircuit,
};

const skillIconTone: Record<SkillGroup["icon"], "primary" | "secondary"> = {
  Code2: "primary",
  Layers: "secondary",
  Database: "primary",
  Wrench: "secondary",
  BrainCircuit: "primary",
};

/**
 * Technical Proficiencies. Five grouped cards matching the desktop
 * reference: languages, frameworks, databases, tools, and core
 * engineering principles. No progress bars — only verifiable labels.
 */
export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="flex flex-col gap-space-xl"
    >
      <header className="flex flex-col gap-2">
        <SectionLabel>
          <Layers size={16} className="mr-1" />
          {SKILLS.eyebrow}
        </SectionLabel>
        <h2
          id="skills-heading"
          className="font-headline-xl text-headline-xl tracking-tight text-on-surface"
        >
          {SKILLS.heading}
        </h2>
        <p className="max-w-2xl font-body-md text-body-md text-on-surface-variant">
          {SKILLS.description}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-3">
        {SKILLS.groups.map((g) => (
          <SkillCard key={g.id} group={g} />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ group }: { group: SkillGroup }) {
  const Icon = skillIcons[group.icon];
  const tone = skillIconTone[group.icon];
  const toneClass = tone === "primary" ? "text-primary" : "text-secondary";

  return (
    <Card
      variant="lift"
      className="group flex flex-col gap-space-sm"
    >
      <div className="flex items-center gap-2">
        <Icon
          size={20}
          className={cn(
            toneClass,
            "transition-transform duration-300 group-hover:scale-110",
          )}
          aria-hidden
        />
        <h3 className="font-headline-md text-headline-md text-on-surface">
          {group.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="rounded-lg bg-surface-container-high px-3 py-1 font-code-badge text-code-badge text-on-surface transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary"
          >
            {item}
          </span>
        ))}
      </div>
    </Card>
  );
}
