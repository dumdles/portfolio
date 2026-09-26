/**
 * The shape of a case study.
 *
 * A case study is an ordered list of sections, and each section is one of a
 * few kinds, each with its own component. Prose where prose is right,
 * drawings where a mechanism is easier seen than read. Adding a case study
 * means writing one data file; the route renders whatever is in it.
 *
 * Copy in these files is website copy: it follows
 * .claude/skills/unslop-portfolio-copy/SKILL.md, and every claim needs a
 * source.
 */

import type { Discipline } from "@/content/projects";

export interface DiagramNode {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  /** One or two sentences for the parts list. */
  description: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  /** Polyline through these points, first to last. Keep segments orthogonal. */
  points: [number, number][];
  /** Draw an arrowhead at both ends. */
  both?: boolean;
}

export interface DiagramZone {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SystemDiagram {
  width: number;
  height: number;
  zones: DiagramZone[];
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export interface FlowStep {
  title: string;
  body: string;
  /** Where the step happens: a client, a service, a stage. */
  where: string;
  /** Inside the framed stretch. Consecutive steps only; see `band` on the section. */
  banded?: boolean;
  /** A short label at the foot of the step, in the brand colour. */
  note?: string;
}

/** A stretch of an age axis during which a pool of money can be drawn on. */
export interface PoolSegment {
  from: number;
  to: number;
  /** `partial`: only part of the pool is open, drawn lighter. */
  kind?: "full" | "partial";
  label?: string;
}

export interface PoolLane {
  label: string;
  sub?: string;
  segments: PoolSegment[];
}

export interface PoolsDiagram {
  from: number;
  to: number;
  ticks: number[];
  /** A marked age, drawn as a line across every lane. */
  marker: { at: number; label: string };
  /** The span to hatch across every lane. */
  span: { from: number; to: number; label: string };
  lanes: PoolLane[];
  caption: string;
}

export interface AnatomySegment {
  text: string;
  label: string;
  note: string;
}

export interface Contribution {
  repo: string;
  what: string;
  mine: number;
  total: number;
}

export interface Milestone {
  /** Leave out when the order is known but the dates are not; the entry is numbered instead. */
  date?: string;
  text: string;
}

interface SectionBase {
  id: string;
  part: string;
  eyebrow: string;
  title: string;
  lead?: string;
}

export type CaseSection =
  | (SectionBase & { kind: "prose"; paragraphs: string[] })
  | (SectionBase & { kind: "system"; diagram: SystemDiagram; caption: string })
  | (SectionBase & { kind: "flow"; steps: FlowStep[]; band?: string })
  | (SectionBase & { kind: "pools"; diagram: PoolsDiagram; paragraphs: string[] })
  | (SectionBase & { kind: "anatomy"; example: AnatomySegment[]; notes: string[] })
  | (SectionBase & { kind: "list"; items: string[] })
  | (SectionBase & { kind: "contributions"; items: Contribution[]; paragraphs: string[]; footnote?: string })
  | (SectionBase & { kind: "milestones"; items: Milestone[] });

export interface CaseStudy {
  slug: string;
  /** Short name, set large. */
  title: string;
  /** Full name, set under it. */
  name?: string;
  lead: string;
  disciplines: Discipline[];
  titleBlock: { label: string; value: string }[];
  /** A screenshot for the laptop at the top of the page. Without one the screen shows the title. */
  screenshot?: { src: string; alt: string };
  /** Where the project can be seen, if it is public. */
  live?: { label: string; href: string };
  sections: CaseSection[];
  /** Printed at the foot of the page. For confidentiality and credit notes. */
  notice?: string;
}
