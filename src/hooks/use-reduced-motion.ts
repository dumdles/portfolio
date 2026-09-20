"use client";

import * as React from "react";

/**
 * Tracks the OS-level `prefers-reduced-motion` setting.
 *
 * Returns `true` when the visitor has asked for reduced motion, and keeps
 * returning the live value if they change the setting while the page is open.
 *
 * Starts as `false` on the server and on the first client render so that
 * markup matches during hydration; the real value lands in the effect
 * immediately afterwards. Anything that would move on mount should therefore
 * also be gated behind the CSS media query in globals.css, which applies
 * before React runs.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
