/**
 * Every case study, by slug. Add a new one by writing its data file and
 * listing it here; /projects/[slug] picks it up at build time.
 */

import { finvue } from "./finvue";
import { rmap } from "./rmap";
import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [rmap, finvue];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
