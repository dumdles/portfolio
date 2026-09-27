/**
 * /design: posters, apparel and other design work.
 *
 * To add work, put the images in public/images/gallery/ (metadata stripped),
 * import them here, and add a collection. For example:
 *
 *   import welcomeTea from "../../../public/images/gallery/eee-welcome-tea.jpg";
 *
 *   {
 *     id: "eee-club-posters",
 *     layout: "posters",
 *     title: "Event posters",
 *     context: "EEE Club, Singapore Polytechnic",
 *     role: "Publications secretary",
 *     period: "2023–2024",
 *     summary: "…",
 *     items: [{ src: welcomeTea, alt: "…", title: "Welcome tea", date: "Apr 2023" }],
 *   }
 *
 * Layouts: "posters" (4:5 frames), "apparel" (front and back flats with a
 * spec title block), "grid". The page stays unpublished, and the hobby tile
 * unlinked, until at least one collection has an image.
 */

import type { Gallery } from "./types";
import eeeShirtWhite from "../../../public/images/gallery/eee-shirt-white.jpg";

export const design: Gallery = {
  slug: "design",
  title: "Design",
  lead: "Posters and apparel, most of them from my year as publications secretary of the EEE Club at Singapore Polytechnic.",
  collections: [],
};
