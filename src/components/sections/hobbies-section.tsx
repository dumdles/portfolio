"use client";

import Image from "next/image";
import React from "react";
import { BentoGrid, BentoItem, TiltCard, SectionHeader } from "@/components/primitives";
import { cn } from "@/lib/utils";
import type { BentoSize } from "@/components/primitives";

interface HobbyCardProps {
  title: string;
  details?: string;
  imageUrl: string;
  /** Tailwind classes for this tile's colour treatment. */
  tone: string;
  size?: BentoSize;
}

const HobbyCard: React.FC<HobbyCardProps> = ({ title, details, imageUrl, tone, size = "sm" }) => {
  return (
    <BentoItem size={size}>
      <TiltCard chrome={false} maxTilt={7} hoverScale={1.03} className={cn("group h-full rounded-lg border-2 p-4 shadow-card sm:p-6", tone)}>
        {/* Revealed on hover. Hidden from assistive tech: it is atmosphere,
            and the title already names the hobby. */}
        {/* Revealed on hover, and shown permanently on touch devices, where
            hover never fires and the tiles would otherwise be flat colour. */}
        <Image
          src={imageUrl}
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-80 [@media(hover:none)]:opacity-70"
        />

        <div className="relative z-10 flex h-full flex-col justify-end">
          <h3 className="font-display text-heading-sm font-bold sm:text-heading">{title}</h3>
          {details && <p className="text-body-sm font-medium opacity-90">{details}</p>}
        </div>
      </TiltCard>
    </BentoItem>
  );
};

export default function HobbiesSection() {
  return (
    <section id="hobbies" className="flex min-h-screen flex-col items-center justify-center bg-paper p-4 text-ink">
      <div className="w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeader
          part="06"
          eyebrow="Off the clock"
          align="center"
          className="mb-12"
          title={<>I promise I&apos;m not a boring person...</>}
          lead="Here are some of my hobbies and interests."
        />

        <BentoGrid columns={3}>
          <HobbyCard title="Design" imageUrl="/images/design-hobby.jpg" tone="bg-green-300 border-green-500 text-green-950 dark:bg-green-700 dark:border-green-500 dark:text-green-50" />
          <HobbyCard title="Media" imageUrl="/images/media-hobby.jpg" tone="bg-blue-300 border-blue-500 text-blue-950 dark:bg-blue-700 dark:border-blue-500 dark:text-blue-50" />
          <HobbyCard title="Cycling" imageUrl="/images/cycling-hobby.jpg" tone="bg-red-300 border-red-500 text-red-950 dark:bg-red-700 dark:border-red-500 dark:text-red-50" />
          <HobbyCard title="Guitar" imageUrl="/images/guitar-hobby.jpg" tone="bg-yellow-300 border-yellow-500 text-yellow-950 dark:bg-yellow-700 dark:border-yellow-500 dark:text-yellow-50" />
          <HobbyCard
            title="Making new connections"
            imageUrl="/images/connections-hobby.jpg"
            size="md"
            tone="bg-purple-300 border-purple-500 text-purple-950 dark:bg-purple-700 dark:border-purple-500 dark:text-purple-50"
          />
          <HobbyCard
            title="Serving the community"
            imageUrl="/images/community-hobby.jpg"
            size="md"
            tone="bg-cyan-300 border-cyan-500 text-cyan-950 dark:bg-cyan-700 dark:border-cyan-500 dark:text-cyan-50"
          />
        </BentoGrid>
      </div>
    </section>
  );
}
