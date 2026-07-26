"use client";

import { useBooksBySubject } from "@/hooks/useBooks";
import { BookCarouselSection } from "@/components/book/BookCarouselSection";
import { BookCardSkeleton } from "@/components/book/BookCardSkeleton";
import { Hero } from "@/components/home/Hero";
import { GenrePills } from "@/components/home/GenrePills";
import { RecommendedSection } from "@/components/home/RecommendedSection";
import { SpeakWithAuthors } from "@/components/home/SpeakWithAuthors";
import { FamousAuthors } from "@/components/home/FamousAuthors";
import { Footer } from "@/components/layout/Footer";

function SkeletonRow() {
  return (
    <div className="flex gap-4 py-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function Home() {
  const newArrivals = useBooksBySubject("fiction", 9);
  // "bestsellers" isn't a real Open Library subject slug -- same issue
  // we hit with "new_arrivals" earlier. Swapped for "fantasy", a
  // well-populated real subject, same documented-assumption pattern.
  const bestSellers = useBooksBySubject("fantasy", 9);
  const crimeFiction = useBooksBySubject("crime", 9);
  const business = useBooksBySubject("business", 9);

  return (
    <main className="flex-1">
      <Hero />
      <GenrePills />

      {newArrivals.isLoading && <SkeletonRow />}
      {newArrivals.data && (
        <BookCarouselSection
          title="New Arrivals"
          subtitle="Trending books among readers"
          books={newArrivals.data}
        />
      )}

      {bestSellers.isLoading && <SkeletonRow />}
      {bestSellers.data && (
        <BookCarouselSection
          title="Our Best Sellers"
          subtitle="Trending books among readers"
          books={bestSellers.data}
        />
      )}

      <RecommendedSection />

      {crimeFiction.isLoading && <SkeletonRow />}
      {crimeFiction.data && (
        <BookCarouselSection
          title="Crime Fiction"
          subtitle="Trending books among readers"
          books={crimeFiction.data}
        />
      )}

      <SpeakWithAuthors />

      <FamousAuthors />

      {business.isLoading && <SkeletonRow />}
      {business.data && (
        <BookCarouselSection
          title="Business"
          subtitle="Trending books among readers"
          books={business.data}
        />
      )}

      <Footer />
    </main>
  );
}