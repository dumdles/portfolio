"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A callout with a leader line, as used to label a part on a drawing.
 *
 * Position it with absolute utilities on the consumer side; the component
 * owns the dot, the line and the lettering, not the placement.
 *
 *   <div className="relative">
 *     <Image … />
 *     <Annotation side="right" className="absolute right-0 top-10 translate-x-full">
 *       Shot on a borrowed camera
 *     </Annotation>
 *   </div>
 *
 * Annotations are decoration. They are hidden from assistive technology, so
 * never put information here that appears nowhere else.
 */
export interface AnnotationProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Which way the leader line runs from the label toward its subject. */
  side?: "left" | "right";
  /** Length of the leader line. */
  lineLength?: "sm" | "md" | "lg";
}

const lineLengths = {
  sm: "w-6",
  md: "w-12",
  lg: "w-20",
} as const;

export function Annotation({ side = "right", lineLength = "md", className, children, ...props }: AnnotationProps) {
  const line = (
    <span aria-hidden className={cn("flex items-center", lineLengths[lineLength])}>
      <span className="size-1 shrink-0 rounded-full bg-brand" />
      <span className="h-px flex-1 bg-rule-strong" />
    </span>
  );

  return (
    <div aria-hidden className={cn("pointer-events-none flex items-center gap-2 font-mono text-label uppercase text-ink-muted", side === "left" && "flex-row-reverse", className)} {...props}>
      <span className={cn(side === "left" ? "scale-x-[-1]" : undefined, "flex")}>{line}</span>
      <span className="whitespace-nowrap">{children}</span>
    </div>
  );
}

/**
 * A dimension line with end ticks and a measurement, as used to mark a
 * distance on a drawing.
 *
 * Fills its positioning container, so give the parent `relative` and this
 * element `absolute` plus the edge you want it to run along.
 */
export interface DimensionLineProps extends React.ComponentPropsWithoutRef<"div"> {
  orientation?: "horizontal" | "vertical";
  /** The measurement to letter in the middle, e.g. "1.78 m". */
  value: React.ReactNode;
}

export function DimensionLine({ orientation = "horizontal", value, className, ...props }: DimensionLineProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div aria-hidden className={cn("pointer-events-none flex items-center justify-center", isHorizontal ? "h-4 w-full flex-row" : "h-full w-4 flex-col", className)} {...props}>
      <span className={cn("shrink-0 bg-rule-strong", isHorizontal ? "h-3 w-px" : "h-px w-3")} />
      <span className={cn("flex-1 bg-rule-strong", isHorizontal ? "h-px" : "w-px")} />
      <span className={cn("bg-paper px-1 font-mono text-label uppercase text-ink-muted", !isHorizontal && "[writing-mode:vertical-rl] py-1")}>{value}</span>
      <span className={cn("flex-1 bg-rule-strong", isHorizontal ? "h-px" : "w-px")} />
      <span className={cn("shrink-0 bg-rule-strong", isHorizontal ? "h-3 w-px" : "h-px w-3")} />
    </div>
  );
}
