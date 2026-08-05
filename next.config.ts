import type { NextConfig } from "next";

/**
 * GitHub Pages base path.
 * - Local / preview root: unset
 * - fill-home live: GITHUB_PAGES=true → /fill-home
 * - fill-home-duo preview: GITHUB_PAGES=true + GITHUB_PAGES_BASE=/fill-home-duo
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages
  ? (process.env.GITHUB_PAGES_BASE?.replace(/\/$/, "") || "/fill-home")
  : "";

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
