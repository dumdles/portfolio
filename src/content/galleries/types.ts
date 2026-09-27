/**
 * The shape of a gallery page: /design and /media.
 *
 * A gallery is a list of collections, and each collection picks the layout
 * that suits its work. Images are static imports from public/images/gallery,
 * so Next.js knows their size and can show a blurred placeholder while each
 * one loads.
 *
 * Copy here is website copy: it follows
 * .claude/skills/unslop-portfolio-copy/SKILL.md. Leave a field out rather
 * than fill it with a guess; empty fields render nothing.
 */

import type { StaticImageData } from "next/image";

export interface GalleryImage {
  src: StaticImageData;
  /** What is in the image, for someone who cannot see it. */
  alt: string;
  /** A short name: the event, the shoot, the piece. */
  title?: string;
  /** When, as it should print: "Mar 2024". */
  date?: string;
  /** One line, shown under the image in the lightbox. */
  caption?: string;
}

/** A label pinned to a point on a garment, as a percentage of the image. */
export interface Callout {
  x: number;
  y: number;
  label: string;
}

export interface GarmentView {
  image: StaticImageData;
  alt: string;
  callouts?: Callout[];
}

export interface Garment {
  id: string;
  name: string;
  /** Give at least one of front and back. */
  front?: GarmentView;
  back?: GarmentView;
  /** The finished piece, worn or laid out. */
  photo?: GalleryImage;
  /** Title block fields: garment type, colour, print method, quantity, year. */
  specs?: { label: string; value: string }[];
}

interface CollectionBase {
  id: string;
  title: string;
  /** Who it was for: "EEE Club, Singapore Polytechnic". */
  context?: string;
  /** Dylan's role, when it was not everything. */
  role?: string;
  period?: string;
  /** A sentence or two on the brief and what came of it. */
  summary?: string;
}

export type Collection =
  /** Instagram posts and posters, in 4:5 frames. */
  | (CollectionBase & { layout: "posters"; items: GalleryImage[] })
  /** A photoshoot: selects set large, then the rest as a contact sheet. */
  | (CollectionBase & { layout: "contact-sheet"; selects?: GalleryImage[]; items: GalleryImage[] })
  /** Shirts and jackets: front and back flats, with a spec title block. */
  | (CollectionBase & { layout: "apparel"; garments: Garment[] })
  /** Anything else, in a plain grid. */
  | (CollectionBase & { layout: "grid"; items: GalleryImage[] });

export interface Gallery {
  slug: "design" | "media";
  title: string;
  lead: string;
  collections: Collection[];
}

/** Every image in a collection, in the order the lightbox steps through them. */
export function collectionImages(collection: Collection): GalleryImage[] {
  switch (collection.layout) {
    case "contact-sheet":
      return [...(collection.selects ?? []), ...collection.items];
    case "apparel":
      return collection.garments.flatMap((g) => [
        ...(g.front ? [{ src: g.front.image, alt: g.front.alt, title: g.name, caption: "Front" }] : []),
        ...(g.back ? [{ src: g.back.image, alt: g.back.alt, title: g.name, caption: "Back" }] : []),
        ...(g.photo ? [g.photo] : []),
      ]);
    default:
      return collection.items;
  }
}

/** A gallery with nothing in it is not published: its page 404s and nothing links to it. */
export function hasWork(gallery: Gallery) {
  return gallery.collections.some((c) => collectionImages(c).length > 0);
}
