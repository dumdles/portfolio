"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { PixelGlyph, PixelText, Reveal, TechnicalLabel, stagger } from "@/components/primitives";
import { profile } from "@/content/profile";

/**
 * The footer, drawn as the sheet's title strip: the site's name set in its
 * own pixel face at full width, then the colophon.
 *
 * The colophon is a design convention that only an engineer can fill in
 * honestly, which is the whole pitch of the site in one line of small type.
 */

const commit = (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "").slice(0, 7) || "local";

const colophon = [
  { label: "Set in", value: "Space Grotesk, Inter, JetBrains Mono, and a 5×7 face drawn for this site" },
  { label: "Built with", value: "Next.js, TypeScript, Tailwind CSS" },
  { label: "Drawn in", value: "Singapore" },
  { label: "Revision", value: commit },
];

const links = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "Styleguide", href: "/styleguide" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-rule">
      <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div data-reveal className="max-w-md">
            <TechnicalLabel tone="brand" rule>
              End of sheet
            </TechnicalLabel>
            <p className="mt-4 font-display text-heading-lg font-semibold text-balance text-ink">Thanks for reading the drawing.</p>
          </div>

          <ul data-reveal style={stagger(1)} className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-1 font-mono text-label uppercase text-ink-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
                >
                  {link.label}
                  <ArrowUpRight className="size-3" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* The wordmark. Falls into place on first view; lights up under the cursor. */}
        <div className="mt-14 text-ink">
          <PixelText text={profile.handle} fluid drop interactive />
        </div>

        <Reveal as="div" className="mt-10 grid gap-x-8 gap-y-5 border-t border-rule pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {colophon.map((item, i) => (
            <div key={item.label} data-reveal="fade" style={stagger(i)} className="flex flex-col gap-1">
              <span className="font-mono text-label uppercase text-ink-faint">{item.label}</span>
              <span className="text-body-sm text-ink-muted">{item.value}</span>
            </div>
          ))}
        </Reveal>

        <div className="mt-10 flex items-center justify-between gap-4">
          <span className="font-mono text-label uppercase text-ink-faint">
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#home" className="glyph-trigger group inline-flex items-center gap-2 font-mono text-label uppercase text-ink-muted transition-colors hover:text-brand">
            Back to top
            <PixelGlyph name="arrowDown" px={2} className="rotate-180 transition-transform duration-150 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
