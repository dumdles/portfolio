/**
 * 06 — Off the clock.
 *
 * Each hobby has a hand-drawn pixel glyph (see src/lib/pixel/glyphs.ts) and a
 * photograph revealed on hover. The accents here are the only place on the
 * site with more than one colour at once, and they are confined to a few
 * pixels per glyph: a nod to the old rainbow tiles, at a size that does not
 * fight the rest of the sheet.
 */

import type { BentoSize } from "@/components/primitives";
import type { GlyphName } from "@/lib/pixel/glyphs";

export interface Hobby {
  id: string;
  title: string;
  /** One short line. Optional; the photo does most of the talking. */
  note?: string;
  glyph: GlyphName;
  /** How the glyph moves on hover: swap to its second frame, or loop both. */
  motion: "swap" | "loop";
  accent: string;
  image: string;
  size: BentoSize;
}

export const hobbies: Hobby[] = [
  { id: "design", title: "Design", glyph: "nib", motion: "loop", accent: "var(--design)", image: "/images/design-hobby.jpg", size: "sm" },
  { id: "media", title: "Media", glyph: "camera", motion: "swap", accent: "var(--break)", image: "/images/media-hobby.jpg", size: "sm" },
  { id: "cycling", title: "Cycling", glyph: "bike", motion: "loop", accent: "var(--positive)", image: "/images/cycling-hobby.jpg", size: "sm" },
  { id: "guitar", title: "Guitar", glyph: "guitar", motion: "loop", accent: "var(--build)", image: "/images/guitar-hobby.jpg", size: "sm" },
  {
    id: "connections",
    title: "Making new connections",
    glyph: "network",
    motion: "loop",
    accent: "var(--brand)",
    image: "/images/connections-hobby.jpg",
    size: "md",
  },
  {
    id: "community",
    title: "Serving the community",
    glyph: "heart",
    motion: "loop",
    accent: "var(--critical)",
    image: "/images/community-hobby.jpg",
    size: "md",
  },
];
