# dumdles.com

Personal portfolio. Next.js 15, TypeScript, Tailwind CSS v4.

## Writing

Any text that appears on the website must follow
`.claude/skills/unslop-portfolio-copy/SKILL.md`. That covers headings, leads,
project summaries, case studies, alt text, metadata and button labels. Read it
before writing copy, and re-read your draft against it before committing. The
measured analysis behind it is in `analysis.md` beside it.

Code comments and the docs in `docs/` are not website copy, but plain writing
is still preferred there.

## Where things are

- `docs/PLAN.md`: direction, information architecture, phase status.
- `docs/DESIGN-SYSTEM.md`: tokens, primitives, motion and pixel systems.
- `src/content/`: every piece of copy and data on the site. Change what the
  site says here, not in components.
- `/styleguide`: every primitive rendered in both themes.

## Checks before pushing

```
npm run build
npx next lint
npx tsc --noEmit
```

Photos go in `public/images` only after their metadata is stripped. The raw
file is publicly downloadable at its own URL.
