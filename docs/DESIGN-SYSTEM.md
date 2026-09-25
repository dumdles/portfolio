# Design System — "Technical Drawing"

The working reference for building the rest of dumdles.com.

Everything described here is live. `/styleguide` renders every token and
primitive in both themes and in both accent presets; keep it open in a second
tab while you build, and add to it whenever you add a primitive.

---

## 1. The idea in one paragraph

The site is an annotated schematic of a person. Technical drawing is the one
visual tradition where engineering rigour and design craft are the same
discipline, which means the page can express both without being split in half.
A measured grid, hairline rules, dimension marks, part numbers and monospace
lettering carry the engineering. Large expressive display type, generous
whitespace and restraint with colour carry the design. Nobody has to be told
which half is which.

---

## 2. Principles

**One accent, used sparingly.** Paper, ink, and a single brand colour. If
something needs to stand out and the accent is already spoken for on that
screen, the answer is hierarchy or whitespace, not a second hue. The rainbow
tiles inherited from the old site are the one deliberate exception, confined to
the hobbies section where the playfulness is the point.

**Labels are monospace, prose is not.** Anything that would be hand-lettered on
a drawing, meaning part numbers, dates, measurements, field names and
categories, is mono and uppercase. Anything a person reads as a sentence is
not. This single rule does most of the work of making the page feel drafted.

**The grid is visible, and occasionally broken.** A faint drafting grid sits
under the page. Sections align to it. Break it on purpose once or twice per
page, because a grid that is never broken reads as generated rather than
designed.

**Corners are machined, not pillowy.** The largest radius in the system is
16px, and most surfaces use 6 or 10. `rounded-3xl` is deliberately absent.

**Dark mode is a different material, not an inversion.** Light mode is warm
drafting paper with near-black ink. Dark mode is a deep blue-black viewport
where the accent reads as emitted light. Both are designed; neither is a filter
applied to the other.

**Motion is optional.** Everything that moves checks `prefers-reduced-motion`,
at the CSS level in `globals.css` and again in JavaScript through
`useReducedMotion` for anything that animates imperatively.

---

## 3. Where things live

```
src/
  app/
    globals.css            all design tokens, base styles, utilities
    layout.tsx             fonts, metadata, theme provider
    page.tsx               the spine: which sections, in what order
    projects/[slug]/       case study pages, one per file in content/case-studies
    styleguide/page.tsx    the rendered reference
  components/
    primitives/            the design system
      tilt-card.tsx
      bento-grid.tsx
      section-header.tsx
      technical-label.tsx
      annotation.tsx       Annotation + DimensionLine
      title-block.tsx
      drafting-sheet.tsx
      chip.tsx             Chip + DisciplineMarker
      reveal.tsx           scroll entrance trigger
      decode-text.tsx      mono text that locks on out of noise
      pixel-glyph.tsx      hand-drawn pixel glyphs
      pixel-text.tsx       the 5x7 pixel face
      index.ts             import from here
    sections/              one file per numbered section, plus the footer
    case-study/            the section kinds a case study is built from
    ui/                    shadcn/ui, remapped onto system tokens
    theme-provider.tsx
    theme-toggle.tsx
  content/                 all copy and data; no prose lives in a component
    profile.ts             hero copy and the title block
    projects.ts            the works index
    timeline.ts            education, work and service, with what
                           happened at each school
    hobbies.ts             the off-the-clock cards
    case-studies/          one file per case study, plus the shared types
  hooks/
    use-reduced-motion.ts
    use-in-view.ts
  lib/
    utils.ts               cn(), with the type scale registered
    motion.ts              stagger(), callable from server components
    pixel/
      glyphs.ts            glyph bitmaps
      font.ts              the 5x7 face
```

Import primitives from the barrel, not from individual files:

```tsx
import { TiltCard, BentoGrid, BentoItem, SectionHeader } from "@/components/primitives";
```

Content stays out of components. Changing what the site says should mean
editing `content/`, never JSX. Adding a project is one object in an array, and
adding a timeline entry is the same.

---

## 4. Colour

Tokens are declared once in `globals.css` and resolve per theme. **Never reach
past them into raw Tailwind palette colours** such as `bg-slate-900` or
`text-gray-600`. That is what the old site did, and it is why dark mode drifted
out of sync across sections.

### Surfaces

