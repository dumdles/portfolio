# Portfolio Rework — Brainstorm & Plan

Working notes for rebuilding dumdles.com. Nothing here is code yet; this is the
direction, the information architecture, and the build order.

---

## 1. The problem with the current site

The existing site is not bad, it is unfinished and undecided. Reading through it,
three things stand out.

**There is no point of view.** The hero says "Creative Developer" on a neutral grey
page. Every section invents its own background colour (`bg-neutral-100`,
`bg-white`, `bg-slate-800`, a blue-purple gradient) and its own card treatment.
The rainbow bento tiles, the sticky project stack, and the glass navbar are three
different design languages sitting next to each other. Individually each one is
fine. Together they read as a tour of Tailwind rather than a portfolio.

**The two halves of you are invisible.** Nothing on the page tells a visitor that
you do graphic and UI design, or that you do security. The Journey section lists a
Certificate in Design & Media as a subtitle and that is the entire signal. For a
portfolio whose whole thesis is "engineering and design in one", the site has to
*perform* that thesis, not mention it.

**The scaffolding is load-bearing but incomplete.** Dark mode is the clearest
example: `globals.css` defines a full `.dark` token set and every component is
painstakingly dual-styled, but nothing ever puts the `dark` class on the document.
All that work is currently dead code. Same story for the contact form, which
simulates a network call with `setTimeout` and throws the message away.

The good news is that the two things you want to keep, the 3D tilt cards and the
bento layout, are the most finished parts of the codebase. The tilt logic in
`ExperienceSection.tsx` is solid. It just needs to be extracted, made accessible,
and applied with restraint instead of on every surface at once.

### Concrete defects found

These are real bugs, not taste. Listing them here so they get fixed rather than
carried forward.

| Issue | Where | Effect |
|---|---|---|
| Dark mode never activates | No theme provider anywhere | Every `dark:` class in the codebase is unreachable |
| Image extension case mismatch | `HobbiesSection.tsx` references `.jpg`, files are `.JPG` | 4 of 6 hobby images 404 on Linux hosting; works locally on macOS only |
| `--font-sans` points at `--font-geist-sans` | `globals.css` | Font variable is never defined; Inter loads as `--font-inter` and the token silently falls through |
| `ExperienceSection.tsx` duplicated | `app/experience/page.tsx` | Two copies of the same 170 lines drift apart |
| Legacy `layout="fill"` / `objectFit` props | Hero, Hobbies | Deprecated in Next 13+, warns in console |
| `<img>` with placeholder fallback | `ProjectCard.tsx` | Skips Next image optimisation entirely |
| Duplicate scroll listener | `page.tsx` computes `isScrolled`, never uses it; `Navbar` computes it again | Dead state and a redundant listener |
| Metadata is the template default | `layout.tsx` | Title reads "My Porfolio" (typo), no OG image, no favicon strategy |
| Scroll handlers unthrottled | Hero, Navbar | `setState` on every scroll event, forces layout reads in `Navbar` |
| No contact backend | `ContactSection.tsx` | Form pretends to succeed and discards the message |

---

## 2. Direction

The brief is "artistic, engineering and design in one". The trap is splitting the
site in half, a design side and an engineering side, and making the visitor
choose. That doubles the work and communicates the opposite of what you want: it
says the two things are separate.

The stronger move is a single visual language that is *natively* both.

### Recommended: Technical Drawing

Build the site as an annotated schematic of yourself.

Technical drawing is the one visual tradition where engineering rigour and design
craft are the same discipline. Blueprints, circuit diagrams, exploded views, and
type specimen sheets all share a grammar: a measured grid, hairline rules,
dimension marks with arrowheads, callout labels in monospace, part numbers,
revision stamps, and a title block in the corner. It is precise and it is
beautiful, and nobody has to be told which half is which.

How it reads in practice:

- **The grid is visible.** A faint drafting grid sits under the whole page.
  Sections align to it. Occasionally an element deliberately breaks it, which is
  what makes it feel designed rather than generated.
- **Everything is labelled.** Section headers carry a part number (`01 — INDEX`,
  `02 — WORKS`). Project cards have a revision stamp. Your photo has a dimension
  line running down the side with your height on it, or a leader line pointing at
  something with a deadpan annotation.
- **Type does the heavy lifting.** A high-contrast display serif or a wide grotesk
  for headlines, set large. Monospace for every label, number, date, and
  annotation. The contrast between the two *is* the design/engineering duality,
  expressed typographically instead of structurally.
