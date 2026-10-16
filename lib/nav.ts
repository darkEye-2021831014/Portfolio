/**
 * Shared navigation definition. Used by the desktop header, the mobile
 * bottom tab nav, and the mobile drawer. Items reference homepage
 * section ids; the same set will be used by the homepage when it is
 * built out in the next phase.
 */
export type NavItem = {
  id: string;
  label: string;
  href: string;
  /** lucide-react icon name (used by the mobile bottom nav). */
  icon:
    | "User"
    | "Code2"
    | "FolderCode"
    | "IdCard"
    | "Sparkles"
    | "Trophy"
    | "Mail"
    | "Home";
};

export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About", href: "#about", icon: "User" },
  {
    id: "cp",
    label: "Competitive Programming",
    href: "#cp",
    icon: "Code2",
  },
  { id: "projects", label: "Projects", href: "#projects", icon: "FolderCode" },
  { id: "skills", label: "Skills", href: "#skills", icon: "Sparkles" },
  {
    id: "achievements",
    label: "Achievements",
    href: "#achievements",
    icon: "Trophy",
  },
  { id: "contact", label: "Contact", href: "#contact", icon: "Mail" },
];

/** Mobile bottom-tab nav uses only the 4 most-tapped sections. */
export const MOBILE_TAB_ITEMS: NavItem[] = [
  { id: "about", label: "Overview", href: "#about", icon: "Home" },
  { id: "cp", label: "CP / Algo", href: "#cp", icon: "Code2" },
  { id: "projects", label: "Works", href: "#projects", icon: "FolderCode" },
  { id: "achievements", label: "Dossier", href: "#achievements", icon: "IdCard" },
];
