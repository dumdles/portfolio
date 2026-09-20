"use client";

import Image from "next/image";
import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  /** Position in the stack, used for the staggered sticky offset. */
  index: number;
}

/**
 * Placeholder project card.
 *
 * Phase 2 of docs/PLAN.md replaces this stack with a bento index plus case
 * study routes. Until then this keeps the existing sticky behaviour, with the
 * raw <img> swapped for next/image so the build stops warning and the images
 * go through the optimiser.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, index }) => {
  const topOffset = 20 * index;

  return (
    <div
      className="overflow-hidden rounded-lg border border-rule bg-surface text-ink shadow-pane"
      style={{
        position: "sticky",
        top: `${100 + topOffset}px`,
        zIndex: 100 - index,
      }}
    >
      <div className="md:flex">
        <div className="relative h-48 w-full shrink-0 md:h-auto md:w-56">
          <Image src={imageUrl} alt="" aria-hidden fill sizes="(max-width: 768px) 100vw, 14rem" className="object-cover" />
        </div>
        <div className="p-8">
          <h3 className="mb-2 font-display text-heading font-bold">{title}</h3>
          <p className="text-ink-muted">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
