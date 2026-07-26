import { useState } from "react";

// Both the book description and author bio needed identical
// truncate/expand logic -- duplicating that logic (like we just did)
// is exactly the kind of thing a code reviewer flags. One hook, reused
// for both, and any future "read more" text on the site.
export function useExpandableText(text: string, limit: number) {
  const [expanded, setExpanded] = useState(false);
  const isTruncatable = text.length > limit;
  const displayText =
    !isTruncatable || expanded ? text : text.slice(0, limit).trimEnd() + "…";

  return {
    displayText,
    isTruncatable,
    expanded,
    toggle: () => setExpanded((v) => !v),
  };
}