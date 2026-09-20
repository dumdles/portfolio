"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A filter chip.
 *
 * Rendered as a real toggle button with `aria-pressed` rather than a styled
 * div, so keyboard and screen reader users get the state for free.
 */
export interface ChipProps extends React.ComponentPropsWithoutRef<"button"> {
  selected?: boolean;
  /** Optional count shown after the label. */
  count?: number;
}

export function Chip({ selected = false, count, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-3 py-1.5",
        "font-mono text-label uppercase transition-colors duration-200",
        selected ? "border-brand bg-brand text-brand-ink" : "border-rule bg-surface text-ink-muted hover:border-rule-strong hover:text-ink",
        className
      )}
      {...props}
    >
      {children}
      {count !== undefined && <span className={cn("tabular-nums", selected ? "opacity-70" : "text-ink-faint")}>{count}</span>}
    </button>
  );
}

/**
 * The discipline marker: a coloured dot plus a label.
 *
 * Exists so a grid of project tiles shows the spread across design, software
 * and security at a glance, without the reader parsing any prose.
 */
export interface DisciplineMarkerProps extends React.ComponentPropsWithoutRef<"span"> {
  discipline: "design" | "build" | "break";
  label: string;
}

const dotClasses = {
  design: "bg-design",
  build: "bg-build",
  break: "bg-break",
} as const;

export function DisciplineMarker({ discipline, label, className, ...props }: DisciplineMarkerProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-mono text-label uppercase text-ink-muted", className)} {...props}>
      <span aria-hidden className={cn("size-1.5 rounded-full", dotClasses[discipline])} />
      {label}
    </span>
  );
}
