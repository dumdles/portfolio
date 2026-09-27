import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GalleryPage } from "@/components/gallery/gallery-page";
import { design } from "@/content/galleries";
import { hasWork } from "@/content/galleries/types";

export const metadata: Metadata = {
  title: design.title,
  description: design.lead,
};

// Unpublished until src/content/galleries/design.ts has work in it.
export default function DesignPage() {
  if (!hasWork(design)) notFound();
  return <GalleryPage gallery={design} />;
}
