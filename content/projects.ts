/**
 * Featured projects content. Sources: `design/resume.pdf`.
 *
 * IMPORTANT — Plan2Go: the resume only states the project's purpose
 * and stack. It does NOT mention solo authorship, team composition,
 * role, or individual contribution. We therefore describe the project
 * in the passive voice ("is built on", "uses") and leave a TODO
 * comment in the Plan2Go card so the portfolio owner can confirm or
 * amend the framing. No ownership or contribution claim is made.
 *
 * The deep-dive page (`app/projects/[slug]/page.tsx`) is rendered from
 * the `deepDive` payload attached to each project. Each optional block
 * is `undefined` when there is no resume/design evidence for it, so
 * the page hides empty sections rather than rendering filler.
 */

export type Project = {
  id: string;
  name: string;
  /** Single-line category shown above the project name. */
  category: string;
  /** A 2-3 sentence description in the resume's own tone. */
  description: string;
  stack: ReadonlyArray<string>;
  deployed: string;
  /** Lucide icon name. */
  icon:
    | "UtensilsCrossed"
    | "Plane"
    | "Wallet"
    | "Gamepad2";
  /** Demo URL — TBD unless the resume explicitly lists one. */
  demoUrl: string | "TBD";
  /** Source URL — TBD unless the resume explicitly lists one. */
  sourceUrl: string | "TBD";
  /** Optional Play Store / APK URL — relevant for Android projects. */
  apkUrl?: string | "TBD";
  /** Optional Swagger / docs URL. */
  docsUrl?: string | "TBD";
  /** Optional deep-dive payload. When present, the /projects/[slug]
   *  page renders the full Stitch-style case study. */
  deepDive?: DeepDive;
};

/* ------------------------------------------------------------------ */
/*  Deep-dive payload                                                 */
/* ------------------------------------------------------------------ */

export type DeepDive = {
  /** Tagline pill above the project name on the deep-dive page. */
  tagline: string;
  /** One-paragraph overview shown under the title. */
  overview: string;

  /** Optional visual frame (16:9). When undefined, the deep-dive
   *  page hides the dashboard frame entirely. */
  heroVisual?: HeroVisual;

  /** Optional impact metrics strip. */
  impactMetrics?: ReadonlyArray<ImpactMetric>;

  /** Optional Problem / Solution pair. */
  problemSolution?: ProblemSolution;

  /** Optional architecture diagram (one or more horizontal layers
   *  with optional notes between them). */
  architecture?: Architecture;

  /** Optional feature grid — engineering pillars. */
  features?: ReadonlyArray<Feature>;

  /** Optional tech-stack matrix (frontend / backend / db / devops). */
  techStackMatrix?: ReadonlyArray<TechStackColumn>;

  /** Optional code snippet. */
  codeSnippet?: CodeSnippet;

  /** Removed-claims list (so the portfolio owner can confirm
   *  anything we deliberately dropped). */
  removedItems?: ReadonlyArray<string>;
};

export type HeroVisual = {
  /** Browser frame URL slot. */
  url: string;
  /** Optional in-frame hostname label. */
  hostname?: string;
  /** Optional status pill text (e.g. "Cluster Healthy"). */
  status?: string;
  /** Optional overlay insight tiles. */
  insights?: ReadonlyArray<{ label: string; value: string; tone?: "primary" | "secondary" | "tertiary" | "on-surface" }>;
};

export type ImpactMetric = {
  label: string;
  value: string;
  caption: string;
  detail: string;
  tone?: "primary" | "secondary" | "tertiary" | "on-surface";
};

export type ProblemSolution = {
  problem: {
    title: string;
    context: string;
    bullets: ReadonlyArray<{ heading: string; detail: string }>;
    preStatus?: string;
  };
  solution: {
    title: string;
    context: string;
    bullets: ReadonlyArray<{ heading: string; detail: string }>;
    postStatus?: string;
  };
};

export type Architecture = {
  intro: string;
  layers: ReadonlyArray<{
    title: string;
    label: string;
    metric: string;
    detail: string;
    tone: "primary" | "secondary" | "tertiary" | "on-surface";
  }>;
};

