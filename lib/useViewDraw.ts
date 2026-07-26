"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Draw-once when `ref` enters the viewport.
 *
 * Native IntersectionObserver + scroll fallback. Retries until the ref node
 * exists (avoids a silent no-op if the effect runs before attach).
 */
export function useViewDraw(enabled: boolean): {
  ref: RefObject<HTMLSpanElement | null>;
  drawn: boolean;
} {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  const drawnRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    if (drawnRef.current) {
      setDrawn(true);
      return;
    }

    let cancelled = false;
    let io: IntersectionObserver | null = null;
    let rafWait = 0;

    const commit = () => {
      if (cancelled || drawnRef.current) return;
      drawnRef.current = true;
      setDrawn(true);
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    const visibleEnough = (el: Element) => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      if (rect.height <= 0 || vh <= 0) return false;
      const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      return visible / rect.height >= 0.15 && rect.top < vh * 0.98;
    };

    const onScroll = () => {
      const el = ref.current;
      if (el && visibleEnough(el)) commit();
    };

    const attach = () => {
      if (cancelled || drawnRef.current) return;
      const el = ref.current;
      if (!el) {
        rafWait = requestAnimationFrame(attach);
        return;
      }

      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) commit();
        },
        { threshold: [0, 0.1, 0.25, 0.5], rootMargin: "0px 0px -5% 0px" },
      );
      io.observe(el);

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
    };

    attach();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafWait);
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  return { ref, drawn };
}
