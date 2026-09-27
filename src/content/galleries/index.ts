import { design } from "./design";
import { media } from "./media";
import { hasWork } from "./types";

export { design, media };

/** Where a hobby tile links, if its gallery has anything to show. */
export const galleryHref = {
  design: hasWork(design) ? "/design" : undefined,
  media: hasWork(media) ? "/media" : undefined,
};
