"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useViewDraw } from "@/lib/useViewDraw";

export type AccentReveal = "scroll" | "view";
export type AccentTone = "ink" | "sand";

type AccentEchoProps = {
  children: string;
  progress: MotionValue<number>;
  range: readonly [number, number];
  reduce?: boolean;
  reveal?: AccentReveal;
  tone?: AccentTone;
  fromColor?: string;
};

const SAND = "#BC4A26";
const CARBON = "#17140F";

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useRafDraw(drawn: boolean, duration = 0.7) {
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
    const startAt = performance.now();
    const durMs = Math.max(16, duration * 1000);

    const finish = () => {
      el.style.transform = "scaleX(1)";
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - startAt) / durMs);
      el.style.transform = `scaleX(${easeOutExpo(t)})`;
      if (t < 1) raf = requestAnimationFrame(tick);
      else finish();
    };

    raf = requestAnimationFrame(tick);
    const fallback = window.setTimeout(finish, durMs + 120);

    return () => {
      cancelAnimationFrame(raf);
      void fallback;
    };
  }, [drawn, duration]);

  return barRef;
}

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
  const { ref: shellRef, drawn } = useViewDraw(reveal === "view" && !reduce);
  const barRef = useRafDraw(drawn);

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
        ref={shellRef}
        className={`relative inline ${tone === "sand" ? "text-sand" : "text-carbon"}`}
      >
        {children}
        <span
          aria-hidden="true"
          ref={barRef}
          className="absolute bottom-[0.05em] left-0 h-[2px] w-full origin-left bg-sand"
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
