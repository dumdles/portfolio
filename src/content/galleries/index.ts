import { tagIds, type TagId } from "@/content/tags";
import { design } from "./design";
import { media } from "./media";
import { collectionImages, hasWork, type Collection, type Gallery, type GalleryImage } from "./types";

export { design, media };

/** Galleries that are live. An empty gallery is unpublished, so its work is not listed anywhere. */
export const publishedGalleries: Gallery[] = [design, media].filter(hasWork);

/** Where a hobby tile links, if its gallery has anything to show. */
export const galleryHref = {
  design: hasWork(design) ? "/design" : undefined,
  media: hasWork(media) ? "/media" : undefined,
};

/** A collection's work under one tag, with where it came from. */
export interface TaggedGroup {
  gallery: Gallery;
  collection: Collection;
  images: GalleryImage[];
}

/** Everything carrying `tag`, grouped by the collection it belongs to, in site order. */
export function worksTagged(tag: TagId): TaggedGroup[] {
  return publishedGalleries.flatMap((gallery) =>
    gallery.collections
      .map((collection) => ({ gallery, collection, images: collectionImages(collection).filter((image) => image.tags?.includes(tag)) }))
      .filter((group) => group.images.length > 0)
  );
}

/** Tags with at least one published piece of work, in registry order. Only these get a page. */
export const tagsInUse: TagId[] = tagIds.filter((tag) => worksTagged(tag).length > 0);

/** How many pieces carry each tag in use. */
export function tagCount(tag: TagId) {
  return worksTagged(tag).reduce((sum, group) => sum + group.images.length, 0);
}
