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
 * Accent highlight / underline — fire when the word sits mid-viewport
 * (~40–50% in), not on first entry. Shared by HighlightWord + AccentEcho.
 */
export const ACCENT_VIEWPORT = {
  once: true,
  amount: 0.5,
  margin: "-40% 0px -45% 0px",
} as const;
