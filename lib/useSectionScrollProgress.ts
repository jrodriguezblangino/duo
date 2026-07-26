"use client";

import { useEffect, type RefObject } from "react";
import { frame, useMotionValue, type MotionValue } from "framer-motion";

/**
 * Scroll progress 0→1 as `target` travels through the viewport.
 * Updates are scheduled on Framer's frame loop so style subscribers
 * (useTransform) always flush — plain progress.set from timers can stall.
 */
export function useSectionScrollProgress(
  target: RefObject<Element | null>,
): MotionValue<number> {
  const progress = useMotionValue(0);

  useEffect(() => {
    let alive = true;

    const measure = () => {
      if (!alive) return;
      const el = target.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh =
        window.visualViewport?.height ??
        window.innerHeight ??
        document.documentElement.clientHeight;
      const total = rect.height + vh;
      const next =
        total <= 0 ? 0 : Math.min(1, Math.max(0, (vh - rect.top) / total));
      progress.set(next);
    };

    const schedule = () => {
      frame.update(measure, true);
    };

    measure();
    const opts: AddEventListenerOptions = { passive: true, capture: true };
    window.addEventListener("scroll", schedule, opts);
    document.addEventListener("scroll", schedule, opts);
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("scroll", schedule);
    const interval = window.setInterval(schedule, 50);

    return () => {
      alive = false;
      window.clearInterval(interval);
      window.removeEventListener("scroll", schedule, opts);
      document.removeEventListener("scroll", schedule, opts);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("scroll", schedule);
    };
  }, [target, progress]);

  return progress;
}