| Token | Utility | Use for |
|---|---|---|
| `--paper` | `bg-paper` | The page itself |
| `--surface` | `bg-surface` | Cards, panes, anything lifted off the page |
| `--surface-muted` | `bg-surface-muted` | Hover states, secondary fills, chips |
| `--surface-sunken` | `bg-surface-sunken` | Wells, code blocks, terminal panes |

### Ink

| Token | Utility | Use for |
|---|---|---|
| `--ink` | `text-ink` | Primary text, headings |
| `--ink-muted` | `text-ink-muted` | Body copy that supports, lead paragraphs |
| `--ink-faint` | `text-ink-faint` | Labels, metadata, captions |
| `--ink-inverted` | `text-ink-inverted` | Text on a dark fill in light mode |

### Lines

| Token | Utility | Use for |
|---|---|---|
| `--rule` | `border-rule` | The default hairline. Applied to `*` in base. |
| `--rule-strong` | `border-rule-strong` | Emphasis, dimension lines, hover borders |
| `--grid` | — | The drafting grid only. Do not use as a border. |

### Brand

Named `brand` rather than `accent` because shadcn/ui already owns `--accent`
for its muted hover surfaces. Renaming shadcn's token would have meant patching
every `ui/` component on every future update.

| Token | Utility | Use for |
|---|---|---|
| `--brand` | `bg-brand` `text-brand` `border-brand` | The accent |
| `--brand-soft` | `bg-brand-soft` | Tints, active pills, the navbar bubble |
| `--brand-strong` | `bg-brand-strong` | Hover and pressed states on brand fills |
| `--brand-ink` | `text-brand-ink` | Text placed on top of `bg-brand` |

### Status and disciplines

`text-positive` and `text-critical` for form feedback and destructive actions.

`bg-design`, `bg-build`, `bg-break` mark the three strands of work. They exist
so a grid of project tiles shows the mix across design, software and security
without the reader parsing a single word. Use them as small markers, never as
large fills.

### The accent is signal blue

Settled. A saturated, slightly warm blue rather than the muted cyan of a
photographic blueprint. It still reads as drafting ink, but carries enough
chroma to work as a signal colour on a single small element.

In the dark theme it is lifted and keeps its chroma, so it reads as emitted
light rather than paint. A desaturated blue on a dark ground goes grey and
stops signalling anything.

The two swappable presets and the styleguide's accent switcher are gone. To
change the accent now, edit four variables in `:root` and four in `.dark`.
Nothing else in the codebase names a blue.

---

## 5. Typography

Three faces, each with one job. Mixing them up is the fastest way to break the
look.

| Family | Variable | Utility | Job |
|---|---|---|---|
| Space Grotesk | `--font-space-grotesk` | `font-display` | Headlines, section and card titles |
| Inter | `--font-inter` | `font-sans` | Body copy, interface, form controls |
| JetBrains Mono | `--font-jetbrains-mono` | `font-mono` | Labels, dates, part numbers, terminal |

Mono carries `font-variant-numeric: tabular-nums` from the base layer, so
columns of dates and figures align without extra work.

### Scale

Display sizes are fluid via `clamp()` and need no responsive variants. Write
`text-display-lg`, not `text-4xl md:text-6xl lg:text-7xl`.

| Token | Use for |
|---|---|
| `text-display-xl` | The hero, once per site |
| `text-display-lg` | Page titles |
| `text-display` | Major headings |
| `text-display-sm` | Section titles (what `SectionHeader` uses) |
| `text-heading-lg` | Subsection headings |
| `text-heading` | Card titles |
| `text-heading-sm` | Small titles, list item headings |
| `text-body-lg` | Lead paragraphs |
| `text-body` | Default prose |
| `text-body-sm` | Secondary prose, captions in cards |
| `text-caption` | Notes, metadata |
| `text-label` | Mono labels. Pair with `font-mono uppercase`. |

Headings carry negative tracking at the display sizes; that is baked into the
tokens, so do not add `tracking-tight` on top.

**Adding a size token.** Register it in `src/lib/utils.ts` as well as in
`globals.css`. `cn()` runs classes through tailwind-merge, which does not
read the theme. Until September 2026 it took `text-label` for a text colour
and dropped it whenever a colour class followed, so every `TechnicalLabel`,
section lead and card title rendered at the wrong size. Any new size it does
not know about will be dropped the same way.

`SectionHeader` sets its part number and eyebrow at `text-body-sm` with
`0.08em` tracking. At `text-label` they are too faint beside a display
heading.

