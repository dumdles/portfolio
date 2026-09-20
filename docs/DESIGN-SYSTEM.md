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
      index.ts             import from here
    ui/                    shadcn/ui, remapped onto system tokens
    theme-provider.tsx
    theme-toggle.tsx
  hooks/
    use-reduced-motion.ts
```

Import primitives from the barrel, not from individual files:

```tsx
import { TiltCard, BentoGrid, BentoItem, SectionHeader } from "@/components/primitives";
```

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

### Changing the accent

The entire site's accent is four variables. Two complete presets ship in
`globals.css`:

- **blueprint** (default) — cyan-blue ink. Reads engineering.
- **signal** — saturated orange. Reads design studio.

Switch between them live on `/styleguide` using the control in the header,
which sets `data-accent` on `<html>`. Compare both against real components in
both themes before deciding.

Once decided, move the chosen values into `:root` and `.dark` directly and
delete the preset blocks and `AccentSwitcher`. The presets are a decision aid,
not a visitor-facing feature.

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

## 8. Theming

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

## 9. Rules of thumb

**Do**

- Reach for a primitive before writing a new component.
- Use tokens for every colour, including one-off decorative elements.
- Use `font-mono uppercase` with `text-label` for anything that is a label.
- Check new layouts at 360px before considering them done.
- Add anything new to `/styleguide` in the same commit.

**Do not**

- Use raw Tailwind palette colours outside the hobbies tiles.
- Add a second accent hue.
- Write responsive variants for display type; the tokens are already fluid.
- Animate without checking `prefers-reduced-motion`.
- Put unique information inside an `Annotation` or a `DimensionLine`.
- Reintroduce per-section background colours. Sections sit on `bg-paper` and
  differentiate through the grid, spacing and content.

---

## 10. What is not built yet

Phases 2 onward in `PLAN.md`. In rough dependency order:

- Rebuild Hero, Works index and Timeline in the new language.
- Project content model, MDX pipeline and case study routes.
- Craft gallery, Security terminal pane, Toolbelt bento, Colophon.
- A real contact backend. The form currently discards the message.
- Command palette, page transitions, generated OG images.

Two primitives are deliberately missing until there is a real use for them: a
terminal pane, which the Security section needs, and a filter chip row, which
the Timeline needs. Build them when those sections land, then document them
here.
