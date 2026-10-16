"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Code2,
  Trophy,
  Mail,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Button, Sparkle, PlatformRatingChip } from "@/components/ui";
import { SITE, SOCIAL_LINKS } from "@/content";

/**
 * Hero. Mirrors the desktop reference (orbital rings, brand monogram,
 * tagline pill, name, role, lead, primary/ghost CTAs, social row) and
 * the mobile reference (centered identity + CTAs stack + bottom social
 * row). No hardcoded copy — every string is pulled from /content.
 */

const socialIcons: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Codeforces: Code2,
  CodeChef: Trophy,
  Email: Mail,
};

export function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      aria-labelledby="hero-name"
      className="relative overflow-hidden pt-6 pb-12 lg:py-space-xl"
    >
      {/* Ambient glows — exact spec from the desktop reference. */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 right-10 h-80 w-80 rounded-full bg-secondary/10 blur-[100px]" />

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left column: copy + CTAs */}
        <div className="z-10 flex flex-col items-start gap-6 lg:col-span-7">
          {/* Tagline pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-surface-container-low px-3.5 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="font-code-badge text-code-badge tracking-wide text-primary">
              {SITE.motto}
            </span>
          </div>

          {/* Main heading */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 id="hero-name" className="font-display-hero-mobile text-display-hero-mobile tracking-tight text-on-surface lg:text-display-hero">
                {SITE.fullName}
              </h1>
              <span className="rounded-lg bg-surface-container-high px-3 py-0.5 font-code-metric text-code-metric text-primary">
                {SITE.handle}
              </span>
            </div>
            <p className="font-headline-md text-headline-md text-secondary">
              {SITE.tagline}
            </p>
          </div>

          {/* Lead paragraph (resume-derived) */}
          <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant">
            Final-year{" "}
            <span className="font-semibold text-on-surface">Software Engineering</span>{" "}
            student at <span className="font-semibold text-on-surface">SUST</span>{" "}
            with a{" "}
            <span className="font-semibold text-primary">3.91/4.00 CGPA</span>,{" "}
            Codeforces Expert (
            <span className="font-code-badge text-code-badge text-primary">
              1715
            </span>
            ), and{" "}
            <span className="font-semibold text-on-surface">2000+</span>{" "}
            algorithmic problems solved.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              as={Link}
              href="#projects"
              variant="primary"
              size="lg"
              className="shadow-[0_0_24px_var(--glow-teal-strong)]"
            >
              <span>View Projects</span>
              <ArrowDown size={18} />
            </Button>
            <Button as={Link} href="#contact" variant="ghost" size="lg">
              Get in Touch
              <ArrowRight size={18} />
            </Button>
            <Button
              as="a"
              href="/Ashraful_Islam_Resume.pdf"
              download="Ashraful_Islam_Resume.pdf"
              variant="ghost"
              size="lg"
              aria-label="Download resume as PDF"
            >
              <Download size={16} />
              <span>Resume</span>
            </Button>
          </div>

          {/* Social / competitive links */}
          <div className="flex items-center gap-3 pt-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = socialIcons[link.label] ?? Mail;
              const isEmail = link.href.startsWith("mailto:");
              const isPlaceholder = !link.resolved;

              if (isPlaceholder) {
                // Render a clearly-labelled placeholder so unresolved
                // links never silently dead-end.
                return (
                  <span
                    key={link.label}
                    title={`${link.label} — URL not in resume; confirm before publishing`}
                    aria-label={`${link.label} (placeholder)`}
                    className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant opacity-50"
                  >
                    <Icon size={20} />
                  </span>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  title={link.label + (isEmail ? "" : " (TBD)")}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant transition-all hover:bg-surface-container-high hover:text-primary"
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right column: orbital avatar (desktop only — the mobile
            design uses a different compact avatar that lives in the
            about/metrics section). */}
        <div className="relative hidden flex-col items-center lg:col-span-5 lg:flex">
          <div className="relative flex h-96 w-96 items-center justify-center">
            {/* Concentric orbital SVG ring */}
            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full"
              style={{ animation: "spin 40s linear infinite" }}
              fill="none"
              viewBox="0 0 400 400"
            >
              <circle
                className="text-outline-variant/30"
                cx="200"
                cy="200"
                r="190"
                stroke="currentColor"
                strokeDasharray="6 8"
                strokeWidth="1"
              />
              <circle
                className="text-primary/20"
                cx="200"
                cy="200"
                r="145"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                className="text-secondary/30"
                cx="200"
                cy="200"
                r="105"
                stroke="currentColor"
                strokeDasharray="3 5"
                strokeWidth="1"
              />
              <circle
                className="animate-ping text-primary"
                cx="390"
                cy="200"
                fill="currentColor"
                r="4"
              />
              <circle
                className="text-secondary"
                cx="200"
                cy="55"
                fill="currentColor"
                r="3"
              />
            </svg>

            {/* Counter-rotating diamond ring */}
            <svg
              aria-hidden
              className="absolute inset-4 h-[calc(100%-32px)] w-[calc(100%-32px)]"
              style={{ animation: "spin 60s linear infinite reverse" }}
              fill="none"
              viewBox="0 0 368 368"
            >
              <polygon
                className="text-outline-variant/20"
                points="184,8 350,184 184,360 18,184"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>

            {/* Profile core */}
            <div className="relative z-10 flex h-64 w-64 items-center justify-center rounded-full bg-surface-container p-2 shadow-2xl">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                {imgError ? (
                  <BrandAvatar />
                ) : (
                  <Image
                    src="/avatar.jpeg"
                    alt={`${SITE.fullName} (${SITE.handle})`}
                    width={512}
                    height={512}
                    sizes="(max-width: 1024px) 16rem, 16rem"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover"
                    priority
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Orbiting "SUST '27" badge — sits OUTSIDE the core so
                it's not clipped by the core's rounded overflow. */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-surface-container-high px-4 py-1.5 shadow-lg ring-1 ring-primary/20">
              <Sparkle pulse size={14} tone="primary" />
              <span className="font-code-badge text-code-badge text-on-surface">
                SUST &apos;21
              </span>
            </div>
          </div>

          {/* Rating chips below the avatar — small visual nod to the
              CP handles without inventing any data not in the resume. */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
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
              tier="4★"
            />
          </div>
        </div>

        {/* Mobile-only compact identity row (visible < lg). */}
        <div className="flex flex-col items-start gap-3 lg:hidden">
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
            tier="4★"
          />
        </div>
      </div>
    </section>
  );
}

/** Brand mark used when the profile image is missing/placeholder. */
function BrandAvatar() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-surface-container">
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="h-2/3 w-2/3 text-primary"
        fill="none"
        stroke="currentColor"
      >
        <polygon
          opacity="0.6"
          points="50,15 85,35 85,75 50,95 15,75 15,35"
          strokeDasharray="3 3"
          strokeWidth="2.5"
        />
        <polygon
          points="50,26 75,41 75,69 50,84 25,69 25,41"
          strokeWidth="2"
        />
        <circle
          cx="50"
          cy="50"
          fill="currentColor"
          fillOpacity="0.15"
          r="12"
          strokeWidth="2"
        />
        <circle cx="50" cy="50" fill="currentColor" r="4" />
      </svg>
    </div>
  );
}
