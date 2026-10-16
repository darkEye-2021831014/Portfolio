"use client";

import Link from "next/link";
import {
  Home,
  Code2,
  FolderCode,
  IdCard,
  type LucideIcon,
} from "lucide-react";
import { MOBILE_TAB_ITEMS } from "@/lib/nav";
import { useActiveSection } from "@/lib/section";
import { cn } from "@/lib/cn";

const iconMap: Record<string, LucideIcon> = {
  Home,
  Code2,
  FolderCode,
  IdCard,
};

/**
 * Fixed bottom-tab navigation. Shown on viewports < lg. Matches the
 * mobile reference: 4 tabs, equal width, icon + label, active tab
 * tints to primary.
 *
 * We add `pb-safe` so the bar clears notched handsets via the iOS
 * `env(safe-area-inset-bottom)` token (provided by Tailwind's
 * `pb-safe` class, which we define as a utility below if missing).
 */
export function MobileNav() {
  const active = useActiveSection(MOBILE_TAB_ITEMS.map((t) => t.id));

  return (
    <nav
      aria-label="Mobile primary"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 lg:hidden",
        "bg-surface/85 backdrop-blur-xl",
        "shadow-[0_-1px_12px_rgba(0,0,0,0.2)]",
        "pb-[env(safe-area-inset-bottom,0px)]"
      )}
    >
      <div className="flex h-16 items-stretch justify-around px-space-sm">
        {MOBILE_TAB_ITEMS.map((item) => {
          const Icon = iconMap[item.icon] ?? Home;
          const isActive = active === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 transition-colors",
                isActive
                  ? "font-semibold text-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <Icon size={20} />
              <span className="font-label-caps text-label-caps uppercase tracking-[0.08em]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
