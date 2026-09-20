"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechnicalLabel } from "./technical-label";

/**
 * The standard heading for a top-level section.
 *
 * Every section on the site carries a part number, which is what makes the
 * page read as one drawing rather than as a stack of unrelated blocks. The
 * number is decorative, so it is hidden from assistive technology; the
 * heading text carries the meaning.
 */
// `title` is omitted from the native props: the HTML title attribute is typed
// as a string, and this one takes rich content.
export interface SectionHeaderProps extends Omit<React.ComponentPropsWithoutRef<"header">, "title"> {
  /** Two-digit part number, e.g. "02". */
  part?: string;
  /** Short uppercase name shown beside the part number, e.g. "WORKS". */
  eyebrow?: string;
  title: React.ReactNode;
  /** One or two sentences under the title. */
  lead?: React.ReactNode;
  /** Heading level. Use h1 only for the page's single main heading. */
  as?: "h1" | "h2";
  align?: "left" | "center";
}

export function SectionHeader({ part, eyebrow, title, lead, as: Heading = "h2", align = "left", className, ...props }: SectionHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)} {...props}>
      {(part || eyebrow) && (
        <div className={cn("flex w-full items-center gap-3", align === "center" && "justify-center")}>
          {part && (
            <TechnicalLabel aria-hidden tone="brand" className="tabular-nums">
              {part}
            </TechnicalLabel>
          )}
          {eyebrow && <TechnicalLabel>{eyebrow}</TechnicalLabel>}
          <span aria-hidden className={cn("h-px flex-1 bg-rule", align === "center" && "max-w-24")} />
        </div>
      )}

      <Heading className={cn("font-display font-semibold text-balance text-ink", Heading === "h1" ? "text-display-lg" : "text-display-sm")}>{title}</Heading>

      {lead && <p className={cn("max-w-prose text-body-lg text-ink-muted text-pretty", align === "center" && "mx-auto")}>{lead}</p>}
    </header>
  );
}
