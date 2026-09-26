"use client";

import * as React from "react";
import { DimensionLine, DraftingSheet, Reveal, SectionHeader, TechnicalLabel, stagger } from "@/components/primitives";
import { cn } from "@/lib/utils";
import type { AnatomySegment, CaseSection, Contribution, FlowStep, Milestone, PoolsDiagram } from "@/content/case-studies/types";
import { SystemDiagram } from "./system-diagram";

/* -------------------------------------------------------------------------- */
/* Prose and lists                                                            */
/* -------------------------------------------------------------------------- */

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <Reveal className="flex max-w-prose flex-col gap-5">
      {paragraphs.map((text, i) => (
        <p key={i} data-reveal style={stagger(i)} className="text-body-lg text-pretty text-ink-muted first:text-ink">
          {text}
        </p>
      ))}
    </Reveal>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <Reveal as="ul" className="grid gap-x-10 gap-y-4 md:grid-cols-2">
      {items.map((item, i) => (
        <li key={i} data-reveal style={stagger(Math.min(i, 8))} className="flex gap-3 text-body text-pretty text-ink-muted">
          <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 bg-brand" />
          {item}
        </li>
      ))}
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Flow: numbered steps in a row, with one stretch of them framed            */
/* -------------------------------------------------------------------------- */

