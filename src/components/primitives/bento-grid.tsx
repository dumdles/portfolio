"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Bento layout, as a component layout sheet.
 *
 * The grid is always one column on phones. Asymmetric bento grids are where
 * responsive layouts usually fall apart, so size hierarchy on small screens is
 * carried by tile height (the `size` prop below) rather than by column spans,
 * which have nowhere to go at 360px wide.
 *
 * Column spans engage at `sm` and the full layout at `lg`.
 */

const columnClasses: Record<3 | 4 | 6, string> = {
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  6: "sm:grid-cols-2 lg:grid-cols-6",
};

export interface BentoGridProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Column count at the `lg` breakpoint and above. */
  columns?: 3 | 4 | 6;
}

export function BentoGrid({ columns = 4, className, ...props }: BentoGridProps) {
  return <div className={cn("grid grid-cols-1 gap-3 sm:gap-4", "auto-rows-[minmax(11rem,auto)]", columnClasses[columns], className)} {...props} />;
}

/**
 * Tile size presets.
 *
 * `span` and `rows` control the desktop footprint. `minH` keeps the small
 * screen hierarchy: a tile that is large on desktop should still feel large
 * in a single column.
 */
const sizeClasses = {
  /** One cell. The default. */
  sm: "min-h-44",
  /** Two cells wide. */
  md: "sm:col-span-2 min-h-44",
  /** Two wide, two tall. Use for the two or three things you want discussed. */
  lg: "sm:col-span-2 lg:row-span-2 min-h-64 sm:min-h-0",
  /** Two tall, one wide. */
  tall: "lg:row-span-2 min-h-64 sm:min-h-0",
  /** Full bleed across the grid. */
  wide: "sm:col-span-2 lg:col-span-full min-h-44",
} as const;

export type BentoSize = keyof typeof sizeClasses;

export interface BentoItemProps extends React.ComponentPropsWithoutRef<"div"> {
  size?: BentoSize;
}

export function BentoItem({ size = "sm", className, ...props }: BentoItemProps) {
  return <div className={cn("min-w-0", sizeClasses[size], className)} {...props} />;
}
