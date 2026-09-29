"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { DraftingSheet, Reveal, SectionHeader, TechnicalLabel, TitleBlock, stagger } from "@/components/primitives";
import { cn } from "@/lib/utils";
import { collectionImages, type Collection, type GalleryImage, type Garment, type GarmentView } from "@/content/galleries/types";
import type { TagId } from "@/content/tags";
import { useLightbox } from "./lightbox";
import { RingCarousel } from "./ring-carousel";
import { TagList } from "./tag-list";

/**
 * One collection of work, drawn in the layout its content asks for. Every
 * image opens in the lightbox, which steps through the whole collection in
 * the order it is laid out.
 */

/** A clickable frame around one image. `ratio` crops to a fixed shape; without it the image keeps its own. */
function Frame({ image, ratio, sizes, onOpen, className, style }: { image: GalleryImage; ratio?: string; sizes: string; onOpen: () => void; className?: string; style?: React.CSSProperties }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${image.title ?? image.alt}`}
      style={style}
      className={cn("group/frame relative block w-full overflow-hidden rounded-md border border-rule bg-surface-sunken text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand", className)}
    >
      {ratio ? (
        <span className="relative block" style={{ aspectRatio: ratio }}>
          <Image src={image.src} alt={image.alt} fill sizes={sizes} placeholder="blur" draggable={false} className="object-cover transition-transform duration-500 ease-[var(--ease-drafting)] group-hover/frame:scale-[1.03]" />
        </span>
      ) : (
        <Image src={image.src} alt={image.alt} sizes={sizes} placeholder="blur" draggable={false} className="block h-auto w-full transition-transform duration-500 ease-[var(--ease-drafting)] group-hover/frame:scale-[1.03]" />
      )}
    </button>
  );
}

function Caption({ image }: { image: GalleryImage }) {
  if (!image.title && !image.date) return null;
  return (
    <div className="mt-2 flex items-baseline justify-between gap-3">
      {image.title && <span className="truncate text-body-sm text-ink">{image.title}</span>}
      {image.date && <span className="shrink-0 font-mono text-label uppercase tabular-nums text-ink-faint">{image.date}</span>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Posters({ items, open }: { items: GalleryImage[]; open: (i: number) => void }) {
  return (
    <Reveal className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, i) => (
        <div key={i} data-reveal style={stagger(Math.min(i, 8))}>
          <Frame image={item} ratio="4 / 5" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px" onOpen={() => open(i)} />
          <Caption image={item} />
        </div>
      ))}
    </Reveal>
  );
}

/** Selects large, then the whole roll as a contact sheet: frames on black film, numbered. */
function ContactSheet({ selects = [], items, open }: { selects?: GalleryImage[]; items: GalleryImage[]; open: (i: number) => void }) {
  return (
    <div className="flex flex-col gap-10">
      {selects.length > 0 && (
        <Reveal className={cn("grid gap-4", selects.length > 1 && "sm:grid-cols-2", selects.length > 2 && "lg:grid-cols-3")}>
          {selects.map((item, i) => (
            <div key={i} data-reveal style={stagger(i)}>
              <Frame image={item} ratio="3 / 2" sizes="(max-width: 640px) 100vw, 50vw" onOpen={() => open(i)} />
              <Caption image={item} />
            </div>
          ))}
        </Reveal>
      )}

      {items.length > 0 && (
        <Reveal className="contact-sheet rounded-md px-3 py-6 sm:px-5">
          <div className="grid grid-cols-3 gap-x-2 gap-y-5 sm:grid-cols-4 lg:grid-cols-6">
            {items.map((item, i) => (
              <div key={i} data-reveal="fade" style={stagger(Math.min(i, 12))}>
                <span aria-hidden className="mb-1 block font-mono text-label tabular-nums text-[var(--device-splash)]">
                  {String(i + 1).padStart(2, "0")}
                  <span className="opacity-60">A</span>
                </span>
                <Frame image={item} ratio="3 / 2" sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 180px" onOpen={() => open(selects.length + i)} className="rounded-sm border-transparent" />
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}

function View({ label, view, onOpen }: { label: string; view: GarmentView; onOpen: () => void }) {
  return (
    <figure className="flex flex-col gap-2">
      <TechnicalLabel>{label}</TechnicalLabel>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${label.toLowerCase()} view`}
        style={view.backdrop ? { background: view.backdrop } : undefined}
        className={cn("relative aspect-square overflow-hidden rounded-md border border-rule focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand", !view.backdrop && "drafting-grid-fine bg-surface")}
      >
        <Image src={view.image} alt={view.alt} fill sizes="(max-width: 1024px) 45vw, 360px" placeholder="blur" draggable={false} className="object-contain p-4" />
        {view.callouts?.map((c) => (
          <span key={c.label} aria-hidden className="absolute flex items-center gap-1.5" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
            <span className="size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-4 ring-brand/20" />
            <span className="-translate-y-1/2 whitespace-nowrap rounded-sm bg-surface/90 px-1.5 py-0.5 font-mono text-label uppercase text-brand">{c.label}</span>
          </span>
        ))}
      </button>
      {/* Callouts are drawn over the image; this list is what a screen reader gets. */}
      {view.callouts && view.callouts.length > 0 && <figcaption className="sr-only">{view.callouts.map((c) => c.label).join(", ")}</figcaption>}
    </figure>
  );
}

