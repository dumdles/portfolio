"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { glyphs, type GlyphName } from "@/lib/pixel/glyphs";

/**
 * A hand-drawn pixel glyph, rendered as crisp SVG squares.
 *
 * Sizing is in whole screen pixels per glyph pixel (`px`), never a free
 * width, because pixel art at a fractional scale smears. Pick an integer.
 *
 * Motion, both optional:
 *
 *   assemble  Pixels land in a diagonal sweep, like a print head passing.
 *             "view" plays when scrolled into view; "intro" plays on first
 *             paint without waiting for JavaScript, for the hero.
 *
 *   hover     What the glyph does while its nearest .glyph-trigger ancestor
 *             is hovered or focused. "swap" shows frame 1 instead of frame 0
 *             (a lock opening). "loop" alternates the two (a heart beating).
 *             Loops only run under a pointer; nothing on the site animates
 *             forever on its own.
 *
 * Decorative by default. Pass `label` when the glyph carries meaning that
 * appears nowhere else.
 */
export interface PixelGlyphProps {
  name: GlyphName;
  /** Screen pixels per glyph pixel. Keep it an integer. */
  px?: number;
  /** Colour for accent ("+") pixels. Defaults to the brand colour. */
  accent?: string;
  assemble?: "view" | "intro" | false;
  /** Extra delay before the sweep starts, for sequencing glyphs. */
  delay?: number;
  /** Milliseconds between diagonals in the sweep. */
  step?: number;
  hover?: "swap" | "loop";
  /** Show one frame, statically, instead of the resting frame. For
   *  specimen sheets; the styleguide uses it to lay frames side by side. */
  frame?: number;
  label?: string;
  className?: string;
}

export function PixelGlyph({ name, px = 2, accent, assemble = false, delay = 0, step = 16, hover, frame, label, className }: PixelGlyphProps) {
  const glyph = glyphs[name];
  const [ref, inView] = useInView<SVGSVGElement>();

  const frames = React.useMemo(
    () =>
      (frame === undefined ? glyph.frames : [glyph.frames[frame] ?? glyph.frames[0]]).map((rows) => {
        const cells: { x: number; y: number; accent: boolean }[] = [];
        rows.forEach((row, y) => {
          for (let x = 0; x < row.length; x++) {
            const c = row[x];
            if (c === "#" || c === "+") cells.push({ x, y, accent: c === "+" });
          }
        });
        return cells;
      }),
    [glyph, frame]
  );

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${glyph.w} ${glyph.h}`}
      width={glyph.w * px}
      height={glyph.h * px}
      className={cn("pixel-glyph inline-block shrink-0 align-middle", className)}
      data-assemble={assemble || undefined}
      data-inview={assemble === "view" && inView ? "" : undefined}
      data-hover={frame === undefined ? hover : undefined}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ "--glyph-delay": `${delay}ms` } as React.CSSProperties}
    >
      {frames.map((cells, f) => (
        <g key={f} data-frame={f}>
          {cells.map(({ x, y, accent: isAccent }) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={isAccent ? (accent ?? "var(--brand)") : "currentColor"}
              style={f === 0 && assemble ? ({ "--pd": `${(x + y) * step}ms` } as React.CSSProperties) : undefined}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
