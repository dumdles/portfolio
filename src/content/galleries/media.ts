/**
 * /media: photoshoots and photography.
 *
 * Add work the same way as design.ts. A photoshoot suits the
 * "contact-sheet" layout: two or three `selects` shown large, then the rest
 * of the shoot as numbered frames. The page stays unpublished, and the hobby
 * tile unlinked, until at least one collection has an image.
 */

import type { Gallery } from "./types";

export const media: Gallery = {
  slug: "media",
  title: "Media",
  lead: "Photography, including photoshoots for the EEE Club at Singapore Polytechnic.",
  collections: [],
};
