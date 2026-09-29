/**
 * Every tag on the site. Work is tagged by the organisation it was for and
 * by what kind of thing it is. Each tag gets a page at /tags/<id> listing
 * everything that carries it, across the design and media galleries (and,
 * later, case studies and leadership).
 *
 * Add a tag here before using it; anything else is a type error. A tag with
 * no published work has no page, and nothing links to it.
 */

export const tags = {
  // Organisations
  eeec: { label: "EEEC", kind: "org", name: "Electrical and Electronic Engineering Club, Singapore Polytechnic" },

  // Types of work
  poster: { label: "Poster", kind: "type" },
  apparel: { label: "Apparel", kind: "type" },
  photography: { label: "Photography", kind: "type" },
  video: { label: "Video", kind: "type" },
} as const satisfies Record<string, { label: string; kind: "org" | "type"; name?: string }>;

export type TagId = keyof typeof tags;

export const tagIds = Object.keys(tags) as TagId[];

export function tagLabel(id: TagId) {
  return tags[id].label;
}