---

## 6. Space and depth

The drafting grid unit is `--grid-unit`, 8px. Section padding, card padding and
gaps are all multiples of 4px via Tailwind's default spacing scale, which lines
up with the grid at every even step.

Standard section shell, supplied by `DraftingSheet`:

```
max-w-6xl  px-4 sm:px-6 lg:px-8  py-20 sm:py-28
```

### Radii

`rounded-sharp` (2px), `rounded-sm` (4px), `rounded-md` (6px), `rounded-lg`
(10px), `rounded-xl` (16px). Cards use `rounded-lg`. Controls and small chips
use `rounded-md` or `rounded-sm`.

### Elevation

`shadow-lift` for resting cards, `shadow-card` for hover and for anything that
should feel picked up, `shadow-pane` for overlays and the largest surfaces.
Shadows are tight and cool, tinted through `--shadow-tint`, which is
substantially darker in the dark theme so elevation survives on a dark ground.

---

## 7. Primitives

### `TiltCard`

The 3D hover card, kept from the old site and rebuilt. It replaces the two
near-identical copies that lived in `ExperienceSection` and `HobbiesSection`.

```tsx
<TiltCard className="p-6">
  <TechnicalLabel>01</TechnicalLabel>
  <h3 className="font-display text-heading font-semibold">Project name</h3>
</TiltCard>
```

| Prop | Default | Notes |
|---|---|---|
| `maxTilt` | `9` | Degrees at the card edge. Above ~20 it gets seasick. |
| `hoverScale` | `1.02` | Set to `1` to disable the lift. |
| `glare` | `true` | Cursor-following sheen. Turn off on image cards. |
| `chrome` | `true` | Surface, hairline border and elevation. Turn off to supply your own. |

Four things differ from the original implementation, and they are the reason
not to hand-roll this again:

1. The transform is written straight to the DOM node inside a
   `requestAnimationFrame` callback. The original called `setState` on every
   `mousemove`, re-rendering the subtree continuously while the cursor moved.
2. Only mouse pointers tilt. On touch, `pointermove` fires once on tap and left
   the original stuck at an angle with no way to reset it.
3. `prefers-reduced-motion` disables the tilt and the sheen.
4. Keyboard focus inside the card produces a visible lift, so the card is not
   inert to anyone not using a mouse.

**Never put a pixel glyph inside a `TiltCard`.** While the card tilts, the
browser draws it to a bitmap and resamples that bitmap every frame, the same
as any 3D-transformed layer. Pixel art does not survive resampling: a works
tile watermark went from 3 colours at rest to about 1,860 mid-tilt. Render
the glyph as an absolutely positioned sibling of the card inside the
`BentoItem`, and hold its space inside the card with a spacer if the layout
needs it. `works-section.tsx` and `hobbies-section.tsx` show the pattern.

### `BentoGrid` and `BentoItem`

```tsx
<BentoGrid columns={4}>
  <BentoItem size="lg">…</BentoItem>
  <BentoItem size="sm">…</BentoItem>
</BentoGrid>
```

One column on phones, two at `sm`, `columns` at `lg` (3, 4 or 6).

Sizes: `sm` (one cell), `md` (two wide), `lg` (two wide and two tall),
`tall` (two tall), `wide` (full bleed).

Size hierarchy survives the collapse to one column because large tiles keep
their minimum height rather than relying on column spans, which have nowhere to
go at 360px wide. This is the part of bento layouts that usually breaks, so
check any new tile at phone width before considering it done.

### `SectionHeader`

```tsx
<SectionHeader
  part="02"
  eyebrow="Selected works"
  title="Things I have built"
  lead="One or two sentences."
/>
```

Every top-level section gets one, with its part number from the information
architecture in `PLAN.md`. The numbers are what make the page read as one
drawing. They are decorative and hidden from assistive technology, so the
heading text has to carry the meaning on its own.

Use `as="h1"` only for the single main heading on a page.

### `TechnicalLabel`

The smallest unit of annotation: mono, uppercase, wide tracking. Tones are
`muted` (default), `ink` and `brand`. `rule` draws a short leader line before
the text. Never use it for prose.

### `Annotation` and `DimensionLine`

Callouts with leader lines, and measurement marks with end ticks. Both are
positioned by the consumer with absolute utilities; the components own the
lettering and the lines, not the placement.

