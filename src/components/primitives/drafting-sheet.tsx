"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A page section drawn on the drafting grid.
 *
 * The grid sits in its own absolutely positioned layer behind the content so
 * it can be masked at the edges. Without the mask the grid stops at a hard
 * line at the section boundary, which reads as a seam rather than as one
 * continuous sheet.
 *
 * `bleed` controls how far the grid fades:
 *   full  — grid across the whole section, fading only at the very edges
 *   top   — grid strongest at the top, gone by the bottom
 *   none  — no grid, for sections that need to sit quiet
 */
export interface DraftingSheetProps extends React.ComponentPropsWithoutRef<"section"> {
  grid?: "full" | "top" | "none";
  /** Constrain and pad the inner content. Turn off for full-bleed layouts. */
  contained?: boolean;
}

const maskClasses = {
  full: "[mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]",
  top: "[mask-image:linear-gradient(to_bottom,black_0%,transparent_70%)]",
  none: "",
} as const;

export function DraftingSheet({ grid = "full", contained = true, className, children, ...props }: DraftingSheetProps) {
  return (
    <section className={cn("relative isolate", className)} {...props}>
      {grid !== "none" && <div aria-hidden className={cn("drafting-grid pointer-events-none absolute inset-0 -z-10 opacity-60", maskClasses[grid])} />}
      {contained ? <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">{children}</div> : children}
    </section>
  );
}
