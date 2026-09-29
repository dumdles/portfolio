import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DecodeText, TechnicalLabel } from "@/components/primitives";
import { CollectionView } from "@/components/gallery/collections";
import { TagList } from "@/components/gallery/tag-list";
import { SiteFooter } from "@/components/sections/site-footer";
import Navbar from "@/components/Navbar";
import { tagCount, tagsInUse, worksTagged } from "@/content/galleries";
import { tags, type TagId } from "@/content/tags";

/**
 * Everything carrying one tag, across the galleries, grouped by the
 * collection it belongs to, each group linking back to where it lives. Only
 * tags with published work have a page.
 */

type Params = Promise<{ tag: string }>;

export function generateStaticParams() {
  return tagsInUse.map((tag) => ({ tag }));
}

export const dynamicParams = false;

const isTag = (value: string): value is TagId => (tagsInUse as string[]).includes(value);

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { tag } = await params;
  if (!isTag(tag)) return {};
  const entry = tags[tag];
  return { title: entry.label, description: `Work tagged ${entry.label}${"name" in entry ? `, for the ${entry.name}` : ""}.` };
}

const ms = (value: number) => ({ "--delay": `${value}ms` }) as React.CSSProperties;

export default async function TagPage({ params }: { params: Params }) {
  const { tag } = await params;
  if (!isTag(tag)) notFound();

  const entry = tags[tag];
  const groups = worksTagged(tag);
  const count = tagCount(tag);

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
                <DecodeText text={entry.kind === "org" ? "Organisation" : "Type"} start delay={80} />
              </TechnicalLabel>
            </div>

            <div className="mt-12 flex max-w-3xl flex-col gap-5">
              <h1 className="font-display text-display-xl font-bold text-ink">
                <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em] leading-[0.95]">
                  <span className="intro-mask-rise block" style={ms(80)}>
                    {entry.label}
                  </span>
                </span>
              </h1>
              {"name" in entry && (
                <p className="intro-rise font-display text-display-sm font-medium text-balance text-ink-muted" style={ms(220)}>
                  {entry.name}
                </p>
              )}
              <p className="intro-fade font-mono text-label uppercase tabular-nums text-ink-muted" style={ms(300)}>
                {count} {count === 1 ? "piece" : "pieces"}
              </p>
              <TagList tags={tagsInUse} current={tag} className="intro-fade" />
            </div>
          </div>
        </header>

        {groups.map(({ gallery, collection, images }, i) => (
          <CollectionView
            key={`${gallery.slug}-${collection.id}`}
            part={String.fromCharCode(65 + i)}
            source={{ href: `/${gallery.slug}#${collection.id}`, label: `In ${gallery.title}` }}
            collection={{ id: `${gallery.slug}-${collection.id}`, layout: "grid", title: collection.title, context: collection.context, role: collection.role, period: collection.period, items: images }}
          />
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
