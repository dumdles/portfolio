import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// The type scale in globals.css adds font sizes tailwind-merge doesn't know.
// Without this it reads `text-label` as a colour and drops it whenever a
// text colour class follows.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["label", "caption", "body-sm", "body", "body-lg", "heading-sm", "heading", "heading-lg", "display-sm", "display", "display-lg", "display-xl"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
