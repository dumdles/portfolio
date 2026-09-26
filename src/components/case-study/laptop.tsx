"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { PixelText } from "@/components/primitives";

/**
 * A 14-inch laptop drawn in CSS, for showing a project's screen.
 *
 * The lid is a real 3D plane hinged on its bottom edge. On first view it
 * swings up from closed and the screen wakes once it is upright. At rest the
 * lid has no transform at all, so a screenshot on it is drawn at 1:1 and
 * stays sharp. A lid left at any angle would be resampled every frame, the
 * same blur that pixel glyphs suffer inside a TiltCard.
 *
 * Without a screenshot the screen shows the project's name in the pixel
 * face, like a splash screen, so the frame never looks unfinished.
 *
 * Proportions follow a 14-inch display (3024 x 1964, about 1.54 : 1) with
 * a thin bezel, a camera notch and a wider base with a thumb scoop.
 */

export interface LaptopProps {
  /** Screenshot of the page, ideally 3024 x 1964 or the same ratio. */
  src?: string;
  alt?: string;
  /** Shown on the screen when there is no screenshot. */
  name: string;
  priority?: boolean;
  className?: string;
}

export function Laptop({ src, alt = "", name, priority = false, className }: LaptopProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "0px 0px -10% 0px" });

  return (
    <div ref={ref} data-inview={inView ? "" : undefined} className={cn("laptop select-none", className)}>
      <div className="laptop-stage">
        <div className="laptop-lid">
          <div className="laptop-screen">
            {src ? (
              <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1152px) 960px, 90vw" className="object-cover object-top" />
            ) : (
              <div aria-hidden className="laptop-splash">
                <PixelText text={name} fluid className="w-[34%] text-[var(--device-splash)]" />
              </div>
            )}
            <span aria-hidden className="laptop-notch" />
          </div>
        </div>
      </div>
      <div aria-hidden className="laptop-base">
        <span className="laptop-scoop" />
      </div>
    </div>
  );
}
