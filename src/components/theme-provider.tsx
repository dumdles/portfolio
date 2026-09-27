"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wraps next-themes so the rest of the app can stay server-rendered.
 *
 * The provider writes `class="dark"` onto <html>, which is what the
 * `dark` variant in globals.css matches. It also injects a blocking inline
 * script that applies the stored theme before first paint, so there is no
 * flash of the wrong theme on load. That script is the reason <html> needs
 * `suppressHydrationWarning` in layout.tsx.
 */
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
