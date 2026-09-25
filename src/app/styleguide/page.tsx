import type { Metadata } from "next";
import Link from "next/link";
import { Annotation, BentoGrid, BentoItem, DecodeText, DimensionLine, DraftingSheet, PixelGlyph, PixelText, Reveal, SectionHeader, TechnicalLabel, TiltCard, TitleBlock, stagger } from "@/components/primitives";
import { glyphs, type GlyphName } from "@/lib/pixel/glyphs";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Every primitive and token in the design system, rendered in both themes.",
  robots: { index: false, follow: false },
};

/* -------------------------------------------------------------------------- */

function Block({ part, name, description, children }: { part: string; name: string; description: string; children: React.ReactNode }) {
  return (
    <section className="scroll-mt-28 border-t border-rule py-14 first:border-t-0" id={name.toLowerCase().replace(/\s+/g, "-")}>
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <TechnicalLabel tone="brand">{part}</TechnicalLabel>
          <TechnicalLabel>{name}</TechnicalLabel>
          <span aria-hidden className="h-px flex-1 bg-rule" />
        </div>
        <p className="max-w-prose text-body-sm text-ink-muted">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Swatch({ token, className, note }: { token: string; className: string; note?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-16 rounded-md border border-rule ${className}`} />
      <div className="flex flex-col gap-0.5">
        <code className="font-mono text-caption text-ink">{token}</code>
        {note && <span className="text-caption text-ink-faint">{note}</span>}
      </div>
    </div>
  );
}

function SwatchRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="mb-3 font-display text-heading-sm font-semibold text-ink">{title}</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{children}</div>
    </div>
  );
}

function TypeRow({ token, sample, note }: { token: string; sample: string; note: string }) {
  return (
    <div className="flex flex-col gap-2 border-b border-rule py-5 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-8">
      <div className="flex w-44 shrink-0 flex-col gap-0.5">
        <code className="font-mono text-caption text-ink">{token}</code>
        <span className="text-caption text-ink-faint">{note}</span>
      </div>
      <p className={`${sample} min-w-0 text-ink`}>Engineering meets design</p>
    </div>
  );
}


/** How each glyph behaves on hover, as the site uses it. */
const glyphMotion: Record<GlyphName, "swap" | "loop" | undefined> = {
  design: "loop",
  build: "loop",
  break: "swap",
  monogram: "loop",
  nib: "loop",
  camera: "swap",
  bike: "loop",
  guitar: "loop",
  network: "loop",
  heart: "loop",
  arrowDown: undefined,
};

const motionTokens = [
  { token: "--dur-snap", value: "140ms", use: "Colour and opacity responses to hover" },
  { token: "--dur-quick", value: "260ms", use: "Pixel pops, crop marks, small snaps" },
  { token: "--dur-base", value: "440ms", use: "Text and cards rising into place" },
  { token: "--dur-slow", value: "780ms", use: "One-time entrances only: rules drawing, the scan" },
  { token: "--ease-out-expo", value: "cubic-bezier(.16, 1, .3, 1)", use: "Anything drawn: lands hard, settles" },
  { token: "steps(n)", value: "3 or 6 steps", use: "Anything pixel: snaps like a sprite frame" },
];

/* -------------------------------------------------------------------------- */

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-heading-sm font-bold">Styleguide</span>
            <Link href="/" className="font-mono text-label uppercase text-ink-muted underline-offset-4 hover:text-brand hover:underline">
              ← Site
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <DraftingSheet grid="top">
        <SectionHeader
          as="h1"
          part="00"
          eyebrow="Reference"
          title="The drawing set"
          lead="Every token and primitive in the system, rendered together so they can be judged against each other rather than in isolation. Switch the theme from the header; everything on this page responds live."
          className="mb-4"
        />

        <div className="mt-10">
          <Block part="01" name="Colour" description="Tokens resolve per theme, so the same class produces drafting paper in light mode and a CAD viewport in dark. Never reach past these into raw Tailwind palette colours.">
            <SwatchRow title="Surfaces">
              <Swatch token="bg-paper" className="bg-paper" note="Page background" />
              <Swatch token="bg-surface" className="bg-surface" note="Cards, panes" />
              <Swatch token="bg-surface-muted" className="bg-surface-muted" note="Hover, secondary fills" />
              <Swatch token="bg-surface-sunken" className="bg-surface-sunken" note="Wells, code blocks" />
            </SwatchRow>

            <SwatchRow title="Ink">
              <Swatch token="text-ink" className="bg-ink" note="Primary text" />
              <Swatch token="text-ink-muted" className="bg-ink-muted" note="Secondary text" />
              <Swatch token="text-ink-faint" className="bg-ink-faint" note="Labels, metadata" />
              <Swatch token="text-ink-inverted" className="bg-ink-inverted" note="On dark fills" />
            </SwatchRow>

            <SwatchRow title="Lines">
              <Swatch token="border-rule" className="bg-rule" note="Default hairline" />
              <Swatch token="border-rule-strong" className="bg-rule-strong" note="Emphasis, dimensions" />
              <Swatch token="bg-grid" className="bg-grid" note="Drafting grid only" />
            </SwatchRow>

            <SwatchRow title="Brand">
              <Swatch token="bg-brand" className="bg-brand" note="The single accent" />
              <Swatch token="bg-brand-soft" className="bg-brand-soft" note="Tints, active pills" />
              <Swatch token="bg-brand-strong" className="bg-brand-strong" note="Pressed, hover" />
              <Swatch token="text-brand-ink" className="bg-brand-ink" note="Text on brand" />
            </SwatchRow>

            <SwatchRow title="Status and disciplines">
              <Swatch token="text-positive" className="bg-positive" note="Success" />
              <Swatch token="text-critical" className="bg-critical" note="Errors, destructive" />
              <Swatch token="bg-design" className="bg-design" note="Design work" />
              <Swatch token="bg-build" className="bg-build" note="Software work" />
              <Swatch token="bg-break" className="bg-break" note="Security work" />
            </SwatchRow>
          </Block>

          <Block
            part="02"
            name="Typography"
            description="Three faces with fixed jobs. Space Grotesk for display, Inter for prose and interface, JetBrains Mono for anything that would be hand-lettered on a drawing. Display sizes are fluid and need no breakpoint."
          >
            <div className="mb-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-rule bg-surface p-4">
                <TechnicalLabel className="mb-2">font-display</TechnicalLabel>
                <p className="font-display text-heading font-semibold">Space Grotesk</p>
                <p className="mt-1 text-caption text-ink-muted">Headlines, section titles, card titles.</p>
              </div>
              <div className="rounded-md border border-rule bg-surface p-4">
                <TechnicalLabel className="mb-2">font-sans</TechnicalLabel>
                <p className="font-sans text-heading">Inter</p>
                <p className="mt-1 text-caption text-ink-muted">Body copy, interface, form controls.</p>
              </div>
              <div className="rounded-md border border-rule bg-surface p-4">
                <TechnicalLabel className="mb-2">font-mono</TechnicalLabel>
                <p className="font-mono text-heading">JetBrains Mono</p>
                <p className="mt-1 text-caption text-ink-muted">Labels, dates, part numbers, terminal.</p>
              </div>
            </div>

            <div className="rounded-md border border-rule bg-surface px-5">
              <TypeRow token="text-display-xl" sample="font-display font-bold text-display-xl" note="Hero only" />
              <TypeRow token="text-display-lg" sample="font-display font-bold text-display-lg" note="Page titles" />
              <TypeRow token="text-display" sample="font-display font-semibold text-display" note="Major headings" />
              <TypeRow token="text-display-sm" sample="font-display font-semibold text-display-sm" note="Section titles" />
              <TypeRow token="text-heading-lg" sample="font-display font-semibold text-heading-lg" note="Subsections" />
              <TypeRow token="text-heading" sample="font-display font-semibold text-heading" note="Card titles" />
              <TypeRow token="text-heading-sm" sample="font-display font-semibold text-heading-sm" note="Small titles" />
              <TypeRow token="text-body-lg" sample="text-body-lg" note="Lead paragraphs" />
              <TypeRow token="text-body" sample="text-body" note="Default prose" />
              <TypeRow token="text-body-sm" sample="text-body-sm" note="Secondary prose" />
              <TypeRow token="text-caption" sample="text-caption" note="Captions, notes" />
              <TypeRow token="text-label" sample="font-mono text-label uppercase" note="Mono labels" />
            </div>
          </Block>

          <Block part="03" name="Surface and depth" description="Radii stay small so corners read as machined rather than pillowy. Shadows are tight and cool, like paper lifting off a board.">
            {/* Class names are written out in full rather than interpolated:
                Tailwind scans source text, so a constructed class never makes
                it into the stylesheet. */}
            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
              {[
                { token: "rounded-sharp", className: "rounded-sharp" },
                { token: "rounded-sm", className: "rounded-sm" },
                { token: "rounded-md", className: "rounded-md" },
                { token: "rounded-lg", className: "rounded-lg" },
                { token: "rounded-xl", className: "rounded-xl" },
              ].map((radius) => (
                <div key={radius.token} className="flex flex-col gap-2">
                  <div className={`h-16 border border-rule-strong bg-surface ${radius.className}`} />
                  <code className="font-mono text-caption text-ink">{radius.token}</code>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { token: "shadow-lift", className: "shadow-lift" },
                { token: "shadow-card", className: "shadow-card" },
                { token: "shadow-pane", className: "shadow-pane" },
              ].map((shadow) => (
                <div key={shadow.token} className="flex flex-col gap-2">
                  <div className={`h-20 rounded-lg border border-rule bg-surface ${shadow.className}`} />
                  <code className="font-mono text-caption text-ink">{shadow.token}</code>
                </div>
              ))}
            </div>
          </Block>

          <Block
            part="04"
            name="Tilt card"
            description="Point at these with a mouse. The tilt is written straight to the node inside a rAF callback, skips touch pointers entirely, and switches off under prefers-reduced-motion. Tab to the card with a link inside to see the keyboard lift."
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <TiltCard className="p-6">
                <TechnicalLabel className="mb-3">Default</TechnicalLabel>
                <h4 className="font-display text-heading font-semibold">With chrome</h4>
                <p className="mt-2 text-body-sm text-ink-muted">Surface, hairline border and elevation supplied by the component.</p>
              </TiltCard>

              <TiltCard maxTilt={16} hoverScale={1.05} className="p-6">
                <TechnicalLabel className="mb-3">maxTilt 16</TechnicalLabel>
                <h4 className="font-display text-heading font-semibold">Stronger</h4>
                <p className="mt-2 text-body-sm text-ink-muted">Higher tilt and lift. Use sparingly; it gets seasick above about 20.</p>
              </TiltCard>

              <TiltCard glare={false} className="p-6">
                <TechnicalLabel className="mb-3">glare false</TechnicalLabel>
                <h4 className="font-display text-heading font-semibold">No sheen</h4>
                <p className="mt-2 text-body-sm text-ink-muted">
                  For cards already carrying an image.{" "}
                  <a href="#tilt-card" className="text-brand underline underline-offset-4">
                    Focusable link
                  </a>
                  .
                </p>
              </TiltCard>
            </div>
          </Block>

          <Block
            part="05"
            name="Bento grid"
            description="Four columns at lg, two at sm, one on phones. Size hierarchy survives the collapse because large tiles keep their height instead of relying on column spans that have nowhere to go."
          >
            <BentoGrid columns={4}>
              <BentoItem size="lg">
                <TiltCard className="flex h-full flex-col justify-between p-6">
                  <TechnicalLabel tone="brand">size lg</TechnicalLabel>
                  <div>
                    <h4 className="font-display text-heading-lg font-semibold">Feature tile</h4>
                    <p className="mt-2 text-body-sm text-ink-muted">Two wide, two tall. Reserve for the two or three projects you actually want discussed.</p>
                  </div>
                </TiltCard>
              </BentoItem>
              <BentoItem size="sm">
                <TiltCard className="h-full p-5">
                  <TechnicalLabel>size sm</TechnicalLabel>
                  <h4 className="mt-2 font-display text-heading-sm font-semibold">One cell</h4>
                </TiltCard>
              </BentoItem>
              <BentoItem size="tall">
                <TiltCard className="h-full p-5">
                  <TechnicalLabel>size tall</TechnicalLabel>
                  <h4 className="mt-2 font-display text-heading-sm font-semibold">Two tall</h4>
                </TiltCard>
              </BentoItem>
              <BentoItem size="sm">
                <TiltCard className="h-full p-5">
                  <TechnicalLabel>size sm</TechnicalLabel>
                  <h4 className="mt-2 font-display text-heading-sm font-semibold">One cell</h4>
                </TiltCard>
              </BentoItem>
              <BentoItem size="wide">
                <TiltCard className="h-full p-5">
                  <TechnicalLabel>size wide</TechnicalLabel>
                  <h4 className="mt-2 font-display text-heading-sm font-semibold">Full bleed across the grid</h4>
                </TiltCard>
              </BentoItem>
            </BentoGrid>
          </Block>

          <Block part="06" name="Annotation" description="Leader lines, dimension lines and technical labels. All three are decorative and hidden from assistive technology, so never put unique information in them.">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="relative rounded-md border border-rule bg-surface p-6">
                <TechnicalLabel className="mb-4">Leader lines</TechnicalLabel>
                <div className="relative mx-auto h-40 w-40 rounded-md border border-rule-strong bg-surface-muted" />
                <Annotation side="right" className="absolute right-6 top-20">
                  Points right
                </Annotation>
                <Annotation side="left" lineLength="lg" className="absolute left-6 top-32">
                  Points left
                </Annotation>
              </div>

              <div className="rounded-md border border-rule bg-surface p-6">
                <TechnicalLabel className="mb-4">Dimension lines</TechnicalLabel>
                <div className="relative flex h-40 items-center justify-center gap-6">
                  <div className="relative h-32 w-48 rounded-md border border-rule-strong bg-surface-muted">
                    <DimensionLine orientation="horizontal" value="480 px" className="absolute -bottom-5 left-0" />
                    <DimensionLine orientation="vertical" value="320 px" className="absolute -right-5 top-0" />
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-rule bg-surface p-6">
                <TechnicalLabel className="mb-4">Technical labels</TechnicalLabel>
                <div className="flex flex-wrap items-center gap-6">
                  <TechnicalLabel>Muted, default</TechnicalLabel>
                  <TechnicalLabel tone="ink">Ink</TechnicalLabel>
                  <TechnicalLabel tone="brand">Brand</TechnicalLabel>
                  <TechnicalLabel rule tone="brand">
                    With rule
                  </TechnicalLabel>
                </div>
              </div>

              <div className="rounded-md border border-rule bg-surface p-6">
                <TechnicalLabel className="mb-4">Title block</TechnicalLabel>
                <TitleBlock
                  fields={[
                    { label: "Location", value: "Singapore" },
                    { label: "Status", value: "NSF, Singapore Armed Forces" },
                    { label: "Disciplines", value: "Design, software, security" },
                    { label: "Availability", value: "Open to conversations" },
                  ]}
                />
              </div>
            </div>
          </Block>

          <Block part="07" name="Section header" description="The standard heading for a top-level section. The part number is what makes the page read as one drawing rather than a stack of unrelated blocks.">
            <div className="grid gap-10 rounded-md border border-rule bg-surface p-6 lg:grid-cols-2">
              <SectionHeader part="02" eyebrow="Selected works" title="Things I have built" lead="Left aligned, the default. Use this everywhere unless the section is deliberately symmetrical." />
              <SectionHeader part="06" eyebrow="Off the clock" align="center" title="What I do otherwise" lead="Centred. Reserve it for closing sections." />
            </div>
          </Block>

          <Block part="08" name="Form controls" description="The shadcn/ui primitives, remapped onto the system tokens so they inherit the theme instead of carrying their own palette.">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="flex flex-col gap-4 rounded-md border border-rule bg-surface p-6">
                <div className="space-y-1.5">
                  <Label htmlFor="sg-name">Name</Label>
                  <Input id="sg-name" placeholder="Ada Lovelace" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sg-message">Message</Label>
                  <Textarea id="sg-message" rows={3} placeholder="Say hello" />
                </div>
              </div>
              <div className="flex flex-wrap items-start gap-3 rounded-md border border-rule bg-surface p-6">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </Block>

          <Block part="09" name="Drafting grid" description="The grid that sits under the whole site. Masked at the edges so section boundaries do not read as seams.">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="drafting-grid h-40 rounded-md border border-rule" />
              <div className="drafting-grid-fine h-40 rounded-md border border-rule" />
              <div className="drafting-grid h-40 rounded-md border border-rule [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
            </div>
            <div className="mt-3 grid gap-6 text-caption text-ink-faint sm:grid-cols-3">
              <code className="font-mono">.drafting-grid</code>
              <code className="font-mono">.drafting-grid-fine</code>
              <code className="font-mono">+ mask-image</code>
            </div>
          </Block>

          <Block
            part="10"
            name="Motion"
            description="Short, once, and stepped where it is pixel. Entrances play the first time something is seen and never again; the only loops on the site run while a pointer rests on them. prefers-reduced-motion shows every final state immediately."
          >
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <div className="overflow-hidden rounded-md border border-rule bg-surface">
                {motionTokens.map((row) => (
                  <div key={row.token} className="grid gap-1 border-b border-rule px-4 py-3 last:border-b-0 sm:grid-cols-[9rem_11rem_1fr] sm:gap-4">
                    <code className="font-mono text-caption text-ink">{row.token}</code>
                    <code className="font-mono text-caption text-brand">{row.value}</code>
                    <span className="text-caption text-ink-muted">{row.use}</span>
                  </div>
                ))}
              </div>

              <Reveal className="flex flex-col gap-5 rounded-md border border-rule bg-surface p-6">
                <div data-reveal>
                  <TechnicalLabel className="mb-2">DecodeText</TechnicalLabel>
                  <p className="font-mono text-heading-sm uppercase text-ink">
                    <DecodeText text="Locked on target" duration={700} />
                  </p>
                </div>
                <div data-reveal style={stagger(1)}>
                  <TechnicalLabel className="mb-3">data-draw</TechnicalLabel>
                  <span aria-hidden data-draw className="block h-px w-full bg-brand" style={{ "--delay": "200ms" } as React.CSSProperties} />
                </div>
                <div data-reveal style={stagger(2)}>
                  <TechnicalLabel className="mb-2">data-reveal, staggered</TechnicalLabel>
                  <p className="text-body-sm text-ink-muted">Each child rises in turn, one --stagger apart. Scroll away and back: nothing replays.</p>
                </div>
              </Reveal>
            </div>
          </Block>

          <Block
            part="11"
            name="Pixel glyphs"
            description="Drawn by hand on a grid, rendered as crisp squares at whole-pixel scales only. Two tones: ink, and one accent. Frame 0 rests; frame 1 is what the glyph does when hovered. Point at any card."
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {(Object.keys(glyphs) as GlyphName[]).map((name) => {
                const glyph = glyphs[name];
                return (
                  <div key={name} className="glyph-trigger group flex flex-col gap-4 rounded-md border border-rule bg-surface p-4 transition-colors hover:border-rule-strong">
                    <div className="flex h-20 items-center justify-center">
                      <PixelGlyph name={name} px={5} hover={glyphMotion[name]} assemble="view" className="text-ink" />
                    </div>
                    {glyph.frames.length > 1 && (
                      <div className="flex items-center justify-center gap-3 text-ink-muted">
                        <PixelGlyph name={name} px={2} frame={0} />
                        <span aria-hidden className="font-mono text-label text-ink-faint">/</span>
                        <PixelGlyph name={name} px={2} frame={1} />
                      </div>
                    )}
                    <div className="flex items-baseline justify-between gap-2 border-t border-rule pt-3">
                      <code className="font-mono text-caption text-ink">{name}</code>
                      <span className="font-mono text-label uppercase text-ink-faint">
                        {glyph.w}×{glyph.h} · {glyphMotion[name] ?? "static"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Block>

          <Block
            part="12"
            name="Pixel type"
            description="A 5×7 face drawn for the site: A to Z, 0 to 9 and the punctuation it uses. It sets the footer wordmark, and nothing longer than a word or two should ever be set in it."
          >
            <div className="flex flex-col gap-6 overflow-x-auto rounded-md border border-rule bg-surface p-6 text-ink">
              <PixelText text="ABCDEFGHIJKLM" px={4} />
              <PixelText text="NOPQRSTUVWXYZ" px={4} />
              <PixelText text="0123456789 .,-_/:!?'+<>" px={4} />
            </div>
            <div className="mt-6 rounded-md border border-rule bg-surface p-6 text-ink">
              <TechnicalLabel className="mb-4">fluid · drop · interactive</TechnicalLabel>
              <PixelText text="Point here" fluid drop interactive />
            </div>
          </Block>
        </div>
      </DraftingSheet>
    </div>
  );
}
