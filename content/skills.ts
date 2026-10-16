/**
 * Technical proficiencies. Sources: `design/resume.pdf`.
 *
 * The resume splits skills into three sections (Languages, Coursework,
 * Tools/Frameworks). We surface all three as their own group, and add
 * a "Soft Skills" group drawn from the resume's Soft Skills line.
 */

export type SkillGroup = {
  id: string;
  /** Lucide icon name. */
  icon:
    | "Code2"
    | "Layers"
    | "Database"
    | "Wrench"
    | "BrainCircuit";
  title: string;
  items: ReadonlyArray<string>;
};

export const SKILLS = {
  eyebrow: "04. Competency Inventory",
  heading: "Technical Proficiencies",
  description:
    "Tools and concepts used in production projects and graded coursework. Grouped by domain — no arbitrary percentage bars.",

  groups: [
    {
      id: "languages",
      icon: "Code2",
      title: "Languages",
      items: [
        "C++",
        "Python",
        "Java",
        "Go (Golang)",
        "JavaScript",
        "TypeScript",
        "Kotlin",
        "SQL",
        "PostgreSQL",
        "Dart",
        "Bash",
      ],
    },
    {
      id: "frameworks",
      icon: "Layers",
      title: "Frameworks & Libraries",
      items: [
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "FastAPI",
        "LibGDX",
        "Jetpack Compose",
        "Android SDK",
        "Tailwind CSS",
        "TensorFlow",
      ],
    },
    {
      id: "databases",
      icon: "Database",
      title: "Databases & Storage",
      items: ["MySQL", "MongoDB", "Firebase", "Supabase"],
    },
    {
      id: "tools",
      icon: "Wrench",
      title: "Tools & Infrastructure",
      items: [
        "Git",
        "GitHub",
        "Docker",
        "Nginx",
        "Hugging Face",
      ],
    },
    {
      id: "coursework",
      icon: "BrainCircuit",
      title: "Core Coursework & Engineering Principles",
      items: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Database Management",
        "Web Development",
        "Software Engineering & Design Patterns",
        "AI & ML",
        "Computer Networks",
        "System Design",
      ],
    },
  ] as const satisfies ReadonlyArray<SkillGroup>,
} as const;
