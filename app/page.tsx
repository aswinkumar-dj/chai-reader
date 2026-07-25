"use client";

import { useBooksBySubject } from "@/hooks/useBooks";
import { BookCarouselSection } from "@/components/book/BookCarouselSection";
import { Hero } from "@/components/home/Hero";
import { GenrePills } from "@/components/home/GenrePills";
import { RecommendedSection } from "@/components/home/RecommendedSection";
import { SpeakWithAuthors } from "@/components/home/SpeakWithAuthors";
import { FamousAuthors } from "@/components/home/FamousAuthors";

export default function Home() {
  const newArrivals = useBooksBySubject("fiction", 8);
  const bestSellers = useBooksBySubject("bestsellers", 8);
  const crimeFiction = useBooksBySubject("crime", 8);
  const business = useBooksBySubject("business", 8);

  return (
    <main className="flex-1">
      <Hero />
      <GenrePills />

      {newArrivals.data && (
        <BookCarouselSection
          title="New Arrivals"
          subtitle="Trending books among readers"
          books={newArrivals.data}
        />
      )}

      {bestSellers.data && (
        <BookCarouselSection
          title="Our Best Sellers"
          subtitle="Trending books among readers"
          books={bestSellers.data}
        />
      )}

      <RecommendedSection />

      {crimeFiction.data && (
        <BookCarouselSection
          title="Crime Fiction"
          subtitle="Trending books among readers"
          books={crimeFiction.data}
        />
      )}

      <SpeakWithAuthors />
      
      <FamousAuthors />

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
