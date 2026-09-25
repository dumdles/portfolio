"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { TechnicalLabel } from "./technical-label";
import { DecodeText } from "./decode-text";
import { useInView } from "@/hooks/use-in-view";

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
  // The header is its own trigger: its label decodes, its rule draws and
  // its title and lead rise, all the first time it comes into view.
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <header
      ref={ref}
      data-inview={inView ? "" : undefined}
      className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}
      {...props}
    >
      {(part || eyebrow) && (
        <div data-reveal="fade" className={cn("flex w-full items-center gap-3", align === "center" && "justify-center")}>
          {part && (
            <TechnicalLabel aria-hidden tone="brand" className="tabular-nums">
              <DecodeText text={part} start={inView} duration={320} />
            </TechnicalLabel>
          )}
          {eyebrow && (
            <TechnicalLabel>
              <DecodeText text={eyebrow} start={inView} delay={60} />
            </TechnicalLabel>
          )}
          <span
            aria-hidden
            data-draw
            style={{ "--delay": "120ms" } as React.CSSProperties}
            className={cn("h-px flex-1 bg-rule", align === "center" && "max-w-24")}
          />
        </div>
      )}

      <Heading
        data-reveal
        style={{ "--i": 1 } as React.CSSProperties}
        className={cn("font-display font-semibold text-balance text-ink", Heading === "h1" ? "text-display-lg" : "text-display-sm")}
      >
        {title}
      </Heading>

      {lead && (
        <p data-reveal style={{ "--i": 2 } as React.CSSProperties} className={cn("max-w-prose text-body-lg text-ink-muted text-pretty", align === "center" && "mx-auto")}>
          {lead}
        </p>
      )}
    </header>
  );
}
