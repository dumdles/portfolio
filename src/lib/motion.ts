import type * as React from "react";

/**
 * A stagger index for scroll reveals, so call sites read cleanly:
 *
 *   <li data-reveal style={stagger(i)}>
 *
 * Kept out of any "use client" module on purpose. It is a plain function,
 * and server components need to be able to call it too.
 */
export function stagger(i: number, extra?: React.CSSProperties): React.CSSProperties {
  return { "--i": i, ...extra } as React.CSSProperties;
}
