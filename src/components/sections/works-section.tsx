"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BentoGrid, BentoItem, DisciplineMarker, DraftingSheet, SectionHeader, TechnicalLabel, TiltCard } from "@/components/primitives";
import { disciplineLabels, projects, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * 01 — Selected works.
 *
 * A bento index where tile size encodes importance, replacing the sticky
 * scroll stack. The stack gave every project identical weight, forced one
 * project per viewport and became unscannable past four or five entries.
 *
 * Each tile is a TiltCard, so the hover effect survives, applied to a grid
 * where it reads as deliberate rather than as a scroll gimmick.
 */

function ProjectTile({ project }: { project: Project }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {project.disciplines.map((discipline) => (
            <DisciplineMarker key={discipline} discipline={discipline} label={disciplineLabels[discipline]} />
          ))}
        </div>
        <TechnicalLabel className="shrink-0 tabular-nums">{project.year}</TechnicalLabel>
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-8">
        <h3 className={cn("font-display font-semibold text-ink", project.size === "lg" ? "text-heading-lg" : "text-heading")}>{project.title}</h3>
        <p className="max-w-prose text-body-sm text-pretty text-ink-muted">{project.summary}</p>

        {project.stack && (
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {project.stack.map((item) => (
              <li key={item} className="font-mono text-label uppercase text-ink-faint">
                {item}
              </li>
            ))}
          </ul>
        )}

        {project.links && (
          <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            {project.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-1 font-mono text-label uppercase text-brand underline-offset-4 hover:underline"
                >
                  {link.label}
                  <ArrowUpRight className="size-3" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

  // An unfilled slot is drawn rather than built: dashed outline, no
  // elevation, no tilt. It should read as a space reserved on the sheet.
  if (project.placeholder) {
    return (
      <BentoItem size={project.size}>
        <div className="flex h-full flex-col rounded-lg border border-dashed border-rule-strong bg-transparent p-5 sm:p-6">{body}</div>
      </BentoItem>
    );
  }

  return (
    <BentoItem size={project.size}>
      <TiltCard className="flex h-full flex-col p-5 sm:p-6">{body}</TiltCard>
    </BentoItem>
  );
}

export function WorksSection() {
  const filled = projects.filter((project) => !project.placeholder).length;

  return (
    <DraftingSheet id="works" grid="none">
      <SectionHeader
        part="01"
        eyebrow="Selected works"
        className="mb-10"
        title="Things I have designed, built and broken"
        lead="Tile size is a judgement about what is worth your time, not a layout accident. Markers show which of the three disciplines each piece belongs to."
      />

      <BentoGrid columns={4}>
        {projects.map((project) => (
          <ProjectTile key={project.id} project={project} />
        ))}
      </BentoGrid>

      <p className="mt-6 font-mono text-label uppercase text-ink-faint">
        {filled} of {projects.length} slots filled
      </p>
    </DraftingSheet>
  );
}

export default WorksSection;
