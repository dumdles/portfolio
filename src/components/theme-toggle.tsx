"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

/**
 * Three-state theme control: light, dark, follow the OS.
 *
 * A two-state toggle cannot express "follow the system", which is the default
 * and the setting most visitors actually want, so this is a segmented control
 * rather than a single switch.
 *
 * The resolved theme is only known on the client. Rendering the real state
 * before mount would produce a hydration mismatch, so until mount the control
 * renders in a neutral, non-interactive state of the same size. That keeps
 * the layout from shifting when it becomes live.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <div role="radiogroup" aria-label="Colour theme" className={cn("inline-flex items-center gap-0.5 rounded-md border border-rule bg-surface p-0.5", className)}>
      {options.map(({ value, label, Icon }) => {
        const selected = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            title={label}
            disabled={!mounted}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-sm transition-colors duration-200",
              selected ? "bg-brand text-brand-ink" : "text-ink-muted hover:bg-surface-muted hover:text-ink",
              !mounted && "cursor-default opacity-70"
            )}
          >
            <Icon className="size-3.5" strokeWidth={2} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
