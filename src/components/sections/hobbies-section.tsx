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
    <BentoItem size={hobby.size} data-reveal style={stagger(index)}>
      <TiltCard maxTilt={6} className="glyph-trigger group flex h-full min-h-48 flex-col justify-between p-5 sm:p-6" glare={false}>
        {/* Photograph, rastered in on hover. Decorative: the title names it. */}
        <div aria-hidden className="photo-wipe pointer-events-none absolute inset-0">
          <Image src={hobby.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/55 to-surface/0" />
        </div>

        <div className="relative flex items-start justify-between">
          <PixelGlyph name={hobby.glyph} px={5} accent={hobby.accent} hover={hobby.motion} assemble="view" delay={160 + index * 60} step={12} className="text-ink" />
          <TechnicalLabel className="tabular-nums">06.{index + 1}</TechnicalLabel>
        </div>

        <div className="relative mt-10">
          <h3 className="font-display text-heading-sm font-semibold text-ink sm:text-heading">{hobby.title}</h3>
          {hobby.note && <p className="mt-1 text-body-sm text-ink-muted">{hobby.note}</p>}
        </div>
      </TiltCard>
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
        lead="Some of what I do when nobody is paying me to. Point at one."
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
