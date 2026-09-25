"use client";

import React from "react";
import { Chip, DraftingSheet, Reveal, SectionHeader, TechnicalLabel, stagger } from "@/components/primitives";
import { involvementLabels, timelineSorted, tracks, type Involvement, type TimelineEntry, type TimelineTrack } from "@/content/timeline";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * 03 — Timeline.
 *
 * Education, work and service on one spine, filterable by track. Each school
 * carries what happened there as a small drawn tree: the co-curricular
 * activities, the roles, the things worth remembering.
 *
 * The spine fills in brand colour as you read down it, tied to scroll, so
 * it doubles as a progress mark for the longest section on the page.
 */

const trackDot: Record<TimelineTrack, string> = {
  education: "bg-design",
  work: "bg-build",
  service: "bg-positive",
};

const trackRing: Record<TimelineTrack, string> = {
  education: "ring-design/30",
  work: "ring-build/30",
  service: "ring-positive/30",
};

/** The drawn tree of what happened at one place. */
function Involvements({ items }: { items: Involvement[] }) {
  return (
    <ul className="mt-4 flex flex-col">
      {items.map((item, i) => (
        <li
          key={`${item.title}-${item.role}`}
          data-reveal
          style={stagger(i, { "--delay": "140ms" } as React.CSSProperties)}
          className={cn(
            // Tree connectors, drawn rather than typed: a vertical run that
            // stops at the last branch, and a tick into each item.
            "relative grid gap-x-4 gap-y-0.5 py-1.5 pl-6 sm:grid-cols-[6.5rem_1fr_auto]",
            "before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-rule-strong last:before:h-[1.05rem]",
            "after:absolute after:left-0 after:top-[1.05rem] after:h-px after:w-3.5 after:bg-rule-strong"
          )}
        >
          <span className="font-mono text-label uppercase leading-[1.6rem] text-ink-faint">{involvementLabels[item.kind]}</span>
          <span className="min-w-0 text-body-sm leading-[1.6rem] text-ink">
            <span className="font-medium">{item.title}</span>
            {item.role && <span className="text-ink-muted"> · {item.role}</span>}
            {item.detail && <span className="mt-0.5 block text-caption text-ink-muted">{item.detail}</span>}
          </span>
          {item.period && <span className="font-mono text-caption leading-[1.6rem] tabular-nums text-ink-faint sm:text-right">{item.period}</span>}
        </li>
      ))}
    </ul>
  );
}

function Entry({ entry }: { entry: TimelineEntry }) {
  return (
    <Reveal as="li" className="relative grid gap-1 py-7 pl-9 sm:grid-cols-[1fr_auto] sm:gap-x-8">
      {/* Node on the spine */}
      <span data-reveal="fade" aria-hidden className="absolute left-0 top-[2.15rem] flex size-3 -translate-x-1/2 items-center justify-center">
        <span className={cn("relative z-10 size-2.5 rounded-full ring-4 ring-paper", trackDot[entry.track])} />
        {entry.current && <span className={cn("pulse-once absolute size-2.5 rounded-full", trackDot[entry.track])} />}
      </span>

      <div data-reveal className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-heading-sm font-semibold text-ink sm:text-heading">{entry.title}</h3>
          {entry.current && (
            <TechnicalLabel tone="brand" className={cn("rounded-sm px-1.5 py-0.5 ring-1", trackRing[entry.track])}>
              Now
            </TechnicalLabel>
          )}
        </div>
        {(entry.role || entry.org) && (
          <p className="mt-1 font-mono text-label uppercase text-ink-muted">
            {entry.role}
            {entry.role && entry.org && <span className="text-ink-faint"> / </span>}
            {entry.org && <span className="text-ink-faint">{entry.org}</span>}
          </p>
        )}
        {entry.detail && <p className="mt-2 max-w-prose text-body-sm text-pretty text-ink-muted">{entry.detail}</p>}
      </div>

      <p data-reveal="fade" className="order-first shrink-0 font-mono text-caption tabular-nums text-ink-faint sm:order-none sm:pt-1.5 sm:text-right">
        {entry.period}
      </p>

      {/* Spans both columns so nested dates share the entry's date column. */}
      {entry.involvements && entry.involvements.length > 0 && (
        <div className="sm:col-span-2">
          <Involvements items={entry.involvements} />
        </div>
      )}
    </Reveal>
  );
}

export function TimelineSection() {
  const [active, setActive] = React.useState<TimelineTrack[]>([]);
  const listRef = React.useRef<HTMLUListElement | null>(null);
  const reduced = useReducedMotion();

  const counts = React.useMemo(() => {
    const out = {} as Record<TimelineTrack, number>;
    for (const track of tracks) out[track.id] = timelineSorted.filter((e) => e.track === track.id).length;
    return out;
  }, []);

  // Nothing selected means everything, which is friendlier than an empty
  // section waiting for a click.
  const visible = active.length === 0 ? timelineSorted : timelineSorted.filter((entry) => active.includes(entry.track));

  const toggle = (track: TimelineTrack) => {
    setActive((current) => (current.includes(track) ? current.filter((t) => t !== track) : [...current, track]));
  };

  // The spine fills as the reading position passes down it. The reading
  // position is 60% of the way down the viewport, roughly where eyes rest.
  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const box = list.getBoundingClientRect();
      const reading = window.innerHeight * 0.6;
      const progress = Math.min(Math.max((reading - box.top) / Math.max(box.height, 1), 0), 1);
      list.style.setProperty("--progress", reduced ? "1" : progress.toFixed(4));
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [reduced, visible.length]);

  return (
    <DraftingSheet id="timeline" grid="full">
      <SectionHeader
        part="03"
        eyebrow="Timeline"
        className="mb-8"
        title="How I got here"
        lead="School, work and service on one spine, with what I actually did at each. They overlap more than separate lists would suggest."
      />

      <Reveal className="mb-2 flex flex-wrap items-center gap-2">
        {tracks.map((track, i) => (
          <Chip key={track.id} data-reveal style={stagger(i)} selected={active.includes(track.id)} count={counts[track.id]} onClick={() => toggle(track.id)}>
            <span aria-hidden className={cn("size-1.5 rounded-full", trackDot[track.id])} />
            {track.label}
          </Chip>
        ))}
        {active.length > 0 && (
          <button type="button" onClick={() => setActive([])} className="ml-1 font-mono text-label uppercase text-ink-faint underline-offset-4 hover:text-ink hover:underline">
            Show all
          </button>
        )}
      </Reveal>

      <ul ref={listRef} className="relative mt-6">
        {/* The spine: a hairline, and a brand line over it that fills with scroll. */}
        <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-rule" />
        <span aria-hidden className="absolute inset-y-0 left-0 w-px origin-top bg-brand" style={{ transform: "scaleY(var(--progress, 0))" }} />
        {visible.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </ul>

      <p aria-live="polite" className="mt-4 font-mono text-label uppercase text-ink-faint">
        {visible.length} of {timelineSorted.length} entries
      </p>
    </DraftingSheet>
  );
}

export default TimelineSection;
