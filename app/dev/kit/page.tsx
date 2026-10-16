import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Send,
  Trophy,
  X,
  Check,
  Menu,
  Terminal,
} from "lucide-react";
import {
  Button,
  Card,
  Chip,
  Pill,
  Logo,
  MetricTile,
  PlatformRatingChip,
  SectionLabel,
  Sparkle,
} from "@/components/ui";
import { Footer, Header, MobileNav, RadialGlow } from "@/components/layout";

export const metadata: Metadata = {
  title: "Design System Kit — Ashraful Islam",
  description:
    "Component-level showcase for the Nocturne Algorithmic portfolio design system.",
  robots: { index: false, follow: false },
};

// Force the page to render per-request so `process.env.DEV_KIT_ENABLED`
// is re-evaluated on every hit. Without this, Next.js prerenders the
// page at build time and the env read is frozen — toggling the flag
// in Vercel wouldn't take effect without a rebuild.
export const dynamic = "force-dynamic";

/**
 * /dev/kit — the design system reference page.
 *
 * Renders one instance of every UI primitive in every documented variant
 * and tone, plus a live mini-header and mobile-nav so reviewers can exercise
 * interaction states. Content is sourced exclusively from `design/resume.pdf`
 * — no invented metrics, claims, or links.
 *
 * Gated behind `DEV_KIT_ENABLED=1` so the showcase is never reachable on the
 * deployed site by default. The flag is server-only (no `NEXT_PUBLIC_`
 * prefix), so it never leaks into the client bundle. When the flag is off
 * (the default in production), `notFound()` returns a real 404.
 */
