"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ACCENT_VIEWPORT, glide } from "@/lib/motion";

export type AccentReveal = "scroll" | "view";

/** ink = carbon text (off-white surfaces); sand = accent text (carbon surfaces) */
export type AccentTone = "ink" | "sand";

type AccentEchoProps = {
  children: string;
  progress: MotionValue<number>;
  range: readonly [number, number];
  reduce?: boolean;
  reveal?: AccentReveal;
  tone?: AccentTone;
  /**
   * When set (e.g. off-white/70 on carbon), text color lerps to sand
   * over `range` together with the underline — so color+line never
   * fire before the surrounding paragraph has finished revealing.
   */
  fromColor?: string;
};

const SAND = "#D4C3B3";
const CARBON = "#0D0D0D";

/**
 * Manifesto “arte” accent — sand underline draws L→R via scaleX.
 * Shared by Manifiesto + Anatomy for identical motion/styling.
 */
export function AccentEcho({
  children,
  progress,
  range,
  reduce = false,
  reveal = "scroll",
  tone = "ink",
  fromColor,
}: AccentEchoProps) {
  const [start, end] = range;
  const scaleX = useTransform(progress, [start, end, 1], [0, 1, 1]);
  const target = tone === "sand" ? SAND : CARBON;
  const color = useTransform(
    progress,
    [start, end, 1],
    [fromColor ?? target, target, target],
  );

  const textClass =
    fromColor || tone === "sand" ? undefined : "text-carbon";

  if (reduce) {
    return (
      <span
        className={`relative inline ${tone === "sand" ? "text-sand" : "text-carbon"}`}
      >
        {children}
        <span
          aria-hidden="true"
          className="absolute bottom-[0.05em] left-0 h-[2px] w-full bg-sand"
        />
      </span>
    );
  }

  if (reveal === "view") {
    return (
      <span
        className={`relative inline ${tone === "sand" ? "text-sand" : "text-carbon"}`}
      >
        {children}
        <motion.span
          aria-hidden="true"
          className="absolute bottom-[0.05em] left-0 h-[2px] w-full origin-left bg-sand will-change-transform"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={ACCENT_VIEWPORT}
          transition={{ duration: 0.45, ease: glide.ease, delay: 0.08 }}
        />
      </span>
    );
  }

  return (
    <motion.span
      className={`relative inline ${textClass ?? ""}`}
      style={fromColor || tone === "sand" ? { color } : undefined}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-[0.05em] left-0 h-[2px] w-full origin-left bg-sand will-change-transform"
        style={{ scaleX }}
      />
    </motion.span>
  );
}

/** Static end-state for reduced-motion / non-scrub layouts */
export function AccentEchoStatic({
  children,
  tone = "ink",
}: {
  children: string;
  tone?: AccentTone;
}) {
  return (
    <span
      className={`relative inline ${tone === "sand" ? "text-sand" : "text-carbon"}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute bottom-[0.05em] left-0 h-[2px] w-full bg-sand"
      />
    </span>
  );
}
