/**
 * The works index.
 *
 * ────────────────────────────────────────────────────────────────────────
 *  TO FILL IN: the first three entries are real. The rest are empty slots.
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
  /** A case study page. Makes the whole tile a link. */
  href?: string;
}

export const projects: Project[] = [
  {
    id: "rmap",
    title: "RMAP",
    summary:
      "Inspection reporting for AC Tesla's thermal scanning work: a web portal, an offline iPad app and the API between them. I took it on alone and later led the team of four that moved it onto AWS.",
    disciplines: ["build", "design", "break"],
    year: "2024–2026",
    size: "lg",
    stack: ["Next.js", "PHP", "Flutter", "AWS"],
    href: "/projects/rmap",
  },
  {
    id: "portfolio",
    title: "This site",
    summary: "Next.js, with a documented design system, hand-drawn pixel glyphs and a 5×7 typeface.",
    disciplines: ["design", "build"],
    year: "2026",
    size: "sm",
    links: [
      { label: "Source", href: "https://github.com/dumdles/portfolio" },
      { label: "Styleguide", href: "/styleguide" },
    ],
  },
  { id: "slot-3", title: "Reserved", summary: "", disciplines: ["break"], year: "", size: "tall", placeholder: true },
  { id: "slot-4", title: "Reserved", summary: "", disciplines: ["design"], year: "", size: "sm", placeholder: true },
  {
    id: "finvue",
    title: "Finvue",
    summary:
      "Personal finance for Singapore. CPF, SGX dividends, T-bills and daily spending in one ledger, with a retirement planner built on it. Web and iOS, built alone.",
    disciplines: ["build", "design"],
    year: "2026",
    size: "wide",
    stack: ["Next.js", "Supabase", "Expo"],
    links: [{ label: "finvue.xyz", href: "https://finvue.xyz" }],
    href: "/projects/finvue",
  },
];
