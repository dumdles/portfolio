"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TechnicalLabel } from "@/components/primitives";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/content/galleries/types";
import { TagList } from "./tag-list";

/**
 * Posters on a ring that turns to bring one to the front, with what it was
 * for written underneath.
 *
 * Geometry: each poster is rotated to its place on the ring and pushed out
 * by the ring's radius; the ring itself is pulled back by the same radius
 * and turned the other way. For the poster at the front the two cancel, so
 * it has no net transform and is drawn at 1:1, sharp. Posters to the sides
 * are angled away and fade with distance.
 *
 * Five or more posters wrap around the ring. With fewer, they sit on an arc
 * of an eight-slot ring and the ends stop, so it never turns through empty
 * slots.
 *
 * Arrow buttons, the arrow keys (with the carousel focused), a swipe, or a
 * click on a side poster turn it. A click on the front poster opens it in
 * the lightbox.
 */
export function RingCarousel({ items, label, open }: { items: GalleryImage[]; label: string; open: (i: number) => void }) {
  const count = items.length;
  const wraps = count >= 5;
  const slots = wraps ? count : 8;

  // `turn` is unbounded so that stepping past the last poster keeps turning
  // the same way instead of spinning all the way back.
  const [turn, setTurn] = React.useState(0);
  const active = ((turn % count) + count) % count;

  const go = React.useCallback(
    (by: number) =>
      setTurn((t) => {
        if (wraps) return t + by;
        return Math.min(count - 1, Math.max(0, t + by));
      }),
    [wraps, count]
  );

  // The shortest way round to poster `i`.
  const goTo = (i: number) => {
    let delta = i - active;
    if (wraps) {
      if (delta > count / 2) delta -= count;
      if (delta < -count / 2) delta += count;
    }
    go(delta);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  const swipeFrom = React.useRef<number | null>(null);
  // A swipe that ends on a poster also fires a click on it, which would
  // turn the ring straight back. The click after a swipe is swallowed.
  const swiped = React.useRef(false);
  const onPointerDown = (event: React.PointerEvent) => {
    swipeFrom.current = event.clientX;
    swiped.current = false;
  };
  const onPointerUp = (event: React.PointerEvent) => {
    if (swipeFrom.current === null) return;
    const dx = event.clientX - swipeFrom.current;
    swipeFrom.current = null;
    if (Math.abs(dx) > 40) {
      swiped.current = true;
      go(dx < 0 ? 1 : -1);
    }
  };

  const distance = (i: number) => {
    const d = Math.abs(i - active);
    return wraps ? Math.min(d, count - d) : d;
  };

  const current = items[active];
  const atStart = !wraps && active === 0;
  const atEnd = !wraps && active === count - 1;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="ring-carousel rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
      style={{ "--slots": slots, "--turn": turn } as React.CSSProperties}
    >
      <div className="ring-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (swipeFrom.current = null)}>
        {/* The ring's footprint, drawn as a dashed ellipse under the posters. */}
        <span aria-hidden className="ring-track" />
        <div className="ring">
          {items.map((item, i) => {
            const d = distance(i);
            const front = d === 0;
            const shown = d <= 2;
            return (
              <button
                key={i}
                type="button"
                tabIndex={front ? 0 : -1}
                aria-hidden={!front}
                aria-label={front ? `Open ${item.title ?? item.alt}` : undefined}
                onClick={() => {
                  if (swiped.current) {
                    swiped.current = false;
                    return;
                  }
                  if (front) open(i);
                  else goTo(i);
                }}
                className={cn("ring-card", front && "is-front")}
                style={{ "--i": i, opacity: shown ? 1 - d * 0.28 : 0, visibility: shown ? "visible" : "hidden" } as React.CSSProperties}
              >
                {/* Eager: lazy loading judges a card by its untransformed box, so a
                    poster turned to the side could stay unloaded while in view. */}
                <Image src={item.src} alt={front ? item.alt : ""} fill loading="eager" sizes="(max-width: 640px) 62vw, 360px" placeholder="blur" draggable={false} className="object-cover" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-[auto_1fr_auto] items-start gap-4">
        <button type="button" onClick={() => go(-1)} disabled={atStart} aria-label="Previous poster" className="rounded-md border border-rule p-2 text-ink-muted transition-colors hover:border-brand hover:text-brand disabled:opacity-30 disabled:hover:border-rule disabled:hover:text-ink-muted">
          <ChevronLeft className="size-5" />
        </button>

        <div aria-live="polite" className="flex min-h-24 flex-col items-center gap-1.5 text-center">
          <TechnicalLabel className="tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </TechnicalLabel>
          {(current.title || current.date) && (
            <p className="text-body text-ink">
              {current.title && <span className="font-medium">{current.title}</span>}
              {current.title && current.date && <span className="text-ink-faint"> · </span>}
              {current.date && <span className="font-mono text-caption tabular-nums text-ink-muted">{current.date}</span>}
            </p>
          )}
          {current.description && <p className="max-w-prose text-body-sm text-pretty text-ink-muted">{current.description}</p>}
          <TagList tags={current.tags} className="mt-1 justify-center" />
        </div>

        <button type="button" onClick={() => go(1)} disabled={atEnd} aria-label="Next poster" className="rounded-md border border-rule p-2 text-ink-muted transition-colors hover:border-brand hover:text-brand disabled:opacity-30 disabled:hover:border-rule disabled:hover:text-ink-muted">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
