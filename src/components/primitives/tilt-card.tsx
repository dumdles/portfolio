"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface TiltCardProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Maximum rotation in degrees at the edges of the card. */
  maxTilt?: number;
  /** Scale applied while pointing at the card. 1 disables the lift. */
  hoverScale?: number;
  /** Render the cursor-following sheen. */
  glare?: boolean;
  /** Draw the standard card chrome (surface, hairline border, elevation). */
  chrome?: boolean;
}

/**
 * A card that tilts toward the cursor, with a sheen that follows it.
 *
 * This replaces the two near-identical copies of the effect that lived in
 * ExperienceSection and HobbiesSection. Four things differ from those:
 *
 * 1. The transform is written straight to the node inside a rAF callback.
 *    The originals called setState on every mousemove, re-rendering the whole
 *    subtree dozens of times a second.
 * 2. Only mouse pointers tilt. On touch, `pointermove` fires once on tap and
 *    left the originals stuck at an angle with no way to reset.
 * 3. `prefers-reduced-motion` disables the tilt entirely.
 * 4. Keyboard focus produces a visible lift, so the card is not inert to
 *    anyone not using a mouse.
 *
 * The tilt shrinks as the card grows. The same angle swings the edge of a
 * wide card much further than a small one, so a card's tilt is scaled by
 * 320px over its longer side, down to a third of `maxTilt`.
 *
 * Followers: a sibling marked `data-tilt-follow` (a pixel glyph, usually)
 * cannot sit inside the card, because a 3D-transformed card is resampled
 * every frame and pixel art smears. Instead, each frame the card's live
 * transform is read back and applied to the follower's centre, and the
 * follower is moved there by whole pixels only. It tracks the card through
 * the transition and stays sharp.
 *
 * The sheen is what makes these read as expensive rather than as a CSS demo,
 * and it costs one extra element.
 */
export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(function TiltCard(
  { maxTilt = 9, hoverScale = 1.02, glare = true, chrome = true, className, children, style, onPointerMove, onPointerLeave, onPointerEnter, ...props },
  forwardedRef
) {
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const frameRef = React.useRef<number | null>(null);
  const followRef = React.useRef<number | null>(null);
  const followUntil = React.useRef(0);
  const [pointerInside, setPointerInside] = React.useState(false);
  const reducedMotion = useReducedMotion();

  // Merge the forwarded ref with the local one.
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef]
  );

  React.useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (followRef.current !== null) cancelAnimationFrame(followRef.current);
    };
  }, []);

  /** Moves followers to where the card's transform puts them, for `ms` more. */
  const follow = React.useCallback((ms: number) => {
    const node = innerRef.current;
    const followers = node?.parentElement?.querySelectorAll<HTMLElement>(":scope > [data-tilt-follow]");
    if (!node || !followers?.length) return;
    followUntil.current = Math.max(followUntil.current, performance.now() + ms);
    if (followRef.current !== null) return;

    const tick = () => {
      const transform = getComputedStyle(node).transform;
      const matrix = transform === "none" ? null : new DOMMatrix(transform);
      const cx = node.offsetLeft + node.offsetWidth / 2;
      const cy = node.offsetTop + node.offsetHeight / 2;
      followers.forEach((el) => {
        if (!matrix) {
          el.style.translate = "";
          return;
        }
        // The follower's centre, relative to the card's transform origin.
        const x = el.offsetLeft + el.offsetWidth / 2 - cx;
        const y = el.offsetTop + el.offsetHeight / 2 - cy;
        const p = matrix.transformPoint(new DOMPoint(x, y, 0, 1));
        const dx = Math.round(p.x / p.w - x);
        const dy = Math.round(p.y / p.w - y);
        el.style.translate = `${dx}px ${dy}px`;
      });
      followRef.current = performance.now() < followUntil.current ? requestAnimationFrame(tick) : null;
    };
    followRef.current = requestAnimationFrame(tick);
  }, []);

  const reset = React.useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    const node = innerRef.current;
    if (!node) return;
    node.style.transform = "";
    node.style.removeProperty("--glare-x");
    node.style.removeProperty("--glare-y");
    // Keep followers tracking while the card eases back to rest.
    follow(600);
  }, [follow]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    // Touch and pen leave the card stuck at an angle, so they do not tilt.
    if (event.pointerType !== "mouse" || reducedMotion) return;

    const node = innerRef.current;
    if (!node) return;

    const { left, top, width, height } = node.getBoundingClientRect();
    const px = (event.clientX - left) / width;
    const py = (event.clientY - top) / height;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    // Bigger cards tilt less; see the note above.
    const tilt = maxTilt * Math.min(1, Math.max(1 / 3, 320 / Math.max(width, height)));

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const rotateX = (py - 0.5) * -2 * tilt;
      const rotateY = (px - 0.5) * 2 * tilt;
      node.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${hoverScale}, ${hoverScale}, ${hoverScale})`;
      node.style.setProperty("--glare-x", `${(px * 100).toFixed(1)}%`);
      node.style.setProperty("--glare-y", `${(py * 100).toFixed(1)}%`);
      follow(600);
    });
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerEnter?.(event);
    if (event.pointerType === "mouse") setPointerInside(true);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(event);
    setPointerInside(false);
    reset();
  };

  return (
    <div
      ref={setRefs}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{ willChange: "transform", ...style }}
      className={cn(
        "relative overflow-hidden",
        "transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-drafting)]",
        chrome && "rounded-lg border border-rule bg-surface shadow-lift",
        chrome && "hover:border-rule-strong hover:shadow-card",
        // Keyboard users get the lift without needing a pointer.
        chrome && "focus-within:border-brand focus-within:shadow-card",
        className
      )}
      {...props}
    >
      {children}

      {glare && (
        <div
          aria-hidden
          className={cn("pointer-events-none absolute inset-0 transition-opacity duration-300 ease-[var(--ease-drafting)]", pointerInside && !reducedMotion ? "opacity-100" : "opacity-0")}
          style={{
            background: "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), color-mix(in oklch, var(--brand) 22%, transparent), transparent 55%)",
          }}
        />
      )}
    </div>
  );
});
