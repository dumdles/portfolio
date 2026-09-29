import Link from "next/link";
import { cn } from "@/lib/utils";
import { tags as registry, type TagId } from "@/content/tags";

/**
 * A row of tags, each linking to its page at /tags/<id>. `current` marks the
 * tag whose page this is, which is not a link.
 */
export function TagList({ tags, current, className }: { tags?: TagId[]; current?: TagId; className?: string }) {
  if (!tags || tags.length === 0) return null;
  return (
    <ul aria-label="Tags" className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <li key={tag}>
          {tag === current ? (
            <span aria-current="page" className="inline-flex rounded-sm border border-brand bg-brand-soft px-1.5 py-0.5 font-mono text-label uppercase text-brand">
              {registry[tag].label}
            </span>
          ) : (
            <Link
              href={`/tags/${tag}`}
              className="inline-flex rounded-sm border border-rule px-1.5 py-0.5 font-mono text-label uppercase text-ink-muted transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {registry[tag].label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
