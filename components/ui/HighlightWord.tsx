"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { useViewDraw } from "@/lib/useViewDraw";

export type HighlightReveal = "scroll" | "view";

/** light = sand/50 on off-white (Manifiesto); dark = solid sand on carbon (Anatomy) */
export type HighlightSurface = "light" | "dark";

type HighlightWordProps = {
  children: string;
  reduce: boolean;
  progress: MotionValue<number>;
  range: readonly [number, number];
  reveal?: HighlightReveal;
  surface?: HighlightSurface;
  delay?: number;
  duration?: number;
};

const BODY_MUTED = "#C9BFAA";
const INK = "#17140F";
const CREAM = "#EDE4CF";

function markerClass(surface: HighlightSurface) {
  return surface === "dark"
    ? "absolute inset-x-0 bottom-[0.06em] top-[0.16em] origin-left bg-sand"
    : "absolute inset-x-0 bottom-[0.06em] top-[0.16em] origin-left bg-sand/50";
}

/** Expo-out matching design-system glide */
function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * rAF-driven scaleX — independent of document.timeline / CSS transitions.
 * Survives React Strict Mode by not cancelling the end-state fallback.
 */
function useRafDraw(
  drawn: boolean,
  duration: number,
  delay: number,
) {
  const barRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    el.style.transformOrigin = "left center";

    if (!drawn) {
      el.style.transform = "scaleX(0)";
      return;
    }

    if (startedRef.current) {
      el.style.transform = "scaleX(1)";
      return;
    }
    startedRef.current = true;

    let raf = 0;
    const startAt = performance.now() + delay * 1000;
    const durMs = Math.max(16, duration * 1000);

    const finish = () => {
      el.style.transform = "scaleX(1)";
    };

    const tick = (now: number) => {
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (now - startAt) / durMs);
      el.style.transform = `scaleX(${easeOutExpo(t)})`;
      if (t < 1) raf = requestAnimationFrame(tick);
      else finish();
    };

    raf = requestAnimationFrame(tick);

    const fallback = window.setTimeout(finish, delay * 1000 + durMs + 120);

    return () => {
      cancelAnimationFrame(raf);
      // Keep fallback so Strict Mode cleanup cannot leave scaleX(0)
      // If this effect re-runs, startedRef short-circuits to scaleX(1).
      void fallback;
    };
  }, [drawn, duration, delay]);

  return barRef;
}

/**
 * Primary accent — ink/cream word, sand highlight bar draws L→R.
 */
export function HighlightWord({
  children,
  reduce,
  progress,
  range,
  reveal = "scroll",
  surface = "light",
  delay = 0,
  duration = 0.85,
}: HighlightWordProps) {
  const [start, end] = range;
  const scaleX = useTransform(progress, [0, start, end, 1], [0, 0, 1, 1]);
  const color = useTransform(
    progress,
    [0, start, end, 1],
    surface === "dark"
      ? [BODY_MUTED, BODY_MUTED, CREAM, CREAM]
      : [INK, INK, INK, INK],
  );
  const bar = markerClass(surface);
  const shell = "relative inline-block whitespace-nowrap px-[0.14em]";
  const { ref: shellRef, drawn } = useViewDraw(reveal === "view" && !reduce);
  const barRef = useRafDraw(drawn, duration, delay);

  if (reduce) {
    return (
      <HighlightWordStatic surface={surface}>{children}</HighlightWordStatic>
    );
  }

  if (reveal === "view") {
    return (
      <span
        ref={shellRef}
        className={shell}
        style={{
          color: surface === "dark" ? (drawn ? CREAM : BODY_MUTED) : INK,
        }}
      >
        <span aria-hidden="true" ref={barRef} className={bar} />
        <span className="relative z-[1]">{children}</span>
      </span>
    );
  }

  return (
    <motion.span className={shell} style={{ color }}>
      <motion.span
        aria-hidden="true"
        className={`${bar} will-change-transform`}
        style={{ scaleX }}
      />
      <span className="relative z-[1]">{children}</span>
    </motion.span>
  );
}

/** Static end-state for reduced-motion / non-scrub layouts */
export function HighlightWordStatic({
  children,
  surface = "light",
}: {
  children: string;
  surface?: HighlightSurface;
}) {
  return (
    <span
      className={`relative inline-block whitespace-nowrap px-[0.14em] ${
        surface === "dark" ? "text-offwhite" : "text-carbon"
      }`}
    >
      <span aria-hidden="true" className={markerClass(surface)} />
      <span className="relative z-[1]">{children}</span>
    </span>
  );
}
