"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useBooksBySubject } from "@/hooks/useBooks";
import { BookCard } from "@/components/book/BookCard";
import { BookCardSkeleton } from "@/components/book/BookCardSkeleton";
import { Breadcrumb } from "@/components/ui/BreadCrumb";

const SUBJECT_MAP: Record<string, { label: string; subject: string }> = {
  new_arrivals: { label: "New Arrivals", subject: "fiction" },
  best_sellers: { label: "Best Sellers", subject: "fantasy" },
  self_help: { label: "Self Help", subject: "self-help" },
  business: { label: "Business", subject: "business" },
  tech: { label: "Tech", subject: "technology" },
  kids: { label: "Kids", subject: "juvenile_fiction" },
  classics: { label: "Classics", subject: "classic_literature" },
};

function SearchContent() {
  const params = useSearchParams();
  const key = params.get("subject") ?? "";
  const entry = SUBJECT_MAP[key] ?? { label: "Browse", subject: "fiction" };

  const { data, isLoading, isError } = useBooksBySubject(entry.subject, 24);

  return (
    <main className="p-8">
      <Breadcrumb items={[{ label: "Browse", href: "/" }, { label: entry.label }]} />

      <h1 className="mt-2 text-2xl font-semibold text-foreground">
        {entry.label}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Trending books among readers
      </p>

      {isLoading && (
        <div className="mt-6 flex flex-wrap gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <p className="mt-6 text-red-600">
          Couldn&apos;t load books for this category right now.
        </p>
      )}

      {data && data.length === 0 && (
        <p className="mt-6 text-muted-foreground">
          No books found in this category yet.
        </p>
      )}

      {data && data.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4">
          {data.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}

// useSearchParams() requires a Suspense boundary -- without it, Next.js
// can't statically prerender this page at build time (it needs to know
// the render can "pause" while the client-only search params resolve).
// This didn't surface in `next dev`, only in a real production build --
// exactly why testing `npm run build` locally before deploying matters.
export default function SearchPage() {
  return (
    <Suspense fallback={<main className="p-8" />}>
      <SearchContent />
    </Suspense>
  );
}