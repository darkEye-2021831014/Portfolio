import { GraduationCap } from "lucide-react";
import { Card, Chip, MetricTile, SectionLabel } from "@/components/ui";
import { ABOUT } from "@/content";

/**
 * About section. Renders the editorial bio (left, 7/12) and the
 * 4-metric tile grid (right, 5/12) on desktop, and stacks to two
 * rows on mobile — exactly matching `design/desktop/code.html` and
 * `design/mobile/code.html` respectively. Below that is the
 * education dossier card.
 */
export function AboutSection() {
  return (
    <section className="flex flex-col gap-space-xl" aria-labelledby="about-heading">
      <header className="flex flex-col gap-2">
        <SectionLabel>
          <GraduationCap size={16} className="mr-1" />
          {ABOUT.eyebrow}
        </SectionLabel>
        <h2
          id="about-heading"
          className="font-headline-xl text-headline-xl tracking-tight text-on-surface lg:text-headline-xl"
        >
          {ABOUT.heading}
        </h2>
      </header>

      <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
        {/* Editorial bio */}
        <div className="flex flex-col gap-6 font-body-lg text-body-lg leading-relaxed text-on-surface-variant lg:col-span-7">
          <p>{ABOUT.lead}</p>

          <p>
            Operating under the handle{" "}
            <code className="rounded bg-surface-container-high px-2 py-0.5 font-code-badge text-code-badge text-primary">
              {ABOUT.education.degree.includes("Software")
                ? "darkEye"
                : "darkEye"}
            </code>
            , I approach code as an optimisation problem where complexity
            guarantees, memory layouts, and clean abstractions must coexist.
          </p>

          {/* Education dossier card */}
          <Card className="flex flex-row items-start gap-4 p-5">
            <GraduationCap
              size={24}
              className="mt-0.5 shrink-0 text-secondary"
              aria-hidden
            />
            <div className="flex flex-col gap-1">
              <span className="font-headline-md text-headline-md text-on-surface">
                {ABOUT.education.degree}
              </span>
              <span className="font-body-sm text-body-sm text-primary">
                {ABOUT.education.institution} · {ABOUT.education.duration}
              </span>
              <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                Focused coursework: {ABOUT.education.coursework.join(", ")}.
              </p>
            </div>
          </Card>

          {/* Languages list — quiet side row. */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="font-label-caps text-label-caps uppercase tracking-[0.08em] text-on-surface-variant">
              Languages
            </span>
            {ABOUT.languages.map((lang) => (
              <Chip key={lang.name} tone="outline" shape="pill">
                {lang.name} · {lang.level}
              </Chip>
            ))}
          </div>
        </div>

        {/* 4 metric tiles — bento grid on desktop, 2×2 on mobile. */}
        <div className="grid grid-cols-2 gap-space-sm lg:col-span-5">
          {ABOUT.metrics.map((m) => (
            <MetricTile
              key={m.id}
              label={m.label}
              value={
                "suffix" in m && m.suffix ? (
                  <>
                    {m.value}
                    <span className="text-on-surface-variant">{m.suffix}</span>
                  </>
                ) : (
                  m.value
                )
              }
              caption={m.caption}
              tone={m.tone}
              sparkle={"sparkle" in m ? Boolean(m.sparkle) : false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