Both are decorative and hidden from assistive technology. **Never put
information in them that appears nowhere else on the page.**

### `TitleBlock`

The bordered field-and-value table from the corner of a drawing. Renders as a
definition list, so it reads correctly to a screen reader. Use it for the hero
status block and for case study metadata such as role, stack and dates.

### `Chip` and `DisciplineMarker`

`Chip` is a filter toggle, rendered as a real button with `aria-pressed` so
keyboard and screen reader users get the state without extra work. It takes an
optional `count`.

`DisciplineMarker` is a coloured dot plus a label, marking a piece of work as
design, build or break. It exists so a grid of project tiles shows the spread
across the three disciplines at a glance, with no prose to read. Use it small;
the discipline colours are markers, never fills.

### `DraftingSheet`

The standard section wrapper. Supplies the drafting grid in its own masked
layer plus the contained width and padding.

```tsx
<DraftingSheet grid="top">
  <SectionHeader … />
</DraftingSheet>
```

`grid` is `full`, `top` or `none`. The mask matters: without it the grid stops
at a hard line at the section boundary and reads as a seam rather than as one
continuous sheet. Set `contained={false}` for full-bleed layouts.

---

## 8. Motion

Motion on this site is a craft, not a garnish. Four rules, in order:

1. **Short.** Nothing that responds to the visitor takes longer than
   `--dur-base` (440ms). Only one-time entrances may use `--dur-slow` (780ms).
2. **Once.** Entrances play the first time something is seen and never again.
   The only loops run while a pointer rests on the thing that loops. A scroll
   cue bobs three times, a live marker pulses three times, and both then rest.
3. **Pixel things step; drawn things curve.** Pixel glyphs and pixel type use
   `steps()` timing so they snap like sprite frames. Lines, cards and type
   use `--ease-out-expo`, so they land hard and settle.
4. **The OS setting wins.** Under `prefers-reduced-motion` every final state
   is shown immediately, with no exceptions.

### Tokens

| Token | Value | Use for |
|---|---|---|
| `--dur-snap` | 140ms | Colour and opacity responses to hover |
| `--dur-quick` | 260ms | Pixel pops, crop marks, small snaps |
| `--dur-base` | 440ms | Text and cards rising into place |
| `--dur-slow` | 780ms | One-time entrances: rules drawing, the portrait scan |
| `--ease-out-expo` | `cubic-bezier(.16, 1, .3, 1)` | Anything drawn |
| `--ease-in-out-crisp` | `cubic-bezier(.65, 0, .35, 1)` | The scan, which accelerates and brakes |
| `--stagger` | 70ms | Gap between siblings in a staggered entrance |

### Scroll entrances

Wrap a small group in `<Reveal>`. When it enters the viewport it sets
`data-inview`, and descendants opt in with attributes:

```tsx
<Reveal className="grid gap-4">
  {items.map((item, i) => (
    <div key={item.id} data-reveal style={stagger(i)}>…</div>
  ))}
</Reveal>
```

- `data-reveal` rises 14px into place. `data-reveal="fade"` only fades.
- `data-draw` draws a rule in from the left.
- `stagger(i)` sets the index that spaces siblings one `--stagger` apart.

Keep Reveals small and local. Everything marked inside one plays the moment
it is seen, so a Reveal around a whole long section would play entrances for
content still far below the fold.

`SectionHeader` is already its own trigger: its label decodes, its rule
draws, and its title and lead rise. Every section gets that entrance for free.

**Nothing is ever hidden by a stylesheet alone.** An inline script in
`layout.tsx` sets `data-js` on `<html>` before first paint, and the hidden
starting states only apply under that attribute. With JavaScript off the
page is simply static and complete. This is verified, not assumed: the
check counts hidden elements with scripts disabled, and under reduced
motion, and both must be zero.

### Load choreography

The hero plays on first paint without waiting for hydration, so its timing
is pure CSS. The `intro-*` classes (`intro-rise`, `intro-mask-rise`,
`intro-fade`, `intro-draw-x`, `intro-draw-y`, `intro-scan`,
`intro-scanline`, `intro-snap`) each read their own `--delay`. The full
sequence is written out at the top of `hero-section.tsx`; it lands in about
a second and then stays still.

### `DecodeText`

