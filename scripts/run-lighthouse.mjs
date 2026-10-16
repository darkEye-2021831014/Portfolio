/**
 * Tiny Lighthouse runner.
 *
 * Usage:
 *   node scripts/run-lighthouse.mjs [url] [--json]
 *
 * Defaults to the production server on http://localhost:3103/. Outputs
 * a one-line summary per category by default; with --json it dumps the
 * full Lighthouse report to /tmp/lighthouse-report.json.
 */

import lighthouse from "lighthouse";
import * as ChromeLauncher from "chrome-launcher";
import { writeFileSync } from "node:fs";

const url = process.argv[2] || "http://localhost:3103/";
const wantJson = process.argv.includes("--json");

const chrome = await ChromeLauncher.launch({
  chromePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  chromeFlags: [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
  ],
});

const result = await lighthouse(url, {
  port: chrome.port,
  output: wantJson ? "json" : "html",
  logLevel: "error",
  onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  formFactor: "desktop",
  screenEmulation: {
    mobile: false,
    width: 1350,
    height: 940,
    deviceScaleFactor: 1,
    disabled: false,
  },
  throttling: {
    // Desktop preset is much more permissive than mobile.
    rttMs: 40,
    throughputKbps: 10240,
    cpuSlowdownMultiplier: 1,
    requestLatencyMs: 0,
    downloadThroughputKbps: 0,
    uploadThroughputKbps: 0,
  },
  emulatedUserAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
});

await chrome.kill();

if (!result || !result.lhr) {
  console.error("Lighthouse returned no result");
  process.exit(1);
}

const lhr = result.lhr;
if (wantJson) {
  writeFileSync("/tmp/lighthouse-report.json", JSON.stringify(lhr, null, 2));
}

const fmt = (cat) => {
  if (!cat) return "n/a";
  const score = cat.score;
  return score === null
    ? "n/a"
    : `${Math.round((score ?? 0) * 100)}`;
};

const cats = lhr.categories || {};
console.log(`\n  Lighthouse @ ${lhr.finalDisplayedUrl}`);
console.log(`  User-Agent: ${lhr.userAgent}`);
console.log("");
console.log(`  Performance     ${fmt(cats.performance)}`);
console.log(`  Accessibility   ${fmt(cats.accessibility)}`);
console.log(`  Best Practices  ${fmt(cats["best-practices"])}`);
console.log(`  SEO             ${fmt(cats.seo)}`);
console.log("");

if (wantJson) {
  console.log("  Full report: /tmp/lighthouse-report.json");
}

// Exit non-zero if any category is < 90
const below = Object.values(cats).filter(
  (c) => c && c.score !== null && c.score * 100 < 90,
);
process.exit(below.length > 0 ? 2 : 0);
