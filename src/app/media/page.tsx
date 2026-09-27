import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryPage } from "@/components/gallery/gallery-page";
import { media } from "@/content/galleries";
import { hasWork } from "@/content/galleries/types";

export const metadata: Metadata = {
  title: media.title,
  description: media.lead,
};

// Unpublished until src/content/galleries/media.ts has work in it.
export default function MediaPage() {
  if (!hasWork(media)) notFound();
  return <GalleryPage gallery={media} />;
}