export default function KitPage() {
  if (process.env.DEV_KIT_ENABLED !== "1") {
    notFound();
  }
  return (
    <>
      <Header />
      <MobileNav />

      <main className="relative w-full bg-surface-container-lowest pt-24 pb-32 lg:pb-16">
        <RadialGlow />

        <div className="relative mx-auto flex max-w-container flex-col gap-space-xl px-margin">
          {/* Header */}
          <header className="flex flex-col gap-space-sm">
            <SectionLabel>Design System · /dev/kit</SectionLabel>
            <h1 className="font-headline-xl text-headline-xl tracking-tight text-on-surface sm:text-display-hero-mobile">
              Nocturne Algorithmic ·{" "}
              <span className="text-primary">darkEye</span> Component Kit
            </h1>
            <p className="max-w-2xl font-body-md text-body-md text-on-surface-variant">
              Every primitive the portfolio composes from, every variant, every
              tone. Live copies of the header and bottom nav sit on top so
              interaction states are visible without leaving the page.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Pill shape="pill" tone="primary">
                <Sparkle pulse size={12} />
                phase 2 complete
              </Pill>
              <Chip tone="outline">tokens: design/desktop/code.html</Chip>
              <Chip tone="outline">content: design/resume.pdf</Chip>
            </div>
          </header>

          {/* Buttons */}
          <section className="flex flex-col gap-space-md">
            <SectionLabel>01 · Button</SectionLabel>
            <Card>
              <div className="flex flex-col gap-space-md">
                <div className="flex flex-wrap items-center gap-space-sm">
                  <Button>Primary · default</Button>
                  <Button size="sm">Primary · sm</Button>
                  <Button size="lg">Primary · lg</Button>
                  <Button disabled>Disabled</Button>
                </div>
                <div className="flex flex-wrap items-center gap-space-sm">
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="ghost" size="sm">
                    Ghost · sm
                  </Button>
                  <Button
                    variant="primary"
                    as={Link}
                    href="#contact"
                  >
                    <Mail size={16} />
                    Get in Touch
                  </Button>
                  <Button variant="primary" as={Link} href="#projects">
                    View Projects
                    <ArrowRight size={16} />
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-space-sm">
                  <Button variant="icon" aria-label="GitHub">
                    <Github size={20} />
                  </Button>
                  <Button variant="icon" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </Button>
                  <Button variant="icon" aria-label="Send">
                    <Send size={20} />
                  </Button>
                  <Button variant="icon" aria-label="Open link">
                    <ExternalLink size={20} />
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          {/* Card */}
          <section className="flex flex-col gap-space-md">
            <SectionLabel>02 · Card</SectionLabel>
            <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
              <Card variant="rest">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Resting card
                </h3>
                <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                  The default resting tier — surface-container background, soft
                  hairline border, no hover transform.
                </p>
              </Card>
              <Card variant="lift">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Lift card · teal glow
                </h3>
                <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                  Hover to reveal the -2px lift and a primary-tinted outline.
                </p>
              </Card>
              <Card variant="lift" altGlow>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Lift card · violet glow
                </h3>
                <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                  Use <code className="font-mono text-secondary">altGlow</code>{" "}
                  on cards whose theme is the secondary palette.
                </p>
              </Card>
              <Card
                variant="rest"
                badge={<Sparkle tone="primary" pulse size={14} />}
              >
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Card with top-right badge
                </h3>
                <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                  The corner slot accepts any node — a Sparkle by convention,
                  but icons are fine.
                </p>
              </Card>
            </div>
          </section>

          {/* Chip + Pill */}
          <section className="flex flex-col gap-space-md">
            <SectionLabel>03 · Chip · Pill</SectionLabel>
            <Card>
              <div className="flex flex-col gap-space-md">
                <div className="flex flex-wrap gap-2">
                  <Chip tone="neutral">Neutral chip</Chip>
                  <Chip tone="primary">Primary chip</Chip>
                  <Chip tone="secondary">Secondary chip</Chip>
                  <Chip tone="tertiary">Tertiary chip</Chip>
                  <Chip tone="outline">Outline chip</Chip>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Chip shape="pill" tone="neutral">
                    Neutral pill
                  </Chip>
                  <Chip shape="pill" tone="primary">
                    Primary pill
                  </Chip>
                  <Chip shape="pill" tone="secondary">
                    Secondary pill
                  </Chip>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Chip label="Handle:" value="darkEye" tone="outline" />
                  <Chip label="Codeforces" value="Expert" tone="primary" />
                  <Chip
                    label="Eligibility:"
                    value="May 2026"
                    tone="secondary"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Pill shape="pill" tone="primary">
                    <Sparkle pulse size={12} />
                    Featured
                  </Pill>
                  <Pill shape="pill" tone="secondary">
                    <Sparkles size={12} />
                    Awarded
                  </Pill>
                  <Pill shape="pill" tone="tertiary">
                    Open source
                  </Pill>
                </div>
              </div>
            </Card>
          </section>

          {/* MetricTile */}
          <section className="flex flex-col gap-space-md">
            <SectionLabel>04 · MetricTile</SectionLabel>
            <div className="grid grid-cols-2 gap-space-sm md:grid-cols-4">
              <MetricTile
                label="CGPA"
                value={<>3.91<span className="text-on-surface-variant"> / 4.00</span></>}
                caption="SUST"
                tone="primary"
                sparkle
              />
              <MetricTile label="Codeforces" value="1715" caption="Expert" tone="primary" />
              <MetricTile label="CodeChef" value="1956" caption="4★" tone="secondary" />
              <MetricTile
                label="Solved"
                value="2000+"
                caption="Global judges"
                tone="on-surface"
                sparkle
              />
              <MetricTile label="Continental" value="Asia-West" caption="ICPC 2025" tone="tertiary" sparkle />
              <MetricTile label="Contests" value="2" caption="SUST IUPC" tone="on-surface" />
              <MetricTile label="Projects" value="4" caption="Featured" tone="secondary" />
              <MetricTile label="Languages" value="5" caption="Spoken" tone="primary" />
            </div>
          </section>

          {/* PlatformRatingChip */}
          <section className="flex flex-col gap-space-md">
            <SectionLabel>05 · PlatformRatingChip</SectionLabel>
            <Card>
              <div className="flex flex-col gap-space-md">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Platform-specific brand colors per the design brief — Codeforces
                  Blue, CodeChef Bronze/Gold. Use only with the resume-canonical
                  handles.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <PlatformRatingChip
                    platform="codeforces"
                    handle="darkEye"
                    rating="1715"
                    tier="Expert"
                  />
                  <PlatformRatingChip
                    platform="codechef"
                    handle="voideye"
                    rating="1956"
                    tier="4★ Div 1"
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* SectionLabel */}
          <section className="flex flex-col gap-space-md">
            <SectionLabel>06 · SectionLabel</SectionLabel>
            <Card>
              <div className="flex flex-col gap-space-md">
                <SectionLabel>01. About Me</SectionLabel>
                <SectionLabel>02. Algorithmic Prowess</SectionLabel>
                <SectionLabel>03. Featured Projects</SectionLabel>
                <SectionLabel>04. Competency Inventory</SectionLabel>
                <SectionLabel>05. Honors &amp; Achievements</SectionLabel>
                <SectionLabel>06. Connect</SectionLabel>
              </div>
            </Card>
          </section>

          {/* Sparkle */}
          <section className="flex flex-col gap-space-md">
            <SectionLabel>07 · Sparkle</SectionLabel>
            <Card>
              <div className="flex flex-wrap items-center gap-space-lg">
                <Sparkle tone="primary" size={20} />
                <Sparkle tone="primary" size={20} pulse />
                <Sparkle tone="secondary" size={20} />
                <Sparkle tone="secondary" size={20} pulse />
                <Sparkle tone="tertiary" size={20} />
                <Sparkle tone="tertiary" size={20} pulse />
                <Sparkle tone="on-surface" size={20} />
                <Sparkle tone="primary" size={36} pulse />
              </div>
            </Card>
          </section>

          {/* Logo */}
          <section className="flex flex-col gap-space-md">
            <SectionLabel>08 · Logo</SectionLabel>
            <Card>
              <div className="flex flex-col gap-space-md">
                <Logo />
                <div className="flex items-center gap-space-sm">
                  <Logo variant="monogram" />
                  <Logo variant="monogram" className="bg-secondary text-on-secondary" />
                </div>
              </div>
            </Card>
          </section>

          {/* Layout — header / footer / mobile nav */}
          <section className="flex flex-col gap-space-md">
            <SectionLabel>09 · Layout primitives</SectionLabel>
            <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
              <Card>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  Header
                </h3>
                <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                  The live header sits at the top of this page. It is fixed,
                  blurred, and tracks the active section via{" "}
                  <code className="font-mono text-secondary">IntersectionObserver</code>.
                </p>
                <ul className="mt-3 space-y-2 font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    Brand + <code className="font-mono">darkEye</code> chip
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    Centre nav shown <code className="font-mono">≥ lg</code>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    Hamburger + drawer shown{" "}
                    <code className="font-mono">&lt; lg</code>
                  </li>
                </ul>
              </Card>
              <Card>
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  MobileNav · Footer
                </h3>
                <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                  Bottom tabs (4 entries) sit at the bottom of the page on
                  viewports <code className="font-mono">&lt; lg</code>.
                </p>
                <ul className="mt-3 space-y-2 font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    Safe-area inset respected
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    Footer fixed below fold, blurred backdrop
                  </li>
                </ul>
              </Card>
            </div>

            {/* Live mini-radial demo so reviewer can see what stops look like */}
            <Card>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                RadialGlow stops
              </h3>
              <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                Two ambient glow blobs — top-left teal, top-right violet — sit
                behind the main content area.
              </p>
              <div className="relative mt-4 h-40 overflow-hidden rounded-xl bg-surface-container-low">
                <RadialGlow
                  stops={[
                    {
                      className:
                        "absolute -top-8 left-1/4 h-32 w-32 rounded-full bg-primary/30 blur-[80px]",
                    },
                    {
                      className:
                        "absolute top-1/3 right-10 h-28 w-28 rounded-full bg-secondary/30 blur-[70px]",
                    },
                  ]}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-code-badge text-code-badge text-on-surface-variant">
                    {"// ambient backdrop"}
                  </span>
                </div>
              </div>
            </Card>
          </section>

          {/* Iconography / iconography-only row */}
          <section className="flex flex-col gap-space-md">
            <SectionLabel>10 · Iconography (lucide-react)</SectionLabel>
            <Card>
              <div className="flex flex-wrap items-center gap-4 text-on-surface-variant">
                <ArrowRight size={20} />
                <ArrowUpRight size={20} />
                <Code2 size={20} />
                <Download size={20} />
                <ExternalLink size={20} />
                <Github size={20} />
                <Linkedin size={20} />
                <Mail size={20} />
                <Menu size={20} />
                <Send size={20} />
                <Sparkles size={20} />
                <Terminal size={20} />
                <Trophy size={20} />
                <X size={20} />
              </div>
            </Card>
          </section>

          {/* Content-only example card — resume-grounded */}
          <section className="flex flex-col gap-space-md">
            <SectionLabel>11 · Composition example (resume-grounded)</SectionLabel>
            <Card>
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    SustCafeteria
                  </h3>
                  <Chip tone="primary">React · Node · MySQL · Docker</Chip>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Full-stack cafeteria ticketing, coupon verification, and
                  inventory engine deployed at SUST with JWT auth and role-based
                  access, dockerized behind Nginx.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <PlatformRatingChip
                    platform="codeforces"
                    handle="darkEye"
                    rating="1715"
                    tier="Expert"
                  />
                  <PlatformRatingChip
                    platform="codechef"
                    handle="voideye"
                    rating="1956"
                    tier="4★ Div 1"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-space-sm">
                  <Button size="sm">
                    Explore case study
                    <ArrowUpRight size={14} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    Source
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          <footer className="mt-space-lg flex items-center justify-between gap-space-sm border-t border-outline-variant/40 pt-space-md font-code-badge text-code-badge text-on-surface-variant">
            <span>{"// /dev/kit — phase 2"}</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-primary hover:text-primary-fixed"
            >
              <ArrowRight size={14} />
              back to /
            </Link>
          </footer>
        </div>
      </main>

      <Footer />
    </>
  );
}
