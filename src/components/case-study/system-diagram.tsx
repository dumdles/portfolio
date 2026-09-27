"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { TechnicalLabel } from "@/components/primitives";
import type { DiagramEdge, SystemDiagram as Diagram } from "@/content/case-studies/types";

/**
 * A system drawn the way a technical drawing would draw it: zones as dashed
 * boundaries, parts as boxes with numbered balloons, connections as
 * orthogonal leader lines, and a parts list keyed to the balloons.
 *
 * On first view the connections plot themselves in, in the order a request
 * travels. Pointing at a part, in the drawing or in the list, lights its
 * connections and sends packets along them; everything else steps back.
 * Packets loop only while something is pointed at.
 *
 * The drawing is decorative for assistive technology. The parts list carries
 * the same information as text, so nothing is lost without it.
 */

const NODE_W = 150;
const NODE_H = 52;

function pathD(points: [number, number][]) {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
}

/** A small filled arrowhead whose tip sits on the path's end (or start). */
function arrowhead(points: [number, number][], atStart = false) {
  const n = points.length;
  const [tx, ty] = atStart ? points[0] : points[n - 1];
  const [px, py] = atStart ? points[1] : points[n - 2];
  const dx = Math.sign(tx - px);
  const dy = Math.sign(ty - py);
  const bx = tx - dx * 7;
  const by = ty - dy * 7;
  const nx = -dy * 3.5;
  const ny = dx * 3.5;
  return `${tx},${ty} ${bx + nx},${by + ny} ${bx - nx},${by - ny}`;
}

const touches = (edge: DiagramEdge, id: string) => edge.from === id || edge.to === id;

