"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { FONT_H, FONT_W, pixelFont } from "@/lib/pixel/font";

/**
 * A line of text set in the site's 5 x 7 pixel face.
 *
 *   drop         On first view, pixels fall into place column by column,
 *                bottom row first, so each letter stacks up like settling
 *                blocks. Stepped, so every frame is grid-aligned.
 *   interactive  Pixels near the pointer light up in the brand colour, a
 *                small lamp passing over a printed sheet.
 *   fluid        Scale to the container width instead of a fixed `px`.
 *                Use it for large wordmarks only; below roughly 8px per cell
 *                the uneven scaling starts to show.
 *
 * The rendered squares are hidden from assistive technology; the text is
 * provided as the accessible name.
 */
export interface PixelTextProps {
  text: string;
  /** Screen pixels per cell when not fluid. Keep it an integer. */
  px?: number;
  fluid?: boolean;
  drop?: boolean;
  interactive?: boolean;
  /** Pointer radius, in cells, for the interactive highlight. */
  radius?: number;
  /**
   * Gap between cells, as a fraction of a cell. Fluid wordmarks scale by
   * fractional amounts, which leaves uneven hairline seams between touching
   * squares; a deliberate, even gap reads as an LED matrix instead.
   * Defaults to 0.12 when fluid and 0 otherwise.
   */
  cellGap?: number;
  className?: string;
}

const GAP = 1;

export function PixelText({ text, px = 3, fluid = false, drop = false, interactive = false, radius = 3.2, cellGap, className }: PixelTextProps) {
  const gap = cellGap ?? (fluid ? 0.12 : 0);
  const [ref, inView] = useInView<SVGSVGElement>({ rootMargin: "0px 0px -8% 0px" });
  const reduced = useReducedMotion();
  const rectsRef = React.useRef<(SVGRectElement | null)[]>([]);
  const frameRef = React.useRef<number | null>(null);

  const { cells, width } = React.useMemo(() => {
    const out: { x: number; y: number }[] = [];
    const chars = Array.from(text.toUpperCase());
    chars.forEach((ch, i) => {
      const bitmap = pixelFont[ch] ?? pixelFont[" "];
      const ox = i * (FONT_W + GAP);
      bitmap.forEach((row, y) => {
        for (let x = 0; x < FONT_W; x++) if (row[x] === "#") out.push({ x: ox + x, y });
      });
    });
    return { cells: out, width: Math.max(chars.length * (FONT_W + GAP) - GAP, 1) };
  }, [text]);

  const clear = React.useCallback(() => {
    for (const rect of rectsRef.current) rect?.removeAttribute("data-hot");
  }, []);

  const onPointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!interactive || reduced || event.pointerType !== "mouse") return;
    const svg = event.currentTarget;
    const box = svg.getBoundingClientRect();
    const cx = ((event.clientX - box.left) / box.width) * width;
    const cy = ((event.clientY - box.top) / box.height) * FONT_H;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      cells.forEach((cell, i) => {
        const rect = rectsRef.current[i];
        if (!rect) return;
        const dx = cell.x + 0.5 - cx;
        const dy = cell.y + 0.5 - cy;
        if (dx * dx + dy * dy <= radius * radius) rect.setAttribute("data-hot", "");
        else rect.removeAttribute("data-hot");
      });
    });
  };

  React.useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    []
  );

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${FONT_H}`}
      width={fluid ? "100%" : width * px}
      height={fluid ? undefined : FONT_H * px}
      preserveAspectRatio="xMinYMid meet"
      className={cn("pixel-text block", fluid && "h-auto w-full", className)}
      data-drop={drop || undefined}
      data-inview={drop && inView ? "" : undefined}
      role="img"
      aria-label={text}
      onPointerMove={interactive ? onPointerMove : undefined}
      onPointerLeave={interactive ? clear : undefined}
    >
      {cells.map((cell, i) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          ref={(node) => {
            rectsRef.current[i] = node;
          }}
          x={cell.x + gap / 2}
          y={cell.y + gap / 2}
          width={1 - gap}
          height={1 - gap}
          fill="currentColor"
          style={drop ? ({ "--pd": `${cell.x * 11 + (FONT_H - 1 - cell.y) * 16}ms` } as React.CSSProperties) : undefined}
        />
      ))}
    </svg>
  );
}
