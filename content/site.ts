/**
 * Site-wide content. Values are extracted verbatim from `design/resume.pdf`.
 * Anything not in the resume is marked with a clearly identified
 * placeholder so the portfolio owner can confirm it.
 */

export type SocialLink = {
  label: string;
  /** A `mailto:` or `https://` URL, or "TBD" when not in the resume. */
  href: string | "TBD";
  /** When `true`, the link is a known-valid URL from the resume. When
   *  `false`, the URL is a placeholder and must be confirmed by the
   *  portfolio owner before going live. */
  resolved: boolean;
};

export const SITE = {
  handle: "darkEye",
  fullName: "Ashraful Islam",
  tagline:
    "Software Engineering student · Competitive Programmer · Full-stack Developer",
  motto: '"Quiet corners hide the best stories."',
  location: "SUST, Sylhet, Bangladesh",
  availability: "Open to Opportunities",
  copyright: "© 2026 Ashraful Islam · Quiet corners hide the best stories",
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  // Confirmed by the portfolio owner.
  {
    label: "GitHub",
    href: "https://github.com/darkEye-2021831014/",
    resolved: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/darkeye",
    resolved: true,
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/darkEye",
    resolved: true,
  },
  {
    label: "CodeChef",
    href: "https://www.codechef.com/users/voideye",
    resolved: true,
  },
  // Verified from the contact block of the resume.
  {
    label: "Email",
    href: "mailto:ashrafulislamdarkeye@gmail.com",
    resolved: true,
  },
];
