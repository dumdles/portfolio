"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const ACCENTS = [
  { value: "blueprint", label: "Blueprint", hint: "Cyan-blue ink. Reads engineering." },
  { value: "signal", label: "Signal", hint: "Saturated orange. Reads design studio." },
] as const;

const STORAGE_KEY = "accent-preset";

/**
 * Live switcher for the accent preset, for use on the styleguide.
 *
 * Writes `data-accent` onto <html>, which is what the preset blocks in
 * globals.css key off. This exists so both presets can be compared against
 * real components in both themes before one is committed to.
 *
 * This is a styleguide tool, not a visitor-facing control. Once the accent is
 * decided, set the chosen values directly in :root and delete the presets.
 */
export function AccentSwitcher({ className }: { className?: string }) {
  const [accent, setAccent] = React.useState<string>("blueprint");

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAccent(stored);
      document.documentElement.dataset.accent = stored;
    }
  }, []);

  const apply = (value: string) => {
    setAccent(value);
    document.documentElement.dataset.accent = value;
    window.localStorage.setItem(STORAGE_KEY, value);
  };

  return (
    <div role="radiogroup" aria-label="Accent preset" className={cn("inline-flex items-center gap-0.5 rounded-md border border-rule bg-surface p-0.5", className)}>
      {ACCENTS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={accent === option.value}
          title={option.hint}
          onClick={() => apply(option.value)}
          className={cn(
            "rounded-sm px-2.5 py-1 font-mono text-label uppercase transition-colors duration-200",
            accent === option.value ? "bg-brand text-brand-ink" : "text-ink-muted hover:bg-surface-muted hover:text-ink"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
