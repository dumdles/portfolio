"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { DecodeText } from "./decode-text";

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
  /**
   * Decode the field labels. `true` starts on mount, for above-the-fold
   * blocks; "view" waits until the block is scrolled to.
   */
  decode?: boolean | "view";
  /** Delay before the first label starts decoding; later ones follow on. */
  decodeDelay?: number;
}

export function TitleBlock({ fields, dense = false, decode = false, decodeDelay = 0, className, ...props }: TitleBlockProps) {
  return (
    <dl className={cn("grid overflow-hidden rounded-md border border-rule bg-surface/60", dense ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2", className)} {...props}>
      {fields.map((field, i) => (
        <div key={field.label} className="flex flex-col gap-1 border-b border-rule p-3 last:border-b-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0">
          <dt className="font-mono text-label uppercase text-ink-faint">
            {decode ? <DecodeText text={field.label} start={decode === true ? true : undefined} delay={decodeDelay + i * 90} duration={420} /> : field.label}
          </dt>
          <dd className="text-body-sm font-medium text-ink">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}
