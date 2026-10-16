/**
 * Server-side Codeforces live stats fetch.
 *
 * Pulls the current rating, rank, and max-rating for the `darkEye` handle
 * from the public Codeforces REST API and caches the response for 6 hours
 * (Next.js Data Cache via `next: { revalidate }`). The Codeforces API
 * itself does not return a `Cache-Control` header, so we layer our own
 * revalidation window to keep the home page snappy and the API happy.
 *
 * Failure policy: never throw, never block the page. If the network call
 * fails, the upstream is down, or the response shape is unexpected, we
 * return `null` and the caller falls back to the static values in
 * /content/cp.ts. The portfolio must keep working without external
 * services — CP stats are decoration, not critical infrastructure.
 */

import "server-only";

import { CP } from "@/content";

export type CodeforcesStats = {
  handle: string;
  rating: number;
  rank: string;
  maxRating: number;
  maxRank: string;
  /** ISO timestamp of the most recent successful fetch (server clock). */
  fetchedAt: string;
};

type CfUser = {
  handle: string;
  rating?: number;
  rank?: string;
  maxRating?: number;
  maxRank?: string;
};

type CfResponse = {
  status: "OK" | "FAILED";
  result?: CfUser[];
  comment?: string;
};

const HANDLE = "darkEye";
const ENDPOINT = `https://codeforces.com/api/user.info?handles=${HANDLE}`;
const REVALIDATE_SECONDS = 6 * 60 * 60; // 6 hours

/**
 * Fetch live Codeforces stats. Returns null on any failure so callers can
 * fall back to the static content values.
 */
export async function fetchCodeforcesStats(): Promise<CodeforcesStats | null> {
  try {
    const res = await fetch(ENDPOINT, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { "user-agent": "portfolio-darkeye/1.0 (+contact form)" },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as CfResponse;
    if (json.status !== "OK" || !json.result || json.result.length === 0) {
      return null;
    }
    const user = json.result[0];
    if (
      typeof user.rating !== "number" ||
      typeof user.maxRating !== "number" ||
      typeof user.rank !== "string" ||
      typeof user.maxRank !== "string"
    ) {
      return null;
    }
    return {
      handle: user.handle,
      rating: user.rating,
      rank: user.rank,
      maxRating: user.maxRating,
      maxRank: user.maxRank,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    // Network failure, JSON parse error, etc. Fall back silently.
    return null;
  }
}

/**
 * The Codeforces rank → tier mapping used both for live data and the
 * static fallback (so the tier chip never disagrees with the displayed
 * rating). Tiers are taken straight from the Codeforces help page.
 */
const RANK_TIER: Record<string, string> = {
  "newbie": "Newbie",
  "pupil": "Pupil",
  "specialist": "Specialist",
  "expert": "Expert",
  "candidate master": "Candidate Master",
  "master": "Master",
  "international master": "International Master",
  "grandmaster": "Grandmaster",
  "international grandmaster": "International Grandmaster",
  "legendary grandmaster": "Legendary Grandmaster",
};

function tierFromRank(rank: string | undefined): string {
  if (!rank) return "Specialist";
  return RANK_TIER[rank.toLowerCase()] ?? "Specialist";
}

/**
 * Compose the display payload the CP section consumes. We always return
 * a non-null `display` block: live data when available, otherwise the
 * resume-canonical fallback from /content/cp.ts. The `source` and
 * `fetchedAt` fields let the UI render a small "live" / "cached" hint.
 */
export async function getCodeforcesDisplay(): Promise<{
  display: { rating: string; tier: string };
  source: "live" | "fallback";
  fetchedAt: string | null;
}> {
  const live = await fetchCodeforcesStats();
  if (live) {
    return {
      display: {
        rating: String(live.rating),
        tier: tierFromRank(live.rank),
      },
      source: "live",
      fetchedAt: live.fetchedAt,
    };
  }
  // Fallback to the resume values, which are the source of truth.
  const fallback = CP.platforms.find((p) => p.id === "codeforces");
  if (!fallback) {
    return { display: { rating: "1715", tier: "Expert" }, source: "fallback", fetchedAt: null };
  }
  return {
    display: { rating: fallback.rating, tier: fallback.tier },
    source: "fallback",
    fetchedAt: null,
  };
}
