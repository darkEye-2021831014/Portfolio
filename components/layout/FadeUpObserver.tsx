"use client";

import { useFadeUp } from "@/lib/motion";

/**
 * Mounts a global IntersectionObserver that fades in any element with
 * the `motion-fade-up` class as it enters the viewport. Renders no
 * DOM of its own — the hook is the entire side-effect.
 *
 * Place this once near the top of the page tree (after `<Header />`)
 * and every matching section in the page will fade up automatically.
 */
export function FadeUpObserver() {
  useFadeUp();
  return null;
}