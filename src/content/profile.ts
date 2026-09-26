/**
 * Everything the hero and the title block render.
 *
 * Copy here follows .claude/skills/unslop-portfolio-copy/SKILL.md. Every
 * claim should trace to something checkable; see that file's "Rules for this
 * site".
 */

import type { GlyphName } from "@/lib/pixel/glyphs";
import type { Discipline } from "@/content/projects";

/**
 * The opening line, split so a verb can carry its discipline glyph. A plain
 * string is set as written; a `verb` gets a pixel glyph that assembles beside
 * it and reacts when hovered.
 */
export type PositioningPart = string | { verb: string; glyph: GlyphName; accent: string };

export const profile = {
  name: "Dylan Chong",
  handle: "dumdles",

  positioning: [
    "I ",
    { verb: "design", glyph: "design", accent: "var(--design)" },
    " interfaces and ",
    { verb: "write", glyph: "build", accent: "var(--build)" },
    " the code that runs them.",
  ] satisfies readonly PositioningPart[],

  /** Sources: RMAP commit history (Sep 2024 onward) and the owner's own account. */
  intro:
    "For the last two years that meant RMAP, the system AC Tesla uses for its thermal inspection reports. I took it from a basic prototype to a production system on AWS, and by the end I led a team of four. Now I'm a C4X Expert in the Digital and Intelligence Service.",

  /** The drawing's title block. Order matters; it reads left to right. */
  titleBlock: [
    { label: "Location", value: "Singapore" },
    { label: "Currently", value: "C4X Expert, Digital and Intelligence Service" },
    { label: "Previously", value: "AC Tesla Pte Ltd" },
  ],

  /** Rendered as a glyph legend in the title block. */
  disciplines: [
    { id: "design", label: "Design" },
    { id: "build", label: "Software" },
    { id: "break", label: "Security" },
  ] satisfies readonly { id: Discipline; label: string }[],

  /**
   * Public contact routes. There is deliberately no email address here yet:
   * which address to publish, if any, is the site owner's call.
   */
  links: {
    github: "https://github.com/dumdles",
    linkedin: "https://www.linkedin.com/in/dumdles",
  },
} as const;
