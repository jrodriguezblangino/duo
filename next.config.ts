import type { NextConfig } from "next";

/** Set `GITHUB_PAGES=true` in CI so assets resolve under /fill-home. Local stays at /. */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const basePath = isGithubPages ? "/fill-home" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
