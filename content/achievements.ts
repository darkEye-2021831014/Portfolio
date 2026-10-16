/**
 * Honors & achievements. Sources: `design/resume.pdf`.
 *
 * Sparkle is reserved for the top achievement (ICPC Asia-West Continent
 * Finalist) only — the rest of the timeline stays unadorned.
 */

export type Achievement = {
  id: string;
  year: string;
  category:
    | "Continental"
    | "Regional"
    | "Datathon"
    | "Hackathon"
    | "Contest"
    | "Academic";
  title: string;
  detail: string;
  /** When true, the card gets a sparkle badge in its top-right corner. */
  sparkle?: boolean;
};

export const ACHIEVEMENTS = {
  eyebrow: "05. Honors & Awards",
  heading: "Honors & Achievements",
  description:
    "Distinctions from regional and continental contests, national hackathons, and academic honours.",

  items: [
    {
      id: "icpc-asia-west",
      year: "2025",
      category: "Continental",
      title: "ICPC Asia-West Continent Finalist",
      detail:
        "Represented SUST Sylhet at the ICPC Asia-West Continent Finals as one of 7 teams from the university.",
      sparkle: true,
    },
    {
      id: "icpc-dhaka",
      year: "2025",
      category: "Regional",
      title: "ICPC Dhaka Regional 2025",
      detail:
        "Represented SUST Sylhet at the ICPC Dhaka Regional onsite round.",
    },
    {
      id: "duet-datathon",
      year: "2025",
      category: "Datathon",
      title: "9th Place — DUET National Datathon 2025",
      detail:
        "Finished 9th nationally at the DUET National Datathon 2025.",
    },
    {
      id: "pstu-hackathon",
      year: "2024",
      category: "Hackathon",
      title: "Finalist — PSTU National Hackathon 2024",
      detail:
        "Selected as a finalist at the PSTU National Hackathon 2024.",
    },
    {
      id: "codeforces-round-1074",
      year: "2025",
      category: "Contest",
      title: "Codeforces Round 1074 — Global Rank 77",
      detail:
        "Placed 77th globally in Codeforces Round 1074.",
    },
    {
      id: "codechef-starters-168",
      year: "2025",
      category: "Contest",
      title: "CodeChef Starters 168 — Global Rank 39",
      detail:
        "Placed 39th globally in CodeChef Starters 168.",
    },
  ] as const satisfies ReadonlyArray<Achievement>,
} as const;
