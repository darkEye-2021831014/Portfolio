/**
 * Competitive programming content. Sources: `design/resume.pdf`.
 *
 * Sparkles are reserved (per the AGENTS-style spec from the user) for
 * the rating badges themselves and the top achievement (ICPC Asia-West
 * Continent Finalist). No sparkles are placed on individual contest
 * list items.
 */

export type PlatformHandle = {
  id: "codeforces" | "codechef";
  platform: "Codeforces" | "CodeChef";
  handle: string;
  rating: string;
  tier: string;
  /** Trajectory data for the sparkline — coords are normalised
   *  (0..1 left, 0..1 down). The 9 points lift smoothly to a peak. */
  trajectory: ReadonlyArray<readonly [number, number]>;
  highlight: string;
  url: string | "TBD";
  urlResolved: boolean;
};

export const CP = {
  eyebrow: "02. Algorithmic Prowess",
  heading: "Competitive Programming",
  description:
    "High-pressure problem solving, continuous rating climbs, and algorithmic deduction under strict time and memory bounds.",

  // Codeforces + CodeChef handles, ratings and tiers from the resume.
  platforms: [
    {
      id: "codeforces",
      platform: "Codeforces",
      handle: "darkEye",
      rating: "1715",
      tier: "Expert",
      // Sparkline approximates a steady rise to the current rating.
      // 9 normalised (x, y) points, y=0 is top, y=1 is bottom.
      trajectory: [
        [0.0, 0.95],
        [0.125, 0.85],
        [0.25, 0.78],
        [0.375, 0.7],
        [0.5, 0.6],
        [0.625, 0.48],
        [0.75, 0.35],
        [0.875, 0.22],
        [1.0, 0.15],
      ] as const,
      highlight:
        "Codeforces Round 1074 — Global Rank 77.",
      // Confirmed by the portfolio owner.
      url: "https://codeforces.com/profile/darkEye",
      urlResolved: true,
    },
    {
      id: "codechef",
      platform: "CodeChef",
      handle: "voideye",
      rating: "1956",
      tier: "4★",
      trajectory: [
        [0.0, 0.9],
        [0.125, 0.82],
        [0.25, 0.78],
        [0.375, 0.7],
        [0.5, 0.6],
        [0.625, 0.52],
        [0.75, 0.42],
        [0.875, 0.3],
        [1.0, 0.2],
      ] as const,
      highlight: "CodeChef Starters 168 — Rank 39 in the global leaderboard.",
      // Confirmed by the portfolio owner.
      url: "https://www.codechef.com/users/voideye",
      urlResolved: true,
    },
  ] as const satisfies ReadonlyArray<PlatformHandle>,

  // Verifiable peak achievements; these drive the contest highlight
  // banner at the bottom of the section.
  peakAchievements: [
    {
      label: "ICPC Asia-West Continent Finalist 2025",
      meta: "Representing SUST Sylhet",
    },
    {
      label: "ICPC Dhaka Regional 2025",
      meta: "Onsite 5-hour round",
    },
  ] as const,

  // Inter-university contest participation counts straight from the
  // resume's "Inter University Programming Contest" line:
  // 2 SUST, 1 KUET, 1 CUET, 1 AUST, 1 UIU, 1 UU.
  contestAttendance: [
    { name: "SUST IUPC", count: 2 },
    { name: "KUET IUPC", count: 1 },
    { name: "CUET IUPC", count: 1 },
    { name: "AUST IUPC", count: 1 },
    { name: "UIU Contest", count: 1 },
    { name: "UU Contest", count: 1 },
  ] as const,
} as const;
