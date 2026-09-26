"use client";

import Image from "next/image";
import React from "react";
import { BentoGrid, BentoItem, DraftingSheet, PixelGlyph, Reveal, SectionHeader, TechnicalLabel, TiltCard, stagger } from "@/components/primitives";
import { hobbies, type Hobby } from "@/content/hobbies";

/**
 * 06 — Off the clock.
 *
 * Each tile is a small specimen card: a hand-drawn pixel glyph, a name, and
 * a photograph that rasters in on hover. The glyph wakes at the same moment,
 * so the whole card responds as one object.
 *
 * The old version used six saturated background fills. They were fun, and
 * the only part of the page that did not belong to the rest of it.
 */

function HobbyTile({ hobby, index }: { hobby: Hobby; index: number }) {
  return (
    <BentoItem size={hobby.size} data-reveal style={stagger(index)} className="glyph-trigger group relative">
      <TiltCard maxTilt={6} className="flex h-full min-h-48 flex-col justify-between p-5 sm:p-6" glare={false}>
        {/* Photograph, rastered in on hover. Decorative: the title names it. */}
        <div aria-hidden className="photo-wipe pointer-events-none absolute inset-0">
          <Image src={hobby.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/55 to-surface/0" />
        </div>

        {/* Holds the glyph's space; the glyph itself is drawn outside the card. */}
        <div className="relative flex items-start justify-between">
          <span aria-hidden className="block h-[70px] w-[70px]" />
          <TechnicalLabel className="tabular-nums">06.{index + 1}</TechnicalLabel>
        </div>

        <div className="relative mt-10">
          <h3 className="font-display text-heading-sm font-semibold text-ink sm:text-heading">{hobby.title}</h3>
          {hobby.note && <p className="mt-1 text-body-sm text-ink-muted">{hobby.note}</p>}
        </div>
      </TiltCard>

      {/* Outside the tilting card so its pixels stay on the screen grid. A
          tilting card is flattened to a bitmap and warped in 3D, which
          smears pixel art into soft blobs. */}
      <PixelGlyph
        name={hobby.glyph}
        px={5}
        accent={hobby.accent}
        hover={hobby.motion}
        assemble="view"
        delay={160 + index * 60}
        step={12}
        className="pointer-events-none absolute left-5 top-5 z-10 text-ink sm:left-6 sm:top-6"
      />
    </BentoItem>
  );
}

export default function HobbiesSection() {
  return (
    <DraftingSheet id="hobbies" grid="none">
      <SectionHeader
        part="06"
        eyebrow="Off the clock"
        className="mb-10"
        title={<>I promise I&apos;m not a boring person…</>}
        lead="Night rides, an electric guitar, a camera, a sketchbook, and volunteering."
      />

      <Reveal>
        <BentoGrid columns={4}>
          {hobbies.map((hobby, i) => (
            <HobbyTile key={hobby.id} hobby={hobby} index={i} />
          ))}
        </BentoGrid>
      </Reveal>
    </DraftingSheet>
  );
}
