/**
 * Prefix public asset paths with basePath when deploying to GitHub Pages.
 * Local / Vercel (no GITHUB_PAGES) leave paths unchanged.
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${base}${path}`;
}
