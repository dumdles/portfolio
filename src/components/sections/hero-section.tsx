"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Annotation, DimensionLine, TechnicalLabel, TitleBlock } from "@/components/primitives";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { profile } from "@/content/profile";

/**
 * 00 — Index.
 *
 * The opening of the drawing. Name, positioning line, title block, and the
 * portrait treated as the drawn subject: dimensioned down one edge, with a
 * leader line pointing into it.
 *
 * The old hero said "Creative Developer" over a grey page, which named one of
 * the three disciplines and committed to none of them.
 */
export function HeroSection() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let frame: number | null = null;

    const update = () => {
      frame = null;
      const node = imageRef.current;
      if (!node) return;
      const progress = Math.min(window.scrollY / 500, 1);
      node.style.transform = `scale(${(1 + progress * 0.08).toFixed(3)}) translateY(${(-progress * 24).toFixed(1)}px)`;
    };

    // One write per frame, rather than one per scroll event.
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <section id="home" className="relative isolate">
      <div aria-hidden className="drafting-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-32 sm:px-6 sm:pb-28 md:pt-40 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Lettering */}
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-3">
              <TechnicalLabel tone="brand">00</TechnicalLabel>
              <TechnicalLabel>Index</TechnicalLabel>
              <span aria-hidden className="h-px w-16 bg-rule" />
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="font-display text-display-xl font-bold leading-[0.95] text-balance text-ink">{profile.name}</h1>
              <p className="max-w-xl text-display-sm font-display font-medium text-balance text-ink-muted">{profile.positioning}</p>
            </div>

            <p className="max-w-prose text-body-lg text-pretty text-ink-muted">{profile.intro}</p>

            <TitleBlock fields={[...profile.titleBlock]} className="mt-2 max-w-xl" />
          </div>

          {/* The subject, dimensioned */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-rule bg-surface-muted shadow-pane">
              <div ref={imageRef} className="absolute inset-0 will-change-transform" style={{ transition: "transform 0.25s var(--ease-snap)" }}>
                <Image src="/images/dylan-hero.jpg" alt={`Portrait of ${profile.name}`} fill sizes="(max-width: 1024px) 100vw, 40vw" priority className="object-cover" />
              </div>
            </div>

            {/* Drawing furniture. Decorative, hidden from assistive tech by the
                primitives themselves, and suppressed on small screens where
                there is no room for it. */}
            <DimensionLine orientation="vertical" value="Fig. 01" className="absolute -left-7 top-0 hidden h-full xl:flex" />

            <Annotation side="left" lineLength="md" className="absolute -right-4 top-10 hidden translate-x-full xl:flex">
              Subject
            </Annotation>

            <div className="absolute -bottom-3 left-4 hidden items-center gap-2 rounded-sm border border-rule bg-paper px-2 py-1 sm:flex">
              <TechnicalLabel>Rev.</TechnicalLabel>
              <span className="font-mono text-label uppercase text-brand">2026.1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
