/**
 * Shared motion tokens — Design System V2 §2.3
 * Import from here only; do not invent per-component easing curves.
 */

/** Section reveals, image parallax, panel transitions — expo-out glide */
export const glide = {
  duration: 1.1,
  ease: [0.16, 1, 0.3, 1] as const,
};

/** UI micro-interactions: buttons, toggles, nav — mechanical, not soft */
export const precision = {
  type: "spring" as const,
  stiffness: 280,
  damping: 30,
  mass: 0.9,
};

/** Standard entry travel — never exceed 24px (§2.3) */
export const ENTRY_Y = 24;

/** Max stagger between children */
export const STAGGER = 0.08;

/**
 * Accent highlight / underline — fire when the word sits mid-viewport.
 * Margins keep the trigger away from the fold so iOS layout settle
 * (after fonts/video) doesn't mark the animation as already done.
 */
export const ACCENT_VIEWPORT = {
  once: true,
  amount: 0.35,
  margin: "0px 0px -20% 0px",
} as const;
