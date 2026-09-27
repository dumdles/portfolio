"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { TechnicalLabel } from "@/components/primitives";
import type { GalleryImage } from "@/content/galleries/types";

/**
 * One image at a time, as large as the viewport allows.
 *
 * Esc closes it, the arrow keys step through the collection, and focus goes
 * back to the frame that opened it. The page behind does not scroll while
 * it is open. Focus stays inside: Tab cycles through its three buttons.
 *
 * It renders into document.body. Inside a section it would share that
 * section's stacking context and sit under the navbar.
 */
export function Lightbox({ images, index, onClose, onStep }: { images: GalleryImage[]; index: number; onClose: () => void; onStep: (next: number) => void }) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const image = images[index];
  const count = images.length;
  const step = React.useCallback((by: number) => onStep((index + by + count) % count), [index, count, onStep]);

  React.useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      root.style.overflow = overflow;
      opener?.focus();
    };
  }, []);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight" && count > 1) step(1);
      else if (event.key === "ArrowLeft" && count > 1) step(-1);
      else if (event.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>("button");
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step, count]);

  const label = image.title ?? image.alt;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="lightbox fixed inset-0 z-[100] flex flex-col bg-paper/95 backdrop-blur-sm"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <TechnicalLabel className="tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </TechnicalLabel>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="rounded-md p-2 text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink">
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center gap-2 px-2 sm:gap-4 sm:px-4" onClick={(event) => event.target === event.currentTarget && onClose()}>
        {count > 1 && (
          <button type="button" onClick={() => step(-1)} aria-label="Previous" className="shrink-0 rounded-md p-2 text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink">
            <ChevronLeft className="size-6" />
          </button>
        )}
        <div className="relative h-full min-w-0 flex-1">
          <Image key={index} src={image.src} alt={image.alt} fill sizes="100vw" placeholder="blur" draggable={false} className="lightbox-image object-contain" />
        </div>
        {count > 1 && (
          <button type="button" onClick={() => step(1)} aria-label="Next" className="shrink-0 rounded-md p-2 text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink">
            <ChevronRight className="size-6" />
          </button>
        )}
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-1 px-4 pb-6 pt-3 text-center">
        {(image.title || image.date) && (
          <p className="text-body-sm text-ink">
            {image.title}
            {image.title && image.date && <span className="text-ink-faint"> · </span>}
            {image.date && <span className="font-mono text-caption tabular-nums text-ink-muted">{image.date}</span>}
          </p>
        )}
        {image.caption && <p className="text-caption text-pretty text-ink-muted">{image.caption}</p>}
      </div>
    </div>,
    document.body
  );
}

/** Open state for a lightbox over one list of images. */
export function useLightbox(images: GalleryImage[]) {
  const [index, setIndex] = React.useState<number | null>(null);
  const close = React.useCallback(() => setIndex(null), []);
  const element = index === null ? null : <Lightbox images={images} index={index} onClose={close} onStep={setIndex} />;
  return { open: setIndex, element };
}
