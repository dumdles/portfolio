import Link from "next/link";
import { DecodeText, TechnicalLabel } from "@/components/primitives";
import { SiteFooter } from "@/components/sections/site-footer";
import Navbar from "@/components/Navbar";
import type { Gallery } from "@/content/galleries/types";
import { CollectionView } from "./collections";

/**
 * A gallery page, /design or /media: a short opening sheet, then each
 * collection lettered A, B, C in the order the content file lists them.
 */

const ms = (value: number) => ({ "--delay": `${value}ms` }) as React.CSSProperties;

export function GalleryPage({ gallery }: { gallery: Gallery }) {
  const collections = gallery.collections;

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Navbar />
      <main>
        <header className="relative isolate overflow-x-clip">
          <div
            aria-hidden
            className="intro-fade drafting-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)]"
          />
          <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-44 sm:px-6 md:pt-40 lg:px-8">
            <div className="flex items-center gap-3">
              <Link href="/#hobbies" className="intro-fade font-mono text-label uppercase text-ink-muted underline-offset-4 transition-colors hover:text-brand hover:underline" style={ms(0)}>
                ← Off the clock
              </Link>
              <span aria-hidden className="intro-draw-x h-px flex-1 bg-rule" style={ms(120)} />
              <TechnicalLabel tone="brand">
                <DecodeText text="Gallery" start delay={80} />
              </TechnicalLabel>
            </div>

            <div className="mt-12 flex max-w-3xl flex-col gap-5">
              <h1 className="font-display text-display-xl font-bold text-ink">
                <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em] leading-[0.95]">
                  <span className="intro-mask-rise block" style={ms(80)}>
                    {gallery.title}
                  </span>
                </span>
              </h1>
              <p className="intro-rise max-w-prose text-body-lg text-pretty text-ink-muted" style={ms(260)}>
                {gallery.lead}
              </p>
            </div>
          </div>
        </header>

        {collections.map((collection, i) => (
          <CollectionView key={collection.id} collection={collection} part={String.fromCharCode(65 + i)} />
        ))}

        <section className="border-t border-rule">
          <div className="mx-auto flex w-full max-w-6xl justify-end px-4 py-16 sm:px-6 lg:px-8">
            <Link href="/#hobbies" className="font-mono text-label uppercase text-brand underline-offset-4 hover:underline">
              ← Off the clock
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
