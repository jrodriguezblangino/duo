"use client";

import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query. Starts as `null` until mounted so SSR
 * and the first client paint can avoid flashing the wrong branch.
 */
export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Tailwind `lg` — 1024px */
export function useIsDesktop(): boolean | null {
  return useMediaQuery("(min-width: 1024px)");
}
