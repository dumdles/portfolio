"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The system's smallest unit of annotation: mono, uppercase, wide tracking.
 *
 * Used for part numbers, field names in the title block, dates, tile
 * categories and anything else that would be hand-lettered on a drawing.
 * Never use it for prose.
 */
export interface TechnicalLabelProps extends React.ComponentPropsWithoutRef<"span"> {
  /** Draw a short rule before the text, as on a leader line. */
  rule?: boolean;
  tone?: "muted" | "ink" | "brand";
}

const toneClasses = {
  muted: "text-ink-muted",
  ink: "text-ink",
  brand: "text-brand",
} as const;

export function TechnicalLabel({ rule = false, tone = "muted", className, children, ...props }: TechnicalLabelProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-label uppercase", toneClasses[tone], className)} {...props}>
      {rule && <span aria-hidden className="h-px w-5 shrink-0 bg-current opacity-45" />}
      {children}
    </span>
  );
}
