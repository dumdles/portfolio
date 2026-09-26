"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { DraftingSheet, Reveal, SectionHeader, TechnicalLabel, stagger } from "@/components/primitives";
import { profile } from "@/content/profile";

/**
 * 07 — Contact.
 *
 * Direct links only. There used to be a form here, but it had no backend: it
 * waited a second, said "Message sent successfully", and threw the message
 * away. A visitor who used it would have been left waiting for a reply that
 * could never come. The form can return once there is somewhere for it to
 * send to (an email address or a form service).
 */

const routes = [
  { label: "LinkedIn", handle: "in/dumdles", href: profile.links.linkedin },
  { label: "GitHub", handle: "dumdles", href: profile.links.github },
];

export default function ContactSection() {
  return (
    <DraftingSheet id="contact" grid="full">
      <div className="mx-auto max-w-2xl">
        <SectionHeader part="07" eyebrow="Contact" align="center" className="mb-10" title="Message me on LinkedIn." />

        <Reveal className="grid gap-3 sm:grid-cols-2">
          {routes.map((route, i) => (
            <a
              key={route.href}
              href={route.href}
              target="_blank"
              rel="noreferrer"
              data-reveal
              style={stagger(i)}
              className="group flex items-center justify-between gap-4 rounded-lg border border-rule bg-surface px-5 py-4 shadow-lift transition-[border-color,box-shadow] duration-200 hover:border-brand hover:shadow-card"
            >
              <span className="flex flex-col gap-0.5">
                <TechnicalLabel>{route.label}</TechnicalLabel>
                <span className="font-display text-heading-sm font-semibold text-ink">{route.handle}</span>
              </span>
              <ArrowUpRight className="size-5 text-ink-faint transition-[color,transform] duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
            </a>
          ))}
        </Reveal>
      </div>
    </DraftingSheet>
  );
}
