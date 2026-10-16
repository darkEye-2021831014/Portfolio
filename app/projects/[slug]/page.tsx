import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Rocket,
  Shield,
  Code,
  Container,
  Network,
  Database,
  QrCode,
  Sparkles,
  Wallet,
  Plane,
  Gamepad2,
  Monitor,
  Server,
  Cloud,
  Boxes,
  Smartphone,
  CircleCheck,
  CircleX,
  Activity,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { Header, MobileNav, Footer, RadialGlow } from "@/components/layout";
import { Button, Card, SectionLabel, Sparkle } from "@/components/ui";
import { PROJECTS, type Project } from "@/content";
import type {
  DeepDive,
  HeroVisual,
  ImpactMetric,
  ProblemSolution,
  Architecture,
  Feature,
  TechStackColumn,
  CodeSnippet,
  CodeLine,
} from "@/content/projects";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  Static params + metadata                                          */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return PROJECTS.items.map((project) => ({ slug: project.id }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = PROJECTS.items.find((p) => p.id === params.slug);
  if (!project) return { title: "Project not found · Ashraful Islam" };
  return {
    title: `${project.name} · Ashraful Islam (darkEye)`,
    description: project.description,
  };
}

/* ------------------------------------------------------------------ */
/*  Icon registries                                                   */
/* ------------------------------------------------------------------ */

const featureIcons: Record<Feature["icon"], LucideIcon> = {
  Shield,
  Code,
  Container,
  Network,
  Database,
  QrCode,
  Sparkles,
  Wallet,
  Plane,
  Gamepad2,
};

const techStackIcons: Record<TechStackColumn["icon"], LucideIcon> = {
  Monitor,
  Server,
  Database,
  Cloud,
  Boxes,
  Smartphone,
  Plane,
  Gamepad2,
};

const insightTone: Record<NonNullable<HeroVisual["insights"]>[number]["tone"] & string, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  "on-surface": "text-inverse-surface",
};

const metricTone: Record<NonNullable<ImpactMetric["tone"]>, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  "on-surface": "text-inverse-surface",
};

const layerTone: Record<Architecture["layers"][number]["tone"], string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  "on-surface": "text-inverse-surface",
};

