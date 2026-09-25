/**
 * Every case study, by slug. Add a new one by writing its data file and
 * listing it here; /projects/[slug] picks it up at build time.
 */

import { rmap } from "./rmap";
import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [rmap];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
