"use client";

import React from "react";
import { Chip, DraftingSheet, SectionHeader, TechnicalLabel } from "@/components/primitives";
import { timelineSorted, tracks, type TimelineEntry, type TimelineTrack } from "@/content/timeline";
import { cn } from "@/lib/utils";

/**
 * 03 — Timeline.
 *
 * Education, work and leadership on one spine, filterable by track.
 *
 * The old site had these as two separate lists, with the leadership roles in
 * a third section entirely. Merging them shows the overlap, which is the more
 * interesting fact: polytechnic, the internship and the club roles were all
 * running at the same time.
 */

const trackDotClasses: Record<TimelineTrack, string> = {
  education: "bg-design",
  work: "bg-build",
  leadership: "bg-break",
};

function Entry({ entry }: { entry: TimelineEntry }) {
  return (
    <li className="group relative grid gap-1 py-6 pl-8 sm:grid-cols-[1fr_auto] sm:gap-6">
      {/* Node on the spine */}
      <span aria-hidden className="absolute left-0 top-8 flex size-3 -translate-x-1/2 items-center justify-center">
        <span className={cn("size-2 rounded-full ring-4 ring-paper", trackDotClasses[entry.track])} />
        {entry.current && <span className={cn("absolute size-3 animate-ping rounded-full opacity-60", trackDotClasses[entry.track])} />}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-heading-sm font-semibold text-ink">{entry.title}</h3>
          {entry.current && <TechnicalLabel tone="brand">Current</TechnicalLabel>}
        </div>
        {entry.role && <p className="mt-0.5 font-mono text-label uppercase text-ink-muted">{entry.role}</p>}
        {entry.detail && <p className="mt-2 max-w-prose text-body-sm text-pretty text-ink-muted">{entry.detail}</p>}
      </div>

      <p className="shrink-0 font-mono text-caption tabular-nums text-ink-faint sm:text-right">{entry.period}</p>
    </li>
  );
}

export function TimelineSection() {
  const [active, setActive] = React.useState<TimelineTrack[]>([]);

  const counts = React.useMemo(() => {
    const out = {} as Record<TimelineTrack, number>;
    for (const track of tracks) out[track.id] = timelineSorted.filter((e) => e.track === track.id).length;
    return out;
  }, []);

  // No selection means show everything, which is friendlier than forcing the
  // visitor to switch one on before the section has any content.
  const visible = active.length === 0 ? timelineSorted : timelineSorted.filter((entry) => active.includes(entry.track));

  const toggle = (track: TimelineTrack) => {
    setActive((current) => (current.includes(track) ? current.filter((t) => t !== track) : [...current, track]));
  };

  return (
    <DraftingSheet id="timeline" grid="full">
      <SectionHeader
        part="03"
        eyebrow="Timeline"
        className="mb-8"
        title="How I got here"
        lead="School, work and the roles I took on, on one spine. They overlap more than three separate lists would suggest."
      />

      <div className="mb-2 flex flex-wrap items-center gap-2">
        {tracks.map((track) => (
          <Chip key={track.id} selected={active.includes(track.id)} count={counts[track.id]} onClick={() => toggle(track.id)}>
            {track.label}
          </Chip>
        ))}
        {active.length > 0 && (
          <button type="button" onClick={() => setActive([])} className="ml-1 font-mono text-label uppercase text-ink-faint underline-offset-4 hover:text-ink hover:underline">
            Show all
          </button>
        )}
      </div>

      {/* The spine itself */}
      <ul className="relative mt-6 border-l border-rule pl-0">
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