- **Colour is scarce.** Paper and ink, plus exactly one accent. Light mode is
  drafting paper: warm off-white, near-black ink, a single saturated accent
  (cyan-blue reads as blueprint; a signal orange reads more design-studio).
  Dark mode is not "the same page inverted", it is a different material:
  deep blue-black with the accent glowing slightly, the way a CAD viewport or a
  terminal does.
- **The terminal earns its place.** Rather than theming the entire site as a
  shell, the terminal appears as one instrument inside the schematic: the
  security section is a terminal pane, and the command palette is its front door.
  A boot sequence on the whole site is a gimmick that wears off in four seconds
  and, worse, tells a design recruiter you are a backend person.

This direction absorbs what you liked about kairostay.com without copying it, and
it gives the 3D tilt cards and bento boxes a reason to exist: the bento becomes a
component layout sheet, and the tilt becomes the gentle parallax of a card lifting
off the drafting board.

### Alternatives considered

**Terminal-first.** Whole site as an SSH session, content revealed by typed
commands. Closest to kairostay. Rejected as the primary frame: it is a strong
signal for security and a weak one for design, it fights accessibility, it is
hostile on mobile, and it is now a well-worn genre. Keep the idea, demote it to
one section plus the command palette.

**Editorial / gallery.** Swiss-grid art direction, huge type, generous whitespace,
projects as magazine spreads. Beautiful and very design-forward, but on its own it
reads as a designer who also codes, which undersells the engineering and says
nothing about security. Its typography discipline should be absorbed into the
recommended direction.

**Two-mode toggle.** A literal switch flipping between "Design" and "Engineering"
presentations of the same content. Memorable, and genuinely the most "artistic"
option, but it is roughly twice the build, twice the maintenance, and it argues
that your two interests are in tension. Worth revisiting as a v2 easter egg in the
command palette, not as the v1 architecture.

---

## 3. Information architecture

Your four required sections plus what I would add. Ordered for a first-time
visitor who will give the site about forty seconds.

### The spine

**00 — Index (hero).** Name, a one-line positioning statement that says all three
things without listing them like a résumé, and the title block: location
(Singapore), current status (NSF, Singapore Armed Forces), and availability. One
primary action, which is the command palette hint, not a "Hire me" button.

The positioning line matters more than any visual here. Something in the register
of "I design the thing, build the thing, then try to break it." Say the three
disciplines as one sentence rather than three badges.

**01 — Selected works (projects).** The most important section, so it goes
straight after the hero rather than after the biography. Reasoning in §4.

**02 — Craft.** A visual-only section for graphic and UI work: posters, brand
marks, interface explorations, the publications work from the EEE Club. This is
the section that makes the design claim credible, and the current site has no
equivalent. Projects prove you ship; craft proves you have taste. Keep it nearly
wordless, let the images carry it.

**03 — Timeline (education + work, merged).** Your existing `JourneySection` is
already the right shape. Merging education and experience into one chronological
spine is better than two lists because it shows the overlap: polytechnic and the
AC Tesla internship and the club leadership roles were all happening at once, and
that is a more interesting story than either column alone. Filter chips let a
visitor isolate Education, Work, or Leadership.

**04 — Security.** Your differentiator, and currently absent. CTF writeups, Hack
The Box or TryHackMe progress, any disclosures, the tooling you reach for.
Presented as the terminal pane. If you do not yet have enough to fill it, it works
as a smaller "currently learning" block rather than being faked.

**05 — Toolbelt.** The bento box home. Languages, frameworks, design tools,
security tools, hardware. Grouped by discipline so the three-way split is visible
at a glance. This is where the rainbow tiles from the current Hobbies section can
live on, tuned down to the new palette.