Mono text that resolves out of noise, left to right, like a readout locking
on. The site's nod to security work. **Labels only**: part numbers, eyebrows,
title block field names. Never prose, never display type, where varying glyph
widths would make the line jitter. The noise is ASCII, so every frame stays
in the loaded font subset, and ligatures are switched off so `>=` never
collapses into one glyph mid-animation. The real text is always present for
assistive technology.

---

## 9. The pixel system

A small, deliberate counterpoint to the drafting language: hand-drawn pixel
glyphs and a pixel typeface. Used sparingly, where a touch of play earns its
place.

### `PixelGlyph`

```tsx
<PixelGlyph name="break" px={3} accent="var(--break)" hover="swap" assemble="view" />
```

| Prop | Notes |
|---|---|
| `name` | A glyph from `src/lib/pixel/glyphs.ts`. |
| `px` | Screen pixels per glyph pixel. **Whole numbers only**; pixel art at a fractional scale smears. |
| `accent` | Colour for accent pixels. Ink pixels use `currentColor`. |
| `assemble` | `"view"` sweeps the pixels in diagonally when scrolled into view; `"intro"` does it on first paint, for the hero. |
| `hover` | `"swap"` shows frame 1 while hovered (a lock opening). `"loop"` alternates both frames (a heart beating). |
| `frame` | Show one frame statically, for specimen sheets. |

Hover is triggered by the nearest ancestor with the `glyph-trigger` class,
so a whole card or a whole word can wake its glyph.

### The glyphs

| Glyph | Size | On hover |
|---|---|---|
| `design` | 12×12 | Selection marquee; the ants march |
| `build` | 12×12 | `</>`; the slash becomes a typed cursor |
| `break` | 12×12 | Padlock; it opens |
| `monogram` | 8×7 | The site mark; its cursor blinks |
| `nib` | 11×12 | Pen nib; it drips ink |
| `camera` | 12×12 | Camera; the flash fires |
| `bike` | 14×8 | Bicycle; spokes turn and pedals cycle |
| `guitar` | 12×14 | Guitar; a note sounds |
| `network` | 12×11 | Three connected nodes; they ping |
| `heart` | 11×9 | Heart; it beats |
| `arrowDown` | 7×8 | Static. The scroll cue |

**Drawing a new glyph.** Add it to `glyphs.ts` as rows of characters: `#`
for ink, `+` for accent, `.` for empty. Every row in a frame must be the same
width. Two tones only. Design it at the size it will be seen, then check it
at `px` 2 and 5 on `/styleguide`; the nib and the guitar were both redrawn
after they read as a shield and a bottle at card size.

### `PixelText`

The site's 5×7 face, from `src/lib/pixel/font.ts`: A to Z, 0 to 9 and the
punctuation it uses. It sets the footer wordmark. Nothing longer than a word
or two belongs in it.

- `drop` makes pixels fall into place column by column, bottom row first.
- `interactive` lights pixels near the pointer in the brand colour.
- `fluid` scales to the container. Fluid text gets an even gap between
  cells, because fractional scaling otherwise leaves uneven hairline seams;
  the gap turns that flaw into an LED matrix.

### Where the pixel system appears

The two verbs in the hero line and the discipline legend under it, each
works tile's watermark, the hobby cards, the navbar mark, the scroll cue, and
the footer wordmark. That list is the budget. Adding a glyph elsewhere should mean removing one.

---

## 10. Case studies

A project with a write-up has a data file in `src/content/case-studies/`,
registered in its `index.ts`, and a `href` on its entry in
`content/projects.ts`. The route `projects/[slug]` is generated statically
from that list, and any other slug is a 404.

A case study is a lead, a title block and a list of typed sections. Each
section gets a `DraftingSheet` and a `SectionHeader` lettered A, B, C, and
its `kind` picks the component that draws it:

| Kind | Component | For |
|---|---|---|
| `prose` | `Prose` | Paragraphs. The first sets in ink, the rest muted. |
| `list` | `List` | Short parallel facts, two columns from `md`. |
| `system` | `SystemDiagram` | An architecture drawing with a parts list. |
| `flow` | `Flow` | Numbered steps in a row. Steps marked `offline` get a hatched band behind them. |
| `anatomy` | `Anatomy` | A code or identifier, dimensioned segment by segment. |
| `contributions` | `Contributions` | Prose beside commit-share bars. |
| `milestones` | `Milestones` | Dated entries on a spine. |

### `SystemDiagram`

