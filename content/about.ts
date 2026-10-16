/**
 * About / education content. Every value comes from `design/resume.pdf`.
 *
 * Summary line is a tight paraphrase of the resume's "Summary" bullet
 * points so that nothing is invented — it is composed only of facts
 * the resume explicitly states.
 */

export const ABOUT = {
  // Lead paragraph shown under the hero name. The line is composed from
  // verified resume facts: final-year SE student at SUST, CGPA 3.91,
  // Codeforces Expert, 2000+ solved, interest in distributed systems.
  lead:
    "Final-year Software Engineering undergraduate at SUST (CGPA 3.91 / 4.00). " +
    "Codeforces Expert (1715) and CodeChef 1956 with 2000+ problems solved. " +
    "Hands-on with full-stack systems, backend architecture, and competitive programming.",

  // Section heading + eyebrow, mirroring the desktop reference.
  eyebrow: "01. About Me",
  heading: "About Me",

  // Education card.
  education: {
    degree: "B.Sc. in Software Engineering",
    institution: "Shahjalal University of Science and Technology (SUST)",
    duration: "Aug 2023 – present (expected Jul 2027)",
    location: "Sylhet, Bangladesh",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management",
      "Web Development",
      "Software Engineering & Design Patterns",
      "AI & ML",
      "Computer Networks",
    ] as const,
  },

  // Four key-metric tiles, in display order. `value` is a JSX-safe
  // string — the MetricTile component handles styling.
  metrics: [
    {
      id: "cgpa",
      label: "Cumulative CGPA",
      value: "3.91",
      suffix: "/ 4.00",
      caption: "SUST · Software Engineering",
      tone: "primary" as const,
      sparkle: true,
    },
    {
      id: "solved",
      label: "Problems Solved",
      value: "2000+",
      caption: "Across global judges",
      tone: "on-surface" as const,
      sparkle: true,
    },
    {
      id: "codeforces",
      label: "Codeforces",
      value: "1715",
      caption: "Expert · handle: darkEye",
      tone: "primary" as const,
    },
    {
      id: "codechef",
      label: "CodeChef",
      value: "1956",
      caption: "4★ · handle: voideye",
      tone: "secondary" as const,
    },
  ],

  // Language fluency, surfaced as a quiet side-list inside the about
  // section. Native / Fluent / Conversational labels per the resume.
  languages: [
    { name: "Bengali", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Hindi", level: "Conversational" },
  ] as const,
} as const;
