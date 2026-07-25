"use client";

import { useBooksBySubject } from "@/hooks/useBooks";
import { BookCarouselSection } from "@/components/book/BookCarouselSection";

export default function Home() {
  const crimeFiction = useBooksBySubject("crime");
  const business = useBooksBySubject("business");

  return (
    <main className="flex-1 p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          Chai Reader
        </h1>
        <p className="text-sm text-muted-foreground">
          BookCarouselSection component test
        </p>
      </div>

      {crimeFiction.isLoading && (
        <p className="text-muted-foreground">Loading Crime Fiction...</p>
      )}
      {crimeFiction.isError && (
        <p className="text-red-600">Failed to load Crime Fiction.</p>
      )}
      {crimeFiction.data && (
        <BookCarouselSection
          title="Crime Fiction"
          subtitle="Trending books among readers"
          books={crimeFiction.data}
        />
      )}

      {business.isLoading && (
        <p className="text-muted-foreground">Loading Business...</p>
      )}
      {business.isError && (
        <p className="text-red-600">Failed to load Business.</p>
      )}
      {business.data && (
        <BookCarouselSection
          title="Business"
          subtitle="Trending books among readers"
          books={business.data}
        />
      )}
    </main>
  );
}