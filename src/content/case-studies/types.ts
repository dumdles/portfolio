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
  /** Which client the step happens in. */
  where: string;
  /** Happens with no connection. */
  offline?: boolean;
  /** Needs a connection. */
  online?: boolean;
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
  date: string;
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
  | (SectionBase & { kind: "system"; diagram: SystemDiagram })
  | (SectionBase & { kind: "flow"; steps: FlowStep[] })
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
  sections: CaseSection[];
  /** Printed at the foot of the page. For confidentiality and credit notes. */
  notice?: string;
}
