import Link from "next/link";
import {
  UtensilsCrossed,
  Plane,
  Wallet,
  Gamepad2,
  ArrowUpRight,
  Code2,
  type LucideIcon,
} from "lucide-react";
import { Card, SectionLabel, Sparkle } from "@/components/ui";
import { PROJECTS, type Project } from "@/content";

const projectIcons: Record<Project["icon"], LucideIcon> = {
  UtensilsCrossed,
  Plane,
  Wallet,
  Gamepad2,
};

/**
 * Featured Projects. Cards match the desktop reference: a recessed
 * visual header (icon + category), a body with title + description,
 * a stack of technology chips, and an action row with the deep-dive
 * and source links. All copy comes from /content/projects.ts.
 */
export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="flex flex-col gap-space-xl"
    >
      <header className="flex items-center gap-3">
        <span className="font-headline-xl text-headline-xl font-bold text-primary">
          {PROJECTS.eyebrow.split(" ")[0]}
        </span>
        <h2
          id="projects-heading"
          className="font-headline-xl text-headline-xl font-bold tracking-tight text-on-surface"
        >
          {PROJECTS.heading}
        </h2>
      </header>
      <p className="max-w-2xl font-body-md text-body-md text-on-surface-variant">
        {PROJECTS.description}
      </p>

      <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
        {PROJECTS.items.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = projectIcons[project.icon];

  return (
    <Card
      variant="lift"
      className="flex flex-col gap-space-md border-outline/40 bg-surface-container-low/60 p-5"
    >
      {/* Recessed visual header */}
      <div className="flex h-36 w-full flex-col items-center justify-center gap-2 rounded-xl border border-outline/40 bg-canvas/60 px-4 text-center">
        <Icon size={32} className="text-primary" aria-hidden />
        <span className="font-code-badge text-xs font-semibold tracking-wide text-on-surface">
          {project.name}
        </span>
        <span className="font-code-badge text-[11px] text-on-surface-variant/80">
          {project.category}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
            {project.name}
          </h3>
        </div>
        <p className="line-clamp-3 font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
          {project.description}
        </p>
        <p className="font-code-badge text-code-badge text-on-surface-variant">
          Deployed {project.deployed}
        </p>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-surface-container-high px-2.5 py-1 font-code-badge text-[11px] text-on-surface-variant"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2.5 pt-2">
        {project.id === "plan2go" ? (
          <ProjectCtaLink
            href={`/projects/${project.id}`}
            label="View case study"
            icon={<ArrowUpRight size={14} />}
          />
        ) : (
          <ProjectCtaLink
            href={`/projects/${project.id}`}
            label="Explore case study"
            icon={<ArrowUpRight size={14} />}
          />
        )}
        {project.demoUrl !== "TBD" ? (
          <ProjectCtaLink
            href={project.demoUrl}
            label="Live Demo"
            icon={<Sparkle size={14} />}
          />
        ) : null}
        {project.sourceUrl !== "TBD" ? (
          <ProjectCtaLink
            href={project.sourceUrl}
            label="Source"
            icon={<Code2 size={13} />}
            tone="ghost"
          />
        ) : (
          <ProjectCtaLink
            href="#contact"
            label="Source"
            icon={<Code2 size={13} />}
            tone="ghost"
            placeholder
          />
        )}
        {project.apkUrl && project.apkUrl !== "TBD" ? (
          <ProjectCtaLink
            href={project.apkUrl}
            label={project.id === "junglerush" ? "Desktop Release" : "APK"}
            icon={<ArrowUpRight size={13} />}
            tone="ghost"
          />
        ) : null}
      </div>
    </Card>
  );
}

function ProjectCtaLink({
  href,
  label,
  icon,
  tone = "primary",
  placeholder = false,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  tone?: "primary" | "ghost";
  placeholder?: boolean;
}) {
  const className =
    tone === "primary"
      ? "inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 font-headline-md text-xs font-semibold text-on-primary transition-all hover:bg-primary-fixed hover:shadow-[0_0_12px_var(--glow-teal)]"
      : "inline-flex items-center gap-1.5 rounded-lg border border-outline/40 bg-surface-container px-3 py-1.5 font-code-badge text-xs text-on-surface-variant transition-colors hover:bg-surface-bright hover:text-on-surface";

  return (
    <Link href={href} className={className}>
      <span>{label}</span>
      {icon}
      {placeholder ? (
        <span className="font-code-badge text-[10px] opacity-70">(TBD)</span>
      ) : null}
    </Link>
  );
}
