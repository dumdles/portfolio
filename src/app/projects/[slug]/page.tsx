import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DecodeText, DisciplineMarker, TechnicalLabel, TitleBlock } from "@/components/primitives";
import { CaseSectionView } from "@/components/case-study/sections";
import { SiteFooter } from "@/components/sections/site-footer";
import Navbar from "@/components/Navbar";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { disciplineLabels } from "@/content/projects";

/**
 * A project's case study, rendered from its data file in
 * src/content/case-studies. Every case study gets the same opening sheet,
 * then its sections in order, each drawn by the component for its kind.
 */

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.lead,
    openGraph: { title: `${study.title} · Dylan Chong`, description: study.lead, type: "article" },
  };
}

const ms = (value: number) => ({ "--delay": `${value}ms` }) as React.CSSProperties;

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Navbar />
      <main>
        {/* Opening sheet */}
        <header className="relative isolate overflow-x-clip">
          <div
            aria-hidden
            className="intro-fade drafting-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)]"
          />
          <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-44 sm:px-6 md:pt-40 lg:px-8">
            <div className="flex items-center gap-3">
              <Link href="/#works" className="intro-fade font-mono text-label uppercase text-ink-muted underline-offset-4 transition-colors hover:text-brand hover:underline" style={ms(0)}>
                ← Selected work
              </Link>
              <span aria-hidden className="intro-draw-x h-px flex-1 bg-rule" style={ms(120)} />
              <TechnicalLabel tone="brand">
                <DecodeText text="Case study" start delay={80} />
              </TechnicalLabel>
            </div>

            <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <div className="flex flex-col gap-5">
                <h1 className="font-display text-display-xl font-bold text-ink">
                  <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em] leading-[0.95]">
                    <span className="intro-mask-rise block" style={ms(80)}>
                      {study.title}
                    </span>
                  </span>
                </h1>
                {study.name && (
                  <p className="intro-rise font-display text-display-sm font-medium text-balance text-ink-muted" style={ms(220)}>
                    {study.name}
                  </p>
                )}
                <div className="intro-fade flex flex-wrap gap-x-4 gap-y-1" style={ms(320)}>
                  {study.disciplines.map((discipline) => (
                    <DisciplineMarker key={discipline} discipline={discipline} label={disciplineLabels[discipline]} />
                  ))}
                </div>
                <p className="intro-rise max-w-prose text-body-lg text-pretty text-ink-muted" style={ms(360)}>
                  {study.lead}
                </p>
              </div>

              <div className="intro-rise" style={ms(460)}>
                <TitleBlock fields={study.titleBlock} decode decodeDelay={560} dense />
              </div>
            </div>
          </div>
        </header>

        {study.sections.map((section) => (
          <CaseSectionView key={section.id} section={section} grid={section.kind === "system" ? "full" : "none"} />
        ))}

        <section className="border-t border-rule">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            {study.notice && <p className="max-w-prose text-body-sm text-pretty text-ink-muted">{study.notice}</p>}
            <Link href="/#works" className="shrink-0 font-mono text-label uppercase text-brand underline-offset-4 hover:underline">
              ← Selected work
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