function Apparel({ garments, tags, open }: { garments: Garment[]; tags?: TagId[]; open: (i: number) => void }) {
  // Lightbox order matches collectionImages(): front, back, photo, per garment.
  let cursor = 0;
  return (
    <div className="flex flex-col gap-14">
      {garments.map((g) => {
        const front = g.front ? cursor++ : -1;
        const back = g.back ? cursor++ : -1;
        const print = g.print ? cursor++ : -1;
        const views = [g.front, g.back, g.print].filter(Boolean).length;
        const photo = g.photo ? cursor++ : -1;
        return (
          <Reveal key={g.id} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div data-reveal className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <h3 className="font-display text-heading font-semibold text-ink">{g.name}</h3>
                <TagList tags={[...new Set([...(tags ?? []), ...(g.tags ?? [])])]} />
              </div>
              <div className={cn("grid gap-3 sm:gap-4", views > 1 ? "grid-cols-2" : "max-w-lg")}>
                {g.front && <View label="Front" view={g.front} onOpen={() => open(front)} />}
                {g.back && <View label="Back" view={g.back} onOpen={() => open(back)} />}
                {g.print && <View label="Print artwork" view={g.print} onOpen={() => open(print)} />}
              </div>
            </div>
            <div data-reveal style={stagger(1)} className="flex flex-col gap-4 lg:pt-11">
              {g.specs && g.specs.length > 0 && <TitleBlock fields={g.specs} dense />}
              {g.photo && (
                <div>
                  <Frame image={g.photo} ratio="4 / 5" sizes="(max-width: 1024px) 100vw, 360px" onOpen={() => open(photo)} />
                  <Caption image={g.photo} />
                </div>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function Grid({ items, open }: { items: GalleryImage[]; open: (i: number) => void }) {
  return (
    <Reveal className="columns-2 gap-4 sm:columns-3">
      {items.map((item, i) => (
        <div key={i} data-reveal style={stagger(Math.min(i, 8))} className="mb-6 break-inside-avoid">
          <Frame image={item} sizes="(max-width: 640px) 50vw, 33vw" onOpen={() => open(i)} />
          <Caption image={item} />
        </div>
      ))}
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */

export function CollectionView({ collection, part, source }: { collection: Collection; part: string; source?: { href: string; label: string } }) {
  const images = React.useMemo(() => collectionImages(collection), [collection]);
  const lightbox = useLightbox(images);
  if (images.length === 0) return null;

  const meta = [collection.role, collection.period].filter(Boolean).join(" · ");

  return (
    <DraftingSheet id={collection.id} grid="none" className="border-t border-rule">
      <SectionHeader part={part} eyebrow={collection.context ?? collection.title} title={collection.title} lead={collection.summary} className="mb-4" />
      {(meta || source) && (
        <p className="mb-10 flex flex-wrap gap-x-4 gap-y-1 font-mono text-label uppercase text-ink-muted">
          {meta && <span>{meta}</span>}
          {source && (
            <Link href={source.href} className="text-brand underline-offset-4 hover:underline">
              {source.label} ↗
            </Link>
          )}
        </p>
      )}
      {!meta && !source && <div className="mb-6" />}

      {collection.layout === "carousel" && <RingCarousel items={images} label={collection.title} open={lightbox.open} />}
      {collection.layout === "posters" && <Posters items={collection.items} open={lightbox.open} />}
      {collection.layout === "contact-sheet" && <ContactSheet selects={collection.selects} items={collection.items} open={lightbox.open} />}
      {collection.layout === "apparel" && <Apparel garments={collection.garments} tags={collection.tags} open={lightbox.open} />}
      {collection.layout === "grid" && <Grid items={collection.items} open={lightbox.open} />}

      {lightbox.element}
    </DraftingSheet>
  );
}