**06 — Off the clock (hobbies).** Keep it, keep the tone, keep the images. Move it
late; it is a closer, not an opener. The current headline ("I promise I'm not a
boring person...") is the best copy on the site. Keep that voice everywhere else.

**07 — Contact.** Real form with a real backend, plus direct email, LinkedIn, and
GitHub. Add a résumé download.

**Colophon (footer).** How the site is built, what type is set in, what the
palette is, build hash, last deployed. Unusually effective for your exact
positioning: it is a design convention that only an engineer can populate.

### Worth adding later

- **`/uses`** — hardware, software, dotfiles, desk. Cheap to write, gets shared.
- **`/now`** — what you are working on this month. One paragraph, keeps the site
  from going stale while you are serving NS.
- **Writing / lab** — short technical or design notes. Only commit to this if you
  will actually write; a blog with two posts from last year is worse than no blog.
- **Playground** — WebGL toys, shader experiments, CSS oddities. Useful pressure
  valve for the "artistic" impulse so it does not leak into the main pages.
- **Certifications & awards** — as a strip in the timeline, not its own page.

### Cut

The standalone `/experience` route duplicating the experience section. One home
for each piece of content.

---

## 4. Why projects go before biography

A visitor arriving from LinkedIn or a job application wants evidence, quickly.
Education and work history answer "is this person qualified", which is a question
they ask second. Work samples answer "is this person good", which is the question
they actually came with. Leading with the timeline also puts your weakest material
first: as a recent graduate the résumé is thin by definition, while the project
work is where you can compete with anyone.

The current site opens with Journey for a reasonable-feeling narrative arc, but it
spends the visitor's most valuable ten seconds on a list of school names.

---

## 5. Projects, specifically

This is where the current site is furthest from done. Four placeholder cards named
Alpha through Delta, each with a paragraph of lorem, stacked with a sticky-scroll
effect.

The sticky stack is a nice effect with a real cost: it forces one project per
viewport, gives every project identical weight, and makes it impossible to scan.
Above four or five projects it becomes a chore.

**Proposal: a bento index, then dedicated case study pages.**

The index is an asymmetric bento grid where tile size encodes importance. The two
or three projects you actually want discussed get large tiles with a live preview
or a looping capture; the rest get small tiles. Each tile is one of the 3D tilt
cards, so the effect you like survives, applied to a grid where it reads as
intentional rather than as a scroll gimmick. Tiles carry a discipline marker,
Design / Build / Break, so the mix across your three interests is legible without
reading a word.

Each substantial project then gets its own route with a real case study:

1. **The one-liner.** What it is, in one sentence, above everything.
2. **Role and stack.** What you personally did. Critical for team projects.
3. **The problem.** Why it needed to exist.
4. **Process.** Sketches, wireframes, rejected directions, the thing that broke.
   This is the section that distinguishes a designer from someone with a GitHub
   account, and it is the section everyone skips writing.
5. **The outcome.** Screenshots, numbers if you have them, what you would change.
6. **Links.** Live, repo, writeup.

Three well-documented case studies beat nine repo links. If a project does not
merit a case study, it stays a tile that links straight to GitHub.

Content model: one MDX or TypeScript file per project under `content/projects/`,
typed, with the index generated from it. Adding a project becomes one file, never
a component edit.

---

## 6. Interaction details

**Command palette (⌘K / Ctrl+K).** Built on `cmdk`. Not decoration, it should be
the fastest way to use the site.

- Navigate to any section or project
- Toggle theme, jump to light/dark/system explicitly
- Copy email, open LinkedIn, open GitHub, download résumé
- Search project content
- A few commands that are just fun: `sudo hire-me`, `whoami`, a konami-style
  route into the playground

Hint it visibly in the hero and navbar, because the majority of visitors will
never guess it exists. `kbar` is the alternative to `cmdk`; `cmdk` is lighter and
pairs with shadcn, which you already use.

**3D tilt cards.** Extract the duplicated logic from `ExperienceSection` and
`HobbiesSection` into one `<TiltCard>`. Fixes needed while extracting:

- Drive it with `transform` on a ref via `requestAnimationFrame` rather than
  `setState` per `mousemove`; the current version re-renders on every pixel.
- Disable on touch devices, where `mousemove` fires once on tap and leaves the
  card stuck at an angle.
- Respect `prefers-reduced-motion`.
- Add a glare/sheen layer that follows the cursor. Cheap, and it is most of what
  makes these cards feel expensive.
- Give the card a real focus state so keyboard users get something.

**Theme.** `next-themes` with `attribute="class"`, system default, no flash on
load, and a toggle in the navbar plus the palette. Then audit every component,
because the current dual-styling was written blind and has never been seen.

**Motion.** Scroll-reveal on section entry, a shared-element transition from
project tile to case study page (View Transitions API, with Framer Motion as the
fallback), and the drafting grid parallaxing very slightly against content.
Everything gated on `prefers-reduced-motion`.

**Responsive.** Design the mobile layout first for the bento sections, since
that is where asymmetric grids fall apart. Tilt off, bento collapses to a single
column with size hierarchy preserved through aspect ratio rather than span, and
the terminal pane becomes a static styled block rather than an interactive one.

---

## 7. Technical plan

Stay on the current stack. Next.js 15, React 19, Tailwind v4, TypeScript, and
shadcn/ui are the right choices and there is no reason to migrate.

**Add:** `next-themes`, `cmdk`, `framer-motion` (or `motion`), `next-mdx-remote`
or `contentlayer` for project content, `resend` or a form service for contact,
`sharp` for image handling.

**Restructure:**

```
src/
  app/
    (site)/page.tsx           home, composed of sections
    projects/[slug]/page.tsx  case studies
    uses/, now/               later
    api/contact/route.ts      real form handler
  components/
    sections/                 Hero, Works, Craft, Timeline, Security, ...
    ui/                       shadcn primitives
    primitives/               TiltCard, BentoGrid, Annotation, TitleBlock
    command/                  palette
  content/
    projects/*.mdx
    timeline.ts
    toolbelt.ts
  lib/
```

Content stays out of components. Every section reads from `content/`, so updating
the site later is editing data, not JSX.

**Design tokens.** Replace the current shadcn default palette in `globals.css`
with a real one: paper, ink, accent, grid-line, plus semantic aliases. Define both
themes in the same place. Set a type scale and a spacing scale derived from the
drafting grid so the alignment is systematic rather than eyeballed.

**Baseline quality gates.** Prettier and ESLint on commit, `next build` in CI,
Lighthouse budget, and real metadata including per-project OG images generated
with `next/og`.

---

## 8. Build order

Sequenced so the site is deployable at the end of every phase.

**Phase 0 — Foundation. Done.** Fixed every defect in the table above. Wired
`next-themes`, so dark mode renders for the first time. Normalised the image
extensions, deleted the duplicate experience route, corrected the font tokens
and metadata, replaced the legacy `next/image` props, and moved both scroll
handlers onto `requestAnimationFrame` with the navbar's active-section tracking
on an `IntersectionObserver`.

**Phase 1 — Design system. Done.** Tokens, type scale, spacing and the
primitives are in place, with `/styleguide` rendering all of them in both themes
and both accent presets. Documented in `DESIGN-SYSTEM.md`. Everything after this
is composition.

**Phase 2 — Spine. Done.** Hero, Works index and Timeline rebuilt in the new
language, with all copy and data moved out of components into `content/`.

The accent is settled as signal blue, a saturated blue rather than the muted
blueprint cyan; the presets and the styleguide switcher are gone. The type
pairing stays a wide grotesk, with the display serif still an open option.

Three things changed against the plan as written, all for the better:

- Education, work and leadership are now one filterable timeline. Leadership
  was a separate section; folding it in is what the merged spine was for.
- The sticky project stack is gone, replaced by the bento index.
- Project entries are labelled open slots rather than invented work. A
  portfolio describing projects that do not exist is worse than a short one.

**Phase 2 — Spine.** Rebuild Hero, Works index, and Timeline in the new language.
Ship it. At this point the site is already better than what is live.

**Phase 3 — Content depth.** Case study routes and the MDX pipeline. Write two or
three real case studies. This is the phase that takes longest and it is writing,
not code.

**Phase 4 — The rest.** Craft gallery, Security terminal, Toolbelt bento, Hobbies
port, Contact with a working backend, Colophon.

**Phase 5 — Polish.** Command palette, page transitions, scroll choreography, OG
images, accessibility pass with a keyboard and a screen reader, performance pass.

**Phase 6 — Optional.** `/uses`, `/now`, playground, writing.

Phases 0 and 1 are the ones that matter. Most half-finished portfolios are
half-finished because they skipped the second one and redesigned per section
forever.

---

## 9. Open questions

1. **Accent colour.** Blueprint cyan, or something warmer like signal orange or
   acid yellow? Changes the whole feel: cyan is more engineering, orange is more
   design studio.
2. **Type pairing.** Display serif against monospace is more artistic; wide
   grotesk against monospace is more technical. Worth mocking both.
3. **Do you have design work ready to show?** The Craft section is central to the
   concept and it needs roughly six to nine strong images. If the answer is no,
   that reorders the phases.
4. **How much security material exists?** Determines whether §04 is a full section
   or a modest block.
5. **Is the SAF service a constraint on your time or a thing to feature?** It can
   be a status line in the title block, or it can be a timeline entry, or both.
6. **Résumé.** Static PDF, or generated from the same content files the timeline
   reads? The second is more work and a much better story for a colophon.
