import { execSync } from "node:child_process";
import type { NextConfig } from "next";

/**
 * The date the site was last changed, for the footer: the latest commit's
 * date, or the build date where git history is not available. Formatted
 * here, once, in Singapore time, so server and browser render the same text.
 */
function lastUpdated() {
  let date = new Date();
  try {
    const committed = execSync("git log -1 --format=%cI", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    if (committed) date = new Date(committed);
  } catch {
    // No git in this build environment; the build date stands in.
  }
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Singapore" }).format(date);
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_LAST_UPDATED: lastUpdated(),
  },
  images: {
    // `images.domains` is deprecated in favour of remotePatterns, which scopes
    // the allowance to a protocol and path rather than a bare hostname.
    //
    // placehold.co only serves the stand-in project images. Remove this entry
    // once real project imagery lands in Phase 3 of docs/PLAN.md.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
