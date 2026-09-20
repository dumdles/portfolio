import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