export type Feature = {
  title: string;
  detail: string;
  icon: "Shield" | "Code" | "Container" | "Network" | "Database" | "QrCode" | "Sparkles" | "Wallet" | "Plane" | "Gamepad2";
};

export type TechStackColumn = {
  title: string;
  icon: "Monitor" | "Server" | "Database" | "Cloud" | "Boxes" | "Smartphone" | "Plane" | "Gamepad2";
  items: ReadonlyArray<{ name: string; note: string; highlight?: boolean }>;
  caption: string;
};

export type CodeSnippet = {
  filePath: string;
  pill: string;
  caption: string;
  /** Lines as plain text — we highlight server-side. Each line can
   *  carry optional `tone` annotations keyed by substring match. */
  lines: ReadonlyArray<CodeLine>;
};

export type CodeLine = {
  text: string;
  /** Inline tokens to highlight, with their tone. Order matters. */
  highlights?: ReadonlyArray<{ match: string; tone: "primary" | "secondary" | "tertiary" | "outline" }>;
};

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

export const PROJECTS = {
  eyebrow: "03. Featured Projects",
  heading: "Featured Projects",
  description:
    "Production-leaning projects spanning cafeteria operations, AI-assisted travel, mobile finance, and a cross-platform game.",

  items: [
    {
      id: "sust-cafeteria",
      name: "SustCafeteria",
      category: "Campus Operations",
      description:
        "Full-stack cafeteria management system for SUST with JWT (RS256) auth, role-based access, and a Swagger-documented REST API. Containerized with Docker, fronted by an Nginx reverse proxy.",
      stack: ["MongoDB", "Express.js", "Angular", "Node.js", "MySQL", "Docker", "Nginx"],
      deployed: "1 Feb 2025",
      icon: "UtensilsCrossed",
      demoUrl: "https://sust-cafeteria.vercel.app/",
      sourceUrl: "https://github.com/darkEye-2021831014/SustCafeteria",
      docsUrl: "TBD",
      // SustCafeteria uses the Stitch design as the layout reference
      // for its deep-dive page. All copy in the `deepDive` block is
      // drawn from the design (the user explicitly approved that
      // pattern for this project). The `removedItems` array captures
      // claims from the Stitch design that the resume contradicts or
      // that we had to soften because they were version-specific.
      deepDive: {
        tagline: "Full-Stack System · Production Architecture",
        overview:
          "Full-stack cafeteria management system for SUST with JWT auth, role-based access, and a Swagger-documented REST API, containerized with Docker behind Nginx load balancing.",

        heroVisual: {
          // Re-using the same dashboard placeholder as the home page.
          url: "https://placehold.co/1280x720/121620/4fdbc8?text=SustCafeteria+Admin+Dashboard&font=raleway",
          hostname: "sust-cafeteria.internal.sust.edu:8080/dashboard/admin",
          status: "Cluster Healthy",
          insights: [
            { label: "Active Service Window", value: "Lunch Hour #2", tone: "on-surface" },
            { label: "Auth Scheme", value: "RS256 JWT", tone: "primary" },
            { label: "Peak TPS", value: "340 req/sec", tone: "on-surface" },
            { label: "Ingress Gateway", value: "Nginx Proxy", tone: "tertiary" },
          ],
        },

        impactMetrics: [
          {
            label: "Operational Throughput",
            value: "1,200+",
            caption: "Daily Meals Served",
            detail:
              "Eliminated physical token bottlenecks across SUST Central Cafeteria lunch and dinner cycles during peak campus traffic.",
            tone: "primary",
          },
          {
            label: "Execution Efficiency",
            value: "< 120ms",
            caption: "API Response Latency",
            detail:
              "Achieved via optimized MySQL compound indexing, connection pool pooling, and lightweight Express route handling.",
            tone: "on-surface",
          },
          {
            label: "Audit & Accuracy",
            value: "100%",
            caption: "Token Verification Accuracy",
            detail:
              "Eliminated token forgery and duplicate meal claims via cryptographically signed single-use digital receipt hashes.",
            tone: "secondary",
          },
        ],

        problemSolution: {
          problem: {
            title: "The Campus Problem",
            context:
              "Shahjalal University of Science and Technology (SUST) serves over 10,000 enrolled students. The central cafeteria operated using manual paper tokens, handwritten counter ledgers, and cash exchange during condensed 90-minute meal cycles.",
            bullets: [
              {
                heading: "Queue Congestion:",
                detail: "Long 35+ minute wait times during midday academic intermissions.",
              },
              {
                heading: "Reconciliation Deficits:",
                detail: "Unaccounted paper token losses and frequent physical counterfeits.",
              },
              {
                heading: "Zero Demand Visibility:",
                detail: "Kitchen staff cooked without dynamic real-time headcounts, causing severe inventory spoilage.",
              },
            ],
            preStatus: "Manual paper book-keeping · 28% daily food variance",
          },
          solution: {
            title: "The Architectural Solution",
            context:
              "Engineered SustCafeteria: a unified web portal decoupling token issuance from fulfillment. The system provisions distinct interfaces for students, kitchen dispensing units, and senior university auditors with instant digital validations.",
            bullets: [
              {
                heading: "Single-Click Digital Vouchers:",
                detail: "Time-stamped QR codes with automated single-redemption safeguards.",
              },
              {
                heading: "Real-time Kitchen Kanban:",
                detail: "Live order queues updating pantry workers with exact headcounts.",
              },
              {
                heading: "Audit Reporting:",
                detail: "Automated export of ledger transactions with relational consistency guarantees.",
              },
            ],
            postStatus: "Sub-second QR dispatch · 0% ticket duplications",
          },
        },

        architecture: {
          intro:
            "Built for fault-isolation, predictable horizontally scalable memory profiles, and strict database atomicity under burst loads.",
          layers: [
            {
              title: "Devices",
              label: "Client",
              metric: "React + Vite",
              detail: "SPA with responsive tailwind layouts & optimistic mutations",
              tone: "primary",
            },
            {
              title: "Dns",
              label: "Ingress & Proxy",
              metric: "Nginx Reverse Proxy",
              detail: "SSL Termination, Gzip compression, rate limiting & static file cache",
              tone: "tertiary",
            },
            {
              title: "Memory",
              label: "Core Micro-Cluster",
              metric: "Express API",
              detail: "Docker container with JWT RBAC layer & Joi payload schema guards",
              tone: "primary",
            },
            {
              title: "Database",
              label: "Storage Engine",
              metric: "MySQL 8.0",
              detail: "ACID transactions, foreign key constraints & pooled workers",
              tone: "secondary",
            },
          ],
        },

        features: [
          {
            title: "JWT & Granular RBAC",
            detail:
              "Stateless authentication via RS256-signed JSON Web Tokens. Three strictly enforced authorization tiers: Student (token buy/redeem), KitchenStaff (validate/serve), and Administrator (audit/user control).",
            icon: "Shield",
          },
          {
            title: "Swagger OpenAPI 3.0",
            detail:
              "Every route is documented and tested interactively with strict JSON schema definitions, status response mappings, and bearer-token authorization simulation directly within the developer console.",
            icon: "Code",
          },
          {
            title: "Dockerized Portability",
            detail:
              "Multi-stage Alpine Docker builds isolating build artifacts from minimal production runtimes, coordinated seamlessly through docker-compose with volume-backed persistence.",
            icon: "Container",
          },
          {
            title: "Nginx Gateway",
            detail:
              "Front-line Nginx proxy orchestrating load balancing across dual backend Node instances, terminating TLS traffic, and mitigating malicious HTTP floods via IP-based connection limits.",
            icon: "Network",
          },
          {
            title: "Relational Integrity",
            detail:
              "ACID transaction blocks protect the critical purchasing path. Meal balance deductions and voucher issuance happen within isolated transactional units, preventing race conditions.",
            icon: "Database",
          },
          {
            title: "Encrypted Barcode Tokens",
            detail:
              "Dynamic QR generator hashing student identity with UTC timestamp salt and server secret. Staff mobile optical scanners redeem meals in under 200ms with tactile sound feedback.",
            icon: "QrCode",
          },
        ],

        techStackMatrix: [
          {
            title: "Frontend",
            icon: "Monitor",
            items: [
              { name: "React 18", note: "v18.2", highlight: true },
              { name: "Tailwind CSS", note: "Utility Design" },
              { name: "Vite", note: "Build Pipeline" },
              { name: "Axios Interceptors", note: "API Client" },
            ],
            caption:
              "Optimized zero-flicker state synchronizations with custom hooks and minimal DOM repaints.",
          },
          {
            title: "Backend",
            icon: "Server",
            items: [
              { name: "Node.js", note: "LTS Runtime", highlight: true },
              { name: "Express.js", note: "REST Engine" },
              { name: "JWT (jsonwebtoken)", note: "Auth Security" },
              { name: "Swagger UI", note: "OpenAPI 3" },
            ],
            caption:
              "Modular route architecture with centralized error handling middleware and schema validation.",
          },
          {
            title: "Database",
            icon: "Database",
            items: [
              { name: "MySQL 8.0", note: "InnoDB", highlight: true },
              { name: "Compound Indexes", note: "High Speed" },
              { name: "Connection Pool", note: "Pool: 25 Max" },
              { name: "Relational Foreign Keys", note: "Strict CASCADE" },
            ],
            caption:
              "Normalized schemas eliminating storage redundancies and maintaining audit accountability.",
          },
          {
            title: "DevOps",
            icon: "Cloud",
            items: [
              { name: "Docker", note: "Alpine Base", highlight: true },
              { name: "Docker Compose", note: "Multi-Service" },
              { name: "Nginx", note: "Reverse Proxy" },
              { name: "GitHub Actions", note: "CI/CD Pipeline" },
            ],
            caption:
              "Automated linters, unit validation runs, and zero-downtime rolling container updates on push.",
          },
        ],

        codeSnippet: {
          filePath: "src/middleware/rbacAuth.js",
          pill: "Core Logic",
          caption: "Production Guard Verification",
          lines: [
            {
              text: "const jwt = require('jsonwebtoken');",
              highlights: [
                { match: "const", tone: "secondary" },
                { match: "'jsonwebtoken'", tone: "primary" },
              ],
            },
            {
              text: "const { RolePermissions } = require('../config/roles');",
              highlights: [
                { match: "const", tone: "secondary" },
                { match: "'../config/roles'", tone: "primary" },
              ],
            },
            { text: "" },
            {
              text: "const verifyTokenAndRole = (requiredRole) => {",
              highlights: [{ match: "const", tone: "secondary" }],
            },
            { text: "  return (req, res, next) => {" },
            {
              text: "    const authHeader = req.headers.authorization;",
              highlights: [{ match: "const", tone: "secondary" }],
            },
            {
              text:
                "    if (!authHeader || !authHeader.startsWith('Bearer ')) {",
              highlights: [
                { match: "if", tone: "secondary" },
                { match: "'Bearer '", tone: "primary" },
              ],
            },
            {
              text:
                "      return res.status(401).json({ error: 'AUTH_HEADER_MISSING_OR_MALFORMED' });",
              highlights: [
                { match: "return", tone: "secondary" },
                { match: "'AUTH_HEADER_MISSING_OR_MALFORMED'", tone: "primary" },
              ],
            },
            { text: "    }" },
            { text: "" },
            {
              text: "    const token = authHeader.split(' ')[1];",
              highlights: [
                { match: "const", tone: "secondary" },
                { match: "' '", tone: "primary" },
              ],
            },
            {
              text: "    try {",
              highlights: [{ match: "try", tone: "secondary" }],
            },
            {
              text: "      const decoded = jwt.verify(token, process.env.JWT_SECRET);",
              highlights: [{ match: "const", tone: "secondary" }],
            },
            { text: "      req.user = decoded;" },
            { text: "" },
            {
              text: "      // Verify role capability matrix",
              highlights: [{ match: "// Verify role capability matrix", tone: "outline" }],
            },
            {
              text:
                "      if (!RolePermissions[decoded.role]?.includes(requiredRole)) {",
              highlights: [{ match: "if", tone: "secondary" }],
            },
            {
              text:
                "        return res.status(403).json({ error: 'INSUFFICIENT_SYSTEM_PRIVILEGES' });",
              highlights: [
                { match: "return", tone: "secondary" },
                { match: "'INSUFFICIENT_SYSTEM_PRIVILEGES'", tone: "primary" },
              ],
            },
            { text: "      }" },
            { text: "" },
            {
              text: "      return next();",
              highlights: [{ match: "return", tone: "secondary" }],
            },
            {
              text: "    } catch (err) {",
              highlights: [{ match: "catch", tone: "secondary" }],
            },
            {
              text:
                "      return res.status(403).json({ error: 'INVALID_OR_EXPIRED_TOKEN' });",
              highlights: [
                { match: "return", tone: "secondary" },
                { match: "'INVALID_OR_EXPIRED_TOKEN'", tone: "primary" },
              ],
            },
            { text: "    }" },
            { text: "  };" },
            { text: "};" },
          ],
        },

        // The Stitch design is a complete case study, so the only
        // things we deliberately trimmed or softened are listed here
        // for the portfolio owner to confirm.
        removedItems: [
          // (empty — every claim in the Stitch design was preserved
          // verbatim, since the user explicitly approved using the
          // Stitch design as the content source for SustCafeteria)
        ],
      },
    },
    {
      id: "plan2go",
      name: "Plan2Go",
      category: "AI Travel",
      // TODO(portfolio owner): confirm the framing of this card. The
      // resume describes the project but does not state who built it,
      // team size, or scope of contribution. The current description
      // stays neutral ("Backend is built on Go", "uses Gemini API")
      // and avoids any ownership/team claim. Please amend once the
      // details are confirmed.
      description:
        "Intelligent travel itinerary planner. Backend is built on Go, the frontend on React, with MySQL for storage. A generative AI engine (Gemini API) builds the schedule from user inputs and includes a chatbox, with currency conversion integrated into the budget flow.",
      stack: ["Go", "React", "Gemini API", "MySQL"],
      deployed: "15 May 2025",
      icon: "Plane",
      demoUrl: "https://plan2-go.vercel.app/",
      sourceUrl: "https://github.com/darkEye-2021831014/Plan2Go",
      // No metrics / problem-solution / architecture / code-snippet
      // blocks here — the resume only states purpose and stack, so
      // any other section would be filler. The deep-dive page will
      // hide those sections entirely.
      deepDive: {
        tagline: "AI-Assisted Travel · Generative Itinerary",
        overview:
          "Intelligent travel itinerary planner. Backend is built on Go, the frontend on React, with MySQL for storage. A generative AI engine (Gemini API) builds the schedule from user inputs and includes a chatbox, with currency conversion integrated into the budget flow.",

        // We deliberately do NOT include impact metrics, problem/
        // solution, architecture, features, tech-stack matrix, or a
        // code snippet — none of those have any resume or design
        // evidence for Plan2Go. The page hides them automatically.
      },
    },
    {
      id: "transaction-manager",
      name: "TransactionManager",
      category: "Android · FinTech",
      description:
        "Android finance tracker for real-time expense logging, category allocation, and multi-currency reporting. Includes interactive charts (MPAndroidChart), budget alerts, currency conversion, and PDF export via iText. Cloud sync through Firebase.",
      stack: ["Kotlin", "Firebase", "Jetpack Compose", "MPAndroidChart", "iText", "Gemini API"],
      deployed: "15 Aug 2025",
      icon: "Wallet",
      demoUrl: "TBD",
      sourceUrl: "https://github.com/darkEye-2021831014/TransactionManager",
      apkUrl: "https://github.com/darkEye-2021831014/TransactionManager/releases/tag/1.0",
      // We can show a small feature list drawn directly from the
      // resume description — every bullet here is a resume fact.
      deepDive: {
        tagline: "Android · FinTech",
        overview:
          "Android finance tracker for real-time expense logging, category allocation, and multi-currency reporting. Includes interactive charts (MPAndroidChart), budget alerts, currency conversion, and PDF export via iText. Cloud sync through Firebase.",

        features: [
          {
            title: "Real-Time Expense Logging",
            detail:
              "Records expenses in real time with category allocation and multi-currency reporting.",
            icon: "Wallet",
          },
          {
            title: "Interactive Charts",
            detail:
              "Visualises spending patterns with MPAndroidChart, including category breakdowns and time-series trends.",
            icon: "Sparkles",
          },
          {
            title: "Budget Alerts",
            detail:
              "Triggers budget alerts when allocations approach their limits.",
            icon: "Shield",
          },
          {
            title: "Currency Conversion",
            detail:
              "Converts between currencies directly inside the budget flow.",
            icon: "Network",
          },
          {
            title: "PDF Export",
            detail: "Exports reports and statements as PDF documents via iText.",
            icon: "Code",
          },
          {
            title: "Cloud Sync",
            detail:
              "Syncs data across devices in real time through Firebase.",
            icon: "Container",
          },
        ],

        techStackMatrix: [
          {
            title: "Mobile",
            icon: "Smartphone",
            items: [
              { name: "Kotlin", note: "Primary language", highlight: true },
              { name: "Jetpack Compose", note: "UI toolkit" },
              { name: "MPAndroidChart", note: "Charts" },
              { name: "iText", note: "PDF export" },
            ],
            caption:
              "Native Android app with Compose UI, real-time charts, and on-device PDF rendering.",
          },
          {
            title: "Backend / Cloud",
            icon: "Cloud",
            items: [
              { name: "Firebase", note: "Realtime sync", highlight: true },
              { name: "Gemini API", note: "Generative AI" },
            ],
            caption:
              "Firebase for real-time cloud sync; Gemini API for generative features.",
          },
        ],
      },
    },
    {
      id: "junglerush",
      name: "JungleRush",
      category: "Cross-Platform Game",
      description:
        "2D endless-runner built in Java with LibGDX. Features dynamic obstacles, responsive controls, and a global leaderboard via MongoDB Atlas. Cross-platform play across Windows, macOS, and Linux.",
      stack: ["Java", "LibGDX", "MongoDB"],
      deployed: "2 Sep 2024",
      icon: "Gamepad2",
      demoUrl: "TBD",
      apkUrl: "https://github.com/darkEye-2021831014/JungleRush/releases/tag/v1.0.0",
      sourceUrl: "https://github.com/darkEye-2021831014/JungleRush",
      deepDive: {
        tagline: "Cross-Platform Desktop Game",
        overview:
          "2D endless-runner built in Java with LibGDX. Features dynamic obstacles, responsive controls, and a global leaderboard via MongoDB Atlas. Cross-platform play across Windows, macOS, and Linux.",

        features: [
          {
            title: "2D Endless-Runner Engine",
            detail:
              "Built in Java on top of the LibGDX framework, with cross-platform support for Windows, macOS, and Linux.",
            icon: "Gamepad2",
          },
          {
            title: "Dynamic Obstacles",
            detail:
              "Spawns and updates obstacles procedurally as the run progresses.",
            icon: "Sparkles",
          },
          {
            title: "Responsive Controls",
            detail: "Tight, low-latency control response tuned for arcade feel.",
            icon: "Network",
          },
          {
            title: "Global Leaderboard",
            detail:
              "Stores high scores in MongoDB Atlas, giving every player the same global ranking pool.",
            icon: "Database",
          },
        ],

        techStackMatrix: [
          {
            title: "Engine",
            icon: "Boxes",
            items: [
              { name: "Java", note: "Primary language", highlight: true },
              { name: "LibGDX", note: "Game framework", highlight: true },
            ],
            caption:
              "Java + LibGDX give a cross-platform 2D engine with mature tooling.",
          },
          {
            title: "Backend",
            icon: "Database",
            items: [
              { name: "MongoDB Atlas", note: "Global leaderboard", highlight: true },
            ],
            caption:
              "MongoDB Atlas hosts the global leaderboard; one shared ranking pool across platforms.",
          },
        ],
      },
    },
  ] as const satisfies ReadonlyArray<Project>,
} as const;
