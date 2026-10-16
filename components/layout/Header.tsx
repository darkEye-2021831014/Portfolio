"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Terminal,
  Network,
  ArrowRight,
  Menu,
  X,
  Download,
  Send,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { NAV_ITEMS } from "@/lib/nav";
import { useActiveSection } from "@/lib/section";
import { SITE } from "@/content";
import { cn } from "@/lib/cn";

/**
 * Sticky, blurred top-of-page header. Matches the desktop reference:
 *   brand + nav (>= lg) + icon-actions + CTA + monogram avatar.
 * Below the `lg` breakpoint the centre nav collapses and a hamburger
 * toggle reveals a side drawer (the mobile nav from the design).
 *
 * Active-section highlighting comes from the `IntersectionObserver`
 * hook in `lib/section.ts`.
 */
export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "bg-canvas/85 backdrop-blur-md",
          "border-b border-outline/40"
        )}
      >
        <div className="mx-auto flex h-16 max-w-container items-center justify-between gap-space-md px-margin">
          {/* Brand */}
          <Link
            aria-label="Ashraful Islam (darkEye) — Home"
            href="#about"
            className="flex shrink-0 items-center gap-space-sm"
          >
            <Logo className="hidden sm:inline-flex" />
            <span className="inline-flex font-headline-md text-headline-md tracking-tight text-on-surface sm:hidden">
              Ashraful Islam
            </span>
            <span className="hidden items-center gap-space-xs rounded bg-surface-container-high border border-outline-variant/40 px-2 py-0.5 font-code-badge text-code-badge text-primary sm:inline-flex">
              darkEye
            </span>
          </Link>

          {/* Centre nav (desktop) */}
          <nav
            className="hidden items-center gap-space-lg lg:flex"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "font-body-sm text-body-sm transition-colors",
                    isActive
                      ? "font-bold text-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right-side icon actions */}
          <div className="flex shrink-0 items-center gap-space-sm">
            <Link
              aria-label="Code profile"
              href="#cp"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
            >
              <Terminal size={20} />
            </Link>
            <Link
              aria-label="Network profile"
              href="#achievements"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
            >
              <Network size={20} />
            </Link>
            <Button
              variant="primary"
              size="sm"
              className="hidden shadow-[0_0_16px_var(--glow-teal)] sm:inline-flex"
              as={Link}
              href="#contact"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Button>
            <Image
              src="/avatar.jpeg"
              alt={`${SITE.fullName} (${SITE.handle})`}
              width={32}
              height={32}
              sizes="32px"
              className="hidden h-8 w-8 rounded-full object-cover ring-1 ring-primary/30 md:inline-flex"
              priority={false}
            />

            {/* Mobile drawer trigger */}
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-surface-container-low text-on-surface hover:text-primary transition-colors lg:hidden"
            >
              {drawerOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer (slides from the right) */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        active={active}
      />
    </>
  );
}

function MobileDrawer({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: string | null;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-canvas/80 backdrop-blur-md transition-opacity duration-300 lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />
      {/* Panel */}
      <aside
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-y-0 right-0 z-40 flex h-full w-[82vw] max-w-[340px] flex-col justify-between",
          "bg-surface-container-low/90 backdrop-blur-2xl p-space-lg shadow-2xl",
          "transform transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between pb-space-md">
            <div className="flex items-center gap-space-xs">
              <Terminal size={20} className="text-primary" />
              <span className="font-headline-md text-body-md font-bold text-on-surface">
                Navigation
              </span>
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <nav
            className="mt-space-sm flex flex-col gap-space-xs"
            aria-label="Mobile primary"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex min-h-[44px] items-center gap-space-sm rounded-lg px-space-sm transition-all",
                    isActive
                      ? "bg-surface-container text-primary"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="font-body-md text-body-md">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-space-sm pt-space-md">
          <Button
            variant="primary"
            size="md"
            as={Link}
            href="#contact"
            onClick={onClose}
            className="w-full"
          >
            <Download size={18} />
            Download Resume
          </Button>
          <Button
            variant="ghost"
            size="md"
            as={Link}
            href="#contact"
            onClick={onClose}
            className="w-full"
          >
            <Send size={18} />
            Initiate Contact
          </Button>
          <span className="mt-space-xs text-center font-code-badge text-code-badge text-outline">
            {"// Ashraful Islam © 2026"}
          </span>
        </div>
      </aside>
    </>
  );
}
