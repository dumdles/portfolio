"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Mono text that resolves out of noise, left to right, like a readout
 * locking on.
 *
 * The nod to security work, used on labels only: part numbers, eyebrows,
 * title block values. Never on prose, and never on display type, where the
 * variable glyph widths would make the line jitter.
 *
 * The noise is drawn from ASCII so every frame stays in the loaded mono
 * subset and keeps the exact width of the final string. The real text is
 * always present for assistive technology; only the animated copy is hidden.
 */

const NOISE = "#*+=-_/\\<>[]{}01xX%$&?!";
const FRAME_MS = 42;

export interface DecodeTextProps {
  text: string;
  className?: string;
  /** Total time for the last character to settle. */
  duration?: number;
  delay?: number;
  /**
   * Start signal. Omit to start when the element scrolls into view. Pass
   * true to start immediately on mount, for above-the-fold labels.
   */
  start?: boolean;
  as?: "span" | "dd" | "p" | "div";
}

function noise() {
  return NOISE[Math.floor(Math.random() * NOISE.length)];
}

export function DecodeText({ text, className, duration = 560, delay = 0, start, as: Tag = "span" }: DecodeTextProps) {
  const [viewRef, inView] = useInView<HTMLSpanElement>();
  const reduced = useReducedMotion();
  const [output, setOutput] = React.useState(text);
  const trigger = start ?? inView;

  React.useEffect(() => {
    if (!trigger || reduced) {
      setOutput(text);
      return;
    }

    const chars = Array.from(text);
    // Each character settles at its own moment: mostly in order, with a
    // little jitter so the lock-on reads as found rather than typed.
    const settleAt = chars.map((_, i) => (i / Math.max(chars.length, 1)) * duration * 0.72 + Math.random() * duration * 0.28);

    let raf = 0;
    let last = 0;
    const origin = performance.now() + delay;

    const tick = (now: number) => {
      const t = now - origin;
      if (now - last >= FRAME_MS) {
        last = now;
        let done = true;
        const next = chars
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (t >= settleAt[i]) return ch;
            done = false;
            return noise();
          })
          .join("");
        setOutput(next);
        if (done) return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, reduced, text, duration, delay]);

  return React.createElement(
    Tag,
    // Spaces are kept verbatim through every frame, so wrapping points never
    // move while the text resolves.
    { className: cn(className), style: { fontVariantLigatures: "none" } },
    <>
      <span className="sr-only">{text}</span>
      <span ref={viewRef} aria-hidden>
        {output}
      </span>
    </>
  );
}
