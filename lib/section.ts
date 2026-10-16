"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which top-level section id is currently dominant in the viewport.
 * Drives the active-state highlight in `Header` and `MobileNav`.
 *
 * Falls back to `null` (no highlight) when no section is observed — this
 * is the expected behaviour on the /dev/kit page and during the brief
 * moment between hydration and the first scroll.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || ids.length === 0) return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the section whose top is closest to the header bottom.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        // Bias the trigger band to roughly the upper third of the viewport,
        // which matches where the eye lands after a click.
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
