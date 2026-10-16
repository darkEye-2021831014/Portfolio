"use client";

/**
 * Lightweight IntersectionObserver hook that toggles the `is-visible`
 * class on elements with the `motion-fade-up` class. When
 * `prefers-reduced-motion: reduce` is set, the hook is a no-op and the
 * CSS rule in globals.css shows the element immediately.
 *
 * Usage:
 *   useFadeUp({ rootMargin: "-10% 0px -10% 0px" });
 *   // ...in markup:
 *   <section className="motion-fade-up" />
 *
 * The observer is created once per mount and reused for every element
 * matching the selector (so a single observer handles all sections on
 * the page).
 */

import { useEffect } from "react";

type Options = {
  /** Element to scope the observer to. Defaults to document. */
  root?: Element | null;
  /** CSS selector for elements to observe. Default: ".motion-fade-up". */
  selector?: string;
  /** IntersectionObserver root margin. Default: "0px 0px -10% 0px". */
  rootMargin?: string;
  /** Visibility threshold. Default: 0.1 (10% of element visible). */
  threshold?: number;
  /** When true, the class is removed once visible (one-shot reveal).
   *  When false (default), the class toggles on every intersection. */
  once?: boolean;
};

export function useFadeUp(options: Options = {}) {
  const {
    root = null,
    selector = ".motion-fade-up",
    rootMargin = "0px 0px -10% 0px",
    threshold = 0.1,
    once = true,
  } = options;

  useEffect(() => {
    // Skip entirely when the user prefers reduced motion. The CSS rule
    // already shows the elements in their final state.
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    // Wait one frame so server-rendered HTML is in the DOM before we
    // query it. Otherwise the observer can miss late-mounted elements.
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selector),
    );
    if (elements.length === 0) return;

    // If the browser doesn't support IntersectionObserver (very old
    // browsers), reveal everything immediately.
    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        }
      },
      { root, rootMargin, threshold },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [root, selector, rootMargin, threshold, once]);
}