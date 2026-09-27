"use client";

import * as React from "react";

export interface InViewOptions {
  /** Grow or shrink the viewport used for the test. Negative bottom margin
   *  makes things wait until they are properly on screen, not just peeking. */
  rootMargin?: string;
  threshold?: number;
  /** Stop observing after the first hit. Entrances play once. */
  once?: boolean;
}

/**
 * Reports whether an element has entered the viewport.
 *
 * Defaults to once: the site's rule is that an entrance plays the first time
 * something is seen and never again, so scrolling back up is calm.
 *
 * Where IntersectionObserver is missing, it reports true immediately, so the
 * worst case is content that is simply visible.
 */
export function useInView<T extends Element>({ rootMargin = "0px 0px -12% 0px", threshold = 0, once = true }: InViewOptions = {}) {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, inView] as const;
}
