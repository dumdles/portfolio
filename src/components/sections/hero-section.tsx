"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Annotation, DecodeText, DimensionLine, PixelGlyph, TechnicalLabel, TitleBlock } from "@/components/primitives";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { profile } from "@/content/profile";

/**
 * 00 — Index.
 *
 * The opening sheet of the drawing, choreographed to land in about a
 * second and then stay still:
 *
 *     0 ms   sheet label decodes, header rule draws
 *    80 ms   name slides up out of its mask, a line at a time
 *   220 ms   the portrait is scanned in, top to bottom
 *   300 ms   positioning line rises
 *   560 ms   design, build, break: each verb's glyph assembles in turn
 *   480 ms   title block rises; its labels lock on one after another
 *   980 ms   crop marks snap to the portrait's corners
 *  1100 ms   scroll cue bobs three times, then rests
 *
 * All of it is CSS keyed off first paint, so it does not wait for
 * JavaScript. JavaScript adds only what needs a pointer or a clock: the
 * crosshair over the portrait, the live local time, the scroll parallax.
 */

const ms = (value: number) => ({ "--delay": `${value}ms` }) as React.CSSProperties;

/** Singapore time, to the minute. Rendered client-side only, so the server
 *  never has to guess a time zone. */
function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-SG", { timeZone: "Asia/Singapore", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    const update = () => setTime(format.format(new Date()));
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <TechnicalLabel className="shrink-0">
      <span aria-hidden className="size-1.5 rounded-full bg-positive" />
      <span>SGT</span>
      <span className="tabular-nums text-ink">{time ?? "--:--"}</span>
    </TechnicalLabel>
  );
}

/** One of the three corner registration marks around the portrait. */
function CropMark({ corner, delay }: { corner: "tl" | "tr" | "bl" | "br"; delay: number }) {
  const position = {
    tl: "-left-3 -top-3 border-l border-t",
    tr: "-right-3 -top-3 border-r border-t",
    bl: "-bottom-3 -left-3 border-b border-l",
    br: "-bottom-3 -right-3 border-b border-r",
  }[corner];
  // Each mark snaps outward from slightly inside its final position.
  const from = { tl: ["6px", "6px"], tr: ["-6px", "6px"], bl: ["6px", "-6px"], br: ["-6px", "-6px"] }[corner];

  return (
    <span
      aria-hidden
      className={`intro-snap pointer-events-none absolute size-4 border-ink-faint ${position}`}
      style={{ ...ms(delay), "--snap-x": from[0], "--snap-y": from[1] } as React.CSSProperties}
    />
  );
}

