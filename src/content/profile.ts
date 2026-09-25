/**
 * Everything the hero and the title block render.
 *
 * Kept as data so the opening of the site can be reworded without touching
 * a component. The positioning line does more work than any visual on the
 * page, so it is the one string worth agonising over.
 */

import type { GlyphName } from "@/lib/pixel/glyphs";

/**
 * The positioning line, split so each verb can carry its discipline glyph.
 * A plain string is set as written; a `verb` gets a pixel glyph that
 * assembles beside it and reacts when hovered.
 */
export type PositioningPart = string | { verb: string; glyph: GlyphName; accent: string };

export const profile = {
  name: "Dylan Chong",
  handle: "dumdles",

  /** Says all three disciplines as one sentence. */
  positioning: [
    "I ",
    { verb: "design", glyph: "design", accent: "var(--design)" },
    " the thing, ",
    { verb: "build", glyph: "build", accent: "var(--build)" },
    " the thing, then try to ",
    { verb: "break", glyph: "break", accent: "var(--break)" },
    " it.",
  ] satisfies readonly PositioningPart[],

  /**
   * Expanded introduction. Two sentences at most; the timeline and the works
   * index carry the detail.
   */
  intro:
    "Graphic and interface design, software engineering, and security. Three habits that keep turning out to be the same habit: taking something apart until I understand how it actually works.",

  /** The drawing's title block. Order matters; it reads left to right. */
  titleBlock: [
    { label: "Location", value: "Singapore" },
    { label: "Currently", value: "C4X Expert, Digital and Intelligence Service" },
    { label: "Disciplines", value: "Design · Software · Security" },
    { label: "Availability", value: "Open to conversations" },
  ],

  /**
   * Public contact routes. There is deliberately no email address here yet:
   * which address to publish, if any, is the site owner's call.
   */
  links: {
    github: "https://github.com/dumdles",
    linkedin: "https://www.linkedin.com/in/dumdles",
  },
} as const;
