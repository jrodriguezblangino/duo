"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ACCENT_VIEWPORT, glide } from "@/lib/motion";

export type HighlightReveal = "scroll" | "view";

/** light = sand/50 on off-white (Manifiesto); dark = solid sand on carbon (Anatomy) */
export type HighlightSurface = "light" | "dark";

type HighlightWordProps = {
  children: string;
  reduce: boolean;
  progress: MotionValue<number>;
  range: readonly [number, number];
  /** Mobile / IO: draw on enter — scroll scrub often finishes off-screen without a pin */
  reveal?: HighlightReveal;
  surface?: HighlightSurface;
  /** Stagger delay (view mode) in seconds — prefer 0; fire from own IO entry */
  delay?: number;
  /** View-mode draw duration; default matches Manifiesto */
  duration?: number;
};

const BODY_MUTED = "#b8b3ab";
const CARBON = "#0D0D0D";

function markerClass(surface: HighlightSurface) {
  return surface === "dark"
    ? "absolute inset-x-0 bottom-[0.06em] top-[0.16em] bg-sand"
    : "absolute inset-x-0 bottom-[0.06em] top-[0.16em] bg-sand/50";
}

/**
 * Primary accent — carbon word, sand highlight bar draws L→R.
 * On dark surfaces, text stays muted until the marker draws so the
 * word is readable plain during section entrance (not pre-highlighted).
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
      ? [BODY_MUTED, BODY_MUTED, CARBON, CARBON]
      : [CARBON, CARBON, CARBON, CARBON],
  );
  const bar = markerClass(surface);
  const shell = "relative inline-block whitespace-nowrap px-[0.14em]";

  if (reduce) {
    return (
      <HighlightWordStatic surface={surface}>{children}</HighlightWordStatic>
    );
  }

  if (reveal === "view") {
    return (
      <motion.span
        className={shell}
        initial={
          surface === "dark" ? { color: BODY_MUTED } : { color: CARBON }
        }
        whileInView={
          surface === "dark" ? { color: CARBON } : { color: CARBON }
        }
        viewport={ACCENT_VIEWPORT}
        transition={{ duration, ease: glide.ease, delay }}
      >
        <motion.span
          aria-hidden="true"
          className={`${bar} origin-left will-change-transform`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={ACCENT_VIEWPORT}
          transition={{ duration, ease: glide.ease, delay }}
        />
        <span className="relative z-[1]">{children}</span>
      </motion.span>
    );
  }

  return (
    <motion.span className={shell} style={{ color }}>
      <motion.span
        aria-hidden="true"
        className={`${bar} origin-left will-change-transform`}
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
    <span className="relative inline-block whitespace-nowrap px-[0.14em] text-carbon">
      <span aria-hidden="true" className={markerClass(surface)} />
      <span className="relative z-[1]">{children}</span>
    </span>
  );
}
