"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * Subtle mint radial that follows the cursor on dark surfaces.
 * GPU-only (transform); off under reduced-motion / touch.
 */
export default function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const opacity = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 120, damping: 28, mass: 0.4 });
  const enabled = useRef(false);

  useEffect(() => {
    if (reduce) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    enabled.current = true;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
      opacity.set(1);
    };
    const onLeave = () => opacity.set(0);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, x, y, opacity]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[45] hidden h-[400px] w-[400px] md:block"
      style={{
        x: springX,
        y: springY,
        opacity,
        background:
          "radial-gradient(circle, rgba(144,238,144,0.09) 0%, transparent 68%)",
      }}
    />
  );
}
