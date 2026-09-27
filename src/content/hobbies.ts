/**
 * 06 — Off the clock.
 *
 * Each hobby has a hand-drawn pixel glyph (see src/lib/pixel/glyphs.ts) and a
 * photograph revealed on hover. The accents here are the only place on the
 * site with more than one colour at once, and they are confined to a few
 * pixels per glyph: a nod to the old rainbow tiles, at a size that does not
 * fight the rest of the sheet.
 */

import type { StaticImageData } from "next/image";
import type { BentoSize } from "@/components/primitives";
import type { GlyphName } from "@/lib/pixel/glyphs";
import { galleryHref } from "@/content/galleries";

// Photos live in public/images. Imported rather than referenced by path so
// Next.js knows their size and inlines a tiny blurred copy of each, shown
// the instant a card is hovered while the full photo loads. To change one,
// replace the file (metadata stripped) or point the import at a new one.
import communityPhoto from "../../public/images/community-hobby.jpg";
import connectionsPhoto from "../../public/images/connections-hobby.jpg";
import cyclingPhoto from "../../public/images/cycling-hobby.jpg";
import designPhoto from "../../public/images/design-hobby.jpg";
import guitarPhoto from "../../public/images/guitar-hobby.jpg";
import mediaPhoto from "../../public/images/media-hobby.jpg";

export interface Hobby {
  id: string;
  title: string;
  /** One short line. Optional; the photo does most of the talking. */
  note?: string;
  glyph: GlyphName;
  /** How the glyph moves on hover: swap to its second frame, or loop both. */
  motion: "swap" | "loop";
  accent: string;
  image: StaticImageData;
  size: BentoSize;
  /** A gallery page. Set only while that gallery has work to show. */
  href?: string;
}

export const hobbies: Hobby[] = [
  { id: "design", title: "Design", glyph: "nib", motion: "loop", accent: "var(--design)", image: designPhoto, size: "sm", href: galleryHref.design },
  { id: "media", title: "Media", glyph: "camera", motion: "swap", accent: "var(--break)", image: mediaPhoto, size: "sm", href: galleryHref.media },
  { id: "cycling", title: "Cycling", glyph: "bike", motion: "loop", accent: "var(--positive)", image: cyclingPhoto, size: "sm" },
  { id: "guitar", title: "Guitar", glyph: "guitar", motion: "loop", accent: "var(--build)", image: guitarPhoto, size: "sm" },
  {
    id: "connections",
    title: "Making new connections",
    glyph: "network",
    motion: "loop",
    accent: "var(--brand)",
    image: connectionsPhoto,
    size: "md",
  },
  {
    id: "community",
    title: "Serving the community",
    glyph: "heart",
    motion: "loop",
    accent: "var(--critical)",
    image: communityPhoto,
    size: "md",
  },
];