function Flow({ steps, band }: { steps: FlowStep[]; band?: string }) {
  const first = steps.findIndex((step) => step.banded);
  const last = steps.findLastIndex((step) => step.banded);
  const span = band && first >= 0 ? `${first + 1} / span ${last - first + 1}` : null;

  return (
    <Reveal
      as="ol"
      style={{ "--n": steps.length } as React.CSSProperties}
      className={cn("relative grid gap-3 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:gap-4", span && "lg:mt-16")}
    >
      {/* The framed stretch, drawn behind its steps. */}
      {span && (
        <li
          aria-hidden
          data-reveal="fade"
          style={{ "--gc": span, "--delay": "200ms" } as React.CSSProperties}
          className="pointer-events-none relative -mx-2 -mb-2 -mt-10 hidden rounded-xl border border-dashed border-rule-strong bg-[repeating-linear-gradient(135deg,var(--grid)_0_1px,transparent_1px_9px)] lg:block lg:[grid-column:var(--gc)] lg:[grid-row:1]"
        >
          <TechnicalLabel tone="brand" className="absolute left-3 top-3">
            {band}
          </TechnicalLabel>
        </li>
      )}

      {steps.map((step, i) => (
        <li
          key={step.title}
          data-reveal
          style={stagger(i, { "--gc": `${i + 1}` } as React.CSSProperties)}
          className="relative z-10 flex flex-col gap-2 rounded-lg border border-rule bg-surface p-4 shadow-lift lg:[grid-column:var(--gc)] lg:[grid-row:1]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-label tabular-nums text-brand">{String(i + 1).padStart(2, "0")}</span>
            <span className="rounded-sm border border-rule px-1.5 py-0.5 font-mono text-label uppercase text-ink-muted">{step.where}</span>
          </div>
          <h3 className="font-display text-heading-sm font-semibold text-ink">{step.title}</h3>
          <p className="text-body-sm text-pretty text-ink-muted">{step.body}</p>
          {band && step.banded && <TechnicalLabel className="mt-auto pt-1 lg:hidden">{band}</TechnicalLabel>}
          {step.note && (
            <TechnicalLabel tone="brand" className="mt-auto pt-1">
              {step.note}
            </TechnicalLabel>
          )}
        </li>
      ))}
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Pools: when each pool of money opens, on an age axis                       */
/* -------------------------------------------------------------------------- */

function Pools({ diagram, paragraphs }: { diagram: PoolsDiagram; paragraphs: string[] }) {
  const range = diagram.to - diagram.from;
  const pct = (age: number) => `${(((age - diagram.from) / range) * 100).toFixed(3)}%`;
  const width = (from: number, to: number) => `${(((to - from) / range) * 100).toFixed(3)}%`;

  return (
    <div className="flex flex-col gap-12">
      <Reveal className="rounded-lg border border-rule bg-surface/70 p-5 sm:p-8">
        <figure>
          <div className="flex gap-4">
            {/* Lane names */}
            <div className="w-24 shrink-0 pt-8 sm:w-36">
              {diagram.lanes.map((lane, i) => (
                <div key={lane.label} data-reveal style={stagger(i)} className="flex h-14 flex-col justify-center">
                  <span className="text-body-sm font-medium leading-tight text-ink">{lane.label}</span>
                  {lane.sub && <span className="mt-0.5 font-mono text-label uppercase text-ink-faint">{lane.sub}</span>}
                </div>
              ))}
              <div className="flex h-8 items-end font-mono text-label uppercase text-ink-faint">Age</div>
            </div>

            {/* Tracks, with the span and the marker laid over all of them */}
            <div className="relative min-w-0 flex-1 pt-8">
              <div
                aria-hidden
                data-reveal="fade"
                style={{ left: pct(diagram.span.from), width: width(diagram.span.from, diagram.span.to), "--delay": "480ms" } as React.CSSProperties}
                className="absolute bottom-8 top-6 rounded-sm border-x border-dashed border-brand/60 bg-[repeating-linear-gradient(135deg,color-mix(in_oklch,var(--brand)_14%,transparent)_0_1px,transparent_1px_7px)]"
              >
                <span className="absolute -top-1 left-1.5 -translate-y-full whitespace-nowrap font-mono text-label uppercase text-brand">{diagram.span.label}</span>
              </div>

              {diagram.lanes.map((lane, i) => (
                <div key={lane.label} className="relative h-14 border-b border-rule last-of-type:border-b-0">
                  {lane.segments.map((segment, j) => (
                    <div key={j} className="absolute inset-y-3.5" style={{ left: pct(segment.from), width: width(segment.from, segment.to) }}>
                      <div
                        data-draw
                        style={{ "--delay": `${140 + i * 90 + j * 70}ms` } as React.CSSProperties}
                        className={cn("h-full w-full rounded-sm", segment.kind === "partial" ? "bg-brand/30" : "bg-brand")}
                      />
                      {segment.label && (
                        <span
                          className={cn(
                            "absolute left-2 top-1/2 hidden max-w-[calc(100%-0.5rem)] -translate-y-1/2 truncate font-mono text-label uppercase sm:block",
                            segment.kind === "partial" ? "text-ink" : "text-brand-ink"
                          )}
                        >
                          {segment.label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              <div
                aria-hidden
                data-reveal="fade"
                style={{ left: pct(diagram.marker.at), "--delay": "380ms" } as React.CSSProperties}
                className="absolute bottom-8 top-0 w-px bg-ink"
              >
                <span className="absolute right-full top-0 mr-1.5 whitespace-nowrap font-mono text-label uppercase text-ink">{diagram.marker.label}</span>
              </div>

              {/* Age axis */}
              <div className="relative h-8 border-t border-rule-strong">
                {diagram.ticks.map((tick) => (
                  <span key={tick} className="absolute top-0 flex -translate-x-1/2 flex-col items-center" style={{ left: pct(tick) }}>
                    <span className="h-1.5 w-px bg-rule-strong" />
                    <span className="mt-1 font-mono text-caption tabular-nums text-ink-muted">{tick}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <figcaption className="mt-6 flex items-baseline gap-3">
            <TechnicalLabel tone="brand">Fig. 2</TechnicalLabel>
            <span className="text-caption text-pretty text-ink-muted">{diagram.caption}</span>
          </figcaption>
        </figure>
      </Reveal>

      <Prose paragraphs={paragraphs} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Anatomy: a code, dimensioned                                               */
/* -------------------------------------------------------------------------- */

function Anatomy({ example, notes }: { example: AnatomySegment[]; notes: string[] }) {
  const [active, setActive] = React.useState<number | null>(null);

  return (
    <div onMouseLeave={() => setActive(null)}>
      <Reveal className="overflow-x-auto rounded-lg border border-rule bg-surface/70 px-6 py-10 sm:px-10">
        <div data-reveal className="flex items-start justify-center gap-x-2 font-mono text-[clamp(2rem,0.9rem+6vw,5.5rem)] leading-none tracking-tight sm:gap-x-4" style={{ fontVariantLigatures: "none" }}>
          {example.map((segment, i) => (
            <React.Fragment key={segment.text}>
              {i > 0 && <span className="text-ink-faint">-</span>}
              <span className="flex cursor-default flex-col items-stretch" onMouseEnter={() => setActive(i)}>
                <span className={cn("transition-colors duration-150", active === null || active === i ? "text-ink" : "text-ink-faint", active === i && "text-brand")}>{segment.text}</span>
                <DimensionLine value={segment.label} className="mt-3" />
              </span>
            </React.Fragment>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-6 grid gap-3 md:grid-cols-3">
        {example.map((segment, i) => (
          <div
            key={segment.text}
            data-reveal
            style={stagger(i)}
            onMouseEnter={() => setActive(i)}
            className={cn("rounded-lg border p-4 transition-colors duration-150", active === i ? "border-brand bg-brand-soft" : "border-rule bg-surface")}
          >
            <div className="flex items-baseline justify-between gap-2">
              <TechnicalLabel tone={active === i ? "brand" : "muted"}>{segment.label}</TechnicalLabel>
              <span className="font-mono text-label text-ink-faint">{segment.text}</span>
            </div>
            <p className="mt-2 text-body-sm text-pretty text-ink-muted">{segment.note}</p>
          </div>
        ))}
      </Reveal>

      {notes.length > 0 && (
        <Reveal as="ul" className="mt-6 flex flex-col gap-2">
          {notes.map((note, i) => (
            <li key={i} data-reveal style={stagger(i)} className="flex gap-3 text-body-sm text-ink-muted">
              <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 bg-brand" />
              {note}
            </li>
          ))}
        </Reveal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Contributions: prose, with each repository's share of commits              */
/* -------------------------------------------------------------------------- */

function Contributions({ paragraphs, items, footnote }: { paragraphs: string[]; items: Contribution[]; footnote?: string }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr]">
      <Prose paragraphs={paragraphs} />

      <Reveal className="flex flex-col gap-6 self-start rounded-lg border border-rule bg-surface p-6">
        <TechnicalLabel rule>Share of commits</TechnicalLabel>
        {items.map((item, i) => {
          const share = item.total > 0 ? item.mine / item.total : 0;
          return (
            <div key={item.repo} data-reveal style={stagger(i)} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-3">
                <span>
                  <span className="font-display text-heading-sm font-semibold text-ink">{item.repo}</span>
                  <span className="ml-2 font-mono text-label uppercase text-ink-faint">{item.what}</span>
                </span>
                <span className="font-mono text-caption tabular-nums text-ink-muted">
                  {item.mine} / {item.total}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-sunken">
                <div
                  data-draw
                  className="h-full rounded-full bg-brand"
                  style={{ width: `${(share * 100).toFixed(1)}%`, "--delay": `${220 + i * 120}ms` } as React.CSSProperties}
                />
              </div>
            </div>
          );
        })}
        {footnote && <p className="border-t border-rule pt-4 text-caption text-pretty text-ink-faint">{footnote}</p>}
      </Reveal>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Milestones                                                                  */
/* -------------------------------------------------------------------------- */

function Milestones({ items }: { items: Milestone[] }) {
  return (
    <Reveal as="ol" className="relative max-w-3xl">
      <span aria-hidden data-reveal="fade" className="absolute bottom-2 left-[5.75rem] top-2 hidden w-px bg-rule sm:block" />
      {items.map((item, i) => (
        <li key={item.text} data-reveal style={stagger(i)} className="relative grid gap-1 py-3 sm:grid-cols-[5.75rem_1fr] sm:gap-8">
          <span className="font-mono text-caption tabular-nums text-ink-faint sm:pt-0.5">{item.date ?? String(i + 1).padStart(2, "0")}</span>
          <span className="relative text-body text-pretty text-ink">
            <span aria-hidden className="absolute -left-8 top-[0.6em] hidden size-2 -translate-x-1/2 rounded-full bg-brand ring-4 ring-paper sm:block" />
            {item.text}
          </span>
        </li>
      ))}
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Dispatcher                                                                  */
/* -------------------------------------------------------------------------- */

export function CaseSectionView({ section, grid }: { section: CaseSection; grid: "full" | "top" | "none" }) {
  return (
    <DraftingSheet id={section.id} grid={grid} className="border-t border-rule">
      <SectionHeader part={section.part} eyebrow={section.eyebrow} title={section.title} lead={section.lead} className="mb-10" />

      {section.kind === "prose" && <Prose paragraphs={section.paragraphs} />}
      {section.kind === "list" && <List items={section.items} />}
      {section.kind === "flow" && <Flow steps={section.steps} band={section.band} />}
      {section.kind === "pools" && <Pools diagram={section.diagram} paragraphs={section.paragraphs} />}
      {section.kind === "anatomy" && <Anatomy example={section.example} notes={section.notes} />}
      {section.kind === "system" && <SystemDiagram diagram={section.diagram} caption={section.caption} />}
      {section.kind === "contributions" && <Contributions paragraphs={section.paragraphs} items={section.items} footnote={section.footnote} />}
      {section.kind === "milestones" && <Milestones items={section.items} />}
    </DraftingSheet>
  );
}
