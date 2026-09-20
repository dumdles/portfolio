"use client";

import React from "react";
import { TiltCard, SectionHeader } from "@/components/primitives";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  title: string;
  details?: string;
  tenure: string;
  /** Tailwind classes for this card's colour treatment. */
  tone: string;
  className?: string;
}

/**
 * A leadership role, on a card that tilts toward the cursor.
 *
 * The tilt logic used to be copy-pasted into this file and HobbiesSection.
 * Both now share <TiltCard>, which also fixes the touch and reduced-motion
 * behaviour the copies got wrong.
 */
const RoleCard: React.FC<RoleCardProps> = ({ title, details, tenure, tone, className }) => (
  <TiltCard chrome={false} className={cn("flex flex-col justify-between rounded-lg border-2 p-6 shadow-card sm:p-8", tone, className)}>
    <h3 className="font-display text-heading font-bold sm:text-heading-lg">{title}</h3>
    <div className="mt-6">
      {details && <p className="font-mono text-label uppercase opacity-90">{details}</p>}
      <p className="font-mono text-caption opacity-80">{tenure}</p>
    </div>
  </TiltCard>
);

export default function ExperienceSection() {
  return (
    <section id="experience" className="flex min-h-screen flex-col items-center justify-center bg-paper p-4 text-ink">
      <div className="w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader
          part="05"
          eyebrow="Leadership"
          className="mb-12"
          title={<>I wasn&apos;t born a natural leader...</>}
          lead="But by stepping out of my comfort zone, I slowly realised I enjoyed making meaningful connections."
        />

        <h3 className="mb-8 font-display text-heading-sm font-semibold text-ink sm:text-heading">
          Here are some roles I took on to <span className="underline decoration-brand decoration-2 underline-offset-4">Sharpen The Saw</span>.
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          <RoleCard
            title="Electrical and Electronic Engineering Club"
            details="Publications Secretary"
            tenure="2023 — 2024"
            tone="bg-red-400 border-red-600 text-white dark:bg-red-600 dark:border-red-400"
            className="min-h-[280px] sm:min-h-[320px]"
          />
          <RoleCard
            title="SP Infocomm Club"
            details="Programme Head"
            tenure="2024 — 2025"
            tone="bg-blue-400 border-blue-600 text-white dark:bg-blue-600 dark:border-blue-400"
            className="min-h-[280px] sm:min-h-[320px]"
          />
          <div className="space-y-6 sm:space-y-8">
            <RoleCard title="Class Vice-Chairperson" tenure="2021" tone="bg-amber-300 border-amber-500 text-amber-950 dark:bg-amber-600 dark:border-amber-400 dark:text-amber-50" />
            <RoleCard
              title="Robotics@APEX"
              details="Logistics Head"
              tenure="2020 — 2021"
              tone="bg-yellow-300 border-yellow-500 text-yellow-950 dark:bg-yellow-600 dark:border-yellow-400 dark:text-yellow-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
