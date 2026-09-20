"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The title block from the corner of a technical drawing: a bordered table of
 * field and value pairs.
 *
 * On the hero this carries location, current status and availability. On a
 * case study it carries role, stack and dates. It is a definition list, so it
 * reads correctly to a screen reader as well as looking the part.
 */
export interface TitleBlockField {
  label: string;
  value: React.ReactNode;
}

export interface TitleBlockProps extends React.ComponentPropsWithoutRef<"dl"> {
  fields: TitleBlockField[];
  /** Stack fields in one column instead of flowing into two. */
  dense?: boolean;
}

export function TitleBlock({ fields, dense = false, className, ...props }: TitleBlockProps) {
  return (
    <dl className={cn("grid overflow-hidden rounded-md border border-rule bg-surface/60", dense ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2", className)} {...props}>
      {fields.map((field) => (
        <div key={field.label} className="flex flex-col gap-1 border-b border-rule p-3 last:border-b-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0">
          <dt className="font-mono text-label uppercase text-ink-faint">{field.label}</dt>
          <dd className="text-body-sm font-medium text-ink">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}