An SVG drawn in the diagram's own coordinates (RMAP's is 1080 by 620). Zones
are dashed boundaries labelled top right, so the balloons never cover them.
Nodes are boxes with a numbered balloon at the top-left corner. Edges are
lists of orthogonal points, drawn with `pathLength="1"` so every edge plots
in over the same time whatever its length.

- On first view the zones and nodes fade in, then the edges draw in the
  order they are listed. List them in the order a request travels.
- Hovering a node, in the drawing or in the parts list, lights its edges and
  sends a packet along each, running away from the hovered node. Everything
  else dims. Packets exist only while something is hovered, and never under
  reduced motion.
- The dimming sits on an outer `<g>` and the entrance on an inner one.
  Putting both on one element lets the entrance's `animation-fill-mode`
  override the dim.
- Below `min-w-[760px]` the drawing scrolls sideways. The parts list under it
  carries the same information as text, and the SVG is `aria-hidden`.

Keep node boxes at 150 by 52 unless there is a reason. The label and the mono
sub-label are placed for that height; at 44 they collide.

### Confidentiality

This repository is public. A case study about a client's system names no
host, endpoint, table, secret or teammate, and says so in its `notice`.
Every claim should trace to a source listed in the data file's header
comment.

---

## 11. Theming

`next-themes` writes `class="dark"` onto `<html>`, which is what the `dark`
variant in `globals.css` matches. It also injects a blocking inline script that
applies the stored theme before first paint, so there is no flash of the wrong
theme. That script is why `<html>` carries `suppressHydrationWarning`.

The default is `system`. `ThemeToggle` is a three-state control rather than a
switch, because a two-state toggle cannot express "follow the OS", which is
both the default and what most visitors want.

Anything whose rendering depends on the resolved theme must wait for mount, or
it will produce a hydration mismatch. `ThemeToggle` shows the pattern: render a
neutral, non-interactive state of the same size until mounted, so the layout
does not shift when it becomes live.

---

## 12. Rules of thumb

**Do**

- Reach for a primitive before writing a new component.
- Use tokens for every colour, including one-off decorative elements.
- Use `font-mono uppercase` with `text-label` for anything that is a label.
- Check new layouts at 360px before considering them done.
- Add anything new to `/styleguide` in the same commit.
- Strip metadata from every photo before it goes in `public/`. The raw file
  is downloadable at its own URL, and Next.js only strips metadata from the
  optimised copies. See the note under Known rough edges.

**Do not**

- Use raw Tailwind palette colours outside the hobbies tiles.
- Add a second accent hue.
- Write responsive variants for display type; the tokens are already fluid.
- Animate without checking `prefers-reduced-motion`.
- Loop anything that is not under the pointer.
- Hide content with CSS that does not also check for `data-js`.
- Use a fractional `px` on a pixel glyph, or put one inside a `TiltCard`.
- Put unique information inside an `Annotation` or a `DimensionLine`.
- Reintroduce per-section background colours. Sections sit on `bg-paper` and
  differentiate through the grid, spacing and content.

---

## 13. What is not built yet

Phases 3 onward in `PLAN.md`. In rough dependency order:

- **Project content.** Only one entry in `content/projects.ts` is real. The
  rest are labelled open slots, deliberately not filled with invented work.
- **More case studies.** RMAP is the only one. The route and components are
  built; each new study is a data file.
- **02 Craft**, the visual work gallery. Needs six to nine strong images.
- **04 Security**, the terminal pane. Needs a terminal primitive.
- **05 Toolbelt**, a bento of tools grouped by discipline.
- **A contact form.** The old one showed "Message sent" and discarded the
  message, so it was removed. Contact is LinkedIn and GitHub until there is a
  backend that delivers.
- **Command palette**, page transitions, generated OG images.

One primitive is deliberately missing until there is a use for it: the
terminal pane the Security section needs. Build it when that section lands,
then document it here.

### Known rough edges

- **Photos in git history still carry metadata.** Every image in
  `public/images` was re-encoded without EXIF. One of the originals included
  GPS coordinates, and those originals remain in this repository's history
  and in any build deployed before the change. Removing them from history
  means rewriting it, which is the repository owner's decision.

- `next lint` is deprecated in Next 15.5 and removed in 16. The `lint` script
  needs migrating to the ESLint CLI.
- One critical advisory remains in `tar`, reached only through
  `@tailwindcss/postcss`. It is a devDependency and does not ship, but it
  should be cleared when Tailwind is next bumped.
