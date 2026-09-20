/**
 * The works index.
 *
 * ────────────────────────────────────────────────────────────────────────
 *  TO FILL IN: only the first entry is real. The rest are empty slots.
 *
 *  They are deliberately labelled as placeholders rather than filled with
 *  invented projects, because a portfolio that describes work that does not
 *  exist is worse than one with three entries. Replace them, or delete the
 *  ones you do not need; the grid reflows on its own.
 *
 *  Phase 3 of docs/PLAN.md turns the substantial ones into case studies on
 *  their own routes.
 * ────────────────────────────────────────────────────────────────────────
 */

import type { BentoSize } from "@/components/primitives";

/** The three strands of work. Drives the marker colour on each tile. */
export type Discipline = "design" | "build" | "break";

export const disciplineLabels: Record<Discipline, string> = {
  design: "Design",
  build: "Build",
  break: "Break",
};

export interface Project {
  id: string;
  title: string;
  /** One sentence. What it is, not how you feel about it. */
  summary: string;
  disciplines: Discipline[];
  year: string;
  /** Footprint in the bento grid. Large tiles are for work worth discussing. */
  size: BentoSize;
  /** Tooling worth naming. Keep to four at most. */
  stack?: string[];
  links?: { label: string; href: string }[];
  /** An unfilled slot. Renders as a dashed outline instead of a card. */
  placeholder?: boolean;
}

export const projects: Project[] = [
  {
    id: "portfolio",
    title: "This site",
    summary:
      "A portfolio built as an annotated technical drawing, with a documented design system behind it rather than a pile of one-off styles.",
    disciplines: ["design", "build"],
    year: "2026",
    size: "lg",
    stack: ["Next.js", "TypeScript", "Tailwind v4"],
    links: [
      { label: "Source", href: "https://github.com/dumdles/portfolio" },
      { label: "Styleguide", href: "/styleguide" },
    ],
  },
  {
    id: "slot-2",
    title: "Open slot",
    summary: "A build project. Something you shipped, and what it had to get right.",
    disciplines: ["build"],
    year: "—",
    size: "sm",
    placeholder: true,
  },
  {
    id: "slot-3",
    title: "Open slot",
    summary: "A security project. A CTF writeup, a disclosure, or a tool you wrote.",
    disciplines: ["break"],
    year: "—",
    size: "tall",
    placeholder: true,
  },
  {
    id: "slot-4",
    title: "Open slot",
    summary: "A design project. An interface, an identity, or a publication.",
    disciplines: ["design"],
    year: "—",
    size: "sm",
    placeholder: true,
  },
  {
    id: "slot-5",
    title: "Open slot",
    summary: "Anything that does not fit the three above.",
    disciplines: ["build", "break"],
    year: "—",
    size: "wide",
    placeholder: true,
  },
];
