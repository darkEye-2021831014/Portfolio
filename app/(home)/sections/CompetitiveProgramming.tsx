import { Trophy, BarChart3, Star, Radio } from "lucide-react";
import {
  Card,
  Pill,
  PlatformRatingChip,
  SectionLabel,
  Sparkle,
} from "@/components/ui";
import { CP, type PlatformHandle } from "@/content";
import { cn } from "@/lib/cn";
import { getCodeforcesDisplay } from "@/lib/codeforces";

/**
 * Competitive Programming section. Two platform cards, a combined
 * rating-trajectory strip, contest-attendance chips, and a peak
 * achievements banner. Every copy from `content/cp.ts`.
 *
 * The Codeforces card pulls live stats from
 * `lib/codeforces.ts` (cached 6h via Next.js Data Cache). On any
 * failure the static values from `content/cp.ts` are used, so the
 * page never breaks when the upstream is unreachable.
 */
export async function CompetitiveProgrammingSection() {
  const liveCf = await getCodeforcesDisplay();
  const platforms: ReadonlyArray<PlatformHandle> = CP.platforms.map((p) =>
    p.id === "codeforces"
      ? { ...p, rating: liveCf.display.rating, tier: liveCf.display.tier }
      : p,
  );

  return (
    <section
      id="cp"
      aria-labelledby="cp-heading"
      className="flex flex-col gap-space-xl"
    >
      <header className="flex flex-col gap-2">
        <SectionLabel>
          <Trophy size={16} className="mr-1" />
          {CP.eyebrow}
        </SectionLabel>
        <h2
          id="cp-heading"
          className="font-headline-xl text-headline-xl tracking-tight text-on-surface"
        >
          {CP.heading}
        </h2>
        <p className="max-w-2xl font-body-md text-body-md text-on-surface-variant">
          {CP.description}
        </p>
      </header>

      {/* Two platform cards */}
      <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
        {platforms.map((p) => (
          <PlatformCard
            key={p.id}
            platform={p}
            liveMeta={p.id === "codeforces" ? liveCf : null}
          />
        ))}
      </div>

      {/* Rating Trajectory strip */}
      <Card>
        <div className="flex flex-col gap-space-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-headline-md text-headline-md text-on-surface">
                Rating Trajectory
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Both handles — Codeforces Expert and CodeChef 4★ — climbed
                steadily from the Newbie tier.
              </span>
            </div>
            <div className="flex items-center gap-4 font-code-badge text-code-badge">
              <span className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                Codeforces · darkEye
              </span>
              <span className="flex items-center gap-1.5 text-secondary">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                CodeChef · voideye
              </span>
            </div>
          </div>
          <div className="relative flex h-44 w-full items-end">
            <TrajectoryChart />
          </div>
        </div>
      </Card>

      {/* Contest attendance — bigger card grid with totals footer. */}
      <InterUniversityPresence />

      {/* Peak achievements banner */}
      <Card className="flex items-center gap-space-md">
        <Trophy size={28} className="shrink-0 text-primary" aria-hidden />
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {CP.peakAchievements.map((a) => (
            <div key={a.label} className="flex flex-col">
              <span className="font-headline-md text-headline-md text-on-surface">
                {a.label}
              </span>
              <span className="font-body-sm text-body-sm text-primary">
                {a.meta}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

function PlatformCard({
  platform,
  liveMeta,
}: {
  platform: PlatformHandle;
  liveMeta: { source: "live" | "fallback"; fetchedAt: string | null } | null;
}) {
  const Icon = platform.id === "codeforces" ? BarChart3 : Star;
  const tone = platform.id === "codeforces" ? "primary" : "secondary";
  const iconToneClass =
    platform.id === "codeforces" ? "text-primary" : "text-secondary";
  const url = platform.url === "TBD" ? "#" : platform.url;
  const isPlaceholder = platform.url === "TBD";

  return (
    <Card
      variant="lift"
      className="flex flex-col justify-between gap-space-md"
      badge={
        <div className="flex items-center gap-1.5">
          {liveMeta ? <LiveBadge meta={liveMeta} /> : null}
          <Pill shape="pill" tone={tone}>
            <Sparkle pulse size={12} />
            {platform.tier} Tier
          </Pill>
        </div>
      }
    >
      <div>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high",
              iconToneClass
            )}
          >
            <Icon size={22} />
          </span>
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              {platform.platform}
            </h3>
            <span className="font-code-badge text-code-badge text-on-surface-variant">
              handle: {platform.handle}
            </span>
          </div>
        </div>
        <div className="my-space-md flex items-baseline gap-4">
          <span className="font-code-metric text-display-hero-mobile text-on-surface">
            {platform.rating}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Max Rating
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {platform.highlight}
        </p>
      </div>

      {/* sparkline + url row */}
      <div className="flex flex-wrap items-center gap-space-sm border-t border-outline-variant/30 pt-space-sm">
        <PlatformRatingChip
          platform={platform.id}
          handle={platform.handle}
          rating={platform.rating}
          tier={platform.tier}
        />
        {isPlaceholder ? (
          <span className="font-code-badge text-code-badge text-on-surface-variant">
            (URL not in resume — TBD)
          </span>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="font-code-badge text-code-badge text-primary hover:underline"
          >
            View profile →
          </a>
        )}
      </div>
    </Card>
  );
}

function TrajectoryChart() {
  // Two trajectory series laid out side-by-side across the same viewBox.
  // We hard-code the path coordinates here because they're a pure visual
  // representation of the data in /content/cp.ts — no extra facts.
  return (
    <svg
      aria-hidden
      className="h-full w-full overflow-visible"
      preserveAspectRatio="none"
      viewBox="0 0 900 160"
    >
      <defs>
        <linearGradient id="cf-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4fdbc8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4fdbc8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cc-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d0bcff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#d0bcff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* gridlines */}
      <line
        className="text-surface-container-high"
        x1="0"
        x2="900"
        y1="130"
        y2="130"
        stroke="currentColor"
        strokeDasharray="4 4"
        strokeWidth="1"
      />
      <line
        className="text-surface-container-high"
        x1="0"
        x2="900"
        y1="85"
        y2="85"
        stroke="currentColor"
        strokeDasharray="4 4"
        strokeWidth="1"
      />
      <line
        className="text-surface-container-high"
        x1="0"
        x2="900"
        y1="35"
        y2="35"
        stroke="currentColor"
        strokeDasharray="4 4"
        strokeWidth="1"
      />

      {/* Codeforces area + stroke */}
      <path
        d="M 0,150 L 120,135 L 240,118 L 360,110 L 480,95 L 600,75 L 720,55 L 840,30 L 900,24 L 900,160 L 0,160 Z"
        fill="url(#cf-gradient)"
      />
      <path
        d="M 0,150 L 120,135 L 240,118 L 360,110 L 480,95 L 600,75 L 720,55 L 840,30 L 900,24"
        fill="none"
        stroke="#4fdbc8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <circle cx="240" cy="118" r="4" fill="#1a1b21" stroke="#4fdbc8" strokeWidth="2" />
      <circle cx="600" cy="75" r="4" fill="#1a1b21" stroke="#4fdbc8" strokeWidth="2" />
      <circle cx="900" cy="24" r="5" fill="#4fdbc8" />

      {/* CodeChef area + stroke (mirrored, slightly lower curve) */}
      <path
        d="M 0,150 L 120,142 L 240,134 L 360,128 L 480,118 L 600,108 L 720,92 L 840,72 L 900,60 L 900,160 L 0,160 Z"
        fill="url(#cc-gradient)"
      />
      <path
        d="M 0,150 L 120,142 L 240,134 L 360,128 L 480,118 L 600,108 L 720,92 L 840,72 L 900,60"
        fill="none"
        stroke="#d0bcff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <circle cx="900" cy="60" r="4" fill="#d0bcff" />
    </svg>
  );
}

/**
 * Tiny "live / cached" indicator next to the Codeforces card. Renders
 * only on the Codeforces platform. When `source === "live"` the value
 * is fresh from the upstream; when `"fallback"` we show a "cached" hint
 * so visitors know the resume value is in use.
 */
function LiveBadge({
  meta,
}: {
  meta: { source: "live" | "fallback"; fetchedAt: string | null };
}) {
  if (meta.source === "live") {
    return (
      <span
        className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-code-badge text-[10px] font-medium uppercase tracking-wider text-primary"
        title={
          meta.fetchedAt
            ? `Last refreshed ${new Date(meta.fetchedAt).toUTCString()} — refreshes every 6h`
            : "Live Codeforces data"
        }
      >
        <Radio size={10} className="animate-pulse" aria-hidden />
        Live
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-surface-container-high px-2 py-0.5 font-code-badge text-[10px] font-medium uppercase tracking-wider text-on-surface-variant"
      title="Codeforces API unreachable — showing resume value. Will retry on next request."
    >
      Cached
    </span>
  );
}

/**
 * Inter-University Presence — a denser treatment of the contest-
 * attendance data so it stops looking like a chip dump. Renders each
 * contest as its own card with a count badge, tiers Frequent (≥2)
 * with the primary tone and Single (1) with a neutral tone, and
 * closes the section with a totals footer.
 */
function InterUniversityPresence() {
  const total = CP.contestAttendance.reduce((s, c) => s + c.count, 0);
  const unique = new Set(
    CP.contestAttendance.map((c) => c.name.split(" ")[0]),
  ).size;
  const sorted = [...CP.contestAttendance].sort((a, b) => b.count - a.count);

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-label-caps text-label-caps uppercase tracking-[0.08em] text-on-surface-variant">
          Inter-University Presence
        </span>
        <span className="font-code-badge text-code-badge text-on-surface-variant">
          {total} contests · {unique} universities
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {sorted.map((c) => {
          const isFrequent = c.count >= 2;
          return (
            <div
              key={c.name}
              className={cn(
                "group flex cursor-default items-center justify-between gap-2 rounded-xl border bg-surface-container px-3 py-2.5",
                "transition-all duration-300",
                "hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/[0.06]",
                "hover:shadow-[0_12px_32px_-8px_var(--glow-teal-strong)]",
                isFrequent
                  ? "border-primary/40 bg-primary/[0.06]"
                  : "border-outline/40",
              )}
            >
              <span
                className={cn(
                  "truncate font-code-badge text-code-badge transition-colors duration-300",
                  isFrequent
                    ? "text-on-surface group-hover:text-primary"
                    : "text-on-surface-variant group-hover:text-on-surface",
                )}
              >
                {c.name}
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-md px-2 py-0.5 font-code-badge text-[11px] font-semibold transition-all duration-300",
                  "group-hover:scale-110",
                  isFrequent
                    ? "bg-primary/20 text-primary group-hover:bg-primary group-hover:text-on-primary"
                    : "bg-surface-container-high text-on-surface-variant group-hover:bg-primary/15 group-hover:text-primary",
                )}
              >
                ×{c.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
