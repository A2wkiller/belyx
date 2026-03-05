/**
 * Shared animation variants for consistent, performant motion across the app.
 * Uses spring physics for natural feel and GPU-friendly transforms.
 */

export const spring = {
  snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 260, damping: 24 },
  bouncy: { type: "spring" as const, stiffness: 300, damping: 20 },
  smooth: { type: "spring" as const, stiffness: 200, damping: 25 },
  fast: { type: "spring" as const, stiffness: 500, damping: 35 },
};

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

export const viewportDefaults = {
  once: true,
  margin: "-60px 0px -60px 0px",
  amount: 0.15,
};