export function SystemDiagram({ diagram, caption }: { diagram: Diagram; caption?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "0px 0px -18% 0px" });
  const reduced = useReducedMotion();
  const [active, setActive] = React.useState<string | null>(null);

  const nodes = React.useMemo(() => diagram.nodes.map((node, i) => ({ ...node, n: i + 1, w: node.w ?? NODE_W, h: node.h ?? NODE_H })), [diagram.nodes]);

  const lit = React.useMemo(() => {
    if (!active) return null;
    const ids = new Set([active]);
    for (const edge of diagram.edges) {
      if (!touches(edge, active)) continue;
      ids.add(edge.from);
      ids.add(edge.to);
    }
    return ids;
  }, [active, diagram.edges]);

  const edgeCount = diagram.edges.length;
  const nodeDelay = (n: number) => `${n * 35}ms`;
  const edgeDelay = (i: number) => `${320 + i * 85}ms`;

  return (
    <div ref={ref} data-inview={inView ? "" : undefined}>
      <figure>
        <div className="relative overflow-x-auto rounded-lg border border-rule bg-surface/70">
          <svg
            viewBox={`0 0 ${diagram.width} ${diagram.height}`}
            className="block h-auto w-full min-w-[760px] select-none"
            aria-hidden
            onMouseLeave={() => setActive(null)}
          >
            {/* Zones, labelled top right so the balloons never cover them */}
            {diagram.zones.map((zone, i) => (
              <g key={zone.id} className="sd-fade" style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
                <rect x={zone.x} y={zone.y} width={zone.w} height={zone.h} rx={8} fill="none" stroke="var(--rule-strong)" strokeDasharray="5 5" />
                <text x={zone.x + zone.w - 12} y={zone.y + 20} textAnchor="end" className="font-mono" fontSize={10} letterSpacing={1.4} fill="var(--ink-faint)">
                  {zone.label.toUpperCase()}
                </text>
              </g>
            ))}

            {/* Connections */}
            {diagram.edges.map((edge, i) => {
              const on = !!active && touches(edge, active);
              const dim = !!active && !on;
              const d = pathD(edge.points);
              // Packets run from the active part outward, so the flow reads
              // from whatever you are pointing at.
              const reverse = on && edge.to === active && !edge.both;
              return (
                <g key={`${edge.from}-${edge.to}`} className={cn("sd-link", dim && "is-dim")}>
                  <path d={d} pathLength={1} className={cn("sd-edge", on && "is-on")} style={{ "--d": edgeDelay(i) } as React.CSSProperties} />
                  <g className="sd-fade" style={{ "--d": `${320 + i * 85 + 420}ms` } as React.CSSProperties}>
                    <polygon points={arrowhead(edge.points)} className={cn("sd-arrow", on && "is-on")} />
                    {edge.both && <polygon points={arrowhead(edge.points, true)} className={cn("sd-arrow", on && "is-on")} />}
                  </g>
                  {on && !reduced && (
                    <circle r={3.2} fill="var(--brand)">
                      <animateMotion
                        dur="1.3s"
                        repeatCount="indefinite"
                        path={d}
                        keyPoints={reverse ? "1;0" : "0;1"}
                        keyTimes="0;1"
                        calcMode="linear"
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Parts */}
            {nodes.map((node) => {
              const on = active === node.id;
              const near = !!lit && lit.has(node.id);
              const dim = !!active && !near;
              return (
                <g
                  key={node.id}
                  className={cn("sd-node", dim && "is-dim")}
                  onMouseEnter={() => setActive(node.id)}
                  onClick={() => setActive((current) => (current === node.id ? null : node.id))}
                >
                  <g className="sd-fade" style={{ "--d": nodeDelay(node.n) } as React.CSSProperties}>
                    <rect
                      x={node.x}
                      y={node.y}
                      width={node.w}
                      height={node.h}
                      rx={5}
                      fill="var(--surface)"
                      stroke={on ? "var(--brand)" : near ? "var(--brand)" : "var(--rule-strong)"}
                      strokeWidth={on ? 2 : 1.25}
                      className="sd-box"
                    />
                    <text x={node.x + 16} y={node.y + (node.sub ? 23 : node.h / 2 + 5)} className="font-display" fontSize={14.5} fontWeight={600} fill="var(--ink)">
                      {node.label}
                    </text>
                    {node.sub && (
                      <text x={node.x + 16} y={node.y + node.h - 12} className="font-mono" fontSize={9.5} letterSpacing={1} fill="var(--ink-faint)">
                        {node.sub.toUpperCase()}
                      </text>
                    )}
                    {/* Balloon callout, keyed to the parts list */}
                    <circle cx={node.x} cy={node.y} r={10.5} fill={on ? "var(--brand)" : "var(--paper)"} stroke={on || near ? "var(--brand)" : "var(--rule-strong)"} />
                    <text x={node.x} y={node.y + 3.5} textAnchor="middle" className="font-mono" fontSize={10} fill={on ? "var(--brand-ink)" : "var(--ink-muted)"}>
                      {node.n}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {caption && (
          <figcaption className="mt-3 flex items-baseline gap-3">
            <TechnicalLabel tone="brand">Fig. 1</TechnicalLabel>
            <span className="text-caption text-ink-muted">{caption}</span>
          </figcaption>
        )}
      </figure>

      {/* Parts list: the text version of the drawing, keyed by balloon */}
      <div className="mt-10">
        <TechnicalLabel rule className="mb-4">
          Parts list
        </TechnicalLabel>
        <ol className="grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3" onMouseLeave={() => setActive(null)}>
          {nodes.map((node, i) => (
            <li
              key={node.id}
              data-reveal
              style={{ "--i": Math.min(i, 8), "--delay": `${edgeCount * 40}ms` } as React.CSSProperties}
              onMouseEnter={() => setActive(node.id)}
              className={cn("flex gap-3 rounded-md px-3 py-2.5 transition-colors duration-150", active === node.id ? "bg-brand-soft" : "hover:bg-surface-muted")}
            >
              <span
                aria-hidden
                className={cn(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border font-mono text-label tabular-nums transition-colors duration-150",
                  active === node.id ? "border-brand bg-brand text-brand-ink" : "border-rule-strong text-ink-muted"
                )}
              >
                {node.n}
              </span>
              <span className="min-w-0">
                <span className="text-body-sm font-medium text-ink">{node.label}</span>
                {node.sub && <span className="ml-2 font-mono text-label uppercase text-ink-faint">{node.sub}</span>}
                <span className="mt-0.5 block text-caption text-ink-muted">{node.description}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
