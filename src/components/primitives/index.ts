/**
 * Design system primitives.
 *
 * Import from here rather than from the individual files:
 *   import { TiltCard, BentoGrid, SectionHeader } from "@/components/primitives";
 *
 * See docs/DESIGN-SYSTEM.md for what each one is for, and /styleguide for
 * every one of them rendered in both themes.
 */
export { TiltCard, type TiltCardProps } from "./tilt-card";
export { BentoGrid, BentoItem, type BentoGridProps, type BentoItemProps, type BentoSize } from "./bento-grid";
export { SectionHeader, type SectionHeaderProps } from "./section-header";
export { TechnicalLabel, type TechnicalLabelProps } from "./technical-label";
export { Annotation, DimensionLine, type AnnotationProps, type DimensionLineProps } from "./annotation";
export { TitleBlock, type TitleBlockField, type TitleBlockProps } from "./title-block";
export { DraftingSheet, type DraftingSheetProps } from "./drafting-sheet";
export { Chip, DisciplineMarker, type ChipProps, type DisciplineMarkerProps } from "./chip";
export { Reveal, type RevealProps } from "./reveal";
export { stagger } from "@/lib/motion";
export { DecodeText, type DecodeTextProps } from "./decode-text";
export { PixelGlyph, type PixelGlyphProps } from "./pixel-glyph";
export { PixelText, type PixelTextProps } from "./pixel-text";
