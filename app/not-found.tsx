import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Compass, Home, Search } from "lucide-react";
import { Header, MobileNav, Footer, RadialGlow } from "@/components/layout";
import { Button, Card, SectionLabel } from "@/components/ui";
import { PROJECTS, CONTACT } from "@/content";

export const metadata: Metadata = {
  title: "404 · Signal lost · Ashraful Islam",
  description:
    "The page you were looking for has drifted out of the active project window. Head back to the home page or browse the featured projects.",
};

/**
 * Custom 404. Reuses the home-page chrome (Header, MobileNav, Footer,
 * RadialGlow) so the missing page doesn't look like a system error,
 * but swaps the body for a friendly "signal lost" message with quick
 * links to the most-visited sections.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <MobileNav />

      <main className="relative w-full bg-surface-container-lowest pt-16 pb-20 lg:pb-0">
        <RadialGlow
          stops={[
            {
              className:
                "absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-error/10 via-error/5 to-transparent blur-3xl pointer-events-none rounded-full",
            },
            {
              className:
                "absolute top-24 -right-20 w-[420px] h-[320px] bg-primary/10 blur-3xl pointer-events-none rounded-full",
            },
          ]}
        />

        <div className="relative mx-auto flex max-w-container flex-col gap-space-xl px-margin py-space-xl">
          <SectionLabel>
            <Compass size={16} className="mr-1" aria-hidden />
            404 · Signal Lost
          </SectionLabel>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-space-sm">
              <h1 className="font-display-hero text-display-hero-mobile tracking-tight text-inverse-surface lg:text-display-hero">
                The page you wanted has drifted out of the active project
                window.
              </h1>
              <p className="max-w-2xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
                Either the link is stale, the project page is no longer
                published, or you typed the URL by hand. Jump back to the home
                page, browse a featured project, or get in touch.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button as={Link} href="/" variant="primary" size="lg">
                <Home size={18} aria-hidden />
                <span>Back to Home</span>
              </Button>
              <Button as={Link} href="/#projects" variant="ghost" size="lg">
                <Search size={18} aria-hidden />
                <span>Browse Projects</span>
              </Button>
            </div>
          </div>

          {/* Suggested destinations */}
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-3">
            <Card
              variant="lift"
              className="flex flex-col gap-space-sm bg-surface-container p-space-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                <Search size={22} aria-hidden />
              </div>
              <h3 className="font-headline-md text-headline-md font-semibold text-inverse-surface">
                Browse the project archive
              </h3>
              <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                Four featured case studies — SustCafeteria, Plan2Go,
                TransactionManager, and JungleRush.
              </p>
              <ul className="space-y-1 pt-2 font-code-badge text-code-badge">
                {PROJECTS.items.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/projects/${p.id}`}
                      className="inline-flex items-center gap-1.5 text-on-surface transition-colors hover:text-primary"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      <span>{p.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>

            <Card
              variant="lift"
              className="flex flex-col gap-space-sm bg-surface-container p-space-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high text-secondary">
                <Compass size={22} aria-hidden />
              </div>
              <h3 className="font-headline-md text-headline-md font-semibold text-inverse-surface">
                Jump to a section
              </h3>
              <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                The home page is the canonical map of the portfolio.
              </p>
              <ul className="space-y-1 pt-2 font-code-badge text-code-badge">
                <li>
                  <Link
                    href="/#about"
                    className="inline-flex items-center gap-1.5 text-on-surface transition-colors hover:text-primary"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    <span>About + Key Metrics</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#cp"
                    className="inline-flex items-center gap-1.5 text-on-surface transition-colors hover:text-primary"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    <span>Competitive Programming</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#skills"
                    className="inline-flex items-center gap-1.5 text-on-surface transition-colors hover:text-primary"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    <span>Technical Proficiencies</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#achievements"
                    className="inline-flex items-center gap-1.5 text-on-surface transition-colors hover:text-primary"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    <span>Honors &amp; Achievements</span>
                  </Link>
                </li>
              </ul>
            </Card>

            <Card
              variant="lift"
              className="flex flex-col gap-space-sm bg-surface-container p-space-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high text-tertiary">
                <ArrowLeft size={22} aria-hidden />
              </div>
              <h3 className="font-headline-md text-headline-md font-semibold text-inverse-surface">
                Get in touch directly
              </h3>
              <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                If you followed a link you think should work, send a note and
                I&apos;ll patch it.
              </p>
              <Link
                href={`mailto:${CONTACT.email}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-2 font-code-badge text-code-badge text-primary transition-colors hover:text-primary-fixed"
              >
                <span>{CONTACT.email}</span>
              </Link>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