const codeTone: Record<NonNullable<CodeLine["highlights"]>[number]["tone"], string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  outline: "text-outline",
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProjectDeepDive({
  params,
}: {
  params: { slug: string };
}) {
  const project = PROJECTS.items.find((p) => p.id === params.slug);
  if (!project) notFound();

  const deepDive: DeepDive | undefined = project.deepDive;
  if (!deepDive) {
    // No deep-dive payload — render a minimal stub that still shows
    // the breadcrumb, title, description, and CTAs. This should
    // never happen for the four shipped projects (all have a
    // `deepDive` block in /content/projects.ts) but keeps the page
    // resilient if a future project ships without one.
    return <ProjectStub project={project} />;
  }

  const { prev, next } = neighbours(project);

  return (
    <>
      <Header />
      <MobileNav />

      <main className="relative w-full bg-surface-container-lowest pt-16 pb-20 lg:pb-0">
        <RadialGlow
          stops={[
            {
              className:
                "absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary/10 via-primary-container/5 to-transparent blur-3xl pointer-events-none rounded-full",
            },
            {
              className:
                "absolute top-24 -right-20 w-[420px] h-[320px] bg-secondary-container/10 blur-3xl pointer-events-none rounded-full",
            },
          ]}
        />

        <article className="relative mx-auto flex max-w-container flex-col gap-space-xl px-margin py-space-xl">
          <Breadcrumb name={project.name} />

          <HeroBand project={project} deepDive={deepDive} />

          {deepDive.heroVisual ? (
            <HeroVisualFrame visual={deepDive.heroVisual} />
          ) : null}

          {deepDive.impactMetrics ? (
            <ImpactMetricsStrip metrics={deepDive.impactMetrics} />
          ) : null}

          {deepDive.problemSolution ? (
            <ProblemSolutionSection ps={deepDive.problemSolution} />
          ) : null}

          {deepDive.architecture ? (
            <ArchitectureSection arch={deepDive.architecture} />
          ) : null}

          {deepDive.features ? (
            <FeatureGrid features={deepDive.features} />
          ) : null}

          {deepDive.techStackMatrix ? (
            <TechStackMatrixSection columns={deepDive.techStackMatrix} />
          ) : null}

          {deepDive.codeSnippet ? (
            <CodeSnippetSection snippet={deepDive.codeSnippet} />
          ) : null}

          <ProjectNavFooter prev={prev} next={next} />
        </article>
      </main>

      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function Breadcrumb({ name }: { name: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 font-label-caps text-label-caps uppercase tracking-[0.08em] text-on-surface-variant transition-colors hover:text-primary"
      >
        <ArrowLeft size={14} aria-hidden />
        <span>Projects</span>
      </Link>
      <span className="text-outline-variant font-code-badge text-code-badge">
        /
      </span>
      <span className="font-label-caps text-label-caps uppercase tracking-[0.08em] text-primary">
        {name}
      </span>
    </nav>
  );
}

function HeroBand({ project, deepDive }: { project: Project; deepDive: DeepDive }) {
  return (
    <div className="flex flex-col gap-space-lg pb-space-lg lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-space-sm">
        {/* Tagline pill */}
        <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-space-sm py-1 font-code-badge text-code-badge text-primary">
          <Sparkle size={14} pulse tone="primary" />
          <span>{deepDive.tagline}</span>
        </div>

        <h1 className="font-display-hero text-display-hero tracking-tight text-inverse-surface">
          {project.name}
        </h1>

        <p className="max-w-2xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
          {deepDive.overview}
        </p>
      </div>

      {/* Action CTAs — render only the buttons whose URL is real. */}
      <ProjectCtas project={project} />
    </div>
  );
}

function ProjectCtas({ project }: { project: Project }) {
  const buttons: Array<{
    label: string;
    icon: React.ReactNode;
    href: string;
    variant: "primary" | "ghost" | "tinted";
  }> = [];

  if (project.demoUrl !== "TBD") {
    buttons.push({
      label: "Live Demo",
      icon: <Rocket size={18} aria-hidden />,
      href: project.demoUrl,
      variant: "primary",
    });
  }
  if (project.sourceUrl !== "TBD") {
    buttons.push({
      label: "GitHub Repository",
      icon: <Code size={18} aria-hidden />,
      href: project.sourceUrl,
      variant: "ghost",
    });
  }
  if (project.apkUrl && project.apkUrl !== "TBD") {
    buttons.push({
      label: project.id === "junglerush" ? "Desktop Release" : "APK",
      icon: <ArrowUpRight size={16} aria-hidden />,
      href: project.apkUrl,
      variant: "ghost",
    });
  }
  if (project.docsUrl && project.docsUrl !== "TBD") {
    buttons.push({
      label: "Swagger Docs",
      icon: <BookOpen size={16} aria-hidden />,
      href: project.docsUrl,
      variant: "tinted",
    });
  }

  if (buttons.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-space-sm">
      {buttons.map((b) => (
        <Button
          key={b.label}
          as={Link}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          variant={b.variant === "tinted" ? "ghost" : b.variant}
          className={cn(
            b.variant === "primary" && "shadow-md hover:shadow-primary/20",
            b.variant === "tinted" &&
              "bg-surface-container-low text-primary hover:bg-surface-container-high"
          )}
        >
          {b.icon}
          <span>{b.label}</span>
        </Button>
      ))}
    </div>
  );
}

function HeroVisualFrame({ visual }: { visual: HeroVisual }) {
  return (
    <div className="w-full rounded-xl bg-surface-container-low p-2 shadow-xl md:p-3">
      <div className="flex flex-col overflow-hidden rounded-lg bg-surface-container-lowest">
        {/* Window chrome */}
        <div className="flex items-center justify-between bg-surface-container-high px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-error/70" />
            <span className="inline-block h-3 w-3 rounded-full bg-tertiary-container/70" />
            <span className="inline-block h-3 w-3 rounded-full bg-primary/70" />
            {visual.hostname ? (
              <span className="ml-2 hidden font-code-badge text-code-badge text-on-surface-variant sm:inline-block">
                {visual.hostname}
              </span>
            ) : null}
          </div>
          {visual.status ? (
            <div className="flex items-center gap-2 font-label-caps text-label-caps uppercase text-primary">
              <span className="inline-block h-2 w-2 animate-ping rounded-full bg-primary" />
              <span>{visual.status}</span>
            </div>
          ) : null}
        </div>

        {/* Screenshot */}
        <div className="relative aspect-[16/9] max-h-[540px] w-full overflow-hidden">
          <Image
            alt={`${visual.url} dashboard`}
            src={visual.url}
            width={1280}
            height={720}
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="h-full w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80" />

          {/* Insights overlay */}
          {visual.insights && visual.insights.length > 0 ? (
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-space-sm md:bottom-6 md:left-6 md:right-6 md:grid-cols-4">
              {visual.insights.map((insight) => (
                <div
                  key={insight.label}
                  className="flex flex-col rounded-lg bg-surface-container/90 p-space-sm shadow-md backdrop-blur-md"
                >
                  <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                    {insight.label}
                  </span>
                  <span
                    className={cn(
                      "mt-1 font-code-metric text-headline-md",
                      insightTone[insight.tone ?? "on-surface"]
                    )}
                  >
                    {insight.value}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ImpactMetricsStrip({ metrics }: { metrics: ReadonlyArray<ImpactMetric> }) {
  return (
    <section className="w-full bg-surface-container-low py-space-xl">
      <div className="grid grid-cols-1 gap-space-md md:grid-cols-3">
        {metrics.map((m) => (
          <Card
            key={m.label}
            variant="lift"
            className="group flex flex-col gap-2 bg-surface-container p-space-lg"
          >
            <div className="absolute right-4 top-4">
              <Sparkle
                size={16}
                pulse
                tone={m.tone === "on-surface" ? "primary" : m.tone}
                className="text-primary group-hover:scale-125"
              />
            </div>
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
              {m.label}
            </span>
            <div
              className={cn(
                "mt-2 font-code-metric text-display-hero-mobile tracking-tight",
                metricTone[m.tone ?? "on-surface"]
              )}
            >
              {m.value}
            </div>
            <div className="mt-1 font-body-md text-body-md font-semibold text-primary">
              {m.caption}
            </div>
            <p className="mt-2 font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
              {m.detail}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ProblemSolutionSection({ ps }: { ps: ProblemSolution }) {
  return (
    <section className="flex flex-col gap-space-lg">
      <div className="max-w-xl">
        <SectionLabel>Context &amp; Opportunity</SectionLabel>
        <h2 className="mt-2 font-headline-xl text-headline-xl tracking-tight text-inverse-surface">
          Project Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-space-md lg:grid-cols-2">
        <Card className="flex flex-col justify-between gap-space-md bg-surface-container p-space-lg">
          <div>
            <div className="mb-space-sm flex items-center gap-space-xs text-error">
              <CircleX size={24} aria-hidden />
              <h3 className="font-headline-md text-headline-md font-semibold text-inverse-surface">
                {ps.problem.title}
              </h3>
            </div>
            <p className="mb-space-md font-body-md text-body-md leading-relaxed text-on-surface-variant">
              {ps.problem.context}
            </p>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface">
              {ps.problem.bullets.map((b) => (
                <li key={b.heading} className="flex items-start gap-2">
                  <CircleX
                    size={18}
                    className="mt-0.5 shrink-0 text-error"
                    aria-hidden
                  />
                  <span>
                    <strong>{b.heading}</strong> {b.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {ps.problem.preStatus ? (
            <div className="mt-space-md rounded-lg bg-surface-container-high/40 p-space-sm pt-space-sm">
              <span className="font-label-caps text-label-caps uppercase text-outline">
                Pre-deployment Status
              </span>
              <div className="mt-1 font-code-badge text-code-badge text-inverse-surface">
                {ps.problem.preStatus}
              </div>
            </div>
          ) : null}
        </Card>

        <Card className="flex flex-col justify-between gap-space-md bg-surface-container p-space-lg">
          <div>
            <div className="mb-space-sm flex items-center gap-space-xs text-primary">
              <CircleCheck size={24} aria-hidden />
              <h3 className="font-headline-md text-headline-md font-semibold text-inverse-surface">
                {ps.solution.title}
              </h3>
            </div>
            <p className="mb-space-md font-body-md text-body-md leading-relaxed text-on-surface-variant">
              {ps.solution.context}
            </p>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface">
              {ps.solution.bullets.map((b) => (
                <li key={b.heading} className="flex items-start gap-2">
                  <CircleCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span>
                    <strong>{b.heading}</strong> {b.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {ps.solution.postStatus ? (
            <div className="mt-space-md rounded-lg bg-surface-container-high/40 p-space-sm pt-space-sm">
              <span className="font-label-caps text-label-caps uppercase text-outline">
                Post-deployment Status
              </span>
              <div className="mt-1 font-code-badge text-code-badge text-primary">
                {ps.solution.postStatus}
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </section>
  );
}

function ArchitectureSection({ arch }: { arch: Architecture }) {
  return (
    <section className="w-full bg-surface-container-lowest py-space-xl">
      <div className="mx-auto flex max-w-container flex-col gap-space-lg">
        <div className="flex flex-col gap-space-md md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Under The Hood</SectionLabel>
            <h2 className="mt-2 font-headline-xl text-headline-xl tracking-tight text-inverse-surface">
              Architecture &amp; Key Engineering Pillars
            </h2>
          </div>
          <p className="max-w-md font-body-sm text-body-sm text-on-surface-variant">
            {arch.intro}
          </p>
        </div>

        <div className="rounded-xl bg-surface-container-low p-space-lg shadow-lg">
          <div className="flex flex-col items-center justify-between gap-space-md py-4 lg:flex-row">
            {arch.layers.map((layer, i) => {
              const Icon = layerIconFor(layer.title);
              return (
                <div key={layer.title} className="flex w-full flex-col items-center gap-space-md lg:flex-row">
                  <div className="flex w-full flex-col items-center rounded-lg bg-surface-container p-space-md text-center lg:w-1/4">
                    {Icon ? (
                      <Icon
                        size={32}
                        className={cn("mb-2", layerTone[layer.tone])}
                        aria-hidden
                      />
                    ) : (
                      <Layers
                        size={32}
                        className={cn("mb-2", layerTone[layer.tone])}
                        aria-hidden
                      />
                    )}
                    <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                      {layer.label}
                    </span>
                    <div
                      className={cn(
                        "mt-1 font-code-metric text-headline-md",
                        layerTone[layer.tone]
                      )}
                    >
                      {layer.metric}
                    </div>
                    <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                      {layer.detail}
                    </p>
                  </div>
                  {i < arch.layers.length - 1 ? (
                    <Activity
                      size={28}
                      className="rotate-90 text-outline-variant lg:rotate-0"
                      aria-hidden
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureGrid({ features }: { features: ReadonlyArray<Feature> }) {
  return (
    <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-3">
      {features.map((f) => {
        const Icon = featureIcons[f.icon];
        return (
          <Card
            key={f.title}
            variant="lift"
            className="flex flex-col gap-space-sm bg-surface-container p-space-lg"
          >
            <div className="mb-space-sm flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high text-primary">
              <Icon size={22} aria-hidden />
            </div>
            <h3 className="font-headline-md text-headline-md font-semibold text-inverse-surface">
              {f.title}
            </h3>
            <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
              {f.detail}
            </p>
          </Card>
        );
      })}
    </div>
  );
}

function TechStackMatrixSection({
  columns,
}: {
  columns: ReadonlyArray<TechStackColumn>;
}) {
  return (
    <section className="flex flex-col gap-space-lg">
      <div className="flex flex-col gap-space-md md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel>Toolchain</SectionLabel>
          <h2 className="mt-2 font-headline-xl text-headline-xl tracking-tight text-inverse-surface">
            Comprehensive Tech Stack
          </h2>
        </div>
        <span className="font-code-badge text-code-badge text-on-surface-variant">
          Production Environment Ready
        </span>
      </div>

      <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => {
          const Icon = techStackIcons[col.icon];
          return (
            <Card
              key={col.title}
              className="flex flex-col justify-between gap-space-md bg-surface-container p-space-lg"
            >
              <div>
                <div className="mb-space-md flex items-center gap-2 text-primary">
                  <Icon size={24} aria-hidden />
                  <span className="font-headline-md text-headline-md font-semibold text-inverse-surface">
                    {col.title}
                  </span>
                </div>
                <div className="space-y-space-xs">
                  {col.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded bg-surface-container-high p-space-xs"
                    >
                      <span
                        className={cn(
                          "font-headline-md text-[14px] font-medium",
                          item.highlight ? "text-primary" : "text-inverse-surface"
                        )}
                      >
                        {item.name}
                      </span>
                      <span
                        className={cn(
                          "font-code-badge text-code-badge",
                          item.highlight ? "text-primary" : "text-on-surface-variant"
                        )}
                      >
                        {item.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-space-md border-t border-outline/20 pt-space-xs font-body-sm text-body-sm text-on-surface-variant">
                {col.caption}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function CodeSnippetSection({ snippet }: { snippet: CodeSnippet }) {
  return (
    <section className="rounded-xl bg-surface-container-low p-space-lg shadow-lg">
      <div className="flex flex-col items-start justify-between gap-2 pb-space-sm md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <Code size={20} className="text-primary" aria-hidden />
          <span className="font-code-badge text-code-badge text-inverse-surface">
            {snippet.filePath}
          </span>
          <span className="ml-2 rounded bg-surface-container-high px-2 py-0.5 font-label-caps text-label-caps uppercase text-on-surface-variant">
            {snippet.pill}
          </span>
        </div>
        <span className="font-body-sm text-body-sm text-outline">
          {snippet.caption}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg bg-surface-container-lowest p-space-md font-code-badge text-code-badge leading-relaxed text-on-surface">
        <pre className="font-code-badge">
          {snippet.lines.map((line, i) => (
            <CodeLineView key={i} line={line} index={i + 1} />
          ))}
        </pre>
      </div>
    </section>
  );
}

function CodeLineView({ line, index }: { line: CodeLine; index: number }) {
  if (!line.highlights || line.highlights.length === 0) {
    return (
      <div className="flex">
        <span className="mr-4 inline-block w-6 select-none text-right text-outline">
          {index}
        </span>
        <span>{line.text || "\u00A0"}</span>
      </div>
    );
  }

  // Build segments by walking the line text and matching highlights
  // greedily in their declared order. Empty highlights are skipped.
  const segments: Array<{ text: string; tone?: keyof typeof codeTone }> = [];
  let remaining = line.text;
  while (remaining.length > 0) {
    // Find the earliest-occuring match from the highlight list.
    let best: { idx: number; len: number; tone: keyof typeof codeTone } | null = null;
    for (const h of line.highlights) {
      const idx = remaining.indexOf(h.match);
      if (idx === -1) continue;
      if (best === null || idx < best.idx) {
        best = { idx, len: h.match.length, tone: h.tone };
      }
    }
    if (!best) {
      segments.push({ text: remaining });
      break;
    }
    if (best.idx > 0) {
      segments.push({ text: remaining.slice(0, best.idx) });
    }
    segments.push({ text: remaining.slice(best.idx, best.idx + best.len), tone: best.tone });
    remaining = remaining.slice(best.idx + best.len);
  }

  return (
    <div className="flex">
      <span className="mr-4 inline-block w-6 select-none text-right text-outline">
        {index}
      </span>
      <span>
        {segments.length === 0
          ? "\u00A0"
          : segments.map((seg, i) =>
              seg.tone ? (
                <span key={i} className={codeTone[seg.tone]}>
                  {seg.text}
                </span>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
      </span>
    </div>
  );
}

function ProjectNavFooter({
  prev,
  next,
}: {
  prev: Project | null;
  next: Project | null;
}) {
  return (
    <section className="w-full bg-surface-container-low py-space-xl">
      <div className="flex flex-col items-center justify-between gap-space-md sm:flex-row">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-headline-md text-[14px] font-semibold text-primary transition-colors hover:text-primary-fixed"
        >
          <ArrowLeft size={20} aria-hidden />
          <span>Back to All Projects</span>
        </Link>
        {next ? (
          <div className="flex items-center gap-space-sm">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Next Project:
            </span>
            <Link
              href={`/projects/${next.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-surface-container px-space-md py-1.5 font-headline-md text-[14px] font-medium text-inverse-surface transition-all hover:bg-surface-container-high"
            >
              <span>{next.name}</span>
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        ) : null}
      </div>
      {prev ? (
        <div className="mt-2 flex justify-end">
          <Link
            href={`/projects/${prev.id}`}
            className="inline-flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} aria-hidden />
            <span>Previous: {prev.name}</span>
          </Link>
        </div>
      ) : null}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Fallback (no deep-dive payload)                                   */
/* ------------------------------------------------------------------ */

function ProjectStub({ project }: { project: Project }) {
  return (
    <>
      <Header />
      <MobileNav />
      <main className="relative w-full bg-surface-container-lowest pt-16 pb-20 lg:pb-0">
        <div className="relative mx-auto flex max-w-container flex-col gap-space-xl px-margin py-space-xl">
          <Breadcrumb name={project.name} />
          <h1 className="font-display-hero text-display-hero tracking-tight text-inverse-surface">
            {project.name}
          </h1>
          <p className="max-w-2xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
            {project.description}
          </p>
          <ProjectCtas project={project} />
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function neighbours(target: Project): { prev: Project | null; next: Project | null } {
  const items = PROJECTS.items as unknown as Project[];
  const i = items.findIndex((p) => p.id === target.id);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? items[i - 1] : items[items.length - 1],
    next: i < items.length - 1 ? items[i + 1] : items[0],
  };
}

/**
 * Pick a representative lucide icon for an architecture layer based on
 * its title keyword. Falls back to a generic Layers icon. This avoids
 * hard-coding a `tone` → icon mapping in the data file.
 */
function layerIconFor(title: string): LucideIcon | null {
  const t = title.toLowerCase();
  if (t.includes("device") || t.includes("client") || t.includes("user")) return Monitor;
  if (t.includes("dns") || t.includes("gateway") || t.includes("ingress") || t.includes("proxy")) return Network;
  if (t.includes("memory") || t.includes("api") || t.includes("application") || t.includes("server") || t.includes("core")) return Server;
  if (t.includes("db") || t.includes("data") || t.includes("storage")) return Database;
  if (t.includes("cloud")) return Cloud;
  if (t.includes("container") || t.includes("docker")) return Container;
  return null;
}
