"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` lets Motion itself honour the OS preference: transform
 * and layout animations are applied instantly rather than tweened.
 *
 * This matters beyond accessibility. `useReducedMotion()` returns null during
 * SSR and its real value after mount, so branching a component's `initial`
 * prop on it produces different markup on the server and the client — a
 * hydration mismatch. Handling the preference here means components can keep
 * one set of initial values and vary only the transition.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
