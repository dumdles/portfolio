"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

/**
 * The trigger for scroll entrances.
 *
 * Reveal watches itself and, once on screen, sets data-inview. Descendants
 * opt in with data-reveal (rise), data-reveal="fade", or data-draw (a rule
 * that draws itself), and stagger with a --i index:
 *
 *   <Reveal className="grid gap-4">
 *     {items.map((item, i) => (
 *       <div key={item.id} data-reveal style={{ "--i": i } as React.CSSProperties}>…</div>
 *     ))}
 *   </Reveal>
 *
 * Pass `self` to animate the wrapper itself instead.
 *
 * Keep Reveals small and local. Anything marked inside a Reveal plays the
 * moment that Reveal is seen, so wrapping a whole long section would play
 * entrances for content still far below the fold.
 */
export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "header" | "ul" | "ol" | "li" | "footer" | "span";
  /** Animate this element itself, not just marked descendants. */
  self?: boolean | "fade";
  /** Added to every staggered child's delay. */
  delay?: number;
  rootMargin?: string;
}

export function Reveal({ as: Tag = "div", self, delay, rootMargin, className, style, children, ...props }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>({ rootMargin });

  return React.createElement(
    Tag,
    {
      ref,
      "data-inview": inView ? "" : undefined,
      "data-reveal": self === "fade" ? "fade" : self ? "" : undefined,
      className: cn(className),
      style: delay ? ({ "--delay": `${delay}ms`, ...style } as React.CSSProperties) : style,
      ...props,
    },
    children
  );
}
