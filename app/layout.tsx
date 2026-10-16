import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { SITE, PROJECTS } from "@/content";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

// Canonical site URL. Read from env at build time; fall back to the
// GitHub-Pages-style origin for local dev. `||` (not `??`) so an
// empty string in .env.local still falls back instead of being treated
// as a configured value. Setting NEXT_PUBLIC_SITE_URL in production
// is the recommended path.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://darkeye-portfolio.example.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c0e13",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.fullName} (${SITE.handle}) — Portfolio`,
    template: `%s · ${SITE.fullName} (${SITE.handle})`,
  },
  description: `${SITE.tagline}. Final-year Software Engineering student at SUST, Codeforces Expert (1715), CodeChef 4★ (1956). Portfolio of ${SITE.fullName} (${SITE.handle}).`,
  applicationName: `${SITE.fullName} Portfolio`,
  keywords: [
    SITE.fullName,
    SITE.handle,
    "portfolio",
    "software engineer",
    "SUST",
    "Sylhet",
    "Codeforces",
    "CodeChef",
    "competitive programming",
    "full-stack",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: SITE.fullName, url: SITE_URL }],
  creator: SITE.fullName,
  publisher: SITE.fullName,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: `${SITE.fullName} Portfolio`,
    title: `${SITE.fullName} (${SITE.handle}) — Portfolio`,
    description: `${SITE.tagline}. Software Engineering student at SUST, Codeforces Expert, CodeChef 4★.`,
    url: SITE_URL,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE.fullName} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.fullName} (${SITE.handle}) — Portfolio`,
    description: `${SITE.tagline}. Codeforces Expert · CodeChef 4★ · SUST SWE '21.`,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  manifest: "/site.webmanifest",
};

/**
 * JSON-LD Person schema for Google rich results. Renders a `<script>`
 * with `type="application/ld+json"` so search engines can pick it up.
 * Social links come from `content/site.ts` and are filtered to known
 * HTTP URLs (the `mailto:` entry is excluded — it's not crawlable).
 */
function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.fullName,
    alternateName: SITE.handle,
    url: SITE_URL,
    jobTitle: "Software Engineering Student",
    description: SITE.tagline,
    email: "mailto:ashrafulislamdarkeye@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sylhet",
      addressCountry: "BD",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Shahjalal University of Science and Technology (SUST)",
    },
    sameAs: [
      SITE_URL,
      "https://github.com/darkEye-2021831014/",
      "https://www.linkedin.com/in/darkeye",
      "https://codeforces.com/profile/darkEye",
      "https://www.codechef.com/users/voideye",
    ],
    knowsAbout: [
      "Software Engineering",
      "Competitive Programming",
      "Algorithms",
      "Data Structures",
      "Full-stack Development",
      "Next.js",
      "TypeScript",
      "Go",
      "Kotlin",
      "Java",
    ],
  };
  return (
    <script
      type="application/ld+json"
      // The JSON is serialised at build time so the only XSS surface
      // is the data baked into the constants above.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-surface-container-lowest font-sans text-on-surface antialiased">
        <PersonJsonLd />
        {children}
      </body>
    </html>
  );
}