export function HeroSection() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const readoutX = useRef<HTMLSpanElement | null>(null);
  const readoutY = useRef<HTMLSpanElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const pointerFrame = useRef<number | null>(null);
  const reduced = useReducedMotion();

  // Scroll: a slow push into the portrait, and the scroll cue retiring.
  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const y = window.scrollY;
      if (cueRef.current) cueRef.current.style.opacity = y > 40 ? "0" : "";
      if (reduced || !imageRef.current) return;
      const progress = Math.min(y / 520, 1);
      imageRef.current.style.transform = `scale(${(1 + progress * 0.07).toFixed(3)}) translateY(${(-progress * 20).toFixed(1)}px)`;
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  // Pointer: a CAD crosshair with a normalised coordinate readout. Written
  // straight to the DOM, so tracking the cursor never re-renders React.
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const frame = frameRef.current;
    if (!frame) return;
    const box = frame.getBoundingClientRect();
    const x = Math.min(Math.max((event.clientX - box.left) / box.width, 0), 1);
    const y = Math.min(Math.max((event.clientY - box.top) / box.height, 0), 1);

    if (pointerFrame.current !== null) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      pointerFrame.current = null;
      frame.style.setProperty("--cx", `${(x * 100).toFixed(2)}%`);
      frame.style.setProperty("--cy", `${(y * 100).toFixed(2)}%`);
      if (readoutX.current) readoutX.current.textContent = x.toFixed(3);
      if (readoutY.current) readoutY.current.textContent = y.toFixed(3);
    });
  };

  useEffect(
    () => () => {
      if (pointerFrame.current !== null) cancelAnimationFrame(pointerFrame.current);
    },
    []
  );

  let verbIndex = 0;

  return (
    <section id="home" className="relative isolate overflow-x-clip">
      <div
        aria-hidden
        className="intro-fade drafting-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-32 sm:px-6 md:pt-36 lg:px-8">
        {/* Sheet header */}
        <div className="flex items-center gap-3">
          <TechnicalLabel tone="brand" className="tabular-nums">
            <DecodeText text="00" start duration={300} />
          </TechnicalLabel>
          <TechnicalLabel>
            <DecodeText text="Index" start delay={60} />
          </TechnicalLabel>
          <span aria-hidden className="intro-draw-x h-px flex-1 bg-rule" style={ms(120)} />
          <div className="intro-fade" style={ms(400)}>
            <LocalTime />
          </div>
        </div>

        <div className="mt-10 grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Lettering */}
          <div className="flex flex-col gap-7">
            <h1 className="font-display text-display-xl font-bold text-ink">
              {profile.name.split(" ").map((word, i) => (
                // The mask needs a little room below the baseline, or it
                // clips the descenders on y and g.
                <span key={word} className="-mb-[0.14em] block overflow-hidden pb-[0.14em] leading-[0.95]">
                  <span className="intro-mask-rise block" style={ms(80 + i * 90)}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p className="intro-rise max-w-xl font-display text-display-sm font-medium text-balance text-ink-muted" style={ms(300)}>
              {profile.positioning.map((part, i) => {
                if (typeof part === "string") return <React.Fragment key={i}>{part}</React.Fragment>;
                const order = verbIndex++;
                return (
                  <span key={i} className="glyph-trigger inline-flex items-baseline gap-1.5 whitespace-nowrap text-ink">
                    <span className="relative">
                      {part.verb}
                      <span
                        aria-hidden
                        className="intro-draw-x absolute inset-x-0 -bottom-0.5 h-[2px]"
                        style={{ ...ms(620 + order * 160), background: part.accent }}
                      />
                    </span>
                    <PixelGlyph
                      name={part.glyph}
                      px={3}
                      accent={part.accent}
                      assemble="intro"
                      delay={560 + order * 160}
                      step={14}
                      hover={part.glyph === "break" ? "swap" : "loop"}
                      className="-translate-y-[0.08em] self-center text-ink"
                    />
                  </span>
                );
              })}
            </p>

            <p className="intro-rise max-w-prose text-body-lg text-pretty text-ink-muted" style={ms(420)}>
              {profile.intro}
            </p>

            <div className="intro-rise" style={ms(480)}>
              <TitleBlock fields={[...profile.titleBlock]} decode decodeDelay={620} className="max-w-xl" />
            </div>
          </div>

          {/* The subject, dimensioned */}
          <div className="intro-fade relative mx-auto w-full max-w-md lg:max-w-none" style={ms(150)}>
            <div
              ref={frameRef}
              onPointerMove={onPointerMove}
              className="group/photo relative aspect-[4/5] w-full cursor-crosshair overflow-hidden rounded-lg border border-rule bg-surface-muted shadow-pane"
            >
              <div className="intro-scan absolute inset-0" style={ms(220)}>
                <div ref={imageRef} className="absolute inset-0 will-change-transform" style={{ transition: "transform 0.25s var(--ease-snap)" }}>
                  <Image src="/images/dylan-hero.jpg" alt={`Portrait of ${profile.name}`} fill sizes="(max-width: 1024px) 100vw, 40vw" priority className="object-cover" />
                </div>
              </div>

              {/* The scan head. Visible only while it passes. */}
              <span
                aria-hidden
                className="intro-scanline pointer-events-none absolute inset-x-0 h-[2px] bg-brand shadow-[0_0_14px_2px_var(--brand)]"
                style={ms(220)}
              />

              {/* Crosshair, mouse only */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover/photo:opacity-100 [@media(hover:none)]:hidden"
              >
                <span className="absolute inset-y-0 w-px bg-brand/70" style={{ left: "var(--cx, 50%)" }} />
                <span className="absolute inset-x-0 h-px bg-brand/70" style={{ top: "var(--cy, 50%)" }} />
                <span className="absolute size-3 -translate-x-1/2 -translate-y-1/2 border border-brand" style={{ left: "var(--cx, 50%)", top: "var(--cy, 50%)" }} />
                <span className="absolute bottom-2 right-2 flex gap-3 rounded-sm border border-rule bg-paper/90 px-2 py-1 font-mono text-label uppercase text-ink-muted backdrop-blur-sm">
                  <span>
                    X <span ref={readoutX} className="tabular-nums text-ink">0.500</span>
                  </span>
                  <span>
                    Y <span ref={readoutY} className="tabular-nums text-ink">0.500</span>
                  </span>
                </span>
              </div>
            </div>

            <CropMark corner="tl" delay={980} />
            <CropMark corner="tr" delay={1020} />
            <CropMark corner="bl" delay={1060} />
            <CropMark corner="br" delay={1100} />

            {/* Drawing furniture. Decorative, and only where there is room. */}
            <DimensionLine orientation="vertical" value="Fig. 01" className="intro-draw-y absolute -left-9 top-0 hidden h-full xl:flex" style={ms(700)} />

            <Annotation side="left" lineLength="md" className="intro-fade absolute -right-5 top-12 hidden translate-x-full xl:flex" style={ms(1150)}>
              Subject
            </Annotation>

            <div className="intro-fade absolute -bottom-3 left-5 hidden items-center gap-2 rounded-sm border border-rule bg-paper px-2 py-1 sm:flex" style={ms(1150)}>
              <TechnicalLabel>Rev.</TechnicalLabel>
              <span className="font-mono text-label uppercase text-brand">2026.2</span>
            </div>
          </div>
        </div>

        {/* Scroll cue: bobs three times, then rests; fades once you scroll. */}
        <div ref={cueRef} aria-hidden className="mt-16 hidden items-center gap-2 text-ink-faint transition-opacity duration-300 md:flex">
          <span className="intro-fade" style={ms(1100)}>
            <span className="bob-step inline-block" style={ms(1400)}>
              <PixelGlyph name="arrowDown" px={2} />
            </span>
          </span>
          <TechnicalLabel className="intro-fade" style={ms(1100)}>
            Scroll
          </TechnicalLabel>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
