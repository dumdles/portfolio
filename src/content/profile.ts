/**
 * Everything the hero and the title block render.
 *
 * Kept as data so the opening of the site can be reworded without touching
 * a component. The positioning line does more work than any visual on the
 * page, so it is the one string worth agonising over.
 */
export const profile = {
  name: "Dylan Chong",
  handle: "dumdles",

  /** The line under the name. Says all three disciplines as one sentence. */
  positioning: "I design the thing, build the thing, then try to break it.",

  /**
   * Expanded introduction. Two sentences at most; the timeline and the works
   * index carry the detail.
   */
  intro:
    "Graphic and interface design, software engineering, and security. Three habits that keep turning out to be the same habit: taking something apart until I understand how it actually works.",

  /** The drawing's title block. Order matters; it reads left to right. */
  titleBlock: [
    { label: "Location", value: "Singapore" },
    { label: "Status", value: "NSF, Singapore Armed Forces" },
    { label: "Disciplines", value: "Design · Software · Security" },
    { label: "Availability", value: "Open to conversations" },
  ],

  links: {
    email: "dylansfchong@gmail.com",
    github: "https://github.com/dumdles",
    linkedin: "https://www.linkedin.com/in/dumdles",
  },
} as const;
