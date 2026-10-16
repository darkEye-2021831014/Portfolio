import { Download } from "lucide-react";
import { SITE } from "@/content";

/**
 * Page footer. Matches the desktop reference: copyright on the left,
 * availability pulse + downloadable resume on the right. Email is
 * intentionally omitted here (it lives in the Contact section).
 */
export function Footer() {
  return (
    <footer className="w-full border-t border-outline/40 bg-canvas py-space-lg">
      <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-space-sm px-margin text-center sm:flex-row sm:text-left">
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          © 2026 {SITE.fullName} · Quiet corners hide the best stories
        </p>
        <div className="flex flex-wrap items-center justify-center gap-space-md font-label-caps text-label-caps uppercase tracking-[0.08em] text-on-surface-variant">
          <a
            href="/Ashraful_Islam_Resume.pdf"
            download="Ashraful_Islam_Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-lg border border-outline/40 bg-surface-container-low px-space-sm py-1 text-on-surface transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Download size={12} aria-hidden />
            <span>Resume (PDF)</span>
          </a>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Available for Systems Engineering
          </span>
        </div>
      </div>
    </footer>
  );
}
